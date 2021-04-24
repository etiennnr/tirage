/*
	Programme de tirage aléatoire pour la fondation du Collège Ahuntsic
	Code écrit par Étienne Kemp-Rousseau et Patrick Parent
	Date : 16-05-2016
*/
var RandomNumberResult = 0;
var nbtypeEquipement = 0;
var NombreTotalEquipement = 0;
//valeur formulaire html
var LigneDeDebutDuTableau = "";
var NombreDeParticipant = 0;
//Déclaration de tous les tableaux utilisés
var TabNbEquipement = new Array(nbtypeEquipement);
var TabNomEquipement = new Array(nbtypeEquipement);
var TabCoutEquipement = new Array(nbtypeEquipement);
var TabPerdant = new Array(NombreTotalEquipement);
var TabGagnantChoix1 = new Array(NombreTotalEquipement);
var TabGagnantChoix2 = new Array(NombreTotalEquipement);
var TabGagnantChoix3 = new Array(NombreTotalEquipement);
var TabChoixRetenu = new Array(NombreTotalEquipement);
var TabNombrePige = new Array(NombreTotalEquipement);
var TabNombreGagnant = new Array(NombreTotalEquipement);
var TabEquipementRecu= new Array(NombreTotalEquipement);
var TabFilePath = new Array();
//variable pour la fonction pasrseToCSVArray
var processedData; 
var processedData2;
var headers;
var headers2;
//variable qui désigne si on veut la progression ou non 
var voir = false;

RemplirTableau(TabNombrePige, -1); //puisque notre chiffre random peut égaler 0 
RemplirTableau(TabNomEquipement, "");
RemplirTableau(TabNbEquipement, 0);
RemplirTableau(TabCoutEquipement, 0);
RemplirTableau(TabPerdant, 0);
RemplirTableau(TabGagnantChoix1, "");
//RemplirTableau(TabGagnantChoix2, "");
//RemplirTableau(TabGagnantChoix3, "");
RemplirTableau(TabChoixRetenu, "");
RemplirTableau(TabNombreGagnant, 0);
RemplirTableau(TabEquipementRecu, 0);

//effectue la requete d'upload sans reload
var fpath;
$(function(){
	$("#upld-frm").on("submit",function(event){		
		event.preventDefault();
		var file_data = $('#fileToUpld').prop('files')[0];   
		var form_data = new FormData();     
		form_data.append('fileToUpld', file_data);

		$.ajax({
			type:	'post',
			cache: false,
			contentType: false,
			processData: false,
			dataType:'text',
			url:	$("#upld-frm").attr('action'),
			data: 	form_data
			
		}).done(function(response){
			fpath = response;
			ajaxgetfile(fpath);
			
			
		}).fail(function(error){
			alert("error:"+error);
			
		});
	});
});

