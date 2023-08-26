SaveStr1 = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, //0-9
			2, 2, 2, 1, 1, 3, 2, 3, 3, 3, //10-19
			3, 3, 2, 3, 3, 3, 3, 3, 3, 3, //20-29
			3, 3, 3, 3, 3, 3, 3, 3, 3, 3, //30-39
			3, 3, 3, 3, 3, 1, 1, 1, 1, 1, //40-49
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, //50-59
			1, 1, 1, 1, 1, 2, 2, 2, 1, 1, //60-69
			1, 1, 1, 1, 1, 1, 1, 1, 1, 3, //70-79
			3, 3, 3, 1, 2, 2, 2, 2, 2, 1, //80-89
			3, 1, 3, 1, 3, 1, 3, 1, 3, 1, //90-99
			3, 3, 3, 3, 3, 3, 3, 3, 3, 3, //100-109
			3, 3, 3, 3, 3, 3, 3, 3, 3, 3, //110-119
			3, 3, 3, 3, 3, 3, 3, 3, 1, 2, //120-129
			3, 3, 3, 3, 3, 3];//130-135
maxcookie = 135;

// Load from Cookies
function LoadCookie()
{ 
	var formElements = document.forms["calcForm"].elements;
	SaveData = new Array();
	cookieNum = formElements["saveList"].value;
	SaveData = document.cookie.split("; ");
	wStr = "";
	
	if(!isNaN(SaveData[128]))
	{
		formElements["A_Patch_Num"].value = SaveData[128];
		ChangePatch();
	}//set server patch
	
	for ( var i = 0; SaveData[i]; i++ )
	{
		if ( SaveData[i].substr(0,6) == cookieNum + "=" )
		{ // look for the correct cookie name
			wStr = SaveData[i].substr(6,SaveData[i].length);
			break;
		}
	}
	// wStr now equals the save string
	for ( var i = 0; i <= maxcookie; i++ )
	{
		SaveData[i] = 0;
	}
	
	// Clean the data
	j=0;
	for ( var i = 0; i <= maxcookie; i++ )
	{
		if ( SaveStr1[i] == 1 )
		{
			SaveData[i] = wStr.substr(j,1);
			j++;
		}
		else if ( SaveStr1[i] == 2 )
		{
			SaveData[i] = wStr.substr(j,2)
			j+=2;
		}
		else
		{
			SaveData[i] = wStr.substr(j,3);
			j+=3;
		}
	}
	for ( var i = 0; i <= maxcookie; i++ )
	{
		if ( SaveStr1[i] == 1 )
		{
			SaveData[i] = StoN(SaveData[i]);
		}
		if ( SaveStr1[i] == 2 )
		{
			SaveData[i] = StoN(SaveData[i].substr(0,1)) + SaveData[i].substr(1,1);
		}
		if ( SaveStr1[i] == 3 )
		{
			SaveData[i] = StoN(SaveData[i].substr(0,1)) + SaveData[i].substr(1,2);
		}
	}
	for ( var i = 0; i <= maxcookie; i++ )
	{
		if ( SaveStr1[i] == 3 && SaveData[i].substr(0,2) == "00" )
		{
			SaveData[i] = SaveData[i].substr(2,1);
		}
		else if ( SaveStr1[i] == 3 && SaveData[i].substr(0,1) == "0" )
		{
			SaveData[i] = SaveData[i].substr(1,2);
		}
		else if ( SaveStr1[i] == 2 && SaveData[i].substr(0,1) == "0" )
		{
			SaveData[i] = SaveData[i].substr(1,1);
		}
	}
	if ( SaveData[maxcookie] == "u" || SaveData[maxcookie] == "und" )
	{
		SaveData[maxcookie] = 0;
	}
	for ( var i = 0; i <= maxcookie; i++ )
	{
		SaveData[i] = parseInt( SaveData[i] );
		//window.console.log( i );
		//window.console.log( SaveData[i] );
	}

	// begin read
	if(SaveData[1] > 175 && formElements["A_Patch_Num"].value == 0)
	{
		formElements["A_Patch_Num"].value = 1;
		ChangePatch();
	}
	
	if(eval(SaveData[0]) == 20 && eval(SaveData[54]) == 1)
	{
		SuperNoviceFullWeaponCHECK = 1;
	}
	else
	{
		SuperNoviceFullWeaponCHECK = 0;
	}
	
	formElements["A_JOB"].value = SaveData[0];
	ChangeJob(SaveData[0]);
	formElements["A_BaseLV"].value = SaveData[1];
	formElements["A_JobLV"].value = SaveData[2];
	formElements["A_STR"].value = SaveData[3];
	formElements["A_AGI"].value = SaveData[4];
	formElements["A_VIT"].value = SaveData[5];
	formElements["A_DEX"].value = SaveData[6];
	formElements["A_INT"].value = SaveData[7];
	formElements["A_LUK"].value = SaveData[8];

	// formElements["A_HSE"].value = SaveData[9];
	
	formElements["A_WeaponType"].value = SaveData[10];
	ClickWeaponType(SaveData[10]);
	if ( ( SaveData[0] == cls_ASS || SaveData[0] == cls_ASX || SaveData[0] == cls_GLT || SaveData[0] == cls_GLTt ) &&
		 SaveData[10] != weapTyp_KATAR )
	{
		formElements["A_Weapon2Type"].value = SaveData[11];
		ClickWeaponType2(SaveData[11]);
	}
	n_A_JobSet();

	if ( n_A_JobSearch() == 2 || n_A_JobSearch() == 4 || ( n_A_JOB == 45 && SaveData[10] != 0 ) )
	{
		formElements["A_Arrow"].value = SaveData[12];
	}

	formElements["speedPot"].value = SaveData[13];
	formElements["A_weapon1"].value = SaveData[15];
	ClickWeapon(SaveData[15],0);
	formElements["A_Weapon_ATKplus"].value = SaveData[16];
	formElements["A_weapon1_card1"].value = SaveData[17];
	formElements["A_weapon1_card2"].value = SaveData[18];
	formElements["A_weapon1_card3"].value = SaveData[19];
	formElements["A_weapon1_card4"].value = SaveData[20];
	if ( n_Nitou )
	{
		formElements["A_weapon2"].value = SaveData[21];
		ClickWeapon2(SaveData[21],0);
		formElements["A_Weapon2_ATKplus"].value = SaveData[22];
		formElements["A_weapon2_card1"].value = SaveData[23];
		formElements["A_weapon2_card2"].value = SaveData[24];
		formElements["A_weapon2_card3"].value = SaveData[25];
		formElements["A_weapon2_card4"].value = SaveData[26];
	}
	if ( SaveData[14] < 4 )
	{
		if(SaveData[28] == 299)SaveData[28] = 298;
		if(SaveData[28] == 400)SaveData[28] = 298;
		if(SaveData[30] == 299)SaveData[30] = 298;
		if(SaveData[30] == 400)SaveData[30] = 298;
		if(SaveData[34] == 311)SaveData[34] = 310;
		if(SaveData[36] == 226)SaveData[36] = 225;
		if(SaveData[38] == 272)SaveData[38] = 271;
		if(SaveData[40] == 305)SaveData[40] = 304;
		if(SaveData[40] == 363)SaveData[40] = 362;
	}

	formElements["A_head1"].value = SaveData[27];	
	ClickHeadUp(SaveData[27],0);	
	formElements["A_head1_card"].value = SaveData[28];
	formElements["A_head2"].value = SaveData[29];
	formElements["A_head2_card"].value = SaveData[30];
	formElements["A_head3"].value = SaveData[31];
	// formElements["A_HSE_HEAD1"].value = SaveData[32];//Old Head enchant (not used now)

	formElements["A_left"].value = SaveData[33];
	// ClickShield(SaveData[33],0);
	ClickEquip( SaveData[33], 0, 5 );
	formElements["A_left_card"].value = SaveData[34];
	formElements["A_body"].value = SaveData[35];
	ClickArmor(SaveData[35],0);
	formElements["A_body_card"].value = SaveData[36];
	formElements["A_shoulder"].value = SaveData[37];
	ClickGarment(SaveData[37],0);
	formElements["A_shoulder_card"].value = SaveData[38];
	formElements["A_shoes"].value = SaveData[39];
	ClickShoes(SaveData[39],0);
	formElements["A_shoes_card"].value = SaveData[40];
	formElements["A_acces1"].value = SaveData[41];
	ClickAcces(SaveData[41],1);
	formElements["A_acces1_card"].value = SaveData[42];
	formElements["A_acces2"].value = SaveData[43];
	ClickAcces(SaveData[43],2);
	formElements["A_acces2_card"].value = SaveData[44];

//for a strange reason do not put hier in the code or 
//the weapon used will be the first of the list instead of the equiped weapon
	ClickWeapon(SaveData[16],1); 
	
	w = n_A_JOB;

	var ch = 0;
	for ( var i = 0; i <= 17 && ch === 0; i++ )
	{
		if ( JobSkillPassOBJ[w][i] !== 999 )
		{
			formElements["A_Skill"+i].value = SaveData[45+i];
		}
		else
		{
			ch = 1;
		}
	}

	formElements["A_youshi"].checked = SaveData[63];
	formElements["A_Weapon_element"].value = SaveData[64];

	// Acolyte Buffs
	for ( var i = 0; i < ksAcolyteBuffCount; i++ )
	{
		acolyteBuffs[i] = SaveData[65+i];
	}
	for ( var i = 0; i < ksAcolyteBuffCount; i++ )
	{
		acolyteBuffs[i] = parseInt( acolyteBuffs[i] );
	}
	// Fill form data
	formElements["blessing"].value = acolyteBuffs[ksBlessing];
	formElements["increaseAgi"].value = acolyteBuffs[ksIncreaseAgi];
	formElements["angelus"].value = acolyteBuffs[ksAngelus];
	formElements["imposito"].value = acolyteBuffs[ksImposito];
	formElements["suffragium"].value = acolyteBuffs[ksSuffragium];
	formElements["gloria"].checked = acolyteBuffs[ksGloria];
	formElements["assumptio"].value = acolyteBuffs[ksAssumptio];
	formElements["spheres"].value = acolyteBuffs[ksSpheres];
	formElements["clementia"].value = acolyteBuffs[ksClementia];
	formElements["candidus"].value = acolyteBuffs[ksCandidus];
	formElements["expiatio"].value = acolyteBuffs[ksExpiatio];
	formElements["sacrament"].value = acolyteBuffs[ksSacrament];
	formElements["ppChange"].value = acolyteBuffs[ksPPChange];
	formElements["ppRevitalize"].value = acolyteBuffs[ksPPRevitalize];
	formElements["suraStr"].value = acolyteBuffs[ksSuraStrength];
	formElements["suraAgi"].value = acolyteBuffs[ksSuraAgility];
	formElements["suraVit"].value = acolyteBuffs[ksSuraVitality];
	formElements["suraDex"].value = acolyteBuffs[ksSuraDexterity];
	
	if ( SaveData[14] >= 3 )
	{
		formElements["A_HEAD_DEF_PLUS"].value = SaveData[84];
		ClickHeadUp(SaveData[84],1);
		formElements["A_BODY_DEF_PLUS"].value = SaveData[85];
		ClickArmor(SaveData[85],1);
		formElements["A_LEFT_DEF_PLUS"].value = SaveData[86];
		// ClickShield(SaveData[86],1);
		ClickEquip( SaveData[86], 1, 5 );
		formElements["A_SHOULDER_DEF_PLUS"].value = SaveData[87];
		ClickGarment(SaveData[87],1);
		formElements["A_SHOES_DEF_PLUS"].value = SaveData[88];
		ClickShoes(SaveData[88],1);
	}
	else
	{
		formElements["A_HEAD_DEF_PLUS"].value = 0;
		formElements["A_BODY_DEF_PLUS"].value = 0;
		formElements["A_LEFT_DEF_PLUS"].value = 0;
		formElements["A_SHOULDER_DEF_PLUS"].value = 0;
		formElements["A_SHOES_DEF_PLUS"].value = 0;
	}
	
	if(!isNaN(SaveData[89]))
	{
		formElements["A_SHADOW_BODY_DEF_PLUS"].value = SaveData[89];
		formElements["A_SHADOW_body"].value = SaveData[90];
		ClickEquip( SaveData[90],0,11);
		formElements["A_SHADOW_WEAPON_DEF_PLUS"].value = SaveData[91];
		formElements["A_SHADOW_weapon"].value = SaveData[92];
		ClickEquip( SaveData[92],0,12);
		formElements["A_SHADOW_SHIELD_DEF_PLUS"].value = SaveData[93];
		formElements["A_SHADOW_shield"].value = SaveData[94];
		ClickEquip( SaveData[94],0,13);
		formElements["A_SHADOW_SHOES_DEF_PLUS"].value = SaveData[95];
		formElements["A_SHADOW_shoes"].value = SaveData[96];
		ClickEquip( SaveData[96],0,14);
		formElements["A_SHADOW_EARRING_DEF_PLUS"].value = SaveData[97];
		formElements["A_SHADOW_earring"].value = SaveData[98];
		ClickEquip( SaveData[98],0,15);
		formElements["A_SHADOW_PENDANT_DEF_PLUS"].value = SaveData[99];
		formElements["A_SHADOW_pendant"].value = SaveData[100];
		ClickEquip( SaveData[100],0,16);
		
		if(!isNaN(SaveData[129]))
		{
			formElements["A_WEAPON_ENCHANT_2"].value = SaveData[101];
			formElements["A_WEAPON_ENCHANT_3"].value = SaveData[102];
			formElements["A_WEAPON_ENCHANT_4"].value = SaveData[103];
			formElements["A_SHIELD_ENCHANT_2"] = SaveData[104];
			formElements["A_SHIELD_ENCHANT_3"].value = SaveData[105];
			formElements["A_SHIELD_ENCHANT_4"].value = SaveData[106];
			formElements["A_GARMENT_ENCHANT_4"].value = SaveData[107];
			formElements["A_GARMENT_ENCHANT_3"].value = SaveData[108];
			formElements["A_GARMENT_ENCHANT_2"].value = SaveData[109];
			formElements["A_SHOES_ENCHANT_4"].value = SaveData[110];
			formElements["A_SHOES_ENCHANT_3"].value = SaveData[111];
			formElements["A_SHOES_ENCHANT_2"].value = SaveData[112];
			formElements["A_ARMOR_ENCHANT_4"].value = SaveData[113];
			formElements["A_ARMOR_ENCHANT_3"].value = SaveData[114];
			formElements["A_ARMOR_ENCHANT_2"].value = SaveData[115];
			formElements["A_ACCES1_ENCHANT_4"].value = SaveData[116];
			formElements["A_ACCES1_ENCHANT_3"].value = SaveData[117];
			formElements["A_ACCES1_ENCHANT_2"].value = SaveData[118];
			formElements["A_ACCES2_ENCHANT_4"].value = SaveData[119];
			formElements["A_ACCES2_ENCHANT_3"].value = SaveData[120];
			formElements["A_ACCES2_ENCHANT_2"].value = SaveData[121];
			formElements["A_HEAD_UPPER_ENCHANT_4"].value = SaveData[122];
			formElements["A_HEAD_UPPER_ENCHANT_3"].value = SaveData[123];
			formElements["A_HEAD_UPPER_ENCHANT_2"].value = SaveData[124];
		
		

			if ( n_Nitou )
			{	
				ClickWeapon2(formElements["A_Weapon2_ATKplus"].value,1);
				ClickWeapon2(formElements["A_Weapon2_ATKplus"].value,1);
				formElements["A_Mal_Ench3"].value = SaveData[125];
				formElements["A_Mal_Ench4"].value = SaveData[126];
				// formElements[""].value = SaveData[127];// not used yet
			}
			else
			{
				formElements["A_Mal_Ench3"].value = 0;
				formElements["A_Mal_Ench4"].value = 0;
				//formElements[""].value = 0; // not used yet
			}
				//shadow enchant
			if(!isNaN(SaveData[135]))
			{
				formElements["A_SHADOW_BODY_ENCHANT"].value = SaveData[130];
				formElements["A_SHADOW_WEAPON_ENCHANT"].value = SaveData[131];
				formElements["A_SHADOW_SHIELD_ENCHANT"].value = SaveData[132];
				formElements["A_SHADOW_SHOES_ENCHANT"].value = SaveData[133];
				formElements["A_SHADOW_EARRING_ENCHANT"].value = SaveData[134];
				formElements["A_SHADOW_PENDANT_ENCHANT"].value = SaveData[135];
			}
		}
	}
	StCalc(1);

	calc();
	$("select").trigger("chosen:updated");
}

