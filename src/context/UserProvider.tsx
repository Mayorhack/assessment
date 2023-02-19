import { createContext, ReactElement, useState } from "react";

interface UserProviderProps {
  children: ReactElement;
}
type UserInfo = {
  email: string;
  isLoggedIn: boolean | false;
};
// created a new context object with a default values
const UserContext = createContext({
  user: { email: "", isLoggedIn: false },
  setUser: (user: UserInfo) => {},
});
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({
    email: "",
    isLoggedIn: false,
  });
  // created a helper function to set user info
  const setUserInfo = (userInfo: UserInfo) => {
    setUser(userInfo);
    if (userInfo.isLoggedIn) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...userInfo,
        })
      );
    } else {
      sessionStorage.clear();
    }
  };
  return (
    <UserContext.Provider
      value={{ user: user, setUser: (user) => setUserInfo(user) }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
