
const mongoose = require('mongoose');

const { Schema } = mongoose;

// ************ SCHEMA *********************
const badgeSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter badge name',
        minlength: 5,
    },
    type: {
        type: String, // golden | silver | bronze
        requited: 'Please enter badge type',
    },
    description: {
        type: String,
    },
    conditional: {
        type: String, // reputation | answers | questions
    },
    threshold: {
        type: Number,
        min: 1,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});

//* ************** CLASS *********************
class Badge {
    constructor() {
        this.badge = mongoose.model('Badges', badgeSchema);
    }

    async getAll() {
        try {
            return await this.badge.find({});
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async find(id) {
        try {
            return await this.badge.findOne({ _id: id });
        } catch (error) {
            console.log(error);
            return { error: 'badge does not exists' };
        }
    }

    async findByType(type) {
        try {
            return await this.badge.findOne({ type });
        } catch (error) {
            console.log(error);
            return { error: 'badge does not exists' };
        }
    }

    async addNew(data) {
        const badgeClass = this.badge;
        const badge = new badgeClass(data);
        return await badge.save();
    }
}

module.exports = new Badge();
