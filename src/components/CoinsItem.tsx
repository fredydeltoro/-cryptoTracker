import { StyleSheet, Text, Image, View, Platform } from 'react-native'
import React from 'react'
import colors from '../res/colors'

const CoinsItem = ({ item }: any) => {
  const getImg = () => {
    if (item.percent_change_1h >  0) {
      return require('../assets/arrow_up.png')
    } else {
      return require('../assets/arrow_down.png')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}> {item.symbol} </Text>
        <Text style={styles.nameText}>{ item.name }</Text>
        <Text style={styles.priceText}>{item.price_usd}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentText}>
          { item.percent_change_1h }
        </Text>
        <Image source={getImg()} style={styles.imageIcon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: "space-between",
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 8,
  },
  row: {
    flexDirection: 'row'
  },
  symbolText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 16
  },
  percentText: {
    color: colors.white,
    fontSize: 12,
    marginRight: 8
  },
  priceText: {
    color: colors.white,
    fontSize: 12
  },
  imageIcon: {
    width: 15,
    height: 15
  }
})

export default CoinsItem