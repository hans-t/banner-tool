import * as constants from './common/constants';


const countries = constants.AVAILABLE_COUNTRIES_OPTION.map(obj => ({ ...obj }));
countries[0].selected = true;


const imagesByCountry = {
  SG: ['', '', '', ''],
};


const sourceURLsByCountry = {
  SG: [
    {
      id: '3820cw',
      url: 'https://www.zalora.',
      imageNumber: 1,
    },
    {
      id: 'i72eiw',
      url: 'https://www.zalora.',
      imageNumber: 1,
    },
    {
      id: 'bu2919',
      url: 'https://www.zalora.',
      imageNumber: 1,
    },
    {
      id: 'i0182m',
      url: 'https://www.zalora.',
      imageNumber: 1,
    },
  ],
};


const templates = {
  mobile_320x50_1: require('../static/templates/mobile_320x50_1.js'),
};


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