function LoadCookieConf()
{
	SaveData = new Array();
	SaveData = document.cookie.split("; ");
	wStr = "";

	wLCF = 0;
	for ( var i = 0; SaveData[i]; i++ )
	{
		if(SaveData[i].substr(0,9) == "ConfData" +"=")
		{
			wStr = SaveData[i].substr(9,SaveData[i].length);
			wLCF = 1;
			break;
		}
	}

	if ( wLCF === 1 )
	{
		if(wStr.substr(0,1) == "0")
		{
			document.calcForm.Conf01.value = wStr.substr(1,2);
			SaveCookieConf();
		}
		else
		{
			document.calcForm.Conf01.value = StoN2(wStr.substr(1,2));
		}
	}
	else
	{
		document.calcForm.Conf01.value = 33;
	}
}
// Save SaveData[] to cookie
function LoadCookie3()
{ 
	var formElements = document.forms["calcForm"].elements;
	SaveData = new Array();
	// console.log(document.cookie);
	
	// var SaveData2 = document.cookie.split("; ");
	// var SaveName = "";
	// for(var i=0;i<SaveData2.length;i++)
	// {
		// SaveName = SaveData2[i].split("=");
		// console.log(SaveName);
	// }
	
	for ( var k = 0; k < 16; k++ )
	{
		cookieNum = "num0" + k;
		if ( k >= 10 )
		{
			cookieNum = "num"+ k;
		}
		/**/
		// if( k < SaveData2.length)
		// {
			// SaveName = SaveData2[k].split("=");
			// cookieNum = SaveName[0];
		// }
		/**/
		SaveData = document.cookie.split("; ");
		wStr = "";
		for ( var i = 0; SaveData[i]; i++ )
		{
			// console.log("SaveData[i]" + SaveData[i]);
			
			if ( SaveData[i].substr(0,6) == cookieNum + "=" )
			{
				wStr = SaveData[i].substr(6,SaveData[i].length);
				// console.log(wStr);
				break;
			}
			
			// var tmp = SaveData2[i].split("=");
			// console.log(tmp[1]);
			// wStr = tmp[1];
		}
			// console.log(wStr);
		if ( wStr.substr(27,1) >= 1 )
		{
			SaveData[0] = wStr.substr(0,2);
			SaveData[0] = eval(SaveData[0]);
		}
		else
		{
			SaveData[0] = 998;
		}
		SaveData[63] = wStr.substr(132,1);

		if ( SaveData[0] >= 1 && SaveData[0] < cls_COUNT )
		{
			if(SaveData[63]==0)
			{ // normal char
				formElements["saveList"].options[k] = new Option("Save" + (k+1) + ": " + JobName[SaveData[0]][Language],cookieNum);
			}
			else
			{ // baby
				formElements["saveList"].options[k] = new Option("Save" + (k+1) + ": Baby "+JobName[SaveData[0]][Language],cookieNum);
			}
			// formElements["saveList"].options[k] = new Option("Save" + (k+1) + ": "+ cookieNum,cookieNum);
		}
		else if(SaveData[0] == 999 || SaveData[0] == 0)
		{ // novice
			formElements["saveList"].options[k] = new Option("Save" + (k+1) + ": Novice",cookieNum);
		}
		else
		{ // Empty
			formElements["saveList"].options[k] = new Option("Save" + (k+1) + ": No Data",cookieNum);
		}
	}
}

function LoadDataINIT()
{
	var formElements = document.forms["calcForm"].elements;
	var wType = parseInt(formElements["A_SaveType"].value);

	if(wType == 0)
	{
		if(window.localStorage.SaveDataName)
		{
			var wStr = unescape(window.localStorage.SaveDataName);
			var wStrName = new Array();
			wStrName = wStr.split("?");
			for(var j=1;j<=99;j++)
			{
				LoadDataName[j] = wStrName[j-1];
			}
		}
		else
		{
			for(i=0;i<=99;i++)
			{
				LoadDataName[i] = "no SaveData";
			}
		}

		if(window.localStorage.SaveDataMain)
		{
			var wStr = unescape(window.localStorage.SaveDataMain);
			var wStrMain = new Array();
			wStrMain = wStr.split("?");
			for(var j=1;j<=99;j++)
			{
				LoadDataMain[j] = wStrMain[j];
			}
		}
	}
	else
	{
		var wStr = "";
		var SaveData = new Array();
		SaveData = document.cookie.split("; ");
		for ( var i = 0; SaveData[i]; i++ )
		{
			if ( SaveData[i].substr(0,13) == "SavedataName=" )
			{
				wStr = SaveData[i].substr(13,SaveData[i].length);
				wStr = unescape(wStr);
				var wStrName = new Array();
				wStrName = wStr.split("?");
				for ( var j = 1; j <= 15; j++ )
				{
					LoadDataName[j] = wStrName[j - 1];
				}
				break;
			}
		}
		
		if ( !SaveData[i] )
		{
			for ( var j = 1; j <= 15; j++ )
			{
				LoadDataName[i] = "no SaveData";
			}
		}

		wStr = "";
		SaveData = new Array();
		SaveData = document.cookie.split("; ");
		for ( var i = 0; SaveData[i]; i++ )
		{
			if ( SaveData[i].substr(0,13) == "SavedataMain=" )
			{
				wStr = SaveData[i].substr(13,SaveData[i].length);
				wStr = unescape(wStr);
				var wStrMain = new Array();
				wStrMain = wStr.split("?");
				for ( var j = 1; j <= 15; j++ )
				{
					LoadDataMain[j] = wStrMain[j];
				}
				break;
			}
		}
	}

	if ( n_SaveMode === 0 )
	{
		if ( window.localStorage.SaveDataShortCut )
		{
			var wStr = "" + window.localStorage.SaveDataShortCut;
			var wStr2 = new Array();
			wStr2 = wStr.split(":");
//			myInnerHtml("set",wStr2[1],0);
			var i,j,k;
			for(i=1;i<=99;i++)
			{
				var wStr3 = new Array();
				wStr3 = wStr2[i].split("/");
				for(j=0;j<=49;j++)
				{
					var wStr4 = new Array();
					wStr4 = wStr3[j].split("?");
					for(k=0;k<=6;k++)
					{
						DataShortCut[i][j][k] = eval(wStr4[k]);
					}
				}
			}
		}
	}
	else
	{
		for(var i=0;i<=44;i++)
		{
			DataShortCut[0][i][3] = CardShort[i][0];
			DataShortCut[0][i][4] = CardShort[i][1];
			DataShortCut[0][i][5] = CardShort[i][2];
			DataShortCut[0][i][6] = CardShort[i][3];
		}
	}

/*	DataShortCut[n_LastSaveNum][i] = new Array();
	DataShortCut[n_LastSaveNum][i][0] = 0;
	DataShortCut[n_LastSaveNum][i][1] = 0;
	DataShortCut[n_LastSaveNum][i][2] = 0;
	DataShortCut[n_LastSaveNum][i][3] = 0;
	DataShortCut[n_LastSaveNum][i][4] = 0;
	DataShortCut[n_LastSaveNum][i][5] = 0;
	DataShortCut[n_LastSaveNum][i][6] = 0;
*/

	SetShortCut();
}

