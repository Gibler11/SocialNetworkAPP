const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  addReaction,
  updateThought,
  deleteThought,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thought
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);
  

// /api/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

  router
  .route('/:thoughtId/reaction')
  .post(addReaction)
  
  router
  .route('/:thoughtId/:reactionsId')
  .delete(removeReaction)
  

module.exports = router;