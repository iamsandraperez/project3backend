const { Schema, model } = require('mongoose')

const postSchema = new Schema(
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

const Post = model("Post", postSchema)

module.exports = Post

