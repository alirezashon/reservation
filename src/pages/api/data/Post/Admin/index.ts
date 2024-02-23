/** @format */

import db from '../../../../../utils/index.js'
import WeekFoods from '../../../../../models/WeekFoods'
import Food from '../../../../../models/Foods/index.js'
import { NextApiRequest, NextApiResponse } from 'next'

const Post = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType, data, user } = req.body
			const reterivedData = {
				day: data.day,
				foods: data.food,
				quantity: data.quantity,
			}
			await db.connect()
			console.log(
				`new request for recived to post Management with below data from Admin${user}`
			)
			if (authType === '!I@N$e$r%T&O*') {
				const CheckExist = await WeekFoods.findOne({ day: data.day })
				console.table(CheckExist)
				if (CheckExist) {
					console.log('ali data nis kee eeeeeeeeeee')
					console.log(CheckExist)
					await WeekFoods.findOneAndUpdate(
						{ day: data.day },
						{ $set: data.food },
						{ new: true }
					)
				} else {
					await new WeekFoods(reterivedData).save()
					console.table(data)
				}
				res.status(200).json({ success: true })
			} else {
				console.warn(`some one trying to call API ${req.body}`)
				res.status(407).json({ success: false, message: 'Invalid auth type' })
			}
		} else {
			res.status(409).json({ success: false, message: 'Invalid Request Type' })
		}
	} catch (err) {
		res.status(500).json({ success: false, message: `Server Error => ${err}` })
	}
}
export default Post
