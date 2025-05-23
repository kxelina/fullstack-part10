import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
      variables,
      fetchPolicy: 'cache-and-network'
    })
    //console.log('data query', data)
    //console.log('error', error)
  
    return { repositories: data?.repositories || null, loading, refetch, error }
}
export default useRepositories