// Prepare SaveData for Cookies
function SaveCookie()
{ 
	var formElements = document.forms["calcForm"].elements;
	SaveData = new Array();
	calc();

	for(i=0;i<=90;i++)
		SaveData[i]=0;

	SaveData[0] = parseInt(formElements["A_JOB"].value);
	SaveData[1] = parseInt(formElements["A_BaseLV"].value);
	SaveData[2] = parseInt(formElements["A_JobLV"].value);
	SaveData[3] = parseInt(formElements["A_STR"].value);
	SaveData[4] = parseInt(formElements["A_AGI"].value);
	SaveData[5] = parseInt(formElements["A_VIT"].value);
	SaveData[6] = parseInt(formElements["A_DEX"].value);
	SaveData[7] = parseInt(formElements["A_INT"].value);
	SaveData[8] = parseInt(formElements["A_LUK"].value);
	// SaveData[9] = parseInt(formElements["A_HSE"].value);

	SaveData[10] = parseInt(formElements["A_WeaponType"].value);
	if ( n_Nitou )
	{
		SaveData[11] = parseInt(formElements["A_Weapon2Type"].value);
	}
	if ( n_A_JobSearch() === 2 || n_A_JobSearch() === 4 || ( n_A_JOB === 45 && n_A_WeaponType !== 0 ) )
	{
		SaveData[12] = parseInt(formElements["A_Arrow"].value);
	}

	SaveData[13] = parseInt(formElements["speedPot"].value);
	SaveData[14] = 4;
	SaveData[15] = parseInt(formElements["A_weapon1"].value);
	SaveData[16] = parseInt(formElements["A_Weapon_ATKplus"].value);
	SaveData[17] = parseInt(formElements["A_weapon1_card1"].value);
	SaveData[18] = parseInt(formElements["A_weapon1_card2"].value);
	SaveData[19] = parseInt(formElements["A_weapon1_card3"].value);
	SaveData[20] = parseInt(formElements["A_weapon1_card4"].value);
	if(n_Nitou)
	{
		SaveData[21] = parseInt(formElements["A_weapon2"].value);
		SaveData[22] = parseInt(formElements["A_Weapon2_ATKplus"].value);
		SaveData[23] = parseInt(formElements["A_weapon2_card1"].value);
		SaveData[24] = parseInt(formElements["A_weapon2_card2"].value);
		SaveData[25] = parseInt(formElements["A_weapon2_card3"].value);
		SaveData[26] = parseInt(formElements["A_weapon2_card4"].value);
	}
	else
	{
		SaveData[21] = 0;
		SaveData[22] = 0;
		SaveData[23] = 0;
		SaveData[24] = 0;
		SaveData[25] = 0;
		SaveData[26] = 0;
	}
	SaveData[27] = parseInt(formElements["A_head1"].value);
	SaveData[28] = parseInt(formElements["A_head1_card"].value);
	SaveData[29] = parseInt(formElements["A_head2"].value);
	SaveData[30] = parseInt(formElements["A_head2_card"].value);
	SaveData[31] = parseInt(formElements["A_head3"].value);
	
	// SaveData[32] = parseInt(formElements["A_HSE_HEAD1"].value);
	SaveData[33] = parseInt(formElements["A_left"].value);
	SaveData[34] = parseInt(formElements["A_left_card"].value);
	SaveData[35] = parseInt(formElements["A_body"].value);
	SaveData[36] = parseInt(formElements["A_body_card"].value);
	SaveData[37] = parseInt(formElements["A_shoulder"].value);
	SaveData[38] = parseInt(formElements["A_shoulder_card"].value);
	SaveData[39] = parseInt(formElements["A_shoes"].value);
	SaveData[40] = parseInt(formElements["A_shoes_card"].value);
	SaveData[41] = parseInt(formElements["A_acces1"].value);
	SaveData[42] = parseInt(formElements["A_acces1_card"].value);
	SaveData[43] = parseInt(formElements["A_acces2"].value);
	SaveData[44] = parseInt(formElements["A_acces2_card"].value);

	n_A_JobSet();
	var ch = 0;
	for ( var i = 0; i <= 17 && ch == 0; i++ )
	{ // PassivSkills
		if ( JobSkillPassOBJ[n_A_JOB][i] !== 999 )
		{
			SaveData[45+i] = parseInt(formElements["A_Skill"+i].value); // amount
		}
		else
		{
			ch = 1;
		}
	}

	SaveData[63] = formElements["A_youshi"].checked;
	if(SaveData[63] == true)
		SaveData[63] = 1;
	else if(SaveData[63] == false)
		SaveData[63] = 0;
	SaveData[64] = parseInt(formElements["A_Weapon_element"].value);

	for ( var i = 0 ; i < ksAcolyteBuffCount; i++ )
	{
		SaveData[65+i] = acolyteBuffs[i];
		if(acolyteBuffs[i] == true)
		{
			SaveData[65+i] = 1;
		}
		else if(acolyteBuffs[i] == false)
		{
			SaveData[65+i] = 0;
		}
	}
	SaveData[83] = 0;
	SaveData[84] = parseInt(formElements["A_HEAD_DEF_PLUS"].value);
	SaveData[85] = parseInt(formElements["A_BODY_DEF_PLUS"].value);
	SaveData[86] = parseInt(formElements["A_LEFT_DEF_PLUS"].value);
	SaveData[87] = parseInt(formElements["A_SHOULDER_DEF_PLUS"].value);
	SaveData[88] = parseInt(formElements["A_SHOES_DEF_PLUS"].value);
	
	SaveData[89] = parseInt(formElements["A_SHADOW_BODY_DEF_PLUS"].value);
	SaveData[90] = parseInt(formElements["A_SHADOW_body"].value);
	SaveData[91] = parseInt(formElements["A_SHADOW_WEAPON_DEF_PLUS"].value);
	SaveData[92] = parseInt(formElements["A_SHADOW_weapon"].value);
	SaveData[93] = parseInt(formElements["A_SHADOW_SHIELD_DEF_PLUS"].value);
	SaveData[94] = parseInt(formElements["A_SHADOW_shield"].value);
	SaveData[95] = parseInt(formElements["A_SHADOW_SHOES_DEF_PLUS"].value);
	SaveData[96] = parseInt(formElements["A_SHADOW_shoes"].value);
	SaveData[97] = parseInt(formElements["A_SHADOW_EARRING_DEF_PLUS"].value);
	SaveData[98] = parseInt(formElements["A_SHADOW_earring"].value);
	SaveData[99] = parseInt(formElements["A_SHADOW_PENDANT_DEF_PLUS"].value);
	SaveData[100] = parseInt(formElements["A_SHADOW_pendant"].value);
	
	SaveData[101] = parseInt(formElements["A_WEAPON_ENCHANT_2"].value);
	SaveData[102] = parseInt(formElements["A_WEAPON_ENCHANT_3"].value);
	SaveData[103] = parseInt(formElements["A_WEAPON_ENCHANT_4"].value);
	SaveData[104] = parseInt(formElements["A_SHIELD_ENCHANT_2"].value);
	SaveData[105] = parseInt(formElements["A_SHIELD_ENCHANT_3"].value);
	SaveData[106] = parseInt(formElements["A_SHIELD_ENCHANT_4"].value);
	SaveData[107] = parseInt(formElements["A_GARMENT_ENCHANT_4"].value);
	SaveData[108] = parseInt(formElements["A_GARMENT_ENCHANT_3"].value);
	SaveData[109] = parseInt(formElements["A_GARMENT_ENCHANT_2"].value);
	SaveData[110] = parseInt(formElements["A_SHOES_ENCHANT_4"].value);
	SaveData[111] = parseInt(formElements["A_SHOES_ENCHANT_3"].value);
	SaveData[112] = parseInt(formElements["A_SHOES_ENCHANT_2"].value);
	SaveData[113] = parseInt(formElements["A_ARMOR_ENCHANT_4"].value);
	SaveData[114] = parseInt(formElements["A_ARMOR_ENCHANT_3"].value);
	SaveData[115] = parseInt(formElements["A_ARMOR_ENCHANT_2"].value);
	SaveData[116] = parseInt(formElements["A_ACCES1_ENCHANT_4"].value);
	SaveData[117] = parseInt(formElements["A_ACCES1_ENCHANT_3"].value);
	SaveData[118] = parseInt(formElements["A_ACCES1_ENCHANT_2"].value);
	SaveData[119] = parseInt(formElements["A_ACCES2_ENCHANT_4"].value);
	SaveData[120] = parseInt(formElements["A_ACCES2_ENCHANT_3"].value);
	SaveData[121] = parseInt(formElements["A_ACCES2_ENCHANT_2"].value);
	SaveData[122] = parseInt(formElements["A_HEAD_UPPER_ENCHANT_4"].value);
	SaveData[123] = parseInt(formElements["A_HEAD_UPPER_ENCHANT_3"].value);
	SaveData[124] = parseInt(formElements["A_HEAD_UPPER_ENCHANT_2"].value);
	
	if ( n_Nitou )
	{
		SaveData[125] = parseInt(formElements["A_Mal_Ench3"].value);
		SaveData[126] = parseInt(formElements["A_Mal_Ench4"].value);
		SaveData[127] = 0; // not used yet
		//SaveData[127] = parseInt(formElements[""].value); // not used yet
	}
	else
	{
		SaveData[125] = 0;
		SaveData[126] = 0;
		SaveData[127] = 0; // not used yet
	}
	SaveData[128] = PATCH; //Server Patch
	SaveData[129] = 1; //New enchant format, will be used for echant version.
	//shadow enchant
	SaveData[130] = parseInt(formElements["A_SHADOW_BODY_ENCHANT"].value);
	SaveData[131] = parseInt(formElements["A_SHADOW_WEAPON_ENCHANT"].value);
	SaveData[132] = parseInt(formElements["A_SHADOW_SHIELD_ENCHANT"].value);
	SaveData[133] = parseInt(formElements["A_SHADOW_SHOES_ENCHANT"].value);
	SaveData[134] = parseInt(formElements["A_SHADOW_EARRING_ENCHANT"].value);
	SaveData[135] = parseInt(formElements["A_SHADOW_PENDANT_ENCHANT"].value);
	
	// SaveData[136] = parseInt(formElements[""].value); //free
	
	
	for ( var i = 0; i <= maxcookie; i++ )
	{
		//window.console.log( i );
		//window.console.log( SaveData[i] );
		SaveData[i] = NtoS(SaveData[i],SaveStr1[i]);
	}
	
	
	cookieNum = formElements["saveList"].value;
	// cookieNum = formElements["saveName"].value;

	wDay = 99000;

	wCookie = new Date();
	wCookie.setTime(wCookie.getTime()+(wDay*1000*60*60*24));
	expDay = wCookie.toGMTString();

	wStr = "" +SaveData[0];

	for ( var i = 1; i <= maxcookie; i++ )
	{
		wStr += "" + SaveData[i];
	}
	document.cookie = cookieNum + "=" + wStr + "; expires=" + expDay + ";SameSite=Strict";
	var cookie = document.cookie.split(";");
 
	cacheCookieNum = cookieNum;

	LoadCookie3();
	formElements["saveList"].value = cacheCookieNum;
}

