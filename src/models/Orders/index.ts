/** @format */

import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
	client: {
		type: String,
		// type: mongoose.Schema.Types.ObjectId,
		// ref: 'Client',
		// required:true,
	},
	products: {
		type: Array,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	time: {
		type: Date,
		default: new Date().toLocaleString('en-US', {
			dateStyle: 'medium',
			timeStyle: 'medium',
		}),
	},
})
const Order =
	mongoose.models.Order|| mongoose.model('Order', orderSchema)
export default Order
