var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BO2zsF_ixIzPWLAmqUwwjNqLjDFy9c4SvyhBvoFkjH7_2TNsnd5HR4NZ46zxoxsl_BwpcUiIK9VyODleaeLmsyw",
   "privateKey": "SuoS9sPMarZPbcaSe3_I146QU4JO2X2khjwkNWecZBA"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fC8NEYK__m8:APA91bFegwi15r82jasHPXHQkN2beVqI9BgnYy7F8Ahs-GHm-aecn3HzMk24o7UtD7pVb8kNbk8cJ8YvjhSOJyiSS3i1t3sx7DkWmLlq0suqFQuNxXLlLm-C7aJMB6UjpcJ5qmjrkKbo",
   "keys": {
       "p256dh": "BOxKqoZ/k5S13rGK/iXd6aP2Zd/XAIaQAgOMW2fHaLafwj//hytc4dLuStQi9C5eIUg496qmaBDXTbw/OfYz1aM=",
       "auth": "WvFKnkxIOj2dH9Xw1Yb8XA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1033772747062',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);