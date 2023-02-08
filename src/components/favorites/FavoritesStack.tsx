import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesScreen from './FavoritesScreen'
import colors from '../../res/colors'

const Nav = createStackNavigator()
const { Navigator, Screen } = Nav

const FavoritesStack = () => {
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
        name="Favorites"
        component={FavoritesScreen}
      />
    </Navigator>
  )
}

export default FavoritesStack

const styles = StyleSheet.create({})