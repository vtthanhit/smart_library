import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './components/layout/Landing';
import Login from './pages/Login/Login';
import AuthContextProvider from './contexts/AuthContext';
import Admin from './pages/Admin/Admin';
import PrivateRoutes from './components/routing/PrivateRoute';
import AdminPrivateRoute from './components/routing/AdminPrivateRoute';
import Categories from './components/layout/category/Categories';
import BookContextProvider from './contexts/BookContext';
import CategoryContextProvider from './contexts/CategoryContext';
import UserContextProvider from './contexts/UserContext';
import Users from './components/layout/user/Users';
import Books from './components/layout/book/Books';
import AddBook from './components/layout/book/AddBook';
import UpdateBook from './components/layout/book/UpdateBook';
import Home from './pages/Home/Home';
import BookCard from './components/layout/bookCard';
import RequestContextProvider from './contexts/RequestContext';
import UserRequestBorrow from './components/layout/userRequest/UserRequestBorrow';

function App() {
  return (
  <AuthContextProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route element={<PrivateRoutes/>} >
          <Route element={<Home/>}>
            <Route path='/index' element={
              <CategoryContextProvider>
                <BookContextProvider>
                  <RequestContextProvider>
                    <BookCard/>
                  </RequestContextProvider>
                </BookContextProvider>
              </CategoryContextProvider>
            }
            />
            <Route path='/borrow' element={
              <CategoryContextProvider>
                <BookContextProvider>
                  <RequestContextProvider>
                    <UserRequestBorrow/>
                  </RequestContextProvider>
                </BookContextProvider>
              </CategoryContextProvider>
            }
            />
          </Route>
        </Route>
        <Route element={<AdminPrivateRoute />} >
          <Route path='/admin' element={<Admin/>}>
            <Route path='category' element={<CategoryContextProvider><Categories /></CategoryContextProvider>} />
            <Route path='user' element={<UserContextProvider><Users /></UserContextProvider>} />
            <Route path='book'>
              <Route path='add' element={
                <CategoryContextProvider>
                  <BookContextProvider>
                    <AddBook />
                  </BookContextProvider>
                </CategoryContextProvider>
              } />
              <Route path='update' element={
                <CategoryContextProvider>
                  <BookContextProvider>
                    <UpdateBook />
                  </BookContextProvider>
                </CategoryContextProvider>
              } />
              <Route path='list' element={
                <BookContextProvider>
                  <Books />
                </BookContextProvider>
              } />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </AuthContextProvider>
  )
}
export default App;
