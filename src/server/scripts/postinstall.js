//use nobilec_projet-web;

conn = new Mongo();
db = conn.getDB("nobilec_projet-web");

db.users.insert({ "_id" : ObjectId("56a16731131362fc177cf991"),"pseudo" : "test", "email" : "test@test.fr", "password" : "test", "groupes" : [ ], "friends" : [ ], "__v" : 0 });
db.users.insert({ "_id" : ObjectId("56a16781131362fc177cf992"), "pseudo" : "toto", "email" : "toto@toto.fr", "password" : "toto", "groupes" : [ ], "friends" : [ ], "__v" : 0 });
db.users.insert({ "_id" : ObjectId("56a1678f131362fc177cf993"), "pseudo" : "tutu", "email" : "tutu@tutu.fr", "password" : "tutu", "groupes" : [ ], "friends" : [ ], "__v" : 0 });
db.transactions.insert({ "_id" : ObjectId("56a16867131362fc177cf994"), "userPaid" : "50", "groupeName": "", "description" : "basket", "date" : "", "imageID" : "", "amount" : 100, "userShare" : [ { "pseudo" : "50", "amount" : 50, "_id" : ObjectId("56a16867131362fc177cf996") }, { "pseudo" : "toto", "amount" : 50, "_id" : ObjectId("56a16867131362fc177cf995") } ], "__v" : 0 });
db.transactions.insert({ "_id" : ObjectId("56a16875131362fc177cf997"), "userPaid" : "toto", "groupeName" : "", "description" : "maillot", "date" : "", "imageID" : "", "amount" : 100,"userShare" : [ { "pseudo" : "toto", "amount" : 50, "_id" : ObjectId("56a16875131362fc177cf999") }, { "pseudo" : "100", "amount" : 50, "_id" : ObjectId("56a16875131362fc177cf998") } ], "__v" : 0 });
db.transactions.insert({ "_id" : ObjectId("56a16889131362fc177cf99a"), "userPaid" : "toto", "groupeName" : "", "description" : "test", "date" : "", "imageID" : "", "amount" : 100, "userShare" : [ { "pseudo" : "toto", "amount" : 50, "_id" : ObjectId("56a16889131362fc177cf99c") }, { "pseudo" : "100", "amount" : 50, "_id" : ObjectId("56a16889131362fc177cf99b") } ], "__v" : 0 });
db.transactions.insert({ "_id" : ObjectId("56a16899131362fc177cf99d"), "userPaid" : "300", "groupeName": "", "description" : "test2", "date" : "", "imageID" : "", "amount" : 150, "userShare" : [ { "pseudo" : "300", "amount" : 75, "_id" : ObjectId("56a16899131362fc177cf99f") }, { "pseudo" : "toto", "amount" : 75, "_id" : ObjectId("56a16899131362fc177cf99e") } ], "__v" : 0 });
db.transactions.insert({ "_id" : ObjectId("56a168b3131362fc177cf9a0"), "userPaid" : "toto", "groupeName" : "", "description" : "test2", "date" : "", "imageID" : "", "amount" : 50, "userShare" : [ { "pseudo" : "toto", "amount" : 25, "_id" : ObjectId("56a168b3131362fc177cf9a2") }, { "pseudo" : "20", "amount" : 25, "_id" : ObjectId("56a168b3131362fc177cf9a1") } ], "__v" : 0 });
