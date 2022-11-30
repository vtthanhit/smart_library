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
import UserRequestReturn from './components/layout/userRequest/UserRequestReturn';
import AdminRequestReturn from './components/layout/adminRequest/AdminRequestReturn';
import AdminRequestBorrow from './components/layout/adminRequest/AdminRequestBorrow';
import Profile from './components/layout/auth';
import AdminBookCard from './components/layout/adminBookCard';
import AdminAddRequest from './components/layout/adminRequest/AdminAddRequest';
import Admins from './components/layout/user/Admin';
import Dashboard from './components/layout/dashboard/Dashboard';
import UserDashboard from './components/layout/dashboard/UserDashboard';

function App() {
  return (
  <AuthContextProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Login/>} />
        <Route element={<PrivateRoutes/>} >
          <Route element={<Home/>}>
            <Route path='/profile' element={<Profile/>} />
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
            <Route path='/return' element={
              <CategoryContextProvider>
                <BookContextProvider>
                  <RequestContextProvider>
                    <UserRequestReturn/>
                  </RequestContextProvider>
                </BookContextProvider>
              </CategoryContextProvider>
            }
            />
          </Route>
        </Route>
        <Route element={<AdminPrivateRoute />} >
          <Route element={<Admin/>}>
            <Route path='/admin' element={
              <BookContextProvider>
                  <Dashboard/>
              </BookContextProvider>
            }
            />
            <Route path='/admin/book-student' element={
              <UserContextProvider>
                  <UserDashboard/>
              </UserContextProvider>
            }
            />
            <Route path='/admin/home' element={
              <CategoryContextProvider>
                <BookContextProvider>
                  <RequestContextProvider>
                    <AdminBookCard/>
                  </RequestContextProvider>
                </BookContextProvider>
              </CategoryContextProvider>
            }
            />
            <Route path='/admin/category' element={<CategoryContextProvider><Categories /></CategoryContextProvider>} />
            <Route path='/admin/user' element={<UserContextProvider><Users /></UserContextProvider>} />
            <Route path='/admin/admin' element={<UserContextProvider><Admins /></UserContextProvider>} />
            <Route path='/admin/book'>
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
            <Route path='/admin/request'>
              <Route path='add_new' element={
                <UserContextProvider>
                  <CategoryContextProvider>
                    <BookContextProvider>
                      <RequestContextProvider>
                        <AdminAddRequest/>
                      </RequestContextProvider>
                    </BookContextProvider>
                  </CategoryContextProvider>
                </UserContextProvider>
              } />
              <Route path='return' element={
                <CategoryContextProvider>
                  <BookContextProvider>
                    <RequestContextProvider>
                      <AdminRequestReturn/>
                    </RequestContextProvider>
                  </BookContextProvider>
                </CategoryContextProvider>
              } />
              <Route path='borrow' element={
                <CategoryContextProvider>
                  <BookContextProvider>
                    <RequestContextProvider>
                      <AdminRequestBorrow/>
                    </RequestContextProvider>
                  </BookContextProvider>
                </CategoryContextProvider>
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
