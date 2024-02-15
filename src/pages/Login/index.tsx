/** @format */

import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import Switch from '@/Components/Switch'
import { SignUp, SignIn } from './handler'

interface LoginProps {
	setToken: (token: boolean) => void
}
const Login: React.FC<LoginProps> = ({ setToken }) => {
	const [user, setUser] = useState<string>('')
	const [password, setPassword] = useState('')
	const [formShow, setFormShow] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState(false)
	const [state, setState] = useState<string>('Login')
 
	const handleState = (state: boolean) =>
		state === true ? setState('Login') : state === false && setState('Register')

	return (
		<>
			{state}
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
										onSubmit={() =>
											state === 'Register'
												? SignUp(setIsLoading, user, password)
												: state === 'Login' &&
												  SignIn(setIsLoading, user, password)
										}>
										<Switch handleState={handleState} />
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
												value={'ثبت نام'}
											/>
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
