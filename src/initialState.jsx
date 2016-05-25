import { fetchImage } from './sources-page/image-sources';

function loadImage(url, imageNumber) {
  return fetchImage(`api/image?product_url=${url}&image_number=${imageNumber}`);
}


function fetchTemplate(channel, name) {
  const url = `static/templates/${channel}/${name}`;
  const template = {};
  fetch(url)
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        template[key] = data[key];
      });
    });
  return template;
}


/* eslint-disable key-spacing, quotes, quote-props, comma-dangle, no-unused-vars */
const initialState = {
  "pageNum":4,
  "selectedChannel":"mobile",
  "countries": [
    {
      "value":"SG",
      "selected":true
    },
    {
      "value":"MY",
      "selected":false
    },
    {
      "value":"ID",
      "selected":true
    },
    {
      "value":"PH",
      "selected":false
    },
    {
      "value":"TW",
      "selected":false
    },
    {
      "value":"HK",
      "selected":false
    }
  ],
  "templates":{
    "320x50_1": fetchTemplate('mobile', '320x50_1.json'),
    "1200x627_1": fetchTemplate('mobile', '1200x627_1.json'),
  },
  "sourcesByCountry":{
    "SG":[
      {
        "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
        "imageNumber":"1",
        "id":"H1oec1odG"
      },
      {
        "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
        "imageNumber":"2",
        "id":"Hkkxe9yidM"
      },
      {
        "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
        "imageNumber":"3",
        "id":"Hkleeq1idG"
      }
    ],
    "ID":[
      {
        "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
        "imageNumber":"1",
        "id":"H1oec1odG"
      },
      {
        "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
        "imageNumber":"2",
        "id":"Hkkxe9yidM"
      },
      {
        "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
        "imageNumber":"3",
        "id":"Hkleeq1idG"
      }
    ]
  },
  "imagesByCountry":{
    "SG":[
      {
        "index":0,
        "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 1),
        "id":"BJRqJj_G",
        "width":762,
        "height":1100
      },
      {
        "index":1,
        "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 2),
        "id":"BkGikjuf",
        "width":762,
        "height":1100
      },
      {
        "index":2,
        "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 3),
        "id":"SyXiyodz",
        "width":762,
        "height":1100
      }
    ],
    "ID":[
      {
        "index":0,
        "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 1),
        "id":"BJRqJj_G",
        "width":762,
        "height":1100
      },
      {
        "index":1,
        "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 2),
        "id":"BkGikjuf",
        "width":762,
        "height":1100
      },
      {
        "index":2,
        "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 3),
        "id":"SyXiyodz",
        "width":762,
        "height":1100
      }
    ]
  },
  "sources":[
    {
      "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
      "imageNumber":"1",
      "id":"H1oec1odG"
    },
    {
      "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
      "imageNumber":"2",
      "id":"Hkkxe9yidM"
    },
    {
      "url":"https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html",
      "imageNumber":"3",
      "id":"Hkleeq1idG"
    }
  ],
  "images":[
    {
      "index":0,
      "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 1),
      "id":"BJRqJj_G",
      "width":762,
      "height":1100
    },
    {
      "index":1,
      "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 2),
      "id":"BkGikjuf",
      "width":762,
      "height":1100
    },
    {
      "index":2,
      "image": loadImage('https://www.zalora.sg/cotton-on-body-volt-tank-pink-472944.html', 3),
      "id":"SyXiyodz",
      "width":762,
      "height":1100
    }
  ],
  "bannerIdsByCountry":{ "SG":[], "ID":[] },
  "imageSetsById":{},
  "propsById":{},
  "textsById":{},
  "copies":{
    "title":{
      text: "Further Reductions",
      color: "#000000"
    },
    "headline":{
      text: "Signup Now and enjoy 'xx' off!",
      color: "#000000"
    }
  },
  "textsByCountry":{
    "SG":{
      "title": {
        text: "Further Reductions",
        color: "#000000",
      },
      "headline": {
        text: "Signup Now and enjoy 'xx' off!",
        color: "#000000",
      },
    },
    "ID":{
      "title": {
        text: "Penurunan Harga",
        color: "#000000",
      },
      "headline": {
        text: "Daftar Sekarang dan nikmati potongan ‘xx’!",
        color: "#000000",
      },
    }
  }
};
/* eslint-enable key-spacing, quotes, quote-props, comma-dangle, no-unused-vars */

export default initialState;
