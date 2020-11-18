const dbPromised = idb.open('football', 1, (upgradeDb) => {
    upgradeDb.createObjectStore('match', {
        keyPath: "id"
    });
    upgradeDb.createObjectStore('listClub', {
        keyPath: "id"
    });
});

function savedListClub(club) {
    dbPromised 
        .then((db)=> {
            let tx = db.transaction("listClub", `readwrite`);
            let store = tx.objectStore('listClub');
            store.put(club);
            return tx.complete;
        })
        .catch(error => console.log(error)
        );
}
function getAllClub() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                let tx = db.transaction("listClub", `readonly`);
                let store = tx.objectStore('listClub');
                return store.getAll();
            })
            .then(match => {
                resolve(match);
            })
    })
}

function savedMatch(match) {
    dbPromised 
        .then((db)=> {
            let tx = db.transaction("match", `readwrite`);
            let store = tx.objectStore('match');
            store.put(match);
            return tx.complete;
        })
        .then(() => {
            const toastHTML = '<span>Match Saved</span>';
            M.toast({
                html: toastHTML,
                displayLength: 1000,
            });  
        })
        .catch(error => console.log(error)
        );
}
function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                let tx = db.transaction("match", `readonly`);
                let store = tx.objectStore('match');
                return store.getAll();
            })
            .then(match => {
                resolve(match);
            })
    })
}

function delMatch(id) {
    dbPromised
        .then(db => {
            const tx = db.transaction('match', 'readwrite');
            const store = tx.objectStore('match');
            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            const toastHTML = '<span>Match Deleted</span>';
            M.toast({
                html: toastHTML,
                displayLength: 1000,
            });  
        });
}

function delTeam(id) {
    dbPromised
    .then(db => {
        const tx = db.transaction('listClub', 'readwrite');
        const store = tx.objectStore('listClub');
        store.delete(id);
        return tx.complete;
    })
}