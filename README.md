API de Gestion des Posts, Commentaires et Votes
Ce projet est une API de gestion des posts, des commentaires et des votes sur une plateforme de discussion. L'API permet de créer, lire, modifier et supprimer des posts et des commentaires, ainsi que de gérer les votes des utilisateurs.

Routes API
1. Route pour récupérer tous les posts
URL: /posts
Méthode: GET

Description: Permet de récupérer la liste de tous les posts.
 Réponse:
2
00 OK: Retourne une liste de posts.

500 Internal Server Error: En cas d'erreur serveur.

json

Copy code

[

  {
    "id": "1",
    
    "title": "Premier post",
    
    "content": "Voici le contenu du premier post.",
    
    "upvotes": 5,
    
    "downvotes": 2
  },
]

2. Route pour créer un post

URL: /posts

Méthode: POST

Description: Permet de créer un nouveau post.

Corps de la requête:

title (string): Le titre du post.

content (string): Le contenu du post.

Réponse:

201 Created: Le post a été créé avec succès.

400 Bad Request: Si les données sont manquantes ou invalides.

json

Copy code

{

  "title": "Nouveau Post",
  
  "content": "Voici un nouveau post."
}


3. Route pour récupérer un post spécifique par ID

URL: /posts/{id}

Méthode: GET

Description: Permet de récupérer un post spécifique en fonction de son ID.

Réponse:

200 OK: Retourne le post avec l'ID spécifié.

404 Not Found: Si le post n'existe pas.

json

Copy code

{

  "id": "1",
  
  "title": "Premier post",
  
  "content": "Voici le contenu du premier post.",
  
  "upvotes": 5,
  
  "downvotes": 2
}


4. Route pour voter sur un post (Upvote / Downvote)

URL: /posts/{id}/vote

Méthode: POST

Description: Permet de voter pour un post (upvote ou downvote).

Corps de la requête:

vote (string): Le type de vote, soit up pour un upvote, soit down pour un downvote.

Réponse:

200 OK: Le vote a été enregistré avec succès.

400 Bad Request: Si la valeur de vote est invalide.

404 Not Found: Si le post spécifié n'existe pas.

json

Copy code

{

  "vote": "up"
}


5. Route pour récupérer tous les commentaires d'un post

URL: /posts/{id}/comments

Méthode: GET

Description: Permet de récupérer tous les commentaires associés à un post donné.

Réponse:

200 OK: Retourne la liste des commentaires associés au post.

404 Not Found: Si le post n'existe pas.

json

Copy code

[

  {
    "id": "1",
    
    "postId": "1",
    
    "author": "Utilisateur1",
    
    "content": "C'est un très bon post!",
    
    "createdAt": "2024-11-01T12:00:00Z"
  },
]

6. Route pour ajouter un commentaire à un post

URL: /posts/{id}/comments

Méthode: POST

Description: Permet d'ajouter un commentaire à un post.

Corps de la requête:

author (string): Le nom de l'auteur du commentaire.

content (string): Le contenu du commentaire.

Réponse:

201 Created: Le commentaire a été ajouté avec succès.

400 Bad Request: Si les données sont manquantes ou invalides.

json

Copy code

{

  "author": "Utilisateur1",
  
  "content": "C'est un excellent post, merci pour le partage!"
}


7. Route pour récupérer un commentaire spécifique par ID

URL: /comments/{id}

Méthode: GET

Description: Permet de récupérer un commentaire spécifique en fonction de son ID.

Réponse:

200 OK: Retourne le commentaire avec l'ID spécifié.

404 Not Found: Si le commentaire n'existe pas.

json

Copy code

{

  "id": "1",
  
  "postId": "1",
  
  "author": "Utilisateur1",
  
  "content": "C'est un très bon post!",
  
  "createdAt": "2024-11-01T12:00:00Z"
}


8. Route pour modifier un commentaire

URL: /comments/{id}

Méthode: PUT

Description: Permet de modifier un commentaire existant.

Corps de la requête:

content (string): Le nouveau contenu du commentaire.

Réponse:

200 OK: Le commentaire a été modifié avec succès.

404 Not Found: Si le commentaire n'existe pas.

json

Copy code

{

  "content": "C'est vraiment un excellent post, j'ai adoré!"
}


9. Route pour supprimer un commentaire

URL: /comments/{id}

Méthode: DELETE

Description: Permet de supprimer un commentaire spécifique en fonction de son ID.

Réponse:

200 OK: Le commentaire a été supprimé avec succès.

404 Not Found: Si le commentaire n'existe pas.

Autres Fonctionnalités

Authentification: Le projet peut être configuré pour utiliser des tokens JWT pour l'authentification des utilisateurs, afin de sécuriser certaines routes, telles que celles permettant de créer des posts ou de 
voter.


Sécurisation des données: Toutes les données sont validées avant d'être insérées dans la base de données, et les API ne permettent pas de créer des contenus malveillants.


