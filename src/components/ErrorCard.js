import React, { Component } from 'react'
import {StyleSheet } from 'react-native'
import {Card, Text} from './';
import { theme } from '../constants';


export default class ErrorCard extends Component {

  render() {
    const { errorMsgs, ...props } = this.props
    return (
      <Card style={styles.hasErrors} {...props}>
        {errorMsgs.map((msg) =>
          <Text key = {msg} body height={theme.sizes.base*1.5} color={theme.colors.accent} style= {styles.msg} >
            {`- ${msg}`}
          </Text>
        )}

      </Card>
    )
  }
}

const styles = StyleSheet.create({
  hasErrors: {
    borderBottomColor: 'red',
    borderBottomWidth: .5,
    paddingLeft: 0,
  },
  msg:{
  }
})
