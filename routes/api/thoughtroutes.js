const { User, Thought } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(
           req.body
    );
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.delete('/:id', async (req,res)=> {
    try{
    const thoughtData = Thought.findOneAndDelete(req.params.id)

    .then(thoughtData => {
        if( !thoughtData){
            return res.status(404).json({ message: 'thought not found' })
        }
        res.json(thoughtData);
    })
    } catch(err) {
        res.status(500).json(err);
    }
})
module.exports = router;