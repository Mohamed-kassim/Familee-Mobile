import React, {useState} from 'react';
import {StyleSheet, ScrollView, Image, TextInput,ActivityIndicator} from 'react-native';
import {Text, Block, Button} from '../../components';
import {theme, mocks} from '../../constants';
import {useGlobalState} from '../../utils/state';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';

const editableFields = [
  {name: 'First name', var: 'firstName'},
  {name: 'Last name', var: 'lastName'},
];
const nonEditableFields = [
  {name: 'E-mail', var: 'email'},
  {name: 'Phone Number', var: 'phone'},
];
export default  UserSettings =({navigation})=> {
  const [userData, setUserData] = useGlobalState('userData')
  const [editing, setEditing] = useState({})
  const [mapSettings, setMapSettings] = useGlobalState('mapSettings')
  const [appSettings, setAppSettings] = useGlobalState('appSettings')
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')
  const [avatar, setAvatar] = useGlobalState('avatar');
  const [isLoading, setIsLoading] = useState(false)
  const profile = userData.user
  console.log(profile[0])
  const handleEdit =(name, text)=> {
    const newProfile= {...profile, [profile[0][name]] : text}
    const userData = {
      ...userData, user: newProfile
    }
  }
  const toggleEdit = (name) => {
    setEditing(!editing ? name : null)
  }

  const renderEdit = (name) => {
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[0][name]}
          onChangeText={text => handleEdit([name], text)}
        />
      );
    }
    return <Text bold>{profile[0][name]}</Text>;
  }
  const handleUpload=()=>{
    console.log('start uploadin')
  }
  const navigateAndInit = (routeName)=> {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: routeName}),
      ],
    });
    navigation.dispatch(resetAction);
    navigation.navigate(routeName);
}
  const handleLogOut = async ()=> {
    setIsLoading(true)
    setIsLoggedIn(false)
    navigateAndInit('Login')
    await AsyncStorage.getAllKeys()
    .then(keys => {
      console.log(keys)
      AsyncStorage.multiRemove(keys)})
    .then(() => {
      setMapSettings({})
      setAppSettings({})
      setUserData({})
      setAvatar('')
      
    });
    setIsLoading(false)
    
    
  }
    console.log(profile[0])
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            User Settings
          </Text>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block center middle >
            <Image source={(avatar)? avatar : mocks.profile.avatar} style={styles.avatar} />
            <Button onPress={handleUpload}style={{ marginHorizontal: theme.sizes.padding}}>
              <Text medium secondary>
                Edit
              </Text>
            </Button>
          </Block>
          <Block style={styles.inputs}>
            {editableFields.map(field => (
              <Block
                key={field.var}
                row
                space="between"
                margin={[theme.sizes.base * 0.7, 0]}
                style={styles.inputRow}>
                <Block>
                  <Text gray2 style={{marginBottom: theme.sizes.base * 0.7}}>
                    {field.name}
                  </Text>
                  {renderEdit(field.var)}
                </Block>
                <Text
                  medium
                  secondary
                  onPress={() => toggleEdit(field.var)}>
                  {editing === field.var ? 'Save' : 'Edit'}
                </Text>
              </Block>
            ))}
            {nonEditableFields.map(field => (
              <Block
                key={field.var}
                row
                space="between"
                margin={[theme.sizes.base * 0.7, 0]}
                style={styles.inputRow}>
                <Block>
                  <Text gray2 style={{marginBottom: theme.sizes.base * 0.7}}>
                    {field.name}
                  </Text>
                  <Text bold> {profile[0][field.var]}</Text>
                </Block>
              </Block>
            ))}
                      <Button gradient onPress={() => handleLogOut()}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Log out
                </Text>
              )}
            </Button>
          </Block>

        </ScrollView>
      </Block>
    );
  }


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 1.5,
    marginBottom: theme.sizes.base * 1.5,
  },
  arrow: {
    height: theme.sizes.base * 1.2,
    width: theme.sizes.base * 1.2,
  },
  inputs: {
    // marginTop: theme.sizes.base * 0.5,
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
  avatar: {
    height: theme.sizes.base * 7,
    width: theme.sizes.base * 7,
    marginTop: theme.sizes.padding
  },
});
