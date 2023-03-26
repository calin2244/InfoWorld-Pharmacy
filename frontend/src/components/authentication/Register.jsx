import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/authSlice";
import { StyledForm } from "./StyledForm";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(auth._id){
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    cnp: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => setUser({ ...user, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="CNP/ID"
          onChange={(e) => setUser({ ...user, cnp: e.target.value })}
        />
        <button>
            {auth.registerStatus === "pending" ? "Submitting" : "Register"}
        </button>

        {auth.registerStatus === "rejected" ? (
            <p>{auth.registerError}</p>)
            : null
        }

      </StyledForm>
    </>
  );
};

export default Register;