//Appel du code php pour le chemin dacces au fichier
function ajaxgetfile(filepath){
	var d;
	$.ajax({
		type:"get",
		url: "uploads/"+filepath, //Nom du fichier CSV 
		dataType:"text",
		success: function(data){
			parseCSVtoArray(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
			//alert("Status: " + textStatus); alert("Error: " + errorThrown); 
		}   
	});
	
}

//permet de créer un zip dun dossier ou de son contenu 
function zip(archiveName, pathsArray){
	var form_data = new FormData();     
	form_data.append('filesToZip', pathsArray);
	form_data.append('archiveName', archiveName);
	$.ajax({
		cache: false,
		type:	'post',
		dataType:'text',
		url:	"upload-module.php",
		data: {
			filesToZip: JSON.stringify(pathsArray),
			archiveName: archiveName
			
		},
		success: function(response){
			//alert(response);
			
		}
	});
}

//fct pour parse csv
function parseCSVtoArray(rawdata){
	var allTextLines = rawdata.split(/\r\n|\n/);
	processedData = []; //dictionnaire 1
	processedData2 = []; //dictionnaire 2
    headers = allTextLines[LigneDeDebutDuTableau-2].split(',');//<----values pour header row 1er parse (premiere ligne d'en-tete du fichier)
	headers2= allTextLines[LigneDeDebutDuTableau-3].split(',');//<----values pour header row 2ieme parse (deuxieme ligne d'en-tete du fichier)
    for (var i=LigneDeDebutDuTableau-1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');//<----values pour chaque ligne de données
        if (data.length == headers.length ) {
			var rowdic = {};
			var rowdic2 = {};
            for (var j=0; j<headers.length; j++) {
				rowdic[headers[j].toString()] = data[j];
            }
			processedData.push(rowdic);
            for (var j=0; j<data.length; j++) {	
				rowdic2[headers2[j].toString()] = data[j];
            }
			processedData2.push(rowdic2);
		}
    }
	PeseSulPiton();	
}

//Fonction pour remplir tous les index d'un tableau a 0
function RemplirTableau(tab, x) {
	for (var i=0;i<tab.length-1;i++) {
		tab[i] = x;
	}
}

//genere un nombre aleatoire entre 1 et nbParticipant, puis vérifie s'il existe 
function randomizeNumber() {
	var essai;
	var randomNumber = 0;
	do {
		essai = false;
		randomNumber = Math.floor((Math.random() * (NombreDeParticipant + 1)) +1);
		for(var i=0;i<=TabNombrePige.length-1;i++) {
			if(randomNumber-1 === TabNombrePige[i]) { //permet de ne pas pigé deux fois un numéro
				essai = true;
				i = TabNombrePige.length;
			} 
		}
	} 
	while (essai == true); 
	return randomNumber-1;
}

//recupère les valeurs entrées par l'utilisateur 
function ChercherElementHTML() {   
	var message = "";
	NombreDeParticipant = parseInt(document.getElementById("ID_nbparticipant").value-1);
	LigneDeDebutDuTableau = parseInt(document.getElementById("ID_DebutListe").value);
		//récupérer les valeurs entrées via les champs dynamiques
		for(var i=1;i<=nbtypeEquipement;i++) {
			TabNomEquipement[i-1] = document.getElementById("nomequipement"+i).value;
			TabNbEquipement[i-1] = document.getElementById("nbequipement"+i).value;
			TabCoutEquipement[i-1] = document.getElementById("cout"+i).value;
		}
}

//Active la fonction qui effectue le tirage des gagnants (pickAllWinner) puis lance la création des listes
function PeseSulPiton() {
	if (!TestNombreParametre()){ //vérifie que la quantité de paramètre entrée est valide
		alert("Le nombre de choix que vous avez entré ne correspond pas au choix présent dans le CSV. Veuillez rafraichir la page et recommencer.");
		document.getElementById("btnGagnant").disabled = true;
	}
	else {
		for(var i = 0;i<NombreDeParticipant;i++){
			processedData2[i]["\"Entrez votre prénom :\""] = accents(processedData2[i]["\"Entrez votre prénom :\""]);
			processedData2[i]["\"Entrez votre nom :\""] = accents(processedData2[i]["\"Entrez votre nom :\""]);
			processedData2[i]["\"Entrez votre adresse de courriel :\""] = accents(processedData2[i]["\"Entrez votre adresse de courriel :\""]);
		}
		for(var i = 0;i<=TabNomEquipement.length-1;i++){
			TabNomEquipement[i] = accents(TabNomEquipement[i]);
		}
		if(confirm("Voulez-vous voir la progression de CHAQUE participant facultatif?")){
			voir = true;
		}
		pickAllWinner();
		document.getElementById("btnGagnant").disabled = true;
		purgeFolder("gagnants/*"); //efface le contenu du dossier gagnants
		createListAllWinner();
		createListAllLoser();
		createListAllWinnerPerChoice();
		createFileEachWinner();
		zip("Gagnants", TabFilePath);
		for (var i = 1;i<=8;i++){ //affiche les boutons pour le téléchargement 
		document.getElementById("fichier"+i).hidden = false;
		}
	}
}

//fonction qui teste la quantité de choix par rapport au nombre de choix dans le csv
function TestNombreParametre() {
	var x = 0;
	for (var i = 0;i < NombreDeParticipant;i++){
		if(processedData[i]["\"Votre choix\""] > x){
			x = processedData[i]["\"Votre choix\""];
		}
		/*if(processedData[i]["\"2ième choix\""] > x){
			x = processedData[i]["\"2ième choix\""];
		}
		if(processedData[i]["\"3ième choix\""] > x){
			x = processedData[i]["\"3ième choix\""];
		}*/
	}
	if (x != nbtypeEquipement){
		return false;
	} 
	else {
		return true;
	}
}	

//Fonction PRINCIPALE qui verifie les conditions et les choix 
function pickAllWinner() {
		alert("Bienvenue au tirage");
	var NombreTotalParticipant = NombreDeParticipant + 1;
	var w=0;
	var x=0;
	var y=0;
	var c1=0;
	var c2=0;
	var c3=0;
	while (NombreTotalParticipant > 0 ) {
		RandomNumberResult = randomizeNumber();
		if (TabNbEquipement[processedData[RandomNumberResult]["\"Votre choix\""]-1]> 0) {
			TabNombrePige[w] = RandomNumberResult;
			TabGagnantChoix1[c1] = RandomNumberResult;
			TabChoixRetenu[y] = "premier choix";
			TabNombreGagnant[y] = RandomNumberResult;
			TabEquipementRecu[y] = processedData[RandomNumberResult]["\"Votre choix\""];
			if (voir){
				alert("Le participant ayant le numéro " +RandomNumberResult + " a eu sont premier choix.");
			}
			TabNbEquipement[processedData[RandomNumberResult]["\"Votre choix\""]-1]--;
			NombreTotalParticipant--;
			y++;
			c1++;
		}
		/*else if (TabNbEquipement[processedData[RandomNumberResult]["\"2ième choix\""]-1] > 0) {
			TabNombrePige[w] = RandomNumberResult;
			TabGagnantChoix2[c2] = RandomNumberResult;
			TabChoixRetenu[y] = "deuxieme choix";
			TabNombreGagnant[y] = RandomNumberResult;
			TabEquipementRecu[y] = processedData[RandomNumberResult]["\"2ième choix\""];
			if (voir){
				alert("Le participant ayant le numéro " +RandomNumberResult + " a eu sont deuxième choix.");
			}
			TabNbEquipement[processedData[RandomNumberResult]["\"2ième choix\""]-1]--;
			NombreTotalParticipant--;
			y++;
			c2++;
		}
		else if (TabNbEquipement[processedData[RandomNumberResult]["\"3ième choix\""]-1] > 0) {
			TabNombrePige[w] = RandomNumberResult;
			TabGagnantChoix3[c3] = RandomNumberResult;
			TabChoixRetenu[y] = "troisieme choix";
			TabNombreGagnant[y] = RandomNumberResult;
			TabEquipementRecu[y] = processedData[RandomNumberResult]["\"3ième choix\""];
			if (voir){
				alert("Le participant ayant le numéro " +RandomNumberResult + " a eu sont troisième choix.");
			}
			TabNbEquipement[processedData[RandomNumberResult]["\"3ième choix\""]-1]--;
			NombreTotalParticipant--;
			y++;
			c3++;
		}*/
		else {
			//ecrire dans tableau perdant
			TabNombrePige[w] = RandomNumberResult; //pour pas le nombre sortent deux fois 
			TabPerdant[x] = RandomNumberResult;
			if (voir){
				alert("Le participant ayant le numéro " +RandomNumberResult + " n'a eu aucun de ses choix.");
			}
			NombreTotalParticipant--;
			x++;	
			}
		w++;
	}
	alert("Tirage Terminé");
}

//fonction qui remplace tous les caractères accentués par leur equivalent non accentués
function accents(my_string){
	// tableau avec accents
    var pattern_accent = new Array("à","á","â","ã","ä","å","æ","ç","è","é","ê","ë","ì","í","î",
								   "ï","ð","ñ","ò","ó","ô","õ","ö","ø","ù","ú","û","ü","ý","ý","þ","ÿ");
    // tableau sans accents
    var pattern_replace_accent = new Array("a","a","a","a","a","a","a","c","e","e","e","e","i","i","i",
										   "i","d","n","o","o","o","o","o","o","u","u","u","u","y","y","b","y");
    //met toutes les lettres en minuscule
	my_string = my_string.toLowerCase();
        for(var i=0;i<pattern_accent.length;i++){
            // si on trouve un accent dans la chaine on le remplace par le caractere non accentué correspondant
            my_string = my_string.replace(pattern_accent[i],pattern_replace_accent[i]);
        }
    return my_string;
}

//Crée un fichier html pour chaque participant qui gagne un equipement 
function createFileEachWinner() {
	var nomDuFichier = "", texte = "", signForm = "", WinningChoice = "", signField = "", titre = "", dateAuj = new Date(),dd = dateAuj.getDate(), mm = dateAuj.getMonth()+1, yyyy = dateAuj.getFullYear(), tab1 = "", tab2 = "";
	//alert("create file each winner");
	signField = "J'atteste avoir recu l'équipement mentionné ci-haut. "+"<br><br>"+"Signature : _______________________________________________"; 
	tab1 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
	tab2 = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
	dateAuj = mm+'/'+dd+'/'+yyyy;
	for(var i=0;i<TabNombreGagnant.length;i++) {
		//mise a zero de chaque variable de texte 
		nomDuFichier = "";
		WinningChoice = "";
		signForm = "";
		titre = "";
		//Attribution du contenu de chaque variable 
		nomDuFichier = "gagnants/" + processedData2[TabNombreGagnant[i]]["\"Entrez votre prénom :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Entrez votre prénom :\""].length-1)+
			processedData2[TabNombreGagnant[i]]["\"Entrez votre nom :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Entrez votre nom :\""].length-1)+".html";
		titre = "<p><b>Fondation du Collège Ahuntsic</b><br>9155, rue Saint-Hubert, local T-1610"+tab1+"Date : "+dateAuj+"<br>Montréal, Québec  H2M-1Y8"+tab2+"Facture no : "+(i+1)+"<br>514-389-5921, poste 2954 ou 2958</p>";
		texte = "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />";
		texte += "<p><b>Vendu à : </b>"+"<br>";
		texte += "Prénom : "+processedData2[TabNombreGagnant[i]]["\"Entrez votre prénom :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Entrez votre prénom :\""].length-1)+"<br>";
		texte += "Nom: "+ processedData2[TabNombreGagnant[i]]["\"Entrez votre nom :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Entrez votre nom :\""].length-1)+"<br>";
		if(processedData2[TabNombreGagnant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""].length-1) != "") { 
			texte += "Numéro de DA : " + processedData2[TabNombreGagnant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""].length-1)+"<br>";
		} else {
			texte += "Numéro d'employés: " + processedData2[TabNombreGagnant[i]]["\"Pour les employés entrez votre numéro d'employé :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Pour les employés entrez votre numéro d'employé :\""].length-1)+"<br>";
		}
		texte += "Numéro de téléphone: " + processedData2[TabNombreGagnant[i]]["\"Entrez votre numéro de téléphone :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Entrez votre numéro de téléphone :\""].length-1)+"<br>";
		texte += "Poste téléphonique : " + processedData2[TabNombreGagnant[i]]["\"Entrez votre poste téléphonique (si applicable) :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Entrez votre poste téléphonique (si applicable) :\""].length-1)+"<br>";
		texte += "Courriel : " + processedData2[TabNombreGagnant[i]]["\"Entrez votre adresse de courriel :\""].substring(1,processedData2[TabNombreGagnant[i]]["\"Entrez votre adresse de courriel :\""].length-1) + "</p>";
		WinningChoice += "<p>Vous avez gagné : "+TabNomEquipement[TabEquipementRecu[i]-1]+"<br>";
		WinningChoice += "Vous devez acquitter des frais de "+TabCoutEquipement[TabEquipementRecu[i]-1]+" $."+"</p>";
		WinningChoice += "<p><b>Ceci est une vente finale</b>."+"<br>"+"Aucun support n'est fourni avec cet achat."+"<br>"+"Merci d'encourager la fondation du Collège Ahuntsic."+"</p>"
		signForm += "<p><br>Payé le : __________________"+ tab1 + "Numéro d'inventaire : ________________"+"<br><br>" + "Initiales du préposé : _________"+"</p>";
		texte += WinningChoice+signField+signForm;
		TabFilePath[i] = nomDuFichier;
	writeStringToFile_OverWrite(nomDuFichier, titre+texte);
	
	}
}

