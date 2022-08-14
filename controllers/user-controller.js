const { User, Thought } = require('../models')

const userController = {
  // get all user
  getAllUsers: function(req, res) {
    User.find()
      .select('-__v')
      .then((dbUserData) => {res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err)
    });
  },
// get User by ID with Thought
    getUserById: function(req, res) {
      console.log(req.params)
      User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("thoughts")
      .populate("friends")
      .then((dbUserData )=>{
        if (!dbUserData){
            return res.status(400).json({ message: "User not found with this ID"});  
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    // Create User
    createUser: function( req, res) {
    User.create(req. body)
    .then((dbUserData) => {
        res.json(dbUserData)
    })
      .catch((err) =>{
        console.log(err);
        res.status(400).json(err);
    });
  },
    // ADD FRiend
    addFriend: function(req, res) {
    User.findOneandUpdate(
        {_id: req.params.userId},
        {$addToSet: {friends: req.params.friendID}},
        {new: true}
    )
    .then((dbUserData) => {
        if (!dbUserData){
        return res.status(404).json({ message: "User not found with this ID"});
        }
        res.json(dbUserData);
        })
    .catch((err)=> {
        console.log(err);
        res.status(400).json(err);
    });
  },
    // Update User
    updateUser: function({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })  
    .then(dbUserData => {
        if (!dbUserData) {
        res.status(404).json({ message: 'User not found with this id!' });
        return;
        }
        res.json(dbUserData);
        })
      .catch(err => res.status(400).json(err));
  },
  // Delete User
    deleteUser: function({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  // Remove Friend
    removeFriend: function({params}, res) {
    User.findOneandUpdate(
    {_id: params.userId},
    {$push: {friends: params.friendID}},
    {new: true, }
  )
    .then((dbUserData) => {
    if (!dbUserData) {
        return res.status(404).json({ message: 'User not found with this id!' });
    }
    res.json(dbUserData);
  })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      })
  }}


      
module.exports = userController;