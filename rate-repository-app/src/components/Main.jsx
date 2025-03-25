import { View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignIn'

const Main = () => {
  return (
    <View>
     <AppBar />
     <Routes>
      <Route path="/" element={<RepositoryList />} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </View>
  )
}
export default Main