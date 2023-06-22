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
function BuildGeneratorTable()
{
	var formElements = document.forms["calcForm"].elements;
	
	// Build Table
	var str;
	str = '';
	str += '<div class="bgMdTitle mdTitle">Monster Generator</div>';
	str += '<div id="Level" style="display:block">';
	str += '<table class="bgLtTable"><tr>';
	str += '<td  id="IDLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="IDInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="NameLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="NameInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="RaceLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="RaceInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="ElementLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="ElementInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="ElementLevelLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="ElementLevelInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="SizeLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="SizeInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="LevelLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="LevelInput" class="bgLtRow1 padded optCaption"></td>';
	str += '</tr><tr>';
	str += '<td  id="HPLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="HPInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="VitLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="VitInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="AgiLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="AgiInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="IntLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="IntInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="DexLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="DexInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="LukLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="LukInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td class="bgLtRow3 padded optCaption"></td>';
	str += '<td class="bgLtRow1 padded optCaption"></td>';
	str += '</tr><tr>';
	str += '<td  id="MinAtkLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="MinAtkInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="MaxAtkLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="MaxAtkInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="DefLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="DefInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="MDefLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="MDefInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="BExpLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="BExpInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="JExpLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="JExpInput" class="bgLtRow1 padded optCaption"></td>';
	// str += '<td class="bgLtRow3 padded optCaption"></td>';
	// str += '<td class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="BossFlagLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="BossFlagInput" class="bgLtRow1 padded optCaption"></td>';
	/*str += '</tr><tr>';
	str += '<td  id="BossFlagLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="BossFlagInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="PerfHitLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="PerfHitInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td  id="PerfDodgeLabel" class="bgLtRow3 padded optCaption"></td>';
	str += '<td  id="PerfDodgeInput" class="bgLtRow1 padded optCaption"></td>';
	str += '<td class="bgLtRow3 padded optCaption"></td>';
	str += '<td class="bgLtRow1 padded optCaption"></td>';
	str += '<td class="bgLtRow3 padded optCaption"></td>';
	str += '<td class="bgLtRow1 padded optCaption"></td>';
	str += '<td class="bgLtRow3 padded optCaption"></td>';
	str += '<td class="bgLtRow1 padded optCaption"></td>';
	str += '<td class="bgLtRow3 padded optCaption"></td>';
	str += '<td class="bgLtRow1 padded optCaption"></td>';*/
	str += '</tr></table></div>';
	str += '<div id="GenerateInput" class="bgLtRow1 padded optArea"></div>';
	str += '<div id="Output" class="bgLtRow1 padded optArea"></div>';
	
	myInnerHtml( "Generator", str, 0 );
	
	myInnerHtml( "IDLabel", "ID", 0 );
	myInnerHtml( "IDInput", '<input type="text" id="ID" style="width:30px;">', 0 );
	myInnerHtml( "NameLabel", "Name", 0 );
	myInnerHtml( "NameInput", '<input type="text" id="Name" style="width:50px;">', 0 );
	myInnerHtml( "RaceLabel", "Race", 0 );
	myInnerHtml( "RaceInput", '<select id="Race" style="width:100px;">', 0 );
	myInnerHtml( "ElementLabel", "Element", 0 );
	myInnerHtml( "ElementInput", '<select id="Element" style="width:70px;">', 0 );
	myInnerHtml( "ElementLevelLabel", "Element Level", 0 );
	myInnerHtml( "ElementLevelInput", '<select id="ElementLevel" style="width:30px;">', 0 );
	myInnerHtml( "SizeLabel", "Size", 0 );
	myInnerHtml( "SizeInput", '<select id="Size" style="width:70px;">', 0 );
	myInnerHtml( "LevelLabel", "Level", 0 );
	myInnerHtml( "LevelInput", '<input type="text" id="Level" style="width:30px;">', 0 );
	
	myInnerHtml( "HPLabel", "HP", 0 );
	myInnerHtml( "HPInput", '<input type="text" id="HP" style="width:60px;">', 0 );
	myInnerHtml( "VitLabel", "Vit", 0 );
	myInnerHtml( "VitInput", '<input type="text" id="Vit" style="width:30px;">', 0 );
	myInnerHtml( "AgiLabel", "Agi", 0 );
	myInnerHtml( "AgiInput", '<input type="text" id="Agi" style="width:30px;">', 0 );
	myInnerHtml( "IntLabel", "Int", 0 );
	myInnerHtml( "IntInput", '<input type="text" id="Int" style="width:30px;">', 0 );
	myInnerHtml( "DexLabel", "Dex", 0 );
	myInnerHtml( "DexInput", '<input type="text" id="Dex" style="width:30px;">', 0 );
	myInnerHtml( "LukLabel", "Luk", 0 );
	myInnerHtml( "LukInput", '<input type="text" id="Luk" style="width:30px;">', 0 );
	
	myInnerHtml( "MinAtkLabel", "MinAtk", 0 );
	myInnerHtml( "MinAtkInput", '<input type="text" id="MinAtk" style="width:50px;">', 0 );
	myInnerHtml( "MaxAtkLabel", "MaxAtk", 0 );
	myInnerHtml( "MaxAtkInput", '<input type="text" id="MaxAtk" style="width:50px;">', 0 );
	myInnerHtml( "DefLabel", "Def", 0 );
	myInnerHtml( "DefInput", '<input type="text" id="Def" style="width:50px;">', 0 );
	myInnerHtml( "MDefLabel", "MDef", 0 );
	myInnerHtml( "MDefInput", '<input type="text" id="MDef" style="width:50px;">', 0 );
	myInnerHtml( "BExpLabel", "Base Exp", 0 );
	myInnerHtml( "BExpInput", '<input type="text" id="BExp" style="width:50px;">', 0 );
	myInnerHtml( "JExpLabel", "Job Exp", 0 );
	myInnerHtml( "JExpInput", '<input type="text" id="JExp" style="width:50px;">', 0 );
	
	myInnerHtml( "BossFlagLabel", "Boss Flag", 0 );
	myInnerHtml( "BossFlagInput", '<select id="BossFlag" style="width:100px;">', 0 );
	// myInnerHtml( "PerfHitLabel", "100% Hit", 0 );
	// myInnerHtml( "PerfHitInput", '<input type="text" id="PerfHit" style="width:30px;">', 0 );
	// myInnerHtml( "PerfDodgeLabel", "95% Flee", 0 );
	// myInnerHtml( "PerfDodgeInput", '<input type="text" id="PerfDodge" style="width:30px;">', 0 );
	
	myInnerHtml( "GenerateInput", '<input type="button" id="Generate" value="Generate" onclick="GenerateMonster()" >', 0 );
	myInnerHtml( "Output", '<input type="text" id="Output" style="width:95%;">', 0 );
	
	
	formElements["ID"].value = EnemyNum + 1;
	
	formElements["Race"].options[0] = new Option( "Formless", "race_FORMLESS" );
	formElements["Race"].options[1] = new Option( "Undead", "race_UNDEAD" );
	formElements["Race"].options[2] = new Option( "Brute", "race_BRUTE" );
	formElements["Race"].options[3] = new Option( "Plant", "race_PLANT" );
	formElements["Race"].options[4] = new Option( "Insect", "race_INSECT" );
	formElements["Race"].options[5] = new Option( "Fish", "race_FISH" );
	formElements["Race"].options[6] = new Option( "Demon", "race_DEMON" );
	formElements["Race"].options[7] = new Option( "Demi Human", "race_DEMI_HUMAN" );
	formElements["Race"].options[8] = new Option( "Angel", "race_ANGEL" );
	formElements["Race"].options[9] = new Option( "Dragon", "race_DRAGON" );
	
	formElements["Element"].options[0] = new Option( "Neutral", "ele_NEUTRAL" );
	formElements["Element"].options[1] = new Option( "Water", "ele_WATER" );
	formElements["Element"].options[2] = new Option( "Earth", "ele_EARTH" );
	formElements["Element"].options[3] = new Option( "Fire", "ele_FIRE" );
	formElements["Element"].options[4] = new Option( "Wind", "ele_WIND" );
	formElements["Element"].options[5] = new Option( "Poison", "ele_POISON" );
	formElements["Element"].options[6] = new Option( "Holy", "ele_HOLY" );
	formElements["Element"].options[7] = new Option( "Dark", "ele_DARK" );
	formElements["Element"].options[8] = new Option( "Ghost", "ele_GHOST" );
	formElements["Element"].options[9] = new Option( "Undead", "ele_UNDEAD" );
	
	formElements["ElementLevel"].options[0] = new Option( "1", 1 );
	formElements["ElementLevel"].options[1] = new Option( "2", 2 );
	formElements["ElementLevel"].options[2] = new Option( "3", 3 );
	formElements["ElementLevel"].options[3] = new Option( "4", 4 );
	
	formElements["Size"].options[0] = new Option( "Small", "siz_SMALL" );
	formElements["Size"].options[1] = new Option( "Medium", "siz_MEDIUM" );
	formElements["Size"].options[2] = new Option( "Large", "siz_LARGE" );
	
	formElements["BossFlag"].options[0] = new Option( "Normal", 0 );
	formElements["BossFlag"].options[1] = new Option( "MVP", 1 );
	formElements["BossFlag"].options[2] = new Option( "Demi Boss", 2 );
	formElements["BossFlag"].options[3] = new Option( "Plant", 5 );
}