function SaveCookieConf()
{
	SaveData = new Array();

	wDay = 99000;

	wCookie = new Date();
	wCookie.setTime(wCookie.getTime()+(wDay*1000*60*60*24));
	expDay = wCookie.toGMTString();

	
	wStr = "a" + NtoS2(eval(document.calcForm.Conf01.value),2) + "00000";

	document.cookie = "ConfData" +"="+ wStr +"; expires="+ expDay ;
}
// Stats to URL
function URLOUT()
{ 
	var formElements = document.forms["calcForm"].elements;
	
	calc();
	SaveData = new Array();

	for ( var i = 0; i <= maxcookie; i++ )
	{
		SaveData[i] = "a";
	}

	SaveData[0] = NtoS2(2,1); // c ?
	SaveData[1] = NtoS2(parseInt(formElements["A_JOB"].value),2);
	SaveData[2] = NtoS2(parseInt(formElements["A_BaseLV"].value),2);
	SaveData[3] = NtoS2(parseInt(formElements["A_JobLV"].value),2);
	SaveData[4] = NtoS2(parseInt(formElements["A_STR"].value),2);
	SaveData[5] = NtoS2(parseInt(formElements["A_AGI"].value),2);
	SaveData[6] = NtoS2(parseInt(formElements["A_VIT"].value),2);
	SaveData[7] = NtoS2(parseInt(formElements["A_INT"].value),2);
	SaveData[8] = NtoS2(parseInt(formElements["A_DEX"].value),2);
	SaveData[9] = NtoS2(parseInt(formElements["A_LUK"].value),2);
	SaveData[10] = NtoS2(parseInt(formElements["speedPot"].value) * 10 + parseInt(formElements["A_Weapon_element"].value),1);

	SaveData[11] = NtoS2(parseInt(formElements["A_WeaponType"].value),1);
	if ( n_Nitou )
	{
		SaveData[12] = NtoS2(parseInt(formElements["A_Weapon2Type"].value),1);
	}
	if ( n_A_JobSearch() == 2 || n_A_JobSearch() == 4 || ( n_A_JOB === 45 && n_A_WeaponType !== 0 ) )
	{
		SaveData[13] = NtoS2(parseInt(formElements["A_Arrow"].value),1);
	}

	SaveData[14] = NtoS2(parseInt(formElements["A_weapon1"].value),2);
	SaveData[15] = NtoS2(parseInt(formElements["A_Weapon_ATKplus"].value),1);
	SaveData[16] = NtoS2(parseInt(formElements["A_weapon1_card1"].value),2);
	SaveData[17] = NtoS2(parseInt(formElements["A_weapon1_card2"].value),2);
	SaveData[18] = NtoS2(parseInt(formElements["A_weapon1_card3"].value),2);
	SaveData[19] = NtoS2(parseInt(formElements["A_weapon1_card4"].value),2);
	if(n_Nitou)
	{
		SaveData[20] = NtoS2(parseInt(formElements["A_weapon2"].value),2);
		SaveData[21] = NtoS2(parseInt(formElements["A_Weapon2_ATKplus"].value),1);
		SaveData[22] = NtoS2(parseInt(formElements["A_weapon2_card1"].value),2);
		SaveData[23] = NtoS2(parseInt(formElements["A_weapon2_card2"].value),2);
		SaveData[24] = NtoS2(parseInt(formElements["A_weapon2_card3"].value),2);
		SaveData[25] = NtoS2(parseInt(formElements["A_weapon2_card4"].value),2);
	}
	else
	{
		SaveData[20] = NtoS2(parseInt(formElements["A_left"].value),2);
		SaveData[21] = NtoS2(parseInt(formElements["A_LEFT_DEF_PLUS"].value),1);
		SaveData[22] = NtoS2(parseInt(formElements["A_left_card"].value),2);
		SaveData[24] = SaveData[25] = SaveData[23] = NtoS2(0,2);;
	}
	SaveData[26] = NtoS2(parseInt(formElements["A_head1"].value),2);
	SaveData[27] = NtoS2(parseInt(formElements["A_head1_card"].value),2);
	SaveData[28] = NtoS2(parseInt(formElements["A_head2"].value),2);
	SaveData[29] = NtoS2(parseInt(formElements["A_head2_card"].value),2);
	SaveData[30] = NtoS2(parseInt(formElements["A_head3"].value),2);
	SaveData[31] = NtoS2(parseInt(formElements["A_body"].value),2);
	SaveData[32] = NtoS2(parseInt(formElements["A_body_card"].value),2);
	SaveData[33] = NtoS2(parseInt(formElements["A_shoulder"].value),2);
	SaveData[34] = NtoS2(parseInt(formElements["A_shoulder_card"].value),2);
	SaveData[35] = NtoS2(parseInt(formElements["A_shoes"].value),2);
	SaveData[36] = NtoS2(parseInt(formElements["A_shoes_card"].value),2);
	SaveData[37] = NtoS2(parseInt(formElements["A_acces1"].value),2);
	SaveData[38] = NtoS2(parseInt(formElements["A_acces1_card"].value),2);
	SaveData[39] = NtoS2(parseInt(formElements["A_acces2"].value),2);
	SaveData[40] = NtoS2(parseInt(formElements["A_acces2_card"].value),2);
	SaveData[41] = NtoS2(parseInt(formElements["A_HEAD_DEF_PLUS"].value),1);
	SaveData[42] = NtoS2(parseInt(formElements["A_BODY_DEF_PLUS"].value),1);
	SaveData[43] = NtoS2(parseInt(formElements["A_SHOULDER_DEF_PLUS"].value),1);
	SaveData[44] = NtoS2(parseInt(formElements["A_SHOES_DEF_PLUS"].value),1);
	SaveData[45] = NtoS01(formElements["A_youshi"].checked,0,0,0,0); // adopted

	// Passive Skills
	n_A_JobSet();
	var count = 0;
	while ( JobSkillPassOBJ[n_A_JOB][count] !== 999 )
	{
		var value = parseInt( formElements["A_Skill" + count].value );			
		SaveData[47 + count] = NtoS2( value, 1 );
		count++;
	}
	SaveData[46] = NtoS2( count, 2 ); // amount

	var index = 47 + count;
	// console.log("index = " + index);
	// console.log("count = " + count);
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_STR.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_AGI.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_INT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_VIT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_DEX.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_LUK.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ATK.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ATK_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_MATK.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_MATK_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_HIT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_FLEE.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_DODGE.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_HP.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_SP.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_HP_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_SP_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_RANGED.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_DEF.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_MDEF.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_CRIT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_RED_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ASPD.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ASPD_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_CASTING.value), 1 );
	
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_BODY_DEF_PLUS"].value), 1 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_body"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_WEAPON_DEF_PLUS"].value), 1 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_weapon"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_SHIELD_DEF_PLUS"].value), 1 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_shield"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_SHOES_DEF_PLUS"].value), 1 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_shoes"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_EARRING_DEF_PLUS"].value), 1 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_earring"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_PENDANT_DEF_PLUS"].value), 1 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_pendant"].value), 3 );
	
	SaveData[index++] = NtoS2( parseInt(formElements["A_WEAPON_ENCHANT_2"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_WEAPON_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_WEAPON_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHIELD_ENCHANT_2"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHIELD_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHIELD_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_GARMENT_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_GARMENT_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_GARMENT_ENCHANT_2"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHOES_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHOES_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHOES_ENCHANT_2"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ARMOR_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ARMOR_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ARMOR_ENCHANT_2"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ACCES1_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ACCES1_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ACCES1_ENCHANT_2"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ACCES2_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ACCES2_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_ACCES2_ENCHANT_2"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_HEAD_UPPER_ENCHANT_4"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_HEAD_UPPER_ENCHANT_3"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_HEAD_UPPER_ENCHANT_2"].value), 3 );
	
	if ( n_Nitou )
	{
		SaveData[index++] = NtoS2( parseInt(formElements["A_Mal_Ench3"].value), 3 );
		SaveData[index++] = NtoS2( parseInt(formElements["A_Mal_Ench4"].value), 3 );
		SaveData[index++] = NtoS2(0,3); // not used yet
		// SaveData[127] = parseInt(formElements[""].value); // not used yet
	}
	else
	{
		SaveData[index++] = NtoS2( 0, 3 );
		SaveData[index++] = NtoS2( 0, 3 );
		SaveData[index++] = NtoS2(0,3);  // not used yet
	}
	// console.log(NtoS2(parseInt(formElements["A_Patch_Num"].value)));
	// console.log(index);
	SaveData[index++] = NtoS2(parseInt(formElements["A_Patch_Num"].value),1);  // Server Patch
	SaveData[index++] = NtoS2(1,1); //New enchant format, will be used for echant version.
	//Shadow enchants
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_BODY_ENCHANT"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_WEAPON_ENCHANT"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_SHIELD_ENCHANT"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_SHOES_ENCHANT"].value), 3 );
	SaveData[index++] = NtoS2( parseInt(formElements["A_SHADOW_EARRING_ENCHANT"].value), 3 );
	SaveData[index] = NtoS2( parseInt(formElements["A_SHADOW_PENDANT_ENCHANT"].value), 3 );
	
	
	// Acolyte Buffs
	
