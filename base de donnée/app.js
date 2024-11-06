require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./route/userRoute');
const postRoutes = require('./route/postRoutes');
const commentRoutes = require('./route/commentRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://dossoucharbel62:admin@charbel.xvcva.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connecté à la base de données réussie");
    })
    .catch((error) => {
        console.error("Erreur de connexion à la base de données:", error);
    });

app.use('/api/users', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

module.exports = app;
