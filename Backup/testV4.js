var NombreDeParticipant = 10;
var nbTypeEquipement = 0;
var RandomNumber = 0;
var TabNomParticipant = new Array(NombreDeParticipant);
var TabPrenomParticipant = new Array(NombreDeParticipant);
var TabChoix1Participant = new Array(NombreDeParticipant);
var TabChoix2Participant = new Array(NombreDeParticipant);
var TabChoix3Participant = new Array(NombreDeParticipant);
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
var fileToRead = "test3000.xls";
var fichier= ""
var contenuFichier = "";
var TabContenuFichier = new Array();
var TabContenuLigne = new Array();
var nbchoix = 0 ;
var nom = null;
var quantite = 0;
var input1 = null;
var input2 = null;
var input3= null;

function ChercherElementHTML() {        
		var objExcel = new ActiveXObject("Excel.Application"); 
        objExcel.Visible = false;
		var NomDuFichierExcel = document.getElementById("ID_File");
		var LigneDeDebutDuTableau = document.getElementById("");
		
		for(var i=0;i<=NombreDeParticipant;i++) {
        TabNomParticipant[i] = fichierOuvertExcel.Workbooks.Open(NomDuFichierExcel).ActiveSheet.Cells(1,i+LigneDeDebutDuTableau).Value;
        TabPrenomParticipant[i] = fichierOuvertExcel.Workbooks.Open(NomDuFichierExcel).ActiveSheet.Cells(2,i+LigneDeDebutDuTableau).Value;
		TabChoix1Participant[i] = fichierOuvertExcel.Workbooks.Open(NomDuFichierExcel).ActiveSheet.Cells(3,i+LigneDeDebutDuTableau).Value;
		TabChoix2Participant[i] = fichierOuvertExcel.Workbooks.Open(NomDuFichierExcel).ActiveSheet.Cells(4,i+LigneDeDebutDuTableau).Value;
		TabChoix3Participant[i] = fichierOuvertExcel.Workbooks.Open(NomDuFichierExcel).ActiveSheet.Cells(5,i+LigneDeDebutDuTableau).Value;
		}
		Excel.Quit();
		
		var TabNbEquipement = new Array(nbTypeEquipement);
		for(var i=0;i<=TabNbEquipement.length-1;i++) {
			TabNbEquipement[i] = document.getElementById ("equipement"+i+1);
		}
}

function Afficher() {
	var message = "";
	for(var i=0;i<=NombreDeParticipant;i++) {
		message += TabNomParticipant[i]+"\n"+TabPrenomParticipant[i]+"\n"+TabChoix1Participant[i]+"\n"+TabChoix2Participant[i]+"\n" + TabChoix3Participant[i]+"\n\n";
	}
	alert(message);
    }	

var NombreTotalEquipement = nbEquipementTotal();
var TabNombrePigé = new Array(NombreTotalEquipement);
var TabInfoGagnant = new Array(NombreTotalEquipement);
for (var i=0;i<TabNombrePigé.length-1;i++) {
	TabNombrePigé[i] = 0;
}



function pickAllWinner() {
	var y = -1;
	var	w = 0;
	while (NombreTotalEquipement > 0) {
	RandomNumber = randomizeNumber();
	//Séparation des champs séparé par des point-virgules
	TabContenuFichier = TabContenuLigne[RandomNumber].split(";");
		switch (TabTexte2[2]) {
			case "ordinateur" : y = 0;
			break;
			case "screen" : y = 1;
			break;
			case "keyboard" : y = 2;
			break;
		}
	if (TabNbEquipement[y] > 0) {
		TabInfoGagnant[w] = TabTexte2[1];
		TabNombrePigé[w] = number;
	} else {
		switch (TabTexte2[3]) {
			case "ordinateur" : y = 0;
			break;
			case "screen" : y = 1;
			break;
			case "keyboard" : y = 2;
			break;
		}
		if (TabNbEquipement[y] > 0) {
		TabInfoGagnant[w] = TabTexte2[1];
		TabNombrePigé[w] = number;
		}
	}
	}
	var message = "";
		for(var x=0;x<=TabInfoGagnant.length-1;x++) {
			message += TabInfoGagnant[x] + "" + TabNombrePigé[x] + "<BR>";
		}
		document.write (message);
		w++;
}

