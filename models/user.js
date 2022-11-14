const {Schema, Types, model} = require('mongoose');

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
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

userSchema.virtual('friendCount').get(function(){
    return this.friend.length
})

const User = model('User', userSchema)

module.exports = User;
