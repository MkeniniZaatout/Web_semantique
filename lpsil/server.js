// Création du serveur
var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var logger = require('log4js').getLogger('Server');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extend: false}));
app.use(morgan('combined')); // Active le middleware de logging
app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)


/*
app.use(function (req, res) { // Répond enfin
    res.send('Hello world!');

});
*/

logger.info('server start');
app.listen(1313);

// Ajouter les templates
// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Définition des routes

/* On affiche le formulaire d'enregistrement */

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', function(req, res){
    res.render('login');
	
});

app.get('/profil', function(req, res){
    res.render('profil');

	
});

app.get('/inscription', function (req, res) {
    res.render('inscription');
});

app.post('/login', function (req, res) {
    // TODO vérifier si l'utilisateur existe
	/*
	Je me connecte à la base de donnée
	et je vérifie les login dans la bd
	je redirige donc dans 
	*/
	var username = req.body.username;
	var mdp = req.body.password;
	logger.info("username :" +username);
	QueryVerifLoginBd(username,mdp,res);
	var session = require('express-session');
});

app.post('/profil', function(req, res){
	res.redirect('/inscription');
});

app.post('/inscription', function (req, res) {
    res.render('inscription');
});


app.post('/register', function (req, res) {
    // TODO ajouter un nouveau utilisateur
	var email = req.body.email;
	var password = req.body.password;
	var nom = req.body.nom;
	var prenom = req.body.prenom;  
	var sexe = req.body.sexe;  
	var telephone = req.body.telephone;  
	var siteweb = req.body.siteweb;  
	var birthdate = req.body.birthdate;  
	var ville = req.body.ville;  
	var taille = req.body.taille;   
	var couleur = req.body.couleur;  
	var profilepic = req.body.profilepic;
	
	var info = {
	email:email,
	password:password,
	nom:nom,
	prenom:prenom,
	sexe:sexe,
	telephone:telephone,
	siteweb:siteweb,
	birthdate:birthdate,
	ville:ville,
	taille:taille,
	couleur:couleur,
	profilepic:profilepic
	};
	InsertNewUser(info,res);

});
/* On affiche le profile  */
app.get('/profile', function (req, res) {
    // TODO  
    // On redirige vers la login si l'utilisateur n'a pas été authentifier 
    // Afficher le button logout                                                
});      


// Base de donnée
// Connection Simple
// Requete de verifcation du Login
function QueryVerifLoginBd(userName, pswd, res){

var mysql = require('mysql');
var connection = mysql.createConnection({
    port: '3306',
	host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pictionnary'
});

connection.connect();
logger.info("Connexion Etablis");
connection.query("SELECT * from users WHERE nom='"+userName+"' AND password ='"+pswd+"';", function (err, rows, fields) {
    if (!err){
		logger.info('la syntaxte de la requete est juste');
		if(rows.length > 0){
			
        logger.info('Le résultat de la requête: ', rows);
		res.redirect('/profil');
		
		}else{
			logger.info('Login introuvable');
			res.redirect('/login');
		}
	}

});

// Deconnexion à la Bd
connection.end();
logger.info("Connexion Terminé");
}

function InsertNewUser(info,res){

var mysql = require('mysql');
var connection = mysql.createConnection({
    port: '3306',
	host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pictionnary'
});

connection.connect();
logger.info("Connexion Etablis");

// Requete pour ajouter un utilisateur
connection.query("INSERT INTO users (email,password,nom,prenom,tel,website,sexe,birthdate,ville,taille,couleur,profilepic) VALUES ('"
+info.email+"','"+info.password+"','"+info.nom+"','"+info.prenom+"','"+info.tel+"','"+info.website+"','"+info.sexe+"','"+info.birthdate+"','"+info.ville+"','"
+info.taille+"','"+info.couleur+"','"+info.profilepic+"')", function (err, result) {	
   if (!err){
		//logger.info('la syntaxte de la requete est juste');
		logger.info('Ajout d utilisateur réussi');
        //logger.info('Le résultat de la requête: ', rows);
		res.redirect('/inscription');
		
		}else{
			logger.info('Ajout d utilisateur échoué');
			res.redirect('/login');
	}

});

// Deconnexion à la Bd
connection.end();
logger.info("Connexion Terminé");

}
/*

// Pool
// Permettre d'utiliser plusieurs instance

  var pool =  mysql.createPool({
    connectionLimit : 100, //important
	port: '3306',
    host : 'localhost',
    user : 'root',
    password: 'root',
        database: 'pictionnary'
  });   

  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Erreur de connexion à la DB"});
          return;
        }  

        logger.info('connecté en tant que ' + connection.threadId);

        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }          
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Erreur de connexion à la DB"});
              return;    
        });
  });
*/