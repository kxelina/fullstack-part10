import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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
});

const AppBar = () => {

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <Link to="/">
        <Text style={styles.text}>Repositories</Text>
      </Link>
      <Link to="/signin">
        <Text style={styles.text}>Sign In</Text>
      </Link>
      </ScrollView>
    </View>
  )
};

export default AppBar;