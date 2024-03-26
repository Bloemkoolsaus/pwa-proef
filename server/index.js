const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors({ origin: '*' }));
// app.use(express.urlencoded({extended:true}));

app.get('/', function (request, response) {
    response.send("hello!");
});

app.get('/messages', function (request, response) {
    let messages = [];

    const db = new sqlite3.Database('./database.db', (error) => {
        if (error) { return console.error(error.message); }
    });
    db.all('select subject, message, date from messages order by date desc', (error, rows) => {
        rows.forEach((row) => {
            messages.push({
                "subject": row.subject,
                "date": row.date,
                "message": row.message
            });
        });

        db.close();

        console.log('get '+messages.length+' messages');
        response.json(messages);
        response.end();
    });
});

app.post('/message', bodyParser.json(), function (request, response) {
    let message = [request.body.message.subject, request.body.message.message, request.body.message.date];
    console.log(message);

    const db = new sqlite3.Database('database.db', (error) => {
        if (error) { return console.error(error.message); }
    });

    db.run('insert into messages (subject, message, date) values (?, ?, ?)', message, function(error) {
        if (error) { return console.error(error.message) }
        console.log(`${this.changes} rows inserted`)

        db.close();
        response.end();
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
