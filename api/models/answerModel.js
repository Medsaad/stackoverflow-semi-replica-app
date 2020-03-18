
const mongoose = require('mongoose');

const { Schema } = mongoose;

// ************ SCHEMA *********************
const answerSchema = new Schema({
    body: {
        type: String,
        required: 'Please enter answer body',
        minlength: 50,
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'Users',
    },
    question: {
        type: Schema.Types.ObjectId, ref: 'Questions',
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'Users' },
        body: { type: String },
    }],
    created_date: {
        type: Date,
        default: Date.now,
    },
});

//* ************** CLASS *********************
class Answer {
    constructor() {
        this.answer = mongoose.model('Answers', answerSchema);
    }

    async getQuestionAnswers(question) {
        try {
            return await this.answer.find(
                { question },
                ['title', 'tags', 'upvotes', 'downvotes'],
                {
                    sort: { created_date: -1 },
                },
            );
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async getLatestAuthored(author, skip = 0, limit = 30) {
        try {
            return await this.answer.find(
                { author },
                ['title', 'upvotes', 'downvotes'],
                {
                    limit,
                    skip,
                    sort: { created_date: -1 },
                },
            );
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async find(id) {
        try {
            return await this.answer.findOne({ _id: id });
        } catch (error) {
            console.log(error);
            return { error: 'answer does not exists' };
        }
    }

    async addNew(ansData) {
        const answerClass = this.answer;
        const answer = new answerClass(ansData);
        return await answer.save();
    }
}

module.exports = new Answer();
