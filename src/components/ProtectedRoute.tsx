import { ReactElement, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

import UserContext from "../context/UserProvider";

type ProtectedRoutesProps = {
  children: ReactElement;
};
const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setUser({ email: "", isLoggedIn: false });
    }, 120000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  return <>{user.isLoggedIn ? children : <Navigate to={"/"} />}</>;
};

export default ProtectedRoute;
