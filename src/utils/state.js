import { createGlobalState } from 'react-hooks-global-state';
import { mocks } from '../constants';

const initialState = {
  userData: {},
  users: [
    {
      password: '123',
      firstName: 'mohamed',
      lastName: 'kassim',
      phone: '01095905953',
      email: 'm_kassim90@yahoo.com',
      gender: 'male',
      family: 'kassim'
    }
  ],
  families: [
    {
      name: 'kassim',
      childsNumber: 3,
      members: {
        childs: [
          {
            name: 'mohamed',
            type: 'Son'
          }
        ],
        parents: [
          {
            type: 'Mom',
            name: 'momName'
          },
          {
            type: 'Dad',
            name: 'Ahmed'
          }
        ]
        ,
        grandParents: [
          {
            type: 'grandma',
          },
          {
            type: 'grandpa',
          }
        ]
      }
    }
  ],
  mapSettings: {},
  appSettings: {},
  isLoggedIn: false,
  avatar: '',
  fcmToken: '',
  fbPassword: '',
};

export const { GlobalStateProvider, useGlobalState } = createGlobalState(
  initialState,
);
