import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../../models/Orders'
import Data from '../../../../models/Data'
import Log from '../../../../models/Log'
import db from '../../../../utils/index.js'

const Shop = async (req: NextApiRequest, res: NextApiResponse) => {
	interface Post {
		_id: string
		title: string
		src: string
		price: number
		category: string
		quantity: number
		description: string
		inBasket?: number
	}
	try {
		if (req.method === 'POST') {
			const { products, client, authType } = req.body
			if (authType === 'S&H!O*P^I$N#G$T^I@M*E') {
				if (products.length > 0) {
                    console.log(products)
                    await db.connect()
					const productsID = products?.map(
                        (product: string) => product.split('*2%2&7(7)5%5!1@2')[0]
                        )
                        const data: Post[] = []
                        await Promise.all(
                            productsID.map(async (id: string) => {
                                const post = await Data.findOne({ _id: id })
                                data.push(post)
                            })
					)
					const totalPrice = data.reduce((sum, post) => {
                        const postPrice = post.price || 0
						return sum + postPrice
					}, 0)
					const order = {
						client,
						products,
						price:totalPrice,
						time:new Date()
					}
					const newOrder = new Orders(order)
					await newOrder.save() 
					console.log('kalimorderoooo => ')
					res.status(200).json({ success: true, data, totalPrice })
				} else {
					res.status(406).json({ success: false, message: 'Basket is Empty' })
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
export default Shop