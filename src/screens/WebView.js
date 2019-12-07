import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default class MyWebComponent extends Component {
  render() {
    return (
      <WebView source={{ uri: this.props.navigation.state.params.link }} />
    );
  }
}