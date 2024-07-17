const { User, Thought } = require('../../models');
const router = require('express').Router();

// Create user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.bosy.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findone({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            console.log(
                'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
                req.session.cookie
            );

            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//User Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

//Find all Users
router.get('/', async (req, res)=> {
    try{
        const userData = await User.findAll({
            include: [{ model: Thought}]
        });
        res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }    
});

//Find one user
router.get('/:userId', async (req,res)=> {
    try{
        const userData = await User.findByPk(req.params.userId, {
            include: [{ model: Thought}]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
      }
});

router.delete('/', async (req,res)=> {
    try{
    const userData = User.findOneAndDelete(req.params.id)

    .then(userData => {
        if( !userData){
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(userData);
    })
    } catch(err) {
        res.status(500).json(err);
    }
})