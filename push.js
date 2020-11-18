let webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLdesWndfDYIPDSA56egesWXZdfJ82vAyWgTELLXzFTg0KoJ59YDBcFVHldnnJGVtWrv_Z2DyHoZ5UUnt9ENXk0",
    "privateKey": "sH2dPJPqlfc0YwKJQozKrR5m11jRtWpk0rcq1Ph6UG8"
};

webPush.setVapidDetails(
    'mailto:sample@domain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d9nr2fHZEos:APA91bGb9iMupeKxIn6m0b9ZJzakFW9OztlUW2J_MaE8Nq0GMgunSr_gt4MRAdz8CwfRNnNZ3Jop9HRowcXdi3AM-0ICvWJ-2VlezoA_X5tqWRotxXmisZ-WSyXvG-kG9RTisZ2KQKp0",
    "keys": {
        "p256dh": "BEfnOr+F1NrRqMORf7yjhWiTAd2RLoHFrOftGINrcwT3uyM7DDiR1YYLRbuRS/97ZHbngOR33CUF1yhuu7LlplQ=",
        "auth": "WD0PYPj3nz2IfyXiLG6y3Q=="
    }
};

const payload = 'Push Notification Champ You';

let options = {
    gcmAPIKey: "723750213236",
    TTL : 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);