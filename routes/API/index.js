const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// router.use((req, res) => {
//     res.status(404).send('<h1> EEEEK! Error 404! </h1>');
// });

module.exports = router;