//Crée la liste de tous les gagnants selon qu'ils soient employés ou étudiants
function createListAllWinner() {
	var texteStat = "", texteEtudiant = "", texteEmp = ""; texteall = "";
	//alert("create list all winner");
	texteStat = "sep=;" + "\n";
	texteStat += "Numero du Gagnant"+";"+"Prenom"+";"+"Nom"+";"+"DA de L'etudiant"+";"+"Numero de L'employe"+";"+"Numero de Telephone"+";"+"Poste Telephonique"+";"+"Adresse Courriel"+";"+"Choix Retenu"+";"+"Nom de L'equipement"+";"+"Montant du"+"\n";
	texteEtudiant = "sep=;" + "\n";
	texteEtudiant += "Numero du Gagnant"+";"+"DA de L'etudiant"+";"+"Choix Retenu"+";"+ "Nom de L'equipement" + ";"+"Montant du" + "\n";
	texteEmp = "sep=;" + "\n";
	texteEmp += "Numero du Gagnant"+";"+"Numero de L'employe"+";"+"Choix Retenu"+";"+ "Nom de L'equipement" + ";"+ "Montant du" + "\n";
	texteall = "sep=;" + "\n";
	texteall += "Numero du Gagnant"+";"+"DA de L'etudiant"+";"+"Numero de L'employe"+";"+"Choix Retenu"+";"+ "Nom de L'equipement" + ";"+"Montant du" + "\n";
	for (var i=0;i<TabNombreGagnant.length;i++) {
		texteStat += TabNombreGagnant[i]+";";
		texteStat += processedData2[TabNombreGagnant[i]]["\"Entrez votre prénom :\""]+";";
		texteStat += processedData2[TabNombreGagnant[i]]["\"Entrez votre nom :\""]+";";
		texteStat += processedData2[TabNombreGagnant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""]+";";
		texteStat += processedData2[TabNombreGagnant[i]]["\"Pour les employés entrez votre numéro d'employé :\""]+";";
		texteStat += processedData2[TabNombreGagnant[i]]["\"Entrez votre numéro de téléphone :\""]+";";
		texteStat += processedData2[TabNombreGagnant[i]]["\"Entrez votre poste téléphonique (si applicable) :\""]+";";
		texteStat += processedData2[TabNombreGagnant[i]]["\"Entrez votre adresse de courriel :\""]+";";
		texteStat += TabChoixRetenu[i]+";";
		texteStat += TabNomEquipement[TabEquipementRecu[i]-1]+";";
		texteStat += TabCoutEquipement[TabEquipementRecu[i]-1]+"$"+"\n";
		
		texteall += TabNombreGagnant[i]+";";
		texteall += processedData2[TabNombreGagnant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""]+";";
		texteall += processedData2[TabNombreGagnant[i]]["\"Pour les employés entrez votre numéro d'employé :\""]+";";
		texteall += TabChoixRetenu[i]+";";
		texteall += TabNomEquipement[TabEquipementRecu[i]-1]+";";
		texteall += TabCoutEquipement[TabEquipementRecu[i]-1]+"\n"; 
		
	if(processedData2[TabNombreGagnant[i]]["\"Pour les employés entrez votre numéro d'employé :\""] == ""){
		texteEtudiant += TabNombreGagnant[i]+";";
		texteEtudiant += processedData2[TabNombreGagnant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""]+";";
		texteEtudiant += TabChoixRetenu[i]+";";
		texteEtudiant += TabNomEquipement[TabEquipementRecu[i]-1]+";";
		texteEtudiant += TabCoutEquipement[TabEquipementRecu[i]-1]+"\n";
	}
	else {
		texteEmp += TabNombreGagnant[i]+";";
		texteEmp += processedData2[TabNombreGagnant[i]]["\"Pour les employés entrez votre numéro d'employé :\""]+";";
		texteEmp += TabChoixRetenu[i]+";";
		texteEmp += TabNomEquipement[TabEquipementRecu[i]-1]+";";
		texteEmp += TabCoutEquipement[TabEquipementRecu[i]-1]+"\n";
		}
	}
	writeStringToFile_OverWrite("resultat/ListAllWinner.csv",texteStat);
	writeStringToFile_OverWrite("resultat/ListAllWinnerCodeOnly.csv",texteall);
	writeStringToFile_OverWrite("resultat/ListWinnerEtudiant.csv",texteEtudiant);
	writeStringToFile_OverWrite("resultat/ListWinnerEmploye.csv",texteEmp);
}

