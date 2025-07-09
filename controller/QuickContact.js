const Contact = require('../models/Contact');
const router = require('express').Router();


router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
        console.log(contacts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/contact', async (req, res) => {
    try {
        const {name, email , message } = req.body;

        const newContact = new Contact({
            name, 
            email, 
            message
        });

        await newContact.save();

        res.status(201).json({
            message: 'Contact created successfully',
            newContact
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

module.exports = router;