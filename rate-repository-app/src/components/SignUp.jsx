import { useFormik } from 'formik'
import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'
import  useSignIn  from '../hooks/useSignIn' 
import * as yup from 'yup'

const styles = StyleSheet.create({
  input: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: 'pink',
    borderRadius: 5,
  },
})

const validationSchema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(5, 'Username must be at least 5 character long')
        .max(30, 'Username must be at most 30 characters long'),
    password: yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 character long')
        .max(50, 'Password must be at most 50 characters long'),
    passwordConfirmation: yup.string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values
      try {
        await createUser({ variables: { user: { username, password } } })
        await signIn({ username, password })
        navigate('/')
      } catch (e) {
        console.error(e)
      }
    },
  })

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red', marginLeft: 10 }}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red', marginLeft: 10 }}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={{ color: 'red', marginLeft: 10 }}>{formik.errors.passwordConfirmation}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: 'white', textAlign: 'center' }} fontWeight="bold">
          Sign Up
        </Text>
      </Pressable>
    </View>
  )
}

export default SignUp
