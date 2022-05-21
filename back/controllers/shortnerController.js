const { base } = require('../model/Url');
const Url = require('../model/Url');

const CHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = CHAR.length;
const basenum = 10000001;
const reversedNum = num => parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num);

const handleCreateShortner = async (req,res) => {
    let { URL } = req.body;
    if (!URL ) return res.status(400).json({ "message": "URL is required." });
    try {
        const results = await Url.find().sort({ _id: -1 }).limit(1);
        const lastResult = results[0];
        let lastId = lastResult.id;
        let id = lastId + 1;
        let num = basenum + id;
        let int = reversedNum(num);
        let short = ''
        do {
            short = CHAR[int % BASE] + short
            int = Math.floor(int / BASE)
        } while (int > 0)
        if (URL.indexOf("://") == -1) {
            URL = "://".concat(URL);
        }
        // create && store the new user
        const result = await Url.create({
            "id": id,
            "user": req.user,
            "realURL": URL,
            "shortURL": short,
        })
        console.log(result);
        res.status(201).json({ "shortURL": short });
    } catch (err) {
        console.log(err)
        res.status(500).json({ "message": err.message });
    }
}

const handleGetShortner = async (req,res) => {
    const URL = req.query.URL;
    if (!URL ) return res.status(400).json({ "message": "URL is required." });
    let result = 0;
    for (let char of URL.split('')) {
        const d = CHAR.indexOf(char)
        if (d >= 0) {
            result = result * BASE + d
        } else {
            console.log('err');
            res.sendStatus(500);
        }
    }
    let reverseId = reversedNum(result);
    let realId = reverseId - basenum;
    const foundURL = await Url.findOne({ id : realId }).exec();
    if (foundURL) {
        res.json({ "realURL": foundURL.realURL });
    } else {
        res.sendStatus(404);
    }
}

module.exports = { handleCreateShortner, handleGetShortner };