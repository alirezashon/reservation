/** @format */

import mongoose from 'mongoose'
const weekFoodsSchema = new mongoose.Schema({
	day: String,
	foods: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Foods',
		required: true,
	},
	quantity: Number,
})

const WeekFoods =
	mongoose.models.weekFoods || mongoose.model('WeekFoods', weekFoodsSchema)
export default WeekFoods
