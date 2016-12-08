<?php
session_start();
if(!isset($_SESSION['prenom'])) {  
    header("Location: main.php");  
} 
//l'utilisateur a posté le formulaire à la page req_paint.php

	$picture = stripslashes($_POST["picture"]);
	$drawingCommands = $_POST["drawingCommands"];
$email = $_SESSION["email"];
$mot = $_POST["mot"];

// Connect to server and select database.  
$dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test');

 ?>