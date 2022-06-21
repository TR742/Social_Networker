const { User } = require('../models');

module.exports = {
    
    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then(async (users) => {
                const userData = {
                    users,
                };
                return res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('Thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There is no user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There is no user with that name!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //delete user by ID
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'There is no user with this id!' })
                    : res.json({ message: 'The user has been deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

};