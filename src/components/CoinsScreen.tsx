import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import { useEffect, useState } from 'react';
import Http from '../libs/http';
import CoinsItem from './CoinsItem';
import colors from '../res/colors';

const CoinsScreen = (props: any) => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)

  const handlePress = () => {
    props.navigation.navigate('Coin Detail');
  };

  const getCoins = async () => {
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );

    setLoading(false)
    setCoins(res.data)
  };

  useEffect(() => {
    getCoins();
  }, []);
  
  return (
    <View style={styles.container}>
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
          <CoinsItem item={item} />
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
