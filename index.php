<!DOCTYPE html> 
<!-----Tirage Aléatoire pour la Fondation du Collège Ahuntsic----->
<!-----Programme créer par Etienne Kemp-Rousseau et Patrick Parent----->
<!-----Date : 16-05-2016----->
<html>
 <head>
	<meta charset="UTF-8">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
	<script type="text/JavaScript" src="test.js"></script>
	<script src="writer-module-js.js"></script>
	  <!-----link css----->
     <Link rel="stylesheet" type="text/css" href="style.css">
    <!------link fonts----->
<link href='https://fonts.googleapis.com/css?family=Ubuntu:400,700' rel='stylesheet' type='text/css'>
    <!-----icone----->
    <link rel="icon" href="icone.ico" />
	
	<title>Tirage Équipement Fondation Collège Ahuntsic</title>
	
 </head>
	<body>
		<h1>Tirage</h1>
		
		<p><text>Si vous éprouvez de la difficulté avec le fonctionnement de ce programme, </text>
		<a href ="#" onclick="Aide()" >cliquez ici</a>
		
		<p> Choisir la ligne de votre premiere donnée (début liste)&nbsp;
		<select id="ID_DebutListe"   >
			<option selected="selected" value="0">Aucun</option>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
		</select>
		</p>
		
		<p> Entrez le nombre de participants au tirage &nbsp;
		<input id="ID_nbparticipant"/>
		
		<br>
		<?php
			include("writer-module.php");
			include("upload-module-front.php");
		?>
		
		<p><text id="produits" >Information sur les produits à vendre </text> <button onclick="creerboutonequip()">+</button></p>
		
		<div id="ID_infoEquipement"> </div>

		<input type="button" id="btnVerifier" value="Vérifier" onclick="testparam()" /></p></p>
		<input type="submit" form="upld-frm" id="btnGagnant" value="Sélectionner Les Gagnants" disabled /><br><br>
		<a id="fichier1" href="resultat/ListAllWinner.csv" hidden >Télécharger la liste de tous les gagnants</a><br><br>
		<a id="fichier2" href="resultat/ListAllWinnerCodeOnly.csv" hidden >Télécharger la liste de tous les gagnants (code employé/étudiant seulement) </a><br><br>
		<a id="fichier3" href="resultat/ListAllLoser.csv" hidden >Télécharger la liste de tous les perdants</a><br><br>
		<a id="fichier4" href="resultat/ListAllChoice.csv" hidden >Télécharger la liste de tous les gagnants par choix</a><br><br>
		<a id="fichier5" href="resultat/ListWinnerEtudiant.csv" hidden >Télécharger la liste de tous les étudiants gagnants</a><br><br>
		<a id="fichier6" href="resultat/ListWinnerEmploye.csv" hidden >Télécharger la liste de tous les employés gagnants</a><br><br>
		<a id="fichier7" href="/gagnants" target="_blank" hidden >Télécharger les factures pour chaques gagnants</a><br><br>
		<a id="fichier8" href="Blank.html" hidden >Télécharger une facture vierge</a><br><br>
		<a id="fichier9" href="Gagnants.zip" >Télécharger toutes les factures en ZIP</a><br><br>
	</body>
	<footer>
        <p><img src="LOGO_Fondation.png" alt="Logo de la Fondation" height="100px"/><img src="aaplus.png" alt="Logo d'Action Ahuntsic+" height="100px"/></p>
        <p>Programme réalisé par Patrick Parent et Étienne Kemp Rousseau pour La Fondation du Collège Ahuntsic, avec la participation de Jeremi Cyr et Viky Goupil.</p>
		<p> Projet terminé le 16-05-2016 </p>
    </footer>
</html>		