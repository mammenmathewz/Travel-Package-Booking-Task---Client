import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/user/Home'
import Package from './Pages/user/Package'
import Profile from './Pages/user/Profile'
import Login from './Pages/auth/Login'
import ListPackages from './Pages/admin/ListPackages'
import EditPackages from './Pages/admin/EditPackages'
import { AdminLayout } from './Pages/admin/Dashboard'
import UserList from './Pages/admin/UserList'
import {ProtectedRoute} from './components/ProtectedRoutes';
import {AdminRoute} from './components/ProtectedRoutes';
import {RedirectIfAuthenticated} from './components/ProtectedRoutes';
import AddNewPackage from './Pages/admin/AddNewPackage'
import UserBasedPackageTable from './Pages/admin/UserBasedPackageTable'

function App() {
  return (
    <>
    
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    
  
    <Route path="/login" element={
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    } />

    <Route path="/package/:id" element={
      <ProtectedRoute>
        <Package />
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />

    <Route path="/admin" element={
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    }>
      <Route path="packages" element={<ListPackages />} />
      <Route path="add" element={<AddNewPackage/>} />
      <Route path="packages/edit/:id" element={<EditPackages />} />
      <Route path="users" element={<UserList />} />
      <Route path="user/:id" element={<UserBasedPackageTable />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  </Routes>
</BrowserRouter>


    </>
  )
}

export default App


