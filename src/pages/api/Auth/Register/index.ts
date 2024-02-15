/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../../../models/Client'
import Log from '../../../../models/Log'
import db from '../../../../utils'
import {
	generateKeyAndIV,
	encryptText,
} from '../../../../Components/CryptoUtils'
const Register = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await db.connect()
		if (req.method === 'POST') {
			const { user, password, authType } = req.body
			console.log(req.body)
			const logSchema = {
				user,
				details: 'Register new user',
				logName: 'Rgister',
				status: '',
			}
			const registerScheme = {
				user,
				password: '',
 				keyV: '',
			}
			//Register
			if (authType === 'C%L&i&E^n$T#R&E^g@i&s%T$e#R') {
				const userSchema = await Client.findOne({ user })
				if (userSchema?.length > 0) {
					logSchema.status = 'failed'
					const failedSignIn = new Log(logSchema)
					await failedSignIn.save()
					console.log('failed to add new client access')
					console.table(logSchema)
					res
						.status(209)
						.json({ message: 'نام کاربری یکتا نمی باشد', success: false })
				} else {
					logSchema.status = 'success'
					const { secretKey, iv } = generateKeyAndIV()
					const encryptedPassword = encryptText(password, secretKey, iv)
					registerScheme.password = encryptedPassword
					registerScheme.keyV = secretKey + '&' + iv
					const newClient = new Client(registerScheme)
					newClient.save()
					console.log('new client add')
					console.table(logSchema)
					const successSignIn = new Log(logSchema)
					successSignIn.save()
					res
						.status(200)
						.json({ message: 'ثبت نام با موفقیت انجام شد', success: true })
				}
				//Forgot Password
			} else {
				res.status(407).json({
					message:
						'Authentication Type not in body of request , check Auth API',
				})
			}
		} else {
			res.status(409).json({ message: 'ttype of method is not correct' })
		}
	} catch (error) {
		console.error('Error :', error)
		res.status(500).json({ message: 'Server Error' })
	}
}

export default Register
