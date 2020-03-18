
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/userModel');

exports.list = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json(users);
    } catch (error) {
        res.send(err);
    }
};

exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check if email already exists
    let userExists;
    try {
        userExists = await User.findByEmail(req.body.email);
    } catch (error) {
        console.log('Error [User Not Added]', error);
        res.send(error);
    }

    if (userExists) {
        res.status(400).json({ error: 'user already exists' });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userObj = {
        email: req.body.email,
        password: hashedPassword,
    };

    if (req.body.name && req.body.name !== '') {
        userObj.name = req.body.name;
    }

    try {
        const usr = await User.addNew(userObj);
        console.log('User added', usr);
        res.json(usr);
    } catch (error) {
        console.log('Error [User Not Added]', error);
        res.send(error);
    }
};

exports.login = async (req, res) => {
    // validate errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // get user
    let user;
    try {
        user = await User.findByEmail(req.body.email);
    } catch (error) {
        console.log('Error [User Not Added]', error);
        res.send(error);
    }

    if (!user) {
        res.json({ error: 'User does not exists' });
    }

    // add last login
    try {
        user.last_login = new Date();
        await user.save();
    } catch (error) {
        console.log('Error [User Not Added]', error);
        res.send(error);
    }

    // validate password
    const hashedPassword = bcrypt.compareSync(
        req.body.password,
        user.password,
    );

    if (hashedPassword === false) {
        return res.json({ error: 'Invalid Password' });
    }

    // let's create a token using the sign() method
    const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24, // expire in one day
        },
    );
    // send back an object with the key of token and the value of the token variable defined above
    return res.json({ token });
};

exports.profile = async (req, res) => {
    // get user
    let user;
    try {
        user = await User.findById(req.user_id);
        return res.json(user);
    } catch (error) {
        console.log('Error [User Not Added]', error);
        res.send(error);
    }
};

exports.update = async (req, res) => {
    const {
        username,
        position,
        bio,
        location,
        github_username,
        website,
    } = req.body;

    console.log('USER', req.user_id);
    try {
        const user = await User.update({ _id: req.user_id }, {
            username,
            position,
            bio,
            location,
            github_username,
            website,
        });
        return res.json({ message: 'Your profile has been saved successfully.' });
    } catch (error) {
        console.log('Unable to update user.', error);
        res.send(error);
    }
};

exports.avatar = async (req, res) => {
    let user;
    try {
        user = await User.findById(req.user_id);
    } catch (error) {
        console.log('Error [User Not Added]', error);
        res.send(error);
    }

    const { avatar } = res.body;

    try {
        user = await User.avatar(avatar);
    } catch (error) {
        console.log('Unable to update user.', error);
        res.send(error);
    }

    return res.json({ message: 'Your avatar has been saved successfully.' });
};
