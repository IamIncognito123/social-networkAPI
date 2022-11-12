const {Thought, User} = require('../controllers')

module.exports = {
    getUsers(req, res){
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
            .then((user) => 
                !user
                ?res.status(404).json({message: 'No user with that ID'})
                :res.json(course)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res){
        User.insertOne(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(404).json(err)
            })
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            {_id: req.params.userId}, 
            {$set: req.body},
            {runValidators: true, new: true}
        )
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) => 
                ! user
                ? res.status(404).json({message: 'No user with that ID'})
                : User.deleteMany({_id})
            )
    }
}