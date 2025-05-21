import { View, StyleSheet, Image, Pressable, Linking } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: 'pink',
        marginVertical: 10
    },
    picture: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    flexcontainer: {
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10
    },
    textcontainer: {
        flex: 1,
        marginLeft: 15
    },
    language: {
        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 5,
        color: 'white',
        alignSelf: 'flex-start',
        marginTop: 5
    },
    statscontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    stats: {
        flex: 1
    },
    button:{
        backgroundColor: 'pink',
        padding: 10,
        marginTop: 10,
        borderRadius: 5
    }

})

const numberStyle = (num) => {
    if (num < 1000) {
        return num
    } else {
        return (num / 1000).toFixed(1) + 'k'
    }
}


const Repositoryprop = ({ prop, showGit = false }) => {
    const openGit = () => {
        console.log('openGit', prop)
    Linking.openURL(prop.url)
  }

    return (
        <View>
        <View testID="repositoryItem" style={styles.flexcontainer}>
            <Image source={{uri: prop.ownerAvatarUrl}} style={styles.picture} />
            <View style={styles.textcontainer}>
            <Text testID= "fullName" fontWeight="bold" fontSize="subheading">{prop.fullName} </Text>
            <Text testID="description">{prop.description}</Text>
            <Text testID= "language" fontWeight="bold" style={styles.language}>{prop.language}</Text>
            <View style={styles.statscontainer}>
                <View style={styles.stats}>
                <Text testID="stargazersCount" fontWeight="bold" fontSize="subheading">{numberStyle(prop.stargazersCount)}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.stats}>
                <Text testID="forksCount" fontWeight="bold" fontSize="subheading">{numberStyle(prop.forksCount)}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.stats}>
                <Text testID="reviewCount" fontWeight="bold" fontSize="subheading">{numberStyle(prop.reviewCount)}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.stats}>
                <Text testID= "ratingAverage" fontWeight="bold" fontSize="subheading">{numberStyle(prop.ratingAverage)}</Text>
                <Text>Rating</Text>
            </View>
            </View>
            {showGit && (
            <Pressable onPress={openGit} style={styles.button}>
                <Text fontWeight="bold" fontSize="subheading" style={{textAlign: 'center', color: 'white'}}>Open in GitHub</Text>
            </Pressable>
            )}
            </View>
        </View>
        <View style={styles.separator}></View>
        </View>
    )
    
}

export default Repositoryprop