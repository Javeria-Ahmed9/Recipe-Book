import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Favorite from './models/Favorite.js'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/recipes')
  .then(() => console.log('MongoDB connected'))

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find().sort({ createdAt: -1 })
  res.json(favorites)
})

app.post('/favorites', async (req, res) => {
  const fav = await Favorite.create(req.body)
  res.json(fav)
})

app.delete('/favorites/:id', async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

app.listen(3001, () => console.log('Server running on port 3001'))
