import { View, StyleSheet } from 'react-native'
import Text from './Text'
import {format} from 'date-fns'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row'
  },
   ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, 
    borderWidth: 2,
    borderColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'pink'
  },
  reviewContent: {
    flex: 1
  },
  user: {
    fontWeight: 'bold',
    marginBottom: 2
  },
  date: {
    color: 'gray',
    marginBottom: 5
  }
})

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.createdAt), 'dd.MM.yyyy')

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.user}>{review.user.username}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
