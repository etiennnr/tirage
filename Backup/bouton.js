var i = 1 
var nom = null;
var quantite = null;
var input1 = null;
var input2 = null;
var input3= null;

function myFunction() {
nom = document.createTextNode("Nom");
document.getElementById("test").appendChild(nom);

input1 = document.createElement("INPUT");
input1.setAttribute("type", "text");
input1.setAttribute("id", "equipement"+i);
document.getElementById("test").appendChild(input1);

quantite = document.createTextNode("Quantite");
document.getElementById("test").appendChild (quantite);
	
input2 = document.createElement("Input");
input2.setAttribute("type", "text");
input2.setAttribute("id", "nbequipement"+i);
document.getElementById("test").appendChild(input2);

input3 = document.createElement("p");
document.getElementById("test").appendChild(input3);
i++;
}