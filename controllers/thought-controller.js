const { Comment, Thought, User } = require('../models');

const commentController = {
  // api thoughts ALL
  getAllThought(req, res) {
    Thought.find({})
    .populate({ path: "reactions", select: "-_v"})
    .select("-_v")
    .then(thoughtData => res.json(thoughtData))
    .catch((err) => {
      console.log(err);
        res.status(400).json (err)
    });
  },
// THOUGHT ID
  getThoughtbyID ({params},res){
    Thought.findOne({_id: params.id})
    .populate({ path: "reactions", select: "-_v"})
    .select("-_v")
    .then(thoughtData=>{
    if (!thoughtData) {
      res.status(400).json({ message: "invalid id"});
      return;
    }
    res.json(thoughtData);
    })
    .catch((err)=> res.json(err));
  },
  // CREAT THOUGHT
  createThought({params, body},res){
    Thought.create(body)
    .then(({_id}) => {
      return User.findOneAndUpdate(
        {_id: params.userId},
        {$push: {thought: _id}},
        {new: true}
      );
    })
    .then(thoughtData=>{
      if (!thoughtData) {
        res.status(400).json({ message: "invalid id"});
        return;
      }
      res.json(thoughtData);
    })
    .catch((err)=> res.json(err));
  },
  // ADD REACTION
    addReaction ({parmas, body}, res) {
      Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reaction: req.params.reactionID}},
        {new: true}
    )
    .then((dbthoughtData) => {
      if (!dbthoughtData){
      return res.status(404).json({ message: "thpught not found with this ID"});
      }
      res.json(dbthoughtData);
      })
  .catch((err)=> {
      console.log(err);
      res.status(500).json(err);
  });
},
// DELETE REACTION
deleteReaction({ params }, res) {
  User.findOneAndUpdate({ _id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
},
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
    // UPDATE THOUGHT ID 

    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
          if (!dbThoughtData) {
          res.status(404).json({ message: 'Thought not found with this id!' });
          return;
          }
          res.json(dbThoughtData);
          })
        .catch(err => res.json(err));
    },
      //  delete a thought by id 
    deleteThought({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    .then((dbthoughtData) => {
      if (!dbThoughtData) {
          return res.status(404).json({ message: ' Thought not found with this id!' });
      }
      res.json(dbThoughtData);
  })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  
  ;

module.exports = thoughtController;
