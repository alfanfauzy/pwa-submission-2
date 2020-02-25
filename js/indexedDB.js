function cekData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("This Favorit Data")
                } else {
                    reject("This not Favorit Data")
                }
            });
    });
}

function deleteData(storeName, data) {

    databasePromise(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        document.getElementById("iconFav").innerHTML = "favorite_border";
        M.toast({
            html: 'Success, Delete Data.'
        });
    }).catch(function () {
        M.toast({
            html: 'Error !!'
        });
    });
}

function saveData(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    if (dataType == "tim") {
        storeName = "team_favorit"
        dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    } 

    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then(function () {
        document.getElementById("iconFav").innerHTML = "favorite";
        M.toast({
            html: 'Success , Data Tersimpan.'
        });
    }).catch(function () {
        M.toast({
            html: 'Error !!'
        });
    });

}

function getSavedDataById(dataType) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "tim") {
        var dataSquadHTML = ''
        var tabelSquadHTML = ''
        getDataById("team_favorit", idParam).then(function (tim) {

            data = JSON.parse(JSON.stringify(tim).replace(/http:/g, 'https:'));

            document.getElementById("name_club").innerHTML = data.name;
            document.getElementById("crest_club").src = data.crestUrl;
            document.getElementById("name").innerHTML = data.name;
            document.getElementById("address").innerHTML = data.address;
            document.getElementById("phone").innerHTML = data.phone;
            document.getElementById("website").innerHTML = data.website;
            document.getElementById("founded").innerHTML = data.founded;
            document.getElementById("venue").innerHTML = data.venue;

            tim.squad.forEach(function (squad) {
            
            
                var position = squad.position != null ? squad.position : squad.role
            
                dataSquadHTML += `
                        <tr>
                            <td >
                            <a href="./detailplayer.html?id=${squad.id}"> ${squad.name}</a>
                            </td>
                            <td >${position}</td>
                        </tr>
                        `
            });

            tabelSquadHTML += `<table> <tbody> ${dataSquadHTML}  </tbody> </table>`

            document.getElementById("list_team").innerHTML = tabelSquadHTML;
        })
    }
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function setFavoritToHTML(type) {
    if (type == "tim") {
        getAllData("team_favorit").then(function (data) {
            teamDataFavorit(data);
        });
    }
}