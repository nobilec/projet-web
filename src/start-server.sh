# Lancer mongo et node
mongod --dbpath server/resources/ &
mongoimport --db splitwiseDB --collection splitwiseDB.json
node server/rest/app.js &
