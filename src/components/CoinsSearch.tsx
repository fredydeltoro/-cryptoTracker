import { StyleSheet, Text, View, TextInput, Platform } from 'react-native'
import { useState } from 'react'
import colors from '../res/colors';

const CoinsSearch = ({ onChange }: any) => {
  const [query, setQuery] = useState<any>('')

  const handleChange = (value: string) => {
    setQuery(value)
    onChange(value)
  }

  const getStyle = Platform.OS == 'ios' ? styles.textInputIos : styles.TextInputAndroiod

  return (
    <View>
      <TextInput
        onChangeText={(text) =>  handleChange(text)}
        style={[
          styles.textInput,
          getStyle
        ]}
        value={query}
        placeholder="Search Coin"
        placeholderTextColor="#FFF"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingLeft: 16,
    color: colors.white
  },
  TextInputAndroiod: {
    borderBottomColor: colors.zircon,
    borderBottomWidth: 2
  },
  textInputIos: {
    margin: 8,
    borderRadius: 8
  }
})

export default CoinsSearch