function createListAllLoser(){
	var texteloser = "";
	//alert("create list all Loser");
	texteloser = "sep=;" + "\n";
	texteloser += "Numero du Perdant"+";"+"Prenom"+";"+"Nom"+";"+"DA de L'etudiant"+";"+"Numero de L'employe"+";"+"Numero de Telephone"+";"+"Poste Telephonique"+";"+"Adresse Courriel"+"\n";
	for (var i=0;i<TabPerdant.length;i++) {	
		texteloser += TabPerdant[i]+";";
		texteloser += processedData2[TabPerdant[i]]["\"Entrez votre prénom :\""]+";";
		texteloser += processedData2[TabPerdant[i]]["\"Entrez votre nom :\""]+";";
		texteloser += processedData2[TabPerdant[i]]["\"Pour les étudiants entrez votre numéro de DA :\""]+";";
		texteloser += processedData2[TabPerdant[i]]["\"Pour les employés entrez votre numéro d'employé :\""]+";";
		texteloser += processedData2[TabPerdant[i]]["\"Entrez votre numéro de téléphone :\""]+";";
		texteloser += processedData2[TabPerdant[i]]["\"Entrez votre poste téléphonique (si applicable) :\""]+";";
		texteloser += processedData2[TabPerdant[i]]["\"Entrez votre adresse de courriel :\""]+";"+"\n";
	}
	writeStringToFile_OverWrite("resultat/ListAllLoser.csv",texteloser);
}

