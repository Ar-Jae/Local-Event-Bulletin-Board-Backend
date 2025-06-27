const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const user = require('../models/User');
const SALT = Number(process.env.SALT);

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;



router.post('/user', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        console.log(firstName, lastName, email, password,);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: bcryptjs.hashSync(password, SALT)
        });

        await newUser.save();

        const token = jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn: '24h'});
        console.log(token);

        res.status(201).json({
            message: 'User created successfully',
            newUser,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        
        let foundUser = await User.findOne({email});

        console.log(foundUser);

        if (!foundUser) throw Error(`${email} User not found`);

        const verifiedPwd = await bcryptjs.compare(password, foundUser.password);
    
        if (!verifiedPwd) throw Error(`invalid password`);

        const token = jwt.sign({id: foundUser._id}, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            message: 'Login successful',
            token,
        });

    }   catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

router.put('/:id', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, email, password: bcryptjs.hashSync(password, SALT) },
            { new: true }
        );

        if (!updatedUser) throw new Error('updatedUser not found');

        res.status(200).json({
            updatedUser,
            
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting user with ID:", id)

        const deleteUser = await User.findByIdAndDelete(id);
        
        if (!deleteUser) throw new Error('User not found')

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
