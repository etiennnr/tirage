var NombreDeParticipant = 10;
var nbTypeEquipement = 0;
var RandomNumber = 0;
var TabNomParticipant = new Array(NombreDeParticipant);
var TabPrenomParticipant = new Array(NombreDeParticipant);
var TabChoix1Participant = new Array(NombreDeParticipant);
var TabChoix2Participant = new Array(NombreDeParticipant);
var TabChoix3Participant = new Array(NombreDeParticipant);
/*
function fillAllArray() {

}

//parse php 
//json
<p>	
$username = asdasd;
	<?php if($username == "mike"){?>
		<span>...</span>
	<?php }?>
</p>

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
		message += (TabNomParticipant[i]+"\n"+TabPrenomParticipant[i]+"\n"+TabChoix1Participant[i]+"\n"+TabChoix2Participant[i]+"\n"TabChoix3Participant[i]+"\n\n");
	}
	alert(message);
    }	
	
	
	
	
	
	var ExcelApp = new ActiveXObject("Excel.Application");
var ExcelSheet = new ActiveXObject("Excel.Sheet");
ExcelSheet.Application.Visible = true;
// Place some text in the first cell of the sheet.
ExcelSheet.ActiveSheet.Cells(1,1).Value = "This is column A, row 1";
// Save the sheet.
ExcelSheet.SaveAs("C:\\TEST.XLS");
// Close Excel with the Quit method on the Application object.
ExcelSheet.Application.Quit();












*/
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
var fileToRead = "test3000";
var monfichier= ""
var texte = "";
var Tabtexte = new Array();
var TabTexte2 = new Array();
var NombreTotalEquipement = nbEquipementTotal();
var TabNombrePig?? = new Array(NombreTotalEquipement);
var TabInfoGagnant = new Array(NombreTotalEquipement);
for (var i=0;i<TabNombrePig??.length-1;i++) {
	TabNombrePig??[i] = 0;
}
var nbchoix = 1 ;
var nom = null;
var quantite = 0;
var input1 = null;
var input2 = null;
var input3= null;

function pickAllWinner() {
	//var TabWinner = new Array(NombreTotalEquipement); 
	var y = -1;
	var	w = 0;
	while (NombreTotalEquipement > 0) {
	RandomNumber = randomizeNumber();
	//ligneduGagnant = ReadFile(number);
	//S??paration des champs s??par?? par des point-virgules
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
		TabNombrePig??[w] = number;
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
		TabNombrePig??[w] = number;
		}
	}
	}
	var message = "";
		for(var x=0;x<=TabInfoGagnant.length-1;x++) {
			message += TabInfoGagnant[x] + "" + TabNombrePig??[x] + "<BR>";
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
		for(var i=0;i<=TabNombrePig??.length-1;i++) {
			if(randomNumber === TabNombrePig??[i]) {
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
// Function pour HTML dynamique
function Choisir() {
//g??n??ration automatique des select box
//ajout du texte Choisir la colonne du choix " + nbchoix + "\t"
nom = document.createTextNode("Choisir la colonne du choix " + nbchoix + "\t");
document.getElementById("ID_Choix").appendChild(nom);

//c??ration d'un tableau local avec les valeurs du select box
var array = ["A","B","C","D","E","F","G"];

//cr??ation du select box
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

//incr??mentation de nbchoix et appel de creerboutonequip
nbchoix++;
creerboutonequip();
}

function creerboutonequip() {
//g??n??ration automatique des inputs
//ajout du texte nom
if (nbTypeEquipement == 0){
	var texte = document.getElementById("produits");
	texte.hidden = false;
	}

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

//ajout du texte Quantit??
quantite = document.createTextNode("Quantit??" + "\t");
document.getElementById("ID_infoEquipement").appendChild (quantite);

//ajout du 2e input avec ID dynamique nbequipementx
input2 = document.createElement("Input");
input2.setAttribute("type", "text");
input2.setAttribute("id", "nbequipement"+nbTypeEquipement);
document.getElementById("ID_infoEquipement").appendChild(input2);

//ajout d'un saut de ligne
input3 = document.createElement("p");
document.getElementById("ID_infoEquipement").appendChild(input3);

//incr??mentation pour les ID
nbTypeEquipement++;
}

function testparam(){
	var boutongagnant = document.getElementById("btnGagnant");
	var boutonVerifier = document.getElementById("btnVerifier");
	var verifierNbParticipant = document.getElementById("ID_nbparticipant");
	var Toutok = true;
	
	//check pour nombre de joueurs
	if (isNaN ( parseInt(verifierNbParticipant))){
		alert("Le nombre de participant entr??e est incorrecte");
		toutok = false;
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

 lien qui ma aid?? : https://www.tutorielsenfolie.com/tutoriels-92-Lire-et-ecrire-dans-un-fichier-en-JavaScript.html

IMPORTANT
*/

//Pour des test seulements
//Fonction pour remplir un fichier txt avec le nombre de participant d??fini au d??part
function fillFile() {
//Objet Active ScriptX permettant l'??criture et la lecture d'un fichier 
var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
fileSystem.CreateTextFile(fileToRead,true);
//param??tre 1 : nom du fichier a lire
//param??tre 2 : mode lecture(1) ou ??criture(2)
//param??tre 3 : cr??er le fichier sil n'existe pas 
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
monfichier.WriteLine("seka ; femme ; b??b?? :) ");
monfichier.WriteLine("gerard ; imac ; ??cran ");
monfichier.WriteLine("Etien* ; ??cran ; Imac ");
monfichier.WriteLine("Merci ; de croire en ce  ; projet ");
monfichier.Close();
}
*/