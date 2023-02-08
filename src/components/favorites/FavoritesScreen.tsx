import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import FavoritesEmptyState from './FavoritesEmptyState'
import colors from '../../res/colors'

const FavoritesScreen = () => {
  return (
    <View style={ styles.container }>
     <FavoritesEmptyState />
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1
  }
})