import { FlatList } from 'react-native'
import { GET_SIGNEDIN_USER } from '../graphql/queries'
import Text from './Text'
import ReviewItem from './ReviewItem'
import { useQuery } from '@apollo/client'

const MyReviews = () => {
  const { data, loading } = useQuery(GET_SIGNEDIN_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <Text>Loading...</Text>

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || []

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} />
      )}
    />
  )
}

export default MyReviews
