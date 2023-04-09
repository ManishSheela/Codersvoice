import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
// let isAuth = false;
// const user = {
//   activated: true
// }
function App() {
  const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {/* setting up react router  */}
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* Homepage route  */}
          <Route
            path="/"
            exact
            element={
              <GuestRoute isAuth={isAuth}>
                <Home />
              </GuestRoute>
            }
          />
          {/* Authenticate Route  */}
          <Route
            path="/authenticate"
            exact
            element={
              <GuestRoute isAuth={isAuth}>
                <Authenticate />
              </GuestRoute>
            }
          />
          {/* Activate Route  */}

          <Route
            path="/activate"
            exact
            element={
              <SemiProtectedRoute isAuth={isAuth}>
                <Activate />
              </SemiProtectedRoute>
            }
          />

          {/* Rooms Route */}

          <Route
            path="/rooms"
            exact
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Rooms />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
 // GuestRoute 
const GuestRoute = ({ isAuth, children }) => {
  if (isAuth) return <Navigate to="/rooms" replace />;
  return children;
};
// SemiProtected Route
const SemiProtectedRoute = ({ isAuth, children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!isAuth) return <Navigate to="/" replace />;
  else if (isAuth && !user.activated) return children;
  else return <Navigate to="/rooms" replace />;;
};
// Protected Route
const ProtectedRoute = ({ isAuth, children }) => {
  
  const { user } = useSelector((state) => state.auth);

  if (!isAuth) return <Navigate to="/" replace />;
  else if (isAuth && !user.activated) return <Navigate to="/activate" replace />;
  else return children;
};

export default App;
