import { render, fireEvent, waitFor } from '@testing-library/react-native'
import SignInContainer from '../components/SignInContainer'

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()

      const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} />)

      fireEvent.changeText(getByPlaceholderText('Username'), 'testusername')
      fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword')
      fireEvent.press(getByText('Sign In'))


      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'testusername',
            password: 'testpassword',
        })
      })
    })
  })
})