import { useMutation, useApolloClient } from '@apollo/client'
import { SIGN_IN } from '../graphql/mutations'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const [mutate, result] = useMutation(SIGN_IN)
  
    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { credentials: {username, password} } })
        console.log('mutated data', data)
        if (data.authenticate) {
            await authStorage.setAccessToken(data.authenticate.accessToken)
            apolloClient.resetStore()
        }
        return { data }
    }

    console.log('result', result)
  
    return [signIn, result]
  }

export default useSignIn
