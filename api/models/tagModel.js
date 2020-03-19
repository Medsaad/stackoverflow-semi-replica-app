
const mongoose = require('mongoose');

const { Schema } = mongoose;

// ************ SCHEMA *********************
const tagSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter tag name',
        minlength: 5,
    },
    heat: {
        type: Number,
        default: 0,
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
class Tag {
    constructor() {
        this.tag = mongoose.model('Tags', tagSchema);
    }

    async getAll() {
        try {
            return await this.tag.find({});
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async find(name) {
        try {
            return await this.tag.findOne({ name });
        } catch (error) {
            console.log(error);
            return { error: 'tag does not exists' };
        }
    }

    async addNew(data) {
        const tagClass = this.tag;
        const tag = new tagClass(data);
        return await tag.save();
    }
}

module.exports = new Tag();
