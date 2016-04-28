inStore = {
  page: 'addTexts'

  // state that needs to persist between pages.
  channelSelected: 'MOBILE',

  countries: [
    { value: 'SG', selected: true },
    { value: 'MY', selected: false },
    { value: 'TH', selected: false },
    { value: 'ID', selected: false },
    { value: 'VN', selected: false },
    { value: 'PH', selected: false },
    { value: 'TW', selected: false },
    { value: 'HK', selected: false },
  ],

  templates: [
    { value: '320x250_1', selected: true },
    { value: '320x250_2', selected: false },
    { value: '600x600_1', selected: false },
  ],

  currentCountry: 'SG',

  bannerIdsByCountry: {
    SG: [{ id: '1', selected: true }, { id: '2', selected: false }],
  },

  imagesById: {
    '38201': [
      {..., url: 'url1'},
      {..., url: 'url2'},
      {..., url: 'url3'},
    ],

    '38202': [...],
  },

  textsById: {
    '38201': {headline: {...}, title: {...}, ...},
    '38202': {headline: {...}, title: {...}, ...},
  },

  propsById: {
    '38201': {
      width: 320,
      height: 50,
      cta_url: 'cta_url1',
      dataUriPreview: '',
      dataUri: '',
      selected: true,
      showEditOverlay: true,
      format: '',
      compressionLevel: 8,
    },
    '38202': {...},
  },
}


insideComponents = {
  // only needed for translating texts, afterwards these values will be inside banner objects.
  copyTranslations: {
    'headline': [
      {
        'english': 'buy now',
        'ID': 'beli sekarang',
        'SG': 'buy now',
        ...
      },
      {
        'english': 'xx% off',
        'ID': 'diskon xx%',
        'SG': 'xx% off',
      },
    ],
    'title': [...],
  },

  // only needed for putting images together, afterwards banner objects will live in store.
  templates: [
    {
      width: 320,
      height: 50,
      backgroundColor: null,
      images: [
        {dx: 25, dy: 30, dWidth: 100, dHeight: 100, dataURI: ''},
        {dx: 75, dy: 30, dWidth: 100, dHeight: 100, dataURI: ''},
        {dx: 125, dy: 30, dWidth: 100, dHeight: 100, dataURI: ''},
      ],
      cta: {top: 70, left: 30, width: 120, height: 20},
      headline: {top: 70, left: 70, width: 70, height: 20, color: '#dddddd', font: 'Apercu', size: 12, x: 0, y: 0},

      // same properties as headline
      title: {...},
    },

    {...},
  ],

  // last step, in render page
  renderSettings: {
    format: 'jpg',
    compression: 10,
  },
}
