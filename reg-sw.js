if (!('serviceWorker') in navigator) {
    console.log('Browser not supported');
} else {
    window.addEventListener('load', () => {
        registerSw();
    });
}

function registerSw() {
    return navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log('serviceWorker registered');
            return registration;
        })
        .catch(error => {
            console.log('serviceWorked failed to registered', error);
        });
}

if ('Notification' in window) {
    requestPermission();
} else {
    console.error('Notification featured not supported by browser')
}
function requestPermission() {
        Notification.requestPermission()
            .then(result => {
                if (result === 'denied') {
                    console.log('Feature not allowed');
                    return;
                }
                else if (result === 'default') {
                    console.log('User Close the box');
                    return;
                }
            });
}

navigator.serviceWorker.ready
.then(() => {
    if ('PushManager' in window) {
        navigator.serviceWorker.getRegistration().then(registration => {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BLdesWndfDYIPDSA56egesWXZdfJ82vAyWgTELLXzFTg0KoJ59YDBcFVHldnnJGVtWrv_Z2DyHoZ5UUnt9ENXk0")
            })
            .then(subscribe => {
                console.log('Berhasil subscribe dgn endpoint', subscribe.endpoint);
                console.log('Berhasil subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh'))
                )));
                console.log('Berhasil subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth'))
                )));
            })
            .catch(e => {
                console.log('Tidak dapat melakukan subscribe', e.message);
            });
        });
    }
});

function urlBase64ToUint8Array(base64String) {
    const padding ='='.repeat((4 - base64String.length % 4) %4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let index = 0; index < rawData.length; index++) {
        outputArray[index] = rawData.charCodeAt(index);
    }
    return outputArray;
}