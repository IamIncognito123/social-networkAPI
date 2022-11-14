const express = require('express');
const db = require('../config/connection');
const {User, Thought} = require('../models')

const app = express();

db.once('open', async () => {
    console.log('connected')

    await User.deleteMany({});

    await Thought.deleteMany({});

    // const Users = [];

    // Users.push({
    //     username,
    //     email,
    //     thought,
    //     friend
    // })

    await User.collection.insertOne({
        username: 'iamincognito123',
        email: 'anhvudnguyen27@gmail.com',
        

    })

    await Thought.collection.insertOne({
        thoughtText: 'hello world',
            reactions: {
                reactionBody: 'omygod'
            }
    })

    console.info('Seeding complete! 🌱');
    process.exit(0);
})