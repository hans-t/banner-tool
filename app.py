import os
import re
import base64
import zipfile
import tempfile

import requests
from lxml import html
from flask import Flask
from flask import abort
from flask import request
from flask import jsonify
from flask import send_file


ROOT_URL = '/banner-tool'
API_URL = ROOT_URL + '/api'
TEMP_DIR = 'temp'
CACHE_DIR = 'cache'
ZALORA_SITE_PATTERN = 'https?://www.zalora.'


app = Flask(__name__)
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(CACHE_DIR, exist_ok=True)


def get_image_url(product_url, image_number):
    resp = requests.get(product_url)
    if resp.ok:
        tree = html.fromstring(resp.content)
    else:
        return ''

    metas = tree.findall(".//head/meta[@property='og:image']")
    try:
        meta = metas[int(image_number) - 1]
    except IndexError:
        return ''

    return meta.get('content').replace('-product', '')


def fetch_image(url):
    resp = requests.get(url, stream=True)
    if resp.status_code == 200:
        filename = url.split('/')[-1]
        path = os.path.join(CACHE_DIR, filename)
        if not os.path.exists(path):
            with open(path, 'wb') as fp:
                for chunk in resp.iter_content(1024):
                    fp.write(chunk)
        return path
    return ''


def dump_datauri(datauri, filename):
    img_str = re.search(r'base64,(.*)', datauri).group(1)
    decoded_img = base64.b64decode(img_str)
    with open(filename, 'wb') as fp:
        fp.write(decoded_img)


def zip_banners(banners_by_id):
    tmpdir = tempfile.TemporaryDirectory()
    zip_name = '{}.zip'.format(os.path.split(tmpdir.name)[-1])
    zip_path = os.path.join(TEMP_DIR, zip_name)
    zipfp = zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED)

    with tmpdir, zipfp:
        for banner_id, banner in banners_by_id.items():
            country = banner['country']
            size = banner['size']
            banner_dir = os.path.join(tmpdir.name, country, size)
            os.makedirs(banner_dir, exist_ok=True)

            banner_name = '{id}.jpg'.format(id=banner_id)
            banner_filename = os.path.join(banner_dir, banner_name)
            dump_datauri(banner['datauri'], filename=banner_filename)

            arcname = os.path.join(country, size, banner_name)
            zipfp.write(banner_filename, arcname=arcname)
    return zip_name, zip_path


@app.route(API_URL + '/image')
def handle_image_sources_request():
    product_url = request.args.get('product_url')
    image_number = request.args.get('image_number')
    if re.match(ZALORA_SITE_PATTERN, product_url):
        image_url = get_image_url(product_url, image_number)
        image_src = fetch_image(image_url)
        return jsonify(src=image_src)
    else:
        abort(404)


@app.route(API_URL + '/zip', methods=['POST'])
def handle_zip_banners_request():
    payload = request.get_json()
    banners_by_id = payload['bannersById']
    zip_name, zip_path = zip_banners(banners_by_id)
    return jsonify(
        url='download?file={}'.format(zip_path),
        filename=zip_name,
    )


@app.route(ROOT_URL + '/download')
def handle_download():
    path = request.args.get('file')
    return send_file(path, mimetype='application/octet-stream')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

