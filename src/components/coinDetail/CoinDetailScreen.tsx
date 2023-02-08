import { StyleSheet, Text, View, Image, SectionList, FlatList, Pressable, Alert } from 'react-native';
import {useEffect, useState} from 'react';
import colors from '../../res/colors';
import Http from '../../libs/http';
import Storage from '../../libs/storaje';
import CoinMarketItem from './CoinMarketItem';

const CoinDetailScreen = ({route, navigation}: any) => {
  const [coin, setCoin] = useState<any>({});
  const [markets, setMarkets] = useState<any[]>([])
  const [isFavorite, setFavorite] = useState<boolean>(false)

  const getSections = () => [
    {
      title: 'Market cap',
      data: [coin.market_cap_usd],
    },
    {
      title: 'Volume 24h',
      data: [coin.volume24],
    },
    {
      title: 'Change 24h',
      data: [coin.percent_change_24h],
    },
  ];

  const getIcon = (name: string) =>
    name &&
    `https://c1.coinlore.com/img/25x25/${name
      .toLocaleLowerCase()
      .replace(' ', '-')}.png`;
    
  const getMarkets = async (coinId: string) => {
    const res = await Http.instance.get(`https://api.coinlore.net/api/coin/markets/?id=${coinId}`)
    setMarkets(res)
  }

  const getStyle = isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd

  const addFavorite = async () => {
    const key = `favorite-${coin.id}`
    const stored = await Storage.instance.store(key, JSON.stringify(coin))

    if (stored) {
      setFavorite(true)
    }
  }

  const removeFavorite =  () => {
    Alert.alert("Remove favorite", "Are you sure?", [
      {
        text: 'cancel',
        style: 'cancel'
      },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => { 
          const key = `favorite-${coin.id}`
          const stored = await Storage.instance.remove(key)

          if (stored) {
            setFavorite(false)
          }
        }
      }
    ])
  }

  const getFavorite = async () => {
    const key = `favorite-${coin.id}`
      const value = await Storage.instance.get(key)

      if (value) {
        setFavorite(true)
      }
  }

  const toogleFavorite = () => {
    if (isFavorite) {
      removeFavorite()
    } else {
      addFavorite()
    }
  }

  useEffect(() => {
    setCoin(route.params.coin);
  }, []);

  useEffect(() => {
    if (coin.symbol) {
      navigation.setOptions({title: coin.symbol});
      getMarkets(coin.id)
      getFavorite()
    }
  }, [coin])

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.row}>
          <Image style={styles.img} source={{uri: getIcon(coin.name)}} />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>

        <Pressable
         onPress={() => toogleFavorite()}
         style={[
          styles.btnFavorite,
          getStyle
        ]}
        >
          <Text style={styles.btnFavoriteText}>{isFavorite ? 'Remove Favorite' :  'Add Favorite'}</Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSections()}
        keyExtractor={(item) =>  item}
        renderItem={({ item }) =>   (
          <View style={styles.sectionHeader}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) =>  (
          <View style={styles.sectionItem}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <View>
        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
          data={markets}
          horizontal={true}
          renderItem={({ item }) => (
            <CoinMarketItem item={item} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 8,
  },
  img: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220
  },
  sectionHeader:{
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: colors.white,
    fontSize: 14
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  marketTitle: {
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteAdd: {
    backgroundColor: colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: colors.carmine
  },
  btnFavoriteText: {
    color: colors.white
  }
});

export default CoinDetailScreen;
