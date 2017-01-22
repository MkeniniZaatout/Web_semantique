// Création du serveur
var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var logger = require('log4js').getLogger('Server');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var mysql = require('mysql');

app.use(bodyParser.urlencoded({ extend: true}));
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
	res.redirect('/index');
});

app.get('/index', function(req, res){
	logger.info('Acces à la page index');
	session.open = false;
	res.render('index');
});



app.get('/login', function(req, res){
	logger.info('Acces à la page login');
	session.open = false;
	res.render('login');
});

app.get('/loginAdmin', function(req, res){
	logger.info('Acces à la page loginAdmin');
	session.open = false;
	res.render('loginAdmin');
});

app.get('/inscription', function (req, res) {
	logger.info('Acces à la page inscription');
	res.render('inscription');
});

/* On affiche le profile  */
app.get('/profil', function(req, res){
	logger.info('Acces à la page profil');
	
	if(session.open == true){
		logger.info('la session est ouverte je vais à la page profil');
		res.render('profil',{
		email: session.mail,
		nom: session.nom,
		prenom: session.prenom,
		profilepic: session.photo,
		couleur: session.color,
		ville : session.ville
		});
	}
	else 
	{	logger.info('Dans le else , la session pas ouverte');
		// on redirige l'utilisateur vers une page
		res.render('BadSession');
	}
logger.info('je suis ni dans le if ');
});

app.get('/profilAdmin', function(req, res){
	logger.info('Acces à la page profil');
	
	if(session.open == true){
		logger.info('la session est ouverte je vais à la page profil');
		res.render('profilAdmin',{
		email: session.mail,
		nom: session.nom,
		prenom: session.prenom,
		profilepic: session.photo,
		couleur: session.color,
		ville : session.ville
		});
	}
	else 
	{	logger.info('Dans le else , la session pas ouverte');
		// on redirige l'utilisateur vers une page
		res.render('BadSession');
	}
logger.info('je suis ni dans le if ');
});

app.get('/Paint', function(req, res)
{
	logger.info('Acces à la page Paint');
	if(session.open == true){
		
		res.render('Paint',{
		email: session.mail,
		nom: session.nom,
		prenom: session.prenom,
		profilepic: session.photo,
		couleur: session.color
		});
	}
	// on redirige l'utilisateur vers la page 
	res.render('BadSession');
});



app.get('/dashBord', function(req, res)
{
	logger.info('Acces à la page dashBord');
	if(session.open == true){
		res.render('dashBord',{
		nom: session.nom,
		});
	}
	// on redirige l'utilisateur vers la page 
	res.redirect('login');
});

app.get('/dashBord-Admin', function(req, res)
{
logger.info('Acces à la page dashBord Admin');
if(session.open == true){
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
			// function(err, result){}
			connection.query("SELECT nom from users", function (err, rows, fields) {
			if (!err){
				logger.info('la syntaxte de la requete est juste');	
				res.render('dashBord-Admin');
				/*,{nom1: nom1, nom2:nom2}*/

			}else{
				throw err;
				
		}
});
		
		
// res.render('dashBord-Admin',{rows:rows});
	}
	// on redirige l'utilisateur vers la page 
	res.redirect('index');
});


app.get('/dashBordSup', function(req, res)
{
	logger.info('Acces à la page dashBord');
	if(session.open == true){
		res.render('dashBordSup',{
		nom: session.nom,
		});
	}
	// on redirige l'utilisateur vers la page 
	res.redirect('login');
});



app.post('/loginAdmin', function (req, res) {
    // TODO vérifier si l'utilisateur existe
	/*
	Je me connecte à la base de donnée
	et je vérifie les login dans la bd
	je redirige donc dans 
	*/
	var username = req.body.username;
	var mdp = req.body.password;
	logger.info("username :" +username);
	QueryVerifLoginAdmin(username,mdp,res);
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
});




app.post('/inscription', function (req, res) {
    res.render('inscription');
});

app.post('/BadSession', function(req, res){
	res.render('/BadSession');
});

app.get('/ErreurLogin', function(req, res){
	res.render('ErreurLogin');
});


