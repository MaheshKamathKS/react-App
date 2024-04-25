const express = require('express')
const router = express.Router()
const User = require('../models/USER')
const { body, validationResult } = require('express-validator');
router.post("/creatuser", [
    body('email', 'Invalid email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Invalid Password').isLength({ min: 5 })
], async (req, res) => {
    console.log(  req.body.name,
         req.body.password,
         req.body.email,
         req.body.location,)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location,
        })
        res.json({ "success": true });
    } catch (error) {
        console.log(error)
        res.json({ "success": false });
    }
});

router.post("/loginuser", [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Invalid Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userdata = await User.findOne({email});
        if (!userdata) {
            return res.status(400).json({ errors: [{ msg: "try logging in with correct details" }] });

        }
        if (req.body.password !== userdata.password) {
            return res.status(400).json({ errors: [{ msg: "try logging in with correct details" }] });

        }
        return res.json({ "success": true });

    } catch (error) {
        console.log(error)
        res.json({ "success": false });

    }
});

module.exports = router;