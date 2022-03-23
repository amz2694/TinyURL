const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) => {
    const { user,email,pwd } = req.body;
    console.log(user,email,pwd);
    if (!user || !pwd || !email ) return res.status(400).json({ "message": "username and password and email are required." });
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        // create && store the new user
        const result = await User.create({
            "username": user,
            "email": email,
            "password": hashedPwd,
        })
        console.log(result);
        res.status(201).json({ "success": `new user ${user} created!` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = { handleNewUser };