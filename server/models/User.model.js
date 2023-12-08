const { Schema, model, default: mongoose } = require("mongoose")


const userSchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Nombre de empresa es obligatorio'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [6, 'La contraseña tiene que tener 6 carácteres mínimo']
    },
    location: {
      type: String,
      required: [true, 'Debes escribir en que localidad te encuentras'],
    },
    sector: {
      type: String,
      required: [true, 'Debes escribir a qué sector perteneces'],
    },

    contact: {
      type: String,
      required: [true, 'Debe introduccir un teléfono de contacto']
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ['visitor', 'member', 'admin'],
      default: 'visitor'
    },
    colaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
