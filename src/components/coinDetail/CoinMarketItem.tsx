import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../res/colors';

const CoinMarketItem = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{ item.name }</Text>
      <Text style={styles.priceText}>{ item.price_usd }</Text>
    </View>
  )
}

export default CoinMarketItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: colors.zircon,
    borderWidth: 1,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  priceText: {
    color: '#fff'
  }
})