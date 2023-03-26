import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components"
import { logoutUser } from "../features/authSlice";

const NavBar = () => {

  const { totalQuantity } = useSelector(state => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2> InfoWorld Pharmacy</h2>
      </Link>

      <Link to="/cart" className="pill-link">
        <div className="nav-pill">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="20"
            fill="currentColor"
            className="bi bi-capsule"
            viewBox="0 0 16 16"
          >
            <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" />
          </svg>
          <span className="bag-quantity">
            <span>:)</span>
          </span>
        </div>
      </Link>

        {
        auth._id ? <Logout onClick={() => {
          dispatch(logoutUser(null));
          toast.warning("Logged out!", {
            position: "bottom-left"
          });
        }}>
          Logout
        </Logout> :
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to ="/register">Register</Link>
        </AuthLinks>
        }

    </nav>
  );
};

export default NavBar;

const Logout = styled.div`
  color: white;
  cursor: pointer;
`

const AuthLinks = styled.div`
  a{
    font-weight: 600px;
    width: 150px;
    max-width: 100%;
    &:last-child{
      margin-left: 2rem;
    
    }
    transition: 0.3s all;
  
    &:hover{
    color: black;
    }
  }
`