/*	for ( var i = 0; i < ksAcolyteBuffCount && acolyteBuffs[i] === 0; i++ );
	if ( i === ksAcolyteBuffCount )
	{ // no buffs
		SaveData[index++] = NtoS2( 0, 1 );
	}
	else
	{
		SaveData[index++] = NtoS2( 1, 1 );
		SaveData[index++] = NtoS2(acolyteBuffs[0],1);
		SaveData[index++] = NtoS2(acolyteBuffs[1],1);
		SaveData[index++] = NtoS2(acolyteBuffs[4],1);
		SaveData[index++] = NtoS2(acolyteBuffs[9],1);
		SaveData[index++] = NtoS05(acolyteBuffs[2],acolyteBuffs[6]);
		SaveData[index++] = NtoS05(acolyteBuffs[8],acolyteBuffs[10]);
		SaveData[index++] = NtoS05(acolyteBuffs[13],acolyteBuffs[14]);
		SaveData[index++] = NtoS01(acolyteBuffs[3],acolyteBuffs[5],acolyteBuffs[7],acolyteBuffs[11],acolyteBuffs[12]);
	}

	SaveData[index+1] = NtoS2(A_ActiveSkill.value,2);
	SaveData[index+2] = NtoS2(eval(A_ActiveSkillLV.value),1);
	SaveData[index+3] = NtoS2(0,3);
	if ( n_A_ActiveSkill==66  || n_A_ActiveSkill==326 ||
		 n_A_ActiveSkill==131 || n_A_ActiveSkill==88  ||
		 n_A_ActiveSkill==197 || n_A_ActiveSkill==394 ||
		 n_A_ActiveSkill==395 || n_A_ActiveSkill==405 ||
		 n_A_ActiveSkill==429 )
	{
		SaveData[index+3] = NtoS2(eval(SkillSubNum.value),3);
	}
	
	SaveData[index+4] = NtoS2(n_B[en_ID],2);
	index+=4;

	index+=1;
	for ( var i = 0; i <= 24 && monsterDebuffs[i] === 0; i++ );
	if ( i === 25 )
	{
		SaveData[index] = NtoS2(0,1);
	}
	else
	{
		SaveData[index] = NtoS2(1,1);
		SaveData[index+1] = NtoS2(monsterDebuffs[status_en_PROVOKE],1);
		SaveData[index+2] = NtoS05(monsterDebuffs[status_en_QUAG],monsterDebuffs[18]);
		SaveData[index+3] = NtoS01(monsterDebuffs[status_en_POISON],monsterDebuffs[3],monsterDebuffs[4],monsterDebuffs[5],monsterDebuffs[6]);
		SaveData[index+4] = NtoS01(monsterDebuffs[7],monsterDebuffs[8],monsterDebuffs[9],monsterDebuffs[10],monsterDebuffs[19]);
		SaveData[index+5] = NtoS2(monsterDebuffs[11],1);
		SaveData[index+6] = NtoS2(monsterDebuffs[12],1);
		SaveData[index+7] = NtoS01(monsterDebuffs[13],monsterDebuffs[14],monsterDebuffs[15],monsterDebuffs[16],monsterDebuffs[17]);
		SaveData[index+8] = NtoS01(monsterDebuffs[20],monsterDebuffs[21],monsterDebuffs[22],0,0);
		SaveData[index+9] = NtoS05(monsterDebuffs[23],monsterDebuffs[24]);
		index+=9;
	}

	index+=1;
	for(var i=0;i<=9 && monsterBuffs[i]==0;i++);
	if(i==10)
	{
		SaveData[index] = NtoS2(0,1);
	}
	else
	{
		SaveData[index] = NtoS2(1,1);
		SaveData[index+1] = NtoS2(monsterBuffs[0],1);
		SaveData[index+2] = NtoS01(monsterBuffs[1],monsterBuffs[2],monsterBuffs[3],monsterBuffs[4],monsterBuffs[5]);
		SaveData[index+3] = NtoS2(monsterBuffs[6],2);
		SaveData[index+4] = NtoS05(monsterBuffs[7],monsterBuffs[8]);
		SaveData[index+5] = NtoS01(monsterBuffs[9],0,0,0,0);
		index+=5;
	}

	index += 1;
	var checkHIT = [0,0,0,0,0];
	for(var i=0;i<=36 && performerBuffs[i]==0;i++);
	if(i!=37)
		checkHIT[0] = 1;
		
	for(i=0;i<=4 && performerBuffs[40+i]==0;i++);
	if(i!=5)
		checkHIT[1] = 1;
		
	for(i=0;i<=5 && battleChantBuffs[i]==0;i++);
	if(i!=6)
		checkHIT[2] = 1;
		
	for(i=0;i<=6 && otherBuffs[i]==0;i++);
	if(i!=7)
		checkHIT[3] = 1;
		
	for(i=0;i<=15 && usableItems[i]==0;i++);
	if(i!=16)
		checkHIT[4] = 1;
		
	SaveData[index] = NtoS01(checkHIT[0],checkHIT[1],checkHIT[2],checkHIT[3],checkHIT[4]);

	if ( checkHIT[0] )
	{
		SaveData[index+1] = NtoS2(performerBuffs[0],1);
		SaveData[index+2] = NtoS2(performerBuffs[1],1);
		SaveData[index+3] = NtoS2(performerBuffs[2],1);
		SaveData[index+4] = NtoS2(performerBuffs[3],1);
		SaveData[index+5] = NtoS2(performerBuffs[4],1);
		SaveData[index+6] = NtoS2(performerBuffs[5],1);
		SaveData[index+7] = NtoS2(performerBuffs[6],1);
		SaveData[index+8] = NtoS05(performerBuffs[7],performerBuffs[8]);
		SaveData[index+9] = NtoS05(performerBuffs[9],performerBuffs[10]);
		SaveData[index+10] = NtoS01(performerBuffs[11],performerBuffs[18],0,0,0);
		SaveData[index+11] = NtoS2(performerBuffs[12],2);
		SaveData[index+12] = NtoS2(performerBuffs[13],2);
		SaveData[index+13] = NtoS2(performerBuffs[14],2);
		SaveData[index+14] = NtoS2(performerBuffs[15],2);
		SaveData[index+15] = NtoS2(performerBuffs[16],2);
		SaveData[index+16] = NtoS2(performerBuffs[17],2);
		SaveData[index+17] = NtoS2(performerBuffs[20],2);
		SaveData[index+18] = NtoS2(performerBuffs[30],1);
		SaveData[index+19] = NtoS2(performerBuffs[21],2);
		SaveData[index+20] = NtoS2(performerBuffs[31],1);
		SaveData[index+21] = NtoS2(performerBuffs[22],2);
		SaveData[index+22] = NtoS2(performerBuffs[29],2);
		SaveData[index+23] = NtoS2(performerBuffs[32],1);
		SaveData[index+24] = NtoS2(performerBuffs[23],2);
		SaveData[index+25] = NtoS2(performerBuffs[33],1);
		SaveData[index+26] = NtoS2(performerBuffs[24],2);
		SaveData[index+27] = NtoS2(performerBuffs[34],1);
		SaveData[index+28] = NtoS2(performerBuffs[25],2);
		SaveData[index+29] = NtoS2(performerBuffs[35],1);
		SaveData[index+30] = NtoS2(performerBuffs[26],2);
		SaveData[index+31] = NtoS2(performerBuffs[36],1);
		index+=31;
	}

	if ( checkHIT[1] )
	{
		SaveData[index+1] = NtoS01(performerBuffs[40],0,0,0,0);
		SaveData[index+2] = NtoS05(performerBuffs[41],performerBuffs[42]);
		SaveData[index+3] = NtoS05(performerBuffs[43],performerBuffs[44]);
		index+=3;
	}

	if(checkHIT[2])
	{
		SaveData[index+1] = NtoS01(battleChantBuffs[0],battleChantBuffs[1],battleChantBuffs[2],battleChantBuffs[3],battleChantBuffs[4]);
		SaveData[index+2] = NtoS01(battleChantBuffs[5],0,0,0,0);
		index+=2;
	}

	if(checkHIT[3])
	{
		SaveData[index+1] = NtoS05(otherBuffs[0],otherBuffs[1]);
		SaveData[index+2] = NtoS05(otherBuffs[2],otherBuffs[4]);
		SaveData[index+3] = NtoS05(otherBuffs[5],0);
		SaveData[index+4] = NtoS2(otherBuffs[3],1);
		SaveData[index+5] = NtoS01(otherBuffs[6],0,0,0,0);
		index+=5;
	}

	if(checkHIT[4])
	{
		SaveData[index+1] = NtoS2(usableItems[3],2);
		SaveData[index+2] = NtoS2(usableItems[4],2);
		SaveData[index+3] = NtoS2(usableItems[5],2);
		SaveData[index+4] = NtoS2(usableItems[6],2);
		SaveData[index+5] = NtoS2(usableItems[7],2);
		SaveData[index+6] = NtoS2(usableItems[8],2);
		SaveData[index+7] = NtoS01(usableItems[0],usableItems[1],usableItems[2],usableItems[9],usableItems[10]);
		SaveData[index+8] = NtoS01(usableItems[11],usableItems[12],usableItems[13],usableItems[14],usableItems[15]);
		index+=8;
	}

	SaveData[index+1] = NtoS2(eval(document.calcForm.Conf01.value),2);
	index+=1;

	SaveData[index+1] = NtoS2(eval(document.calcForm.A_HSE.value),2);
	index+=1;
	SaveData[index+1] = NtoS2(eval(document.calcForm.A_HSE_HEAD1.value),2);
	index+=1;*/
	
	wStr = "" + SaveData[0];
	for ( var i = 1; i <= index; i++ )
	{
		// console.log("SaveData["+i+"]"+ SaveData[i]);

		wStr += "" + SaveData[i];
	}
	var w = location.href.split("?");
	formElements["URL_TEXT"].value = w[0] + "?" + wStr;
}
// URL to Stats
function URLIN()
{ 
with( document.calcForm )
{
	var formElements = document.forms["calcForm"].elements;
	
	var r = /\?/;
	var w = location.href.match(r);
	if ( w )
	{
		var SaveData = new Array();
		SaveData = location.href.split("?");
		var w = SaveData[1];

		if(StoN2(w.substr(1,2)) == 20 && StoN2(w.substr(90,1)))
			SuperNoviceFullWeaponCHECK = 1;
		else
			SuperNoviceFullWeaponCHECK = 0;
		var max = StoN2(w.substr(80,2));
		
		if (!(StoN2(w.substr(212+max,1,1))===undefined)) 
		{
			document.calcForm.A_Patch_Num.value = StoN2(w.substr(212+max,1));// Server Patch
			ChangePatch();
		}
		
		
		
		var w_Version = StoN2(w.substr(0,1));
		A_JOB.value = StoN2(w.substr(1,2));
		ChangeJob(StoN2(w.substr(1,2)),2);
		A_BaseLV.value = StoN2(w.substr(3,2));
		A_JobLV.value = StoN2(w.substr(5,2));
		A_STR.value = StoN2(w.substr(7,2));
		A_AGI.value = StoN2(w.substr(9,2));
		A_VIT.value = StoN2(w.substr(11,2));
		A_INT.value = StoN2(w.substr(13,2));
		A_DEX.value = StoN2(w.substr(15,2));
		A_LUK.value = StoN2(w.substr(17,2));
		speedPot.value = Math.floor(StoN2(w.substr(19,1)) / 10);
		A_Weapon_element.value = StoN2(w.substr(19,1)) % 10;
		A_WeaponType.value = StoN2(w.substr(20,1));

		ClickWeaponType(A_WeaponType.value);
		if(((A_JOB.value == 8 || A_JOB.value == 22) && A_WeaponType.value != 11) || (A_JOB.value == cls_KAGOB && A_WeaponType.value != weapTyp_HUUMA_SHURIKEN))
		{
			A_Weapon2Type.value = StoN2(w.substr(21,1));
			ClickWeaponType2(A_Weapon2Type.value);
		}
		n_A_JobSet();
		if(n_A_JobSearch()==2 || n_A_JobSearch()==4 || (n_A_JOB==45 && n_A_WeaponType!=0))
			A_Arrow.value = StoN2(w.substr(22,1));
		A_weapon1.value = StoN2(w.substr(23,2));
		A_Weapon_ATKplus.value = StoN2(w.substr(25,1));
		A_weapon1_card1.value = StoN2(w.substr(26,2));
		A_weapon1_card2.value = StoN2(w.substr(28,2));
		A_weapon1_card3.value = StoN2(w.substr(30,2));
		A_weapon1_card4.value = StoN2(w.substr(32,2));
		
		ClickWeapon(A_weapon1.value,0);
		if(ItemOBJ[StoN2(w.substr(34,2))][itm_TYPE] != itm_type_SHIELD)
		{
			A_Weapon2Type.value = ItemOBJ[StoN2(w.substr(34,2))][itm_TYPE];			
			ClickWeaponType2(A_Weapon2Type.value);
		}
		if(n_Nitou)
		{

			A_weapon2.value = StoN2(w.substr(34,2));
			A_Weapon2_ATKplus.value = StoN2(w.substr(36,1));
			A_weapon2_card1.value = StoN2(w.substr(37,2));
			A_weapon2_card2.value = StoN2(w.substr(39,2));
			A_weapon2_card3.value = StoN2(w.substr(41,2));
			A_weapon2_card4.value = StoN2(w.substr(43,2));
			
			ClickWeapon2(A_weapon2.value,0);
		}
		else
		{
			A_left.value = StoN2(w.substr(34,2));
			A_LEFT_DEF_PLUS.value = StoN2(w.substr(36,1));
			A_left_card.value = StoN2(w.substr(37,2));
			// ClickShield(A_left.value,0);
			// ClickShield(A_LEFT_DEF_PLUS.value,1);
			ClickEquip( A_left.value, 0, 5 );
			ClickEquip( A_LEFT_DEF_PLUS.value, 1, 5 );
		}
		A_head1.value = StoN2(w.substr(45,2));
		ClickHeadUp(A_head1.value,0);
		A_head1_card.value = StoN2(w.substr(47,2));
		A_head2.value = StoN2(w.substr(49,2));
		A_head2_card.value = StoN2(w.substr(51,2));
		A_head3.value = StoN2(w.substr(53,2));
		A_body.value = StoN2(w.substr(55,2));
		ClickArmor(A_body.value,0);
		A_body_card.value = StoN2(w.substr(57,2));
		A_shoulder.value = StoN2(w.substr(59,2));
		ClickGarment(A_shoulder.value,0);
		A_shoulder_card.value = StoN2(w.substr(61,2));
		A_shoes.value = StoN2(w.substr(63,2));
		ClickShoes(A_shoes.value,0);
		A_shoes_card.value = StoN2(w.substr(65,2));
		A_acces1.value = StoN2(w.substr(67,2));
		ClickAcces(A_acces1.value,1);
		A_acces1_card.value = StoN2(w.substr(69,2));
		A_acces2.value = StoN2(w.substr(71,2));
		ClickAcces(A_acces2.value,2);
		A_acces2_card.value = StoN2(w.substr(73,2));
		A_HEAD_DEF_PLUS.value = StoN2(w.substr(75,1));
		ClickHeadUp(A_HEAD_DEF_PLUS.value,1);
		A_BODY_DEF_PLUS.value = StoN2(w.substr(76,1));
		ClickArmor(A_BODY_DEF_PLUS.value,1);
		A_SHOULDER_DEF_PLUS.value = StoN2(w.substr(77,1));
		ClickGarment(A_SHOULDER_DEF_PLUS.value,1);
		A_SHOES_DEF_PLUS.value = StoN2(w.substr(78,1));
		ClickShoes(A_SHOES_DEF_PLUS.value,1);
		
		var wn = StoN2(w.substr(79,1));
		A_youshi.checked = Math.floor(wn / 16);

		
		for(var i=0;i<max;i++)
		{
			formElements["A_Skill" + i].value = StoN2(w.substr(82+i,1));	
		}

		var index = 82 + max;
		// console.log(max);
		// console.log( w.substr(80,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_STR.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_AGI.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_INT.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_VIT.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_DEX.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_LUK.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_ATK.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_ATK_PERC.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_MATK.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_MATK_PERC.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_HIT.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_FLEE.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_DODGE.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_HP.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_SP.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_HP_PERC.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_SP_PERC.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_RANGED.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_DEF.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_MDEF.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_CRIT.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_RED_PERC.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_ASPD.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_ASPD_PERC.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.E_BOOST_CASTING.value = StoN2(w.substr(index++,1));
			
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_BODY_DEF_PLUS.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) 
		{
			document.calcForm.A_SHADOW_body.value = StoN2(w.substr(index,3));
			ClickEquip( StoN2(w.substr(index,3)),0,11);
		}
		index=index + 3;
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_WEAPON_DEF_PLUS.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) 
		{
			document.calcForm.A_SHADOW_weapon.value = StoN2(w.substr(index,3));
			ClickEquip( StoN2(w.substr(index,3)),0,12);
		}
		index=index + 3;
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_SHIELD_DEF_PLUS.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) 
		{
			document.calcForm.A_SHADOW_shield.value = StoN2(w.substr(index,3));
			ClickEquip( StoN2(w.substr(index,3)),0,13);
		}
		index=index + 3;
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_SHOES_DEF_PLUS.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) 
		{
			document.calcForm.A_SHADOW_shoes.value = StoN2(w.substr(index,3));
			ClickEquip( StoN2(w.substr(index,3)),0,14);
		}
		index=index + 3;
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_EARRING_DEF_PLUS.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) 
		{
			document.calcForm.A_SHADOW_earring.value = StoN2(w.substr(index,3));
			ClickEquip( StoN2(w.substr(index,3)),0,15);
		}
		index=index + 3;
		if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_PENDANT_DEF_PLUS.value = StoN2(w.substr(index++,1));
		if (!(StoN2(w.substr(index,1))===undefined)) 
		{
			document.calcForm.A_SHADOW_pendant.value = StoN2(w.substr(index,3));
			ClickEquip( StoN2(w.substr(index,3)),0,16);
		}
		index=index + 3;
		
		if (!(StoN2(w.substr(213+max,1,1))===undefined)) 
		{ //New enchant format
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_WEAPON_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_WEAPON_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_WEAPON_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHIELD_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHIELD_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHIELD_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_GARMENT_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_GARMENT_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_GARMENT_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHOES_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHOES_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHOES_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ARMOR_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ARMOR_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ARMOR_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ACCES1_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ACCES1_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ACCES1_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ACCES2_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ACCES2_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_ACCES2_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_HEAD_UPPER_ENCHANT_4.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_HEAD_UPPER_ENCHANT_3.value = StoN2(w.substr(index,3));
			index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_HEAD_UPPER_ENCHANT_2.value = StoN2(w.substr(index,3));
			index=index + 3;
			
			if ( n_Nitou )
			{
				if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_Mal_Ench3.value = StoN2(w.substr(index,3));
				index=index + 3;
				if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_Mal_Ench4.value = StoN2(w.substr(index,3));
				index=index + 3;
				// if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.[not_yet].value = StoN2(w.substr(index,3));
				index=index + 3;

				// SaveData[127] = parseInt(formElements[""].value); // not used yet
			}
			else
			{
				index=index + 3;
				index=index + 3;
				index=index + 3;
			}
		}
		// Server Patch
		index++;
		//New enchant format, will be used for echant version.
		index++;
		if (!(StoN2(w.substr(231+max,1,1))===undefined)) 
		{//Shadow Enchants
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_BODY_ENCHANT.value = StoN2(w.substr(index,3));
				index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_WEAPON_ENCHANT.value = StoN2(w.substr(index,3));
				index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_SHIELD_ENCHANT.value = StoN2(w.substr(index,3));
				index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_SHOES_ENCHANT.value = StoN2(w.substr(index,3));
				index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_EARRING_ENCHANT.value = StoN2(w.substr(index,3));
				index=index + 3;
			if (!(StoN2(w.substr(index,1))===undefined)) document.calcForm.A_SHADOW_PENDANT_ENCHANT.value = StoN2(w.substr(index,3));
				index=index + 3;
		}
		
		
		
		
		
		StCalc();
		/*var x = 81 + max;
		if(StoN2(w.substr(x,1)) == 1)
		{
			acolyteBuffs[0] = StoN2(w.substr(x+1,1));
			acolyteBuffs[1] = StoN2(w.substr(x+2,1));
			acolyteBuffs[4] = StoN2(w.substr(x+3,1));
			acolyteBuffs[9] = StoN2(w.substr(x+4,1));
			acolyteBuffs[2] = Math.floor(StoN2(w.substr(x+5,1)) / 6);
			acolyteBuffs[6] = StoN2(w.substr(x+5,1)) % 6;
			acolyteBuffs[8] = Math.floor(StoN2(w.substr(x+6,1)) / 6);
			acolyteBuffs[10] = StoN2(w.substr(x+6,1)) % 6;
			acolyteBuffs[13] = Math.floor(StoN2(w.substr(x+7,1)) / 6);
			acolyteBuffs[14] = StoN2(w.substr(x+7,1)) % 6;
			var wn = StoN2(w.substr(x+8,1));
			acolyteBuffs[3] = Math.floor(wn / 16);
			acolyteBuffs[5] = Math.floor(wn % 16 / 8);
			acolyteBuffs[7] = Math.floor(wn % 8 / 4);
			acolyteBuffs[11] = Math.floor(wn % 4 / 2);
			acolyteBuffs[12] = Math.floor(wn % 2 / 1);
			x+=8;
		}


		var BackupX = x;
		A_ActiveSkill.value = StoN2(w.substr(x+1,2));

		ClickActiveSkill();
		A_ActiveSkillLV.value = StoN2(w.substr(x+3,1));

		if(n_A_ActiveSkill==66 || n_A_ActiveSkill==326 || n_A_ActiveSkill==131 || n_A_ActiveSkill==88 || n_A_ActiveSkill==197 || n_A_ActiveSkill==394 || n_A_ActiveSkill==395 || n_A_ActiveSkill==405)
			SkillSubNum.value = StoN2(w.substr(x+4,3));

		B_Enemy.value = StoN2(w.substr(x+7,2));

		x+=8;

		x+=1;
		if(StoN2(w.substr(x,1)) == 1)
		{
			monsterDebuffs[status_en_PROVOKE] = StoN2(w.substr(x+1,1));
			monsterDebuffs[status_en_QUAG] = Math.floor(StoN2(w.substr(x+2,1)) / 6);
			monsterDebuffs[18] = StoN2(w.substr(x+2,1)) % 6;
			var wn = StoN2(w.substr(x+3,1));
			monsterDebuffs[status_en_POISON] = Math.floor(wn / 16);
			monsterDebuffs[3] = Math.floor(wn % 16 / 8);
			monsterDebuffs[4] = Math.floor(wn % 8 / 4);
			monsterDebuffs[5] = Math.floor(wn % 4 / 2);
			monsterDebuffs[6] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+4,1));
			monsterDebuffs[7] = Math.floor(wn / 16);
			monsterDebuffs[8] = Math.floor(wn % 16 / 8);
			monsterDebuffs[9] = Math.floor(wn % 8 / 4);
			monsterDebuffs[10] = Math.floor(wn % 4 / 2);
			monsterDebuffs[19] = Math.floor(wn % 2 / 1);
			monsterDebuffs[11] = StoN2(w.substr(x+5,1));
			monsterDebuffs[12] = StoN2(w.substr(x+6,1));
			wn = StoN2(w.substr(x+7,1));
			monsterDebuffs[13] = Math.floor(wn / 16);
			monsterDebuffs[14] = Math.floor(wn % 16 / 8);
			monsterDebuffs[15] = Math.floor(wn % 8 / 4);
			monsterDebuffs[16] = Math.floor(wn % 4 / 2);
			monsterDebuffs[17] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+8,1));
			monsterDebuffs[20] = Math.floor(wn / 16);
			monsterDebuffs[21] = Math.floor(wn % 16 / 8);
			monsterDebuffs[22] = Math.floor(wn % 8 / 4);
			monsterDebuffs[23] = Math.floor(StoN2(w.substr(x+9,1)) / 6);
			monsterDebuffs[24] = StoN2(w.substr(x+9,1)) % 6;
			x+=9;
		}

		x+=1;
		if(StoN2(w.substr(x,1)) == 1)
		{
			monsterBuffs[0] = StoN2(w.substr(x+1,1));
			var wn = StoN2(w.substr(x+2,1));
			monsterBuffs[1] = Math.floor(wn / 16);
			monsterBuffs[2] = Math.floor(wn % 16 / 8);
			monsterBuffs[3] = Math.floor(wn % 8 / 4);
			monsterBuffs[4] = Math.floor(wn % 4 / 2);
			monsterBuffs[5] = Math.floor(wn % 2 / 1);
			monsterBuffs[6] = StoN2(w.substr(x+3,2));
			monsterBuffs[7] = Math.floor(StoN2(w.substr(x+5,1)) / 6);
			monsterBuffs[8] = StoN2(w.substr(x+5,1)) % 6;
			wn = StoN2(w.substr(x+6,1));
			monsterBuffs[9] = Math.floor(wn / 16);
			x += 6;
		}

		var checkHIT = [0,0,0,0,0];
		wn = StoN2(w.substr(x+1,1));
		checkHIT[0] = Math.floor(wn / 16);
		checkHIT[1] = Math.floor(wn % 16 / 8);
		checkHIT[2] = Math.floor(wn % 8 / 4);
		checkHIT[3] = Math.floor(wn % 4 / 2);
		checkHIT[4] = Math.floor(wn % 2 / 1);
		x+=1;

		if(checkHIT[0])
		{
			performerBuffs[0] = StoN2(w.substr(x+1,1));
			performerBuffs[1] = StoN2(w.substr(x+2,1));
			performerBuffs[2] = StoN2(w.substr(x+3,1));
			performerBuffs[3] = StoN2(w.substr(x+4,1));
			performerBuffs[4] = StoN2(w.substr(x+5,1));
			performerBuffs[5] = StoN2(w.substr(x+6,1));
			performerBuffs[6] = StoN2(w.substr(x+7,1));
			performerBuffs[7] = Math.floor(StoN2(w.substr(x+8,1)) / 6);
			performerBuffs[8] = StoN2(w.substr(x+8,1)) % 6;
			performerBuffs[9] = Math.floor(StoN2(w.substr(x+9,1)) / 6);
			performerBuffs[10] = StoN2(w.substr(x+9,1)) % 6;
			performerBuffs[11] = Math.floor(StoN2(w.substr(x+10,1)) / 16);
			performerBuffs[18] = Math.floor(StoN2(w.substr(x+10,1)) % 16 / 8);
			performerBuffs[12] = StoN2(w.substr(x+11,2));
			performerBuffs[13] = StoN2(w.substr(x+13,2));
			performerBuffs[14] = StoN2(w.substr(x+15,2));
			performerBuffs[15] = StoN2(w.substr(x+17,2));
			performerBuffs[16] = StoN2(w.substr(x+19,2));
			performerBuffs[17] = StoN2(w.substr(x+21,2));
			performerBuffs[20] = StoN2(w.substr(x+23,2));
			performerBuffs[30] = StoN2(w.substr(x+25,1));
			performerBuffs[21] = StoN2(w.substr(x+26,2));
			performerBuffs[31] = StoN2(w.substr(x+28,1));
			performerBuffs[22] = StoN2(w.substr(x+29,2));
			performerBuffs[29] = StoN2(w.substr(x+31,2));
			performerBuffs[32] = StoN2(w.substr(x+33,1));
			performerBuffs[23] = StoN2(w.substr(x+34,2));
			performerBuffs[33] = StoN2(w.substr(x+36,1));
			performerBuffs[24] = StoN2(w.substr(x+37,2));
			performerBuffs[34] = StoN2(w.substr(x+39,1));
			performerBuffs[25] = StoN2(w.substr(x+40,2));
			performerBuffs[35] = StoN2(w.substr(x+42,1));
			performerBuffs[26] = StoN2(w.substr(x+43,2));
			performerBuffs[36] = StoN2(w.substr(x+45,1));
			x+=45;
		}

		if(checkHIT[1])
		{
			var wn = StoN2(w.substr(x+1,1));
			performerBuffs[40] = Math.floor(wn / 16);
			performerBuffs[41] = Math.floor(StoN2(w.substr(x+2,1)) / 6);
			performerBuffs[42] = StoN2(w.substr(x+2,1)) % 6;
			performerBuffs[43] = Math.floor(StoN2(w.substr(x+3,1)) / 6);
			performerBuffs[44] = StoN2(w.substr(x+3,1)) % 6;
			x+=3;
		}

		if(checkHIT[2])
		{
			wn = StoN2(w.substr(x+1,1));
			battleChantBuffs[0] = Math.floor(wn / 16);
			battleChantBuffs[1] = Math.floor(wn % 16 / 8);
			battleChantBuffs[2] = Math.floor(wn % 8 / 4);
			battleChantBuffs[3] = Math.floor(wn % 4 / 2);
			battleChantBuffs[4] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+2,1));
			battleChantBuffs[5] = Math.floor(wn / 16);
			x+=2;
		}

		if(checkHIT[3])
		{
			otherBuffs[0] = Math.floor(StoN2(w.substr(x+1,1)) / 6);
			otherBuffs[1] = StoN2(w.substr(x+1,1)) % 6;
			otherBuffs[2] = Math.floor(StoN2(w.substr(x+2,1)) / 6);
			otherBuffs[4] = StoN2(w.substr(x+2,1)) % 6;
			otherBuffs[5] = Math.floor(StoN2(w.substr(x+3,1)) / 6);
			otherBuffs[3] = StoN2(w.substr(x+4,1));
			wn = StoN2(w.substr(x+5,1));
			otherBuffs[6] = Math.floor(wn / 16);
			x+=5;
		}

		if(checkHIT[4])
		{
			usableItems[3] = StoN2(w.substr(x+1,2));
			usableItems[4] = StoN2(w.substr(x+3,2));
			usableItems[5] = StoN2(w.substr(x+5,2));
			usableItems[6] = StoN2(w.substr(x+7,2));
			usableItems[7] = StoN2(w.substr(x+9,2));
			usableItems[8] = StoN2(w.substr(x+11,2));
			wn = StoN2(w.substr(x+13,1));
			usableItems[0] = Math.floor(wn / 16);
			usableItems[1] = Math.floor(wn % 16 / 8);
			usableItems[2] = Math.floor(wn % 8 / 4);
			usableItems[9] = Math.floor(wn % 4 / 2);
			usableItems[10] = Math.floor(wn % 2 / 1);
			wn = StoN2(w.substr(x+14,1));
			usableItems[11] = Math.floor(wn / 16);
			usableItems[12] = Math.floor(wn % 16 / 8);
			usableItems[13] = Math.floor(wn % 8 / 4);
			usableItems[14] = Math.floor(wn % 4 / 2);
			usableItems[15] = Math.floor(wn % 2 / 1);
			x+=14;
		}

		document.calcForm.Conf01.value = StoN2(w.substr(x+1,2));
		x+=2;
		if(w_Version >= 1)
		{
			document.calcForm.A_HSE.value = StoN2(w.substr(x+1,2));
			x+=2;
		}
		if(w_Version >= 2)
		{
			document.calcForm.A_HSE_HEAD1.value = StoN2(w.substr(x+1,2));
			x+=2;
		}

		calc();

		StCalc(1);

		ActiveSkillSetPlus();
		x = BackupX;
		A_ActiveSkill.value = StoN2(w.substr(x+1,2));

		ClickActiveSkill();
		A_ActiveSkillLV.value = StoN2(w.substr(x+3,1));

		if(n_A_ActiveSkill==66 || n_A_ActiveSkill==326 || n_A_ActiveSkill==131 || n_A_ActiveSkill==88 || n_A_ActiveSkill==197 || n_A_ActiveSkill==394 || n_A_ActiveSkill==395 || n_A_ActiveSkill==405 || n_A_ActiveSkill==429)
			SkillSubNum.value = StoN2(w.substr(x+4,3));

		B_Enemy.value = StoN2(w.substr(x+7,2));*/

		calc();
	}
}
$("select").trigger("chosen:updated");
}

