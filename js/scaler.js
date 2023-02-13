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
function BuildSearchTable()
{
	var formElements = document.forms["calcForm"].elements;
	
	// Build Table
	var str;
	str = '';
	str += '<div class="bgMdTitle mdTitle">Character</div>';
	str += '<div id="Level" style="display:block">';
	str += '<table class="shadow"><tr>';
	str += '<td id="BaseLevelLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="BaseLevelInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RangeLevelLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RangeLevelInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="PremiumLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="PremiumInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="BaseManualLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="BaseManualInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="JobManualLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="JobManualInput" class="bg-gray-100 padded optArea"></td>';
	str += '</tr></table></div>';
	
	str += '<div class="bgMdTitle mdTitle">Race & Element</div>';
	str += '<div id="Race" style="display:block">';
	str += '<table class="shadow"><tr>';
	str += '<td id="RCFormlessLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCFormlessInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCUndeadLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCUndeadInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCBruteLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCBruteInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCPlantLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCPlantInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCInsectLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCInsectInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCFishLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCFishInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCDemonLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCDemonInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCDemi_HumanLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCDemi_HumanInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCAngelLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCAngelInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="RCDragonLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RCDragonInput" class="bg-gray-100 padded optArea"></td>';
	// str += '<td id="RCLabel" class="bg-gray-100 padded optCaption"></td>';
	// str += '<td id="RCInput" class="bg-gray-100 padded optArea"></td>';
	//str += '</tr></table></div>';
	str += '</tr><tr>';
	/*str += '<div class="bgMdTitle mdTitle" onclick="ToggleVisibility(\'Element\')">Element</div>';
	str += '<div id="Element" style="display:block">';
	str += '<table class="shadow"><tr>';*/
	str += '<td id="ELENeutralLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELENeutralInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEWaterLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEWaterInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEEarthLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEEarthInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEFireLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEFireInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEWindLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEWindInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEPoisonLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEPoisonInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEHolyLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEHolyInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEShadowLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEShadowInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEGhostLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEGhostInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="ELEUndeadLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ELEUndeadInput" class="bg-gray-100 padded optArea"></td>';
	str += '</tr><tr>';
	str += '<td id="SizeSmallLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="SizeSmallInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="SizeMediumLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="SizeMediumInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td id="SizeLargeLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="SizeLargeInput" class="bg-gray-100 padded optArea"></td>';
	str += '<td class="bg-gray-100 padded optCaption"></td>';
	str += '<td class="bg-gray-100 padded optArea"></td>';
	str += '<td class="bg-gray-100 padded optCaption"></td>';
	str += '<td class="bg-gray-100 padded optArea"></td>';
	str += '<td class="bg-gray-100 padded optCaption"></td>';
	str += '<td class="bg-gray-100 padded optArea"></td>';
	str += '<td class="bg-gray-100 padded optCaption"></td>';
	str += '<td class="bg-gray-100 padded optArea"></td>';
	str += '<td class="bg-gray-100 padded optCaption"></td>';
	str += '<td class="bg-gray-100 padded optArea"></td>';
	str += '<td class="bg-gray-100 padded optCaption"></td>';
	str += '<td class="bg-gray-100 padded optArea"></td>';
	str += '<td class="bg-gray-100 padded optCaption"></td>';
	str += '<td class="bg-gray-100 padded optArea"></td>';
	str += '</tr></table></div>';
	//str += '<div id="SearchLabel" class="bg-gray-100 padded optCaption"></div>';
	str += '<div id="SearchInput" class="bg-gray-100 padded optArea"></div>';
	
	myInnerHtml( "Search", str, 0 );
	
	myInnerHtml( "BaseLevelLabel", "Base Lv.", 0 );
	myInnerHtml( "BaseLevelInput", '<select id="BaseLevel" style="width:50px;">', 0 );
	myInnerHtml( "RangeLevelLabel", "Range Lv.", 0 );
	myInnerHtml( "RangeLevelInput", '<select id="RangeLevel" style="width:100px;">', 0 );
	// myInnerHtml( "RangeLevelInput", '<input type="range" id="RangeLevel" min="0" max="11">', 0 );
	myInnerHtml( "PremiumLabel", "Premium", 0 );
	myInnerHtml( "PremiumInput", '<input type="checkbox" id="Premium">', 0 );
	myInnerHtml( "BaseManualLabel", "Battle Manual (Base Exp)", 0 );
	myInnerHtml( "BaseManualInput", '<select id="BaseManual" style="width:80px;">', 0 );
	myInnerHtml( "JobManualLabel", "Battle Manual (Job Exp)", 0 );
	myInnerHtml( "JobManualInput", '<select id="JobManual" style="width:80px;">', 0 );
	
	myInnerHtml( "RCFormlessLabel", "Formless", 0 );
	myInnerHtml( "RCFormlessInput", '<input type="checkbox" id="RC_Formless" checked >', 0 );
	myInnerHtml( "RCUndeadLabel", "Undead", 0 );
	myInnerHtml( "RCUndeadInput", '<input type="checkbox" id="RC_Undead" checked >', 0 );
	myInnerHtml( "RCBruteLabel", "Brute ", 0 );
	myInnerHtml( "RCBruteInput", '<input type="checkbox" id="RC_Brute" checked >', 0 );
	myInnerHtml( "RCPlantLabel", "Plant", 0 );
	myInnerHtml( "RCPlantInput", '<input type="checkbox" id="RC_Plant" checked >', 0 );
	myInnerHtml( "RCInsectLabel", "Insect", 0 );
	myInnerHtml( "RCInsectInput", '<input type="checkbox" id="RC_Insect" checked >', 0 );
	myInnerHtml( "RCFishLabel", "Fish", 0 );
	myInnerHtml( "RCFishInput", '<input type="checkbox" id="RC_Fish" checked >', 0 );
	myInnerHtml( "RCDemonLabel", "Demon", 0 );
	myInnerHtml( "RCDemonInput", '<input type="checkbox" id="RC_Demon" checked >', 0 );
	myInnerHtml( "RCDemi_HumanLabel", "Demi Human", 0 );
	myInnerHtml( "RCDemi_HumanInput", '<input type="checkbox" id="RC_Demi_Human" checked >', 0 );
	myInnerHtml( "RCAngelLabel", "Angel", 0 );
	myInnerHtml( "RCAngelInput", '<input type="checkbox" id="RC_Angel" checked >', 0 );
	myInnerHtml( "RCDragonLabel", "Dragon", 0 );
	myInnerHtml( "RCDragonInput", '<input type="checkbox" id="RC_Dragon" checked >', 0 );
	
	myInnerHtml( "ELENeutralLabel", "Neutral", 0 );
	myInnerHtml( "ELENeutralInput", '<input type="checkbox" id="ELE_Neutral" checked >', 0 );
	myInnerHtml( "ELEWaterLabel", "Water", 0 );
	myInnerHtml( "ELEWaterInput", '<input type="checkbox" id="ELE_Water" checked >', 0 );
	myInnerHtml( "ELEEarthLabel", "Earth", 0 );
	myInnerHtml( "ELEEarthInput", '<input type="checkbox" id="ELE_Earth" checked >', 0 );
	myInnerHtml( "ELEFireLabel", "Fire", 0 );
	myInnerHtml( "ELEFireInput", '<input type="checkbox" id="ELE_Fire" checked >', 0 );
	myInnerHtml( "ELEWindLabel", "Wind", 0 );
	myInnerHtml( "ELEWindInput", '<input type="checkbox" id="ELE_Wind" checked >', 0 );
	myInnerHtml( "ELEPoisonLabel", "Poison", 0 );
	myInnerHtml( "ELEPoisonInput", '<input type="checkbox" id="ELE_Poison" checked >', 0 );
	myInnerHtml( "ELEHolyLabel", "Holy", 0 );
	myInnerHtml( "ELEHolyInput", '<input type="checkbox" id="ELE_Holy" checked >', 0 );
	myInnerHtml( "ELEShadowLabel", "Shadow", 0 );
	myInnerHtml( "ELEShadowInput", '<input type="checkbox" id="ELE_Shadow" checked >', 0 );
	myInnerHtml( "ELEGhostLabel", "Ghost", 0 );
	myInnerHtml( "ELEGhostInput", '<input type="checkbox" id="ELE_Ghost" checked >', 0 );
	myInnerHtml( "ELEUndeadLabel", "Undead", 0 );
	myInnerHtml( "ELEUndeadInput", '<input type="checkbox" id="ELE_Undead" checked >', 0 );	
	
	myInnerHtml( "SizeSmallLabel", "Small", 0 );
	myInnerHtml( "SizeSmallInput", '<input type="checkbox" id="SizeSmall" checked >', 0 );
	myInnerHtml( "SizeMediumLabel", "Medium", 0 );
	myInnerHtml( "SizeMediumInput", '<input type="checkbox" id="SizeMedium" checked >', 0 );
	myInnerHtml( "SizeLargeLabel", "Large", 0 );
	myInnerHtml( "SizeLargeInput", '<input type="checkbox" id="SizeLarge" checked >', 0 );	
	//myInnerHtml( "SearchLabel", "Search", 0 );
	myInnerHtml( "SearchInput", '<input type="button" id="Search" value="Search" onclick="BuildMonsterTable()" >', 0 );
	
	//build Option list
	formElements["BaseLevel"].options[0] = new Option( "1", 1 );
	formElements["RangeLevel"].options[0] = new Option( "0", 0 );
	
	for ( var i = 1; i <= 175; i++ )
	{
		if(i>1)
			formElements["BaseLevel"].options[i-1] = new Option( i, i );
		if(i<16)
			formElements["RangeLevel"].options[i] = new Option( "±"+i, i );
	}
	//100%~140% exp
	//95%~140% exp
	//90%~140% exp
	//85%~140% exp
	//60%~140% exp
	//35%~140% exp

	formElements["RangeLevel"].options[16] = new Option( "-5 to +15 (100%~140% exp)", 16 );
	formElements["RangeLevel"].options[17] = new Option( "-10 to +15 (95%~140% exp)", 17 );
	formElements["RangeLevel"].options[18] = new Option( "-15 to +15 (90%~140% exp)", 18 );
	formElements["RangeLevel"].options[19] = new Option( "-20 to +15 (85%~140% exp)", 19 );
	formElements["RangeLevel"].options[20] = new Option( "-25 to +15 (60%~140% exp)", 20 );
	formElements["RangeLevel"].options[21] = new Option( "-30 to +15 (35%~140% exp)", 21 );
	
	formElements["BaseManual"].options[0] = new Option( "None", 0 );
	formElements["BaseManual"].options[1] = new Option( "+30%", 1 );
	formElements["BaseManual"].options[2] = new Option( "+50%", 2 );
	formElements["BaseManual"].options[3] = new Option( "+75%", 3 );
	formElements["BaseManual"].options[4] = new Option( "+100%", 4 );
	
	formElements["JobManual"].options[0] = new Option( "None", 0 );
	formElements["JobManual"].options[1] = new Option( "+30%", 1 );
	formElements["JobManual"].options[2] = new Option( "+50%", 2 );
	formElements["JobManual"].options[3] = new Option( "+75%", 3 );
	formElements["JobManual"].options[4] = new Option( "+100%", 4 );
}

