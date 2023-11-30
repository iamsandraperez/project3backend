const { Schema, model } = require('mongoose')

const documentationSchema = new Schema(
    {
        title: {
            type: String,
        },
        cloudinaryUrl: {
            type: String, ////////////////////revisar
        },
        owner: {  /////////////////////////revisar si esto es la manera correcta
            type: Schema.Types.ObjectId,
            ref: 'User', ////////////// revisar si esta línea es correcta
        }
    },
    {
        timestamps: true
    }
)

const Documentation = model("Documentation", documentationSchema)

module.exports = Documentation


