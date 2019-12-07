import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, Alert} from 'react-native'
import {Block, Text, Input, Button, Divider, ErrorCard} from '../../components';
import {theme} from '../../constants';
import Config from 'react-native-config';
import axios from 'react-native-axios'
import {StackActions, NavigationActions} from 'react-navigation';

export default SignupConfirmation = ({navigation}) => {
    const [validCode, setvalidCode] = useState(false)
    const [code, setCode] = useState('')
    const [gettingData, setgettingData] = useState(false)
    const [errorsObj, setErrorsObj] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const formFields = [
        'code',
      ];
  const verifyCode = () => {
    setGettingData(true);
    const BASE_URL = Config.BASE_URL;
    axios
      .get(`${BASE_URL}verify-email/${rfid}`)
      .then(res => {
        console.log(res);
        if (res.data) {
            setvalidCode(true);
        } else {
          validateField('rfid');
          setvalidCode(false);
        }
        setGettingData(false);
      })
      .catch(err => {
        validateField('code');
        setvalidCode(false);
        console.log(err);
        console.log(err.response);
        setGettingData(false);
      });
  };

  const validateFields = field => {
    console.log('start validationg', field);
    let obj = {...errorsObj};
    let valid = true;

    if (eval(field).length === 0) {
      if (obj[field]) {
        obj[field].push(`${field} is mandatory.`);
        obj[field] = Array.from(new Set(obj[field]));
      } else {
        obj[field] = new Array(`${field} is mandatory.`);
      }
      valid = false;
    } else {
      if (obj[field]) {
        let array = obj[field];
        array = array.filter(item => item !== `${field} is mandatory.`);
        if (array.length === 0) {
          delete obj[field];
        } else {
          obj[field] = array;
        }
      }
    }
    // if (field === 'code') {
    //   if (!validCode) {
    //     if (obj[field]) {
    //       obj[field].push(`Invalid Verification Code.`);
    //       obj[field] = Array.from(new Set(obj[field]));
    //     } else {
    //       obj[field] = new Array(`Invalid Verification Code.`);
    //     }
    //     valid = false;
    //   } else {
    //     if (obj[field]) {
    //       let array = obj[field];
    //       array = array.filter(
    //         item => item !== `Invalid Verification Code.`,
    //       );
    //       if (array.length === 0) {
    //         delete obj[field];
    //       } else {
    //         obj[field] = array;
    //       }
    //     }
    //   }
    // }

    return {obj, valid};
  };
  const validateField = field => {
    const result = validateFields(field);
    const errorsObj = result.obj;
    setErrorsObj(errorsObj);
  };
  const resetError = field => {
    console.log('start resetting', field);
    let tempErrorsObj = {...errorsObj};
    if (tempErrorsObj[field]) {
      delete tempErrorsObj[field];
    }
    setErrorsObj(tempErrorsObj);
  };
  const validateForm = () => {
    let valid = true;
    let errorsObj = null;
    setErrorsObj([]);

    formFields.forEach(field => {
      const result = validateFields(field);
      valid = valid && result.valid;
      errorsObj = {...result.obj, ...errorsObj};
    });
    setErrorsObj(errorsObj);
    return valid;
  };

  const errorMsgs = Object.values(errorsObj).flat();
  const errors = Object.keys(errorsObj).flat();
  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
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
  const handleVerification = ()=> {
    setIsLoading(true)
    const {BASE_URL} = Config;
    const result = validateForm();
    console.log('form validation result',result)
    const data = {
        phone: navigation.state.params.phone,
        code,
    }
    console.log(data)
    if(result){
      axios({
        url: `${BASE_URL}verify-phone`,
        method: 'post',
        data,
      })
      .then((res)=> {
        console.log(res)
        setIsLoading(false)
        Alert.alert(
          'Success',
          'Account Verified Successfully, Please Login',
          [
            {text: 'Continue', onPress: () => navigateAndInit('Login')},
          ],
          {cancelable: false},
        );
      })
      .catch((err)=>{
        console.log(err)
        console.log(err.response)
        Alert.alert(
          'Error',
          'Something went wrong',
          [
            {
              text: 'Try again',
              onPress: () => {},
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
        setIsLoading(false)
      })
    }
    else{
        setIsLoading(false)
    }
  }
  console.log(navigation.state)

  console.log(navigation.state.params.phone)
  return (
    <Block padding={[0, theme.sizes.base * 1.5, 0, theme.sizes.base * 1.5]}>
      <Block flex={false} row center space="between">
        <Text h1 bold>
          Verification
        </Text>
      </Block>
      <Block  margin={[theme.sizes.padding*2, 0, 0, 0]}>
        <Text center title bold>
          Please Enter the Verification code sent to number
        </Text>
        <Block flex={false} margin={[theme.sizes.base*2,0,0,0]}/>
        <Text center title bold secondary>
          {`+${navigation.state.params.phone}`}
        </Text>
        <Divider flex={false}/>
        {errors.length !== 0 ? <ErrorCard flex={false} errorMsgs={errorMsgs} /> : null}
        <Input
          mandatory
          correct={validCode}
          label="Verify Code"
          error={hasErrors('code')}
          style={[
            styles.input,
            hasErrors('code'),
            validCode ? styles.Correct : null,
          ]}
          defaultValue={code}
          value={code}
          onChangeText={text => setCode(text)}
        //   onBlur={() => verifyCode(code)}
          onFocus={() => resetError('code')}
        />
        {gettingData ? (
          <ActivityIndicator size="small" color="red" />
        ) : validCode ? (
          <Text center bold success>
            Code validated Successfully
          </Text>
        ) : null}
        <Button gradient onPress={() => handleVerification(true)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Continue Verification
                </Text>
              )}
            </Button>
      </Block>
    </Block>
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
});