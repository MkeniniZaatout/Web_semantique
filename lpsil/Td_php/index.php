<!DOCTYPE html>
<html>
<head>
    <meta charset=utf-8 />
    <title>Pictionnary - Inscription</title>
    <link rel="stylesheet" media="screen" href="css/styles.css" >
</head>
<body>

<h2>Inscrivez-vous</h2>
<form class="inscription" action="req_inscription.php" method="post" name="inscription">
    <!-- c'est quoi les attributs action et method ? -->
    <!-- qu'y a-t-il d'autre comme possiblité que post pour l'attribut method ? -->
    
    <ul>
    <script>
           function validateMdp2(){
                    var mdp1 = document.getElementById('mdp1');
                    var mdp2 = document.getElementById('mdp2');
                    if (mdp1.value == mdp2.value) {
                        // ici on supprime le message d'erreur personnalisé, et du coup mdp2 devient valide.
                        document.getElementById('mdp2').setCustomValidity('');
                    } else {
                        // ici on ajoute un message d'erreur personnalisé, et du coup mdp2 devient invalide.
                        document.getElementById('mdp2').setCustomValidity('Les mots de passes doivent être égaux.');
                    }
                }
    </script>
		<span class="required_notification">Les champs obligatoires sont indiqués par *</span>
		<li>
        
            <label for="email">E-mail :*</label>
            <input type="email" required="required" name="email" id="email"/>
            <span class="form_hint">Format attendu "name@something.com"</span><br>
            <label for="mdp1">Passwords :*</label>
            <input type="password" name="password" id="mdp1" pattern= "\w{6,9}[0-9]" placeholder="Entrez un mot de passe" required placeholder="Mot de passe" onkeyup="validateMdp2()" title = "Le mot de passe doit contenir de 6 à 8 caractères alphanumériques."><br>
            <!-- quels sont les deux scénarios où l'attribut title sera affiché ? Si le mdp saisit fait moin de 6 caract , si le mdp fait + de 8 caract-->
            <!-- encore une fois, quelle est la différence entre name et id pour un input ? Il peut y avoir plusieurs input possédant le même attribut name , id quand à lui permet d'identifier l'input de manière unique afin de le personalisé avec css et javascript-->
            <span class="form_hint">De 6 à 8 caractères alphanumériques.</span>
        
        
            <label for="mdp2">Confirm passwords :*</label>
            <input type="password" required="required" id ="mdp2" name="mdpZ" placeholder="Confirmez le mot de passe" onkeyup="validateMdp2()"/><br>
            <!-- pourquoi est-ce qu'on a pas mis un attribut name ici ?  -->
            <!-- quel scénario justifie qu'on ait ajouté l'écouter validateMdp2() à l'évènement onkeyup de l'input mdp1 ? les deux mdp sont lié , si l'un est modifié l'autre doit l'etre a -->
            <!-- quelle est la différence entre les attributs name et id ?  attri id permet de ciblé l'ancre (avec le css ou le javascript notamment le jquery ) et attri name est utilisé pour le php pour la validation d'un formulaire (notamment avec POST)-->
            <!-- c'est lequel qui doit être égal à l'attribut for du label ? l'attribut id -->
            <span class="form_hint">Les mots de passes doivent être égaux.</span>
			</li>    

            <ul>
                <li>
            <label for="prenom">Nom :</label>
            <input type="text" required name="nom" id="nom"/><br>
              </li>
              <li>
            <label for="prenom">Prénom :*</label>
            <input type="text" required="required" name="prenom" id="prenom"/><br></li>
            <li><label for="telephone">Tel :</label>
            <input type="tel" required name="telephone" id="telephone"/><br>
          </li>
            <li><label for="web">site web :</label>
            <input type="url"  name="web" id="web"/><br>
