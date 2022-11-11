const {Schema, Types} = require('mongoose');

const userSchema = new Schema(
    {
       username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
       },
       email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Unable to validate email.'
        }
       },
       thought: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
       ],
       friend: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
       ]
    }
)

const User = model('User', userSchema)