function SetShortCut()
{
	if(n_SaveMode == 0)
	{
		document.calcForm.A_SHORTCUT_R.options[0] = new Option("?????????",0);
		for(var i=1;i<=49;i++)
		{
			var wWeaponName;
			if ( DataShortCut[n_LastSaveNum][i][0] == 0 &&
				 DataShortCut[n_LastSaveNum][i][1] == 0  &&
				 DataShortCut[n_LastSaveNum][i][2] == 0  &&
				 DataShortCut[n_LastSaveNum][i][3] == 0  &&
				 DataShortCut[n_LastSaveNum][i][4] == 0  &&
				 DataShortCut[n_LastSaveNum][i][5] == 0  &&
				 DataShortCut[n_LastSaveNum][i][6] == 0 )
			{
				wWeaponName = "no Weapon";
			}
			else
			{
				var w = ItemOBJ[DataShortCut[n_LastSaveNum][i][0]][1];
				var w2 = ItemOBJ[DataShortCut[n_LastSaveNum][i][0]][2];
				var w4 = ItemOBJ[DataShortCut[n_LastSaveNum][i][0]][4];

				if((JobASPD[n_A_JOB][w] != 0 && JobEquipItemSearch(w2) == 1) || (w4 == 4 && SuperNoviceFullWeaponCHECK)){
					var wCardName = ShortCutNameChange(i);

					var wHuyo="";
					if(DataShortCut[n_LastSaveNum][i][2] != 0)
						wHuyo = "("+ ZokuseiOBJ[DataShortCut[n_LastSaveNum][i][2]][Language] +")";
					wWeaponName = "+"+ DataShortCut[n_LastSaveNum][i][1] +" "+ wCardName + ITEM_NAME[DataShortCut[n_LastSaveNum][i][0]][1+Language*2] + wHuyo;
				}else{
					wWeaponName = "(?????)";
				}
			}
			document.calcForm.A_SHORTCUT_R.options[i] = new Option(wWeaponName,i);
		}
	}
	else
	{
		for(var i=0;i<=44;i++)
			document.calcForm.A_SHORTCUT_R.options[i] = new Option(CardShort[i][4 + Language],i);
	}
}