</li>
<li>
            <label for ="gender">Selectionner votre sexe:*</label>
            <input type="radio" required="required" id="gender" name="gender" value="male"> Male
            <input type="radio" required="required" name="gender" value="female"> Female<br>

            <br><label for="date">Date de naissance :*</label>
           <input type="date" name="birthdate" id="birthdate" placeholder="JJ/MM/AAAA" onchange="Age()" />
            <script>
               Age = function(e){
                  try{
				   // j'affiche dans la console quelques objets javascript, ce qui devrait vous aider.  
                   console.log(Date.now());
                        console.log(document.getElementById("birthdate"));
                        console.log(document.getElementById("birthdate").valueAsDate);+
                        console.log(Date.parse(document.getElementById("birthdate").valueAsDate));
                        console.log(new Date(0).getFullYear());
                        console.log(new Date(document.getElementById("birthdate").valueAsDate).getFullYear());
                        var age = new Date(Date.now()).getFullYear() - new Date(document.getElementById("birthdate").valueAsDate).getFullYear();
                        document.getElementById("age").value =age;
                    } catch(e) {
                        document.getElementById("age").value = "";
                    }
                }
            </script>
			<span class="required_notification">Saisir la date de naissance : "JJ/MM/AAAA"</span>
            <br><label for="age">Age :*</label>
            <input type="number" required="required" name="age" id="age" disabled/><br>
            <br><label for="ville">Ville :</label>
            <input type="text" required name="ville" id="ville"/><br>
            <br><label for="taille">Taille :</label>
            <input type="range" value="0" max="2.5" min="0" step="0.01" required name="taille" id="taille"/><br>
            <br><label for="textcolor">Couleur préférée :</label>
            <input type="color" value="#000000" name="textcolor" id="textcolor"/><br>
			

            <br><label for="profilepicfile">Photo de profil:</label>
            <input type="file" id="profilepicfile" onchange="loadProfilePic(this)"/>
            <!-- l'input profilepic va contenir le chemin vers l'image sur l'ordinateur du client -->
            <!-- on ne veut pas envoyer cette info avec le formulaire, donc il n'y a pas d'attribut name -->
			
            <span class="form_hint">Choisissez une image.</span>
            <input type="hidden" name="profilepic" id="profilepic"/>
            <!-- l'input profilepic va contenir l'image redimensionnée sous forme d'une data url -->
            <!-- c'est cet input qui sera envoyé avec le formulaire, sous le nom profilepic -->
            <canvas id="preview" width="0" height="0"></canvas>
            <!-- le canvas (nouveauté html5), c'est ici qu'on affichera une visualisation de l'image. -->
            <!-- ajouter à input l'attribut qui dit que c'est un champs obligatoire -->
            <!-- ajouter à input l'attribut qui donne une indication grisée (placeholder) -->

            <script>
            loadProfilePic = function (e){
            // on récupère le canvas où on affichera l'image
            var canvas = document.getElementById("preview");
            var ctx = canvas.getContext("2d");
            // on réinitialise le canvas: on l'efface, et déclare sa largeur et hauteur à 0
            // ctx.setFillColor("white");
            ctx.fillRect(0,0,canvas.width,canvas.height);
            canvas.width=0;
            canvas.height=0;
            // on récupérer le fichier: le premier (et seul dans ce cas là) de la liste
            var file = document.getElementById("profilepicfile").files[0];
            // l'élément img va servir à stocker l'image temporairement
            var img = document.createElement("img");
            // l'objet de type FileReader nous permet de lire les données du fichier.
            var reader = new FileReader();
            loadProfilePic = function (e) {  
                    // on récupère le canvas où on affichera l'image  
                    var canvas = document.getElementById("preview");  
                    var ctx = canvas.getContext("2d");  
                    // on réinitialise le canvas: on l'efface, et déclare sa largeur et hauteur à 0  
                    //ctx.fillStyle="white";  
                    ctx.fillRect(0,0,canvas.width,canvas.height);  
                    canvas.width=0;  
                    canvas.height=0;  
                    // on récupérer le fichier: le premier (et seul dans ce cas là) de la liste  
                    var file = document.getElementById("profilepicfile").files[0];  
                    // l'élément img va servir à stocker l'image temporairement  
                    var img = document.createElement("img");  
                    // l'objet de type FileReader nous permet de lire les données du fichier.  
                    var reader = new FileReader();  
                    // on prépare la fonction callback qui sera appelée lorsque l'image sera chargée  
                    reader.onload = function(e) {  
                        //on vérifie qu'on a bien téléchargé une image, grâce au mime type  
                        if (!file.type.match(/image.*/)) {  
                            // le fichier choisi n'est pas une image: le champs profilepicfile est invalide, et on supprime sa valeur  
                            document.getElementById("profilepicfile").setCustomValidity("Il faut télécharger une image.");  
                            document.getElementById("profilepicfile").value = "";  
                        }  
                        else {  
                            // le callback sera appelé par la méthode getAsDataURL, donc le paramètre de callback e est une url qui contient   
                            // les données de l'image. On modifie donc la source de l'image pour qu'elle soit égale à cette url  
                            // on aurait fait différemment si on appelait une autre méthode que getAsDataURL.  
                            img.src = e.target.result;  
                            // le champs profilepicfile est valide  
                            document.getElementById("profilepicfile").setCustomValidity("");  
                            var MAX_WIDTH = 96;  
                            var MAX_HEIGHT = 96;  
                            var width = img.width;  
                            var height = img.height;  
  
                            // A FAIRE: si on garde les deux lignes suivantes, on rétrécit l'image mais elle sera déformée  
                            // Vous devez supprimer ces lignes, et modifier width et height pour:  
                            //    - garder les proportions,   
                            //    - et que le maximum de width et height soit égal à 96  
                            if(width > height)
							{
								height = (height*MAX_HEIGHT)/width;
								width = MAX_WIDTH;
							}
                            else if(height > width)
							{
								width = (width*MAX_WIDTH)/height;
								height = MAX_HEIGHT;
							}
							else
							{
								height = MAX_HEIGHT;
								width = MAX_WIDTH;
							}
                            canvas.width = width;  
                            canvas.height = height;  
                            // on dessine l'image dans le canvas à la position 0,0 (en haut à gauche)  
                            // et avec une largeur de width et une hauteur de height  
                            ctx.drawImage(img, 0, 0, width, height);  
                            // on exporte le contenu du canvas (l'image redimensionnée) sous la forme d'une data url  
                            var dataurl = canvas.toDataURL("image/png");  
                            // on donne finalement cette dataurl comme valeur au champs profilepic  
                            document.getElementById("profilepic").value = dataurl;  
                        };  
                    }  
                    // on charge l'image pour de vrai, lorsque ce sera terminé le callback loadProfilePic sera appelé.  
                    reader.readAsDataURL(file);  
                }  
			}
            </script>
        </li>
		<li>
            <input type="submit" value="Soumettre Formulaire">
        </li>
    </ul>
</form>
</body>
</html>
