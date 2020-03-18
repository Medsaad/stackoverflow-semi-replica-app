
const mongoose = require('mongoose');

const { Schema } = mongoose;

// ************ SCHEMA *********************
const voteSchema = new Schema({
    isUp: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'Users',
    },
    vote_for: {
        type: String, // question | answer
    },
    question: {
        type: Schema.Types.ObjectId, ref: 'Questions',
    },
    answer: {
        type: Schema.Types.ObjectId, ref: 'Answer',
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});

//* ************** CLASS *********************
class Vote {
    constructor() {
        this.vote = mongoose.model('Votes', voteSchema);
    }

    async getVotesByType(vote_for) {
        try {
            return await this.vote.find({ vote_for }, ['isUp', vote_for]);
        } catch (error) {
            console.log(error);
            return { error: 'Votes does not exists' };
        }
    }

    async getVotesByUser(user) {
        try {
            return await this.vote.findOne({ user }, ['isUp', 'vote_for', 'question', 'answer']);
        } catch (error) {
            console.log(error);
            return { error: 'vote does not exists' };
        }
    }

    async addNew(data) {
        const voteClass = this.vote;
        const vote = new voteClass(data);
        return await vote.save();
    }
}

module.exports = new Vote();
