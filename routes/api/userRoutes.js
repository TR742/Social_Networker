const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
    
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


module.exports = router;