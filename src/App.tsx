import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/user/Home'
import Package from './Pages/user/Package'
import Profile from './Pages/user/Profile'
import Login from './Pages/auth/Login'
import Dashboard from './Pages/admin/Dashboard'
import ListPackages from './Pages/admin/ListPackages'
import EditPackages from './Pages/admin/EditPackages'

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
      <Route path='/admin' element={<Dashboard/>}/>
      <Route path='/packages' element={<ListPackages/>}/>
      <Route path='/packages/edit/:id' element={<EditPackages/>}/>

    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
