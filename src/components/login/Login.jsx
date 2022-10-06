import { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/client";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/authSlice";
import Button from "@mui/material/Button";

const Login = (props) => {
  const [signInWithGoogle, user] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        login({
          displayName: user.user.displayName,
          email: user.user.email,
          accessToken: user.user.accessToken,
        })
      );
      //console.log(user)
    }
  }, [user, dispatch]);

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };

  return (
    <div >
      {props.userProp ? (
        <Button variant="outlined" onClick={logoutHandler}>
          Sign Out
        </Button>
      ) : (
        <Button
          onClick={() => signInWithGoogle()}
          variant="outlined"
         
        >
          <img id='google' src="/images/googlelogo.png" alt="Google Logo" style={{ width: 28, margin: 5 }} />
          Continue with Google
        </Button>
      )}
    </div>
  );
};

export default Login;
