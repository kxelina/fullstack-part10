import { Pressable, View, TextInput, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import Text from './Text'
import * as yup from 'yup'
import useSignIn  from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'


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
    color: 'white',
    textAlign: 'center',
  }
})

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
})

console.log(formik.errors)
  
  return( 
  <View>
    <TextInput
      style={[styles.input,
        formik.touched.username && formik.errors.username && {borderColor: 'red'}
      ]}
      placeholder='Username'
      onChangeText={formik.handleChange('username')}
      onBlur={formik.handleBlur('username')}
      value={formik.values.username}
    />
    {formik.touched.username && formik.errors.username && (
        <Text style={{marginLeft: 10, color:'red'}}>{formik.errors.username}</Text>
      )}
    <TextInput
      style={[styles.input,
        formik.touched.password && formik.errors.password && {borderColor: 'red'}
      ]}
      placeholder='Password'
      onChangeText={formik.handleChange('password')}
      value={formik.values.password}
      onBlur={formik.handleBlur('password')}
      secureTextEntry
    />
    {formik.touched.password && formik.errors.password && (
        <Text style={{marginLeft: 10, color:'red'}}>{formik.errors.password}</Text>
      )}
    <Pressable style={styles.button} onPress={formik.handleSubmit}>
      <Text fontWeight="bold" fontSize="subheading" style={{textAlign:'center', color: 'white'}}>Sign In</Text>
    </Pressable>
  </View>
  )
}

export default SignIn