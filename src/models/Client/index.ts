/** @format */

import mongoose from 'mongoose'
const clientSchema = new mongoose.Schema({
	user: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	time: {
		type: Date,
		default: new Date().toLocaleString('en-US', {
			dateStyle: 'medium',
			timeStyle: 'medium',
		}),
	},
	keyV: { type: String, required: true },
})
const Client = mongoose.models.Client || mongoose.model('Client', clientSchema)
export default Client