function ShortCutNameChange(num)
{
	var wNum = new Array();
	var wCname = new Array();
	wNum[0] = DataShortCut[n_LastSaveNum][num][3];
	wNum[1] = DataShortCut[n_LastSaveNum][num][4];
	wNum[2] = DataShortCut[n_LastSaveNum][num][5];
	wNum[3] = DataShortCut[n_LastSaveNum][num][6];

	for(var i=0;i<=3;i++)
	{
		for(var j=i+1;j<=3;j++)
		{
			if(wNum[i] == 0 && wNum[j] >= 0)
			{
				wNum[i] = wNum[j];
				wNum[j] = 0;
			}
		}
	}

	wCname[0] = cardOBJ[wNum[0]][2];
	wCname[1] = cardOBJ[wNum[1]][2];
	wCname[2] = cardOBJ[wNum[2]][2];
	wCname[3] = cardOBJ[wNum[3]][2];
	for(var i=0;i<=3;i++)
		if(wNum[i] == 0)
			wCname[i] = "";

	if(wNum[0] != 0)
	{
		if(wNum[1] != 0)
		{
			if(wNum[0] == wNum[1])
			{
				wCname[0] = Word(231) + wCname[1];
				wNum[1] = 0;
				wCname[1] = "";
				if(wNum[0] == wNum[2])
				{
					wCname[0] = Word(232) + wCname[2];
					wNum[2] = 0;
					wCname[2] = "";
					if(wNum[0] == wNum[3])
					{
						wCname[0] = Word(233) + wCname[3];
						wNum[3] = 0;
						wCname[3] = "";
					}
				}
			}
			if(wNum[2] != 0)
			{
				if(wNum[1] == wNum[2])
				{
					wCname[1] = Word(231) + wCname[2];
					wNum[2] = 0;
					wCname[2] = "";
					if(wNum[1] == wNum[3])
					{
						wCname[1] = Word(232) + wCname[3];
						wNum[3] = 0;
						wCname[3] = "";
					}
				}
				if(wNum[3] != 0)
				{
					if(wNum[2] == wNum[3])
					{
						wCname[2] = Word(231) + wCname[3];
						wNum[3] = 0;
						wCname[3] = "";
					}
				}
			}
		}
	}
	
	var wstr = "";
	for(var i=0;i<=3;i++)
	{
		if(wCname[i] != "")
		{
			wstr += wCname[i] +" ";
		}
	}
	return wstr;
}
// Stats to URL
function TempSaveActual()
{ 
	var formElements = document.forms["calcForm"].elements;
	
	calc();
	SaveData = new Array();

	for ( var i = 0; i <= maxcookie; i++ )
	{
		SaveData[i] = "a";
	}

	SaveData[0] = NtoS2(2,1); // c ?
	SaveData[1] = NtoS2(parseInt(formElements["A_JOB"].value),2);
	SaveData[2] = NtoS2(parseInt(formElements["A_BaseLV"].value),2);
	SaveData[3] = NtoS2(parseInt(formElements["A_JobLV"].value),2);
	SaveData[4] = NtoS2(parseInt(formElements["A_STR"].value),2);
	SaveData[5] = NtoS2(parseInt(formElements["A_AGI"].value),2);
	SaveData[6] = NtoS2(parseInt(formElements["A_VIT"].value),2);
	SaveData[7] = NtoS2(parseInt(formElements["A_INT"].value),2);
	SaveData[8] = NtoS2(parseInt(formElements["A_DEX"].value),2);
	SaveData[9] = NtoS2(parseInt(formElements["A_LUK"].value),2);
	SaveData[10] = NtoS2(parseInt(formElements["speedPot"].value) * 10 + parseInt(formElements["A_Weapon_element"].value),1);

	SaveData[11] = NtoS2(parseInt(formElements["A_WeaponType"].value),1);
	if ( n_Nitou )
	{
		SaveData[12] = NtoS2(parseInt(formElements["A_Weapon2Type"].value),1);
	}
	if ( n_A_JobSearch() == 2 || n_A_JobSearch() == 4 || ( n_A_JOB === 45 && n_A_WeaponType !== 0 ) )
	{
		SaveData[13] = NtoS2(parseInt(formElements["A_Arrow"].value),1);
	}

	SaveData[14] = NtoS2(parseInt(formElements["A_weapon1"].value),2);
	SaveData[15] = NtoS2(parseInt(formElements["A_Weapon_ATKplus"].value),1);
	SaveData[16] = NtoS2(parseInt(formElements["A_weapon1_card1"].value),2);
	SaveData[17] = NtoS2(parseInt(formElements["A_weapon1_card2"].value),2);
	SaveData[18] = NtoS2(parseInt(formElements["A_weapon1_card3"].value),2);
	SaveData[19] = NtoS2(parseInt(formElements["A_weapon1_card4"].value),2);
	if(n_Nitou)
	{
		SaveData[20] = NtoS2(parseInt(formElements["A_weapon2"].value),2);
		SaveData[21] = NtoS2(parseInt(formElements["A_Weapon2_ATKplus"].value),1);
		SaveData[22] = NtoS2(parseInt(formElements["A_weapon2_card1"].value),2);
		SaveData[23] = NtoS2(parseInt(formElements["A_weapon2_card2"].value),2);
		SaveData[24] = NtoS2(parseInt(formElements["A_weapon2_card3"].value),2);
		SaveData[25] = NtoS2(parseInt(formElements["A_weapon2_card4"].value),2);
	}
	else
	{
		SaveData[20] = NtoS2(parseInt(formElements["A_left"].value),2);
		SaveData[21] = NtoS2(parseInt(formElements["A_LEFT_DEF_PLUS"].value),1);
		SaveData[22] = NtoS2(parseInt(formElements["A_left_card"].value),2);
		SaveData[24] = SaveData[25] = SaveData[23] = NtoS2(0,2);;
	}
	SaveData[26] = NtoS2(parseInt(formElements["A_head1"].value),2);
	SaveData[27] = NtoS2(parseInt(formElements["A_head1_card"].value),2);
	SaveData[28] = NtoS2(parseInt(formElements["A_head2"].value),2);
	SaveData[29] = NtoS2(parseInt(formElements["A_head2_card"].value),2);
	SaveData[30] = NtoS2(parseInt(formElements["A_head3"].value),2);
	SaveData[31] = NtoS2(parseInt(formElements["A_body"].value),2);
	SaveData[32] = NtoS2(parseInt(formElements["A_body_card"].value),2);
	SaveData[33] = NtoS2(parseInt(formElements["A_shoulder"].value),2);
	SaveData[34] = NtoS2(parseInt(formElements["A_shoulder_card"].value),2);
	SaveData[35] = NtoS2(parseInt(formElements["A_shoes"].value),2);
	SaveData[36] = NtoS2(parseInt(formElements["A_shoes_card"].value),2);
	SaveData[37] = NtoS2(parseInt(formElements["A_acces1"].value),2);
	SaveData[38] = NtoS2(parseInt(formElements["A_acces1_card"].value),2);
	SaveData[39] = NtoS2(parseInt(formElements["A_acces2"].value),2);
	SaveData[40] = NtoS2(parseInt(formElements["A_acces2_card"].value),2);
	SaveData[41] = NtoS2(parseInt(formElements["A_HEAD_DEF_PLUS"].value),1);
	SaveData[42] = NtoS2(parseInt(formElements["A_BODY_DEF_PLUS"].value),1);
	SaveData[43] = NtoS2(parseInt(formElements["A_SHOULDER_DEF_PLUS"].value),1);
	SaveData[44] = NtoS2(parseInt(formElements["A_SHOES_DEF_PLUS"].value),1);
	SaveData[45] = NtoS01(formElements["A_youshi"].checked,0,0,0,0); // adopted

	// Passive Skills
	n_A_JobSet();
	var count = 0;
	while ( JobSkillPassOBJ[n_A_JOB][count] !== 999 )
	{
		var value = parseInt( formElements["A_Skill" + count].value );			
		SaveData[47 + count] = NtoS2( value, 1 );
		count++;
	}
	SaveData[46] = NtoS2( count, 1 ); // amount

	var index = 47 + count;
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_STR.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_AGI.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_INT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_VIT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_DEX.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_LUK.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ATK.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ATK_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_MATK.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_MATK_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_HIT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_FLEE.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_DODGE.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_HP.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_SP.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_HP_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_SP_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_RANGED.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_DEF.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_MDEF.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_CRIT.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_RED_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ASPD.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_ASPD_PERC.value), 1 );
	SaveData[index++] = NtoS2( parseInt(document.calcForm.E_BOOST_CASTING.value), 1 );
	
	wStr = "" + SaveData[0];
	for ( var i = 1; i <= index; i++ )
	{
		wStr += "" + SaveData[i];
	}
	return wStr;
}

