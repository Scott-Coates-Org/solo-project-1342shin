import { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/client'
import { useDispatch } from 'react-redux'
import { login, logout } from '../../redux/authSlice'

import styles from './login.module.css'

const Login = (props) => {
	const [signInWithGoogle, user] = useSignInWithGoogle(auth)
	const dispatch = useDispatch()

	useEffect(() => {
		if (user) {
			dispatch(
				login({
					displayName: user.user.displayName,
					email: user.user.email,
					accessToken: user.user.accessToken,
				}),
			)
			//console.log(user)
		}
	}, [user, dispatch])

	const logoutHandler = () => {
		signOut(auth)
		dispatch(logout())
	}

	return (
		<div className={styles.container}>
			{props.userProp?
			
			<button onClick={logoutHandler} className={styles.button}>
				Sign Out
			</button>:<button onClick={() => signInWithGoogle()} className={styles.button}>
				<img src="/images/googlelogo.png" alt="Google Logo" />
				Continue with Google
			</button>}
		</div>
	)
}

export default Login
