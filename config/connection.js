const {connect, connection} = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/userDB';

// when mongoose.connect() is called, it creates a "default connection" 
// it can be accessed using mongoose.connection
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// the default connection is exported 
module.exports = connection;