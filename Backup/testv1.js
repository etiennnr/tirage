var participationNbCount = 3000;
var nbTypeEquipement = 3;
var TabNbEquipement = new Array(nbTypeEquipement);
TabNbEquipement[0] = 10;
TabNbEquipement[1] = 10;
TabNbEquipement[2] = 15;
//TabNbEquipement[0] = computer
//TabNbEquipement[1] = screen
//TabNbEquipement[2] = keyboard
var fieldSearched = 0;
//var number = randomizeNumber();
var number = 1;
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
var fileToRead = "test3000.txt";
var monfichier= ""
var texte = "";
var Tabtexte = new Array();
var TabTexte2 = new Array();
var NombreTotalEquipement = nbEquipementTotal();
var TabNombrePigé = new Array(NombreTotalEquipement);
var TabInfoGagnant = new Array(NombreTotalEquipement);
for (var i=0;i<TabNombrePigé.length-1;i++) {
	TabNombrePigé[i] = 0;
}
var nbequipement = 0 ;
var nbchoix = 1 ;
var nom = null;
var quantite = null;
var input1 = null;
var input2 = null;
var input3= null;


function pickAllWinner() {
	//var TabWinner = new Array(NombreTotalEquipement); 
	var y = -1;
	var	w = 0;
	while (NombreTotalEquipement > 0) {
	number = randomizeNumber();
	//ligneduGagnant = ReadFile(number);
	//Séparation des champs séparé par des point-virgules
	TabTexte2 = Tabtexte[number].split(";");
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

//

function ReadFile() {
monfichier=fileSystem.OpenTextFile(fileToRead, 1 ,true);
texte = monfichier.ReadAll();
Tabtexte = texte.split("\n");
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

/*
function nbEquipement() {
for (i=0;i<=nbTypeEquipement-1;i++) {
TabNbEquipement[i] = 15;	
}
}
// a completer avec le fichier 
*/
function creerboutonequip() {
nom = document.createTextNode("Nom");
document.getElementById("ID_infoEquipement").appendChild(nom);

input1 = document.createElement("INPUT");
input1.setAttribute("type", "text");
input1.setAttribute("id", "equipement"+i);
document.getElementById("ID_infoEquipement").appendChild(input1);

quantite = document.createTextNode("Quantite");
document.getElementById("ID_infoEquipement").appendChild (quantite);
	
input2 = document.createElement("Input");
input2.setAttribute("type", "text");
input2.setAttribute("id", "nbequipement"+i);
document.getElementById("ID_infoEquipement").appendChild(input2);

input3 = document.createElement("p");
document.getElementById("ID_infoEquipement").appendChild(input3);
i++;
}
function Choisir() {
nom = document.createTextNode("Choisir la colonne du choix " + nbchoix + "\t");
document.getElementById("ID_Choix").appendChild(nom);

var array = ["A","B","C","D","E","F","G"];

input1 = document.createElement("select");
input1.setAttribute("id", "colonne"+nbchoix);
document.getElementById("ID_Choix").appendChild(input1);

for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.value = array[i];
    option.innerHTML = array[i];
    input1.appendChild(option);
}
	
input3 = document.createElement("p");
document.getElementById("ID_Choix").appendChild(input3);

nbchoix++;
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