function createListAllWinnerPerChoice() {
	var	texteChoix = "sep=;" + "\n";
	//alert("create list All Winner Per Choice");
	texteChoix += "Numero du Gagnant;Nom du Gagnant;Prenom du Gagnant;Equipement Recu \n";
	texteChoix += "Les gagnants de leur premier choix sont : \n";
	for(var i=0;i<TabGagnantChoix1.length;i++) {
		texteChoix += TabGagnantChoix1[i] + ";";
		texteChoix += processedData2[TabGagnantChoix1[i]]["\"Entrez votre nom :\""]+";";
		texteChoix += processedData2[TabGagnantChoix1[i]]["\"Entrez votre prénom :\""]+";";
		texteChoix += TabNomEquipement[TabEquipementRecu[TabNombreGagnant.indexOf(TabGagnantChoix1[i])]-1]+"\n";
	}
	texteChoix += "Les gagnants de leur deuxieme choix sont : \n"; 
	for(var i=0;i<TabGagnantChoix2.length;i++) {
		texteChoix += TabGagnantChoix2[i] + ";";
		texteChoix += processedData2[TabGagnantChoix2[i]]["\"Entrez votre nom :\""]+";";
		texteChoix += processedData2[TabGagnantChoix2[i]]["\"Entrez votre prénom :\""]+";";
		texteChoix += TabNomEquipement[TabEquipementRecu[TabNombreGagnant.indexOf(TabGagnantChoix2[i])]-1]+"\n";
	}
	texteChoix += "Les gagnants de leur troisieme choix sont : \n"; 
	for(var i=0;i<TabGagnantChoix3.length;i++) {
		texteChoix += TabGagnantChoix3[i] + ";";
		texteChoix += processedData2[TabGagnantChoix3[i]]["\"Entrez votre nom :\""]+";";
		texteChoix += processedData2[TabGagnantChoix3[i]]["\"Entrez votre prénom :\""]+";";
		texteChoix += TabNomEquipement[TabEquipementRecu[TabNombreGagnant.indexOf(TabGagnantChoix3[i])]-1]+"\n";
	}
	writeStringToFile_OverWrite("resultat/ListAllChoice.csv",texteChoix);
}

