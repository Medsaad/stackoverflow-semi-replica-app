
const mongoose = require('mongoose');

const { Schema } = mongoose;

// ************ SCHEMA *********************
const questionSchema = new Schema({
    title: {
        type: String,
        required: 'Please enter your question',
        minlength: 10,
    },
    body: {
        type: String,
        required: 'Please enter question body',
        minlength: 50,
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'Users',
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tags',
        required: false,
    }],
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
    status: {
        type: String,
        default: 'active', // also closed
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});

//* ************** CLASS *********************
class Question {
    constructor() {
        this.question = mongoose.model('Questions', questionSchema);
    }

    async getLatest(skip = 0, limit = 30) {
        try {
            return await this.question.find(
                { status: 'active' },
                ['title', 'body', 'tags', 'upvotes', 'downvotes'],
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

    async getLatestAuthored(author, skip = 0, limit = 30) {
        try {
            return await this.question.find(
                { status: 'active', author },
                ['title', 'tags', 'upvotes', 'downvotes'],
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
            return await this.question.findOne({ _id: id });
        } catch (error) {
            console.log(error);
            return { error: 'question does not exists' };
        }
    }

    async addNew(qData) {
        const QuestionClass = this.question;
        const question = new QuestionClass(qData);
        return await question.save();
    }
}

module.exports = new Question();
