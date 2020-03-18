
const mongoose = require('mongoose');
const fs = require('fs');

const { Schema } = mongoose;

// ************ USER SCHEMA *********************
const userSchema = new Schema({
    email: {
        type: String,
        required: 'Please enter your email',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
        dropDups: true,
    },
    password: {
        type: String,
        required: 'Please enter your password',
        match: [/^\$2[ayb]\$.{56}$/, 'Password must contains numbers, letters and special characters'],
    },
    username: {
        type: String,
        unique: true,
        dropDups: true,
    },
    avatar: { data: Buffer, contentType: String },
    position: {
        type: String,
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    github_username: {
        type: String,
    },
    website: {
        type: String,
    },
    reputation: {
        type: Number,
        default: 0,
    },
    badges: [{
        type: Schema.Types.ObjectId, ref: 'Badges',
    }],
    created_date: {
        type: Date,
        default: Date.now,
    },
    last_login: {
        type: Date,
        default: Date.now,
    },
});

//* ************** USER CLASS *********************
class User {
    constructor() {
        this.user = mongoose.model('Users', userSchema);
    }

    async getAll() {
        try {
            return await this.user.find({});
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async findByEmail(email) {
        try {
            return await this.user.findOne({ email }, ['username', 'email', 'password']);
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async findById(id) {
        try {
            return await this.user.findOne({ _id: id });
        } catch (error) {
            console.log(error);
            return { error: 'User does not exists' };
        }
    }

    async addNew(userData) {
        const Usr = this.user;
        const user = new Usr(userData);
        return await user.save();
    }

    async update(query, userdata) {
        try {
            return await this.user.findOneAndUpdate(query, userdata);
        } catch (error) {
            return { error };
        }
    }

    async avatar(imgPath) {
        this.user.avatar.data = fs.readFileSync(imgPath);
        this.user.avatar.contentType = 'image/png';

        try {
            return await this.user.save();
        } catch (error) {
            return { error };
        }
    }
}

module.exports = new User();