function nbEquipementTotal() {
	var somme = 0;
	for (var i=0;i<=nbTypeEquipement-1;i++) {
		somme += parseInt(TabNbEquipement[i]);	
	}
	return somme;
}


function ReadFile() {
fichier=fileSystem.OpenTextFile(fileToRead, 1 ,true);
contenuFichier = monfichier.ReadAll();
TabContenuFichier = texte.split("\n");
//return Tabtexte;

//message = Tabtexte[nombreAleatoire];
//message += TabTexte2.length + "<BR>" + TabTexte2[fieldSearched];
//document.write(message);
}

function randomizeNumber() {
	var essai = false;
	do {
		var randomNumber = Math.floor((Math.random() * participationNbCount) + 1);
		for(var i=0;i<=TabNombrePigé.length-1;i++) {
			if(randomNumber === TabNombrePigé[i]) {
				alert ("allo");
				essai = true;
				break;
			} 
		}
	//if (essai = false) {
	//
	//}
	} 
	while (essai === true); 
	return randomNumber;
}

function Choisir() {
//génération automatique des select box
// incrémentation de nbchoix
nbchoix++;
//ajout du texte Choisir la colonne du choix " + nbchoix + "\t"
nom = document.createTextNode("Choisir la colonne du choix " + nbchoix + "\t");
document.getElementById("ID_Choix").appendChild(nom);

//cération d'un tableau local avec les valeurs du select box
var array = ["A","B","C","D","E","F","G"];

//création du select box
input1 = document.createElement("select");
input1.setAttribute("id", "colonne"+nbchoix);
document.getElementById("ID_Choix").appendChild(input1);

//boucle pour mettre toute les valeurs dans les opton du select
for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.value = array[i];
    option.innerHTML = array[i];
    input1.appendChild(option);
}

//ajout d'un saut de ligne	
input3 = document.createElement("p");
document.getElementById("ID_Choix").appendChild(input3);

// appel de creerboutonequip
creerboutonequip();
}

function creerboutonequip() {
//génération automatique des inputs
//ajout du texte nom
	if (nbTypeEquipement == 0){
		var texte = document.getElementById("produits");
		texte.hidden = false;
	}

	//incrémentation pour les ID
	nbTypeEquipement++;	

	nom = document.createTextNode("Nom" + "\t");
	document.getElementById("ID_infoEquipement").appendChild(nom);

	//ajout du 1er input avec un ID dynamique equipementx
	input1 = document.createElement("INPUT");
	input1.setAttribute("type", "text");
	input1.setAttribute("id", "equipement"+nbTypeEquipement);
	document.getElementById("ID_infoEquipement").appendChild(input1);

	//ajout d'un tabulation
	var tabulation = document.createTextNode("\t");
	document.getElementById("ID_infoEquipement").appendChild (tabulation);

	//ajout du texte Quantité
	quantite = document.createTextNode("Quantité" + "\t");
	document.getElementById("ID_infoEquipement").appendChild (quantite);

	//ajout du 2e input avec ID dynamique nbequipement
	input2 = document.createElement("Input");
	input2.setAttribute("type", "text");
	input2.setAttribute("id", "nbequipement"+nbTypeEquipement);
	document.getElementById("ID_infoEquipement").appendChild(input2);

	//ajout d'un saut de ligne
	input3 = document.createElement("p");
	document.getElementById("ID_infoEquipement").appendChild(input3);
	}

