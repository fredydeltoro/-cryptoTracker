import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import FavoritesEmptyState from './FavoritesEmptyState'
import CoinsItem from '../CoinsItem';
import colors from '../../res/colors'
import Storage from '../../libs/storaje';

const FavoritesScreen = ({ navigation }: any) => {
  const [favorites, setFavorites] = useState<any[]>([])

  const handlePress = (coin: any) => {
    navigation.navigate('Coin Detail', { coin });
  };
  
  const getFavorites = async () => {
    try {
      const allKeys  = await Storage.instance.getAllKeys()
      const keys = allKeys.filter((key: string) => key.includes('favorite-'))
      const allValues = await Storage.instance.multiGet(keys)

      if (allValues.length) {
        setFavorites(allValues.map((value: any[]) => (
          JSON.parse(value[1])
        )))
      }

    } catch (err) {
      console.error("get favorites err", err)
    }
  }

  useEffect(() => {
    navigation.addListener('focus', getFavorites)

    return () => {
      navigation.removeListener('focus', getFavorites)
    }
  }, [])
  
  return (
    <View style={styles.container}>
      {favorites.length ? (
        <FlatList
          data={favorites}
          renderItem={({item}: any) => (
            <CoinsItem item={item} onPress={handlePress} />
          )}
        />
      ) : (
        <FavoritesEmptyState />
      )}
    </View>
  );
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.charade,
    flex: 1
  }
})
