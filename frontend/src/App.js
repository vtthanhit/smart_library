import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './pages/Login/Login';
import AuthContextProvider from './contexts/AuthContext';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import PrivateRoutes from './components/routing/PrivateRoute';

function App() {
  return (
  <AuthContextProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route element={<PrivateRoutes/>} >
          <Route path='/index' element={<Home/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route exact path='admin/category/list' element={<Admin adminRoute='/admin/category/list' />} /> 
          <Route exact path='admin/category/add' element={<Admin adminRoute='/admin/category/add' />} /> 
        </Route>
      </Routes>
    </Router>
  </AuthContextProvider>
  )
}
export default App;
