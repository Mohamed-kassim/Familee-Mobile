import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Picker,
  Alert
} from 'react-native';
import { Block, Button, Text, Divider, Input, ErrorCard } from '../../components';
import { mocks, theme } from '../../constants';
import { ScrollView } from 'react-native-gesture-handler';
import { useGlobalState } from '../../utils/state'
import { StackActions, NavigationActions } from 'react-navigation';
export default Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male');
  const [family, setFamily] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [gettingData, setGettingData] = useState(false)
  const [showError, setShowError] = useState(false);
  const [validFamily, setValidFamily] = useState(false)
  const [errMsg, setErrMsg] = useState('Something went wrong');
  const [errorsObj, setErrorsObj] = useState({});
  const [users, setUsers] = useGlobalState('users')
  const [families, setFamilies] = useGlobalState('families')
  const [familyPosition, setFamilyPosition] = useState('Son')
  const strongRegex = /(?=.*[0-9])/;
  const emailRegex = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  const phoneRegex = /(201)[0-9]{9}/;
  const formFields = [
    'confirmPassword',
    'password',
    'lastName',
    'firstName',
    'email',
    'family',
    'phone',
  ];
  console.log('the users is ', users)
  const validateField = field => {
    const result = validateFields(field);
    const errorsObj = result.obj;
    setErrorsObj(errorsObj);
  };
  const resetError = field => {
    console.log('start resetting', field);
    let tempErrorsObj = { ...errorsObj };
    if (tempErrorsObj[field]) {
      delete tempErrorsObj[field];
    }
    setErrorsObj(tempErrorsObj);
  };
  const navigateAndInit = (routeName) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: routeName }),
      ],
    });
    navigation.dispatch(resetAction);
    navigation.navigate(routeName);
  }
  const handleSignUp = async () => {
    setIsLoading(true)
    const data = {
      password,
      firstName,
      lastName,
      phone,
      email,
      gender,
      family,
    }
    let newUsers = users
    newUsers.push(data)
    setUsers(newUsers)
    let newFamilies = {...families[0],members:{
      ...families[0].members,
      childs: families[0].members.childs.push({
        name: firstName+lastName
      })
        
      }
    }
    console.log('new families is ',newFamilies[0].members)
    
    // newFamilies = families.push
    setIsLoading(false)
    Alert.alert(
      'Success',
      'Account Registered Successfully',
      [
        {
          text: 'Cancel',
          onPress: () => navigateAndInit('Signup'),
          style: 'cancel',
        },
        { text: 'Login', onPress: () => navigation.navigate('Login') },
      ],
      { cancelable: false },
    );

  };
  const validateFields = field => {
    console.log('start validationg', field);
    let obj = { ...errorsObj };
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

    if (field === 'email') {
      if (!emailRegex.test(email)) {
        if (obj[field]) {
          obj[field].push(`Please enter a valid email address.`);
          obj[field] = Array.from(new Set(obj[field]));
        } else {
          obj[field] = new Array(`Please enter a valid email address.`);
        }
        valid = false;
      } else {
        if (obj[field]) {
          let array = obj[field];
          array = array.filter(
            item => item !== `Please enter a valid email address.`,
          );
          if (array.length === 0) {
            delete obj[field];
          } else {
            obj[field] = array;
          }
        }
      }
    }
    console.log('is Family valid', validFamily)
    if (field === 'family') {
      if (!validFamily) {
        if (obj[field]) {
          obj[field].push(`Family with this name doesn't Exists.`);
          obj[field] = Array.from(new Set(obj[field]));
        } else {
          obj[field] = new Array(`Family with this name doesn't Exists.`);
        }
        valid = false;
      } else {
        if (obj[field]) {
          let array = obj[field];
          array = array.filter(
            item => item !== `Family with this name doesn't Exists.`,
          );
          if (array.length === 0) {
            delete obj[field];
          } else {
            obj[field] = array;
          }
        }
      }
    }
    if (field === 'phone') {
      if (!phoneRegex.test(phone)) {
        if (obj[field]) {
          obj[field].push(`Please enter a valid phone number.`);
          obj[field] = Array.from(new Set(obj[field]));
        } else {
          obj[field] = new Array(`Please enter a valid phone number.`);
        }
        valid = false;
      } else {
        if (obj[field]) {
          let array = obj[field];
          array = array.filter(
            item => item !== `Please enter a valid phone number.`,
          );
          if (array.length === 0) {
            delete obj[field];
          } else {
            obj[field] = array;
          }
        }
      }
    }
    if (field === 'password') {
      if (!strongRegex.test(password)) {
        if (obj[field]) {
          obj[field].push(
            `Password should have minimum length of 8, at least 1 upper case letter, 1 number and 1 special character.`,
          );
          obj[field] = Array.from(new Set(obj[field]));
        } else {
          obj[field] = new Array(
            `Password should have minimum length of 8, at least 1 upper case letter, 1 number and 1 special character.`,
          );
        }
        valid = false;
      } else {
        if (obj[field]) {
          let array = obj[field];
          array = array.filter(
            item =>
              item !==
              `Password should have minimum length of 8, at least 1 upper case letter, 1 number and 1 special character.`,
          );
          if (array.length === 0) {
            delete obj[field];
          } else {
            obj[field] = array;
          }
        }
      }
    }

    if (field === 'confirmPassword') {
      if (password !== confirmPassword) {
        if (obj[field]) {
          obj[field].push(`Two passwords do not match`);
          obj[field] = Array.from(new Set(obj[field]));
        } else {
          obj[field] = new Array(`Two passwords do not match`);
        }
        valid = false;
      } else {
        if (obj[field]) {
          let array = obj[field];
          array = array.filter(item => item !== `Two passwords do not match`);
          if (array.length === 0) {
            delete obj[field];
          } else {
            obj[field] = array;
          }
        }
      }
    }

    return { obj, valid };
  };
  const validateForm = () => {
    let valid = true;
    let errorsObj = null;
    setErrorsObj([]);

    formFields.forEach(field => {
      const result = validateFields(field);
      valid = valid && result.valid;
      errorsObj = { ...result.obj, ...errorsObj };
    });
    setErrorsObj(errorsObj);
    return valid;
  };
  const getDataFromFamily = () => {
    console.log(mocks.families)
    const array = mocks.families
    setGettingData(true)
    const result = array.filter((fam) => fam.name === family)
    console.log('result is ', result)
    if (Array.isArray(result) && result.length
    ) {
      setValidFamily(true)
      // setFbPassword(res.data[family].userPassword)
    }
    else {
      validateField('family')
      setValidFamily(false)
    }
    setGettingData(false)

  }
  const errorMsgs = Object.values(errorsObj).flat();
  const errors = Object.keys(errorsObj).flat();
  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  return (
    <KeyboardAvoidingView
      style={styles.signup}
      behavior="padding"
      keyboardVerticalOffset={theme.sizes.base * -30}>
      <Block padding={[0, theme.sizes.base * 1.5, 0, theme.sizes.base * 1.5]}>
        <Block flex={false} row center space="between">
          <Text h1 bold>
            Become A member?
          </Text>
        </Block>
        <Block middle margin={[theme.sizes.padding, 0, 0, 0]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            {errors.length !== 0 ? <ErrorCard errorMsgs={errorMsgs} /> : null}

            <Input
              mandatory
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={email}
              value={email}
              onChangeText={text => setEmail(text)}
              onBlur={() => validateField('email')}
              onFocus={() => resetError('email')}
            />
            <Input
              mandatory
              label="First Name"
              error={hasErrors('firstName')}
              style={[styles.input, hasErrors('firstName')]}
              defaultValue={firstName}
              value={firstName}
              onChangeText={text => setFirstName(text)}
              onBlur={() => validateField('firstName')}
              onFocus={() => resetError('firstName')}
            />
            <Input
              mandatory
              label="Last Name"
              error={hasErrors('lastName')}
              style={[styles.input, hasErrors('lastName')]}
              defaultValue={lastName}
              value={lastName}
              onChangeText={text => setLastName(text)}
              onBlur={() => validateField('lastName')}
              onFocus={() => resetError('lastName')}
            />
            <Input
              mandatory
              phone
              label="Phone"
              error={hasErrors('phone')}
              style={[styles.input, hasErrors('phone')]}
              defaultValue={phone}
              value={phone}
              placeholder={'201.....'}
              onChangeText={text => setPhone(text)}
              onBlur={() => validateField('phone')}
              onFocus={() => resetError('phone')}
            />
            <Block>
              <Text gray>Family Position</Text>
              <Picker
                selectedValue={familyPosition}
                onValueChange={(itemValue, itemIndex) => setFamilyPosition(itemValue)}>
                <Picker.Item label="Son" value="son" />
                <Picker.Item label="Parent" value="parent" />
                <Picker.Item label="GrandParent" value="grandparent" />
              </Picker>
            </Block>
            <Block>
              <Text gray>Gender</Text>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </Block>
            <Input
              mandatory
              correct={validFamily}
              label="Family"
              error={hasErrors('family')}
              style={[styles.input, hasErrors('family'), (validFamily) ? styles.Correct : null]}
              defaultValue={family}
              value={family}
              onChangeText={text => setFamily(text)}
              onBlur={() => getDataFromFamily(family)}
              onFocus={() => resetError('family')}
            />
            {
              (gettingData) ? <ActivityIndicator size="small" color="red" /> :
                (validFamily) ? <Text center bold success>Family Exists you can continue</Text> : null
            }
            <Input
              mandatory
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={password}
              value={password}
              onChangeText={text => setPassword(text)}
              onBlur={() => validateField('password')}
              onFocus={() => resetError('password')}
            />
            <Input
              mandatory
              secure
              label="Confirm Password"
              error={hasErrors('confirmPassword')}
              style={[styles.input, hasErrors('confirmPassword')]}
              defaultValue={confirmPassword}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              onBlur={() => validateField('confirmPassword')}
              onFocus={() => resetError('confirmPassword')}
            />


            <Button gradient onPress={() => handleSignUp(true)}>
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                  <Text bold white center>
                    Sign Up
                </Text>
                )}
            </Button>
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
});
