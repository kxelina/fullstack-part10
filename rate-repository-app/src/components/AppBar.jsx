import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native'
import Constants from 'expo-constants'
import { Link } from 'react-router-native'
import useSignOut from '../hooks/useSignOut'
import { useQuery } from '@apollo/client'
import { GET_SIGNEDIN_USER } from '../graphql/queries'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight+10,
    backgroundColor: 'pink',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 10
    }
})

const AppBar = () => {
  const signout = useSignOut()
  const { data } = useQuery(GET_SIGNEDIN_USER)

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      {data?.me ? (
        <Pressable onPress={signout}>
          <Text style={styles.text}>Sign Out</Text>
        </Pressable>
        ) : (
        <Link to="/signin">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      )}
      </ScrollView>
    </View>
  )
}

export default AppBar