app.post('/supProfil', function (req, res){	
var nom = session.nom; 
logger.info(nom);
// Deleteprofil(nom,res);
});

app.post('/updateProfil', function (req, res) {
    // TODO ajouter un nouveau utilisateur
	var email = req.body.email;
	var password = req.body.password;
	// le vrais nom pour le where 
	var nom = req.body.nom;
	var nomChange = req.body.nomChange;
	var prenom = req.body.prenom;  
	var sexe = req.body.gender;  
	var telephone = req.body.telephone;  
	var siteweb = req.body.web;  
	var birthdate = req.body.birthdate;  
	var ville = req.body.ville;  
	var taille = req.body.taille;   
	var couleur = req.body.textcolor;  
	var profilepic = req.body.profilepic;
	logger.info(email+nomChange+prenom+sexe+telephone+siteweb+birthdate+ville+taille+couleur);
	
	
	var info = {
	email:email,
	password:password,
	// nom:nom,
	nomChange:nomChange,
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
	
	UpdateProfil(info,res);
	
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
	
	// determinera si 
	// var type = req.body.type;
	// logger.info(type);
	
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
	
	// Admin
	// InsertNewUserAdmin(info,res)
		
	InsertNewUser(info,res);
	// logger.info("Ni utilisateur ni Admin");
	
});

app.post('/paint', function (req, res) {

    var drawingCommands=req.body.drawingCommands;
    var picture=req.body.picture;
    var userId = session.id;
    var email = req.body.destinataire;
    var mot = req.body.mot;
    var pool =  mysql.createPool({
        connectionLimit : 100, //important
        host : 'localhost',
        user : 'test',
        password: 'test',
        database: 'pictionnary'
		});	
	pool.getConnection(function(err,connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Erreur de connexion à la DB"});
            return;
        }
        var req = "INSERT INTO drawings(id, commands, picture, email, mot) VALUES ('"+drawingCommands+"','"+ picture +"',"+ userId+",'"+email+"','"+mot+"')";
        connection.query(req, function (err, rows) {
            connection.release();
            if (err) throw err;
            else res.redirect("/profil")
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Erreur de connexion à la DB"});
            return;
        });
    });
    // TODO ajouter un nouveau utilisateur
});

function Deleteprofil(nom,res){
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
	connection.query("DELETE FROM users WHERE nom ='"+nom+"'", function(err, result){
				if(!err){
				logger.info("Suppresion reussis");
				res.redirect("/login");
				}else{
				logger.info('echec de la suppression du profil');
				throw err;
				}
	});
}





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
	// function(err, result){}
		connection.query("SELECT * from users WHERE nom='"+userName+"' AND password ='"+pswd+"';", function (err, rows, fields) {
			if (!err){
				logger.info('la syntaxte de la requete est juste');
				if(rows.length > 0){
				logger.info('Je suis dans le if')
				logger.info('Le résultat de la requête: ', rows);
				session.open = true;
				session.id = rows[0].id;
				session.nom = rows[0].nom;
				session.mail = rows[0].email;
				session.prenom = rows[0].prenom;
				session.photo = rows[0].profilepic;
				session.ville = rows[0].ville;
				session.color = rows[0].couleur;
				res.redirect('/profil');
				}else{
					logger.info('Erreur de login');
					logger.info('Probleme de redirection ver profil apres inscription');
					res.redirect('/ErreurLogin');
					
				}
					
			
			}else{
				throw err;
				
			}
			
// Deconnexion à la Bd
// logger.info('ceuxci est le 2e message apres a le If !err, avant la deconnexion');
// connection.end();
// logger.info("Connexion à la Bd Terminé");
});
}


