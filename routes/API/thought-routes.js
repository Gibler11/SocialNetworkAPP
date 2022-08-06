const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtbyId,
  createThought,
  addReaction,
  updateThought,
  deleteThought,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thought
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);
  

// /api/:id
router
  .route('/:id')
  .get(getThoughtbyId)
  .put(updateThought)
  .delete(deleteThought)

  router
  .route('/:thoughtId/reaction')
  .post(addReaction)
  
  router
  .route('/:thoughtId/:reactionsId')
  .delete(deleteReaction)
  

module.exports = router;