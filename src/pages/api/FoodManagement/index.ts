/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Food from '../../../models/Foods'
import db from '../../../utils/index'

const assetManagement = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		await db.connect()
		if (req.method === 'POST') {
			const { foodName, foodCode, actionType } = req.body

			if (actionType === '%&INsertFood&%') {
				const food = await Food.findOne({ foodName })
				if (food) {
					console.log('new Food with this detail exist in')
					res.status(209).json({ message: 'پیمانکار در لیست موجود است' })
				} else {
					const newFood = new Food({ foodName, foodCode })
					await newFood.save()
					console.log('new Food with this detail add successfully')
					res
						.status(200)
						.json({ message: 'پیمانکار با موفقیت به لیست افزوده شد' })
				}
			} else if (actionType === '%&UPdateFood&%') {
				const food = await Food.findOne({ foodName })
				if (!food) {
					res.status(209).json({
						message: 'پیمانکار موجود نمی باشد یا نام آن اشتباه وارد شده است',
					})
				} else {
					await Food.updateOne({ foodName }, { foodName, foodCode })
					res.status(200).json({
						message: 'پیمانکار با موفقیت آپدیت شد',
					})
				}
			} else if (actionType === '%DEleteFood&%') {
				const food = await Food.findOne({ foodName })
				if (!food) {
					console.log('deleting Food have error, may does not exist')
					res.status(209).json({ message: 'حذف با مشکل مواجه شد' })
				} else {
					await Food.deleteOne({ foodName })
					res.status(200).json({
						message: 'پیمانکار با موفقیت حذف شد',
					})
				}
			} else {
				res.status(407).json({ succes: false, message: 'Invalid Auth Type' })
			}
		} else {
			res.status(409).json({ success: false, message: 'Invalid method' })
		}
	} catch (error) {
		console.error('Error :', error)
		res.status(500).json({ message: 'Server Error' })
	}
}
export default assetManagement
