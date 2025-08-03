const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const SALT = Number(process.env.SALT);
const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------------
// POST /admin - Create Admin
// ------------------------------
router.post('/admin', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

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

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ------------------------------
// GET /pending - Get all pending admin requests
// ------------------------------
router.get('/pending', async (req, res) => {
    try {
        const pendingAdmins = await Admin.find({ status: 'pending' });
        res.status(200).json(pendingAdmins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ------------------------------
// POST /approve/:id
// ------------------------------
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

// ------------------------------
// POST /disapprove/:id
// ------------------------------
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

// ------------------------------
// POST /login
// ------------------------------
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundAdmin = await Admin.findOne({ email });

        if (!foundAdmin) throw Error(`${email} Admin not found`);

        const isMatch = await bcryptjs.compare(password, foundAdmin.password);
        if (!isMatch) throw Error(`Invalid password`);

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

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ------------------------------
// PUT /:id - Update Admin
// ------------------------------
router.put('/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const { id } = req.params;

        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { firstName, lastName, email, password: bcryptjs.hashSync(password, SALT) },
            { new: true }
        );

        if (!updatedAdmin) throw new Error('Updated Admin not found');

        res.status(200).json({ updatedAdmin });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// ------------------------------
// DELETE /:id - Delete Admin
// ------------------------------
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) throw new Error('Admin not found');

        res.status(200).json({ message: 'Admin deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
