/** @format */

import { NextApiRequest, NextApiResponse } from 'next'
import Data from '../../../../../models/Data'
import db from '../../../../../utils/index.js'
const FindCategory = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { category, authType } = req.body
			if (authType === 'G&E!T*P^R$O#D$U^C@T*S') {
				await db.connect()
				if (category === '@L$L%O%F#D%M^') {
					const products = await Data.find({})
					res.status(200).json({ success: true, products })
				} else {
					const products = await Data.findOne({ category })
					res.status(200).json({ success: true, products })
				}
			} else {
				res.status(407).json({ success: false, message: 'Invalid Auth Type' })
			}
		} else {
			res.status(409).json({ success: false, message: 'Invalid Request Type' })
		}
	} catch (err) {
		res.status(500).json({ success: false, message: `Server Error => ${err}` })
	}
}
export default FindCategory
