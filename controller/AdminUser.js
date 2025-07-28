const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const SALT = Number(process.env.SALT);
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/admin', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        console.log(firstName, lastName, email, password);

        // Check if the email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin email already exists' });
        }

        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password: bcryptjs.hashSync(password, SALT),
            isAdmin: false,
            status: 'pending',
        });
        await newAdmin.save();

        res.status(201).json({
            message: 'Admin request submitted and pending approval',
            newAdmin
        });
// Get all pending admin requests
router.get('/pending', async (req, res) => {
    try {
        const pendingAdmins = await Admin.find({ status: 'pending' });
        res.status(200).json(pendingAdmins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Approve an admin request
router.post('/approve/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { status: 'approved', isAdmin: true },
            { new: true }
        );
        if (!updatedAdmin) throw new Error('Admin not found');
        res.status(200).json({ message: 'Admin approved', updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Disapprove an admin request
router.post('/disapprove/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { status: 'disapproved', isAdmin: false },
            { new: true }
        );
        if (!updatedAdmin) throw new Error('Admin not found');
        res.status(200).json({ message: 'Admin disapproved', updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
        
        let foundAdmin = await Admin.findOne({email});

        console.log(foundAdmin);

        if (!foundAdmin) throw Error(`${email} Admin not found`);

        const ifFound = await bcryptjs.compare(password, foundAdmin.password);
    
        if (!ifFound) throw Error(`invalid password`);

        const token = jwt.sign(
            { id: foundAdmin._id, isAdmin: foundAdmin.isAdmin },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Admin login successful',
            token,
            isAdmin: foundAdmin.isAdmin
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

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { firstName, lastName, email, password: bcryptjs.hashSync(password, SALT) },
            { new: true }
        );

        if (!updatedAdmin) throw new Error('updated Admin not found');

        res.status(200).json({
            updatedAdmin,
            
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

        const deleteAdmin = await Admin.findByIdAndDelete(id);
        
        if (!deleteAdmin) throw new Error('Admin not found')

        res.status(200).json({ message: 'Admin deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;

















