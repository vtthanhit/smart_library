import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './pages/Login/Login';
import AuthContextProvider from './contexts/AuthContext';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import PrivateRoutes from './components/routing/PrivateRoute';
import Categories from './components/layout/category/Categories';
import AddCategory from './components/layout/category/AddCategory';
import CategoryContextProvider from './contexts/CategoryContext';

function App() {
  return (
  <AuthContextProvider>
    <CategoryContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<Login/>} />
          <Route element={<PrivateRoutes/>} >
            <Route path='/index' element={<Home/>} />
            <Route path='/admin' element={<Admin/>}>
              <Route path='category' element={<Categories />} />
              <Route path='category/add' element={<AddCategory />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </CategoryContextProvider>
  </AuthContextProvider>
  )
}
export default App;
