const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.json({ message: 'Liste de tous les produits' });
});

module.exports = router;