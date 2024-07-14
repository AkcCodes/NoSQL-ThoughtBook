const mongoose = require('mongoose');
const { isDate } = require('util/types');

const thoughtSchema = new mongoose.Schema({
    content: {type: String, required: true },
    author: { type: String, required: true },

    lastAccessed: { type: Date, default: Date.now },
});

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

Thought
.create({
    content: '',
    author: 'AKC-Man',
    Date: isDate,
})

.then(result => console.log('Created new thought', result))
.catch(err => handleError(err));

Thought.create({content: ''})
.then(result => console.log('Created new thought', result))
.catch(err => handleError(err));

module.exports = Thought;