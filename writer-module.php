<?php
/*
	Définit tous les modules d'écriture de fichier sur le serveur, puis celui qui gère la suppression du contenu des dossiers avant la création des fichiers
	Code écrit par Jeremi Cyr
	Date : 16-05-2016
*/
	$currentopenFile;
	
	if(isset($_POST["functionname"]) && isset($_POST["args"])){
		$args = $_POST["args"];
		$args[1] = stripslashes($args[1]);
		$cnt = count($args);
		switch($_POST['functionname']){
			case "wstring":
				if($cnt != 2){
					echo echoerror("not enough arguments given. ".$cnt."found, 2 required.");
				}else{
					writeStringToF($args[0],$args[1]);
				}
				break;
			case "wline":
				if($cnt != 2){
					echo echoerror("not enough arguments given. ".$cnt."found, 2 required.");
				}else{
					writeLineToF($args[0],$args[1]);
				}
				break;
			case "wstring_ow":
				if($cnt != 2){
					echo echoerror("not enough arguments given. ".$cnt."found, 2 required.");
				}else{
					writeStringToF_ow($args[0],$args[1]);
				}
				break;
			case "wline_ow":
				if($cnt != 2){
					echo echoerror("not enough arguments given. ".$cnt."found, 2 required.");
				}else{
					writeLineToF_ow($args[0],$args[1]);
				}
				break;
			case "purgeFolder":
				purgeFolder($args[0]);
			default:
				echo echoerror("unknown function called. ");
			
		}
		
	}
	
	
	function writeStringToF($fileN, $text){
		if(! end(explode(".",$fileN)) == "html" && !end(explode(".",$fileN)) == "csv" ){
			$fileN = $fileN . ".csv";
			echoerror("wrong file type, changing to .csv (default)");
		}
		file_put_contents ( $fileN ,$text, FILE_APPEND);
		
	}
	function writeLineToF($fileN, $text){
		if(! end(explode(".",$fileN)) == "html" && !end(explode(".",$fileN)) == "csv" ){
			$fileN = $fileN . ".csv";
			echoerror("wrong file type, changing to .csv (default)");
		}
		file_put_contents ( $fileN ,$text."\n", FILE_APPEND);
	}
	
	function writeStringToF_ow($fileN, $text){
		if(! end(explode(".",$fileN)) == "html" && !end(explode(".",$fileN)) == "csv" ){
			$fileN = $fileN . ".csv";
			echoerror("wrong file type, changing to .csv (default)");
		}
		file_put_contents ( $fileN ,$text);
	}
	function writeLineToF_ow($fileN, $text){
		if(! end(explode(".",$fileN)) == "html" && !end(explode(".",$fileN)) == "csv" ){
			$fileN = $fileN . ".csv";
			echoerror("wrong file type, changing to .csv (default)");
		}
		file_put_contents ( $fileN ,$text."\n");
	}
	
	
	
	function echoerror($errormessage){
		echo "<p style='color:red'>".$errormessage."(writer.php)</p>";
		
	}
	
	
	function purgeFolder($folderpath){
		$files = glob($folderpath);
		foreach($files as $file){
			if(is_file($file)){
				unlink($file);
			}
		}
		
	}
?>