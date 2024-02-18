/** @format */

import mongoose from 'mongoose'

const weekFoodsSchema = new mongoose.Schema({
	name: { type: String, required: true },
	src: { type: String, required: true },
	price: { type: String, required: true },
})

const WeekFoods = mongoose.models.weekFoods || mongoose.model('WeekFoods', weekFoodsSchema)
export default WeekFoods
