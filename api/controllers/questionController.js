
const { validationResult } = require('express-validator');
const Question = require('../models/questionModel');
const Tag = require('../models/tagModel');

exports.list = async (req, res) => {

};

exports.ask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //deconstruct request
    const { title, body, tagNames } = req.body;

    let tags = [];
    if (tagNames) {
        for (const tag of tagNames) {
            let tagObj = await Tag.find(tag);
            if (!tagObj || 'error' in tagObj) {
                tagObj = await Tag.addNew({ name: tag });
            }

            tags.push(tagObj._id);
        }
    }

    //add new question
    await Question.addNew({ title, body, tags });

    return res.status(200).json({ message: 'Question Created' });
};

exports.userQuestions = async (req, res) => {

};

exports.single = async (req, res) => {

};
