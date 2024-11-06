const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewear/middle');
const { Comment } = require('../model/aut');

router.get('/posts/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'ID du post invalide' });
    }
    try {
        const comments = await Comment.find({ postId });
        if (comments.length === 0) {
            return res.status(404).json({ message: 'Aucun commentaire trouvé pour ce post' });
        }
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération des commentaires' });
    }
});

router.get('/posts/:postId/comments', async (req, res) => {
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'ID du post invalide' });
    }

    try {
        const comments = await Comment.find({ postId });
        if (comments.length === 0) {
            return res.status(404).json({ message: 'Aucun commentaire trouvé pour ce post' });
        }
        return res.status(200).json(comments);
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires:", error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des commentaires' });
    }
});

module.exports = router;
