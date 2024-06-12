const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    roles: [{ 
        type: String, 
        default: "Member" 
    }],
}, 

{
    timestamps: true,
    collection: 'Users'
});


module.exports = mongoose.model('User', userSchema);


 

;