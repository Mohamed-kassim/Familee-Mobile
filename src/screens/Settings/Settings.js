import React, {useState} from 'react';
import {StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import {mocks, theme} from '../../constants';
import {Block, Button, Text, Divider, Switch} from '../../components';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';
import {useGlobalState} from '../../utils/state'
export default  Settings =({navigation})=> {
  const [isLoading, setIsLoading] = useState(false)
  const [appSettings, setAppSettings] = useGlobalState('appSettings')
  const [userData, setUserData] = useGlobalState('userData')
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const {
    frequency,
    notifications,
    newsletter
  } = appSettings

  let newAppSettings = {};

  const handleSlider = (key, value) => {
   newAppSettings = {
      ...appSettings,
      [key]: value,
    };
    setAppSettings(newAppSettings);
  };
  const handleUserSettings = () => {
    console.log('user data is',userData)
    navigation.navigate('UserSettings');
  };
  const handleFamilySettings = () => {
    console.log('user data is',userData)
    navigation.navigate('FamilySettings');
  };

  const handleSave = async () => {
    setIsLoading(true);
    console.log('new app settings is', JSON.stringify(appSettings));
    await AsyncStorage.setItem('appSettings', JSON.stringify(appSettings));
    setIsLoading(false);
  };
  
  const setToggle = (setting, value) => {
    newAppSettings = {
      ...appSettings,
      [setting]: value,
    };
    setAppSettings(newAppSettings);
  };
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Settings
          </Text>
          <Button onPress={() => handleSave()}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold color={'#3498db'}>
                {' '}
                Save
              </Text>
            )}
          </Button>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block margin={[theme.sizes.padding, 0, 0, 0]}>
            <Button
              onPress={(!isLoggedIn)? null: handleUserSettings}
              color={theme.colors.gray4}
              style={{paddingHorizontal: theme.sizes.padding}}>
              <Block center row space={'between'}>
            <Text primary={!isLoggedIn} bold>User settings</Text>
                <Image
                  style={styles.arrow}
                  source={require('../../assets/icons/Arrow.png')}
                />
              </Block>
            </Button>
            <Button
              onPress={(!isLoggedIn)? null: handleFamilySettings}
              color={theme.colors.gray4}
              style={{paddingHorizontal: theme.sizes.padding}}>
              <Block center row space={'between'}>
            <Text primary={!isLoggedIn} bold>Your family</Text>
                <Image
                  style={styles.arrow}
                  source={require('../../assets/icons/Arrow.png')}
                />
              </Block>
            </Button>
          </Block>
          <Divider />
          <Text
            bold
            title
            style={{
              marginBottom: theme.sizes.padding * 0.5,
              marginLeft: theme.sizes.padding,
            }}>
            Application Settings
          </Text>
          <Block style={styles.sliders}>
            <Block margin={[10, 0]}>
              <Text
                gray
                style={{marginBottom: 10}}>{`Refresh Frequency ${Math.floor(
                frequency,
              )}m`}</Text>
              <Slider
                minimumValue={0}
                maximumValue={5}
                style={{height: 19}}
                thumbStyle={styles.thumb}
                trackStyle={{height: 6, borderRadius: 6}}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                thumbTintColor={theme.colors.secondary}
                value={frequency}
                onValueChange={value => handleSlider('frequency', value)}
              />
              <Text caption gray right>
                5m
              </Text>
            </Block>
          </Block>
          <Block style={styles.inputs}>
            <Block style={styles.toggles}>
              <Block
                row
                center
                space="between"
                style={{marginBottom: theme.sizes.base * 2}}>
                <Text gray>Notifications</Text>
                <Switch
                  value={notifications}
                  onValueChange={value => setToggle('notifications', value)}
                />
              </Block>

              <Block
                row
                center
                space="between"
                style={{marginBottom: theme.sizes.base * 2}}>
                <Text gray>Newsletter</Text>
                <Switch
                  value={newsletter}
                  onValueChange={value => setToggle('newsletter', value)}
                />
              </Block>
              <Divider />
              {(isLoggedIn)? <Text center title bold >One time Family Points: </Text> : null}
              {(isLoggedIn)?<Text primary bold center >25</Text>: null}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 1.5,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  arrow: {
    height: theme.sizes.base * 1.2,
    width: theme.sizes.base * 1.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
});
