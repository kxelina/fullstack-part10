import { View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'
import SingleRepositoryView from './SingleRepositoryView'
import ReviewForm from './ReviewForm'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

const Main = () => {
  return (
    <View>
     <AppBar />
     <Routes>
      <Route path="/" element={<RepositoryList />} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="*" element={<Navigate to="/signin" />} />
      <Route path="/repository/:repoID" element={<SingleRepositoryView />} />
      <Route path="/createReview" element={<ReviewForm/>} />
      <Route path="/myReviews" element={<MyReviews/>} />
      </Routes>
    </View>
  )
}
export default Main