// Login Admin
function QueryVerifLoginAdmin(userName, pswd, res){
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
	// function(err, result){}
		connection.query("SELECT * from admin WHERE nom='"+userName+"' AND password ='"+pswd+"';", function (err, rows, fields) {
			if (!err){
				logger.info('la syntaxte de la requete est juste');
				if(rows.length > 0){
				logger.info('Je suis dans le if')
				logger.info('Le résultat de la requête: ', rows);
				session.open = true;
				session.nom = rows[0].nom;
				session.mail = rows[0].email;
				session.prenom = rows[0].prenom;
				session.photo = rows[0].profilepic;
				session.ville = rows[0].ville;
				session.color = rows[0].couleur;
				res.redirect('/profilAdmin');
				}else{
					logger.info('Erreur de login');
					logger.info('Probleme de redirection ver profil apres inscription');
					res.redirect('/ErreurLogin');
				}
					
			
			}else{
				throw err;
				
			}
			
// Deconnexion à la Bd
// logger.info('ceuxci est le 2e message apres a le If !err, avant la deconnexion');
// connection.end();
// logger.info("Connexion à la Bd Terminé");
});
}


function UpdateProfil(info,res){
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
	logger.info(info.email+info.nomChange+info.prenom+info.telephone+info.sexe+info.couleur+info.siteweb+info.brithdate+info.ville);
	
	connection.query("UPDATE users SET email ='"+info.email+"',password='"+info.password+"' ,prenom='"+info.prenom+"',tel='"+info.telephone+"',website='"
	+info.siteweb+"',sexe='"+info.sexe+"',birthdate='"+info.brithdate+"',ville= '"+info.ville+"',taille='"+info.taille+"',couleur='"
	+info.couleur+"' ,profilepic='"+info.profilepic+"' WHERE nom = 'Mkenini'",function(err, result){
		if(!err){
			logger.info("Modification des informations reussis");
			res.redirect("/login");
		}else{
		logger.info('echec de la modification du profil');
		throw err;
		}
		// result.redirect('dashBord');			
		// Deconnexion à la Bd
		// connection.end();
		// logger.info("Connexion Terminé");	
	});	

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


logger.info("Connexion Etablis");
// Requete pour ajouter un utilisateur 
connection.query("INSERT INTO users (email,password,nom,prenom,tel,website,sexe,birthdate,ville,taille,couleur,profilepic) VALUES ('"
+info.email+"','"+info.password+"','"+info.nom+"','"+info.prenom+"','"+info.tel+"','"+info.website+"','"+info.sexe+"','"+info.birthdate+"','"+info.ville+"','"
+info.taille+"','"+info.couleur+"','"+info.profilepic+"')", function (err, result) {	

	if (!err){
		// logger.info('la syntaxte de la requete est juste');
		logger.info('Ajout d utilisateur réussi');
		// Requete Sql "imbriqué" afin de recuperer les info et à les placer sur la page profile
		res.redirect('/index');
		
		/*
		if(rows.lentgh>0){
			session.open = true;
			session.mail = rows[0].email
		}
		*/
		}else{
			logger.info('Ajout d utilisateur échoué , reessayer l inscription');
			res.redirect('/Inscription');
	}

});

// Deconnexion à la Bd
connection.end();
logger.info("Connexion Terminé");

}




// Administrateur 
function InsertNewUserAdmin(info,res){
var mysql = require('mysql');
var connection = mysql.createConnection({
    port: '3306',
	host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pictionnary'
});


logger.info("Connexion Etablis");
// Requete pour ajouter un utilisateur 
connection.query("INSERT INTO admin (email,password,nom,prenom,tel,website,sexe,birthdate,ville,taille,couleur,profilepic) VALUES ('"
+info.email+"','"+info.password+"','"+info.nom+"','"+info.prenom+"','"+info.tel+"','"+info.website+"','"+info.sexe+"','"+info.birthdate+"','"+info.ville+"','"
+info.taille+"','"+info.couleur+"','"+info.profilepic+"')", function (err, result) {	

	if (!err){
		// logger.info('la syntaxte de la requete est juste');
		logger.info('Ajout d utilisateur réussi');
		// Requete Sql "imbriqué" afin de recuperer les info et à les placer sur la page profile
		res.redirect('/index');
		
		/*
		if(rows.lentgh>0){
			session.open = true;
			session.mail = rows[0].email
		}
		*/
		}else{
			logger.info('Ajout d utilisateur échoué , reessayer l inscription');
			res.redirect('/Inscription');
	}

});

// Deconnexion à la Bd
connection.end();
logger.info("Connexion Terminé");

}


/*
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
  });*/