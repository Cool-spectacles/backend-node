exports.test = async function(req, res) {

    var argon = require('argon2');

    const hashed = await argon.hash("Smit@0987");

    res.status(200).json({
        message: "Hello from test!",
        password: "Smit@0987",
        hash: hashed
    });
}