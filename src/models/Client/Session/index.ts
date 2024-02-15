import mongoose from 'mongoose'

const clientSessionSchema = new mongoose.Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true,
	},
	clientSessionToken: { type: String, required: true, unique: true },
	key: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
})
const ClientSession =
	mongoose.models.ClientSession || mongoose.model('ClientSession', clientSessionSchema)
export default ClientSession
