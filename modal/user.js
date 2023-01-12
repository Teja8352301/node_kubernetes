let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Users=new Schema({
	name: String,
    email:String,
    age:Number
},{collection: 'users'})
const User = mongoose.model('Users',Users);
module.exports={User:User} 