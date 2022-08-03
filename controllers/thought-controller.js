const { Comment, Thought, User } = require('../models');

const commentController = {
  // api thoughts
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
    addReaction ({parmas})
      
      
      
      
      
      
      
 
  
  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { replies: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtsData => {
        if (!dbThoughtsData){
            res.status(404).json({message:"No thoughts with id!"});
            return;
        }
      res.json(dbThoughtsData);
    })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;
