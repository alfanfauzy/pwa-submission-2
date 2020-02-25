function databasePromise(idb) {
    var dbPromise = idb.open("db_premierleague", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("team_favorit")) {
            var indexTimFav = upgradeDb.createObjectStore("team_favorit", {
                keyPath: "id"
            });
            indexTimFav.createIndex("team_name", "name", {
                unique: false
            });
        }
    });

    return dbPromise;
}