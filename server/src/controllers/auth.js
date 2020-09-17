'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require('../models/User');

/** 
 * 'Error: secretOrPrivateKey must have a value': https://stackoverflow.com/questions/58673430/error-secretorprivatekey-must-have-a-value 
 */

function loginUser(req, res) {
    UserModel.findOne({ email: req.body.email })
             .select('+password')
             .exec((err, user) => {
                if(!user) return res.status(404).send({ message: "El email es incorrecto." });
                
                const validPassword = UserModel.comparePassword(req.body.password, user.password);
                if (!validPassword) return res.status(401).send({ auth: false, token: null });
            
                const token = jwt.sign({ id: user._id }, config.SECRET_TOKEN, {
                    expiresIn: 60 * 60 * 24
                });
                res.status(200).json({ auth: true, token });
             });
}

function logOutUser(req, res) {
    res.status(200).send({ auth: false, token: null });
}

async function saveUser(req, res) {
    try {
        const { username, email, password, role } = req.body;
        const user = new UserModel({
            username,
            email,
            password,
            role,
            signupDate: Date.now(),
            lastLogin: Date.now()
        });
        user.password = await UserModel.encryptPassword(password);
        user.save();
        const token = jwt.sign({ id: user.id }, config.SECRET_TOKEN, {
            expiresIn: 60 * 60 * 24 // expira en 24 horas
        });

        res.json({ auth: true, token });

    } catch (err) {
        console.clear();
        console.log(err);
        res.status(500).send({ message: 'Ocurrió un problema al crear el usuario.'});
    }
}

module.exports = {
  loginUser,
  logOutUser,
  saveUser
}