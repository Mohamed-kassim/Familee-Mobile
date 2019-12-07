import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Block, Button, Text, Divider, Input} from '../../components';
import {mocks, theme} from '../../constants';
const {width, height} = Dimensions.get('screen');
import {StackActions, NavigationActions} from 'react-navigation';
import {useGlobalState} from '../../utils/state';

export default Login = ({navigation}) => {
  const [userData, setUserData] = useGlobalState('userData');
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useGlobalState('users')


  const navigateAndInit = (routeName, props)=> {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: routeName}),
      ],
    });
    navigation.dispatch(resetAction);
    navigation.navigate(routeName, props);
}
  const handleSignUp = async () => {
    setIsLoading(true);
    const user = users.filter((user)=>user.email === email)
    console.log(user)
    if(user){
      if(user[0].password === password){
        setUserData({
          user,
        });
        setIsLoggedIn(true);
        navigateAndInit('Home')
      }
    }
   
    setIsLoading(false);

  
  };
  return (
    <KeyboardAvoidingView
      style={styles.signup}
      behavior="padding"
      keyboardVerticalOffset={theme.sizes.base * -30}>
      <Block padding={[0, theme.sizes.base * 1.5, 0, theme.sizes.base * 1.5]}>
        <Block flex={false} row center space="between">
          <Text h1 bold>
            Login?
          </Text>
        </Block>
        <Block middle margin={[theme.sizes.padding*.5, 0, 0, 0]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
<Block
        flex={false}
        center
        padding={[theme.sizes.padding * 3, 0, theme.sizes.padding * 3, 0]}>
        <Image
          resizeMode="contain"
          style={{
            height: height * 0.15,
            width: width * 0.9,
          }}
          source={require('../../assets/icons/logo.png')}
        />
      </Block>
      <Block flex={false}>
        <Input
          mandatory
          email
          label="Email"
          style={[styles.input]}
          defaultValue={email}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          mandatory
          secure
          label="Password"
          style={[styles.input]}
          defaultValue={password}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </Block>
      <Button gradient onPress={() => handleSignUp()}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text bold white center>
            Sign In
          </Text>
        )}
      </Button>
      <Block row space={'between'}>
        <Button
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text bold caption accent>
            Become A memeber?
          </Text>
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('ForgetPassword');
          }}>
          <Text bold caption gray>
            Forget password?
          </Text>
        </Button>
      </Block>


            </ScrollView>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
    color: theme.colors.accent,
  },
  Correct: {
    borderBottomColor: 'green',
    color: 'green',
  },
  lottie: {
    width: theme.sizes.base * 6.1,
    height: theme.sizes.base * 6.1,
  },
  picker: {
    backgroundColor: 'red',
  },
});
