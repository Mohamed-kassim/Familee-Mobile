import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  Alert
} from 'react-native';
import {Block, Text, Button, Card} from '../components';
import {theme, mocks} from '../constants';
import axios from 'react-native-axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import {useGlobalState} from '../utils/state';

const width = Math.round(Dimensions.get('window').width);

export default Home = ({navigation}) => {
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn');
  const [userData, setUserData] = useGlobalState('userData');

  const [avatar, setAvatar] = useGlobalState('avatar');
  const [mapSettings, setMapSettings] = useGlobalState('mapSettings')
  console.log('map settings is ', mapSettings)
  console.log('isLoggedIn', isLoggedIn);

  const handleStebn=()=> {
    Linking.canOpenURL('https://stebn.com').then(supported => {
      if (supported) {
        Linking.openURL(`https://stebn.com`);
      } else {
        Alert.alert(
          'Error while opening',
          'Something went wrong',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    });
  }
  const handleItem=(link)=> {
    navigation.navigate('WebView', {link})
  }
  const renderMenuItem = item => {
    console.log('the icon is',item.icon)
    const {navigate} = navigation;
    const shouldBeDisabled =
      (item.name === 'History' || item.name === 'Start Booking') && !isLoggedIn;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          handleItem(item.refrence)
        }}>
        <Card
          shadow
          center
          middle
          style={styles.drivingStatus}
          color={shouldBeDisabled ? theme.colors.gray2 : null}>
          <Image
            source={{uri: item.icon}}
            style={{
              height: theme.sizes.base * 6,
              width: theme.sizes.base * 6,
              marginBottom: theme.sizes.base * 2,
            }}
            resizeMode="contain"
          />
          <Text title transform="capitalize">
            {item.name}
          </Text>
          {shouldBeDisabled ? (
            <Text
              color={theme.colors.accent}
              bold
              spacing={-1.1}
              height={theme.sizes.h2 + 4}>
              Sign In?
            </Text>
          ) : null}
        </Card>
      </TouchableOpacity>
    );
  };
  console.log('user details is okay in home', userData);
  const profile = userData.user;
  return (
    <Block center padding={theme.sizes.base}>
      <Block flex={false} row center space="between">
        <Block column style={{marginVertical: theme.sizes.base * 2}}>
          <Text gray title spacing={-0.6} height={theme.sizes.title + 4}>
            Welcome
          </Text>
          {isLoggedIn ? (
            <Text
              title
              color={'black'}
              ßß
              bold
              spacing={-1.1}
              height={theme.sizes.h2 + 4}>
              {profile[0].firstName} {profile[0].lastName}
            </Text>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                title
                color={theme.colors.accent}
                bold
                spacing={-1.1}
                height={theme.sizes.h2 + 4}>
                Sign In?
              </Text>
            </TouchableOpacity>
          )}
        </Block>
        {isLoggedIn ? (
          <Button
            onPress={() => navigation.navigate('UserSettings', {userData})}>
            <Image
              source={avatar ? avatar : mocks.profile.avatar}
              style={styles.avatar}
            />
          </Button>
        ) : null}
      </Block>
      <Block >
      <FlatList
        style={{
          paddingTop: theme.sizes.base,
          paddingLeft: theme.sizes.base * 0.4,
          width: '100%',
        }}
        horizontal={false}
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        numColumns={2}
        data={mocks.menuItems}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => renderMenuItem(item)}
      />
      </Block>
      <Button
        style={{padding: 0, margin: 0, height: 20}}
        onPress={() => {
          handleStebn();
        }}>
        <Block center row>
          <Text style={{marginHorizontal: 10}} center underlined semibold gray>
            Powered by Family Buy®
          </Text>
          <Image
            source={require('../assets/icons/logo.png')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </Block>
      </Button>
    </Block>
  );
};
Home.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 2,
    marginBottom: -theme.sizes.base * 6,
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  },
  drivingStatus: {
    marginRight: theme.sizes.base,
    width: width / 2.4,
  },
  drivingIcon: {
    height: 56,
    marginBottom: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.5,
    width: theme.sizes.base * 2.5,
    borderRadius: theme.sizes.base * 3,
    overflow: 'hidden',
  },
});
