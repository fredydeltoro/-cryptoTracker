/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import CoinsStack from './src/components/CoinsStack';


function App() {
  return (
    <NavigationContainer>
      <CoinsStack />
    </NavigationContainer>
  );
}


export default App;
