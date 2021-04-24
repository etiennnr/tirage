/*
	Module avec toutes les fonctions d'écriture de fichiers 
	Code écrit par Jeremi Cyr
	Date : 16-05-2016
*/
function writeStringToFile(filename, wtext){
	$.ajax({
		type: "POST",
		url: 'writer-module.php',
		dataType: 'json',
		data: {functionname: 'wstring', args: [filename, wtext]},

		success: function (obj, statustext) {
			//si jamais tu vx faire de quoi quand ca reussit
				

		}
	});
	
}

function writeLineToFile(filename, wline){
	$.ajax({
		type: "POST",
		url: 'writer-module.php',
		dataType: 'json',
		data: {functionname: 'wline', args: [filename, wline]},

		success: function (obj, statustext) {
			//si jamais tu vx faire de quoi quand ca reussit
		}
	});
	
}

function writeStringToFile_OverWrite(filename, wtext){
	$.ajax({
		type: "POST",
		url: 'writer-module.php',
		dataType: 'json',
		data: {functionname: 'wstring_ow', args: [filename, wtext]},

		success: function (obj, statustext) {
			//si jamais tu vx faire de quoi quand ca reussit
				

		}
	});
	
}

function writeLineToFile_OverWrite(filename, wline){
	$.ajax({
		type: "POST",
		url: 'writer-module.php',
		dataType: 'json',
		data: {functionname: 'wline_ow', args: [filename, wline]},

		success: function (obj, statustext) {
			//si jamais tu vx faire de quoi quand ca reussit
		}
	});
	
}

function purgeFolder(folderpath){
	$.ajax({
		type: "POST",
		url: 'writer-module.php',
		dataType: 'json',
		data: {functionname: 'purgeFolder', args: [folderpath]},

		success: function (obj, statustext) {
			//si jamais tu vx faire de quoi quand ca reussit
		}
	});
	
}