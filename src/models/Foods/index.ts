/** @format */

import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
	name: { type: String, required: true },
	src: { type: String, required: true },
	price: { type: String, required: true },
})

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema)
export default Food
