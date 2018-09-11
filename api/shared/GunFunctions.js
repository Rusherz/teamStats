const db = require('../shared/db');

let GunFunctions = {
    'getGunNames': () => {
        return new Promise((resolve, reject) => {
            db.find({
                database: 'gunStats',
                collection: 'gunStats',
                query: {},
                fields: {
                    '_id': false,
                    'gun': true
                }
            }, function (data) {
                resolve(data);
            })
        })
    },
    'getAllGuns': () => {
        return new Promise((resolve, reject) => {
            db_params = {
                database: 'gunStats',
                collection: 'gunStats',
                query: {},
                sort: {},
                fields: {}
            }
            db.find(db_params, function (guns) {
                let dataPoints = [

                ]
                let count = 0;
                for (let gun of guns) {
                    dataPoints.push({
                        label: gun['gun'],
                        backgroundColor: 'rgb(' + Math.random() * 256 + ', ' + Math.random() * 256 + ', ' + Math.random() * 256 + ' )',
                        fill: true,
                        data: [gun['points'], gun['damage'], gun['rof'] / 100, (gun['rof'] / 200 * gun['damage'])]
                    })
                    if (count == guns.length - 1) {
                        resolve(dataPoints);
                    } else {
                        count++;
                    }
                }
            })
        })
    },
    'getOneGun': (gunName) => {
        return new Promise((resolve, reject) => {
            db_params = {
                database: 'gunStats',
                collection: 'gunStats',
                query: {
                    'gun': gunName
                },
                sort: {},
                fields: {}
            }
            db.findOne(db_params, function (result) {
                if (result) {
                    resolve(result)
                } else {
                    reject('Could not find gun');
                }
            })
        })
    },
    'updateGunStats': (gun, gunName) => {
        return new Promise((resolve, reject) => {
            db_params = {
                database: 'gunStats',
                collection: 'gunStats',
                query: {
                    'gun': gunName
                },
                sort: {},
                fields: {}
            }
            db.updateOne(db_params, {
                $set: {
                    damage: gun['damage'],
                    magSize: gun['magSize'],
                    points: gun['points'],
                    rof: gun['rof']
                }
            }, function (result) {
                resolve(result);
            })
        })
    }
}

module.exports = GunFunctions;