const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  removeFriend,
  addFriend
} = require('../../controllers/user-controller');

// /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
  

// /api/:id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);
  

module.exports = router;