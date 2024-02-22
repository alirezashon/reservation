/** @format */

import mongoose from 'mongoose'

const weekFoodsSchema = new mongoose.Schema({
	data: [[], [], [], [], [], [], []]
})

const WeekFoods = mongoose.models.weekFoods || mongoose.model('WeekFoods', weekFoodsSchema)
export default WeekFoods