//Creation des fields pour les equipements
function creerboutonequip() {
	//génération automatique des inputs
	//incrémentation pour les ID
	var input1 = null;
	var input2 = null;	
	var input3= null;
	var input4= null;
	var nom = null;
	var cout = null;
	var quantite = 0;
	nbtypeEquipement++;

	nom = document.createTextNode("Nom" + "\t");
	document.getElementById("ID_infoEquipement").appendChild(nom);

	//ajout du 1er input avec un ID dynamique equipements
	input1 = document.createElement("INPUT");
	input1.setAttribute("type", "text");
	input1.setAttribute("id", "nomequipement"+nbtypeEquipement);
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
	input2.setAttribute("id", "nbequipement"+nbtypeEquipement);
	document.getElementById("ID_infoEquipement").appendChild(input2);

	//ajout d'un tabulation
	tabulation = document.createTextNode("\t");
	document.getElementById("ID_infoEquipement").appendChild (tabulation);

	//ajout du texte cout
	cout = document.createTextNode("Coût" + "\t");
	document.getElementById("ID_infoEquipement").appendChild (cout);
	
	//ajout du 3e input avec ID dynamique cout
	input4 = document.createElement("Input");
	input4.setAttribute("type", "text");
	input4.setAttribute("id", "cout"+nbtypeEquipement);
	document.getElementById("ID_infoEquipement").appendChild(input4);

	//ajout d'un saut de ligne
	input3 = document.createElement("p");
	document.getElementById("ID_infoEquipement").appendChild(input3);
	}
