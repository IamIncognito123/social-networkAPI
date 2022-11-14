const router = require('express').Router();

// brings in routes stored in the router
const userRoute = require('./user');
const thoughtRoute = require('./thought');

//  /api/users and /api/thoughts  routes
router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

module.exports = router;
