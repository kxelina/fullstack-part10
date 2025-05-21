import { useFormik } from 'formik'
import * as yup from 'yup'
import { View, TextInput, StyleSheet, Pressable } from 'react-native'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'
import Text from './Text'

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

const validationSchema = yup.object().shape({
  ownerName: yup.string()
    .required('Repository owner name is required'),
  repositoryName: yup.string()
    .required('Repository name is required'),
  rating: yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string()
})

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await createReview({
          variables: {
            review: {
              ownerName: values.ownerName,
              repositoryName: values.repositoryName,
              rating: Number(values.rating),
              text: values.text
            }
          }
        })
        navigate(`/repository/${data.createReview.repositoryId}`)
      } catch (e) {
        console.log(e)
      }
    }
  })

  return (
    <View>
      <TextInput
        style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && { borderColor: 'red' }]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ marginLeft: 10, color: 'red' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && { borderColor: 'red' }]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ marginLeft: 10, color: 'red' }}>{formik.errors.repositoryName}</Text>
        )}
      <TextInput
        style={[styles.input, formik.touched.rating && formik.errors.rating && { borderColor: 'red' }]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />
        {formik.touched.rating && formik.errors.rating && (
        <Text style={{ marginLeft: 10, color: 'red' }}>{formik.errors.rating}</Text>
        )}
      <TextInput
        style={[styles.input, formik.touched.text && formik.errors.text && { borderColor: 'red' }]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
      />
        {formik.touched.text && formik.errors.text && (
        <Text style={{ marginLeft: 10, color: 'red' }}>{formik.errors.text}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.button} >
            <Text fontWeight="bold" fontSize="subheading" style={{textAlign: 'center', color: 'white'}}>Create a review</Text>
        </Pressable>
    </View>
  )
}

export default ReviewForm
