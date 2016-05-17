import re
import requests
from lxml import html

from flask import Flask
from flask import abort
from flask import jsonify
from flask import request
from flask import send_file


app = Flask(__name__)
root = '/'
zalora_site_prefix = 'https?://www.zalora.'


def get_image_url(product_url, image_number):
    resp = requests.get(product_url)
    if (resp.ok):
        tree = html.fromstring(resp.content)
    else:
        return ''

    metas = tree.findall(".//head/meta[@property='og:image']")
    try:
        meta = metas[int(image_number) - 1]
    except IndexError:
        return ''

    return meta.get('content').replace('-product', '')


@app.route(root + 'api/image')
def fetch_image():
    product_url = request.args.get('product_url')
    image_number = request.args.get('image_number')
    if re.match(zalora_site_prefix, product_url):
        image_src = get_image_url(product_url, image_number)
        return jsonify(src=image_src)
    else:
        abort(404)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

