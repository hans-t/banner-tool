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
countries[1].selected = true;


const imagesByCountry = {
  SG: loadImages(),
  MY: loadImages(),
};


const sourceURLsByCountry = {
  SG: [
    {
      id: '3820cw',
      url: 'https://www.zalora.sg/',
      imageNumber: 1,
    },
    {
      id: 'i72eiw',
      url: 'https://www.zalora.sg/',
      imageNumber: 1,
    },
    {
      id: 'bu2919',
      url: 'https://www.zalora.sg/',
      imageNumber: 1,
    },
    {
      id: 'i0182m',
      url: 'https://www.zalora.sg/',
      imageNumber: 1,
    },
  ],
  MY: [
    {
      id: '37291',
      url: 'https://www.zalora.com.my/',
      imageNumber: 1,
    },
    {
      id: '382213',
      url: 'https://www.zalora.com.my/',
      imageNumber: 1,
    },
    {
      id: 'mbqo22',
      url: 'https://www.zalora.com.my/',
      imageNumber: 1,
    },
    {
      id: '9f012i',
      url: 'https://www.zalora.com.my/',
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
    { id: 'Bkx4oSAYZ', selected: true, index: 2, visibleOnPageNum: 4 },
    { id: 'B1fEoSRYb', selected: true, index: 3, visibleOnPageNum: 4 },
    { id: 'Skm4irCtb', selected: false, index: 4, visibleOnPageNum: 1 },
    { id: 'HkE4srCFW', selected: true, index: 5, visibleOnPageNum: 2 },
    { id: 'BJB4oHAtW', selected: true, index: 6, visibleOnPageNum: 2 },
    { id: 'HkLVirRtZ', selected: false, index: 7, visibleOnPageNum: 1 },
  ],
  MY: [
    { id: 'CjwiqoE2', selected: false, index: 0, visibleOnPageNum: 1 },
    { id: 'I102380dj', selected: false, index: 1, visibleOnPageNum: 1 },
    { id: 'OWB1928P2', selected: false, index: 2, visibleOnPageNum: 1 },
    { id: 'BqpwePiw', selected: false, index: 3, visibleOnPageNum: 1 },
    { id: 'Skeioq122', selected: false, index: 4, visibleOnPageNum: 1 },
    { id: 'MiwoqIDio', selected: true, index: 5, visibleOnPageNum: 4 },
    { id: 'JiwO21022', selected: true, index: 6, visibleOnPageNum: 4 },
    { id: 'iObwiqo2', selected: false, index: 7, visibleOnPageNum: 1 },
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
  Bkx4oSAYZ: [
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

  CjwiqoE2: [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 0 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 1 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 2 },
  ],
  I102380dj: [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 0 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 1 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 3 },
  ],
  OWB1928P2: [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 0 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 2 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 3 },
  ],
  BqpwePiw: [
    { boxX: 10, boxY: 5, boxWidth: 40, boxHeight: 40, index: 1 },
    { boxX: 60, boxY: 5, boxWidth: 40, boxHeight: 40, index: 2 },
    { boxX: 110, boxY: 5, boxWidth: 40, boxHeight: 40, index: 3 },
  ],
  Skeioq122: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 0 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 1 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 2 },
  ],
  MiwoqIDio: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 0 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 1 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 3 },
  ],
  JiwO21022: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 0 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 2 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 3 },
  ],
  iObwiqo2: [
    { boxX: 20, boxY: 26, boxWidth: 373, boxHeight: 454, index: 1 },
    { boxX: 414, boxY: 26, boxWidth: 373, boxHeight: 454, index: 2 },
    { boxX: 806, boxY: 26, boxWidth: 373, boxHeight: 454, index: 3 },
  ],
};


const propsById = {
  SJNorAFb: { width: 320, height: 50, backgroundColor: 'white' },
  HyxEoH0tW: { width: 320, height: 50, backgroundColor: 'white' },
  Bkx4oSAYZ: { width: 320, height: 50, backgroundColor: 'white' },
  B1fEoSRYb: { width: 320, height: 50, backgroundColor: 'white' },
  Skm4irCtb: { width: 1200, height: 627, backgroundColor: 'white' },
  HkE4srCFW: { width: 1200, height: 627, backgroundColor: 'white' },
  BJB4oHAtW: { width: 1200, height: 627, backgroundColor: 'white' },
  HkLVirRtZ: { width: 1200, height: 627, backgroundColor: 'white' },

  CjwiqoE2: { width: 320, height: 50, backgroundColor: 'white' },
  I102380dj: { width: 320, height: 50, backgroundColor: 'white' },
  OWB1928P2: { width: 320, height: 50, backgroundColor: 'white' },
  BqpwePiw: { width: 320, height: 50, backgroundColor: 'white' },
  Skeioq122: { width: 1200, height: 627, backgroundColor: 'white' },
  MiwoqIDio: { width: 1200, height: 627, backgroundColor: 'white' },
  JiwO21022: { width: 1200, height: 627, backgroundColor: 'white' },
  iObwiqo2: { width: 1200, height: 627, backgroundColor: 'white' },
};


const copies = {
  title: 'New & Exclusive',
  headline: 'Clothing',
};


const textsByCountry = {
  SG: {
    title: 'New & Exclusive',
    headline: 'Clothing',
  },
  MY: {
    title: 'Baru dan Eksklusif',
    headline: 'Pakaian',
  },
};


const pageNum = 3;


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
  copies,
  textsByCountry,
};
