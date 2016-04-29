import * as constants from './common/constants';


const countries = constants.AVAILABLE_COUNTRIES_OPTION.map(obj => ({ ...obj }));
countries[0].selected = true;


const imagesByCountry = {
  SG: ['', '', ''],
};


const sourceURLsByCountry = {
  SG: [
    {
      url: 'https://www.zalora.',
      imageNumber: 1,
    },
    {
      url: 'https://www.zalora.',
      imageNumber: 1,
    },
    {
      url: 'https://www.zalora.',
      imageNumber: 1,
    },
  ],
};


const templates = [
  require('../static/templates/mobile_320x50_1.js'),
];


const bannerIdsByCountry = {
  SG: [],
};


const imageSetsById = {};


const propsById = {};


const page = {
  value: constants.PAGE.addImages,
  isNextPage: true,
};


const selectedChannel = constants.AVAILABLE_CHANNELS_OPTION[0];


export default {
  page,
  selectedChannel,
  templates,
  countries,
  sourceURLsByCountry,
  imagesByCountry,
  bannerIdsByCountry,
  propsById,
  imageSetsById,
};
