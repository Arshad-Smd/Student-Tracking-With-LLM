import mongoose from "mongoose";

const { Schema } = mongoose;


const formschema = new Schema({
    name: { type: String, required: true },
    rollno: { type: String, required: true,index: true ,unique: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    cgpa: { type: Number, required: true },
    attendance: { type: Number, required: true },
    leetcode : {type: String},
    codechef : { type: String},
    codeforce : { type: String},
    leetcodeCount : {type: Number},
    codechefRating : {type: Number},
    skills: [{ type: String }],
    expertise: [{ type: String }],
    certificates: [{
        name: { type: String },
        link: { type: String }
    }],
    projects: [{
        name: { type: String },
        link: { type: String }
    }],
    awards: [{
        name: { type: String },
        link: { type: String }
    }],
    papers: [{
        name: { type: String },
        link: { type: String }
    }]
});

const ad = new Schema({
    id : {type: String},
    password : {type: String}
})

const us = new Schema({
    id : {type: String},
    password : {type: String}
});
export const admin = mongoose.model('admin',ad);
export const user = mongoose.model('user',us);
const form = mongoose.model('Form', formschema);

export default form;
