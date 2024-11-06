
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewear/middle');
const { Post } = require('../model/aut');


router.post('/posts', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const userId = req.body.userId
    try {
        const { title, content, category, userId } = req.body;

        if (!title || !content || !category || !userId) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        const newPost = new Post({ title, content, category, category, userId });        
        await newPost.save();

        return res.status(201).json({ message: 'Post créé avec succès', post: newPost });
    } catch (error) {
        console.error('Erreur lors de la création du post:', error);
        return res.status(500).json({ message: 'Erreur lors de la création du post' });
    }
});

router.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'ID de post invalide' });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error("Erreur lors de la récupération du post:", error);
        return res.status(500).json({ message: 'Erreur lors de la récupération du post' });
    }
});

router.put('/posts/:id', authenticateToken, async (req, res) => {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: 'ID de post invalide' });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }
        const user = req.user;
        
        if (user._id.toString() !== post.userId.toString() && user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès refusé' });
        }
        const { title, content, category } = req.body;

        if (title) post.title = title;
        if (content) post.content = content;
        if (category) post.category = category;

        await post.save();
        return res.status(200).json({ message: 'Post mis à jour avec succès', post });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du post:", error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du post' });
    }
});

router.delete('/posts/:id', authenticateToken, async (req, res) => {
    const postId = req.params.id;

    if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé' });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post non trouvé' });
        }
        await post.deleteOne();
        return res.status(200).json({ message: 'Post supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression du post:", error);
        return res.status(500).json({ message: 'Erreur lors de la suppression du post' });
    }
});

router.get('/users/:userId/posts', async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'ID d\'utilisateur invalide' });
    }

    try {
        const posts = await Post.find({ userId: new mongoose.Types.ObjectId(userId) });

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Aucun post trouvé pour cet utilisateur' });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Erreur lors de la récupération des posts de l'utilisateur:", error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des posts de l\'utilisateur' });
    }
});

module.exports = router;
