
import mongoose from 'mongoose'
const dataSchema = new mongoose.Schema({
	title: { type: String, required: true },
    src: { type: String, required: true },
    price: { type: Number, required: true },
    category:{type:String, required:true},
    quantity:{type:Number, required:true},
    description: String
})
const Data = mongoose.models.Data || mongoose.model('Data', dataSchema)
export default Data
