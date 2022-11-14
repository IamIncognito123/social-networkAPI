const {Thought, User} = require('../models')

module.exports = {
    getThoughts(req, res){
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
            .then((thought) => 
                !thought
                ?res.status(404).json({mesasge: 'No thought with that Id'})
                :res.json(thought) 
            )
    },
    createThought(req, res){
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err))
        // User.findOneAndUpdate(
        //     {_id: req.body.userId},
        //     {$push: {thought: req.body}},
        //     {runValidators: true, new: true}
        // )
    },
    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: {thought: req.body}},
            {runValidators: true, new: true}
        )
            .then((thought) => 
                !thought
                ?res.status(404).json({message: 'No thought with that Id'})
                :res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteThought(req, res){
        Thought.findOneAndRemove({_id: req.params.thoughtId})
            .then((thought) => 
                !thought
                ? res.status(404).json({message: 'No thought with that Id'})
                : User.findOneAndUpdate(
                    {thought: req.params.thoughtId},
                    {$pull: {thought: req.params.thoughtId}},
                    {new: true}
                )
            )
            .then((course) => 
                !course 
                ? res.status(404).json({message: 'Thought deleted, but no course found'})
                : res.json({message: 'Thought successfully deleted, course updated.'})
            )
            .catch((err) => 
                res.status(500).json(err)
            )
    },
    createReactions(req, res){
        Thought.create(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}}
        )
            .then((thought) => 
                !thought
                ? res.status(404).json({message: 'No thought with that Id'})
                : res.json(thought)
            )
            .catch((err) => 
                res.status(500).json(err)
            )
    },
    deleteReaction(req, res){
        Thought.findOneAndRemove(
            {_id: req.params.thoughtId},
            // {$pull: {reactions: req.params.reactionId}},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
            .then((thought) => 
                res.status(404).json({message: 'No thought with that Id'})
            )
            .catch((err) => res.status(500).json(err))
    }


}