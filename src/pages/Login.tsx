import FormInput from "../components/FormInput";
import Logo from "../components/Logo";
import Card from "../components/Card";
import { data } from "../data/loginsidedata";
import Button from "../components/Button";
import { useContext, useState } from "react";
import UserContext from "../context/UserProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { loginCredential } from "../data/credentials";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    error: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails((prev) => {
      return {
        ...prev,
        [name]: value,
        error: "",
      };
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginDetails.password) {
      setLoginDetails((prev) => {
        return {
          ...prev,
          error: "Password cannot be empty",
        };
      });
    } else if (
      loginDetails.email === loginCredential.email &&
      loginDetails.password === loginCredential.password
    ) {
      setUser({
        email: loginDetails.email,
        isLoggedIn: true,
      });
      navigate("/profile");
    } else {
      setLoginDetails((prev) => {
        return {
          ...prev,
          error: "Invalid username and password",
        };
      });
    }
  };
  return (
    <>
      {user.isLoggedIn ? (
        <Navigate to={"/profile"} />
      ) : (
        <div className="login">
          <Logo />
          <div className="grid login_grid">
            <div className="left">
              <div>
                <h2>Hi there, see what's new</h2>
                <p>
                  Here's how Foodcourt helps you manage your daily operations
                  and ensure your riders are efficient
                </p>
                <div className="items">
                  {data.map((item) => {
                    return (
                      <div className="grid" key={item.id}>
                        <img src={item.img} alt="" />
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="login_form">
              <Card variant="contained" borderRadius="12px">
                <>
                  <h2>Login to your dashboard</h2>
                  <p>Provide details to login to your account </p>
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <FormInput
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={loginDetails.email}
                      label="Email"
                      inputAdornment={false}
                    />
                    <FormInput
                      name="password"
                      type="password"
                      onChange={handleChange}
                      value={loginDetails.password}
                      label="Password"
                      inputAdornment={true}
                    />
                    {
                      <p
                        className={
                          loginDetails.error
                            ? "form_error form_error_active"
                            : "form_error"
                        }
                      >
                        {loginDetails.error ? loginDetails.error : ""}
                      </p>
                    }
                    <Button text="Login"></Button>
                  </form>
                </>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
