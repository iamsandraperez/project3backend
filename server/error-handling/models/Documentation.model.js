const { Schema, model } = require('mongoose')

const documentationSchema = new Schema(
    {
        title: {
            type: String,
        },
        cloudinaryUrl: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
)

const Documentation = model("Documentation", documentationSchema)

module.exports = Documentation


