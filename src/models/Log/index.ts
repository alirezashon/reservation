/** @format */

import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
	user: { type: String, required: true },
	details: String,
	logName: { type: String, required: true },
	time: {
		type: Date,
		default: new Date().toLocaleString('en-US', {
			dateStyle: 'medium',
			timeStyle: 'medium',
		}),
	},
	status: String,
})

const Log = mongoose.models.Log || mongoose.model('Log', logSchema)
export default Log
