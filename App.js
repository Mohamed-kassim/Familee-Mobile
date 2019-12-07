import React, {Component, useEffect, useState} from 'react';
import {Block} from './src/components/';
import {TabNavigation} from './src/navigation';
import {PermissionsAndroid, Platform} from 'react-native';

import {GlobalStateProvider} from './src/utils/state';

export default App = () => {

  return (
    
    <GlobalStateProvider>
      <Block white>
        <TabNavigation />
      </Block>
    </GlobalStateProvider>
  );
};
