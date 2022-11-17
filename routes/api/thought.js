const router = require('express').Router();

const { 
    getThoughts, 
    getSingleThought, 
    createThought,
    updateThought,
    deleteThought,
    createReactions,
    deleteReaction,

} = require('../../controllers/thoughtController')


//  /api/thoughts 
router.route('/')
    .get(getThoughts)
    .post(createThought);

//  thoughts route by id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(createReactions);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;