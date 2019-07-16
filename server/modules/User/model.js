import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcryptjs'
import config from 'config'
import JWT from 'jsonwebtoken'

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      maxlength: 50
    },
    country: {
      type: String,
      maxlength: 50
    },
    address: {
      type: String,
      maxlength: 50
    },
    address2: {
      type: String,
      maxlength: 50
    },
    district: {
      type: String,
      maxlength: 50
    },
    postalCode: {
      type: String,
      maxlength: 50
    },
    phone: {
      type: String,
      maxlength: 50
    }
  },
  {
    timestamps: true
  }
)

const userSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      required: true
    },
    roles: [
      {
        type: String,
        enum: ['admin', 'user'],
        required: true
      }
    ],
    password: {
      type: String,
      maxlength: 1024,
      minlength: 3
    },
    email: {
      type: String,
      maxlength: 50,
      minlength: 4,
      lowercase: true,
      trim: true,
      unique: true,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    googleID: String,
    facebookID: String,
    picture: {
      type: String,
      default:
        'https://vignette.wikia.nocookie.net/villains/images/6/61/Unknown_Face_Of_The_Collector.jpg/revision/latest?cb=20171207211806'
    },
    firstName: {
      type: String,
      maxlength: 50,
      minlength: 2,
      lowercase: true,
      trim: true
    },
    lastName: {
      type: String,
      maxlength: 50,
      minlength: 2,
      lowercase: true,
      trim: true
    },
    addresses: [addressSchema],
    rentals: [
      {
        type: Schema.Types.ObjectId,
        ref: 'rental'
      }
    ],
    active: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.genToken = function() {
  return JWT.sign({ id: this._id, roles: this.roles }, config.get('JWT_SECRET'))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function(next) {
  if (this.method !== 'local') next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.plugin(uniqueValidator, { message: 'email is not available' })

export default mongoose.model('user', userSchema)