//Fonction relier au bouton verifier permettant de valider l'integriter des donnes entrees
function testparam(){
	ChercherElementHTML();
	//initialisation des valeurs
	var boutongagnant = document.getElementById("btnGagnant");
	var boutonVerifier = document.getElementById("btnVerifier");
	var verifierNbParticipant = document.getElementById("ID_nbparticipant").value;
	var FichierExcel = document.getElementById("fileToUpld").value;
	var tabEquipement = new Array(nbtypeEquipement);
	var tabNbrEquipement = new Array(nbtypeEquipement);
	var VerifierLigneDebut = document.getElementById("ID_DebutListe").value;
	var toutok = true;

	// vérification si ligne de début vide
	if (VerifierLigneDebut == 0) {
		toutok = false;
		alert ("Vous devez choisir la ligne de la première donnée");
	}
	//vérification pour nombre de joueurs
	if (isNaN ( parseInt(verifierNbParticipant))){
		alert("Le nombre de participant entré est incorrect");
		toutok = false;
	}	
	//vérification pour un ficher excel
	if (FichierExcel === ""){
		alert("Vous n'avez pas entrer de fichier Excel");
		toutok = false;
	}
	//vérification si input box vide
	for (var i =1; i <= nbtypeEquipement ;i++){
		if (TabNomEquipement[i-1] === "" || !isNaN(parseInt(TabNomEquipement[i-1]))){
			toutok = false;
			alert("Veuillez entrer un nom pour chaque équipement");			
		}
		if(isNaN( parseInt(TabNbEquipement[i-1]))){
			toutok = false;
			alert("Veuillez entrer une quantité valide pour chaque équipement");
		}
		if(isNaN( parseInt(TabCoutEquipement[i-1]))){
			toutok = false;
			alert("Veuillez entrer un nombre valide pour chaque équipement");
		}
	}
	//changement de l'apparence des boutons s'il n'y a aucune erreur
	if (toutok == true){
		boutonVerifier.disabled = true;
		boutongagnant.disabled = false;
		alert("Vérification terminé sans erreur, vous pouvez maintenant appuyer sur Sélectionner les Gagnants");
	}
}
//Instructions
function Aide(){
	alert ("Voici l'utilitaire d'aide pour le programme de tirage automatique. \n\n" + 
	"Étape 1 : \t Entrez la ligne où les information débutent. Pour que le programme fonctionne, il faut impérativement avoir 2 lignes d'en-tête.\n\n" + 
	"Étape 2 : \t Entrez le nombre de participant au tirage. Pour le faire simplement, vous n'avez qu'a regarder le numéro de la dernière ligne du fichier excel et y soustraire le nombre de ligne de l'entête.\n\n" + 
	"Étape 3 : \t Entrez le fichier excel du tirage. \n\n" + 
	"Étape 4 : \t Cliquez sur le bouton \"+\" autant de fois que vous avez d'équipement (ex. si vous avez 3 équipements, appuyer 3 fois sur \"+\".) ATTENTION : il faut que l'ordre dans lequel vous entrez les équipement soit IDENTIQUE à celui du sondage. Exemple : si le premier équipement qui est dans le sondage est \"ordinateur\", alors la case \"nom\" de la première ligne devra être ordinateur. \n\n" + 
	"Étape 5 : \t Cliquez sur le bouton \"Vérifier\". S'il n'y a aucune erreur, le bouton \"Sélectionner Les Gagnants\" apparaitra et vous pourrez alors générer les gagnants. Si une erreur apparait, suivez les instructions de celle-ci.")
}			