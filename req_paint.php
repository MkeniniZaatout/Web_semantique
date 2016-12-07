<?php
session_start();
if(!isset($_SESSION['prenom'])) {  
    header("Location: main.php");  
} 

// Connect to server and select database.  
$dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test');

 ?>