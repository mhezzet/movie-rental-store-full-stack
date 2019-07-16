import { Schema, model } from 'mongoose'

const movieSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true
    },
    description: {
      type: String,
      maxlength: 300
    },
    releaseYear: {
      type: Number,
      maxlength: 4
    },
    numberInStock: {
      type: Number,
      min: 0
    },
    rating: {
      type: Number,
      max: 10
    },
    poster: {
      type: String,
      maxlength: 1024
    },
    genre: [
      {
        type: String,
        enum: ['action', 'comedy', 'drama']
      }
    ]
  },
  { timestamps: true }
)

export default model('movie', movieSchema)
