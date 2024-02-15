/** @format */

import { toast } from 'react-toastify'

export const SignIn = async (
 	setIsLoading: (arg: boolean) => void,
 	user: string,
	password: string
) => {
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

export const SignUp = async (
 	setIsLoading: (arg: boolean) => void,
 	user: string,
	password: string
) => {
 	setIsLoading(true)

	try {
		const response = await fetch('/api/Auth/Register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user: user,
				password: password,
				authType: 'C%L&i&E^n$T#R&E^g@i&s%T$e#R',
			}),
		})
		const data = await response.json()
		if (data.success === true && response.status === 200) {
			localStorage.setItem('user', JSON.stringify(user))
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
