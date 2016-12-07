<?php
session_start();
if(!isset($_SESSION['prenom'])) {  
    header("Location: main.php");  
} 


 ?>