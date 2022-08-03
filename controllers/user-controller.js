const { User, Thought } = require('../models')

const userController = {
  // get all user
  getAllUser: function(req, res) {
    User.find()
      .select('-__v')
      .then((dbUserData) => {res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)
    });
  },
// get User by ID with Thought
    getUserById: function(req, res) {
      User.findOne({ _id: req.params.id })
      .select('-__v')
      .populate("thoughts")
      .populate("friends")
      .then((dbUserData )=>{
        if (!dbUserData){
            return res.status(404).json({ message: "User not found with this ID"});  
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
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
        res.status(500).json(err);
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
        res.status(500).json(err);
    });
  },
    // Update User
    updateUser: function({ params, body }, res) {
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
  // Delete User
    deleteUser: function({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
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
        res.status(500).json(err);
      })
  }


      
module.exports = userController