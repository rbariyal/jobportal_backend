const mongoose = require('mongoose')

const jobposting = new mongoose.Schema({
    jobName : {type : String , default : null},
    jobDescription : {type : String , default : null},
    jobproviderId : {type : mongoose.SchemaTypes.ObjectId , ref : 'user' ,default : null},
    companyName : {type : String , default : null},
    location:{type:String, default:null},
    salaryPackage : {type : Number , default : 0},
    vacancy:{type:Number,default:1},
    experienceRequirement : {type : Number,default : 0},
    shiftType : {type : String , default :null},
    jobType : {type : String , default : null}, 
    createdAt : {type : Date,default : Date.now()},
    updatedAt : {type : Date,default : Date.now()}
})

module.exports = new mongoose.model('job',jobposting)