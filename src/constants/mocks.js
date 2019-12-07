const menuItems = [
  {
    id: 1,
    name: 'Souq',
    refrence: 'https://egypt.souq.com/eg-ar/',
    icon: 'https://cf1.s3.souqcdn.com/public/style/img/en/souqAmazon-logo-v2-X2.png',
  },
  {
    id: 2,
    name: 'Jumia',
    refrence: 'https://www.jumia.com.eg/ar/',
    icon: 'data:image/png;base64,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',
  },
  {
    id: 3,
    name: 'Carrefour',
    refrence: 'https://www.carrefouregypt.com',
    icon: 'https://seeklogo.net/wp-content/uploads/2012/12/carrefour-logo-vector.png',
  },
  {
    id: 4,
    name: 'noon',
    refrence: 'https://www.noon.com/egypt-ar/',
    icon: 'https://pbs.twimg.com/profile_images/1148938636781637633/cIBGte1y.png',
  },
  {
    id: 5,
    name: '2B',
    refrence: 'https://2b.com.eg',
    icon: 'https://smhttp-ssl-73217.nexcesscdn.net/pub/media/logo/default/logo_1_.png',
  },
  {
    id: 6,
    name: 'Btech',
    refrence: 'https://btech.com',
    icon: 'https://btech.com/static/version1575510532/frontend/Robusta/Btech/ar_EG/images/logo-btech@2x.png',
  },
  // {
  //   id: 5,
  //   name: 'Subscribe',
  //   refrence: 'subscribe',
  //   icon: require('../assets/icons/Subscribe.png'),
  // },

];

const users = [
  {
    password: '123',
    firstName: 'mohamed',
    lastName:'kassim',
    phone: '01095905953',
    email:'m_kassim90@yahoo.com',
    gender:'male',
    family:'kassim'
  }
]
const families = [
  {
    name: 'kassim',
    childsNumber: 3,
    members: {
      childs: [
        {
          name: 'mohamed',
        }
      ],
      parents: {
        mom: {
          name: 'momName'
        },
        dad: {
          name: 'Ahmed'
        }
      }
    }
  }
]
const profile = {
  firstName: 'Zeinab',
  lastName: 'Mohamed',
  email: 'Zeinab_mohamed@gmail.com',
  avatar: require('../assets/icons/avatar.jpg'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
  phoneNumber: '01234567891',
  address: 'Tanta, Gharbia,Egypt',
};
const Location = {
  latitude: 29.939591,
  longitude: 31.063932,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};
const defaultMapSettings = {
  mapType: 'standard',
  showsTraffic: true,
  showBuildings: true,
  zoomEnabled: true,
  zoomTapEnabled: true,
  rotateEnabled: true,
  pitchEnabled: true,
  loadingEnabled: true,
};
const defaultAppSettings = {
  frequency: 2,
  notifications: false,
  newsletter: false,
};
const Stations = [
  {
    id: 4,
    name: 'Zewail City',
    coordinate: { latitude: 30.141, longitude: 31.72509 },
    location: 'Said ibn zaid ST,Badr, Cairo Governorate, Egypt',
    totalDockes: 25,
    totalBikes: 26,
    availableBikes: 20,
    availableDocks: 22,
  },
  {
    id: 6,
    name: 'El rehab',
    coordinate: { latitude: 30.065849, longitude: 31.50099 },
    location: 'Ext. Al-Rehab Rd, Second New Cairo, Cairo Governorate, Egypt',
    totalDockes: 25,
    totalBikes: 26,
    availableBikes: 20,
    availableDocks: 22,
  },
];

const Sponsors = [
  {
    id: 1,
    name: 'Guhina',
    icon: require('../assets/icons/Juhayna.png'),
  },
  {
    id: 2,
    name: 'Zewail City',
    icon: require('../assets/icons/Zewail-City.png'),
  },
  {
    id: 3,
    name: 'National Bank',
    icon: require('../assets/icons/NBE.png'),
  },
];
const mapTypes = [
  { name: 'Terrain', var: 'terrain' },
  { name: 'Satellite', var: 'satellite' },
  { name: 'Hybrid', var: 'hybrid' },
  { name: 'Terrain', var: 'terrain' },
];

const trips = [
  {
    id: 1,
    date: 'Oct 13',
    time: '12:00',
    distance: '45.6 mi',
    scoreString: 'Good',
    score: 8.3,
    from: {
      coords: { latitude: 37.8025259, longitude: -122.4351431 },

      locationName: 'Main Entrance, Right',
    },
    to: {
      coords: { latitude: 37.7948605, longitude: -122.4596065 },
      locationName: 'Helmi Building',
    },
    routeCoordinates: [
      { latitude: 37.8025259, longitude: -122.4351431 },
      { latitude: 37.7896386, longitude: -122.421646 },
      { latitude: 37.7665248, longitude: -122.4161628 },
      { latitude: 37.7734153, longitude: -122.4577787 },
      { latitude: 37.7948605, longitude: -122.4596065 },
    ],
    cash: 20,
    duration: 20,
    distance: 2.2,
    calories: 1200,
    speed: 20,
  },
  {
    id: 2,
    date: 'Oct 12',
    time: '12:00',
    score: 8.3,
    scoreString: 'Good',
    distance: '837.9 mi',
    from: {
      coords: { latitude: 37.7948605, longitude: -122.4596065 },
      locationName: 'Gate 5',
    },

    routeCoordinates: [
      { latitude: 37.8025259, longitude: -122.4351431 },
      { latitude: 37.7896386, longitude: -122.421646 },
      { latitude: 37.7665248, longitude: -122.4161628 },
      { latitude: 37.7734153, longitude: -122.4577787 },
      { latitude: 37.7948605, longitude: -122.4596065 },
    ],
    to: {
      coords: { latitude: 37.8025259, longitude: -122.4351431 },
      locationName: 'One Stop Shop Building',
    },
    cash: 20,
    Duration: 20,
    distance: 2.2,
    calories: 1200,
    speed: 20,
  },
];

export {
  profile,
  menuItems,
  Location,
  Stations,
  Sponsors,
  defaultMapSettings,
  defaultAppSettings,
  mapTypes,
  trips,
  families,
  users
};
