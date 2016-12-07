    <?php   
    session_start();  
    session_destroy();  
	//redirige ver page main
	header("Location: main.php");
    ?>  