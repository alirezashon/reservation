
import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'

interface LoginProps {
	setToken: (token: boolean) => void
}
const Login: React.FC<LoginProps> = ({ setToken }) => {
	const [user, setUser] = useState<string>('')
	const [password, setPassword] = useState('')
	const [formShow, setFormShow] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState(false)
	const handleSignIn = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
 			const response = await fetch('/api/Auth/Session/Generator', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userPass: user + '&' + password,
					authType: '&^ClieNt%LOgIn^&B*y^P$h#o@N#E',
				}),
			})
			const data = await response.json()
			if (data.success === true && response.status === 200) {
				localStorage.setItem('user', JSON.stringify(user))
				sessionStorage.setItem('token', JSON.stringify(data.token))
				setToken(true)
				toast.success(data.message)
			} else {
				toast.error(data.message)
				setIsLoading(false)
			}
		} catch (error) {
			console.log(error)
			toast.error('failed call login api' + error)
		}
	}
	return (
		<>
			<ToastContainer
				position={'top-right'}
				newestOnTop
				pauseOnHover
				style={{
					transform: 'rotate(-7deg)',
					margin: '2vh',
				}}
				transition={Zoom}
			/>
			{formShow ? (
				<div className={styles.container}>
					<div className={`${styles.formBox}  ${isLoading && styles.animate}`}>
						{!isLoading && (
							<>
								<Image
									className={styles.logo}
									src={'/images/icon.png'}
									width={1111}
									height={1111}
									alt='Kalimogo'
								/>
								<div className={styles.formShadow}>
									<form
										className={styles.formInnerBox}
										onSubmit={handleSignIn}>
										<div className={styles.formRow}>
											<label>
												ایمیل <span className={styles.slash}>/ </span> شماره
											</label>
											<input
												value={user}
												onChange={(e) => setUser(e.target.value)}
												type='input'
												placeholder='نام کاربری ...'
												required
											/>
										</div>
										<div className={styles.formRow}>
											<label>رمز عبور </label>
											<input
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												type='password'
												placeholder='رمز عبور ...'
												required
											/>
										</div>
										<div className={styles.buttonBox}>
											<input
												type='submit'
												value={'ورود'}
												className={styles.submit}
											/>
											<input
												type='button'
												className={styles.cancel}
												onClick={() => setFormShow(false)}
											value={'خروج'}/> 
 										</div>
									</form>
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				<button
					className={styles.cancel}
					onClick={() => setFormShow(true)}>
					open
				</button>
			)}
		</>
	)
}
export default Login
