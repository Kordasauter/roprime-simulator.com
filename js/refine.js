var RefRate_Normal = [
[100,100,100,100,100,100,100, 60, 40, 19, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//LV1 Weapon 
[100,100,100,100,100,100, 60, 40, 20, 19, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//LV2 Weapon
[100,100,100,100,100, 60, 50, 20, 20, 19, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//LV3 Weapon
[100,100,100,100, 60, 40, 40, 20, 20,  9,  8,  8,  8,  8,  8,  7,  7,  7,  5,  5],//LV4 Weapon
[100,100,100,100, 60, 40, 40, 20, 20,  9,  8,  8,  8,  8,  8,  7,  7,  7,  5,  5],//Armor

[100,100,100,100,100,100,100, 90, 70, 30, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//LV1 Weapon (HE/Enriched)
[100,100,100,100,100,100, 90, 70, 40, 30, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//LV2 Weapon (HE/Enriched)
[100,100,100,100,100, 90, 80, 40, 40, 30, 18, 18, 18, 18, 18, 17, 17, 17, 15, 15],//LV3 Weapon (HE/Enriched)
[100,100,100,100, 90, 70, 70, 40, 40, 20,  8,  8,  8,  8,  8,  7,  7,  7,  5,  5],//LV4 Weapon (HE/Enriched)
[100,100,100,100, 90, 70, 70, 40, 40, 20,  8,  8,  8,  8,  8,  7,  7,  7,  5,  5],//Armor (HE/Enriched)
];

var RefRate_Event = [
[100,100,100,100,100,100,100, 60, 40, 19, 40, 40, 35, 35, 30, 30, 20, 20, 15, 15],//LV1 Weapon 
[100,100,100,100,100,100, 60, 40, 20, 19, 40, 40, 35, 35, 30, 30, 20, 20, 15, 15],//LV2 Weapon
[100,100,100,100,100, 60, 50, 20, 20, 19, 40, 40, 35, 35, 30, 30, 20, 20, 15, 15],//LV3 Weapon
[100,100,100,100, 60, 40, 40, 20, 20,  9, 20, 20, 16, 16, 15, 15, 14, 14, 10, 10],//LV4 Weapon
[100,100,100,100, 60, 40, 40, 20, 20,  9, 20, 20, 16, 16, 15, 15, 14, 14, 10, 10],//Armor

[100,100,100,100,100,100,100, 95, 85, 55, 40, 40, 35, 35, 30, 30, 20, 20, 15, 15],//LV1 Weapon (HE/Enriched)
[100,100,100,100,100,100, 95, 85, 60, 45, 40, 40, 35, 35, 30, 30, 20, 20, 15, 15],//LV2 Weapon (HE/Enriched)
[100,100,100,100,100, 95, 90, 70, 60, 45, 40, 40, 35, 35, 30, 30, 20, 20, 15, 15],//LV3 Weapon (HE/Enriched)
[100,100,100,100, 95, 80, 80, 60, 50, 35, 20, 20, 16, 16, 15, 15, 14, 14, 10, 10],//LV4 Weapon (HE/Enriched)
[100,100,100,100, 95, 80, 80, 60, 50, 35, 20, 20, 16, 16, 15, 15, 14, 14, 10, 10],//Armor (HE/Enriched)
];

init();

function init()
{
	SetRefine();
}

function SetRefine()
{
	var str= "";
	var weaplv = Number(document.getElementById("Wlv").value);
	var ore = Number(document.getElementById("Ore").value);
	var RefRate = RefRate_Normal;
	if(document.getElementById("ref_event").checked)
		RefRate = RefRate_Event;
	
	str += "<table class=\"shadow table-responsive\">";
	str += "<tbody>";
	str += "<tr>";
	str += "<td class=\"padded\">Refine Level</td>";
	str += "<td class=\"padded\">Refine Rate (%)</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+0 -> +1</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][0] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+1 -> +2</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][1] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+2 -> +3</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][2] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+3 -> +4</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][3] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+4 -> +5</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][4] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+5 -> +6</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][5] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+6 -> +7</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][6] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+7 -> +8</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][7] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+8 -> +9</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][8] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+9 -> +10</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][9] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+10 -> +11</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][10] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+11 -> +12</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][11] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+12 -> +13</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][12] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+13 -> +14</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][13] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+14 -> +15</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][14] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+15 -> +16</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][15] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+16 -> +17</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][16] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+17 -> +18</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][17] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+18 -> +19</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][18] + "</td>";
	str += "</tr>";
	str += "<tr>";
	str += "<td class=\"padded\">+19 -> +20</td>";
	str += "<td class=\"padded\">" + RefRate[weaplv + ore][19] + "</td>";
	str += "</tr>";
	
	str += "</tbody>";
	str += "</table>";
	
	myInnerHtml("reftable",str,0);
	
	SetButton();
}

function SetButton()
{
	var ref_lv = document.getElementById("RefLv").value;
	if(ref_lv < 20)
		myInnerHtml("ref_text","Try to refine !<br> (" + GetRefRate() + "% success rate)",0);
	else
		myInnerHtml("ref_text","Max refine level",0);
}

function GetRefRate()
{
	var weaplv = Number(document.getElementById("Wlv").value);
	var ore = Number(document.getElementById("Ore").value);
	var RefRate = RefRate_Normal;
	if(document.getElementById("ref_event").checked)
		RefRate = RefRate_Event;
	var ref_lv = document.getElementById("RefLv").value;
	if(ref_lv < 20)
		return RefRate[weaplv + ore][ref_lv];
	else
		return 0;
}

function SimRefine()
{
	myInnerHtml("ref_status","<span style=\"color : Grey;\">*Refining*</span>",0);
	
	setTimeout(function(){
		var random = Math.floor(Math.random() * 100);
		if( random < GetRefRate())
			myInnerHtml("ref_status","<span style=\"color : Green;\">Success</span>",0);
		else
			myInnerHtml("ref_status","<span style=\"color : Red;\">Fail</span>",0);
	}, 200);
}

function myInnerHtml( elementId, insertValue, concatenate )
{ // insert into html
	"use strict";
	var formElement = document.getElementById( elementId );
	
	if ( formElement === null )
	{
		formElement = document.getElementById( "PRT" );
		formElement.insertAdjacentHTML( 'BeforeEnd', elementId + " " + insertValue );
		return;
	}

	if ( concatenate === 0 )
	{ // replace
		while ( formElement.hasChildNodes() )
		{
			formElement.removeChild( formElement.firstChild );
		}
		formElement.innerHTML = insertValue;
	}
	else
	{ // add
		// not ff compatible
		formElement.insertAdjacentHTML( 'BeforeEnd', insertValue );
	}
}