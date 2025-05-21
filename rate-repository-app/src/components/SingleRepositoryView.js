import RepositoryItem from './RepositoryItem'
import { GET_REPOSITORY } from '../graphql/queries'
import { useParams } from 'react-router-native'
import Text from './Text'
import { FlatList, StyleSheet, View } from 'react-native'
import { useQuery } from '@apollo/client'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'pink'
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const SingleRepositoryView = () => {
    const {repoID} = useParams()
    const { data, loading } = useQuery(GET_REPOSITORY, {
        variables: { id:repoID },
        fetchPolicy: 'cache-and-network'
    })
    const reviews = data?.repository.reviews

    const reviewsNodes = reviews
  ? reviews.edges.map(edge => edge.node)
  : []

    if (loading) return <Text>Loading...</Text>
    //console.log('data repo', data)

  return (
    <FlatList
    data = {reviewsNodes}
    renderItem={({ item }) => <ReviewItem review={item} />}
    ItemSeparatorComponent={ItemSeparator}
    keyExtractor={({id}) => id}
    ListHeaderComponent={() => <RepositoryItem prop={data?.repository} showGit={true} />}
  />)
}

export default SingleRepositoryView
