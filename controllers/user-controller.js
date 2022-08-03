const { User, Thought } = require('../models')

const userController = {
  // get all user
  getAllUser(req, res) {
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
    getUserById(req, res) {
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

  createUser( req, res) {
    User.create(req. body)
    .then((dbUserData) => {
        res.json(dbUserData)
    })
       
    .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
    });
},

addFriend(req, res) {
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
.then((dbUserData) => {
    if (!dbUserData) {
        return res.status(404).json({ message: 'User not found with this id!' });
    }
    res.json(dbUserData);
})
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},
};

      
module.exports = userController;