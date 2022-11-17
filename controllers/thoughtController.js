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

    },
    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
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
            // .then((thought) => 
            //     !thought
            //     ? res.status(404).json({message: 'No thought with that Id'})
            //     : User.findOneAndUpdate(
            //         {thought: req.params.thoughtId},
            //         {$pull: {thought: req.params.thoughtId}},
            //         {new: true}
            //     )
            // )
            .then((user) => 
                !user
                ? res.status(404).json({message: 'No thought with that Id'})
                : res.json({message: 'Thought successfully deleted, user updated.'})
            )
            .catch((err) => 
                res.status(500).json(err)
            )
    },
    createReactions(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: {reactions: req.body}},
            {runValidators: true, new: true}
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
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            // unset removes a field, pull removes a value from the field
            {$unset: {reactions: {_id: req.params.reactionId}}},
            // {$pull: {reactions: reactionBody}},
            {runValidators: true, new: true}
        )
            .then((thought) => 
                res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    }


}