function GenerateMonster()
{
	var formElements = document.forms["calcForm"].elements;
	var str;
	// var word='';
	str = ',[ ';
	str += formElements["ID"].value;
	str += ',';
	str += formatting(formElements["Name"].value,30)
	str += '"' + formElements["Name"].value + '"';
	str += ',';
	str += formatting(formElements["Race"].value,15)
	str += formElements["Race"].value;
	str += ',';
	str += formatting(formElements["Element"].value,11)
	str += formElements["Element"].value;
	str += '*10+';
	str += formElements["ElementLevel"].value;
	str += ',';
	str += formatting(formElements["Size"].value,10)
	str += formElements["Size"].value;
	str += ',';
	str += formatting(formElements["Level"].value,8)
	str += formElements["Level"].value;
	str += ',';
	str += formatting(formElements["HP"].value,8)
	str += formElements["HP"].value;
	str += ',';
	str += formatting(formElements["Vit"].value,8)
	str += formElements["Vit"].value;
	str += ',';
	str += formatting(formElements["Agi"].value,7)
	str += formElements["Agi"].value;
	str += ',';
	str += formatting(formElements["Int"].value,8)
	str += formElements["Int"].value;
	str += ',';
	str += formatting(formElements["Dex"].value,7)
	str += formElements["Dex"].value;
	str += ',';
	str += formatting(formElements["Luk"].value,8)
	str += formElements["Luk"].value;
	str += ',';
	str += formatting(formElements["MinAtk"].value,11)
	str += formElements["MinAtk"].value;
	str += ',';
	str += formatting(formElements["MaxAtk"].value,10)
	str += formElements["MaxAtk"].value;
	str += ',';
	str += formatting(formElements["Def"].value,7)
	str += formElements["Def"].value;
	str += ',';
	str += formatting(formElements["MDef"].value,9)
	str += formElements["MDef"].value;
	str += ',';
	str += formatting(formElements["BExp"].value,13)
	str += formElements["BExp"].value;
	str += ',';
	str += formatting(formElements["JExp"].value,13)
	str += formElements["JExp"].value;
	str += ',   ,       ';
	str += formElements["BossFlag"].value;
	str += ',         0,';
	var hit100 = 200 + parseInt(formElements["Level"].value) + parseInt(formElements["Agi"].value) + Math.floor(parseInt(formElements["Luk"].value) / 5);
	str += formatting(hit100.toString(),11)
	str += hit100;
	str += ',';
	var flee95 = 170 + parseInt(formElements["Level"].value) + parseInt(formElements["Dex"].value) + Math.floor(parseInt(formElements["Luk"].value) / 3);
	str += formatting(flee95.toString(),14);
	str += flee95;
	str += ',';
	var mlevel = parseInt(formElements["Level"].value);
	var mvit = parseInt(formElements["Vit"].value);
	var sdef = Math.floor((mlevel + mvit)/2);
	str += formatting(sdef.toString(),10);
	str += sdef;
	str += ',';
	str += formatting(sdef.toString(),11);
	str += sdef;
	str += ',          0]';
	
	formElements["Output"].value = str;
}

function formatting(word,count)
{
	var space='';
	// word = formElements["Name"].value
	for(var i = 0; i < (count - word.length);i++)
	{
		space += ' ';
	}
	return space;
}
