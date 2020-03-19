
const { validationResult } = require('express-validator');
const Question = require('../models/questionModel');
const Tag = require('../models/tagModel');

exports.list = async (req, res) => {

    try {
        let questions = await Question.getLatest();

        res.json({ questions });
    } catch (error) {
        return res.status(400).json({ error });
    }
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
                try {
                    tagObj = await Tag.addNew({ name: tag });
                } catch (error) {
                    return res.status(400).json({ error: "can not add tags" })
                }
            }

            tags.push(tagObj._id);
        }
    }

    //add new question
    try {
        let author = req.user_id;
        let added = await Question.addNew({ title, body, tags, author });
        return res.status(200).json({ message: 'Question Created', added });
    } catch (error) {
        return res.status(400).json({ error })
    }

};

exports.userQuestions = async (req, res) => {

};

exports.single = async (req, res) => {

};
