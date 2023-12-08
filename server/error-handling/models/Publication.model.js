const { Schema, model } = require('mongoose')

const publicationSchema = new Schema(
    {
        title: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: {
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

const Publication = model("Publication", publicationSchema)

module.exports = Publication

