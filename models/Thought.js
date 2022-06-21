const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        userName: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('Thought', thoughtSchema);

const Reaction = model('Reaction', reactionSchema);

const handleError = (err) => console.error(err);

Thought.find({}).exec((err, collection) => {
    if (err) {
        return handleError(err);
    }
    if (collection.length === 0) {
        return Thought.insertMany(
            [
                {
                    thoughtText: "I hope this is right",
                    userName: "RichardT",
                    reactions: [ { reactionBody: 'it might be!', userName: 'tylerR' } ],
                },
                {
                    thoughtText: "Is it right though?",
                    userName: "tylerR",
                    reactions: { reactionBody: 'probably not', userName: 'RichardT' },
                },
            ],
            (insertError) =>
                insertError ? handleError(insertError) : console.log('The thoughts have been added to the database')
        );
    }
    return console.log('Duplicate thoughts not added, original still there');
});

module.exports = Thought, Reaction;