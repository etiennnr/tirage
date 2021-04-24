
<?php
/*
	Permet de téléverser le fichier sur le serveur, ainsi que de créer un fichier zip à la fin 
	Code écrit par Jeremi Cyr
	Date : 16-05-2016
*/
	//$_POST['filesToZip'] = '["upload-module.php","upload-module-front.php"]';
	//$_POST['archiveName'] = "_asdasdahart";
	if(isset($_FILES['fileToUpld'])){
		upld();
	}else{
		//echo ":(";
	}
	if(isset($_POST['filesToZip']) && isset($_POST['archiveName'])){
		//echo 1;
		//$_POST['filesToZip'] = "{\"test\":".$_POST['filesToZip']."}";
		zipFiles();
	}else{
		//echo ":(";
		//http_response_code(400);
	}
	// :D
	
	function upld(){
		


		//echo "".basename($_FILES['fileToUpld']['name']);
		
		$target_dir = "uploads/";
		$target_file = $target_dir . basename($_FILES['fileToUpld']['name']);
		$uploadOK = 1;
		$fileType = pathinfo($target_file, PATHINFO_EXTENSION);
		if($fileType == null){
			echo "erreur de serveur...";
		}
		if($fileType != "csv"){
			$uploadOK = 0;
		}
		
		//upload if !error
		if($uploadOK == 1){
			if(move_uploaded_file($_FILES["fileToUpld"]["tmp_name"], $target_file)){
				//echo "Fichier téléversé avec succès";
				
				echo basename($_FILES['fileToUpld']['name']);
				//call le js (ajaxget qui lui call parseCSV)
			}else{
				//echo "Échec, vous n'avez pas les droits pour cette opération";
			}
			
		}else{
			//echo "Vous n'avez pas le bon type de fichier";
		}
		
		unset($_POST["submit_upld"]);
		unset($_FILES['fileToUpld']);
	}
	
	function zipFiles(){
		//echo 2;
		unlink(dirname(__FILE__) . "/" . 'Gagnants.zip');
		$files = json_decode($_POST['filesToZip'],true);
		//$files = $files['test'];
		$zip = new ZipArchive();
		$res = $zip->open($_POST['archiveName'].'.zip', ZipArchive::CREATE);
		if ($res === TRUE) {
			for($i =0 ; $i < count($files); $i++){
				$zip->addFile($files[$i], $files[$i]);
				//echo $files[$i];
			}
			$zip->close();
		} else {
			echo 'failed';
		}
		unset($_POST['filesToZip']);
	}
?>