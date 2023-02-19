import "./styles/workflow.scss";

import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext, useEffect } from "react";
import UserContext from "./context/UserProvider";

function App() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const dataName = sessionStorage.getItem("user");
    if (dataName !== null) setUser(JSON.parse(dataName));

    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
