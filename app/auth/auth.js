const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortId = require('shortid')

const authData = 'app/data/auth.json';

router.post('/login', (req, res) => {
    let body = req.body;
    let data = fs.readFileSync(authData, 'utf-8');
    let auth = JSON.parse(data);
    auth.token = shortId.generate();
    console.log(body, auth); 
    if ((auth.password === body.password) && (auth.name === body.name)) {
        return res.send(auth.token);
    }
    return res.status(400).send('Bad Request');
});

router.post('/registration', (req, res) => {
    let body = req.body;
    fs.writeFileSync(authData, JSON.stringify(body), 'utf-8');
    res.send({'token': shortId.generate()});
})


module.exports = router;