/** @format */

import db from '../../../../utils/index.js'
import Food from '../../../../models/Foods'
import { NextApiRequest, NextApiResponse } from 'next'
const get = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType } = req.body
			if (authType === 'G!E@T#A^G#E$N%T^S*') {
				await db.connect()
				const foods = await Food.find({}).sort({ time: -1 })
				res.status(200).json({ success: false, foods })
			} else {
				res.status(407).json({ success: false, message: 'Invalid auth type' })
			}
		} else {
			res.status(409).json({ success: false, message: 'Invalid Method' })
		}
	} catch (err) {
		res.status(500).json({ success: false, message: `Server Error => ${err}` })
	}
}

export default get
