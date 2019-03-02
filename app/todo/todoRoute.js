const express = require('express');
const router = express.Router();
const fs = require('fs');
const shortId = require('shortid');

const todoListData = 'app/data/todoList.json';
const data = JSON.parse(fs.readFileSync(todoListData, 'utf-8'));

router.get('/todo', (req,res) => {
    let data = fs.readFileSync(todoListData, 'utf8');
    res.json(JSON.parse(data));
})

router.post('/createTodo', (req, res) => {
    const body = req.body;
    req.body._id = shortId.generate();
    let jsonTodoData = data;
    let newData = jsonTodoData.push(body);
    console.log(typeof newData);
    fs.writeFileSync(todoListData, JSON.stringify(jsonTodoData), 'utf-8');
    res.send(data);
})

function changeValueInObject(obj, val, atr, change) {
     for (let i = 0; i < obj.length; i++) {
        if (obj[i][atr] === val) {
            obj[i] = change;
            obj[i][atr] = val;
            return obj;
        }
    }
    return -1;
 }

router.put('/update/:id', (req, res) => {
    let body = req.body;
    let found = false;
    let id = req.params.id;
    let newData  = changeValueInObject(data, id, '_id', body, found);
    if (newData !== -1) {
        fs.writeFileSync(todoListData, JSON.stringify(newData, null, 2), 'utf-8', (err) => {
            console.log(err);
        });
        return res.send(newData);
    }
    return res.status(400).send('Bad request').end();
});

function findValueInObject(obj, val, atr) {
   for (let i = 0; i < obj.length; i++) {
       if (obj[i][atr] === val) {
           delete obj[i];
           return obj;
       }
   }
   return -1;
}

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let i = findValueInObject(data, id, '_id', found);
    if (i !== -1) {
        fs.appendFileSync(todoListData, i, 'utf-8');
        return res.send(fs.readFileSync(todoListData, 'utf-8'));
    }
    return res.status(404).send(data).end();
})
module.exports = router;