function testparam(){
	//initialisation des valeurs
	var boutongagnant = document.getElementById("btnGagnant");
	var boutonVerifier = document.getElementById("btnVerifier");
	var verifierNbParticipant = document.getElementById("ID_nbparticipant").value;
	var FichierExcel = document.getElementById("ID_File").value;
	var toutok = true;
	var VerifierLigneDebut = document.getElementById("ID_DebutListe").value;
	var tabColonne = new Array(nbchoix);
	var tabEquipement = new Array(nbTypeEquipement);
	var tabNbrEquipement = new Array(nbTypeEquipement);
	var tabSelectFixe = new Array(3);
	
	//attribution des select box dynamique dans un tableau
	for (var i = 1;i <= nbchoix;i++){
		tabColonne[i-1] = document.getElementById("colonne" + i).value;
	}
	
	//attribution pour select box statique
	for (var i = 1;i <= 3;i++){
		tabSelectFixe [i-1] = document.getElementById("ID_ID" + i).value;
	}
	
	//attribution des input box dynamique dans un tableau
	for (var i = 1;i <= nbTypeEquipement;i++){
		tabEquipement[i-1] = document.getElementById("equipement" + i).value;
		tabNbrEquipement[i-1] = document.getElementById("nbequipement" + i).value;
	}
	
	
	
	// algorithme pour vérification de doublon des select box dynamique
	for (var i = 0;i<= nbchoix-1;i++){
		for (var j = i+1;j<=nbchoix-1;j++){
			if(tabColonne[i] == tabColonne[j]){
				toutok = false;
				alert ("Vous ne pouvez pas avoir 2 choix sur la même colonne");
				break;
			}	
		}
	}
	
	// test pour doublon pour select box statique
	for (var i = 0;i<= 2;i++){
		for (var j = i+1;j<=2;j++){
			if(tabSelectFixe[i] == tabSelectFixe[j]){
				toutok = false;
				alert ("Vous ne pouvez pas avoir 2 identifiant sur la même colonne");
				break;
			}	
		}
	}
	
	//vérification si select box statique vide
	if((VerifierPremiereColonne == 0 && VerifierDeuxiemeColonne == 0) || (VerifierDeuxiemeColonne == 0 && VerifierTroisiemeColonne == 0) || (VerifierPremiereColonne == 0 && VerifierTroisiemeColonne == 0)){
		toutok = false;
		alert ("Vous devez selectionner au moins deux colonnes d'identification");
		}
	

	// vérification si ligne de début vide
	if (VerifierLigneDebut == 0) {
		toutok = false;
		alert ("Vous devez choisir la ligne que la première donnée");
	}
	
	//vérification pour nombre de joueurs
	if (isNaN ( parseInt(verifierNbParticipant))){
		alert("Le nombre de participant entrée est incorrecte");
		toutok = false;
	}
	
	//vérification pour un ficher excel
	if (FichierExcel === ""){
		alert("Vous n'avez pas entrer de fichier Excel");
		toutok = false;
	}
	
	
	
	//vérification si input box vide
	for (var i = 0; i <= nbTypeEquipement -1 ;i++){
		if (tabEquipement[i] === ""){
			toutok = false;
			alert("Veuillez entrer un nom pour chaque équipement");			
		}

		if(isNaN( parseInt(tabNbrEquipement[i]))){
			toutok = false;
			alert("Veuillez entrer une quantité valide pour chaque équipement");
			
		}
		
	}
	
	
	if (toutok == true){
	boutonVerifier.disabled = true;
	boutongagnant.disabled = false;
	}
	
}
function validerEquipement() {
	var gagnant = true;
		if(TabNbEquipement[0] > 0) {
			gagnant = true;
		} else {
			gagnant = false; 
		}
	return gagnant;
}
/*
IMPORTANT

 lien qui ma aidé : https://www.tutorielsenfolie.com/tutoriels-92-Lire-et-ecrire-dans-un-fichier-en-JavaScript.html

IMPORTANT
*/

//Pour des test seulements
//Fonction pour remplir un fichier txt avec le nombre de participant défini au départ
function fillFile() {
//Objet Active ScriptX permettant l'écriture et la lecture d'un fichier 
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
fileSystem.CreateTextFile(fileToRead,true);
//paramètre 1 : nom du fichier a lire
//paramètre 2 : mode lecture(1) ou écriture(2)
//paramètre 3 : créer le fichier sil n'existe pas 
var monfichier=fileSystem.OpenTextFile(fileToRead, 2 ,true);
var fillingNumber = 1;
//Boucle pour remplir le fichier
for (var i=0;i<=1578;i++) {
monfichier.WriteLine( fillingNumber + ";Patrick;choix 1;choix 2");
fillingNumber ++ ;
}	
}

/*
function createFinalFile() {
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
fileSystem.CreateTextFile("test\allo1.txt",true);
var monfichier=fileSystem.OpenTextFile("test\allo1.txt", 2 ,true);
monfichier.WriteLine("nom ou code Etu/emp; choix 1 ; choix 2");
monfichier.WriteLine("seka ; femme ; bébé :) ");
monfichier.WriteLine("gerard ; imac ; Écran ");
monfichier.WriteLine("Etien* ; Écran ; Imac ");
monfichier.WriteLine("Merci ; de croire en ce  ; projet ");
monfichier.Close();
}
*/