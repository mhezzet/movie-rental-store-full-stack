import { Schema, model } from 'mongoose'

const rentalSchema = new Schema(
  {
    inventory: {
      type: Schema.Types.ObjectId,
      ref: 'inventory',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    rentalDate: {
      type: Date,
      default: new Date()
    },
    returnDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model('rental', rentalSchema)
