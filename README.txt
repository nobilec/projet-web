1) Instructions lancement serveur :

Le script "/src/server/scripts/postinstall.js" ne fonctionne que si
une instance de mongod est lancée au préalable.

"npm start" lance le serveur qui tourne sur localhost:3000, mais celui-ci
ne renvoie pas la page d'accueil du site. Pour y accéder, il suffit d'ouvrir
"src/client/index.html" dans votre navigateur.

Sous Chrome, il est nécessaire de lancer un serveur http dans src/client/ :
"python -m SimpleHTTPServer", qui lancera le site sur localhost:8000.

Nous nous excusons par avance du désagrément encouru.

2) Instructions connexion :

Il est possible de s'inscrire sur le site, mais quelques utilisateurs
sont pré-inscrits :

"test@test.fr", mot de passe : test ;
"toto@toto.fr", mot de passe : toto ;
"tutu@tutu.fr", mot de passe : tutu ;