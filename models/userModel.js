const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        max: 32,
        unique:true,
        lowercase:true,
        index:true
    },
    name:{
        required:true,
        type:String,
        trim:true,
        max: 32
    },
    email:{
        required:true,
        type:String,
        trim:true,
        unique:true,
        lowercase:true
    },
    profile:{
        type:String,
        required:true
    },
    salt:String,
    hashed_password:{
        required:true,
        type:String
    },
    about:{
        type:String,
        trim:true
    },
    role:{
        type:Number,
        default:0
    },
    resetPasswordLink:{
        data:String,
        default:''
    }
},{timestamps:true})

userSchema.virtual('password')
.set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function() {
    return this._password;
})

userSchema.methods = {
    authenticate:function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;    
    },

    encryptPassword:function(password) {
        if(!password) return '';
        try {
            return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
        } catch (error) {
            return '';
        }
    }
}

module.exports = mongoose.model('User',userSchema);