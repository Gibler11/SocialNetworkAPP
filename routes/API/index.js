const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');

router.use('/api', thoughtRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> EEEEK! Error 404! </h1>');
});

module.exports = router;