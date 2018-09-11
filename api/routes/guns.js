let router = require('express').Router();
let GunFunctions = require('../shared/GunFunctions');

router.route('/')
    .get((req, res) => {
        GunFunctions.getAllGuns().then(results => {
            res.json(results);
        })
    })
    .post((req, res) => {
        GunFunctions.getOneGun(req.body['gunName']).then(result => {
            res.json(result);
        })
    })
    .patch((req, res) => {
        GunFunctions.updateGunStats(req.body['gun'], req.body['gunName']).then(result => {
            res.json(result);
        })
    })

router.route('/gunNames')
    .get((req, res) => {
        GunFunctions.getGunNames().then(results => {
            res.json(results);
        })
    })

module.exports = router;