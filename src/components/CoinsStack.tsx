import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from './CoinDetailScreen';
import colors from '../res/colors';

const Stack = createStackNavigator()

const { Navigator, Screen } = Stack

const CoinsStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl
        },
        headerTintColor: colors.white
      }}
    >
        <Screen 
            name='Coins' 
            component={CoinsScreen}
        />
        <Screen
            name='Coin Detail'
            component={CoinDetailScreen}
        />
    </Navigator>
  )
}

const styles = StyleSheet.create({})

export default CoinsStack