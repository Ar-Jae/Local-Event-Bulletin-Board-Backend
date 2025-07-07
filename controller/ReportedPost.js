const Report = require('../models/report');
const router = require('express').Router();


router.get('/reports', async (req, res) => {
    try {
        const events = await Report.find();
        res.status(200).json(events);
        console.log(events);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/report', async (req, res) => {
    try {
        const {post, description , detail, email } = req.body;

        const newReport = new Report({
            post, 
            description, 
            detail, 
            email
        });

        await newReport.save();

        res.status(201).json({
            message: 'Report created successfully',
            newReport
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
);

module.exports = router;