import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Login from './pages/Login/Login';
import AuthContextProvider from './contexts/AuthContext';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import PrivateRoutes from './components/routing/PrivateRoute';
import Categories from './components/layout/category/Categories';
import CategoryContextProvider from './contexts/CategoryContext';
import UserContextProvider from './contexts/UserContext';
import Users from './components/layout/user/Users';

function App() {
  return (
  <AuthContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<Login/>} />
          <Route element={<PrivateRoutes/>} >
            <Route path='/index' element={<Home/>} />
            <Route path='/admin' element={<Admin/>}>
              <Route path='category' element={<CategoryContextProvider><Categories /></CategoryContextProvider>} />
              <Route path='user' element={<UserContextProvider><Users /></UserContextProvider>} />
            </Route>
          </Route>
        </Routes>
      </Router>
  </AuthContextProvider>
  )
}
export default App;
