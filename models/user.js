const { Schema, model, Types } = require('mongoose');

// defining what makes a user. each user needs a username, email, they will have friends and they will have thoughts.
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(e) {
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e);
            }
        }
    },

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ]
}
);

const User = model('User', userSchema);

const handleError = (err) => console.error(err); 

User
.create({
    user: 'AKC-Man',
    thoughts: [],
    friends: [],
})
.then(result => console.log('Created new user document', result))
.catch(err => handleError(err));

module.exports = User;