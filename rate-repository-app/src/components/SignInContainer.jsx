import { Pressable, View, TextInput, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import Text from './Text'
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
    color: 'white',
    textAlign: 'center',
  },
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

const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && { borderColor: 'red' },
        ]}
        placeholder="Username"
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ marginLeft: 10, color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && { borderColor: 'red' },
        ]}
        placeholder="Password"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ marginLeft: 10, color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" fontSize="subheading" style={{ textAlign: 'center', color: 'white' }}>
          Sign In
        </Text>
      </Pressable>
    </View>
  )
}

export default SignInContainer