import re
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
    try:
        tree = html.parse(product_url)
    except OSError:
        return ''

    metas = tree.findall("//head/meta[@property='og:image']")
    try:
        meta = metas[int(image_number) - 1]
    except IndexError:
        return ''

    return meta.get('content').replace('-product', '')


@app.route(root + 'api/image')
def fetch_image():
    product_url = request.args.get('product_url')
    image_number = request.args.get('image_number')
    print(product_url, image_number)
    if re.match(zalora_site_prefix, product_url):
        return jsonify(src=get_image_url(product_url, image_number))
    else:
        abort(404)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)

