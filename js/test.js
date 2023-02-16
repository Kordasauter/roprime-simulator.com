
function test(id)
{
	// var id = "carga";
	var element = document.getElementById( id );
	var state = element.style.display;
	var element2 = document.getElementById( id + "_img" );
	var state2 = element2.style.display;
	
	
	if(id == "weapon")
	{
		// console.log("head : " +document.getElementById("head").style.display);
		
		if(document.getElementById("head").style.display != "none")
		{
			$("#head").fadeToggle();
		}
		if(document.getElementById(id).style.display == "none")
		{
			$("#" + id).fadeToggle();
		}
		
		// style="display:none;"
	}
	else
	{
		// console.log("weapon : " + document.getElementById("weapon").style.display);
		if(document.getElementById("weapon").style.display != "none")
		{
			$("#weapon").fadeToggle();
		}
		if(document.getElementById(id).style.display == "none")
		{
			// document.getElementById("weapon").style = "display:none;";
			$("#" + id).fadeToggle();
		}
		
	}
}

function ClickTest(id,elem)
{
	var element2 = document.getElementById( elem + "_img" );
	var state2 = element2.style.display;
	// checkFileExist("./sprite/" + id + ".gif")
	// if(checkFileExist("./sprite/" + id + ".gif"))
	// {
		element2.src="./sprite/" + id + ".png";
		// console.log(element2.src);
		element2.onerror = function(){
			element2.src="./sprite/default.gif";
		}
		var str;
		str = '';
		str += ITEM_NAME[id][3];
		if(ItemOBJ[id][5] != 0)
		{
			str += " [";
			str += ItemOBJ[id][5];
			str += "]";
		}
		
		myInnerHtml( elem + "_txt", str, 0 );
		
		for(var i = 1; i <= 4 ; i++)
		{
			var element3 = document.getElementById( "card_" + i );
			// console.log("card_" + i);
			//reset
			element3.src="./sprite/card_none.png";
			if(ItemOBJ[id][5] >= i)
				element3.src="./sprite/card_empty.png";
		}
		
		
	// }
	// else
	// {
		// element2.src="./sprite/null.gif";
	// }
}

function ClickHead2(id)
{
	var element2 = document.getElementById( "head_img" );
	var state2 = element2.style.display;
	if(id == "Dog Cap")
	{
		element2.src="./sprite/dog_cap.gif";
	}
	else
	{
		element2.src="./sprite/null.gif";
	}
}
function checkFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
     
    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}