function getEnemyFromURL()
{
	var actual = TempSaveActual();
	var formElements = document.forms["calcForm"].elements;
	TempLoadActual(formElements["URL_LOAD"].value);
	var monster = MonsterOBJ[PVP_ENEMY];
	monster[3] = n_A_BodyZokusei*10+1;
	monster[5] = n_A_BaseLV;
	monster[6] = n_A_MaxHP;
	monster[7] = n_A_VIT;
	monster[8] = n_A_AGI;
	monster[9] = n_A_INT;
	monster[10] = n_A_DEX;
	monster[11] = n_A_LUK;
	var dmg = GetBaseDmg( ele_NEUTRAL, false,  0);
	monster[12] = dmg[0];
	monster[13] = dmg[2];
	monster[14] = n_A_DEF;
	monster[15] = n_A_MDEF;
	monster[21] = n_A_FLEE;
	monster[22] = n_A_HIT;
	monster[23] = n_A_VITDEF;
	monster[24] = n_A_VITDEF;
	monster[25] = n_A_INTMDEF;
	monster[26] = monsterBuffs[status_en_buff_Race] = document.getElementsByName("B_KYOUKA10")[0].value = n_tok[bon_RED_RC_DEMI_HUMAN];
	monster[27] = monsterBuffs[status_en_buff_Ranged] = document.getElementsByName("B_KYOUKA12")[0].value = n_tok[bon_RED_RANGE];
	monster[28] = monsterBuffs[status_en_buff_Size] = document.getElementsByName("B_KYOUKA13")[0].value = n_tok[bon_RED_SIZ_MEDIUM];
	monster[29] = monsterBuffs[status_en_buff_Normal] = document.getElementsByName("B_KYOUKA14")[0].value = n_tok[bon_RED_NON_BOSS];
	monster[30] = 0;
	if(SkillSearch(skill_MA_ENERGY_COAT))
	{
		wBHD = 6 * SkillSearch(skill_MA_ENERGY_COAT);
		monster[30] = monsterBuffs[status_en_buff_Other] = document.getElementsByName("B_KYOUKA15")[0].value = wBHD;
	}
	monster[32] = monsterBuffs[status_en_buff_Elemental] = document.getElementsByName("B_KYOUKA11")[0].value = n_tok[bon_RED_ELE_NEUTRAL];
	for (var i = 1; i<=ele_UNDEAD; i++)
		monster[32+i] = n_tok[bon_RED_ELE_NEUTRAL+i];
	TempLoadActual(actual);
}
// URL to Stats
function TempLoadActual(w)
{ 
with( document.calcForm )
{
	var formElements = document.forms["calcForm"].elements;
	var r = /\?/;
	if ( w.match(r) ) {
		w = w.split("?");
		w = w[1];
	}

	if ( w )
	{
		if(StoN2(w.substr(1,2)) == 20 && StoN2(w.substr(90,1)))
			SuperNoviceFullWeaponCHECK = 1;
		else
			SuperNoviceFullWeaponCHECK = 0;
		var w_Version = StoN2(w.substr(0,1));
		A_JOB.value = StoN2(w.substr(1,2));
		ChangeJob(StoN2(w.substr(1,2)),2);
		if(StoN2(w.substr(3,2))<=CONST_MAXLVL_THIRD)
			A_BaseLV.value = StoN2(w.substr(3,2));
		else
			A_BaseLV.value = CONST_MAXLVL_THIRD;
		if(thirdClass && (StoN2(w.substr(5,2)) >= CONST_MAXJOBLVL_THIRD))
			A_JobLV.value = CONST_MAXJOBLVL_THIRD;
		else
			A_JobLV.value = StoN2(w.substr(5,2));
		A_STR.value = StoN2(w.substr(7,2));
		A_AGI.value = StoN2(w.substr(9,2));
		A_VIT.value = StoN2(w.substr(11,2));
		A_INT.value = StoN2(w.substr(13,2));
		A_DEX.value = StoN2(w.substr(15,2));
		A_LUK.value = StoN2(w.substr(17,2));
		speedPot.value = Math.floor(StoN2(w.substr(19,1)) / 10);
		A_Weapon_element.value = StoN2(w.substr(19,1)) % 10;
		A_WeaponType.value = StoN2(w.substr(20,1));

		ClickWeaponType(A_WeaponType.value);
		if(((A_JOB.value == 8 || A_JOB.value == 22) && A_WeaponType.value != 11) || (A_JOB.value == cls_KAGOB && A_WeaponType.value != weapTyp_HUUMA_SHURIKEN))
		{
			A_Weapon2Type.value = StoN2(w.substr(21,1));
			ClickWeaponType2(A_Weapon2Type.value);
		}
		n_A_JobSet();
		if(n_A_JobSearch()==2 || n_A_JobSearch()==4 || (n_A_JOB==45 && n_A_WeaponType!=0))
			A_Arrow.value = StoN2(w.substr(22,1));
		A_weapon1.value = StoN2(w.substr(23,2));
		A_Weapon_ATKplus.value = StoN2(w.substr(25,1));
		A_weapon1_card1.value = StoN2(w.substr(26,2));
		A_weapon1_card2.value = StoN2(w.substr(28,2));
		A_weapon1_card3.value = StoN2(w.substr(30,2));
		A_weapon1_card4.value = StoN2(w.substr(32,2));
		if(n_Nitou)
		{
			A_weapon2.value = StoN2(w.substr(34,2));
			A_Weapon2_ATKplus.value = StoN2(w.substr(36,1));
			A_weapon2_card1.value = StoN2(w.substr(37,2));
			A_weapon2_card2.value = StoN2(w.substr(39,2));
			A_weapon2_card3.value = StoN2(w.substr(41,2));
			A_weapon2_card4.value = StoN2(w.substr(43,2));
		}
		else
		{
			A_left.value = StoN2(w.substr(34,2));
			A_LEFT_DEF_PLUS.value = StoN2(w.substr(36,1));
			A_left_card.value = StoN2(w.substr(37,2));
		}
		A_head1.value = StoN2(w.substr(45,2));
		A_head1_card.value = StoN2(w.substr(47,2));
		A_head2.value = StoN2(w.substr(49,2));
		A_head2_card.value = StoN2(w.substr(51,2));
		A_head3.value = StoN2(w.substr(53,2));
		A_body.value = StoN2(w.substr(55,2));
		A_body_card.value = StoN2(w.substr(57,2));
		A_shoulder.value = StoN2(w.substr(59,2));
		A_shoulder_card.value = StoN2(w.substr(61,2));
		A_shoes.value = StoN2(w.substr(63,2));
		A_shoes_card.value = StoN2(w.substr(65,2));
		A_acces1.value = StoN2(w.substr(67,2));
		A_acces1_card.value = StoN2(w.substr(69,2));
		A_acces2.value = StoN2(w.substr(71,2));
		A_acces2_card.value = StoN2(w.substr(73,2));
		A_HEAD_DEF_PLUS.value = StoN2(w.substr(75,1));
		A_BODY_DEF_PLUS.value = StoN2(w.substr(76,1));
		A_SHOULDER_DEF_PLUS.value = StoN2(w.substr(77,1));
		A_SHOES_DEF_PLUS.value = StoN2(w.substr(78,1));
		var wn = StoN2(w.substr(79,1));
		A_youshi.checked = Math.floor(wn / 16);

		var max = StoN2(w.substr(80,1));
		for(var i=0;i<max;i++)
		{
			formElements["A_Skill" + i].value = StoN2(w.substr(81+i,1));
		}

		var index = max;
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_STR.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_AGI.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_INT.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_VIT.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_DEX.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_LUK.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_ATK.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_ATK_PERC.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_MATK.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_MATK_PERC.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_HIT.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_FLEE.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_DODGE.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_HP.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_SP.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_HP_PERC.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_SP_PERC.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_RANGED.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_DEF.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_MDEF.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_CRIT.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_RED_PERC.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_ASPD.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_ASPD_PERC.value = StoN2(w.substr(81+(index++),1));
		if (!(StoN2(w.substr(81+(index),1))===undefined)) document.calcForm.E_BOOST_CASTING.value = StoN2(w.substr(81+(index++),1));
		StCalc();

		calc();
	}
}
}
