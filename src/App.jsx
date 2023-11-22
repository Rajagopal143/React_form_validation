import { useState,useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

function App() {
  const initialValue = { username: "", email: "", password: "" };
  const [formvalue, setformvalue] = useState(initialValue);
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformvalue({ ...formvalue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setformErrors(validate(formvalue));
    console.log(Object.keys(formErrors).length)
    setIsSubmit(true)
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("submited successfully")
      setIsSubmited(true);
    }
    setIsSubmited(false);
        
  },[formErrors])
  const validate = (value) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.username) {
      error.username = "Username required";
    }
    if (!value.email) {
      error.email = "email required";
    } else if (!regex.test(value.email)) {
      error.email="This email is not valid email"
    }
    if (!value.password) {
      error.password = "password required";
    } else if (value.password.length < 8) {
      error.password="password must be greater than 8 letters"
    }
    return error;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>{JSON.stringify(formErrors)}</p>
        <h1>Login Form</h1>
        <div className="ui divier"></div>
        <div className="ui form">
          <div className="field">
            <label htmlFor="">Username</label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              value={formvalue.username}
            />
            <p>{formErrors.username}</p>
          </div>
          <div className="field">
            <label htmlFor="">Email</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              value={formvalue.email}
            />
            <p>{formErrors.email}</p>
          </div>
          <div className="field">
            <label htmlFor="">password</label>
            <input
              onChange={handleChange}
              type="text"
              name="password"
              value={formvalue.password}
            />
            <p>{formErrors.password}</p>
          </div>
          <button type="submit" className="fluid ui button blue">
            Submit
          </button>
        </div>
        {isSubmited && <h1>Form is submited successfully</h1>}
      </form>
    </>
  );
}

export default App;
