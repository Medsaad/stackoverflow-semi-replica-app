
const mongoose = require('mongoose');

const { Schema } = mongoose;

// ************ SCHEMA *********************
const reputationSchema = new Schema({
    type: {
        type: String,
        required: 'Please enter reputation type',
        minlength: 5,
    },
    amount: {
        type: Number,
        min: 2,
    },
    description: {
        type: String,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});

//* ************** CLASS *********************
class Reputation {
    constructor() {
        this.reputation = mongoose.model('Reputations', reputationSchema);
    }

    async getAll() {
        try {
            return await this.reputation.find({});
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async find(id) {
        try {
            return await this.reputation.findOne({ _id: id });
        } catch (error) {
            console.log(error);
            return { error: 'reputation does not exists' };
        }
    }

    async findByType(type) {
        try {
            return await this.reputation.findOne({ type });
        } catch (error) {
            console.log(error);
            return { error: 'reputation does not exists' };
        }
    }

    async addNew(data) {
        const reputationClass = this.reputation;
        const reputation = new reputationClass(data);
        return await reputation.save();
    }
}

module.exports = new Reputation();
