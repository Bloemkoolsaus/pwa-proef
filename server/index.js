const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const webpush = require('web-push');
const app = express();

// Generate web-push VAPID keys
const VAPID_PUBLIC_KEY = 'BAruQj-_e911eeANHd12pVboOxcFC59AX1QHZp-vzUbAcOWO4GRYtYhhmsvagulIPcKh-6kCy0wk_1eJEHm_QTc'
const VAPID_PRIVATE_KEY = 'eyVT11codEcaV6ymh4pta5nr2ME7zF-bdOq_Z1QulmU'

app.use(cors({ origin: '*' }));
app.use(express.static('frontend/client'));

app.post('/service-subscribe', bodyParser.json(), function(request, response) {
    let subscription = buildSubscription(
        request.body.subscription.endpoint,
        request.body.subscription.expirationTime,
        request.body.subscription.keys.auth,
        request.body.subscription.keys.p256dh
    );

    const db = new sqlite3.Database('database.db', (error) => {
        if (error) { return console.error(error.message); }
    });

    let query = 'insert into client_subscriptions (endpoint, expiration_time, auth_key, p256dh_key) values (?, ?, ?, ?)';
    let data = [subscription.endpoint, subscription.expirationTime, subscription.keys.auth, subscription.keys.p256dh];

    console.log(data);
    db.run(query, data, function(error) {
        if (error) {
            return console.log(error.message);
        }

        console.log('client registered');
        sendNotification(subscription, 'Notifications enabled!', 'Ja ja, nu gaan we je spammen ahahahaha!');

        db.close();

        response.sendStatus(201);
        response.end();
    });
});

app.get('/messages', function (request, response) {
    let messages = [];

    const db = new sqlite3.Database('./database.db', (error) => {
        if (error) { return console.log(error.message); }
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
        if (error) { return console.log(error.message); }
    });

    let query = 'insert into messages (subject, message, date) values (?, ?, ?)';
    db.run(query, message, function(error) {
        if (error) { return console.log(error.message) }
        console.log(`${this.changes} rows inserted`)

        let n = 0;
        // stuur notification all alle clients
        db.all('select endpoint, expiration_time, auth_key, p256dh_key from client_subscriptions', (error, rows) => {
            rows.forEach((row) => {
                let subscription = buildSubscription(row.endpoint, row.expiration_time, row.auth_key, row.p256dh_key);
                sendNotification(subscription, request.body.message.subject, request.body.message.message);
                n++;
            });
        });

        console.log(n+ ' notifications send?');

        db.close();
        response.end();
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});

function buildSubscription(endpoint, expireTime, auth, hash)
{
    return {
        endpoint: endpoint,
        expirationTime: expireTime,
        keys: {
            auth: auth,
            p256dh: hash,
        },
    };
}

function sendNotification(subscription, title, body, openUrl)
{
    const payload = {
        notification: {
            title: title,
            body: body,
            icon: 'assets/icons/icon-384x384.png',
            actions: [
                { action: 'bar', title: 'Focus last' },
                { action: 'baz', title: 'Navigate last' },
            ],
            data: {
                onActionClick: {
                    default: { operation: 'openWindow' },
                    bar: {
                        operation: 'focusLastFocusedOrOpen',
                        url: openUrl,
                    },
                    baz: {
                        operation: 'navigateLastFocusedOrOpen',
                        url: openUrl,
                    },
                },
            },
        },
    };
    const options = {
        vapidDetails: {
            subject: 'mailto:wvcampen@gmail.com',
            publicKey: VAPID_PUBLIC_KEY,
            privateKey: VAPID_PRIVATE_KEY
        },
        TTL: 60,
    };

    // send notification
    webpush.sendNotification(subscription, JSON.stringify(payload), options)
        .then((_) => {
            return true;
        })
        .catch((_) => {
            console.log(_);
        });

    return false;
}
