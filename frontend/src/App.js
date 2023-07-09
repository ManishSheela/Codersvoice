import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import { useSelector } from "react-redux";
import { useLoading } from "./hooks/useLoading";
import Loader from "./components/shared/Loader/Loader";
// let isAuth = false;
// const user = {
//   activated: true
// }
function App() {
  const { loading } = useLoading();

  return loading ? (
    <Loader message="Please hold on while we retrieve the information" />
  ) : (
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
              <GuestRoute>
                <Home />
              </GuestRoute>
            }
          />
          {/* Authenticate Route 
            it contain's the setPhoneEmail and setOtp steps
           */}
          <Route
            path="/authenticate"
            exact
            element={
              <GuestRoute>
                <Authenticate />
              </GuestRoute>
            }
          />
          {/* Activate Route  
              This Activate route contains the Name and Avatar Steps 
          */}

          <Route
            path="/activate"
            exact
            element={
              <SemiProtectedRoute>
                <Activate />
              </SemiProtectedRoute>
            }
          />

          {/* Rooms Route */}

          <Route
            path="/rooms"
            exact
            element={
              <ProtectedRoute>
                {/* EveryThing Defined between this Protected route is Children elements */}
                <Rooms />
              </ProtectedRoute>
            }
          />

          {/* single room route  */}
          <Route
            path="/room/:id"
            exact
            element={
              <ProtectedRoute>
                {/* EveryThing Defined between this Protected route is Children elements */}
                <Room />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
// GuestRoute
const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  if (isAuth) return <Navigate to="/rooms" replace />;
  return children;
};
// SemiProtected Route
const SemiProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);

  if (!isAuth) return <Navigate to="/" replace />;
  else if (isAuth && !user.activated) return children;
  else return <Navigate to="/rooms" replace />;
};
// Protected Route
// if isAuth true and user.activated == true then Navigate to Rooms page
const ProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  if (!isAuth) return <Navigate to="/" replace />;
  else if (isAuth && !user.activated) {
    return <Navigate to="/activate" replace />;
  } else return children; // navigate rooms page
};

export default App;
