const express = require('express');
const router = express.Router();
const { User } = require('../model/aut');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


router.post('/login', async (req, res) => {
    const { fullName, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserRole = role && (role === 'admin' || role === 'user') ? role : 'user';
        const newUser = new User({ fullName, email, password: hashedPassword, role: newUserRole });
        const savedUser = await newUser.save();
        const token = jwt.sign({ userId: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            message: 'Utilisateur créé avec succès',
            userId: savedUser._id,
            token: token,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de l\'enregistrement', error: error.message });
    }
});

router.post('/loginCheck', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Connexion réussie',
            token: token
        });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la vérification' });
    }
});

router.put('/users/:id', async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID utilisateur invalide' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const { fullName, email, password } = req.body;

        if (fullName) user.fullName = fullName;
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé' });
            }
            user.email = email;
        }
        if (password) user.password = await bcrypt.hash(password, 10);
        await user.save();
        return res.status(200).json({ message: 'Utilisateur mis à jour avec succès', user });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
});

router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID utilisateur invalide' });
    }
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: error.message });
    }
});

module.exports = router;
