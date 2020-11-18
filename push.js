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
    "endpoint": "https://fcm.googleapis.com/fcm/send/eDPcGNjt6as:APA91bHK0s7W22R1PWeBt17F5EMU63TbVAjtsVVsthTSMAgsdKCLlZRFzI7Tzj9Z7ktvTdVB8CiYeD8tcW5G9EoaJk7uing2R1PU5ZKXhH4BWGg-cYH-WVMhlXH39dN-gRsz2DjGLPRR",
    "keys": {
        "p256dh": "BIAxu8fRv4gkaXEjyEkDdqNZrxkFRRo4Znk+LMvsKr/AUacPytnshjJKTRxcrp4f6L6ZJY7GZWuVVI/X0lqhImc=",
        "auth": "es3sEkqwpmYRG+IcUMq7Iw=="
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