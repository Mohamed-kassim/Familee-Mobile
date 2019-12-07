import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import Home from '../screens/Home'
import Settings from '../screens/Settings/Settings'
import UserSettings from '../screens/Settings/UserSettings'
import FamilySettings from '../screens/Settings/FamilySettings'
import Cart from '../screens/History/History'
import ForgetPassword from '../screens/Auth/ForgetPassword'
import Login from '../screens/Auth/Login'
import Signup from '../screens/Auth/Signup'
import SignupConfirmation from '../screens/Auth/SignupConfirmation'
import { theme } from '../constants'
import chat from '../screens/chat'
import WebView from '../screens/WebView'
import { Badge, Block } from '../components';

const SettingsStack = createStackNavigator({

  Settings,
  UserSettings,
  FamilySettings,

}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  }
})

const AppStack = createStackNavigator({

  Home,
  WebView,

}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  }
})


const AppTabs = createBottomTabNavigator({
  "Home":AppStack,
  "Settings": SettingsStack,
  Cart,
  chat
},
{
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;
      let imgSrc = ''
      if (routeName === 'Home') {
        imgSrc = (focused)?  require('../assets/icons/shop-inactive.png') : require('../assets/icons/shop.png');
      } else if (routeName === 'chat') {
        imgSrc = (focused)?  require('../assets/icons/chat.png') : require('../assets/icons/chat-inactive.png');
      } else if (routeName === 'Cart') {
        imgSrc = (focused)?  require('../assets/icons/cart-inactive.png') : require('../assets/icons/cart.png');
      }
      else if (routeName === 'Settings') {
        imgSrc = (focused)?  require('../assets/icons/Settings.png') : require('../assets/icons/Settings-inactive.png');
      }

      // You can return any component that you like here!
      if (routeName === 'Cart') {
        return (
          <Block>
          <Badge
          size={13}
          color={theme.colors.accent}
          style={{position: 'absolute', top: -4, right: -4}}
           />
          <Image
            style={{
              width: theme.sizes.base*1.5,
              height: theme.sizes.base*1.5,
            }}
            resizeMode="contain"
            source={imgSrc}
          />
          </Block>
        );
      }
      else{
      return (
        <Image
          style={{
            width: theme.sizes.base*1.5,
            height: theme.sizes.base*1.5,
          }}
          resizeMode="contain"
          source={imgSrc}
        />
      );
    }
    },
  }),
  tabBarOptions: {
    activeTintColor: theme.colors.primary,
    inactiveTintColor: 'black',
  },
},)
const AuthStack = createStackNavigator({

  Login,
  Signup,
  SignupConfirmation,
  ForgetPassword,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 4,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image style={{ height: 20, width: 20 }} source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
  }
})

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
const TabNavigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppTabs,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
export { Navigation, TabNavigation } 