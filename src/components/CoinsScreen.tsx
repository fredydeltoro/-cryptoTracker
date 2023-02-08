import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import { useEffect, useState } from 'react';
import Http from '../libs/http';
import colors from '../res/colors';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

const CoinsScreen = (props: any) => {
  const [coins, setCoins] = useState([])
  const [allCoins, setAllCoins] = useState([])
  const [loading, setLoading] = useState(true)

  const handlePress = (coin: any) => {
    props.navigation.navigate('Coin Detail', { coin });
  };

  const handleSearch = (query: string) => {
    const qry = query.toLocaleLowerCase()
    setCoins(
      allCoins.filter(
        (coin: any) =>
          coin.name.toLowerCase().includes(qry) ||
          coin.symbol.toLowerCase().includes(qry),
      )
    ); 
  }

  const getCoins = async () => {
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    setLoading(false)
    setCoins(res.data)
    setAllCoins(res.data)
  };

  useEffect(() => {
    getCoins();
  }, []);
  
  return (
    <View style={styles.container}>
      <CoinsSearch 
        onChange={handleSearch}
      />

      { loading ?
       <ActivityIndicator
        style={styles.loader}
        color="#FFF"
        size="large" 
      /> 
       : null
      }

      <FlatList
        data={coins}
        renderItem={({ item }: any) =>  (
          <CoinsItem item={item} onPress={handlePress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },
  loader: {
    margin: 60
  }
});

export default CoinsScreen;
