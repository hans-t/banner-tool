import os
import re
import requests
from lxml import html

from flask import Flask
from flask import abort
from flask import request
from flask import jsonify
from flask import send_file


API_URL = '/api/'
CACHE_DIR = 'cache'
ZALORA_SITE_PATTERN = 'https?://www.zalora.'


app = Flask(__name__)
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


@app.route(API_URL + 'image')
def handle_image_sources_request():
    product_url = request.args.get('product_url')
    image_number = request.args.get('image_number')
    if re.match(ZALORA_SITE_PATTERN, product_url):
        image_url = get_image_url(product_url, image_number)
        image_src = fetch_image(image_url)
        return jsonify(src=image_src)
    else:
        abort(404)


@app.route(API_URL + 'zip')
def handle_download_request():
    print(request.form)
    return ''


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

