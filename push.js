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
    "endpoint": "https://fcm.googleapis.com/fcm/send/eNOJQ1q_I30:APA91bHYTS7GBKo4PtGlUAp4OOxVuWKEKUlT5opXloUMqfGU5-93-gZTXr3CkNTj4vI2iLpLkU31LIsY04X5yrM4knxFXr2Dlycz0imuDlR-8-GfScj2ZTlb0ODSKnRv6Al_0xm6plK4",
    "keys": {
        "p256dh": "BFGq1EQ2ksUgDLDerFdzVIlpk31CYKk0lLOai0IgLCaZzZS1uaKr12CrlWBiIoHfljXUxs5l5usf/TqT7OzCk7Q=",
        "auth": "iyVH4rCFTrHgwOfzxH//Cg=="
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