function BuildMonsterTable()
{
	
	var SelectBlv = document.getElementById("BaseLevel");
	var Blv = SelectBlv.options[SelectBlv.selectedIndex].value;
	var SelectRlv = document.getElementById("RangeLevel");
	var Rlv = SelectRlv.options[SelectRlv.selectedIndex].value;
	var CheckRC = new Array(document.getElementById("RC_Formless"),document.getElementById("RC_Undead"),document.getElementById("RC_Brute"),document.getElementById("RC_Plant"),document.getElementById("RC_Insect"),document.getElementById("RC_Fish"),document.getElementById("RC_Demon"),document.getElementById("RC_Demi_Human"),document.getElementById("RC_Angel"),document.getElementById("RC_Dragon"));
	var CheckELE = new Array(document.getElementById("ELE_Neutral"),document.getElementById("ELE_Water"),document.getElementById("ELE_Earth"),document.getElementById("ELE_Fire"),document.getElementById("ELE_Wind"),document.getElementById("ELE_Poison"),document.getElementById("ELE_Holy"),document.getElementById("ELE_Shadow"),document.getElementById("ELE_Ghost"),document.getElementById("ELE_Undead"));
	var CheckSIZE = new Array(document.getElementById("SizeSmall"),document.getElementById("SizeMedium"),document.getElementById("SizeLarge"));
	var CheckPremium = document.getElementById("Premium");
	var SelectBBM = document.getElementById("BaseManual");
	var SelectJBM = document.getElementById("JobManual");
	
	str = '';
	str += '<div class="bgMdTitle mdTitle"';
	str += '<div id="Mobs" style="display:block">';
	str += '<table class="shadow"><tr>';
	str += "<td id=\"NameLabel\" class=\"bg-gray-100 padded optCaption\"></td>";
	str += '<td id="LevelLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="BaseExpLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="JobExpLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="HPLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="AtkLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="SizeLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="RaceLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="ElementLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="HitLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="FleeLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="DefLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="MDefLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="BaseExpHPLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '<td id="JobExpHPLabel" class="bg-gray-100 padded optCaption"></td>';
	str += '</tr>';
	
	
	// str += "<td id=\"NameLabel" + num.toString();
	// str += "\" class=\"bg-gray-200 padded optCaption\"></td>";
	var MonstersID = new Array();
	var MonstersCount = 0;
	if(Rlv<16)
	{
		for( var i = 0 ; i <= (Rlv*2) ; i++)
		{
			for( var j = 1 ; j < MonsterOBJ2.length ; j++)
			{
				if( MonsterOBJ2[MonsterABC2[j]][5] ==  (Number(Blv) + (Number(Rlv) - Number(i))) && MonsterOBJ2[MonsterABC2[j]][16] > 1 && MonsterOBJ2[MonsterABC2[j]][19] == 0 )
				{
					if(CheckRC[MonsterOBJ2[MonsterABC2[j]][2]].checked && CheckELE[Math.floor(MonsterOBJ2[MonsterABC2[j]][3]/10)].checked && CheckSIZE[MonsterOBJ2[MonsterABC2[j]][4]].checked)
					{
						MonstersID[MonstersCount] = MonsterOBJ2[MonsterABC2[j]][0];
						MonstersCount++;
					}
				}
			}
		}
	}
	else
	{
		for( var i = 0 ; i <= (15+(5*(Rlv-15))) ; i++)
		{
			for( var j = 1 ; j < MonsterOBJ2.length ; j++)
			{
				if( MonsterOBJ2[MonsterABC2[j]][5] ==  (Number(Blv) + (15 - Number(i))) && MonsterOBJ2[MonsterABC2[j]][16] > 1 && MonsterOBJ2[MonsterABC2[j]][19] == 0 )
				{
					if(CheckRC[MonsterOBJ2[MonsterABC2[j]][2]].checked && CheckELE[Math.floor(MonsterOBJ2[MonsterABC2[j]][3]/10)].checked && CheckSIZE[MonsterOBJ2[MonsterABC2[j]][4]].checked)
					{
						MonstersID[MonstersCount] = MonsterOBJ2[MonsterABC2[j]][0];
						MonstersCount++;
					}
				}
			}
		}
	}

	for(var i = 0 ; i < MonstersCount ; i++)
	{
		if(i%2 == 0)
		{
			str += '<tr><td id="NameLabel'+i.toString();
			str += '" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="LevelLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="BaseExpLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="JobExpLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="HPLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="AtkLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="SizeLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="RaceLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="ElementLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="HitLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="FleeLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="DefLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="MDefLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="BaseExpHPLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '<td id="JobExpHPLabel'+i.toString();
			str +='" class="bg-gray-200 padded optCaption"></td>';
			str += '</tr>';
		}
		else
		{
			str += '<tr><td id="NameLabel'+i.toString();
			str += '" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="LevelLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="BaseExpLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="JobExpLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="HPLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="AtkLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="SizeLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="RaceLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="ElementLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="HitLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="FleeLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="DefLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="MDefLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="BaseExpHPLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '<td id="JobExpHPLabel'+i.toString();
			str +='" class="bg-gray-300 padded optCaption"></td>';
			str += '</tr>';
		}
	}
	
	str += '</table></div>';
	
	myInnerHtml( "Monsters", str, 0 );
	
	myInnerHtml( "NameLabel", "Monster", 0 );
	myInnerHtml( "LevelLabel", "Level", 0 );
	myInnerHtml( "BaseExpLabel", "Base EXP", 0 );
	myInnerHtml( "JobExpLabel", "Job EXP", 0 );
	myInnerHtml( "HPLabel", "HP", 0 );
	myInnerHtml( "AtkLabel", "Attack", 0 );
	myInnerHtml( "SizeLabel", "Size", 0 );
	myInnerHtml( "RaceLabel", "Race", 0 );
	myInnerHtml( "ElementLabel", "Element", 0 );	
	myInnerHtml( "HitLabel", "100% Hit", 0 );
	myInnerHtml( "FleeLabel", "95% Flee", 0 );
	myInnerHtml( "DefLabel", "Def", 0 );
	myInnerHtml( "MDefLabel", "MDEF", 0 );
	myInnerHtml( "BaseExpHPLabel", "Base EXP per HP", 0 );
	myInnerHtml( "JobExpHPLabel", "Job EXP per HP", 0 );
//	0     1    2            3       4   5   6  7   8   9   10  11  12      13   14   15  16    17  18 19      20 21        22        23     24      25       
//  ID,(Name),Race,Element*10+lvl,Size,Lvl,HP,Vit,Agi,Int,Dex,Luk,MinAtk,MaxAtk,Def,MDef,bExp,jExp, ,BossFlag, 0,PerfHit,PerfDodge,MinSDef,MaxSDef,SoftMDef
	for(var i = 0;i < MonstersCount;i++)
	{
		for(var j = 0 ; j < MonsterOBJ2.length ; j++)
		{
			//MonstersID[MonstersCount]
			if( MonsterOBJ2[MonsterABC2[j]][0] == MonstersID[i] ) 
			{
				var exp_mul=1;
				switch( ( MonsterOBJ2[MonsterABC2[j]][5] - Number(Blv)) )//Exp multiplier
				{
					case 15:
					case 5:
						exp_mul=1.15;
						break;
					case 14:
					case 6:
						exp_mul=1.20;
						break;
					case 13:
					case 7:
						exp_mul=1.25;
						break;
					case 12:
					case 8:
						exp_mul=1.30;
						break;
					case 11:
					case 9:
						exp_mul=1.35;
						break;
					case 10:
						exp_mul=1.40;
						break;
					case 4:
						exp_mul=1.10;
						break;
					case 3:
						exp_mul=1.05;
						break;
					case -6:
					case -7:
					case -8:
					case -9:
					case -10:
						exp_mul=0.95;
						break;
					case -11:
					case -12:
					case -13:
					case -14:
					case -15:
						exp_mul=0.90;
						break;
					case -16:
					case -17:
					case -18:
					case -19:
					case -20:
						exp_mul=0.85;
						break;
					case -21:
					case -22:
					case -23:
					case -24:
					case -25:
						exp_mul=0.60;
						break;
					case -26:
					case -27:
					case -28:
					case -29:
					case -30:
						exp_mul=0.35;
						break;
					case 2:
					case 1:
					case 0:
					case -1:
					case -2:
					case -3:
					case -4:
					case -5:
					default:
						exp_mul=1;
						break;
				}
				if(CheckPremium.checked)
					exp_mul*=1.5;
				
				var bexphp = (exp_mul*MonsterOBJ2[MonsterABC2[j]][16]) / MonsterOBJ2[MonsterABC2[j]][6];
				var jexphp = (exp_mul*MonsterOBJ2[MonsterABC2[j]][17]) / MonsterOBJ2[MonsterABC2[j]][6];
				
				myInnerHtml( "NameLabel"+i.toString(),  MonsterOBJ2[MonsterABC2[j]][1], 0 );
				myInnerHtml( "LevelLabel"+i.toString(), MonsterOBJ2[MonsterABC2[j]][5], 0 );
				switch(SelectBBM.options[SelectBBM.selectedIndex].value)
				{
					case "1":
						myInnerHtml( "BaseExpLabel"+i.toString(), Math.floor((exp_mul*1.3)*MonsterOBJ2[MonsterABC2[j]][16]), 0 );
						bexphp = ((exp_mul*1.3)*MonsterOBJ2[MonsterABC2[j]][16]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					case "2":
						myInnerHtml( "BaseExpLabel"+i.toString(), Math.floor((exp_mul*1.5)*MonsterOBJ2[MonsterABC2[j]][16]), 0 );
						bexphp = ((exp_mul*1.5)*MonsterOBJ2[MonsterABC2[j]][16]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					case "3":
						myInnerHtml( "BaseExpLabel"+i.toString(), Math.floor((exp_mul*1.75)*MonsterOBJ2[MonsterABC2[j]][16]), 0 );
						bexphp = ((exp_mul*1.75)*MonsterOBJ2[MonsterABC2[j]][16]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					case "4":
						myInnerHtml( "BaseExpLabel"+i.toString(), Math.floor((exp_mul*2)*MonsterOBJ2[MonsterABC2[j]][16]), 0 );
						bexphp = ((exp_mul*2)*MonsterOBJ2[MonsterABC2[j]][16]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					default:
						myInnerHtml( "BaseExpLabel"+i.toString(), Math.floor(exp_mul*MonsterOBJ2[MonsterABC2[j]][16]), 0 );
						break;
				}
				switch(SelectJBM.options[SelectJBM.selectedIndex].value)
				{
					case "1":
						myInnerHtml( "JobExpLabel"+i.toString(),  Math.floor((exp_mul*1.3)*MonsterOBJ2[MonsterABC2[j]][17]), 0 );
						jexphp = ((exp_mul*1.3)*MonsterOBJ2[MonsterABC2[j]][17]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					case "2":
						myInnerHtml( "JobExpLabel"+i.toString(),  Math.floor((exp_mul*1.5)*MonsterOBJ2[MonsterABC2[j]][17]), 0 );
						jexphp = ((exp_mul*1.5)*MonsterOBJ2[MonsterABC2[j]][17]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					case "3":
						myInnerHtml( "JobExpLabel"+i.toString(),  Math.floor((exp_mul*1.75)*MonsterOBJ2[MonsterABC2[j]][17]), 0 );
						jexphp = ((exp_mul*1.75)*MonsterOBJ2[MonsterABC2[j]][17]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					case "4":
						myInnerHtml( "JobExpLabel"+i.toString(),  Math.floor((exp_mul*2)*MonsterOBJ2[MonsterABC2[j]][17]), 0 );
						jexphp = ((exp_mul*2)*MonsterOBJ2[MonsterABC2[j]][17]) / MonsterOBJ2[MonsterABC2[j]][6];
						break;
					default:
						myInnerHtml( "JobExpLabel"+i.toString(),  Math.floor(exp_mul*MonsterOBJ2[MonsterABC2[j]][17]), 0 );
						break;
				}
				myInnerHtml( "HPLabel"+i.toString(), MonsterOBJ2[MonsterABC2[j]][6], 0 );
				myInnerHtml( "AtkLabel"+i.toString(), MonsterOBJ2[MonsterABC2[j]][12] + "~" + MonsterOBJ2[MonsterABC2[j]][13] , 0 );
				switch(MonsterOBJ2[MonsterABC2[j]][4])//monster size
				{
					case 0:
						myInnerHtml( "SizeLabel"+i.toString(), "Small", 0 );
						break;
					case 1:
						myInnerHtml( "SizeLabel"+i.toString(), "Medium", 0 );
						break;
					case 2:
						myInnerHtml( "SizeLabel"+i.toString(), "Large", 0 );
						break;
					default:
						break;
				}
				switch(MonsterOBJ2[MonsterABC2[j]][2])//monster race
				{
					case 0:
						myInnerHtml( "RaceLabel"+i.toString(), "Formless", 0 );
						break;
					case 1:
						myInnerHtml( "RaceLabel"+i.toString(), "Undead", 0 );
						break;
					case 2:
						myInnerHtml( "RaceLabel"+i.toString(), "Brute", 0 );
						break;
					case 3:
						myInnerHtml( "RaceLabel"+i.toString(), "Plant", 0 );
						break;
					case 4:
						myInnerHtml( "RaceLabel"+i.toString(), "Insect", 0 );
						break;
					case 5:
						myInnerHtml( "RaceLabel"+i.toString(), "Fish", 0 );
						break;
					case 6:
						myInnerHtml( "RaceLabel"+i.toString(), "Demon", 0 );
						break;
					case 7:
						myInnerHtml( "RaceLabel"+i.toString(), "Demi Human", 0 );
						break;
					case 8:
						myInnerHtml( "RaceLabel"+i.toString(), "Angel", 0 );
						break;
					case 9:
						myInnerHtml( "RaceLabel"+i.toString(), "Dragon", 0 );
						break;
					default:
						break;
				}
				switch(MonsterOBJ2[MonsterABC2[j]][3])//Monster element
				{
					case 1:
					case 2:
					case 3:
					case 4:
						myInnerHtml( "ElementLabel"+i.toString(), "Neutral "+MonsterOBJ2[MonsterABC2[j]][3], 0 );
						break;
					case 11:
					case 12:
					case 13:
					case 14:
						myInnerHtml( "ElementLabel"+i.toString(), "Water "+ (MonsterOBJ2[MonsterABC2[j]][3] -10), 0 );
						break;
					case 21:
					case 22:
					case 23:
					case 24:
						myInnerHtml( "ElementLabel"+i.toString(), "Earth "+ (MonsterOBJ2[MonsterABC2[j]][3] -20), 0 );
						break;
					case 31:
					case 32:
					case 33:
					case 34:
						myInnerHtml( "ElementLabel"+i.toString(), "Fire "+ (MonsterOBJ2[MonsterABC2[j]][3] -30), 0 );
						break;
					case 41:
					case 42:
					case 43:
					case 44:
						myInnerHtml( "ElementLabel"+i.toString(), "Wind "+ (MonsterOBJ2[MonsterABC2[j]][3] -40), 0 );
						break;
					case 51:
					case 52:
					case 53:
					case 54:
						myInnerHtml( "ElementLabel"+i.toString(), "Poison "+ (MonsterOBJ2[MonsterABC2[j]][3] -50), 0 );
						break;
					case 61:
					case 62:
					case 63:
					case 64:
						myInnerHtml( "ElementLabel"+i.toString(), "Holy "+ (MonsterOBJ2[MonsterABC2[j]][3] -60), 0 );
						break;
					case 71:
					case 72:
					case 73:
					case 74:
						myInnerHtml( "ElementLabel"+i.toString(), "Shadow "+ (MonsterOBJ2[MonsterABC2[j]][3] -70), 0 );
						break;
					case 81:
					case 82:
					case 83:
					case 84:
						myInnerHtml( "ElementLabel"+i.toString(), "Ghost "+ (MonsterOBJ2[MonsterABC2[j]][3] -80), 0 );
						break;
					case 91:
					case 92:
					case 93:
					case 94:
						myInnerHtml( "ElementLabel"+i.toString(), "Undead "+ (MonsterOBJ2[MonsterABC2[j]][3] -90), 0 );
						break;
					default:
						myInnerHtml( "ElementLabel"+i.toString(), "Error", 0 );
						break;
				}
				myInnerHtml( "HitLabel"+i.toString(), MonsterOBJ2[MonsterABC2[j]][21], 0 );
				myInnerHtml( "FleeLabel"+i.toString(), MonsterOBJ2[MonsterABC2[j]][22], 0 );
				myInnerHtml( "DefLabel"+i.toString(), MonsterOBJ2[MonsterABC2[j]][14], 0 );
				myInnerHtml( "MDefLabel"+i.toString(), MonsterOBJ2[MonsterABC2[j]][15], 0 );
				myInnerHtml( "BaseExpHPLabel"+i.toString(), bexphp.toFixed(2), 0 );
				myInnerHtml( "JobExpHPLabel"+i.toString(), jexphp.toFixed(2), 0 );
			}
		}
		
	}
}