<?php
/*
	Lien entre html, js puis php
	Code écrit par Jeremi Cyr
	Date : 16-05-2016
*/
	$uploadedfileparam;
	
?>

<!-- ajouter le link vers le css avavnt le form, de preference 
	 dans ce fichier pr garder une bonne cohesion/modularite 	-->
<form id="upld-frm"  action="upload-module.php" method="post" enctype="multipart/form-data">
	Joindre le fichier excel:
	<input type="file" name="fileToUpld" id="fileToUpld" accept=".csv">
	<!--<button type="submit" value="submit_upld" name="submit_upld">Téléverser le fichier</button>-->

</form>