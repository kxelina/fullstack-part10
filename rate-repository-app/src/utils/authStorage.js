import AsyncStorage from '@react-native-async-storage/async-storage'


class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  getAccessToken() {
    this.namespace = 'auth'
    const accessToken = AsyncStorage.getItem(this.namespace)
    return accessToken
  }

  setAccessToken(accessToken) {
    this.namespace = 'auth'
    AsyncStorage.setItem(this.namespace, accessToken)
    return accessToken
  }

  removeAccessToken() {
    this.namespace = 'auth'
    AsyncStorage.removeItem(this.namespace)
  }
}

export default AuthStorage;