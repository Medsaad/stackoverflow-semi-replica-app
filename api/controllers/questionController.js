
const { validationResult } = require('express-validator');
const Question = require('../models/questionModel');

exports.list = async (req, res) => {

};

exports.ask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};

exports.userQuestions = async (req, res) => {

};
