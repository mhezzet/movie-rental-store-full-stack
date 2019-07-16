import { Schema, model } from 'mongoose'

const inventorySchema = new Schema(
  {
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'movie'
      }
    ]
  },
  { timestamps: true }
)

export default model('inventory', inventorySchema)
