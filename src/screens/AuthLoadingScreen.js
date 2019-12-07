import React, {useEffect, useState} from 'react';
import {LoadingAnimation, Block} from '../components';
import {PermissionsAndroid, Platform} from 'react-native';

import {useGlobalState} from '../utils/state';
import AsyncStorage from '@react-native-community/async-storage';
import {mocks} from '../constants';
import axios from 'axios';
import Config from 'react-native-config';
import _ from 'lodash'
export default AuthLoadingScreen = ({navigation}) => {
  const [validToken, setValid] = useState(false);
  const [userData, setUserData] = useGlobalState('userData');
  const [avatar, setAvatar] = useGlobalState('avatar');
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn');
  const [isLoadingComplete, setLoading] = useState(false);
  const [mapSettings, setMapSettings] = useGlobalState('mapSettings');
  const [appSettings, setAppSettings] = useGlobalState('appSettings')

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Stebn Location permission',
          message:
            'Stebn App needs access to your Location ' ,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const getSettings = async () => {
    const stringAppSettings = await AsyncStorage.getItem('appSettings');
    console.log('the app string is', stringAppSettings);
    const appSettings = JSON.parse(stringAppSettings);
    if (
      appSettings &&
      !_.isEmpty(appSettings)
    ) {
      console.log('app settings exists', appSettings);

      setAppSettings(appSettings);
    } else {
      console.log('no app settings putting default');
      setAppSettings(mocks.defaultAppSettings);
      await AsyncStorage.setItem(
        'appSettings',
        JSON.stringify(mocks.defaultAppSettings),
      );
    }
    const stringMapSettings = await AsyncStorage.getItem('mapSettings');
    console.log('the string is', stringMapSettings);
    const mapSettings = JSON.parse(stringMapSettings);
    if (
      mapSettings &&
      !_.isEmpty(mapSettings)
    ) {
      console.log('map settings exists', mapSettings);

      setMapSettings(mapSettings);
    } else {
      console.log('no settings putting default');
      setMapSettings(mocks.defaultMapSettings);
      await AsyncStorage.setItem(
        'mapSettings',
        JSON.stringify(mocks.defaultMapSettings),
      );
    }
  };

  async function validateToken() {
    const stringUserData = await AsyncStorage.getItem('userData');
    if (stringUserData) {
      let userData = JSON.parse(stringUserData);
      const {accessToken} = userData;
      console.log('found access token with value', accessToken);
      const url = `${Config.BASE_URL}authentication`;

      axios
        .request({
          url,
          method: 'POST',
          data: {
            strategy: 'jwt',
            accessToken,
          },
        })
        .then(result => {
          console.log('logged in with userData object ', result.data);
          setIsLoggedIn(true);
          setUserData(result.data);
          if (result) {
            const avatar_url = `${Config.BASE_URL}uploads/${result.data.user._id}`;
            axios
              .get(avatar_url.trim(), {
                headers: {
                  Authorization: `Bearer ${result.data.accessToken}`,
                },
              })
              .then(res => {
                console.log('here');
                console.log(res);
                setAvatar(res.data);
                setLoading(true);
              })
              .catch(err => {
                console.log('here2');

                console.log(err.response);
                setAvatar('');
                setLoading(true);
              });
          }
        })
        .catch(err => {
          console.log(err);
          console.log('Error in token Validation', err.response);
          setUserData({});
          setAvatar('');
          setLoading(true);
        });
    } else {
      setUserData({});
      setAvatar('');
      setLoading(true);
    }
  }
  useEffect(() => {
    Platform.OS === 'android'? requestLocationPermission() : null
    
    getSettings();
    validateToken();
  }, [isLoadingComplete]);

  const onLoadingFinish = () => {
    console.log('on loading finish', isLoadingComplete);
    navigation.navigate('App');
  };
  console.log('is it finished', isLoadingComplete);
  return (
    <Block>
      <LoadingAnimation
        img={require('../assets/splash.png')}
        Loaded={isLoadingComplete}
        onLoadingFinish={onLoadingFinish}
      />
    </Block>
  );
};
