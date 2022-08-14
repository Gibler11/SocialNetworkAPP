const { Schema, model } = require('mongoose');
const dateFormat = require('moment')

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            match: [/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/, "enter valid email please" ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
        {
            type: Schema.Types.ObjectId,
                ref: 'User'
        }
    ]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
);
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
    const User = model('User', UserSchema);

    module.exports = User;