import AsyncStorage from '@react-native-async-storage/async-storage'

class Storage {
  static instance = new Storage()

  store = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
      
      return true
    } catch (err) {
      console.error("storage store error", err)

      return false
    }
  }

  get = async (key: string) => {
    try {
      const item = await AsyncStorage.getItem(key)

      return item
    } catch (err: any) {
      console.error("storage get error", err)

      throw Error(err)
    }
  }

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys()
      
    } catch (err: any) {
      console.error("storage get error", err)

      throw Error(err)
    }
  }

  multiGet =async (keys: string[]) => {
    try {
      
    } catch (err: any) {
      console.error("storage get error", err)

      throw Error(err)
    }
  }

  remove = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
      
      return true
    } catch (err) {
      console.error("storage get error", err)

      return false
    }
  }
}

export default Storage