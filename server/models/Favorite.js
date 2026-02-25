import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: String,
  prepTime: Number,
  image: String,
  ingredients: [String],
  instructions: [String]
}, { timestamps: true })

export default mongoose.model('Favorite', schema)
