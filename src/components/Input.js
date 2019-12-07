import React, { Component } from 'react'
import { StyleSheet, TextInput, Image} from 'react-native'
// import { Icon } from 'expo';

import Text from './Text';
import Block from './Block';
import Button from './Button';
import { theme } from '../constants';
import { ThemeColors } from 'react-navigation';

export default class Input extends Component {
  state = {
    toggleSecure: false,
  }

  renderLabel() {
    const { label, error, correct } = this.props;
    return (
      <Block flex={false}>
        {label ? <Text gray={!error} success={correct} accent={error}>{label}</Text> : null}
      </Block>
    )
  }

  renderToggle() {
    const { secure, rightLabel } = this.props;
    const { toggleSecure } = this.state;

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({ toggleSecure: !toggleSecure })}
      >
        {
          rightLabel ? rightLabel :
          <Image
            source={require('../assets/images/show.png')}
            resizeMode="contain"
            style={{ width: theme.sizes.font*1.70, maxHeight: theme.sizes.font*1.70, overflow: 'visible' }}
          />
        }
      </Button>
    );
  }

  renderRight() {
    const { rightLabel, rightStyle, onRightPress } = this.props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  render() {
    const {
      email,
      phone,
      number,
      secure,
      error,
      correct,
      style,
      ...props
    } = this.props;

    const { toggleSecure } = this.state;
    const isSecure = toggleSecure ? false : secure;

    const inputStyles = [
      styles.input,
      error && { borderColor: theme.colors.accent },
      correct && { borderColor: 'green' },
      style,
    ];

    const inputType = email
      ? 'email-address' : number
      ? 'numeric' : phone
      ? 'phone-pad' : 'default';

    return (
      <Block flex={false} margin={[theme.sizes.base, 0]}>
        {this.renderLabel()}
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={inputType}
          {...props}
        />
        {this.renderToggle()}
        {this.renderRight()}
      </Block>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.black,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base,
    right: 0,
  }
});