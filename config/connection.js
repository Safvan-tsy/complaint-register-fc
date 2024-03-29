
var MongoClient = require('mongodb').MongoClient;



var state = {
    db: null
};

module.exports.connect = function (done) {
    if (state.db) return done();


    const url = 'mongodb+srv://safvan:safvan21@cms.o4hll3z.mongodb.net/?retryWrites=true&w=majority';

// Database Name
    const dbName = 'Register';

// Create a new MongoClient
    const client = new MongoClient(url,{ useNewUrlParser: true ,useUnifiedTopology: true});


// Use connect method to connect to the Server
    client.connect(function(err) {
        if (err) return done(err);
        //assert.equal(null, err);
        console.log("Connected successfully to Database");

        const dbs = client.db(dbName);
        state.db=dbs;
        //done();
    });

    done();

};

module.exports.get = function () {
    return state.db;
};
