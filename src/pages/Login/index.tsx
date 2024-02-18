/** @format */

import 'react-toastify/dist/ReactToastify.css'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './index.module.css'
import Switch from '../../Components/Switch'
import { SignUp, SignIn } from '../../Components/Auth'

const Login: React.FC = () => {
	const [user, setUser] = useState<string>('')
	const [password, setPassword] = useState('')
	const [formShow, setFormShow] = useState<boolean>(true)
	const [isLoading, setIsLoading] = useState(false)
	const [state, setState] = useState<string>('&L^a^g@y&N*')

	const submiter = () => {
		state === '*R(e&d%i^s$T#e@r$'
			? SignUp(setIsLoading, user, password)
			: state === '&L^a^g@y&N*' && SignIn(setIsLoading, user, password)
		window.location.href = '/'
	}

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
										onSubmit={submiter}>
										<Switch
											handleState={() =>
												setState(
													state === '*R(e&d%i^s$T#e@r$'
														? '&L^a^g@y&N*'
														: '*R(e&d%i^s$T#e@r$'
												)
											}
										/>
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
