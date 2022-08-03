const Url = require('../model/Url');

const CHAR = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = CHAR.length;
const basenum = 10000001;
const reversedNum = num => parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num);


const handleDetails = async (req,res) => {
    const URL = req.query.URL;
    if (!URL ) return res.status(400).json({ "message": "URL is required." });
    let result = 0;
    for (let char of URL.split('')) {
        const d = CHAR.indexOf(char)
        if (d >= 0) {
            result = result * BASE + d
        } /*else {
            console.log('err');
            res.sendStatus(500);
        }*/
    }
    let reverseId = reversedNum(result);
    let realId = reverseId - basenum;
    const foundURL = await Url.findOne({ id : realId }).exec();
    if (foundURL) {
        res.json({
            "realURL": foundURL.realURL ,
            'os' : foundURL.os ,
            'machine' : foundURL.machine ,
            'time' : foundURL.time ,
            'country' : foundURL.country ,
        });
    } else {
        res.sendStatus(404);
    }
}

module.exports = {handleDetails};