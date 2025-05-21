import useSignIn  from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import SignInContainer from './SignInContainer'

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const { data }= await signIn({ username, password })
      console.log('data', data)
      if (data.authenticate) {
        navigate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn