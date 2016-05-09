import { generate as generateId } from 'shortid';
import * as constants from './common/constants';

const dummyDir = 'static/dummy';


function loadImages() {
  const n = 4;
  return Array(n).fill(null).map((el, index) => {
    const image = new Image;
    image.src = `${dummyDir}/${index}.jpg`;
    return {
      index,
      image,
      id: generateId(),
      width: 762,
      height: 1100,
    };
  });
}


const countries = constants.AVAILABLE_COUNTRIES_OPTION.map(obj => ({ ...obj }));
countries[0].selected = true;


const imagesByCountry = {
  SG: loadImages(),
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
  '320x50_1': require('../static/templates/mobile/320x50_1.js'),
  '1200x627_1': require('../static/templates/mobile/1200x627_1.js'),
};


const bannerIdsByCountry = {
  SG: [
    { id: 'SJNorAFb', selected: false, index: 0, visibleOnPageNum: 1 },
    { id: 'HyxEoH0tW', selected: false, index: 1, visibleOnPageNum: 1 },
    { id: 'Bk-4oSAYZ', selected: true, index: 2, visibleOnPageNum: 2 },
    { id: 'B1fEoSRYb', selected: true, index: 3, visibleOnPageNum: 2 },
    { id: 'Skm4irCtb', selected: false, index: 4, visibleOnPageNum: 1 },
    { id: 'HkE4srCFW', selected: true, index: 5, visibleOnPageNum: 2 },
    { id: 'BJB4oHAtW', selected: true, index: 6, visibleOnPageNum: 2 },
    { id: 'HkLVirRtZ', selected: false, index: 7, visibleOnPageNum: 1 },
  ],
};


const imageSetsById = {
  SJNorAFb: [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 0 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 1 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 2 },
  ],
  HyxEoH0tW: [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 0 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 1 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 3 },
  ],
  'Bk-4oSAYZ': [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 0 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 2 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 3 },
  ],
  B1fEoSRYb: [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 1 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 2 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 3 },
  ],
  Skm4irCtb: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 0 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 1 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 2 },
  ],
  HkE4srCFW: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 0 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 1 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 3 },
  ],
  BJB4oHAtW: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 0 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 2 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 3 },
  ],
  HkLVirRtZ: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 1 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 2 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 3 },
  ],
};


const propsById = {
  SJNorAFb: { width: 320, height: 50, backgroundColor: 'white' },
  HyxEoH0tW: { width: 320, height: 50, backgroundColor: 'white' },
  'Bk-4oSAYZ': { width: 320, height: 50, backgroundColor: 'white' },
  B1fEoSRYb: { width: 320, height: 50, backgroundColor: 'white' },
  Skm4irCtb: { width: 1200, height: 627, backgroundColor: 'white' },
  HkE4srCFW: { width: 1200, height: 627, backgroundColor: 'white' },
  BJB4oHAtW: { width: 1200, height: 627, backgroundColor: 'white' },
  HkLVirRtZ: { width: 1200, height: 627, backgroundColor: 'white' },
};


const pageNum = 2;


const selectedChannel = 'mobile';


export default {
  pageNum,
  selectedChannel,
  templates,
  countries,
  sourceURLsByCountry,
  imagesByCountry,
  bannerIdsByCountry,
  propsById,
  imageSetsById,
};
