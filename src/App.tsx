import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/user/Home'
import Package from './Pages/user/Package'
import Profile from './Pages/user/Profile'
import Login from './Pages/auth/Login'
import ListPackages from './Pages/admin/ListPackages'
import EditPackages from './Pages/admin/EditPackages'
import { AdminLayout } from './Pages/admin/Dashboard'
import UserList from './Pages/admin/UserList'
import UserBasedPackages from './Pages/admin/UserBasedPackages'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/package/:id' element={<Package/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/login' element={<Login/>}/>
      {/* Admin Routes */}
      <Route
       path="/admin" element={<AdminLayout />}>
      <Route path="packages" element={<ListPackages />} />
      <Route path="packages/edit/:id" element={<EditPackages />} />
      <Route path="users" element={<UserList/>} />
      <Route path="user/:id" element={<UserBasedPackages/>} />
      <Route path="*" element={<div>404 Not Found</div>} />
      </Route>

    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
