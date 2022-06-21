const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);

const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
    if (err) {
        return handleError(err);
    }
    if (collection.length === 0) {
        return User.insertMany(
            [
                {
                    userName: 'RichardT',
                    email: 'RichardT@gmail.com',
                },
                {
                    userName: 'tylerR',
                    email: 'tylerR@gmail.com',
                },
            ],
            (insertError) =>
                insertError ? handleError(insertError) : console.log('Inserted')
        );
    }
    return console.log('Already populated');
});

module.exports = User;