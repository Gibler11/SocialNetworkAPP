const {Schema, model, Types} = require("mongoose");
const moment = require("moment");

const reaction = require("./Reaction");

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        },
    
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought= model('Thought',ThoughtSchema);

module.exports= Thought;