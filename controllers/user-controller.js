const { User } = require('../models')

const userController = {
  // get all user
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      });
  },
// get User by ID with Thought
    getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500);
      });
  },
  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
  }
};

addFriend({params}, res) {
User.findOneandUpdate(
    {_id: params.userId},
    {$push: {friends: parms.friendID}},
    {new: true, runValidators: true}
)
.then(dbUserData => {
    if (!dbUserData){
    res.status(500).json({ message: "User not found with this ID"});
    return;
  }
  res.json(dbUserData);
})
.catch(err => res.json(err));
},

updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  removeFriend({params}, res) {
User.findOneandUpdate(
    {_id: params.userId},
    {$push: {friends: parms.friendID}},
    {new: true, }
);
.then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
}
};

      
module.exports = userController;