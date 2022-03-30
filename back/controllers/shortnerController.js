const Url = require('../model/Url');

const handleCreateShortner = async (req,res) => {
    let { URL } = req.body;
    if (!URL ) return res.status(400).json({ "message": "URL is required." });
    try {
        let last = await Url.find().sort({ _id: -1 }).limit(1);
        if (!last[0]) {
            if (URL.indexOf("://") == -1) {
                URL = "://".concat(URL);
            }
            const result = await Url.create({
                "user": req.user,
                "realURL": URL,
                "shortURL": 'aaaaaa',
            })
            console.log(result);
            res.status(201).json({ "shortURL": 'aaaaaa' });
        } else {
            let lastId = last[0].shortURL
            const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];
            let i = lastId.length - 1;
            let change = alphabet.indexOf(lastId[i]);
            let rest = '';

            while (change == alphabet.length - 1) {
                i--;
                change = alphabet.indexOf(lastId[i])
            }
            let when = (lastId.length - 1 - i)
            for (let j = 0; j < when; j++) {
                rest += alphabet[0];
            }
            short = lastId.slice(0, i) + alphabet[change + 1] + rest;
            if (URL.indexOf("://") == -1) {
                URL = "://".concat(URL);
            }
            // create && store the new user
            const result = await Url.create({
                "user": req.user,
                "realURL": URL,
                "shortURL": short,
            })
            console.log(result);
            res.status(201).json({ "shortURL": short });
            }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": err.message });
    }
}

const handleGetShortner = async (req,res) => {
    const URL = req.query.URL;
    if (!URL ) return res.status(400).json({ "message": "URL is required." });
    const foundURL = await Url.findOne({ shortURL : URL }).exec();
    if (foundURL) {
        res.json({ "realURL": foundURL.realURL });
    } else {
        res.sendStatus(404);
    }
}

module.exports = { handleCreateShortner, handleGetShortner };