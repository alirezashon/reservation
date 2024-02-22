import db from '../../../../../utils/index.js'
import Data from '../../../../../models/Data'
import { NextApiRequest, NextApiResponse } from 'next'
const Post = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method === 'POST') {
			const { authType, data, user } = req.body
 			await db.connect()
			console.log(
				`new request for recived to post Management with below data from Admin${user}`
			)
			console.table(data)
			if (authType === '!I@N$e$r%T&O*') {
				await new Data(data).save()
				console.log(`new Post added to DB by Admin ${user}`)
				console.table(data)
				res.status(200).json({ success: true })
			} else if (authType === '&U*P^d%A&T^e%O#Y@') {
				const post = await Data.findOne({ title: data.title })
				if (post) {
					await Data.updateOne({ title: data.title },  data.newData )
                    console.log(`Updated Successfully by Admin ${user}`)
                    console.table(data)
                    res.status(200).json({ success: true })
                } else {
                    console.log(`update unssuccess By Admin ${user}`)
                    console.table(data)
                    res.status(209).json({
                        success: false,
						message: 'title not exist between Posts',
                    })
				}
			} else if (authType === '*D(e&L*e$T#e$o%y*a!') {
                const post = await Data.findOne({ title: data.title })
				if (post) {
                    await Data.deleteOne({ title: data.title })
                    console.log(`post deleted by Admin ${user}`)
                    console.table(data)
					res.status(200).json({ success: true })
                } else {
                    console.log(`deleting post unsuccess by Admin ${user}`)
                    console.table(data)
					res.status(209).json({
						success: false,
						message: 'title not exist between Posts',
					})
				}
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