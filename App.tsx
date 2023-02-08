/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CoinsStack from './src/components/CoinsStack';
import FavoritesStack from './src/components/favorites/FavoritesStack'
import colors from './src/res/colors'

const Tabs = createBottomTabNavigator()
const { Navigator, Screen  } = Tabs


function App() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: "#3CD484",
          tabBarItemStyle: {
            backgroundColor: colors.blackPearl
          },
        }}
      >
        <Screen
          name='Coins'
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image source={require('./src/assets/bank.png')}
                style={{ width: size, height: size, tintColor:color }}
              />
            ),
            headerShown: false
          }}
        />
        <Screen
          name='Favorites'
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image source={require('./src/assets/star.png')}
                style={{ width: size, height: size, tintColor:color }}
              />
            ),
            headerShown: false
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}


export default App;
