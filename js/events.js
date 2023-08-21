function ToggleVisibility( id )
{ // Toggle BattleChant menu
	var element = document.getElementById( id );
	var state = element.style.display;
	
		  $("#"+id).fadeToggle();
	/*if ( state === 'block' )
	{
	console.log("LOL2?");
		// Hide the Character Section
		  $("#"+id).fadeToggle("slow", "linear", function() {
			//element.style.display = 'none';
		  });
		
	}
	else
	{
	console.log("LOL?");
		// Show the Character Section
	}*/
}

function TogglePassiveSkills()
{
	// Passive Skills toggled
	StAllCalc();
}

function ToggleAcolyteSkills( selectedItem )
{ // Acolyte Skills toggled
	// check for both pp change and revitalize on
	if ( selectedItem === 1 )
	{
		formElements["ppRevitalize"].value = 0;
	}
	else if ( selectedItem === 2 )
	{
		formElements["ppChange"].value = 0;
	}
	
	// calculate
	StAllCalc();
}

function TogglePerformerSkills()
{
	// Bard and Dancer skills toggled
	StAllCalc();
}

function ToggleGuildSkills()
{
	// Guild Skills Toggled
	StAllCalc();
}

function ToggleBattleChant()
{
	// Battle Chant Effect Toggled
	StAllCalc();
}

function ToggleOtherBuffs()
{
	// Other Buffs toggled
	StAllCalc();
}

function ToggleItems( selectedItem )
{ // toggle status Items & Food

	// check for vip buffs
	/*if ( selectedItem === 1 )
	{
		if ( formElements["vipBuff"].checked )
		{
			formElements["strFood"].value = 7;
			formElements["agiFood"].value = 7;
			formElements["vitFood"].value = 7;
			formElements["intFood"].value = 7;
			formElements["dexFood"].value = 7;
			formElements["lukFood"].value = 7;
		}
		else
		{
			formElements["strFood"].value = 0;
			formElements["agiFood"].value = 0;
			formElements["vitFood"].value = 0;
			formElements["intFood"].value = 0;
			formElements["dexFood"].value = 0;
			formElements["lukFood"].value = 0;
		}
	}*/
	
	StAllCalc();
}

function ToggleMiscEffects()
{
	// Misc. Effects toggled
	StAllCalc();
}

function ToggleBattleEffects()
{
	// toggle misc battle effects
	calc();
}

function ToggleMonsterDebuff()
{
	// toggle status (enemy) Debuff
	calc();
}

function ToggleMonsterBuff()
{
	// toggle status (enemy) Buff
	calc();
}

function ChangeJob( n )
{
	// Set new Job
	n_A_JobSet();
	n = n_A_JOB;

	// reset passive skills
	ResetPassiveSkills();
	for ( var i = 0; i<= 64; i++ )
	{
		selfBuffs[i] = 0;
	}
	
	// Adjust form elements
	AdjustJobLevelList( n );
	AdjustBaseLevelList( n );
	AdjustStatLists( n );
	AdjustSpeedPotList( n );
	AdjustWeaponTypeList( n );
	AdjustActiveSkillList( n );
	BuildPassiveSkillTable();

	{ // SNovi FullWeapon ASPD
		if(n_A_JOB != 20)
			SuperNoviceFullWeaponCHECK = 0;
		if(SuperNoviceFullWeaponCHECK)
			JobASPD[20][7] = 120;
		else
			JobASPD[20][7] = 0;
	}
	
	ClickWeaponType(0);
	ClickWeapon( 0,0 );
	ClickWeapon2( 0,0 );
	ClickShield( 0,0 );
	ClickGarment( 0,0 );
	ClickShoes( 0,0 );
	ClickArmor( 0,0 );
	ClickAcces( 0,0 );
	ClickHeadUp( 0,0 );
	// ClickShadowArmor( 0, 0 );
	ClickEquip( 0,0,11);
	ClickEquip( 0,0,12);
	ClickEquip( 0,0,13);
	ClickEquip( 0,0,14);
	ClickEquip( 0,0,15);
	ClickEquip( 0,0,16);

//	if(n_SaveMode == 0) // new
//		SetShortCut();
	document.forms["calcForm"].elements["saveName"].value = JobName[n_A_JOB][Language];
	
	// updated extended info
	PrepExtenededInfo();
	
	// disable adopted checkbox
	CheckAdoptedAvailability();
	
	// refresh selects
	$("select").trigger("chosen:updated");
}

function CheckAdoptedAvailability () {
    if ((n_A_JOB >= 0 && n_A_JOB <= 20) || (n_A_JOB >= 48 && n_A_JOB <= 70 && (n_A_JOB % 2) === 0 ) || (n_A_JOB === 73)) {
	$('#adoptedLabel').text('Adopted');
	$('#adoptedCheck').show();
    } else {
	$('#adoptedLabel').text('');
	$('#adoptedCheck').attr('checked', false);
	$('#adoptedCheck').hide();
    }
}

function PrepExtenededInfo()
{ // SetUp top-right menu
	wKK = parseInt(formElements["ExtendedInfo"].value);
	
	if ( wKK === 4 )
	{
		if ( n_A_JobSearch() == 6 || n_A_JOB == 20 )
		{
			var str = 'Gym Passes: <select id="GymPass" style="width:50px;" onchange="CalcExtendedInfo()"></select><br/>';
			str += SKILL_NAME[skill_ME_ENLARGE_WEIGHT_LIMIT][Language] + ': <select id="EnlargeWeightLimit" style="width:50px;" onchange="CalcExtendedInfo()"></select><br/>';
			myInnerHtml( "A_KakutyouSel", str, 0 );
			for ( var i = 0; i < 11; i++ )
			{
				formElements["EnlargeWeightLimit"].options[i] = new Option( i, i );
				formElements["GymPass"].options[i] = new Option( i, i );
			}
			formElements["EnlargeWeightLimit"].value = 0;
			formElements["GymPass"].value = 0;
		}
		else
		{
			var str = 'Gym Passes: <select name="GymPass" style="width:50px;" onchange="CalcExtendedInfo()"></select><br/>';
			myInnerHtml( "A_KakutyouSel", str,0);
			for ( var i = 0; i < 11; i++ )
			{
				formElements["GymPass"].options[i] = new Option( i, i );
			}
			formElements["GymPass"].value = 0;
		}
	}
	else if ( wKK === 10 )
	{
		var w;
		w = '<Font size="2">'+ GetWord(143) +'&nbsp;<input type="text" name="A_KakutyouSelNum" value="0" size=4 onChange="CalcExtendedInfo()" style="text-align : right;">%<BR>';
		w += GetWord(144) +'&nbsp;<input type="text" name="A_KakutyouSelNum2" value="0" size=4 onChange="CalcExtendedInfo()" style="text-align : right;">%<BR></Font><hr>';
		myInnerHtml("A_KakutyouSel",w,0);
	}
	
	CalcExtendedInfo();
}

function CalcExtendedInfo()
{ // calc top-right menu
	wKK = parseInt(formElements["ExtendedInfo"].value);
	if ( wKK === 0 )
	{ // Blank
		myInnerHtml( "A_KakutyouSel", "", 0 );
		myInnerHtml( "A_KakutyouData", "", 0 );
		return;
	}
	else if ( wKK === 1 )
	{
		myInnerHtml( "A_KakutyouSel", "", 0 );
		// Build Heal Value Table
		var healTable = '<table class="bgLtTable"><tr>';
		healTable += '<td class="bgLtRow3 padded optCaption">Heal 1</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHeal( 1, 0, 1 ) + "-" + CalcHeal( 1, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow3 padded optCaption">Heal 6</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHeal( 6, 0, 1 ) + "-" + CalcHeal( 6, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow3 padded optCaption">H. Heal 1</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHighHeal( 1, 0, 1 ) + "-" + CalcHighHeal( 1, 1, 1 ) + "</td>";
		healTable += "</tr><tr>";
		healTable += '<td class="bgLtRow4 padded optCaption">Heal 2</td>';
		healTable += '<td class="bgLtRow2 padded optArea">' + CalcHeal( 2, 0, 1 ) + "-" + CalcHeal( 2, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow4 padded optCaption">Heal 7</td>';
		healTable += '<td class="bgLtRow2 padded optArea">' + CalcHeal( 7, 0, 1 ) + "-" + CalcHeal( 7, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow4 padded optCaption">H. Heal 2</td>';
		healTable += '<td class="bgLtRow2 padded optArea">' + CalcHighHeal( 2, 0, 1 ) + "-" + CalcHighHeal( 2, 1, 1 ) + "</td>";
		healTable += "</tr><tr>";
		healTable += '<td class="bgLtRow3 padded optCaption">Heal 3</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHeal( 3, 0, 1 ) + "-" + CalcHeal( 3, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow3 padded optCaption">Heal 8</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHeal( 8, 0, 1 ) + "-" + CalcHeal( 8, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow3 padded optCaption">H. Heal 3</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHighHeal( 3, 0, 1 ) + "-" + CalcHighHeal( 3, 1, 1 ) + "</td>";
		healTable += "</tr><tr>";
		healTable += '<td class="bgLtRow4 padded optCaption">Heal 4</td>';
		healTable += '<td class="bgLtRow2 padded optArea">' + CalcHeal( 4, 0, 1 ) + "-" + CalcHeal( 4, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow4 padded optCaption">Heal 9</td>';
		healTable += '<td class="bgLtRow2 padded optArea">' + CalcHeal( 9, 0, 1 ) + "-" + CalcHeal( 9, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow4 padded optCaption">H. Heal 4</td>';
		healTable += '<td class="bgLtRow2 padded optArea">' + CalcHighHeal( 4, 0, 1 ) + "-" + CalcHighHeal( 4, 1, 1 ) + "</td>";
		healTable += "</tr><tr>";
		healTable += '<td class="bgLtRow3 padded optCaption">Heal 5</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHeal( 5, 0, 1 ) + "-" + CalcHeal( 5, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow3 padded optCaption">Heal 10</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHeal( 10, 0, 1 ) + "-" + CalcHeal( 10, 1, 1 ) + "</td>";
		healTable += '<td class="bgLtRow3 padded optCaption">H. Heal 5</td>';
		healTable += '<td class="bgLtRow1 padded optArea">' + CalcHighHeal( 5, 0, 1 ) + "-" + CalcHighHeal( 5, 1, 1 ) + "</td>";
		healTable += "</tr></table>";
		healTable += GetWord(141) + "+" + ( 5 - ( n_A_BaseLV + n_A_INT ) %5 ) + ".<br/>";
		healTable += "Coluseo Heal. assuming Heal Level 10: " + CalcHeal( 10, 0, 1 ) + "-" + CalcHeal( 10, 1, 1 ) + ".<br/>";
		healTable += "Total of " + (healMultiplier-100) + "% of heal power boost from base.";
		
		// Post Data
		myInnerHtml( "A_KakutyouData", healTable, 0 );
	}
	else if ( wKK === 2 )
	{ // Increase HP recovery
		if ( n_A_JobSearch() === cls_SWO || n_A_JOB === cls_SNOVI || n_A_JOB === cls_ENOVI )
		{
			var hpRecoveryTable = '<table class="bgLtTable"><tr>';
			hpRecoveryTable += '<td class="bgLtRow3 padded optCaption">Level 1</td>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 1 ) + "</td>";
			hpRecoveryTable += '<td class="bgLtRow3 padded optCaption">Level 6</td>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 6 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<td class="bgLtRow4 padded optCaption">Level 2</td>';
			hpRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 2 ) + "</td>";
			hpRecoveryTable += '<td class="bgLtRow4 padded optCaption">Level 7</td>';
			hpRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 7 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<td class="bgLtRow3 padded optCaption">Level 3</td>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 3 ) + "</td>";
			hpRecoveryTable += '<td class="bgLtRow3 padded optCaption">Level 8</td>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 8 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<td class="bgLtRow4 padded optCaption">Level 4</td>';
			hpRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 4 ) + "</td>";
			hpRecoveryTable += '<td class="bgLtRow4 padded optCaption">Level 9</td>';
			hpRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 9 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<td class="bgLtRow3 padded optCaption">Level 5</td>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 5 ) + "</td>";
			hpRecoveryTable += '<td class="bgLtRow3 padded optCaption">Level 10</td>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 5 + n_A_MaxHP / 500 ) * 10 ) + "</td>";
			hpRecoveryTable += "</tr></table>";
			
			// Post Data
			myInnerHtml( "A_KakutyouSel", "", 0 );
			myInnerHtml( "A_KakutyouData", hpRecoveryTable, 0 );
		}
		else if ( n_A_JobSearch2() === cls_MON )
		{
			var hpRecoveryTable = '<table class="bgLtTable"><tr>';
			hpRecoveryTable += '<th class="bgLtRow3 padded optCaption">Spiritual Cadence Level 1</th>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( n_A_MaxHP / 500 ) + 4 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<th class="bgLtRow4 padded optCaption">Spiritual Cadence Level 2</th>';
			hpRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( n_A_MaxHP / 250 ) + 8 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<th class="bgLtRow3 padded optCaption">Spiritual Cadence Level 3</th>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( n_A_MaxHP / 166 ) + 12 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<th class="bgLtRow4 padded optCaption">Spiritual Cadence Level 4</th>';
			hpRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( n_A_MaxHP / 125 ) + 16 ) + "</td>";
			hpRecoveryTable += "</tr><tr>";
			hpRecoveryTable += '<th class="bgLtRow3 padded optCaption">Spiritual Cadence Level 5</th>';
			hpRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( n_A_MaxHP / 100 ) + 20 ) + "</td>";
			hpRecoveryTable += "</tr></table>";
			
			// Post Data
			myInnerHtml( "A_KakutyouSel", "", 0 );
			myInnerHtml( "A_KakutyouData", hpRecoveryTable, 0 );
		}
		else
		{
			myInnerHtml( "A_KakutyouSel", GetWord(142), 0 );
			myInnerHtml( "A_KakutyouData", "", 0 );
		}
	}
	else if ( wKK === 3 )
	{ // Increase SP recovery
		if ( n_A_JobSearch() === cls_MAG || n_A_JobSearch2() === cls_PRI ||
			 n_A_JOB === cls_SNOVI || n_A_JOB === cls_ENOVI || n_A_JOB === cls_NIN )
		{
			var spRecoveryTable = '<table class="bgLtTable"><tr>';
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Level 1</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 1 ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Level 6</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 6 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Level 2</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 2 ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Level 7</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 7 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Level 3</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 3 ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Level 8</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 8 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Level 4</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 4 ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Level 9</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 9 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Level 5</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 5 ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Level 10</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( 3 + n_A_MaxSP / 500 ) * 10 ) + "</td>";
			spRecoveryTable += "</tr></table>";
			
			// Post Data
			myInnerHtml( "A_KakutyouSel", "", 0 );
			myInnerHtml( "A_KakutyouData", spRecoveryTable, 0 );
		}
		else if ( n_A_JobSearch2() === cls_MON )
		{
			var spRecoveryTable = '<table class="bgLtTable"><tr>';
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Spiritual Cadence Level 1</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( n_A_MaxSP / 500 ) + 2 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Spiritual Cadence Level 2</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( n_A_MaxSP / 250 ) + 4 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Spiritual Cadence Level 3</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( n_A_MaxSP / 166 ) + 6 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Spiritual Cadence Level 4</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( ( n_A_MaxSP / 125 ) + 8 ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Spiritual Cadence Level 5</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( ( n_A_MaxSP / 100 ) + 10 ) + "</td>";
			spRecoveryTable += "</tr></table>";
			
			// Post Data
			myInnerHtml( "A_KakutyouSel", "", 0 );
			myInnerHtml( "A_KakutyouData", spRecoveryTable, 0 );
		}
		else if ( n_A_JOB === cls_MIN || n_A_JOB === cls_MINt ||
			 	  n_A_JOB === cls_WAN || n_A_JOB === cls_WANt )
		{
			var spRecoveryTable = '<table class="bgLtTable"><tr>';
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Voice Lessons 1</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( 3 + ( 3 * 1 ) ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Voice Lessons 6</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( 3 + ( 3 * 6 ) ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Voice Lessons 2</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( 3 + ( 3 * 2 ) ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Voice Lessons 7</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( 3 + ( 3 * 7 ) ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Voice Lessons 3</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( 3 + ( 3 * 3 ) ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Voice Lessons 8</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( 3 + ( 3 * 8 ) ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Voice Lessons 4</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( 3 + ( 3 * 4 ) ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow4 padded optCaption">Voice Lessons 9</th>';
			spRecoveryTable += '<td class="bgLtRow2 padded optArea">' + Math.floor( 3 + ( 3 * 9 ) ) + "</td>";
			spRecoveryTable += "</tr><tr>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Voice Lessons 5</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( 3 + ( 3 * 5 ) ) + "</td>";
			spRecoveryTable += '<th class="bgLtRow3 padded optCaption">Voice Lessons 10</th>';
			spRecoveryTable += '<td class="bgLtRow1 padded optArea">' + Math.floor( 3 + ( 3 * 10 ) ) + "</td>";
			spRecoveryTable += "</tr></table>";
			
			// Post Data
			myInnerHtml( "A_KakutyouSel", "", 0 );
			myInnerHtml( "A_KakutyouData", spRecoveryTable, 0 );
		}
		else
		{
			myInnerHtml( "A_KakutyouSel", GetWord(142), 0 );
			myInnerHtml( "A_KakutyouData", "", 0 );
		}
	}
	else if ( wKK === 4 )
	{ // Weight Limit
		var jobWeightTable =[   0, 800, 400, 400, 600, 200, 800, 800, 400, 600, //  0- 9
							  700, 400,1000, 800, 400, 600, 700, 700, 400,1000, // 10-19
							    0, 800, 400, 600, 700, 400,1000, 800, 400, 600, // 20-29
							  700, 700, 400,1000,   0, 800, 400, 400, 600, 200, // 30-39
							  800, 800, 800, 400, 600, 800,1500,1500,1200,1200, // 40-49
							 1000,1000,1200,1200,1000,1000,1800,1800,1500,1500, // 50-59
							  800, 800,1000,1000,1200,1200,1200,1200,1000,1000, // 60-69
							 1200,1200, 600, 0];
		var weightLimit = 2000 + jobWeightTable[n_A_JOB];
		var EquipKG = 0;
		var cartWeight = 8000;

		// babies don't get the bonus
		if ( formElements["A_youshi"].checked )
		{
			weightLimit = 2000;
		}
		
		// Increase weight limit by base strength
		weightLimit += parseInt(formElements["A_STR"].value) * 30;
		
		// Riding a peco or dragon increases weight limit
		if ( SkillSearch( skill_KN_CAVALIER_MASTERY ) )//|| SkillSearch( skill_RUN_DRAGON_TRAINING ) )
		{
			weightLimit += 1000;
		}
		else if ( SkillSearch( skill_RUN_DRAGON_TRAINING ) )
		{
			weightLimit += 500 + ( SkillSearch( skill_RUN_DRAGON_TRAINING ) * 200 );
		}

		// Increase Weight Limit skill
		if( n_A_JobSearch() === 6 || n_A_JOB === 20 )
		{
			weightLimit += parseInt(formElements["EnlargeWeightLimit"].value) * 200;
		}
		
		// Gym Passes
		weightLimit += parseInt(formElements["GymPass"].value) * 200;
		
		// Cart Remodeling
		if ( n_A_JOB == 70 || n_A_JOB == 71 )
		{
			cartWeight += SkillSearch( skill_GEN_CART_REMODELING ) * 500;
		}
		
		// Calculate current weight from equips
		EquipKG = 0;
		for ( var i = 0; i < 11; i++ )
		{
			EquipKG += ItemOBJ[n_A_Equip[i]][6];
		}
		
		// build table
		var weightLimitTable = '<table class="bgLtTable"><tr>';
		weightLimitTable += '<th class="bgLtRow4 padded optCaption">' + GetWord(146) + "</th>";
		weightLimitTable += '<td class="bgLtRow2 padded optArea">' + weightLimit + "</td>";
		weightLimitTable += "</tr><tr>";
		weightLimitTable += '<th class="bgLtRow3 padded optCaption">' + GetWord(147) + "</th>";
		weightLimitTable += '<td class="bgLtRow1 padded optArea">' + EquipKG + "</td>";
		if ( n_A_JobSearch() === 6 || n_A_JOB === 20 )
		{
			weightLimitTable += "</tr><tr>";
			weightLimitTable += '<th class="bgLtRow4 padded optCaption">' + GetWord(252) + "</th>";
			weightLimitTable += '<td class="bgLtRow2 padded optArea">' + cartWeight + "</td>";
		}
		weightLimitTable += "</tr></table>";
		
		// Post Data
		myInnerHtml( "A_KakutyouData", weightLimitTable, 0 );
	}
	else if ( wKK === 5 )
	{ // Elemental Resistance
		var innerStr = new Array();
		
		// Neutral, Water, Earth, Fire, Wind, Poison, Holy, Dark, Ghost, Undead
		for ( var i = 0; i <= 9; i++ )
		{
			if ( n_A_zokusei[i] == 100 )
			{
				wkk6a = "<b>";
				wkk6b = "</b>";
			}
			if ( n_A_zokusei[i] < 100 )
			{
				wkk6a = "<font color=blue><b>";
				wkk6b = "</b></font>";
			}
			if ( n_A_zokusei[i] > 100 )
			{
				wkk6a = "<font color=red><b>";
				wkk6b = "</b></font>";
			}

			innerStr[i] = wkk6a + n_A_zokusei[i] + " %" + wkk6b;
		}		
		
		var elementResistTable = '<table class="bgLtTable"><tr>';
		elementResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + ZokuseiOBJ[0][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[0] + "</td>";
		elementResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + ZokuseiOBJ[5][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[5] + "</td>";
		elementResistTable += "</tr><tr>";
		elementResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + ZokuseiOBJ[1][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[1] + "</td>";
		elementResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + ZokuseiOBJ[6][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[6] + "</td>";
		elementResistTable += "</tr><tr>";
		elementResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + ZokuseiOBJ[2][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[2] + "</td>";
		elementResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + ZokuseiOBJ[7][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[7] + "</td>";
		elementResistTable += "</tr><tr>";
		elementResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + ZokuseiOBJ[3][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[3] + "</td>";
		elementResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + ZokuseiOBJ[8][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[8] + "</td>";
		elementResistTable += "</tr><tr>";
		elementResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + ZokuseiOBJ[4][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[4] + "</td>";
		elementResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + ZokuseiOBJ[9][Language] + "</b></th>";
		elementResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[9] + "</td>";
		elementResistTable += "</tr></table>";
		
		// Post Data
		myInnerHtml( "A_KakutyouSel", "", 0 );
		myInnerHtml( "A_KakutyouData", elementResistTable, 0 );
	}
	else if ( wKK === 6 )
	{ // Race Resistance
		var innerStr = new Array();
		
		// Formless, Undead, Brute, Plant, Insect, Fish, Demon, Demi-Human, Angel, Dragon
		for ( var i = 50; i <= 59; i++ )
		{
			if ( n_tok[i] == 0 )
			{
				wkk6a = "<b>";
				wkk6b = "</b>";
			}
			if ( n_tok[i] > 0 )
			{
				wkk6a = "<font color=blue><b>";
				wkk6b = "</b></font>";
			}
			if ( n_tok[i] < 0 )
			{
				wkk6a = "<font color=red><b>";
				wkk6b = "</b></font>";
			}
			innerStr[i - 50] = wkk6a + n_tok[i] +" %" + wkk6b;
		}
		
		var raceResistTable = '<table class="bgLtTable"><tr>';
		raceResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SyuzokuOBJ[0][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[0] + "</td>";
		raceResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SyuzokuOBJ[5][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[5] + "</td>";
		raceResistTable += "</tr><tr>";
		raceResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + SyuzokuOBJ[1][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[1] + "</td>";
		raceResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + SyuzokuOBJ[6][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[6] + "</td>";
		raceResistTable += "</tr><tr>";
		raceResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SyuzokuOBJ[2][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[2] + "</td>";
		raceResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SyuzokuOBJ[7][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[7] + "</td>";
		raceResistTable += "</tr><tr>";
		raceResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + SyuzokuOBJ[3][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[3] + "</td>";
		raceResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + SyuzokuOBJ[8][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[8] + "</td>";
		raceResistTable += "</tr><tr>";
		raceResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SyuzokuOBJ[4][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[4] + "</td>";
		raceResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SyuzokuOBJ[9][Language] + "</b></th>";
		raceResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[9] + "</td>";
		raceResistTable += "</tr></table>";
		
		// Post Data
		myInnerHtml( "A_KakutyouSel", "", 0 );
		myInnerHtml( "A_KakutyouData", raceResistTable, 0 );
	}
	else if ( wKK === 7 )
	{ // Status Resistance
		var statusResistData = new Array();
		
		// calculate status resistance for:
		// AGI
		statusResistData[5] = Math.floor( n_A_AGI * 100 ) / 100; // Sleep
		statusResistData[8] = Math.floor( n_A_AGI * 100 ) / 100; // Bleeding
		// VIT
		statusResistData[0] = Math.floor( n_A_VIT * 100 ) / 100; // Poison
		statusResistData[1] = Math.floor( n_A_VIT * 100 ) / 100; // Stun
		// INT
		statusResistData[4] = Math.floor( n_A_INT * 100 ) / 150; // Blind
		statusResistData[6] = Math.floor( n_A_INT * 100 ) / 100; // Silence
		statusResistData[7] = Math.floor( n_A_INT * 100 ) / 150; // Chaos
		// LUK
		statusResistData[3] = Math.floor( n_A_LUK * 100 ) / 100; // Curse
		
		// MDEF
		statusResistData[2] = Math.floor( n_A_MDEF * 100 ) / 100; // Freeze
		statusResistData[9] = Math.floor( n_A_MDEF * 100 ) / 100; // Stone
		
		// additional modifiers
		if ( n_A_LUK == 0 )
		{
			statusResistData[3] = 100;
		}
		if ( n_A_BodyZokusei == ele_UNDEAD )
		{
			statusResistData[2] = 100;
			statusResistData[8] = 100;
			statusResistData[9] = 100;
		}
		for ( var i = 0; i <= 9; i++ )
		{
			statusResistData[i] = Math.floor( ( statusResistData[i] + n_tok[150+i] ) );
			statusResistData[i] = Math.min(100, Math.floor( statusResistData[i] * 100 ) / 100);
		}

		// Format strings
		for ( var i = 0; i <= 9; i++ )
		{
			statusResistData[i] += "%"; // Value
		}
		
		// Build table
		var statusResistTable = '<table class="bgLtTable"><tr>';
		statusResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + AilmentsOBJ[0][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow1 padded optArea">' + statusResistData[0] + "</td>";
		statusResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + AilmentsOBJ[5][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow1 padded optArea">' + statusResistData[5] + "</td>";
		statusResistTable += "</tr><tr>";
		statusResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + AilmentsOBJ[1][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow2 padded optArea">' + statusResistData[1] + "</td>";
		statusResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + AilmentsOBJ[6][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow2 padded optArea">' + statusResistData[6] + "</td>";
		statusResistTable += "</tr><tr>";
		statusResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + AilmentsOBJ[2][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow1 padded optArea">' + statusResistData[2] + "</td>";
		statusResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + AilmentsOBJ[7][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow1 padded optArea">' + statusResistData[7] + "</td>";
		statusResistTable += "</tr><tr>";
		statusResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + AilmentsOBJ[3][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow2 padded optArea">' + statusResistData[3] + "</td>";
		statusResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + AilmentsOBJ[8][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow2 padded optArea">' + statusResistData[8] + "</td>";
		statusResistTable += "</tr><tr>";
		statusResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + AilmentsOBJ[4][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow1 padded optArea">' + statusResistData[4] + "</td>";
		statusResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + AilmentsOBJ[9][Language] + "</b></th>";
		statusResistTable += '<td class="bgLtRow1 padded optArea">' + statusResistData[9] + "</td>";
		statusResistTable += "</tr></table>";
		
		statusResistTable += GetWord(149);
		
		// Post Data
		myInnerHtml( "A_KakutyouSel", "", 0 );
		myInnerHtml( "A_KakutyouData", statusResistTable, 0 );
	}
	else if ( wKK === 8 )
	{ // Other Resistance
		var innerStr = new Array();

		for ( var i = 77; i <= 79; i++ )
		{ // Boss, LongRange, Normal
			if ( n_tok[i] == 0 )
			{
				wkk6a = "<b>";
				wkk6b = "</b>";
			}
			if ( n_tok[i] > 0 )
			{
				wkk6a = "<font color=blue><b>";
				wkk6b = "</b></font>";
			}
			if ( n_tok[i] < 0 )
			{
				wkk6a = "<font color=red><b>";
				wkk6b = "</b></font>";
			}
			innerStr[i - 77] = wkk6a + n_tok[i] + "%" + wkk6b;
		}

		for ( var i = 190; i <= 192; i++ )
		{ // Small, Medium, Large
			if ( n_tok[i] == 0 )
			{
				wkk6a = "<b>";
				wkk6b = "</b>";
			}
			if ( n_tok[i] > 0 )
			{
				wkk6a = "<font color=blue><b>";
				wkk6b = "</b></font>";
			}
			if  ( n_tok[i] < 0 )
			{
				wkk6a = "<font color=red><b>";
				wkk6b = "</b></font>";
			}
			innerStr[i + 3 - 190] = wkk6a + n_tok[i] + "%" + wkk6b;
		}

		var otherResistTable = '<table class="bgLtTable"><tr>';
		otherResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + GetWord(150) + "</b></th>";
		otherResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[0] + "</td>";
		otherResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SizeOBJ[0][Language] + "</b></th>";
		otherResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[3] + "</td>";
		otherResistTable += "</tr><tr>";
		otherResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + GetWord(151) + "</b></th>";
		otherResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[1] + "</td>";
		otherResistTable += '<th class="bgLtRow4 padded optCaption"><b>' + SizeOBJ[1][Language] + "</b></th>";
		otherResistTable += '<td class="bgLtRow2 padded optArea">' + innerStr[4] + "</td>";
		otherResistTable += "</tr><tr>";
		otherResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + GetWord(152) + "</b></th>";
		otherResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[2] + "</td>";
		otherResistTable += '<th class="bgLtRow3 padded optCaption"><b>' + SizeOBJ[2][Language] + "</b></th>";
		otherResistTable += '<td class="bgLtRow1 padded optArea">' + innerStr[5] + "</td>";
		otherResistTable += "</tr></table>";
		
		// Post Data
		myInnerHtml( "A_KakutyouSel", "", 0 );
		myInnerHtml( "A_KakutyouData", otherResistTable, 0 );
	}
	else if ( wKK == 9 )
	{ // Cast time and Delay
		var fixedCast = ( fixedCastTime * 100 ) + "%";
		var varCast = Math.round(variableCastTime * 10000 ) / 100 + "%";
		var delay = ( 100 - globalCastDelay ) + "%";
		var cooldown = ( reuseDelay * 100 ) + "%";
		
		// build table
		var castTimeTable = '<table class="bgLtTable"><tr>';
		castTimeTable += '<th class="bgLtRow4 padded optCaption">' + GetWord(254) + "</th>";
		castTimeTable += '<td class="bgLtRow2 padded optArea">' + fixedCast + "</td>";
		castTimeTable += "</tr><tr>";
		castTimeTable += '<th class="bgLtRow3 padded optCaption">' + GetWord(255) + "</th>";
		castTimeTable += '<td class="bgLtRow1 padded optArea">' + varCast + "</td>";
		castTimeTable += "</tr><tr>";
		castTimeTable += '<th class="bgLtRow4 padded optCaption">' + GetWord(155) + "</th>";
		castTimeTable += '<td class="bgLtRow2 padded optArea">' + delay + "</td>";
		castTimeTable += "</tr><tr>";
		castTimeTable += '<th class="bgLtRow3 padded optCaption">' + GetWord(256) + "</th>";
		castTimeTable += '<td class="bgLtRow1 padded optArea">' + cooldown + "</td>";
		castTimeTable += "</tr></table>";
		
		// Post Data
		myInnerHtml( "A_KakutyouSel", "", 0 );
		myInnerHtml( "A_KakutyouData", castTimeTable, 0 );
	}
	else if ( wKK == 10 )
	{ // Experience
		var NowBaseExp = !isNaN(document.calcForm.A_KakutyouSelNum.value) ? document.calcForm.A_KakutyouSelNum.value : 0;
		var NowJobExp = !isNaN(document.calcForm.A_KakutyouSelNum2.value) ? document.calcForm.A_KakutyouSelNum2.value : 0;
		var JobType=0; // Novi
		var MaxBaseLV = 0;
		if(n_A_JOB == cls_HNOV)
			JobType = 1; // HNovi
		if((1 <= n_A_JOB && n_A_JOB <= 6) || n_A_JOB == 41 || n_A_JOB == 20)
			JobType = 2; // First Jobs (non GS/Nin)
		else if((35 <= n_A_JOB && n_A_JOB <= 40))
			JobType = 3; // First Trans Jobs
		else if((7 <= n_A_JOB && n_A_JOB <= 19) || n_A_JOB == 43)
			JobType = 4; // 2nd jobs
		else if(21 <= n_A_JOB && n_A_JOB<=33)
			JobType = 5; // 2nd trans jobs
		else if(n_A_JOB == 42)
			JobType = 7; // TKM
		else if(n_A_JOB == 44 || n_A_JOB == 45)
			JobType = 6; // Nin & GS
		else if(46 <= n_A_JOB && n_A_JOB <= 74)
			JobType = 8; // 3rd Cls
		
		if (n_A_JOB >= 0 && n_A_JOB <= 45)
			MaxBaseLV = CONST_MAXLVL;
		if (n_A_JOB >= 46 && n_A_JOB <= 71)
			MaxBaseLV = CONST_MAXLVL_THIRD;
		if (n_A_JOB >= 72)
			MaxBaseLV = CONST_MAXLVL_KAGOB_ENOVI;
		
		NowBaseExp = Math.floor(PC_BaseExp[rebirthClass][n_A_BaseLV] * NowBaseExp / 100);

		var wkk11;
		wkk11 = "<Font size=2>Base EXP points needed to reach next level: <B>"+ Kanma(PC_BaseExp[rebirthClass][n_A_BaseLV] - NowBaseExp) +"</B><br/>";

		var MonsterNum=0;
		var OneCheck = 0;
		if ( n_B[en_BASEEXP] !== 0 )
		{
			for ( var i = n_A_BaseLV; i < MaxBaseLV; i++ )
			{
				var LvUpExp = PC_BaseExp[rebirthClass][i];
				var expDiff = LvUpExp - NowBaseExp;
				var monsterExpWithLvlMod = n_B[en_BASEEXP]; //EXP is already modded
				var w1;
				
				if (expDiff / monsterExpWithLvlMod >= 1) { //If monsterEXP is greater than needed EXP then force 1, otherwise calc
				    w1 = Math.floor( expDiff / monsterExpWithLvlMod );
				
				    if ((expDiff / monsterExpWithLvlMod) - Math.floor(expDiff / monsterExpWithLvlMod) > 0) { //If there's overflowing EXP, count 1 more
					w1++;
				    }
				} else {
				    w1 = 1;
				}
				
				MonsterNum += w1;
				NowBaseExp += w1 * monsterExpWithLvlMod;

//				while ( NowBaseExp < LvUpExp )
//				{
//					NowBaseExp += n_B[en_BASEEXP];// * expModByLevelDiff(n_A_BaseLV,n_B[en_LEVEL]);
//					MonsterNum += 1
//				}
				
				if ( OneCheck === 0 ) //For the current level
				{
					OneCheck = 1;
					wkk11 += "You need to kill <B>" +Kanma(MonsterNum) + " " + n_B[en_CLASS] + "</B> to level up.<BR>";
				}
				
				NowBaseExp -= LvUpExp;
				if ( NowBaseExp > LvUpExp -1 )
				{
					NowBaseExp = LvUpExp -1;
				}
			}
			
			wkk11 += "To reach Base Lv." + MaxBaseLV + " you need to kill <B> "+ Kanma(MonsterNum) +"</B> " + n_B[en_CLASS] +GetWord(159)+".<BR>";
		}

		NowJobExp = Math.floor(PC_JobExp[JobType][n_A_JobLV] * NowJobExp / 100);
		if((JobType == 0 || JobType == 1) && n_A_JobLV == 10)
			NowJobExp = 0;
		else if((JobType == 2 || JobType == 3 || JobType == 4 || JobType == 7 || JobType == 8) && n_A_JOB != cls_SNOVI && n_A_JOB != cls_ENOVI && n_A_JobLV == 50)
			NowJobExp = 0;
		else if((JobType == 5 || JobType == 6) && n_A_JobLV == 70)
			NowJobExp = 0;
		else if ( ( n_A_JOB == cls_SNOVI || n_A_JOB === cls_ENOVI ) && n_A_JobLV == 99)
			NowJobExp = 0;

		wkk11 += "<hr>Job EXP points needed to reach next level: <B>"+ Kanma(PC_JobExp[JobType][n_A_JobLV] - NowJobExp) +"</B><br/>";

		MonsterNum=0;
		OneCheck = 0;
		if ( n_B[en_JOBEXP] != 0 )
		{
			//for(i=1;PC_JobExp[JobType][i]!=0;i++);
			//var MaxJobLV = i;
			var MaxJobLV = 50;//PC_JobExp[JobType].length-1
			if (n_A_JOB === 0 || n_A_JOB === 34) MaxJobLV = 10;
			if((n_A_JOB >= 1 && n_A_JOB <= 6) || n_A_JOB === 41)
				MaxJobLV = 50;
			if((n_A_JOB >= 21 && n_A_JOB <= 33) || (n_A_JOB >= 44 && n_A_JOB <= 45))
				MaxJobLV = 70;
			if (n_A_JOB === cls_SNOVI)
				MaxJobLV = 99;
			if (n_A_JOB >= 46 && n_A_JOB <= 71)
				MaxJobLV = 60;
			for(i=n_A_JobLV;i<MaxJobLV;i++)
			{
				var LvUpExp = PC_JobExp[JobType][i];
				var jExpDiff = LvUpExp - NowJobExp;
				var monsterJExpWithLvlMod = n_B[en_JOBEXP];
				/*var expReal = Math.floor(n_B[en_JOBEXP] * expModByLevelDiff(n_A_BaseLV,n_B[en_LEVEL])) + ((n_B[en_JOBEXP] * expModByLevelDiff(n_A_BaseLV,n_B[en_LEVEL])) % expReal != 0 ? 1 : 0);
				var w1 = Math.floor((LvUpExp - NowJobExp) / expReal) + ((LvUpExp - NowJobExp) % expReal != 0 ? 1 : 0);*/
				//var w1 = Math.floor((LvUpExp - NowJobExp) / n_B[en_JOBEXP] * expModByLevelDiff(n_A_BaseLV,n_B[en_JOBEXP]));
				var w1;
				
				if (jExpDiff / monsterJExpWithLvlMod >= 1) {
				    w1 = Math.floor( jExpDiff / monsterJExpWithLvlMod );
				
				    if ((jExpDiff / monsterJExpWithLvlMod) - Math.floor(jExpDiff / monsterJExpWithLvlMod) > 0) {
					w1++;
				    }
				} else {
				    w1 = 1;
				}
				
				MonsterNum += w1;
				NowBaseExp += w1 * monsterJExpWithLvlMod;
				//var b = Math.floor((LvUpExp - NowJobExp) / (a*1.0));
				//NowJobExp += b*a;
				/*while(NowJobExp < LvUpExp)
				{
					NowJobExp += n_B[en_JOBEXP];
					MonsterNum += 1
				}*/
				//MonsterNum += b;
				if(OneCheck === 0)
				{
					OneCheck = 1;
					wkk11 += "You need to kill <B>" + Kanma(MonsterNum) + " " + n_B[en_CLASS] +" </B>to level up.<BR>";
					//wkk11 += "(Equals <B>" + n_B[en_CLASS] +" "+ Kanma(MonsterNum) +"</B> "+ n_B[1] +" kill"+(Kanma(MonsterNum)!=1?"s":"")+GetWord(159)+")<BR>";
				}
				NowJobExp -= LvUpExp;
				if (NowJobExp < 0)  NowJobExp = 0;
				if(NowJobExp > LvUpExp -1)
					NowJobExp = LvUpExp -1;
			}
			wkk11 += "To reach Job Lv."+ MaxJobLV +" you need to kill<B> "+ Kanma(MonsterNum)+"</B> " + n_B[en_CLASS] +GetWord(159)+".<BR>";
			//wkk11 += "Until JobLv"+ MaxJobLV +": <B>"+ Kanma(MonsterNum) +"</B> more "+ n_B[1] +" kill"+(Kanma(MonsterNum)!=1?"s":"")+"<BR><BR>";
		}

		wkk11 += "</Font>";

		//myInnerHtml( "A_KakutyouSel", "", 0 );
		myInnerHtml( "A_KakutyouData", wkk11, 0 );
	}
}
function ClickEquip( data, isRefine, Type )
{
	let eq_id = ItemOBJ[n_A_Equip[Type]][itm_ID];
	let eq_ref = 0;
	let form_list = "";
	
	switch(Type)
	{
		case eq_WEAPON ://= 0;
			eq_ref = n_A_Weapon_ATKplus;
			form_list += "A_WEAPON_ENCHANT";
			break;
		case eq_WEAPONII ://= 1; 
			eq_ref = n_A_Weapon2_ATKplus;
			form_list += "";//TODO
			break;
		case eq_HEAD ://= 2;
			eq_ref = n_A_HEAD_DEF_PLUS;
			form_list += "A_HEAD_UPPER_ENCHANT";
			break;
		case eq_HEAD_MIDDLE ://= 3;
			eq_ref = 0;
			form_list += "";//TODO
			break;
		case eq_HEAD_LOWER ://= 4;
			eq_ref = 0;
			form_list += "";//TODO
			break;
		case eq_SHIELD ://= 5;
			eq_ref = n_A_LEFT_DEF_PLUS;
			form_list += "A_SHIELD_ENCHANT";
			break;
		case eq_ARMOR ://= 6;
			eq_ref = n_A_BODY_DEF_PLUS;
			form_list += "A_ARMOR_ENCHANT";
			break;
		case eq_GARMENT ://= 7;
			eq_ref = n_A_SHOULDER_DEF_PLUS;
			form_list += "A_GARMENT_ENCHANT";
			break;
		case eq_SHOES ://= 8;
			eq_ref = n_A_SHOES_DEF_PLUS;
			form_list += "A_SHOES_ENCHANT";
			break;
		case eq_ACCI ://= 9;
			eq_ref = 0;
			form_list += "A_ACCES1_ENCHANT";
			break;
		case eq_ACCII ://= 10;
			eq_ref = 0;
			form_list += "A_ACCES2_ENCHANT";
			break;
		case eq_SHADOW_ARMOR ://= 11;
			eq_ref = n_A_SHADOW_BODY_DEF_PLUS;
			form_list += "A_SHADOW_BODY_ENCHANT";//TODO
			break;
		case eq_SHADOW_WEAPON ://= 12;
			eq_ref = n_A_SHADOW_WEAPON_DEF_PLUS;
			form_list += "A_SHADOW_WEAPON_ENCHANT";//TODO
			break;
		case eq_SHADOW_SHIELD ://= 13;
			eq_ref = n_A_SHADOW_SHIELD_DEF_PLUS;
			form_list += "A_SHADOW_SHIELD_ENCHANT";//TODO
			break;
		case eq_SHADOW_SHOES ://= 14;
			eq_ref = n_A_SHADOW_SHOES_DEF_PLUS;
			form_list += "A_SHADOW_SHOES_ENCHANT";//TODO
			break;
		case eq_SHADOW_EARRING ://= 15;
			eq_ref = n_A_SHADOW_EARRING_DEF_PLUS;
			form_list += "A_SHADOW_EARRING_ENCHANT";//TODO
			break;
		case eq_SHADOW_PENDANT ://= 16;
			eq_ref = n_A_SHADOW_PENDANT_DEF_PLUS;
			form_list += "A_SHADOW_PENDANT_ENCHANT";//TODO
			break;
		default : 
			eq_ref = 0;
			break;
	}
	
	if(isRefine)
	{
		eq_ref = data;
	}
	else
	{
		eq_id = data;
	}
	if(Type < eq_SHADOW_ARMOR)
	{
		if(ItemOBJ[eq_id][itm_ENCH_SLOT_4] != 0 && !isRefine)
		{
			CleanEnchant(form_list);
			formElements[form_list + "_4"].disabled = false;
			for ( var i = 0; EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_4]][i] != "NULL" && !isRefine; i++ )
			{
				formElements[form_list + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_4]][i]][1],EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_4]][i]][0]);
			}
		}
		if(ItemOBJ[eq_id][itm_ENCH_SLOT_3] != 0 && !isRefine)
		{
			formElements[form_list + "_3"].disabled = false;
			for ( var i = 0; EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_3]][i] != "NULL" && !isRefine; i++ )
			{
				formElements[form_list + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_3]][i]][1],EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_3]][i]][0]);
			}
		}
		if(ItemOBJ[eq_id][itm_ENCH_SLOT_2] != 0 && !isRefine)
		{
			formElements[form_list + "_2"].disabled = false;
			for ( var i = 0; EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_2]][i] != "NULL" && !isRefine; i++ )
			{
				formElements[form_list + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_2]][i]][1],EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_2]][i]][0]);
			}
		}
		if(eq_id == 1523  && !isRefine)
		{// Bible of Promise (1st Vol.)
			CleanEnchant("A_SHIELD_ENCHANT");
			SetEnchant("A_SHIELD_ENCHANT",0,50,0);
		}
		if(form_list != "")
		{
			// refresh selects
			$("#"+form_list+"_2").trigger("chosen:updated");
			$("#"+form_list+"_3").trigger("chosen:updated");
			$("#"+form_list+"_4").trigger("chosen:updated");
		}
	}
	else
	{
		// if(ItemOBJ[eq_id][itm_ENCH_SLOT_4] != 0 && !isRefine)
		if(!isRefine)
		{
			CleanShadowEnchant(form_list);
			if(ItemOBJ[eq_id][itm_ENCH_SLOT_4] != 0)
				formElements[form_list].disabled = false;
			for ( var i = 0; EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_4]][i] != "NULL" && !isRefine; i++ )
			{
				formElements[form_list].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_4]][i]][1],EnchantOBJ[EnchantListOBJ[ItemOBJ[eq_id][itm_ENCH_SLOT_4]][i]][0]);
			}
		}
		$("#"+form_list).trigger("chosen:updated");
	}

}
function ClickWeapon( data,isRefine )
{
	// console.log("data = " + data + " /isRefine = " + isRefine);
	var weapon = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_ID];
	var weapon_ref = n_A_Weapon_ATKplus;
	if(isRefine)
	{
		weapon_ref = data;
	}
	else
	{
		weapon = data;
	}

	// if(!isRefine)
	// {
		// CleanEnchant("A_WEAPON_ENCHANT");
		// var len = formElements["A_WEAPON_ENCHANT_2"].length;
		// for ( var i = len; i > 0 ; i-- )
		// {
			// formElements["A_WEAPON_ENCHANT_2"].options[i] = null;
		// }
		// len = formElements["A_WEAPON_ENCHANT_3"].length;
		// for ( var i = len; i > 0 ; i-- )
		// {
			// formElements["A_WEAPON_ENCHANT_3"].options[i] = null;
		// }
		// len = formElements["A_WEAPON_ENCHANT_4"].length;
		// for ( var i = len; i > 0 ; i-- )
		// {
			// formElements["A_WEAPON_ENCHANT_4"].options[i] = null;
		// }
	// }

	
	if (/*Daggers*/weapon== 390 || weapon== 391 || weapon== 392 || weapon== 387 || weapon== 13 || weapon== 394 || weapon== 396 || weapon== 14 || weapon== 15 || weapon== 389 || weapon== 397 || weapon== 398 || weapon== 799 || weapon== 1157 || weapon== 1267 || weapon== 12 || weapon== 393 || weapon== 11 || weapon== 388 || weapon== 607 || weapon== 395 || weapon== 1268 || 
		/*Katars*/ weapon== 113 || weapon== 482 || weapon== 483 || weapon== 631 || weapon== 632 || weapon== 633 || weapon== 634 || weapon== 1175 || weapon== 1176 ||
		/*One Handed Axes*/weapon== 415 || weapon== 1164 || 
		/*Two Handed Axes*/weapon== 68 || weapon== 69 || weapon== 70 || weapon== 416 || weapon== 417 || weapon== 418 || weapon== 419 || weapon== 621 ||  weapon== 623 || weapon== 624 || weapon== 1166 || weapon== 1167 ||
		/*One Handed Swords*/ weapon== 31 || weapon== 32 || weapon== 33 || weapon== 34 || weapon== 35 || weapon== 36 || weapon== 399 || weapon== 400 || weapon== 401 || weapon== 402 || weapon== 403 || weapon== 404 || weapon== 470 || weapon== 1158 || weapon== 1274 ||
		/*Two Handed Swords*/ weapon== 43 || weapon== 44 || weapon== 45 || weapon== 46 || weapon== 47 || weapon== 405 || weapon== 406 || weapon== 614 || weapon== 615 || weapon== 819 || weapon== 934 || weapon== 935 || weapon== 940 || weapon== 1159 || weapon== 1275 ||
		/*One Handed Spears*/ weapon== 52 || weapon== 408 || weapon== 409 || weapon== 410 || weapon== 616 || weapon== 617 || weapon== 618 || weapon== 1269 || 
		/*Two Handed Spears*/weapon== 59 || weapon== 60 || weapon== 411 || weapon== 412 || weapon== 413 || weapon== 414 || weapon== 471 || weapon== 619 || weapon== 620 || weapon== 942 || weapon== 1289/*2 ahlspiess??*/ || 
		/*One Handed Staves*/weapon== 478 || weapon== 863 || weapon== 936 || weapon== 948 || weapon== 1041 || weapon== 1168 || weapon== 1292 || weapon== 1881 || weapon== 1884 ||
		/*Two Handed Staves*/weapon== 92 || weapon== 646 || weapon== 647 || weapon== 1172 || weapon== 1173 || 
		/*Maces*/weapon== 81 || weapon== 82 || weapon== 83 || weapon== 420 || weapon== 421 || weapon== 422 || weapon== 820 || weapon== 1162 || weapon== 1163 || weapon== 1276 || weapon== 2357 || 
		/*Books*/ weapon== 121 || weapon== 122 || weapon== 485 || weapon== 486 || weapon== 641 ||
		/*Knuckles*/weapon== 423 || weapon== 424 || weapon== 487 || weapon== 1291 /*2 Sura's Rampage?*/||  weapon== 1496 ||
		/*Bows*/weapon== 102 || weapon== 103 || weapon== 104 || weapon== 479 || weapon== 821 || weapon== 945 || weapon== 946 || weapon== 1174 || weapon== 1273 || 
		/*Instruments*/weapon== 451 || weapon== 492 || weapon== 649 || weapon== 950 || weapon== 1270 || 
		/*Whips*/ weapon== 141 || weapon== 425 || weapon== 426 || weapon== 498 || weapon== 499 || weapon== 650 || weapon== 652 || weapon== 653 || weapon== 951 || weapon== 1271 || weapon== 1272 
		)
	{//two or less slot weapons
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			for ( var i = 0; EnchantListOBJ[1][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[1][i]][1],EnchantOBJ[EnchantListOBJ[1][i]][0]);
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[1][i]][1],EnchantOBJ[EnchantListOBJ[1][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon== 1156 /*Krieg*/ || 
			weapon== 933 /*Twin Edge of Naght Sieger(red)*/|| 
			weapon== 932 /*Twin Edge of Naght Sieger(blue)*/|| 
			weapon== 1160 /*Krasnaya*/)
	{//tree slot weapons
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			for ( var i = 0; EnchantListOBJ[1][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[1][i]][1],EnchantOBJ[EnchantListOBJ[1][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[0][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = true;
	}
	else if(weapon== 1452 /*Raksasa Dagger*/ || //spe
			weapon== 1453 /*Mikatsuki*/ || //spe
			weapon== 1699 /*Huuma Swirling Petal*/ || //spe
			weapon== 1700 /*Huuma Fluttering Snow*/ || //spe
			weapon== 1701 /*Huuma Thunderstorm*/) //spe
	{
		CleanEnchant("A_WEAPON_ENCHANT");
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
		var enchlv = 0;
		if( n_A_Weapon_ATKplus < 10)
		{
			enchlv = 4;
		}
		else if (n_A_Weapon_ATKplus < 12)
		{
			enchlv = 5;
		}
		else
		{
			enchlv = 6;
		}
		for ( var i = 0; EnchantListOBJ[enchlv][i] != "NULL"; i++ )
		{
			formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[enchlv][i]][1],EnchantOBJ[EnchantListOBJ[enchlv][i]][0]);
			formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[enchlv][i]][1],EnchantOBJ[EnchantListOBJ[enchlv][i]][0]);
		}
	}
	else if(weapon== 1412 /*Golden Rod Staff*/ || 
			weapon== 1419 /*Aqua Rod Staff*/ || 
			weapon== 1426 /*Crimson Rod Staff*/ || 
			weapon== 1433 /*Forest Rod Staff*/ )
	{
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			for ( var i = 0; EnchantListOBJ[45][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon == 1506)
	{// Wand Of Affection
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			for ( var i = 0; EnchantListOBJ[53][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[53][i]][1],EnchantOBJ[EnchantListOBJ[53][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[54][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[54][i]][1],EnchantOBJ[EnchantListOBJ[54][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon == 1537)
	{// Mace Of Judgement
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			for ( var i = 0; EnchantListOBJ[53][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[53][i]][1],EnchantOBJ[EnchantListOBJ[53][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[54][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[54][i]][1],EnchantOBJ[EnchantListOBJ[54][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon == 1507)//spe
	{// "Empowered Wand of Affection"
		CleanEnchant("A_WEAPON_ENCHANT");
		SetEnchant("A_WEAPON_ENCHANT",weapon_ref,ench_Healer,ench_Spell_Ability_1);
	}
	else if(weapon == 1541)//spe
	{// Empowered Mace of Judgement
		CleanEnchant("A_WEAPON_ENCHANT");
		SetEnchant("A_WEAPON_ENCHANT",weapon_ref,ench_ATK_Type,ench_Spell_Ability_1);
	}
	else if(weapon == 1413 || // "Empowered Golden Rod Staff"//spe
			weapon == 1420 || // "Empowered Aqua Rod Staff"//spe
			weapon == 1427 || // "Empowered Crimson Rod Staff"//spe
			weapon == 1434  ) // "Empowered Forest Rod Staff"//spe
	{// Empowered Mace of Judgement
		CleanEnchant("A_WEAPON_ENCHANT");
		SetEnchant("A_WEAPON_ENCHANT",weapon_ref,ench_Spell_Ability_1,ench_Spell_Ability_2);
	}
	else if(weapon == 1381 || // "Agent Katar"
			weapon == 1382 || // "Guillotine Katar"
			weapon == 1383 || // "Ignis steel"
			weapon == 1384 || // "End Sectora"
			weapon == 1385 || // "Cannon Spear"
			weapon == 1386 || // "Gigantic Lance"
			weapon == 1387 || // "Cold Magic Book"
			weapon == 1388 || // "Recovery Light"
			weapon == 1394 || // "As-nail"
			weapon == 1395 || // "Scarlet-nail"
			weapon == 1397 || // "Bloody Cross"
			weapon == 1398 || // "Catapult"
			weapon == 1399 || // "Giant Crossbow"
			weapon == 1400 )  // "Creeper Bow"
	{
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			for ( var i = 0; EnchantListOBJ[62][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[62][i]][1],EnchantOBJ[EnchantListOBJ[62][i]][0]);
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[62][i]][1],EnchantOBJ[EnchantListOBJ[62][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon == 2119 || // "Evil Slayer Vanquisher Staff"
			weapon == 2120 || // "Evil Slayer Stabber Dagger"
			weapon == 2121 || // "Evil Slayer Destroyer Hammer"
			weapon == 2122 || // "Evil Slayer Piercer Bow"
			weapon == 2123 || // "Evil Slayer Sword"
			weapon == 2124 )  // "Evil Slayer Ripper Katar"
	{
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			for ( var i = 0; EnchantListOBJ[87][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[87][i]][1],EnchantOBJ[EnchantListOBJ[87][i]][0]);
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[87][i]][1],EnchantOBJ[EnchantListOBJ[87][i]][0]);
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[87][i]][1],EnchantOBJ[EnchantListOBJ[87][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = false;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon >= 2050 && weapon <= 2083)//spe
	{//Ancient Weapons 
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			//Slot 4
			for ( var i = 0; EnchantListOBJ[90][i] != "NULL"; i++ )
			{
				if(i < 1)
				{
					formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[90][i]][1],EnchantOBJ[EnchantListOBJ[90][i]][0]);
				}
					
				if(i == 1)
				{
					formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option("Physical");
					formElements["A_WEAPON_ENCHANT_4"].options[i].disabled = true;
				}
				if(i >= 1)
				{
					formElements["A_WEAPON_ENCHANT_4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[90][i]][1],EnchantOBJ[EnchantListOBJ[90][i]][0]);
				}
			}
			var formsize = formElements["A_WEAPON_ENCHANT_4"].length;
			formElements["A_WEAPON_ENCHANT_4"].options[formsize] = new Option("Magical");
			formElements["A_WEAPON_ENCHANT_4"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[92][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i + formsize] = new Option(EnchantOBJ[EnchantListOBJ[92][i]][1],EnchantOBJ[EnchantListOBJ[92][i]][0]);
			}
			//Slot 3
			for ( var i = 0; EnchantListOBJ[91][i] != "NULL"; i++ )
			{
				if(i < 1)
				{
					formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[91][i]][1],EnchantOBJ[EnchantListOBJ[91][i]][0]);
				}
					
				if(i == 1)
				{
					formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option("Physical");
					formElements["A_WEAPON_ENCHANT_3"].options[i].disabled = true;
				}
				if(i >= 1)
				{
					formElements["A_WEAPON_ENCHANT_3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[91][i]][1],EnchantOBJ[EnchantListOBJ[91][i]][0]);
				}
			}
			formsize = formElements["A_WEAPON_ENCHANT_3"].length;
			formElements["A_WEAPON_ENCHANT_3"].options[formsize] = new Option("Magical");
			formElements["A_WEAPON_ENCHANT_3"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[93][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i + formsize] = new Option(EnchantOBJ[EnchantListOBJ[93][i]][1],EnchantOBJ[EnchantListOBJ[93][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon >= 2162 && weapon <= 2163)
	{//Vicious Mind Weapons (magical)
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			//Slot 4
			for ( var i = 0; EnchantListOBJ[95][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[95][i]][1],EnchantOBJ[EnchantListOBJ[95][i]][0]);
			}
			//Slot 3
			for ( var i = 0; EnchantListOBJ[96][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[96][i]][1],EnchantOBJ[EnchantListOBJ[96][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon >= 2164 && weapon <= 2178)
	{//Vicious Mind Weapons 
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			//Slot 4
			for ( var i = 0; EnchantListOBJ[97][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[97][i]][1],EnchantOBJ[EnchantListOBJ[97][i]][0]);
			}
			//Slot 3
			for ( var i = 0; EnchantListOBJ[98][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[98][i]][1],EnchantOBJ[EnchantListOBJ[98][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon == 2350)
	{
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			//Slot 4
			for ( var i = 0; EnchantListOBJ[108][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[108][i]][1],EnchantOBJ[EnchantListOBJ[108][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = true;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon == 2382)//spe
	{//Illusion Sharpened Legbone of Ghoul
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			//Slot 4 & 3
			formElements["A_WEAPON_ENCHANT_4"].options[0] = new Option(EnchantOBJ[EnchantListOBJ[112][i]][1],EnchantOBJ[EnchantListOBJ[112][i]][0]);
			formElements["A_WEAPON_ENCHANT_3"].options[0] = new Option(EnchantOBJ[EnchantListOBJ[112][i]][1],EnchantOBJ[EnchantListOBJ[112][i]][0]);
			formElements["A_WEAPON_ENCHANT_4"].options[1] = new Option("Physical");
			formElements["A_WEAPON_ENCHANT_4"].options[1].disabled = true;
			formElements["A_WEAPON_ENCHANT_3"].options[1] = new Option("Physical");
			formElements["A_WEAPON_ENCHANT_3"].options[1].disabled = true;	
			for ( var i = 1; EnchantListOBJ[112][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[112][i]][1],EnchantOBJ[EnchantListOBJ[112][i]][0]);
				formElements["A_WEAPON_ENCHANT_3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[112][i]][1],EnchantOBJ[EnchantListOBJ[112][i]][0]);
			}
			formsize = formElements["A_WEAPON_ENCHANT_3"].length;
			formElements["A_WEAPON_ENCHANT_4"].options[formsize] = new Option("Ranged");
			formElements["A_WEAPON_ENCHANT_4"].options[formsize].disabled = true;
			formElements["A_WEAPON_ENCHANT_3"].options[formsize] = new Option("Ranged");
			formElements["A_WEAPON_ENCHANT_3"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[113][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[113][i]][1],EnchantOBJ[EnchantListOBJ[113][i]][0]);
				formElements["A_WEAPON_ENCHANT_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[113][i]][1],EnchantOBJ[EnchantListOBJ[113][i]][0]);
			}
			formsize = formElements["A_WEAPON_ENCHANT_3"].length;
			formElements["A_WEAPON_ENCHANT_4"].options[formsize] = new Option("Magical");
			formElements["A_WEAPON_ENCHANT_4"].options[formsize].disabled = true;
			formElements["A_WEAPON_ENCHANT_3"].options[formsize] = new Option("Magical");
			formElements["A_WEAPON_ENCHANT_3"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[114][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[114][i]][1],EnchantOBJ[EnchantListOBJ[114][i]][0]);
				formElements["A_WEAPON_ENCHANT_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[114][i]][1],EnchantOBJ[EnchantListOBJ[114][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	else if(weapon >= 2534 && weapon <= 2549)//spe
	{//OS Weapons 
		if(!isRefine)
		{
			CleanEnchant("A_WEAPON_ENCHANT");
			//Slot 4
			for ( var i = 0; EnchantListOBJ[124][i] != "NULL"; i++ )
			{
				if(i < 1)
				{
					formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[124][i]][1],EnchantOBJ[EnchantListOBJ[124][i]][0]);
				}
					
				if(i == 1)
				{
					formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option("Physical");
					formElements["A_WEAPON_ENCHANT_4"].options[i].disabled = true;
				}
				if(i >= 1)
				{
					formElements["A_WEAPON_ENCHANT_4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[124][i]][1],EnchantOBJ[EnchantListOBJ[124][i]][0]);
				}
			}
			var formsize = formElements["A_WEAPON_ENCHANT_4"].length;
			formElements["A_WEAPON_ENCHANT_4"].options[formsize] = new Option("Magical");
			formElements["A_WEAPON_ENCHANT_4"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[126][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_4"].options[i + formsize] = new Option(EnchantOBJ[EnchantListOBJ[126][i]][1],EnchantOBJ[EnchantListOBJ[126][i]][0]);
			}
			//Slot 3
			for ( var i = 0; EnchantListOBJ[125][i] != "NULL"; i++ )
			{
				if(i < 1)
				{
					formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[125][i]][1],EnchantOBJ[EnchantListOBJ[125][i]][0]);
				}
					
				if(i == 1)
				{
					formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option("Physical");
					formElements["A_WEAPON_ENCHANT_3"].options[i].disabled = true;
				}
				if(i >= 1)
				{
					formElements["A_WEAPON_ENCHANT_3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[125][i]][1],EnchantOBJ[EnchantListOBJ[125][i]][0]);
				}
			}
			formsize = formElements["A_WEAPON_ENCHANT_3"].length;
			formElements["A_WEAPON_ENCHANT_3"].options[formsize] = new Option("Magical");
			formElements["A_WEAPON_ENCHANT_3"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[127][i] != "NULL"; i++ )
			{
				formElements["A_WEAPON_ENCHANT_3"].options[i + formsize] = new Option(EnchantOBJ[EnchantListOBJ[127][i]][1],EnchantOBJ[EnchantListOBJ[127][i]][0]);
			}
		}
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = false;
		formElements["A_WEAPON_ENCHANT_4"].disabled = false;
	}
	// else if(weapon == 9999)
	// {
		
	// }
	else
	{
		CleanEnchant("A_WEAPON_ENCHANT");
		// for ( var i = 0; EnchantListOBJ[0][i] != "NULL"; i++ )
		// {
			// formElements["A_WEAPON_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
			// formElements["A_WEAPON_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
			// formElements["A_WEAPON_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
		// }
		formElements["A_WEAPON_ENCHANT_2"].disabled = true;
		formElements["A_WEAPON_ENCHANT_3"].disabled = true;
		formElements["A_WEAPON_ENCHANT_4"].disabled = true;
	}
	// refresh selects
	$("#A_WEAPON_ENCHANT_2").trigger("chosen:updated");
	$("#A_WEAPON_ENCHANT_3").trigger("chosen:updated");
	$("#A_WEAPON_ENCHANT_4").trigger("chosen:updated");
}

function ClickWeapon2( weapon2 )
{
	//clean enchant list
	var len = formElements["A_Mal_Ench3"].length;
	for ( var i = 0; i < len ; i++ )
	{
		formElements["A_Mal_Ench3"].options[0] = null;
		formElements["A_Mal_Ench4"].options[0] = null;
	}
	
	if (/*Daggers*/weapon2== 390 || weapon2== 391 || weapon2== 392 || weapon2== 387 || weapon2== 13 || weapon2== 394 || weapon2== 396 || weapon2== 14 || weapon2== 15 || weapon2== 389 || weapon2== 397 || weapon2== 398 || weapon2== 799 || weapon2== 1157 || weapon2== 1267 || weapon2== 12 || weapon2== 393 || weapon2== 11 || weapon2== 388 || weapon2== 607 || weapon2== 395 || weapon2== 1268 || 
		/*One Handed Axes*/weapon2== 415 || weapon2== 1164 || 
		/*One Handed Swords*/weapon2== 32 || weapon2== 33 || weapon2== 401 || weapon2== 34 || weapon2== 31 || weapon2== 35 || weapon2== 36 || weapon2== 403 || weapon2== 404 || weapon2== 470 || weapon2== 1158 || weapon2== 1274 || weapon2== 402 || weapon2== 399 || weapon2== 400
		)
	{//two or less slot weapons
		formElements["A_Mal_Ench3"].disabled = false;
		formElements["A_Mal_Ench4"].disabled = false;
		for ( var i = 0; EnchantListOBJ[1][i] != "NULL"; i++ )
		{
			formElements["A_Mal_Ench3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[1][i]][1],EnchantOBJ[EnchantListOBJ[1][i]][0]);
			formElements["A_Mal_Ench4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[1][i]][1],EnchantOBJ[EnchantListOBJ[1][i]][0]);
		}
	}
	else if(weapon2== 1156 /*Krieg*/ || 
			weapon2== 933 /*Twin Edge of Naght Sieger(red)*/|| 
			weapon2== 932 /*Twin Edge of Naght Sieger(blue)*/)
	{//tree slot weapons
		formElements["A_Mal_Ench3"].disabled = false;
		formElements["A_Mal_Ench4"].disabled = true;
		for ( var i = 0; EnchantListOBJ[1][i] != "NULL"; i++ )
		{
			formElements["A_Mal_Ench3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[1][i]][1],EnchantOBJ[EnchantListOBJ[1][i]][0]);
		}
		for ( var i = 0; EnchantListOBJ[0][i] != "NULL"; i++ )
		{
			formElements["A_Mal_Ench4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
		}
	}
	else if(weapon2 >= 2534 && weapon2 <= 2549)//spe
	{//OS Weapons 
		formElements["A_Mal_Ench3"].disabled = false;
		formElements["A_Mal_Ench4"].disabled = false;
		//Slot 4
		for ( var i = 0; EnchantListOBJ[124][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements["A_Mal_Ench4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[124][i]][1],EnchantOBJ[EnchantListOBJ[124][i]][0]);
			}
				
			if(i == 1)
			{
				formElements["A_Mal_Ench4"].options[i] = new Option("Physical");
				formElements["A_Mal_Ench4"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements["A_Mal_Ench4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[124][i]][1],EnchantOBJ[EnchantListOBJ[124][i]][0]);
			}
		}
		var formsize = formElements["A_Mal_Ench4"].length;
		formElements["A_Mal_Ench4"].options[formsize] = new Option("Magical");
		formElements["A_Mal_Ench4"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[126][i] != "NULL"; i++ )
		{
			formElements["A_Mal_Ench4"].options[i + formsize] = new Option(EnchantOBJ[EnchantListOBJ[126][i]][1],EnchantOBJ[EnchantListOBJ[126][i]][0]);
		}
		//Slot 3
		for ( var i = 0; EnchantListOBJ[125][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements["A_Mal_Ench3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[125][i]][1],EnchantOBJ[EnchantListOBJ[125][i]][0]);
			}
				
			if(i == 1)
			{
				formElements["A_Mal_Ench3"].options[i] = new Option("Physical");
				formElements["A_Mal_Ench3"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements["A_Mal_Ench3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[125][i]][1],EnchantOBJ[EnchantListOBJ[125][i]][0]);
			}
		}
		formsize = formElements["A_Mal_Ench3"].length;
		formElements["A_Mal_Ench3"].options[formsize] = new Option("Magical");
		formElements["A_Mal_Ench3"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[127][i] != "NULL"; i++ )
		{
			formElements["A_Mal_Ench3"].options[i + formsize] = new Option(EnchantOBJ[EnchantListOBJ[127][i]][1],EnchantOBJ[EnchantListOBJ[127][i]][0]);
		}
	}
	else
	{
		for ( var i = 0; EnchantListOBJ[0][i] != "NULL"; i++ )
		{
			formElements["A_Mal_Ench3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
			formElements["A_Mal_Ench4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
		}
		formElements["A_Mal_Ench3"].disabled = true;
		formElements["A_Mal_Ench4"].disabled = true;
		
	}
	// refresh selects
	// $("#A_Mal_Ench3").chosen({no_results_text: "Oops, nothing found!"});
	$("#A_Mal_Ench3").trigger("chosen:updated");
	// $("#A_Mal_Ench4").chosen({no_results_text: "Oops, nothing found!"});
	$("#A_Mal_Ench4").trigger("chosen:updated");
}

function ClickShield(data, isRefine)
{
	var shield_id = ItemOBJ[n_A_Equip[eq_SHIELD]][itm_ID];
	var shield_ref = n_A_LEFT_DEF_PLUS;
	if(isRefine)
	{
		shield_ref = data;
	}
	else
	{
		shield_id = data;
	}
	
	if(shield_id == 1523)
	{// Bible of Promise (1st Vol.)
		CleanEnchant("A_SHIELD_ENCHANT");
		SetEnchant("A_SHIELD_ENCHANT",0,50,0);
	}
	else
	{
		CleanEnchant("A_SHIELD_ENCHANT");
	}

	// if(ItemOBJ[shield_id][itm_ENCH_SLOT_4] != 0 && !isRefine)
	// {
		// CleanEnchant("A_SHIELD_ENCHANT");
		// formElements["A_SHIELD_ENCHANT_4"].disabled = false;
		// for ( var i = 0; EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_4]][i] != "NULL" && !isRefine; i++ )
		// {
			// formElements["A_SHIELD_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_4]][i]][1],EnchantOBJ[EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_4]][i]][0]);
		// }
	// }
	// if(ItemOBJ[shield_id][itm_ENCH_SLOT_3] != 0 && !isRefine)
	// {
		// formElements["A_SHIELD_ENCHANT_3"].disabled = false;
		// for ( var i = 0; EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_3]][i] != "NULL" && !isRefine; i++ )
		// {
			// formElements["A_SHIELD_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_3]][i]][1],EnchantOBJ[EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_3]][i]][0]);
		// }
	// }
	// if(ItemOBJ[shield_id][itm_ENCH_SLOT_2] != 0 && !isRefine)
	// {
		// formElements["A_SHIELD_ENCHANT_2"].disabled = false;
		// for ( var i = 0; EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_2]][i] != "NULL" && !isRefine; i++ )
		// {
			// formElements["A_SHIELD_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_2]][i]][1],EnchantOBJ[EnchantListOBJ[ItemOBJ[shield_id][itm_ENCH_SLOT_2]][i]][0]);
		// }
	// }
	// refresh selects
	$("#A_SHIELD_ENCHANT_2").trigger("chosen:updated");
	$("#A_SHIELD_ENCHANT_3").trigger("chosen:updated");
	$("#A_SHIELD_ENCHANT_4").trigger("chosen:updated");
}

function ClickGarment( data, isRefine )
{
	var garm_id = ItemOBJ[n_A_Equip[eq_GARMENT]][itm_ID];
	var garm_ref = n_A_SHOULDER_DEF_PLUS;
	if(isRefine)
	{
		garm_ref = data;
	}
	else
	{
		garm_id = data;
	}
	
	if(garm_id == 1545)
	{// Fallen Angel Wing
		CleanEnchant("A_GARMENT_ENCHANT");
		for ( var i = 0; EnchantListOBJ[ench_FAW_3_4][i] != "NULL"; i++ )
		{
			formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_FAW_4][i]][1],EnchantOBJ[EnchantListOBJ[ench_FAW_4][i]][0]);
			if(garm_ref >= 7)
			{
				formElements["A_GARMENT_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_FAW_3][i]][1],EnchantOBJ[EnchantListOBJ[ench_FAW_3][i]][0]);	
			}
		}
		formElements["A_GARMENT_ENCHANT_4"].disabled = false;
		if(garm_ref >= 7)
		{
			formElements["A_GARMENT_ENCHANT_3"].disabled = false;	
		}
		if(garm_ref >= 9)
		{
			for ( var i = 0; EnchantListOBJ[ench_FAW_2][i] != "NULL"; i++ )
			{
					formElements["A_GARMENT_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_FAW_2][i]][1],EnchantOBJ[EnchantListOBJ[ench_FAW_2][i]][0]);
			}
			formElements["A_GARMENT_ENCHANT_2"].disabled = false;
		}
	}
	else if(garm_id == 1958)
	{// "Giant God Snake Skin"
		if(!isRefine)
		{
			CleanEnchant("A_GARMENT_ENCHANT");
			for ( var i = 0; EnchantListOBJ[ench_Faceworm_3_4][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_Faceworm_4][i]][1],EnchantOBJ[EnchantListOBJ[ench_Faceworm_4][i]][0]);
				formElements["A_GARMENT_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_Faceworm_3][i]][1],EnchantOBJ[EnchantListOBJ[ench_Faceworm_3][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[ench_Faceworm_2][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_GARMENT_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_Faceworm_2][i]][1],EnchantOBJ[EnchantListOBJ[ench_Faceworm_2][i]][0]);
			}
		}
		formElements["A_GARMENT_ENCHANT_4"].disabled = false;
		formElements["A_GARMENT_ENCHANT_3"].disabled = false;
		formElements["A_GARMENT_ENCHANT_2"].disabled = false;
	}
	else if(garm_id == 1441)
	{//Ur's Manteau
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",garm_ref,ench_Evasion,ench_Strength);
	}
	else if(garm_id == 1502)
	{//Peuz's Manteau
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",garm_ref,ench_Evasion,ench_Critical);
	}
	else if(garm_id == 1407)
	{//White Wing Manteau
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",garm_ref,ench_Evasion,ench_ATK_Type);
	}
	else if(garm_id == 1781)
	{//Black Wing Manteau
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",garm_ref,ench_Assist_Ability,ench_ATK_Type);
	}
	else if(garm_id == 1771)
	{//Sapha's Cloth
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",garm_ref,ench_Evasion,ench_Critical);
	}
	else if(garm_id == 1776)
	{//Nab's Cloth
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",garm_ref,ench_Evasion,ench_Critical);
	}
	else if(garm_id == 1509)
	{// Shawl of Affection
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",0,50,0);
	}
	else if(garm_id == 1539)
	{// Shawl of Judgement
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",0,50,0);
	}
	else if(garm_id == 1787)
	{// Loki's Muffler
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant("A_GARMENT_ENCHANT",0,57,0);
	}
	else if(garm_id == 1392)
	{// "Salvage Cape"
		if(!isRefine)
		{
			CleanEnchant("A_GARMENT_ENCHANT");
			for ( var i = 0; EnchantListOBJ[63][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_GARMENT_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[63][i]][1],EnchantOBJ[EnchantListOBJ[63][i]][0]);
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[63][i]][1],EnchantOBJ[EnchantListOBJ[63][i]][0]);
			}
		}
		formElements["A_GARMENT_ENCHANT_2"].disabled = true;
		formElements["A_GARMENT_ENCHANT_3"].disabled = false;
		formElements["A_GARMENT_ENCHANT_4"].disabled = false;
	}
	else if(garm_id == 2030 || garm_id == 2025 )
	{// "Supplement Part Con" || "Upgrade Part - Engine"
		CleanEnchant("A_GARMENT_ENCHANT");
		SetEnchant2("A_GARMENT_ENCHANT",garm_ref,72,73);
	}
	else if(garm_id >= 2142 && garm_id <= 2147)
	{//Chronocloak
		if(!isRefine)
		{
			CleanEnchant("A_GARMENT_ENCHANT");
			for ( var i = 0; EnchantListOBJ[94][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[94][i]][1],EnchantOBJ[EnchantListOBJ[94][i]][0]);
			}
		}
		formElements["A_GARMENT_ENCHANT_4"].disabled = false;
		formElements["A_GARMENT_ENCHANT_3"].disabled = true;
		formElements["A_GARMENT_ENCHANT_2"].disabled = true;
	}
	else if(garm_id == 2339 || garm_id == 2340 || garm_id == 2341)
	{//Elemental Cape || Golden Scarf || Mine Worker's Backpack
		CleanEnchant("A_GARMENT_ENCHANT");
		formElements["A_GARMENT_ENCHANT_4"].disabled = false;
		if(garm_ref < 9)
		{
			for ( var i = 0; EnchantListOBJ[102][i] != "NULL"; i++ )
			{
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[102][i]][1],EnchantOBJ[EnchantListOBJ[102][i]][0]);
			}
		}
		else
		{
			for ( var i = 0; EnchantListOBJ[103][i] != "NULL"; i++ )
			{
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[103][i]][1],EnchantOBJ[EnchantListOBJ[103][i]][0]);
			}
		}
		formElements["A_GARMENT_ENCHANT_3"].disabled = true;
		formElements["A_GARMENT_ENCHANT_2"].disabled = true;
	}
	else if(garm_id == 2374 || garm_id == 2387  || garm_id == 2399 )
	{// Illusion Muffler || Illusion Ancient Cape || Illusion Survivor's Manteau
		if(!isRefine)
		{
			CleanEnchant("A_GARMENT_ENCHANT");
			for ( var i = 0; EnchantListOBJ[110][i] != "NULL"; i++ )
			{
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
				formElements["A_GARMENT_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
			}
		}
		
		formElements["A_GARMENT_ENCHANT_4"].disabled = false;
		formElements["A_GARMENT_ENCHANT_3"].disabled = false;
		formElements["A_GARMENT_ENCHANT_2"].disabled = true;
	}
	else if(garm_id == 2526 || garm_id == 2527)
	{// Illusion Engine Wing Type A || Illusion Engine Wing Type B
		if(!isRefine)
		{
			CleanEnchant("A_GARMENT_ENCHANT");
			for ( var i = 0; EnchantListOBJ[119][i] != "NULL"; i++ )
			{
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[119][i]][1],EnchantOBJ[EnchantListOBJ[119][i]][0]);
				formElements["A_GARMENT_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[119][i]][1],EnchantOBJ[EnchantListOBJ[119][i]][0]);
				formElements["A_GARMENT_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[119][i]][1],EnchantOBJ[EnchantListOBJ[119][i]][0]);
			}
		}
			formElements["A_GARMENT_ENCHANT_4"].disabled = false;
			formElements["A_GARMENT_ENCHANT_3"].disabled = false;
			formElements["A_GARMENT_ENCHANT_2"].disabled = false;
	}
	else if(garm_id == 2551 || garm_id == 2554 || garm_id == 2557 )
	{ // Lava Leather Manteau || Lava Leather Muffler || Lava Leather Hood
		if(!isRefine)
		{
			CleanEnchant("A_GARMENT_ENCHANT");
			let ench_num = 128;
			for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			{
				formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			}
			ench_num = 129;
			for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			{
				formElements["A_GARMENT_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			}
		}
		formElements["A_GARMENT_ENCHANT_4"].disabled = false;
		formElements["A_GARMENT_ENCHANT_3"].disabled = false;
		formElements["A_GARMENT_ENCHANT_2"].disabled = true;
	}
	// else if(garm_id == 9999)
	// {
		// if(!isRefine)
		// {
			// CleanEnchant("A_GARMENT_ENCHANT");
			// let ench_num = XXX;
			// for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			// {
				// formElements["A_GARMENT_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
				// formElements["A_GARMENT_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
				// formElements["A_GARMENT_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			// }
		// }
		// formElements["A_GARMENT_ENCHANT_4"].disabled = false;
		// formElements["A_GARMENT_ENCHANT_3"].disabled = false;
		// formElements["A_GARMENT_ENCHANT_2"].disabled = false;
	// }
	else
	{
		CleanEnchant("A_GARMENT_ENCHANT");
	}
	// StAllCalc();
	// refresh selects
	$("#A_GARMENT_ENCHANT_2").trigger("chosen:updated");
	$("#A_GARMENT_ENCHANT_3").trigger("chosen:updated");
	$("#A_GARMENT_ENCHANT_4").trigger("chosen:updated");
}

function ClickShoes( data, isRefine )
{
	var shoes_id = ItemOBJ[n_A_Equip[eq_SHOES]][itm_ID];
	var shoes_ref = n_A_SHOES_DEF_PLUS;
	if(isRefine)
	{
		shoes_ref = data;
	}
	else
	{
		shoes_id = data;
	}
	
	if(shoes_id >= 2197 && shoes_id <= 2202 )
	{// "Temporal Shoes"
		if(!isRefine)
		{
			CleanEnchant("A_SHOES_ENCHANT");
			for ( var i = 0; EnchantListOBJ[10][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_SHOES_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[10][i]][1],EnchantOBJ[EnchantListOBJ[10][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[9][i] != "NULL" && !isRefine; i++ )
			{
				
				formElements["A_SHOES_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[9][i]][1],EnchantOBJ[EnchantListOBJ[9][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[0][i] != "NULL" && !isRefine; i++ )
			{
				
				formElements["A_SHOES_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[0][i]][1],EnchantOBJ[EnchantListOBJ[0][i]][0]);
			}
		}
		formElements["A_SHOES_ENCHANT_4"].disabled = false;
		formElements["A_SHOES_ENCHANT_3"].disabled = false;
		formElements["A_SHOES_ENCHANT_2"].disabled = true;
	}
	else if(shoes_id == 1442)
	{//Ur's Greaves
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",shoes_ref,ench_Assist_Ability,ench_Strength);
	}
	else if(shoes_id == 1503)
	{//Peuz's Greaves
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",shoes_ref,ench_Assist_Ability,ench_Physical);
	}
	else if(shoes_id == 1410)
	{//White Wing Boots
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",shoes_ref,ench_Assist_Ability,ench_Critical);
	}
	else if(shoes_id == 1782)
	{//Black Wing Boots
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",shoes_ref,ench_Assist_Ability,ench_Critical);
	}
	else if(shoes_id == 1772)
	{//Sapha Shoes
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",shoes_ref,ench_Assist_Ability,ench_Critical);
	}
	else if(shoes_id == 1777)
	{//Nab Shoes
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",shoes_ref,ench_Assist_Ability,ench_ATK_Type);
	}
	else if(shoes_id == 1416 || // Golden Rod Shoes
			shoes_id == 1423 || // Aqua Rod Shoes
			shoes_id == 1430 || // Crimson Rod Shoes
			shoes_id == 1437 )  // Forest Rod Shoes
	{
		if(!isRefine)
		{
			CleanEnchant("A_SHOES_ENCHANT");
			for ( var i = 0; EnchantListOBJ[45][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_SHOES_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
				formElements["A_SHOES_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[46][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_SHOES_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[46][i]][1],EnchantOBJ[EnchantListOBJ[46][i]][0]);
			}
		}
		formElements["A_SHOES_ENCHANT_4"].disabled = false;
		formElements["A_SHOES_ENCHANT_3"].disabled = false;
		formElements["A_SHOES_ENCHANT_2"].disabled = false;
	}
	else if(shoes_id == 1510)
	{// Shoes of Affection
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",0,50,0);
	}
	else if(shoes_id == 1538)
	{// Shoes of Judgement
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant("A_SHOES_ENCHANT",0,50,0);
	}
	else if(shoes_id == 2024 || shoes_id == 2029 )
	{// Upgrade Part - Booster ||Supplement Part Agi
		CleanEnchant("A_SHOES_ENCHANT");
		SetEnchant2("A_SHOES_ENCHANT",shoes_ref,74,75);
	}
	else if(shoes_id == 718)
	{
		if(!isRefine)
		{
			CleanEnchant("A_SHOES_ENCHANT");
			for ( var i = 0; EnchantListOBJ[109][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_SHOES_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[109][i]][1],EnchantOBJ[EnchantListOBJ[109][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[106][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_SHOES_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[106][i]][1],EnchantOBJ[EnchantListOBJ[106][i]][0]);
			}
		}
		formElements["A_SHOES_ENCHANT_4"].disabled = false;
		formElements["A_SHOES_ENCHANT_3"].disabled = false;
		formElements["A_SHOES_ENCHANT_2"].disabled = true;
	}
	else if(shoes_id == 2375 )
	{// Illusion Shoes
		if(!isRefine)
		{
			CleanEnchant("A_SHOES_ENCHANT");
			for ( var i = 0; EnchantListOBJ[110][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_SHOES_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
				formElements["A_SHOES_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
			}
		}
		formElements["A_SHOES_ENCHANT_4"].disabled = false;
		formElements["A_SHOES_ENCHANT_3"].disabled = false;
		formElements["A_SHOES_ENCHANT_2"].disabled = true;
	}
	else if(shoes_id == 2528 ||  shoes_id == 2529)
	{// Illusion Leg Type A || Illusion Leg Type B
		if(!isRefine)
		{
			CleanEnchant("A_SHOES_ENCHANT");
			for ( var i = 0; EnchantListOBJ[120][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_SHOES_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[120][i]][1],EnchantOBJ[EnchantListOBJ[120][i]][0]);
				formElements["A_SHOES_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[120][i]][1],EnchantOBJ[EnchantListOBJ[120][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[121][i] != "NULL" && !isRefine; i++ )
				formElements["A_SHOES_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[121][i]][1],EnchantOBJ[EnchantListOBJ[121][i]][0]);
		}
		formElements["A_SHOES_ENCHANT_4"].disabled = false;
		formElements["A_SHOES_ENCHANT_3"].disabled = false;
		formElements["A_SHOES_ENCHANT_2"].disabled = false;
	}
	else if(shoes_id == 2552 || shoes_id == 2555 || shoes_id == 2558 )
	{ // Lava Leather Boots || Lava Leather Shoes || Lava Leather Sandles
		if(!isRefine)
		{
			CleanEnchant("A_SHOES_ENCHANT");
			let ench_num = 128;
			for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			{
				formElements["A_SHOES_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			}
			ench_num = 129;
			for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			{
				formElements["A_SHOES_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			}
		}
		formElements["A_SHOES_ENCHANT_4"].disabled = false;
		formElements["A_SHOES_ENCHANT_3"].disabled = false;
		formElements["A_SHOES_ENCHANT_2"].disabled = true;
	}
	// else if(garm_id == 9999)
	// {
		// if(!isRefine)
		// {
			// CleanEnchant("A_SHOES_ENCHANT");
			// let ench_num = XXX;
			// for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			// {
				// formElements["A_SHOES_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
				// formElements["A_SHOES_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
				// formElements["A_SHOES_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			// }
		// }
		// formElements["A_SHOES_ENCHANT_4"].disabled = false;
		// formElements["A_SHOES_ENCHANT_3"].disabled = false;
		// formElements["A_SHOES_ENCHANT_2"].disabled = false;
	// }
	// else if(shoes_id == 9999)
	// {
		// CleanEnchant("A_SHOES_ENCHANT");
	// }
	else
	{
		CleanEnchant("A_SHOES_ENCHANT");
	}
	// StAllCalc();
	// refresh selects
	$("#A_SHOES_ENCHANT_2").trigger("chosen:updated");
	$("#A_SHOES_ENCHANT_3").trigger("chosen:updated");
	$("#A_SHOES_ENCHANT_4").trigger("chosen:updated");
}

function ClickArmor( data, isRefine )
{
	var armor_id = ItemOBJ[n_A_Equip[eq_ARMOR]][itm_ID];
	var armor_ref = n_A_BODY_DEF_PLUS;
	if(isRefine)
	{
		armor_ref = data;
	}
	else
	{
		armor_id = data;
	}
	
	if(armor_id == 1440)
	{// Ur's Plate
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",armor_ref,ench_Strength,ench_ATK_Type);
	}
	else if(armor_id == 1501)
	{// Peuz's Plate
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",armor_ref,ench_Physical,ench_Critical);
	}
	else if(armor_id == 1408)
	{// White Wing Suit
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",armor_ref,ench_Critical,ench_Ranged_Type);
	}
	else if(armor_id == 1780)
	{// Black Wing Suit
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",armor_ref,ench_ATK_Type,ench_Ranged_Type);
	}
	else if(armor_id == 1770)
	{// Sapha's Cloth
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",armor_ref,ench_Critical,ench_Physical);
	}
	else if(armor_id == 1775)
	{// Nab's Cloth
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",armor_ref,ench_ATK_Type,ench_Critical);
	}
	else if(armor_id == 1414 || // Golden Rod Robe
			armor_id == 1421 || // Aqua Rod Robe
			armor_id == 1428 || // Crimson Rod Robe
			armor_id == 1435 )  // Forest Rod Robe
	{
		if(!isRefine)
		{
			CleanEnchant("A_ARMOR_ENCHANT");
			for ( var i = 0; EnchantListOBJ[45][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[45][i] != "NULL" && !isRefine; i++ )
			{
				
				formElements["A_ARMOR_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[46][i] != "NULL" && !isRefine; i++ )
			{
				
				formElements["A_ARMOR_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[46][i]][1],EnchantOBJ[EnchantListOBJ[46][i]][0]);
			}
		}
		formElements["A_ARMOR_ENCHANT_4"].disabled = false;
		formElements["A_ARMOR_ENCHANT_3"].disabled = false;
		formElements["A_ARMOR_ENCHANT_2"].disabled = false;
	}
	else if(armor_id == 1508)
	{// Robe of Affection
		if(!isRefine)
			CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",0,50,0);
	}
	else if(armor_id == 1540)
	{// Robe of Judgement
		if(!isRefine)
			CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",0,50,0);
	}
	else if(armor_id == 1785)
	{// Army Padding
		if(!isRefine)
			CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant("A_ARMOR_ENCHANT",0,57,0);
	}
	else if(armor_id == 1396)
	{// "Green Surgical Gown"
		if(!isRefine)
		{
			CleanEnchant("A_ARMOR_ENCHANT");
			for ( var i = 0; EnchantListOBJ[63][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_ARMOR_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[63][i]][1],EnchantOBJ[EnchantListOBJ[63][i]][0]);
				formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[63][i]][1],EnchantOBJ[EnchantListOBJ[63][i]][0]);
			}
		}
		formElements["A_ARMOR_ENCHANT_2"].disabled = true;
		formElements["A_ARMOR_ENCHANT_3"].disabled = false;
		formElements["A_ARMOR_ENCHANT_4"].disabled = false;
	}
	else if(armor_id == 2023)
	{// "Upgrade Part - Plate"
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant2("A_ARMOR_ENCHANT",armor_ref,68,70);
	}
	else if(armor_id == 2028)
	{// "Supplement Part Str"
		CleanEnchant("A_ARMOR_ENCHANT");
		SetEnchant2("A_ARMOR_ENCHANT",armor_ref,68,77);
	}
	else if(armor_id == 2037 || // "Armor of Sixtus the Mighty"
			armor_id == 2038 || // "Armor of Sixtus the Agile"
			armor_id == 2039 || // "Armor of Sixtus the Tough"
			armor_id == 2040 || // "Armor of Sixtus the Wise"
			armor_id == 2041 || // "Armor of Sixtus the Dexterous"
			armor_id == 2042 )  // "Armor of Sixtus the Lucky"
	{
		if(!isRefine)
		{
			CleanEnchant("A_ARMOR_ENCHANT");
			//slot 4
			for ( var i = 0; EnchantListOBJ[88][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT" + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[88][i]][1],EnchantOBJ[EnchantListOBJ[88][i]][0]);
			}
			//slot 3
			for ( var i = 0; EnchantListOBJ[89][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT" + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[89][i]][1],EnchantOBJ[EnchantListOBJ[89][i]][0]);
			}
		}
		formElements["A_ARMOR_ENCHANT" + "_4"].disabled = false;
		formElements["A_ARMOR_ENCHANT" + "_3"].disabled = false;
		formElements["A_ARMOR_ENCHANT" + "_2"].disabled = true;
	}
	else if(armor_id == 2207 || armor_id == 2210 || armor_id == 2230 || armor_id == 2231)
	{// Flattery Robe || Abusive Robe || Agenda Robe || Consultation Robe
		if(!isRefine)
		{
			CleanEnchant("A_ARMOR_ENCHANT");
			var ench1 = 101;
			var ench2 = 101;
			for ( var i = 0; EnchantListOBJ[ench1][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT" + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
			}
			//slot 3
			for ( var i = 0; EnchantListOBJ[ench2][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT" + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench2][i]][1],EnchantOBJ[EnchantListOBJ[ench2][i]][0]);
			}
		}
		formElements["A_ARMOR_ENCHANT" + "_4"].disabled = false;
		formElements["A_ARMOR_ENCHANT" + "_3"].disabled = false;
		formElements["A_ARMOR_ENCHANT" + "_2"].disabled = true;
	}
	else if(armor_id >= 2330 && armor_id <= 2334 )
	{//Vigilante Suit || Elemental Robe || Golden Ninja Suit || Mine Worker's Vest || Hippie Clothes
		CleanEnchant("A_ARMOR_ENCHANT");
		formElements["A_ARMOR_ENCHANT_4"].disabled = false;
		if(armor_ref < 9)
		{
			for ( var i = 0; EnchantListOBJ[102][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[102][i]][1],EnchantOBJ[EnchantListOBJ[102][i]][0]);
			}
		}
		else
		{
			for ( var i = 0; EnchantListOBJ[103][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[103][i]][1],EnchantOBJ[EnchantListOBJ[103][i]][0]);
			}
		}
		
	}
	else if(armor_id == 2368)
	{// Illusion Puente Robe
		if(!isRefine)
		{
			CleanEnchant("A_ARMOR_ENCHANT");
		
			for ( var i = 0; EnchantListOBJ[110][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
				formElements["A_ARMOR_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
			}
			formElements["A_ARMOR_ENCHANT_4"].disabled = false;
			formElements["A_ARMOR_ENCHANT_3"].disabled = false;
			formElements["A_ARMOR_ENCHANT_2"].disabled = true;
		}
	}
	else if(armor_id == 2524 || armor_id == 2525)
	{// Illusion Armor Type A || Illusion Armor Type B
		if(!isRefine)
		{
			CleanEnchant("A_ARMOR_ENCHANT");
			for ( var i = 0; EnchantListOBJ[118][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[118][i]][1],EnchantOBJ[EnchantListOBJ[118][i]][0]);
				formElements["A_ARMOR_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[118][i]][1],EnchantOBJ[EnchantListOBJ[118][i]][0]);
				formElements["A_ARMOR_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[118][i]][1],EnchantOBJ[EnchantListOBJ[118][i]][0]);
			}
		}
		formElements["A_ARMOR_ENCHANT_4"].disabled = false;
		formElements["A_ARMOR_ENCHANT_3"].disabled = false;
		formElements["A_ARMOR_ENCHANT_2"].disabled = false;
	}
	else if(armor_id == 2550 || armor_id == 2553 || armor_id == 2556 )
	{ // Lava Leather Armor || Lava Leather Suits || Lava Leather Robe
		if(!isRefine)
		{
			CleanEnchant("A_ARMOR_ENCHANT");
			let ench_num = 128;
			for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			}
			ench_num = 129;
			for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			{
				formElements["A_ARMOR_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			}
		}
		formElements["A_ARMOR_ENCHANT_4"].disabled = false;
		formElements["A_ARMOR_ENCHANT_3"].disabled = false;
		formElements["A_ARMOR_ENCHANT_2"].disabled = true;
	}
	// else if(armor_id == 9999)
	// {
		// if(!isRefine)
		// {
			// CleanEnchant("A_ARMOR_ENCHANT");
			// let ench_num = XXX;
			// for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			// {
				// formElements["A_ARMOR_ENCHANT_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
				// formElements["A_ARMOR_ENCHANT_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
				// formElements["A_ARMOR_ENCHANT_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			// }
		// }
		// formElements["A_ARMOR_ENCHANT_4"].disabled = false;
		// formElements["A_ARMOR_ENCHANT_3"].disabled = false;
		// formElements["A_ARMOR_ENCHANT_2"].disabled = false;
	// }
	else
	{
		if(!isRefine)
			CleanEnchant("A_ARMOR_ENCHANT");	
	}
	// StAllCalc();
	// refresh selects
	$("#A_ARMOR_ENCHANT_2").trigger("chosen:updated");
	$("#A_ARMOR_ENCHANT_3").trigger("chosen:updated");
	$("#A_ARMOR_ENCHANT_4").trigger("chosen:updated");
	
}

function ClickAcces( data, numAccess )
{
	var access_id = data;
	var formAcc = "A_ACCES1_ENCHANT";
	if(numAccess == 2)
		formAcc = "A_ACCES2_ENCHANT";

	if(access_id == 1443)
	{// Ur's Seal
		CleanEnchant(formAcc);
		SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1504)
	{// Peuz's Seal
		CleanEnchant(formAcc);
		SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1409)
	{// White Wing Brooch
		CleanEnchant(formAcc);
		SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1783)
	{// Black Wing Brooch
		CleanEnchant(formAcc);
		SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1773)
	{// Sapha's Ring
		CleanEnchant(formAcc);
		SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1778)
	{// Nab's Ring
		CleanEnchant(formAcc);
		SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1985)
	{// Hero Ring
		CleanEnchant(formAcc);
		// SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1415 || // Golden Rod Orb
			access_id == 1422 || // Aqua Rod Orb
			access_id == 1429 || // Crimson Rod Orb
			access_id == 1434 )  // Forest Rod Orb
	{
		CleanEnchant(formAcc);
		for ( var i = 0; EnchantListOBJ[45][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[45][i]][1],EnchantOBJ[EnchantListOBJ[45][i]][0]);
		}
		for ( var i = 0; EnchantListOBJ[46][i] != "NULL"; i++ )
		{
			
			formElements[formAcc + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[46][i]][1],EnchantOBJ[EnchantListOBJ[46][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_2"].disabled = false;
	}
	else if(access_id == 1527)
	{// Light of Cure
		CleanEnchant(formAcc);
		// SetEnchant(formAcc,0,47,0);
		for ( var i = 0; EnchantListOBJ[47][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[47][i]][1],EnchantOBJ[EnchantListOBJ[47][i]][0]);
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[47][i]][1],EnchantOBJ[EnchantListOBJ[47][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_2"].disabled = true;
	}
	else if(access_id == 1534)
	{// Seal of Cathedral
		CleanEnchant(formAcc);
		// SetEnchant(formAcc,0,48,0);
		for ( var i = 0; EnchantListOBJ[48][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[48][i]][1],EnchantOBJ[EnchantListOBJ[48][i]][0]);
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[48][i]][1],EnchantOBJ[EnchantListOBJ[48][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_2"].disabled = true;
	}
	else if(access_id == 1536)
	{// Ring of Archbishop
		CleanEnchant(formAcc);
		// SetEnchant(formAcc,0,49,0);
		for ( var i = 0; EnchantListOBJ[49][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[49][i]][1],EnchantOBJ[EnchantListOBJ[49][i]][0]);
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[49][i]][1],EnchantOBJ[EnchantListOBJ[49][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_2"].disabled = true;
	}
	else if(access_id == 1786)
	{// Pendant Of Guardian
		CleanEnchant(formAcc);
		SetEnchant(formAcc,0,ench_Assist_Ability,0);
	}
	else if(access_id == 1791)
	{// "Ettlang Keepsake"
		CleanEnchant(formAcc);
		for ( var i = 0; EnchantListOBJ[60][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[60][i]][1],EnchantOBJ[EnchantListOBJ[60][i]][0]);
		}
		for ( var i = 0; EnchantListOBJ[61][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[61][i]][1],EnchantOBJ[EnchantListOBJ[61][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_2"].disabled = true;
	}
	else if(access_id == 1393)
	{// "Assassin's glove"
		CleanEnchant(formAcc);
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_4"].disabled = false;
		for ( var i = 0; EnchantListOBJ[63][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[63][i]][1],EnchantOBJ[EnchantListOBJ[63][i]][0]);
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[63][i]][1],EnchantOBJ[EnchantListOBJ[63][i]][0]);
		}
	}
	else if(access_id == 1987)
	{// "Hero Ring"
		CleanEnchant(formAcc);
		formElements[formAcc + "_2"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_4"].disabled = false;
		for ( var i = 0; EnchantListOBJ[64][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[64][i]][1],EnchantOBJ[EnchantListOBJ[64][i]][0]);
		}
		for ( var i = 0; EnchantListOBJ[65][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[65][i]][1],EnchantOBJ[EnchantListOBJ[65][i]][0]);
		}
		for ( var i = 0; EnchantListOBJ[66][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[66][i]][1],EnchantOBJ[EnchantListOBJ[66][i]][0]);
		}
	}
	else if(access_id == 2026 || access_id == 2031 )
	{//"Upgrade Part - Gun Barrel" || "Supplement Part Dex"
		CleanEnchant(formAcc);
		SetEnchant2(formAcc,0,76,0);
	}
	else if(access_id == 2134 || access_id == 2135 )
	{// "Sarah's Left Earring" || "Sarah's Right Earring"
		CleanEnchant(formAcc);
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		//Slot 4
		for ( var i = 0; EnchantListOBJ[79][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[79][i]][1],EnchantOBJ[EnchantListOBJ[79][i]][0]);
			}
				
			if(i == 1)
			{
				formElements[formAcc + "_4"].options[i] = new Option(EnchToName(79));
				formElements[formAcc + "_4"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements[formAcc + "_4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[79][i]][1],EnchantOBJ[EnchantListOBJ[79][i]][0]);
			}
		}
		var formsize = formElements[formAcc + "_4"].length;
		formElements[formAcc + "_4"].options[formsize] = new Option(EnchToName(81));
		formElements[formAcc + "_4"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[81][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[81][i]][1],EnchantOBJ[EnchantListOBJ[81][i]][0]);
		}
		formsize = formElements[formAcc + "_4"].length;
		formElements[formAcc + "_4"].options[formsize] = new Option(EnchToName(83));
		formElements[formAcc + "_4"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[83][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[83][i]][1],EnchantOBJ[EnchantListOBJ[83][i]][0]);
		}
		formsize = formElements[formAcc + "_4"].length;
		formElements[formAcc + "_4"].options[formsize] = new Option(EnchToName(85));
		formElements[formAcc + "_4"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[85][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[85][i]][1],EnchantOBJ[EnchantListOBJ[85][i]][0]);
		}
		//Slot 3
		for ( var i = 0; EnchantListOBJ[80][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[80][i]][1],EnchantOBJ[EnchantListOBJ[80][i]][0]);
			}
				
			if(i == 1)
			{
				formElements[formAcc + "_3"].options[i] = new Option(EnchToName(80));
				formElements[formAcc + "_3"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements[formAcc + "_3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[80][i]][1],EnchantOBJ[EnchantListOBJ[80][i]][0]);
			}
		}
		var formsize = formElements[formAcc + "_3"].length;
		formElements[formAcc + "_3"].options[formsize] = new Option(EnchToName(82));
		formElements[formAcc + "_3"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[82][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[82][i]][1],EnchantOBJ[EnchantListOBJ[82][i]][0]);
		}
		formsize = formElements[formAcc + "_3"].length;
		formElements[formAcc + "_3"].options[formsize] = new Option(EnchToName(84));
		formElements[formAcc + "_3"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[84][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[84][i]][1],EnchantOBJ[EnchantListOBJ[84][i]][0]);
		}
		formsize = formElements[formAcc + "_3"].length;
		formElements[formAcc + "_3"].options[formsize] = new Option(EnchToName(86));
		formElements[formAcc + "_3"].options[formsize].disabled = true;
		for ( var i = 1; EnchantListOBJ[86][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[86][i]][1],EnchantOBJ[EnchantListOBJ[86][i]][0]);
		}
	}
	else if(access_id == 2233 || access_id == 2234)
	{// Mercenary Ring Type A || Mercenary Ring Type B
		CleanEnchant(formAcc);
		
		var ench1 = 41;
		var ench2 = 41;
		for ( var i = 0; EnchantListOBJ[ench1][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
		}
		//slot 3
		for ( var i = 0; EnchantListOBJ[ench2][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench2][i]][1],EnchantOBJ[EnchantListOBJ[ench2][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
	}
	else if(access_id == 2342 || access_id == 2343)
	{//Vigilante Badge || Hippie Feather
		CleanEnchant(formAcc);
		var ench1 = 104;
		for ( var i = 0; EnchantListOBJ[ench1][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
	}
	else if(access_id == 2389 || access_id == 2391 || access_id == 2393)
	{ // Illusion Skull Ring || Illusion Ring || Vampire's Familiar
		CleanEnchant(formAcc);
		var ench1 = 111;
		//Slot 4 & 3
		for ( var i = 0; EnchantListOBJ[ench1][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
	}
	else if(access_id == 2530 || access_id == 2532)
	{// Illusion Booster L || Illusion Battle Chip L
		CleanEnchant(formAcc);
		var ench1 = 122;
		for ( var i = 0; EnchantListOBJ[ench1][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
			formElements[formAcc + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_2"].disabled = false;
	}
	else if(access_id == 2531 || access_id == 2533)
	{// Illusion Booster R || Illusion Battle Chip R
		CleanEnchant(formAcc);
		var ench1 = 123;
		for ( var i = 0; EnchantListOBJ[ench1][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
			formElements[formAcc + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		formElements[formAcc + "_3"].disabled = false;
		formElements[formAcc + "_2"].disabled = false;
	}
	// else if(access_id == 9999)
	// {
		// CleanEnchant(formAcc);
	// }
	else if(access_id == 2351 || access_id == 2352 || access_id == 2353 || access_id == 2355)
	{//Red Lantern || Hurt Mind || Kind Heart || Evilspirit Gloves
		CleanEnchant(formAcc);
		var ench1 = 105;
		var ench2 = 106;
		var ench3 = 107;
		for ( var i = 0; EnchantListOBJ[ench1][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench1][i]][1],EnchantOBJ[EnchantListOBJ[ench1][i]][0]);
		}
		formElements[formAcc + "_4"].disabled = false;
		for ( var i = 0; EnchantListOBJ[ench2][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench2][i]][1],EnchantOBJ[EnchantListOBJ[ench2][i]][0]);
		}
		formElements[formAcc + "_3"].disabled = false;
		for ( var i = 0; EnchantListOBJ[ench3][i] != "NULL"; i++ )
		{
			formElements[formAcc + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench3][i]][1],EnchantOBJ[EnchantListOBJ[ench3][i]][0]);
		}
		formElements[formAcc + "_2"].disabled = false;
	}
	else
	{
		CleanEnchant(formAcc);
	}
	// StAllCalc();
	// refresh selects
	$("#"+formAcc + "_2").trigger("chosen:updated");
	$("#"+formAcc + "_3").trigger("chosen:updated");
	$("#"+formAcc + "_4").trigger("chosen:updated");
}

function ClickHeadUp( data, isRefine )
{
	//upper head id
	var head_up_id = ItemOBJ[n_A_Equip[eq_HEAD_UPPER]][itm_ID];
	//upper head refine level
	var head_up_ref = n_A_HEAD_DEF_PLUS;
	if(isRefine)
	{
		head_up_ref = data;
	}
	else
	{
		head_up_id = data;
	}
	
	if(head_up_id >= 2215 && head_up_id <= 2229)
	{//Bio5 headgear
		if(!isRefine)
		{
			CleanEnchant("A_HEAD_UPPER_ENCHANT");
			//slot 4 & 3
			for ( var i = 0; EnchantListOBJ[99][i] != "NULL"; i++ )
			{
				formElements["A_HEAD_UPPER_ENCHANT" + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[99][i]][1],EnchantOBJ[EnchantListOBJ[99][i]][0]);
				formElements["A_HEAD_UPPER_ENCHANT" + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[99][i]][1],EnchantOBJ[EnchantListOBJ[99][i]][0]);
			}
			//slot 2
			for ( var i = 0; EnchantListOBJ[100][i] != "NULL"; i++ )
			{
				formElements["A_HEAD_UPPER_ENCHANT" + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[100][i]][1],EnchantOBJ[EnchantListOBJ[100][i]][0]);
			}
		}
		formElements["A_HEAD_UPPER_ENCHANT" + "_4"].disabled = false;
		formElements["A_HEAD_UPPER_ENCHANT" + "_3"].disabled = false;
		formElements["A_HEAD_UPPER_ENCHANT" + "_2"].disabled = false;
	}
	else if(head_up_id == 2354 || head_up_id == 2356)
	{// Lush Rose || Celine's Ribbon
		if(!isRefine)
		{
			CleanEnchant("A_HEAD_UPPER_ENCHANT");
			for ( var i = 0; EnchantListOBJ[109][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_HEAD_UPPER_ENCHANT" + "_4" ].options[i] = new Option(EnchantOBJ[EnchantListOBJ[109][i]][1],EnchantOBJ[EnchantListOBJ[109][i]][0]);
			}
			for ( var i = 0; EnchantListOBJ[106][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_HEAD_UPPER_ENCHANT" + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[106][i]][1],EnchantOBJ[EnchantListOBJ[106][i]][0]);
			}
		}
		formElements["A_HEAD_UPPER_ENCHANT" + "_4"].disabled = false;
		formElements["A_HEAD_UPPER_ENCHANT" + "_3"].disabled = false;
		formElements["A_HEAD_UPPER_ENCHANT" + "_2"].disabled = true;
	}
	else if(head_up_id == 2370 || head_up_id == 2373 || head_up_id == 2398)
	{// Illusion Nurse Cap || Illusion Apple of Archer || Illusion Cap
		if(!isRefine)
		{
			CleanEnchant("A_HEAD_UPPER_ENCHANT");
			for ( var i = 0; EnchantListOBJ[110][i] != "NULL" && !isRefine; i++ )
			{
				formElements["A_HEAD_UPPER_ENCHANT" + "_4" ].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
				formElements["A_HEAD_UPPER_ENCHANT" + "_3" ].options[i] = new Option(EnchantOBJ[EnchantListOBJ[110][i]][1],EnchantOBJ[EnchantListOBJ[110][i]][0]);
			}
		}
		formElements["A_HEAD_UPPER_ENCHANT" + "_4"].disabled = false;
		formElements["A_HEAD_UPPER_ENCHANT" + "_3"].disabled = false;
		formElements["A_HEAD_UPPER_ENCHANT" + "_2"].disabled = true;
	}
	// else if(head_up_id == 9999)
	// {
		// if(!isRefine)
			// CleanEnchant("A_HEAD_UPPER_ENCHANT");
		// formElements["A_HEAD_UPPER_ENCHANT" + "_4"].disabled = false;
		// for ( var i = 0; EnchantListOBJ[999][i] != "NULL" && !isRefine; i++ )
		// {
			// formElements["A_HEAD_UPPER_ENCHANT" + "_4" ].options[i] = new Option(EnchantOBJ[EnchantListOBJ[999][i]][1],EnchantOBJ[EnchantListOBJ[999][i]][0]);
		// }
	// }
	else
	{
		CleanEnchant("A_HEAD_UPPER_ENCHANT");
	}	
	// refresh selects
	$("#A_HEAD_UPPER_ENCHANT_2").trigger("chosen:updated");
	$("#A_HEAD_UPPER_ENCHANT_3").trigger("chosen:updated");
	$("#A_HEAD_UPPER_ENCHANT_4").trigger("chosen:updated");
}

function ClickShadowArmor( data, isRefine )
{
	//Shadow Armor ID
	var s_armor_id = ItemOBJ[n_A_Equip[eq_SHADOW_ARMOR]][itm_ID];
	//Shadow Armor refine level
	var s_armor_ref = n_A_SHADOW_BODY_DEF_PLUS;
	if(isRefine)
	{
		s_armor_ref = data;
	}
	else
	{
		s_armor_id = data;
	}

	if(s_armor_id == 1735)
	{//Shadow Monk Armor
		if(!isRefine)
		{
				console.log("ClickShadowArmor : " + s_armor_id);
			CleanShadowEnchant("A_SHADOW_BODY_ENCHANT");
			let ench_num = 130;
			for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			{
				formElements["A_SHADOW_BODY_ENCHANT"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			}
		}
		formElements["A_SHADOW_BODY_ENCHANT"].disabled = false;
	}
	// else if(s_armor_id == 9999)
	// {
		// if(!isRefine)
		// {
			// CleanShadowEnchant("A_SHADOW_BODY_ENCHANT");
			// let ench_num = XXX;
			// for ( var i = 0; EnchantListOBJ[ench_num][i] != "NULL"; i++ )
			// {
				// formElements["A_SHADOW_BODY_ENCHANT"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[ench_num][i]][1],EnchantOBJ[EnchantListOBJ[ench_num][i]][0]);
			// }
		// }
		// formElements["A_SHADOW_BODY_ENCHANT"].disabled = false;
	// }
	else
	{
		CleanShadowEnchant("A_SHADOW_BODY_ENCHANT");
		// CleanEnchant("A_HEAD_UPPER_ENCHANT");
	}	
	
	// refresh selects
	$("#A_SHADOW_BODY_ENCHANT").trigger("chosen:updated");
}

//Mora Enchants
function SetEnchant(formEq,EqRefine,Ench1,Ench2)
{
		//slot 4
		for ( var i = 0; EnchantListOBJ[Ench1][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formEq + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
				
			if(i == 1)
			{
				formElements[formEq + "_4"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_4"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements[formEq + "_4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
		}
		//slot 3
		for ( var i = 0; EnchantListOBJ[Ench1 + 1][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formEq + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1 + 1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1 + 1][i]][0]);
			}
				
			if(i == 1)
			{
				formElements[formEq + "_3"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_3"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements[formEq + "_3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1 + 1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1 + 1][i]][0]);
			}
		}
		//slot 2
		for ( var i = 0; EnchantListOBJ[Ench1 + 2][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formEq + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1 + 2][i]][1],EnchantOBJ[EnchantListOBJ[Ench1 + 2][i]][0]);
			}
				
			if(i == 1)
			{
				formElements[formEq + "_2"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_2"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements[formEq + "_2"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1 + 2][i]][1],EnchantOBJ[EnchantListOBJ[Ench1 + 2][i]][0]);
			}
		}
		if(EqRefine >= 9)
		{
			//slot 4
			var formsize = formElements[formEq + "_4"].length;
			formElements[formEq + "_4"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_4"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[Ench2][i] != "NULL"; i++ )
			{
				formElements[formEq + "_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2][i]][0]);
			}
			//slot 3
			formsize = formElements[formEq + "_3"].length;
			formElements[formEq + "_3"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_3"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[Ench2 + 1][i] != "NULL"; i++ )
			{
				formElements[formEq + "_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2 + 1][i]][1],EnchantOBJ[EnchantListOBJ[Ench2 + 1][i]][0]);
			}
			//slot 2
			formsize = formElements[formEq + "_2"].length;
			formElements[formEq + "_2"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_2"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[Ench2 + 2][i] != "NULL"; i++ )
			{
				formElements[formEq + "_2"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2 + 2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2 + 2][i]][0]);
			}
		}
		formElements[formEq + "_4"].disabled = false;
		formElements[formEq + "_3"].disabled = false;
		if(formEq != "A_ACCES1_ENCHANT" && formEq != "A_ACCES2_ENCHANT")
			formElements[formEq + "_2"].disabled = false;
}

//Verus Enchants
function SetEnchant2(formEq,EqRefine,Ench1,Ench2)
{
	if(formEq != "A_ARMOR_ENCHANT")
	{
		//slot 4 && slot 3 && slot 2
		for ( var i = 0; EnchantListOBJ[Ench1][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formEq + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
				formElements[formEq + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
				formElements[formEq + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
				
			if(i == 1 && (formEq != "A_ACCES1_ENCHANT" && formEq != "A_ACCES2_ENCHANT"))
			{
				formElements[formEq + "_4"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_4"].options[i].disabled = true;
				formElements[formEq + "_3"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_3"].options[i].disabled = true;
				formElements[formEq + "_2"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_2"].options[i].disabled = true;
			}
			if(i >= 1 && (formEq != "A_ACCES1_ENCHANT" && formEq != "A_ACCES2_ENCHANT"))
			{
				formElements[formEq + "_4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
				formElements[formEq + "_3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
				formElements[formEq + "_2"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
			else if(i >= 1)
			{
				formElements[formEq + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
				formElements[formEq + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
		}
		if(EqRefine >= 9)
		{
			//slot 4
			var formsize = formElements[formEq + "_4"].length;
			formElements[formEq + "_4"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_3"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_2"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_4"].options[formsize].disabled = true;
			formElements[formEq + "_3"].options[formsize].disabled = true;
			formElements[formEq + "_2"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[Ench2][i] != "NULL"; i++ )
			{
				formElements[formEq + "_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2][i]][0]);
				formElements[formEq + "_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2][i]][0]);
				formElements[formEq + "_2"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2][i]][0]);
			}
		}
		formElements[formEq + "_4"].disabled = false;
		formElements[formEq + "_3"].disabled = false;
		if(formEq != "A_ACCES1_ENCHANT" && formEq != "A_ACCES2_ENCHANT")
			formElements[formEq + "_2"].disabled = false;
	}
	else
	{
		//slot 4
		for ( var i = 0; EnchantListOBJ[Ench1][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formEq + "_4"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
				
			if(i == 1)
			{
				formElements[formEq + "_4"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_4"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements[formEq + "_4"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
		}
		Ench1++;
		//slot 3 && slot 2
		for ( var i = 0; EnchantListOBJ[Ench1][i] != "NULL"; i++ )
		{
			if(i < 1)
			{
				formElements[formEq + "_3"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
				formElements[formEq + "_2"].options[i] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
				
			if(i == 1)
			{
				formElements[formEq + "_3"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_3"].options[i].disabled = true;
				formElements[formEq + "_2"].options[i] = new Option(EnchToName(Ench1));
				formElements[formEq + "_2"].options[i].disabled = true;
			}
			if(i >= 1)
			{
				formElements[formEq + "_3"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
				formElements[formEq + "_2"].options[i+1] = new Option(EnchantOBJ[EnchantListOBJ[Ench1][i]][1],EnchantOBJ[EnchantListOBJ[Ench1][i]][0]);
			}
		}
		if(EqRefine >= 9)
		{
			//slot 4
			var formsize = formElements[formEq + "_4"].length;
			formElements[formEq + "_4"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_4"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[Ench2][i] != "NULL"; i++ )
			{
				formElements[formEq + "_4"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2][i]][0]);
			}
			//slot 3 && slot 2
			Ench2++;
			formsize = formElements[formEq + "_3"].length;
			formElements[formEq + "_3"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_2"].options[formsize] = new Option(EnchToName(Ench2));
			formElements[formEq + "_3"].options[formsize].disabled = true;
			formElements[formEq + "_2"].options[formsize].disabled = true;
			for ( var i = 1; EnchantListOBJ[Ench2][i] != "NULL"; i++ )
			{
				formElements[formEq + "_3"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2][i]][0]);
				formElements[formEq + "_2"].options[i+formsize] = new Option(EnchantOBJ[EnchantListOBJ[Ench2][i]][1],EnchantOBJ[EnchantListOBJ[Ench2][i]][0]);
			}
		}
		formElements[formEq + "_4"].disabled = false;
		formElements[formEq + "_3"].disabled = false;
		formElements[formEq + "_2"].disabled = false;
	}
}

function EnchToName(numEnch)
{
	switch(numEnch)
	{
		case 1 : 
		case 2 : 
		case 3 : 
		case 4 : 
		case 5 : 
		case 6 : 
		case 7 : 
		case 8 : 
		case 9 : 
		case 10 : 
			return "not a mora enchant";
			break;
		case 11 :
		case 12 :
		case 13 :
			return "Strength";
			break;
		case 14 :
		case 15 :
		case 16 :
			return "ATK Type";
			break;
		case 17 :
		case 18 :
		case 19 :
			return "Physical Type";
			break;
		case 20 :
		case 21 :
		case 22 :
			return "Critical Type";
			break;
		case 23 :
		case 24 :
		case 25 :
			return "Evasion";
			break;
		case 26 :
		case 27 :
		case 28 :
			return "Ranged Type";
			break;
		case 29 :
		case 30 :
		case 31 :
			return "Assist Ability";
			break;
		case 32 :
		case 33 :
		case 34 :
			return "Spell Ability 1";
			break;
		case 35 :
		case 36 :
		case 37 :
			return "Spell Ability 2";
			break;
		case 38 :
		case 39 :
		case 40 :
			return "Healer";
			break;
		case 50 :
		case 51 :
		case 52 :
			return "Arch Bishop";
			break;
		case 68 :
		case 69 :
			return "Speed";
			break;
		case 70 :
		case 71 :
			return "Attack";
			break;
		case 72 :
		case 74 :
			return "Regular";
			break;
		case 73 :
		case 75 :
			return "Superior";
			break;
		case 77 :
		case 78 :
			return "Defense";
			break;
		case 79 :
		case 80 :
			return "Crit";
			break;
		case 81 :
		case 82 :
			return "Expert Archer/Perfect Dodge";
			break;
		case 83 :
		case 84 :
			return "Magic";
			break;
		case 85 :
		case 86 :
			return "ASPD";
			break;
		default :
			return "not a mora enchant";
			break;
	}
}

function CleanEnchant(formEq)
{
	// console.log("clean enchant" + formEq);
	//clean enchant list
	var len = formElements[formEq + "_2"].length;
	for ( var i = 0; i < len ; i++ )
	{
		formElements[formEq + "_2"].options[0] = null;
	}
	len = formElements[formEq + "_3"].length;
	for ( var i = 0; i < len ; i++ )
	{
		formElements[formEq + "_3"].options[0] = null;
	}
	len = formElements[formEq + "_4"].length;
	for ( var i = 0; i < len ; i++ )
	{
		formElements[formEq + "_4"].options[0] = null;
	}
	formElements[formEq + "_2"].options[0] = new Option(EnchantOBJ[EnchantListOBJ[0][0]][1],EnchantOBJ[EnchantListOBJ[0][0]][0]);
	formElements[formEq + "_3"].options[0] = new Option(EnchantOBJ[EnchantListOBJ[0][0]][1],EnchantOBJ[EnchantListOBJ[0][0]][0]);
	formElements[formEq + "_4"].options[0] = new Option(EnchantOBJ[EnchantListOBJ[0][0]][1],EnchantOBJ[EnchantListOBJ[0][0]][0]);
	formElements[formEq + "_2"].disabled = true;
	formElements[formEq + "_3"].disabled = true;
	formElements[formEq + "_4"].disabled = true;
	StAllCalc();
	
}
function CleanShadowEnchant(formEq)
{
	// console.log("clean enchant" + formEq);
	//clean enchant list
	var len = formElements[formEq].length;
	for ( var i = 0; i < len ; i++ )
	{
		formElements[formEq].options[0] = null;
	}
	
	formElements[formEq].options[0] = new Option(EnchantOBJ[EnchantListOBJ[0][0]][1],EnchantOBJ[EnchantListOBJ[0][0]][0]);
	formElements[formEq].disabled = true;
	StAllCalc();
	
}

function ClickWeaponType( weaponType )
{
	n_A_JobSet();
	
	// Show Arrows?
	if ( n_A_JobSearch() === cls_THI ||
		 n_A_JobSearch() === cls_ARC ||
		 ( (n_A_JOB === cls_GUN || n_A_JOB === cls_REB) && weaponType !== weapTyp_NONE ) )
	{
		formElements["A_Arrow"].style.visibility = "visible";
		var len = formElements["A_Arrow"].length;
		for ( var i = 0; i < len; i++ )
		{
			// clear arrow options
			formElements["A_Arrow"].options[0] = null;
		}
		
		if ( weaponType == weapTyp_BOW || weaponType == weapTyp_INSTRUMENT || weaponType == weapTyp_WHIP )
		{
			// Arrows
			for ( var i = 0; i < ArrowOBJ.length; i++ )
			{
				formElements["A_Arrow"].options[i] = new Option( ArrowOBJ[i][2 + Language], i );
			}
		}
		else if ( weaponType == weapTyp_HANDGUN || weaponType == weapTyp_RIFLE ||
				  weaponType == weapTyp_SHOTGUN || weaponType == weapTyp_GATLING_GUN )
		{
			// bullets
			for ( var i = 0; i < BulletOBJ.length; i++ )
			{
				formElements["A_Arrow"].options[i] = new Option( BulletOBJ[i][2 + Language], i );
			}
		}
		else if ( weaponType == weapTyp_GRENADE_LAUNCHER )
		{	
			// grenades
			for ( var i = 0; i < GrenadeOBJ.length; i++ )
			{
				formElements["A_Arrow"].options[i] = new Option( GrenadeOBJ[i][2 + Language], i );
			}
		}
		else
		{
			// Arrows
			for ( var i = 0; i < ArrowOBJ.length; i++ )
			{
				formElements["A_Arrow"].options[i] = new Option( ArrowOBJ[i][2 + Language], i );
			}
			// ArrowOBJ[0] = NONEARROW; // Soll ?
			//formElements["A_Arrow"].options[0] = new Option( SecondArrowOBJ[0][2 + Language], 0 );
			//formElements["A_Arrow"].options[1] = new Option( SecondArrowOBJ[1][2 + Language], 1 );
		}
	}
	else if ( n_A_JOB === cls_MEC || n_A_JOB === cls_MECt ||
			  n_A_JOB === cls_GEN || n_A_JOB === cls_GENt )
	{
		formElements["A_Arrow"].style.visibility = "visible";
		var len = formElements["A_Arrow"].length;
		for ( var i = 0; i < len; i++ )
		{ // clear arrow options
			formElements["A_Arrow"].options[0] = null;
		}
		var len = CannonBallOBJ.length;
		for ( var i = 0; i < CannonBallOBJ.length; i++ )
		{ // Cannon Balls
			formElements["A_Arrow"].options[i] = new Option( CannonBallOBJ[i][2 + Language], i );
		}
	}
	else
	{
		formElements["A_Arrow"].value = 0;
		formElements["A_Arrow"].style.visibility = "hidden";
	}
	WeaponSet();
	
	if ( weaponType === 0 )
	{
		formElements["A_Weapon_ATKplus"].style.visibility = "hidden";
		formElements["A_Weapon_ATKplus"].value = 0;
	}
	else
	{
		formElements["A_Weapon_ATKplus"].style.visibility = "visible";
	}

	n_A_JobSet();
	if ( (n_A_JobSearch2() == cls_ASS && weaponType != 11) || (n_A_JOB == cls_KAGOB && weaponType != weapTyp_HUUMA_SHURIKEN) )
	{ // AssaCls & kagero
		//if ( n_Nitou == 0 )
		//{ // dual handed
			//var htmlStr = "Left Hand: ";
			var htmlStr = '<select id="A_Weapon2Type"  style="width:200px;" onchange="ClickWeaponType2(this[this.selectedIndex].value) | StAllCalc()">';
			if (n_A_JOB == cls_KAGOB)
				htmlStr += '<option value="0">Fist or Shield</option><option value="1">Dagger</option></select>';
			else
				htmlStr += '<option value="0">Fist or Shield</option><option value="1">Dagger</option><option value="6">One-handed Axe</option><option value="2">One-handed Sword</option></select>';
			myInnerHtml( "A_SobWeaponName", htmlStr, 0 );
			myInnerHtml("A_Mal_Ench3sp","<select id=\"A_Mal_Ench3\" style=\"width:200px\" disabled onchange=\"StAllCalc()|DisplayEnchantDescription(this[this.selectedIndex].value)\"><option value=\"0\">\"(No Enchant)\"</option>",0);
			myInnerHtml("A_Mal_Ench4sp","<select id=\"A_Mal_Ench4\" style=\"width:200px\" disabled onchange=\"StAllCalc()|DisplayEnchantDescription(this[this.selectedIndex].value)\"><option value=\"0\">\"(No Enchant)\"</option>",0);
		
			// show the off hand table
			var element = document.getElementById( "offweapon" );
			var state = element.style.display;
			element.style.display = 'block';
				// show the shield table
			with(document.calcForm)
			{		
				A_LEFT_DEF_PLUS.disabled = false;
				A_left.disabled = false;
				A_left_card.disabled = false;
				
			}
			$("#A_Weapon2Type").chosen({no_results_text: "Oops, nothing found!"});
			$("#A_Weapon2Type").trigger("chosen:updated");
			$("#A_Mal_Ench3").chosen({no_results_text: "Oops, nothing found!"});
			$("#A_Mal_Ench3").trigger("chosen:updated");
			$("#A_Mal_Ench4").chosen({no_results_text: "Oops, nothing found!"});
			$("#A_Mal_Ench4").trigger("chosen:updated");	
		// }
			
	}
	else
	{
		myInnerHtml("A_SobWeaponName","",0);
		//myInnerHtml("id_right1","",0); // soll
		//myInnerHtml("id_right2","",0); // soll
		myInnerHtml("spanA_weapon2","",0);
		myInnerHtml("spanA_weapon2seiren","",0); // soll weg
		myInnerHtml("spanA_weapon2_CardShort","",0);
		myInnerHtml("nA_weapon2_c1","",0);
		myInnerHtml("nA_weapon2_c2","",0);
		myInnerHtml("nA_weapon2_c3","",0);
		myInnerHtml("nA_weapon2_c4","",0);
		n_Nitou = 0;
		// formElements["A_LEFT_DEF_PLUS"].style.visibility = "visible";
		// formElements["A_left"].style.visibility = "visible";
		// formElements["A_left_card"].style.visibility = "visible";
		// formElements["Shield_Pannel"].style.visibility = "visible";
		// with(document.calcForm)
		// {		
			document.calcForm.A_LEFT_DEF_PLUS.disabled = false;
			document.calcForm.A_left.disabled = false;
			document.calcForm.A_left_card.disabled = false;
		// }
		// myInnerHtml("ID_A_SHORTCUT_LOAD_BUTTON_L","",0); // soll
		
		// hide the off hand table
		var element = document.getElementById( "offweapon" );
		var state = element.style.display;
		element.style.display = 'none';
		// show the shield table
	}

	n_A_Equip[0] = parseInt(formElements["A_weapon1"].value);
	ActiveSkillSetPlus();
	DisplayItemDescription( n_A_Equip[0] );
	
	
	// $("#A_weapon1").chosen({no_results_text: "Oops, nothing found!"});
	$("#A_Arrow").trigger("chosen:updated");
	$("#A_weapon1").trigger("chosen:updated");
	
}

function ClickWeaponType2( n )
{
with(document.calcForm)
{	
	n_A_JobSet();
	if ( n != 0 )
	{
		if ( n_Nitou === 0 )
		{
			myInnerHtml("spanA_weapon2",'<select id="A_weapon2" style="width:200px;" onChange="ClickWeapon2(this[this.selectedIndex].value)|StAllCalc()|DisplayItemDescription(this[this.selectedIndex].value)"></select>',0);
			myInnerHtml("spanA_weapon2seiren", '<select id="A_Weapon2_ATKplus" style="width:65px;" onChange = "StAllCalc()"></select>',0);
			for ( var i = 0; i <= 20;i++ )
			{
				A_Weapon2_ATKplus.options[i] = new Option("+"+i,i);
			}

			myInnerHtml("nA_weapon2_c1",'<select id="A_weapon2_card1" style="width:200px;" onChange="StAllCalc()|Click_Card(this[this.selectedIndex].value)"></select>',0);
			myInnerHtml("nA_weapon2_c2",'<select id="A_weapon2_card2" style="width:200px;" onChange="StAllCalc()|Click_Card(this[this.selectedIndex].value)"></select>',0);
			myInnerHtml("nA_weapon2_c3",'<select id="A_weapon2_card3" style="width:200px;" onChange="StAllCalc()|Click_Card(this[this.selectedIndex].value)"></select>',0);
			myInnerHtml("nA_weapon2_c4",'<select id="A_weapon2_card4" style="width:200px;" onChange="StAllCalc()|Click_Card(this[this.selectedIndex].value)"></select>',0);

			// for ( var i = 0; CardSortOBJ[0][i] != "NULL"; i++ )
			// {
				// A_weapon2_card1.options[i] = new Option(cardOBJ[CardSortOBJ[0][i]][2],cardOBJ[CardSortOBJ[0][i]][0]);
			// }
			// for ( var i = 0; CardSortOBJ[1][i] != "NULL"; i++ )
			// {
				// A_weapon2_card2.options[i] = new Option(cardOBJ[CardSortOBJ[1][i]][2],cardOBJ[CardSortOBJ[1][i]][0]);
				// A_weapon2_card3.options[i] = new Option(cardOBJ[CardSortOBJ[1][i]][2],cardOBJ[CardSortOBJ[1][i]][0]);
				// A_weapon2_card4.options[i] = new Option(cardOBJ[CardSortOBJ[1][i]][2],cardOBJ[CardSortOBJ[1][i]][0]);
			// }
			// A_weapon2_card4.options[4] = new Option("Top10",106);
			document.calcForm.A_weapon2_card1.options[0] = new Option(cardOBJ[0][2],cardOBJ[0][0]);
			document.calcForm.A_weapon2_card2.options[0] = new Option(cardOBJ[0][2],cardOBJ[0][0]);
			document.calcForm.A_weapon2_card3.options[0] = new Option(cardOBJ[0][2],cardOBJ[0][0]);
			document.calcForm.A_weapon2_card4.options[0] = new Option(cardOBJ[0][2],cardOBJ[0][0]);
			for(i=0;i<cardOBJ.length;i++)
			{
				if(cardOBJ[i][1]==card_comp_WEAPON)
				{
					document.calcForm.A_weapon2_card1.add(ReturnOption(i));
					document.calcForm.A_weapon2_card2.add(ReturnOption(i));
					document.calcForm.A_weapon2_card3.add(ReturnOption(i));
					document.calcForm.A_weapon2_card4.add(ReturnOption(i));
				}
			}
			sortSelect(document.calcForm.A_weapon2_card1);
			sortSelect(document.calcForm.A_weapon2_card2);
			sortSelect(document.calcForm.A_weapon2_card3);
			sortSelect(document.calcForm.A_weapon2_card4);
			for(i=1;i<5;i++)
			{
				if(i<4)
				{
					document.calcForm.A_weapon2_card1.add(ReturnOption(i),i);
					document.calcForm.A_weapon2_card2.add(ReturnOption(i),i);
					document.calcForm.A_weapon2_card3.add(ReturnOption(i),i);
					document.calcForm.A_weapon2_card4.add(ReturnOption(i),i);
				}
				else
				{
					document.calcForm.A_weapon2_card1.add(ReturnOption(156),i);
					document.calcForm.A_weapon2_card2.add(ReturnOption(156),i);
					document.calcForm.A_weapon2_card3.add(ReturnOption(156),i);
					document.calcForm.A_weapon2_card4.add(ReturnOption(156),i);
				}
				
			}
			for(i=0;i<4;i++)
			{
				document.calcForm.A_weapon2_card1.add(ReturnOption(201+i),i+1);
			}

			// A_LEFT_DEF_PLUS.style.visibility = "hidden";
			// A_LEFT_DEF_PLUS.value = 0;
			// A_left.style.visibility = "hidden";
			// A_left.value = 305;
			// A_left_card.style.visibility = "hidden";
			// A_left_card.value = 0;
			A_LEFT_DEF_PLUS.disabled = true;
			A_left.disabled = true;
			A_left.value = 305;
			A_left_card.disabled = true;
			A_left_card.value = 0;
			// hide the shield table
			// var element = document.getElementById( "Shield_Pannel" );
			// var state = element.style.display;
			// element.style.display = 'none';
		}
		myInnerHtml("spanA_weapon2_CardShort",'<select id="A_cardshortLeft" style="width:200px;" onChange="SetCardShortLeft()|StAllCalc()|ActiveSkillSetPlus()"></select>',0);
		A_cardshortLeft.options[0] = new Option("Card Shortcuts",0);
		for ( var i = 1; i <= 38; i++ )
		{
			A_cardshortLeft.options[i] = new Option(CardShort[i][0],i);
		}
		n_Nitou = 1;
		WeaponSetLeft();
	}
	else
	{
		myInnerHtml("spanA_weapon2","",0);
		myInnerHtml("spanA_weapon2seiren","",0);
		myInnerHtml("spanA_weapon2_CardShort","",0);
		myInnerHtml("nA_weapon2_c1","",0);
		myInnerHtml("nA_weapon2_c2","",0);
		myInnerHtml("nA_weapon2_c3","",0);
		myInnerHtml("nA_weapon2_c4","",0);
		n_Nitou = 0;

		A_LEFT_DEF_PLUS.style.visibility = "visible";
		A_left.style.visibility = "visible"
		A_left_card.style.visibility = "visible"
		// Show the shield table
		A_LEFT_DEF_PLUS.disabled = false;
		A_left.disabled = false;
		A_left_card.disabled = false;
	}
	if ( n_Nitou )
	{
		n_A_Equip[1] = eval(A_weapon2.value);
		ActiveSkillSetPlus();
		DisplayItemDescription(n_A_Equip[1]);
	}
}
$("#A_weapon2").chosen({no_results_text: "Oops, nothing found!"});
$("#A_weapon2").trigger("chosen:updated");
$("#A_Weapon2_ATKplus").chosen({no_results_text: "Oops, nothing found!"});
$("#A_Weapon2_ATKplus").trigger("chosen:updated");
$("#A_weapon2_card1").chosen({no_results_text: "Oops, nothing found!"});
$("#A_weapon2_card1").trigger("chosen:updated");
$("#A_weapon2_card2").chosen({no_results_text: "Oops, nothing found!"});
$("#A_weapon2_card2").trigger("chosen:updated");
$("#A_weapon2_card3").chosen({no_results_text: "Oops, nothing found!"});
$("#A_weapon2_card3").trigger("chosen:updated");
$("#A_weapon2_card4").chosen({no_results_text: "Oops, nothing found!"});
$("#A_weapon2_card4").trigger("chosen:updated");
$("#A_cardshortLeft").chosen({no_results_text: "Oops, nothing found!"});
$("#A_cardshortLeft").trigger("chosen:updated");
$("#A_LEFT_DEF_PLUS").trigger("chosen:updated");
$("#A_left").trigger("chosen:updated");
$("#A_left_card").trigger("chosen:updated");
$("select").chosen({no_results_text: "Oops, nothing found!"});
$("#A_Mal_Ench3").trigger("chosen:updated");

}

function ClickAdopted()
{
	AdjustStatLists( n_A_JOB );
	calc();
	StCalc();
	StAllCalc();
}

function ClickActiveSkill()
{
with(document.calcForm)
{
	n_A_ActiveSkill = eval(A_ActiveSkill.value);
	
	if ( n_A_ActiveSkill >= 3000 )
	{
		n_A_ActiveSkillLV = InsertSkill[n_A_ActiveSkill -3000][3];
		n_A_ActiveSkill = InsertSkill[n_A_ActiveSkill -3000][2];
	}
	else if ( n_A_ActiveSkill >= 2000 )
	{
		n_A_ActiveSkillLV = AutoSpellSkill[n_A_ActiveSkill -2000][3];
		n_A_ActiveSkill = AutoSpellSkill[n_A_ActiveSkill -2000][2];
	}
	else
	{
		n_A_ActiveSkillLV = SkillOBJ[n_A_ActiveSkill][1];
	}

	var len = A_ActiveSkillLV.length;
	for(i=0;i<len;i++)
	{
		A_ActiveSkillLV.options[0] = null;
	}
	
	if ( n_A_ActiveSkill >= 0 )
	{
		for(i=1;i<=n_A_ActiveSkillLV;i++)
		{
			A_ActiveSkillLV.options[i-1] = new Option(i,i);
		}
	}

	if ( SkillOBJ[n_A_ActiveSkill][1] == 1 )
	{
		A_ActiveSkillLV.style.visibility = "hidden";
	}
	else
	{
		A_ActiveSkillLV.style.visibility = "visible";
		A_ActiveSkillLV.value = n_A_ActiveSkillLV;
	}
	ClickActiveSkill2();
}
// refresh selects
	$("select").trigger("chosen:updated");
}

function ClickMonsterSkill(level)
{
with(document.calcForm)
{
	if (level) {
		n_A_MobSkillLV = eval(A_ActiveSkillLV_en.value);
		calcIncomingDamage();
		return;
	}
	
	n_A_MobSkill = A_ActiveSkill_en.value;
	n_A_MobSkillLV = 1;

	var len = A_ActiveSkillLV_en.length;
	for(i=0;i<len;i++)
	{
		A_ActiveSkillLV_en.options[0] = null;
	}
	
	if ( n_A_MobSkill >= 0 )
	{
		for(i=1;i<=enemySkills[n_A_MobSkill].length-3;i++)
		{
			A_ActiveSkillLV_en.options[i-1] = new Option(i,i);
		}
	}

	if ( enemySkills[n_A_MobSkill].length-3 == 1 )
	{
		A_ActiveSkillLV_en.style.visibility = "hidden";
	}
	else
	{
		A_ActiveSkillLV_en.style.visibility = "visible";
		A_ActiveSkillLV_en.value = n_A_MobSkillLV;
	}
	calcIncomingDamage();
}
// refresh selects
	$("select").trigger("chosen:updated");
}
function ClickActiveSkill2()
{ // display dropdowns from active skill
with(document.calcForm)
{
	myInnerHtml( "AASkillName2", "", 0 );
	myInnerHtml( "AASkill2", "", 0 );
	myInnerHtml( "AASkillName3", "", 0 );
	myInnerHtml( "AASkill3", "", 0 );
	myInnerHtml( "AASkillName4", "", 0 );
	myInnerHtml( "AASkill4", "", 0 );
		
	if ( n_A_ActiveSkill == skill_ME_CART_REVOLUTION ||
		 n_A_ActiveSkill == skill_MS_HIGH_SPEED_CART_RAM ||
		 n_A_ActiveSkill == skill_GEN_CART_TORNADO)
	{
		myInnerHtml("AASkillName","<br/>Cart Weight:",0);
		myInnerHtml("AASkill",'<input type="text" name="SkillSubNum" value="8000" size=8>',0);
		
	}
	else if ( n_A_ActiveSkill == skill_WI_STORM_GUST )
	{
		myInnerHtml("AASkillName","<br/>Hits: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=1;i<=15;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=3;
		
	}
	else if ( n_A_ActiveSkill == skill_AS_VENOM_SPLASHER )
	{
		myInnerHtml("AASkillName","<br/>Poison React Lv.:",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=0;i<=5;i++)
			SkillSubNum.options[i] = new Option(i+5,i+5);
		SkillSubNum.value=5;
		if(n_A_JobSearch2() == 14)
			SkillSubNum.value=0;
	}
	else if ( n_A_ActiveSkill === skill_MO_GUILLOTINE_FIST )
	{
		myInnerHtml("AASkillName","<br/>Remaining SP:",0);
		myInnerHtml("AASkill",'<input type="text" name="SkillSubNum" size=6>',0);
		SkillSubNum.value = n_A_MaxSP -1;
	}
	else if ( n_A_ActiveSkill === skill_NIN_THROW_DAGGER )
	{
		myInnerHtml("AASkillName","<br/>",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for ( var i = 0; i < 5; i++ )
		{
			SkillSubNum.options[i] = new Option(ShurikenOBJ[i][2 + Language],i);
		}
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill === skill_NIN_THROW_KUNAI ||
			  n_A_ActiveSkill === skill_KAG_SPINTHROW_KUNAI )
	{
		myInnerHtml("AASkillName","<br/>",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for ( var i = 0; i < 5; i++ )
		{
			SkillSubNum.options[i] = new Option(KunaiOBJ[i][2 + Language],i);
		}
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill == skill_KAG_SPIRIT_BREAKER )
	{
		myInnerHtml("AASkillName","<br/>Enemy in Soul Link Status: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		var CHATK_NAME = ["no","yes"];
		for ( var i = 0; i <= 1; i++ )
		{
			SkillSubNum.options[i] = new Option( CHATK_NAME[i], i );
		}
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill == skill_KAG_CROSS_STRIKE )
	{
		myInnerHtml("AASkillName","<br/>Enemy already hit by another Kagero/Oboro: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		var CHATK_NAME = ["no","yes"];
		for ( var i = 0; i <= 1; i++ )
		{
			SkillSubNum.options[i] = new Option( CHATK_NAME[i], i );
		}
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill === skill_NIN_KILLING_STRIKE ||
			  n_A_ActiveSkill === skill_NIN_KILLING_STRIKE_MAX )
	{
		// remaining HP
		if (n_A_ActiveSkill === skill_NIN_KILLING_STRIKE) {
		    myInnerHtml("AASkillName","<br/>Remaining HP:",0);
		    myInnerHtml("AASkill",'<input type="text" name="SkillSubNum" size=6>',0);
		    SkillSubNum.value = n_A_MaxHP -1;
		} else {
		    myInnerHtml("AASkillName","",0);
		    myInnerHtml("AASkill","",0);
		}
		// number of mirrors
		myInnerHtml( "AASkillName2", "<br/># Mirrors: ", 0 );
		myInnerHtml( "AASkill2", '<select id="SkillSubNum2" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 0; i <= 5; i++ )
		{
			SkillSubNum2.options[i] = new Option( i, i );
		}
		SkillSubNum2.value = 5;
	}
	else if ( n_A_ActiveSkill == skill_GS_DESPERADO )
	{
		myInnerHtml("AASkillName","<br/>Hits (Considering the Success Chance) :",0);
		var DEATH = ["1","1.2","1.6","2","2.4","3","3.6","4","5","6","7","8","9","10"];
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=0;i<=13;i++)
			SkillSubNum.options[i] = new Option(DEATH[i] + "Hit",i);
		SkillSubNum.value = 6;
		if( n_A_JOB == cls_REB)
		{
			myInnerHtml("AASkillName2","<br/>After Fallen Angel",0);
			myInnerHtml("AASkill2",'<input type="checkbox" name="SkillSubNum2" onchange="calc()">',0);
			SkillSubNum2.checked = false;
		}
	}
	else if ( n_A_ActiveSkill == skill_KN_CHARGE_ATTACK )
	{
		myInnerHtml("AASkillName","<br/>Enemy Distance: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		var CHATK_NAME = ["0~3 Cells","4~6 Cells","7~9 Cells","10~12 Cells","13+ Cells"];
		for(i=0;i<=4;i++)
			SkillSubNum.options[i] = new Option(CHATK_NAME[i],i);
		SkillSubNum.value=4;
	}
	else if ( n_A_ActiveSkill == skill_WAR_SOUL_EXPANSION )
	{
		myInnerHtml("AASkillName","<br/>Enemy in White Imprison: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		var CHATK_NAME = ["no","yes"];
		for ( var i = 1; i <= 2; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( CHATK_NAME[i - 1], i );
		}
		SkillSubNum.value = 1;
	}
	else if ( n_A_ActiveSkill == skill_WAR_JACK_FROST )
	{
		myInnerHtml("AASkillName","<br/>Enemy in Freezing Status: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		var CHATK_NAME = ["no","yes"];
		for ( var i = 0; i <= 1; i++ )
		{
			SkillSubNum.options[i] = new Option( CHATK_NAME[i], i );
		}
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill == skill_WAR_COMET )
	{
		myInnerHtml("AASkillName","<br/>Area of Effect: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		var CHATK_NAME = ["19x19","15x15","11x11","7x7"];
		for ( var i = 0; i <= 3; i++ )
		{
			SkillSubNum.options[i] = new Option( CHATK_NAME[i], i );
		}
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill == skill_WAR_CHAIN_LIGHTNING )
	{
		myInnerHtml("AASkillName","<br/>No of hits: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for( var i = 1; i <= 9; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( i, i );
		}
		SkillSubNum.value = 3;
	}
	else if ( n_A_ActiveSkill == skill_WAR_TETRA_VORTEX )
	{
		myInnerHtml("AASkillName","<br/>Element: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=ele_NEUTRAL;i<=ele_WIND;i++)
			SkillSubNum.options[i] = new Option(ZokuseiOBJ[i][Language],i);
		SkillSubNum.value=1;
	}
	else if ( n_A_ActiveSkill == skill_SOR_FIRE_WALK )
	{
		myInnerHtml("AASkillName","<br/>No of hits: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=1;i<=16;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=3;	
	}
	else if ( n_A_ActiveSkill == skill_SOR_ELECTRIC_WALK )
	{
		myInnerHtml("AASkillName","<br/>No of hits: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=1;i<=16;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=3;
	}
	else if ( n_A_ActiveSkill == skill_SOR_SPELL_FIST_FBOLT )
	{
		myInnerHtml("AASkillName","<br/>Bolt Level: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:50px;" onchange="calc()"></select>',0);
		for(i=1;i<=10;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=10;
	}
	else if ( n_A_ActiveSkill == skill_SOR_SPELL_FIST_CBOLT )
	{
		myInnerHtml("AASkillName","<br/>Bolt Level: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:50px;" onchange="calc()"></select>',0);
		for(i=1;i<=10;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=10;
	}
	else if ( n_A_ActiveSkill == skill_SOR_SPELL_FIST_LBOLT )
	{
		myInnerHtml("AASkillName","<br/>Bolt Level: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:50px;" onchange="calc()"></select>',0);
		for(i=1;i<=10;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=10;
	}
	else if ( n_A_ActiveSkill == skill_SOR_PSYCHIC_WAVE )
	{
		myInnerHtml("AASkillName","<br/>No of hits: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=1;i<=7;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=7;
	}
	else if ( n_A_ActiveSkill == skill_SOR_CLOUD_KILL )
	{
		myInnerHtml("AASkillName","<br/>No of hits: ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=1;i<=33;i++)
			SkillSubNum.options[i-1] = new Option(i,i);
		SkillSubNum.value=33;	
	}
	else if ( n_A_ActiveSkill === skill_MIWA_GREAT_ECHO )
	{
		myInnerHtml( "AASkillName", "<br/># Performers: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 2; i <= 12; i++ )
		{
			SkillSubNum.options[i - 2] = new Option( i, i );
		}
		SkillSubNum.value = 2;
	}
	else if ( n_A_ActiveSkill === skill_MIWA_REVERBERATION )
	{
		// number of reverberations
		myInnerHtml( "AASkillName", "<br/># Reverberations: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 1; i <= 20; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( i, i );
		}
		SkillSubNum.value = 1;
		// number of enemies
		myInnerHtml( "AASkillName2", "<br/># Enemies: ", 0 );
		myInnerHtml( "AASkill2", '<select id="SkillSubNum2" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 1; i <= 20; i++ )
		{
			SkillSubNum2.options[i - 1] = new Option( i, i );
		}
		SkillSubNum2.value = 1;
	}
	else if ( n_A_ActiveSkill === skill_MEC_AXE_TORNADO )
	{
		myInnerHtml( "AASkillName", "<br/># Hits: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:100px;" onchange="calc()"></select>', 0 );
		SkillSubNum.options[0] = new Option( "5x5 area", 0 );
		SkillSubNum.options[1] = new Option( "7x7 area", 1 );
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill === skill_RUN_IGNITION_BREAK )
	{
		myInnerHtml( "AASkillName", "<br/>Distance: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:100px;" onchange="calc()"></select>', 0 );
		SkillSubNum.options[0] = new Option( "Near", 1 );
		SkillSubNum.options[1] = new Option( "Medium", 2 );
		SkillSubNum.options[2] = new Option( "Far", 3 );
		SkillSubNum.value = 1;
	}
	else if ( n_A_ActiveSkill === skill_RUN_DEATH_BOUND )
	{
		myInnerHtml( "AASkillName", "<br/>Damage: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:100px;" onchange="calc()"></select>', 0 );
		var damage = 5000;
		for ( var i = 0; damage <= 200000; i++ )
		{
			SkillSubNum.options[i] = new Option( damage, damage );
			damage += 5000;
		}
		SkillSubNum.value = 5000;
	}
	else if ( n_A_ActiveSkill === skill_RUN_HUNDRED_SPEAR )
	{
		myInnerHtml( "AASkillName", "<br/>Clashing Spiral: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 0; i <= 5; i++ )
		{
			SkillSubNum.options[i] = new Option( i, i );
		}
		SkillSubNum.value = 5;
	}
	else if ( n_A_ActiveSkill === skill_RUN_DRAGON_BREATH || n_A_ActiveSkill === skill_RUN_DRAGON_BREATH_WATER)
	{
		myInnerHtml("AASkillName","<br/>Remaining HP:",0);
		myInnerHtml("AASkill",'<input type="text" name="SkillSubNum" size=6 onchange="calc()">',0);
		SkillSubNum.value = n_A_MaxHP;
	}
	else if ( n_A_ActiveSkill === skill_SUR_EARTH_SHAKER )
	{
		myInnerHtml( "AASkillName", "<br/>Target is visible:", 0 );
		myInnerHtml( "AASkill", '<input type="checkbox" name="SkillSubNum" onchange="calc()">', 0 );
		SkillSubNum.checked = true;
	}
	else if ( n_A_ActiveSkill === skill_SUR_KNUCKLE_ARROW )
	{
		myInnerHtml( "AASkillName", "<br/>Knockback damage:", 0 );
		myInnerHtml( "AASkill", '<input type="checkbox" name="SkillSubNum" onchange="calc()">', 0 );
		SkillSubNum.checked = false;
	}
	else if ( n_A_ActiveSkill === skill_SUR_RAMPAGE_BLASTER )
	{
		myInnerHtml( "AASkillName", "<br/>Number of Spheres: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 1; i <= 15; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( i, i );
		}
		SkillSubNum.value = 15;
	}
	else if ( n_A_ActiveSkill === skill_SUR_TIGER_CANNON )
	{
		myInnerHtml( "AASkillName", "<br/>Used after Fallen Empire:", 0 );
		myInnerHtml( "AASkill", '<input type="checkbox" name="SkillSubNum" onchange="calc()">', 0 );
		SkillSubNum.checked = false;
	}
	else if ( n_A_ActiveSkill === skill_RAN_AIMED_BOLT )
	{
		myInnerHtml( "AASkillName", "<br/>Number of Hits: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 1; i <= 5; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( i, i );
		}
		SkillSubNum.value = 1;
	}
	else if ( n_A_ActiveSkill === skill_GLT_CROSS_RIPPER_SLASHER )
	{
		myInnerHtml( "AASkillName", "<br/>Rolling Cutters: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 0; i <= 10; i++ )
		{
			SkillSubNum.options[i] = new Option( i, i );
		}
		SkillSubNum.value = 0;
	}
	else if ( n_A_ActiveSkill === skill_ROY_VANISHING_POINT )
	{
		myInnerHtml( "AASkillName", "<br/>Bash Level: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 0; i <= 10; i++ )
		{
			SkillSubNum.options[i] = new Option( i, i );
		}
		SkillSubNum.value = 10;
	}
	else if ( n_A_ActiveSkill === skill_ROY_RAGE_BURST )
	{
		// currentHP
		// myInnerHtml("AASkillName","<br/>Remaining HP:",0);
		// myInnerHtml("AASkill",'<input type="text" name="SkillSubNum" size=6 onchange="calc()">',0);
		// SkillSubNum.value = n_A_MaxHP;
		// number of rage counters
		myInnerHtml( "AASkillName", "<br/># Rage Counters: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 1; i <= 15; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( i, i );
		}
		SkillSubNum.value = 1;
	}
	else if ( n_A_ActiveSkill === skill_ROY_OVERBRAND )
	{
		myInnerHtml( "AASkillName", "<br/># Hits: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 1; i <= 3; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( i, i );
		}
		SkillSubNum.value = 1;
	}
	else if ( n_A_ActiveSkill === skill_ROY_OVERBRAND_OLD )
	{
		myInnerHtml( "AASkillName", "<br/># Hits: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 1; i <= 3; i++ )
		{
			SkillSubNum.options[i - 1] = new Option( i, i );
		}
		SkillSubNum.value = 1;
	}
	else if ( n_A_ActiveSkill === skill_MEC_SELF_DESTRUCTION )
	{
		// currentHP
		myInnerHtml( "AASkillName","<br/>Remaining HP:", 0 );
		myInnerHtml( "AASkill", '<input type="text" name="SkillSubNum" size=6 onchange="calc()">', 0 );
		SkillSubNum.value = n_A_MaxHP;
		// currentSP
		myInnerHtml( "AASkillName2", "<br/>Remaining SP: ", 0 );
		myInnerHtml( "AASkill2", '<input type="text" name="SkillSubNum2" size=6 onchange="calc()">', 0 );
		SkillSubNum2.value = n_A_MaxSP;
	}
	else if ( n_A_ActiveSkill === skill_SUR_SKY_NET_BLOW )
	{
		myInnerHtml( "AASkillName", "<br/>After Dragon Combo: ", 0 );
		myInnerHtml( "AASkill", '<input type="checkbox" name="SkillSubNum" onchange="calc()">', 0 );
		SkillSubNum.checked = false;
	}
	else if ( n_A_ActiveSkill === skill_SUR_GATE_OF_HELL )
	{
		// after combo
		myInnerHtml( "AASkillName", "<br/>After a combo: ", 0 );
		myInnerHtml( "AASkill", '<input type="checkbox" name="SkillSubNum" onchange="calc()">', 0 );
		SkillSubNum.checked = false;
		// currentHP
		myInnerHtml( "AASkillName2","<br/>Remaining HP:", 0 );
		myInnerHtml( "AASkill2", '<input type="text" name="SkillSubNum2" size=6 onchange="calc()">', 0 );
		SkillSubNum2.value = n_A_MaxHP;
		// currentSP
		myInnerHtml( "AASkillName3", "<br/>Remaining SP: ", 0 );
		myInnerHtml( "AASkill3", '<input type="text" name="SkillSubNum3" size=6 onchange="calc()">', 0 );
		SkillSubNum3.value = n_A_MaxSP;
	}
	else if ( n_A_ActiveSkill === skill_SUR_CRESCENT_ELBOW )
	{
		// damage
		myInnerHtml( "AASkillName", "<br/>Damage: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:100px;" onchange="calc()"></select>', 0 );
		var damage = 5000;
		for ( var i = 0; damage <= 200000; i++ )
		{
			SkillSubNum.options[i] = new Option( damage, damage );
			damage += 5000;
		}
		SkillSubNum.value = 5000;
	}
	else if ( n_A_ActiveSkill === skill_SOR_VARETYR_SPEAR )
	{
		// Striking Level
		myInnerHtml( "AASkillName", "<br/>Striking Level: ", 0 );
		myInnerHtml( "AASkill", '<select id="SkillSubNum" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 0; i <= 5; i++ )
		{
			SkillSubNum.options[i] = new Option( i, i );
		}
		SkillSubNum.value = 0;
		
		// Endow Tornado Level
		myInnerHtml( "AASkillName2", "<br/>Endow Tornado Level: ", 0 );
		myInnerHtml( "AASkill2", '<select id="SkillSubNum2" style="width:50px;" onchange="calc()"></select>', 0 );
		for ( var i = 2; i <= 5; i++ )
		{
			SkillSubNum2.options[i - 2] = new Option( i, i );
		}
		SkillSubNum2.value = 2;
	}
	else if ( n_A_ActiveSkill == skill_REB_GODS_HAMMER )
	{
		myInnerHtml("AASkillName","<br/>Number of coins:",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" onchange="calc()"></select>',0);
		for(i=0;i<=10;i++)
			SkillSubNum.options[i] = new Option(i,i);
		SkillSubNum.value=0;
	}
	else if ( n_A_ActiveSkill == skill_KN_BOWLING_BASH )
	{
		myInnerHtml("AASkillName","<br/>Number of enemies:",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:50px;" onchange="calc()"></select>',0);
		//for(i=0;i<=10;i++)
		//	SkillSubNum.options[i] = new Option(i,i);
		SkillSubNum.options[0] = new Option("1",0);
		SkillSubNum.options[1] = new Option("2~3",1);
		SkillSubNum.options[2] = new Option("4+",2);
		SkillSubNum.value=0;
	}
	else if (n_A_ActiveSkill == skill_SUR_FLASH_COMBO)
	{
		myInnerHtml("AASkillName","<br/>Dragon combo : ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:50px;" onchange="calc()"></select>',0);
		myInnerHtml("AASkillName3","<br/>Tiger Cannon : ",0);
		myInnerHtml("AASkill3",'<select name="SkillSubNum3" style="width:50px;" onchange="calc()"></select>',0);
		for(var i = 1; i <= 10;i++)
		{
			SkillSubNum.options[i-1] = new Option(i,i);//Dragon Combo
			SkillSubNum3.options[i-1] = new Option(i,i);//Tiger Cannon
		}
		
		myInnerHtml("AASkillName2","<br/>Fallen Empire : ",0);
		myInnerHtml("AASkill2",'<select name="SkillSubNum2" style="width:50px;" onchange="calc()"></select>',0);
		myInnerHtml("AASkillName4","<br/>Sky Net Blow : ",0);
		myInnerHtml("AASkill4",'<select name="SkillSubNum4" style="width:50px;" onchange="calc()"></select>',0);
		for(var i = 1; i <= 5;i++)
		{
			SkillSubNum2.options[i-1] = new Option(i,i);//Fallen Empire
			SkillSubNum4.options[i-1] = new Option(i,i);//Sky Net Blow
		}
		SkillSubNum.value=10;
		SkillSubNum2.value=5;
		SkillSubNum3.value=10;
		SkillSubNum4.value=5;
	}
	else if (n_A_ActiveSkill == skill_SUM_SILVERVINE_STEM_SPEAR)
	{
		myInnerHtml("AASkillName","<br/>Element : ",0);
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:60px;" onchange="calc()"></select>',0);
		SkillSubNum.options[0] = new Option("Earth",0);
		SkillSubNum.options[1] = new Option("Fire",1);
		SkillSubNum.options[2] = new Option("Water",2);
		SkillSubNum.options[3] = new Option("Wind",3);
		SkillSubNum.options[4] = new Option("Ghost",4);
		myInnerHtml("AASkillName2","<br/>Higher learned skill level",0);
		myInnerHtml("AASkill2",'<select name="SkillSubNum2" style="width:60px;" onchange="calc()"></select>',0);
		for ( i = 0 ; i <= 4; i++)
		{
			SkillSubNum2.options[i] = new Option(i+1,i+1);
		}
	}
	else if (n_A_ActiveSkill == skill_SUM_PICKY_PECK)
	{
		myInnerHtml( "AASkillName","<br/>Remaining HP:", 0 );
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:60px;" onchange="calc()"></select>',0);
		SkillSubNum.options[0] = new Option("<10%",0);
		SkillSubNum.options[1] = new Option(">10%",1);
		SkillSubNum.options[2] = new Option(">50%",2);
		SkillSubNum.options[3] = new Option(">80%",3);
		SkillSubNum.options[4] = new Option("100%",4);
	}
	else if (n_A_ActiveSkill == skill_SUM_SCAR_OF_TAROU)
	{
		myInnerHtml( "AASkillName","<br/>Remaining HP:", 0 );
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:60px;" onchange="calc()"></select>',0);
		SkillSubNum.options[0] = new Option("<10%",0);
		SkillSubNum.options[1] = new Option(">10%",1);
		SkillSubNum.options[2] = new Option(">50%",2);
		SkillSubNum.options[3] = new Option(">80%",3);
		SkillSubNum.options[4] = new Option("100%",4);
	}
	else if (n_A_ActiveSkill == skill_SUM_LUNATIC_CARROT_BEAT)
	{
		myInnerHtml( "AASkillName","<br/>Remaining HP:", 0 );
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:60px;" onchange="calc()"></select>',0);
		SkillSubNum.options[0] = new Option("<10%",0);
		SkillSubNum.options[1] = new Option(">10%",1);
		SkillSubNum.options[2] = new Option(">50%",2);
		SkillSubNum.options[3] = new Option(">80%",3);
		SkillSubNum.options[4] = new Option("100%",4);
	}
	else if (n_A_ActiveSkill == skill_SUM_SPIRIT_OF_SAVAGE)
	{
		myInnerHtml( "AASkillName","<br/>Remaining HP:", 0 );
		myInnerHtml("AASkill",'<select name="SkillSubNum" style="width:60px;" onchange="calc()"></select>',0);
		SkillSubNum.options[0] = new Option("<10%",0);
		SkillSubNum.options[1] = new Option(">10%",1);
		SkillSubNum.options[2] = new Option(">50%",2);
		SkillSubNum.options[3] = new Option(">80%",3);
		SkillSubNum.options[4] = new Option("100%",4);
	}
	else
	{
		myInnerHtml("AASkillName","",0);
		myInnerHtml("AASkill","",0);
		myInnerHtml( "AASkillName2", "", 0 );
		myInnerHtml( "AASkill2", "", 0 );
		myInnerHtml( "AASkillName3", "", 0 );
		myInnerHtml( "AASkill3", "", 0 );
		myInnerHtml( "AASkillName4", "", 0 );
		myInnerHtml( "AASkill4", "", 0 );
	}
}
}

function DisplayItemDescription( ItemIndex )
{
	ItemCardNumberCheck = ItemIndex;
	ActiveSkillSetPlus();
	
	// Build general information
	myInnerHtml( "nm080", ITEM_NAME[ItemIndex][1 + Language * 2], 0 );
	myInnerHtml( "ITEM1", GetWord( 160 ),0 );
	myInnerHtml( "ITEM3", GetWord( 161 ),0 );
	myInnerHtml( "ITEM4", GetWord( 162 ),0 );
	if ( ItemOBJ[ItemIndex][itm_TYPE] < 50 )
	{
		myInnerHtml( "ITEM0", "ATK", 0 );
		myInnerHtml( "ITEM2", GetWord( 163 ), 0 );
		myInnerHtml( "ITEM_W_LV", ItemOBJ[ItemIndex][itm_WLVL], 0 );
	}
	else
	{
		myInnerHtml( "ITEM0", "DEF", 0 );
		myInnerHtml( "ITEM2", "", 0 );
		myInnerHtml( "ITEM_W_LV", "", 0 );
	}

	myInnerHtml( "ITEM_DATA", ItemOBJ[ItemIndex][itm_DEF], 0 );
	myInnerHtml( "ITEM_SLOT", ItemOBJ[ItemIndex][itm_SLOTS], 0 );
	myInnerHtml( "ITEM_LV", ItemOBJ[ItemIndex][itm_REQ_BLVL], 0 );
	myInnerHtml( "ITEM_WAIT", ItemOBJ[ItemIndex][itm_WEIGHT], 0 );

	// Description String
	descriptionString = "";
	var tempDesc = "";
	
	for ( var i = itm_BONUS_START; ItemOBJ[ItemIndex][i] !== bon_NONE; i += 2 )
	{ // Collect Bonusses
		if(isNaN(ItemOBJ[ItemIndex][i] ))//NEW
		{
			if(ItemOBJ[ItemIndex][i] == "ev_ref")
			{
				if(ItemOBJ[ItemIndex][i + 1] == 1)
				{
					if(tempDesc != "[For each refine lvl]<br>")
					{
						tempDesc = "[For each refine lvl]<br>";
						descriptionString += "<br>[For each refine lvl]<br>";
					}
				}
				else
				{
					if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " refine lvl]<br>")
					{
						tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " refine lvl]<br>";
						descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " refine lvl]<br>";
					}
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_bstr")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base STR]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base STR]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " base STR]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_bagi")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base AGI]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base AGI]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " base AGI]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_bvit")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base VIT]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base VIT]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " base VIT]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_bint")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base INT]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base INT]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " base INT]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_bdex")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base DEX]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base DEX]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " base DEX]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_bluk")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base LUK]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base LUK]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " base LUK]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_blvl")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " base level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " base level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_jlvl")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " job level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " job level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " job level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ref_lvl")
			{
				if(tempDesc != "[If refine lv +"+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If refine lv +"+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If refine lv +"+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "bstr_hi")
			{
				if(tempDesc != "[If base STR is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If base STR is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If base STR is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "bagi_hi")
			{
				if(tempDesc != "[If base AGI is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If base AGI is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If base AGI is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "bvit_hi")
			{
				if(tempDesc != "[If base VIT is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If base VIT is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If base VIT is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "bint_hi")
			{
				if(tempDesc != "[If base INT is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If base INT is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If base INT is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "bdex_hi")
			{
				if(tempDesc != "[If base DEX is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If base DEX is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If base DEX is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "bluk_hi")
			{
				if(tempDesc != "[If base LUK is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If base LUK is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If base LUK is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "blvl_hi")
			{
				if(tempDesc != "[If base level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If base level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If base level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "jlvl_hi")
			{
				if(tempDesc != "[If job level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If job level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If job level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_head_ref")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " upper headgear refine level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " upper headgear refine level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " upper headgear refine level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_body_ref")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " armor refine level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " armor refine level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " armor refine level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_weap_ref")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " weapon refine level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " weapon refine level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " weapon refine level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_shield_ref")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " shield refine level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " shield refine level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " shield refine level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_garm_ref")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " garment refine level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " garment refine level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " garment refine level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "ev_shoes_ref")
			{
				if(tempDesc != "[For each "+ ItemOBJ[ItemIndex][i + 1] + " shoes refine level]<br>")
				{
					tempDesc = "[For each "+ ItemOBJ[ItemIndex][i + 1] + " shoes refine level]<br>";
					descriptionString += "<br>[For each "+ ItemOBJ[ItemIndex][i + 1] + " shoes refine level]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "head_ref_lvl")
			{
				if(tempDesc != "[If upper headgear refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If upper headgear refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If upper headgear refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "body_ref_lvl")
			{
				if(tempDesc != "[If armor refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If armor refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If armor refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "weap_ref_lvl")
			{
				if(tempDesc != "[If weapon refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If weapon refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If weapon refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "shield_ref_lvl")
			{
				if(tempDesc != "[If shield refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If shield refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If shield refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "garm_ref_lvl")
			{
				if(tempDesc != "[If garment refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If garment refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If garment refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			if(ItemOBJ[ItemIndex][i] == "shoes_ref_lvl")
			{
				if(tempDesc != "[If shoes refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>")
				{
					tempDesc = "[If shoes refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
					descriptionString += "<br>[If shoes refine level is "+ ItemOBJ[ItemIndex][i + 1] + " or higher]<br>";
				}
			}
			descriptionString += "-"+ BuildItemDescription(ItemOBJ[ItemIndex][i + 2], ItemOBJ[ItemIndex][i + 3] ); // add them to Strings
			i += 2;
		}
		else
			descriptionString += BuildItemDescription(ItemOBJ[ItemIndex][i], ItemOBJ[ItemIndex][i + 1] ); // add them to Strings
		// descriptionString += BuildItemDescription(ItemOBJ[ItemIndex][i], ItemOBJ[ItemIndex][i + 1] ); // add them to Strings
	}
	
	if ( ITEM_NAME[ItemIndex][2 + 2 * Language] !== bon_NONE )
	{
		descriptionString += ITEM_NAME[ItemIndex][2 + 2 * Language] +"<BR>";
	}
	
	// Build Set Bonus Descriptions if any
	var check = 0;
	for ( var i = itm_BONUS_START; ItemOBJ[ItemIndex][i] !== bon_NONE; i += 2 )
	{ // Check for Sets
		if ( ItemOBJ[ItemIndex][i] === bon_SETID )
		{			
			
			descriptionString += "<br/><b>When equipping "+ SetEquipName(ItemOBJ[ItemIndex][i + 1]);
			var setIndex = w_SE[ItemOBJ[ItemIndex][i + 1]][0];
			while ( ItemOBJ[ItemIndex][i + 2] !== bon_NONE && check === 0 )
			{
				if ( setIndex == w_SE[ItemOBJ[ItemIndex][i+3]][0])
				{
					descriptionString += " or<br/>" + SetEquipName(ItemOBJ[ItemIndex][i + 3]);
					i += 2;
				}
				else
				{
					check = 1;
				}
			}
			descriptionString += " at the same time:</b><br/>";
			check = 0;
			tempDesc = "";
			for ( var j = itm_BONUS_START; ItemOBJ[setIndex][j] !== bon_NONE; j += 2 )
			{
				if(isNaN(ItemOBJ[setIndex][j] ))//NEW
				{
					if(ItemOBJ[setIndex][j] == "ev_ref")
					{
						if(ItemOBJ[setIndex][j + 1] == 1)
						{
							if(tempDesc != "[For each refine lvl]<br>")
							{
								tempDesc = "[For each refine lvl]<br>";
								descriptionString += "<br>[For each refine lvl]<br>";
							}
						}
						else
						{
							if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " refine lvl]<br>")
							{
								tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " refine lvl]<br>";
								descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " refine lvl]<br>";
							}
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_bstr")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " base STR]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " base STR]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " base STR]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_bagi")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " base AGI]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " base AGI]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " base AGI]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_bvit")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " base VIT]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " base VIT]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " base VIT]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_bint")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " base INT]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " base INT]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " base INT]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_bdex")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " base DEX]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " base DEX]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " base DEX]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_bluk")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " base LUK]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " base LUK]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " base LUK]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_blvl")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " base level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " base level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " base level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_jlvl")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " job level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " job level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " job level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ref_lvl")
					{
						if(tempDesc != "[if refine lv +"+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if refine lv +"+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if refine lv +"+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "bstr_hi")
					{
						if(tempDesc != "[if base STR is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if base STR is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if base STR is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "bagi_hi")
					{
						if(tempDesc != "[if base AGI is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if base AGI is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if base AGI is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "bvit_hi")
					{
						if(tempDesc != "[if base VIT is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if base VIT is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if base VIT is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "bint_hi")
					{
						if(tempDesc != "[if base INT is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if base INT is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if base INT is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "bdex_hi")
					{
						if(tempDesc != "[if base DEX is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if base DEX is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if base DEX is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "bluk_hi")
					{
						if(tempDesc != "[if base LUK is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if base LUK is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if base LUK is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "blvl_hi")
					{
						if(tempDesc != "[if base level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if base level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if base level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "jlvl_hi")
					{
						if(tempDesc != "[if job level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if job level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if job level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_head_ref")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " upper headgear refine level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " upper headgear refine level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " upper headgear refine level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_body_ref")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " armor refine level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " armor refine level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " armor refine level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_weap_ref")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " weapon refine level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " weapon refine level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " weapon refine level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_shield_ref")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " shield refine level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " shield refine level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " shield refine level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_garm_ref")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " garment refine level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " garment refine level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " garment refine level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "ev_shoes_ref")
					{
						if(tempDesc != "[For each "+ ItemOBJ[setIndex][j + 1] + " shoes refine level]<br>")
						{
							tempDesc = "[For each "+ ItemOBJ[setIndex][j + 1] + " shoes refine level]<br>";
							descriptionString += "<br>[For each "+ ItemOBJ[setIndex][j + 1] + " shoes refine level]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "head_ref_lvl")
					{
						
						if(tempDesc != "[if upper headgear refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if upper headgear refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if upper headgear refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "body_ref_lvl")
					{
						if(tempDesc != "[if armor refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if armor refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if armor refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "weap_ref_lvl")
					{
						if(tempDesc != "[if weapon refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if weapon refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if weapon refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "shield_ref_lvl")
					{
						if(tempDesc != "[if shield refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if shield refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if shield refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "garm_ref_lvl")
					{
						if(tempDesc != "[if garment refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if garment refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if garment refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j] == "shoes_ref_lvl")
					{
						if(tempDesc != "[if shoes refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if shoes refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if shoes refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j].substr(0,7) == "set_ref")
					{
						let flag = 0;
						let first = true;
						let tmp_str = "";
						flag = parseInt(ItemOBJ[setIndex][j].substr(7));
						if((flag - 4096)>=0)
						{
							tmp_str += "Shadow Pendant";
							first = false;
							flag = flag - 4096;
						}
						if((flag - 2048)>=0)
						{
							if(first)
								tmp_str += "Shadow Earring";
							else
								tmp_str += " and Shadow Earring";
							first = false;
							flag = flag - 2048;
						}
						if((flag - 1024)>=0)
						{
							if(first)
								tmp_str += "Shadow Shoes";
							else
								tmp_str += " and Shadow Shoes";
							first = false;
							flag = flag - 1024;
						}
						if((flag - 512)>=0)
						{
							if(first)
								tmp_str += "Shadow Shield";
							else
								tmp_str += " and Shadow Shield";
							first = false;
							flag = flag - 512;
						}
						if((flag - 256)>=0)
						{
							if(first)
								tmp_str += "Shadow Glove";
							else
								tmp_str += " and Shadow Glove";
							first = false;
							flag = flag - 256;
						}
						if((flag - 128)>=0)
						{
							if(first)
								tmp_str += "Shadow Armor";
							else
								tmp_str += " and Shadow Armor";
							first = false;
							flag = flag - 128;
						}
						//---------------------------------------------
						if((flag - 64)>=0)
						{
							tmp_str += "Shoes";
							first = false;
							flag = flag - 64;
						}
						if((flag - 32)>=0)
						{
							if(first)
								tmp_str += "Garment";
							else
								tmp_str += " and Garment";
							first = false;
							flag = flag - 32;
						}
						if((flag - 16)>=0)
						{
							if(first)
								tmp_str += "Shield";
							else
								tmp_str += " and Shield";
							first = false;
							flag = flag - 16;
						}
						if((flag - 8)>=0)
						{
							if(first)
								tmp_str += "Armor";
							else
								tmp_str += " and Armor";
							first = false;
							flag = flag - 8;
						}
						if((flag - 4)>=0)
						{
							if(first)
								tmp_str += "Headgear";
							else
								tmp_str += " and Headgear";
							first = false;
							flag = flag - 4;
						}
						if((flag - 2)>=0)
						{
							if(first)
								tmp_str += "Weapon (left)";
							else
								tmp_str += " and Weapon (left)";
							first = false;
							flag = flag - 2;
						}
						if((flag - 1)>=0)
						{
							if(first)
								tmp_str += "Weapon";
							else
								tmp_str += " and Weapon";
							first = false;
							flag = flag - 1;
						}
						if(tempDesc != "[if "+tmp_str+" refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if "+tmp_str+" refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if "+tmp_str+" refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(ItemOBJ[setIndex][j].substr(0,7) == "set_sum")
					{
						let flag = 0;
						let first = true;
						let tmp_str = "";
						flag = parseInt(ItemOBJ[setIndex][j].substr(7));
						if((flag - 4096)>=0)
						{
							tmp_str += "Shadow Pendant";
							first = false;
							flag = flag - 4096;
						}
						if((flag - 2048)>=0)
						{
							if(first)
								tmp_str += "Shadow Earring";
							else
								tmp_str += " and Shadow Earring";
							first = false;
							flag = flag - 2048;
						}
						if((flag - 1024)>=0)
						{
							if(first)
								tmp_str += "Shadow Shoes";
							else
								tmp_str += " and Shadow Shoes";
							first = false;
							flag = flag - 1024;
						}
						if((flag - 512)>=0)
						{
							if(first)
								tmp_str += "Shadow Shield";
							else
								tmp_str += " and Shadow Shield";
							first = false;
							flag = flag - 512;
						}
						if((flag - 256)>=0)
						{
							if(first)
								tmp_str += "Shadow Glove";
							else
								tmp_str += " and Shadow Glove";
							first = false;
							flag = flag - 256;
						}
						if((flag - 128)>=0)
						{
							if(first)
								tmp_str += "Shadow Armor";
							else
								tmp_str += " and Shadow Armor";
							first = false;
							flag = flag - 128;
						}
						//---------------------------------------------
						if((flag - 64)>=0)
						{
							if(first)
								tmp_str += "Shoes";
							else
								tmp_str += " and Shoes";
							first = false;
							flag = flag - 64;
						}
						if((flag - 32)>=0)
						{
							if(first)
								tmp_str += "Garment";
							else
								tmp_str += " and Garment";
							first = false;
							flag = flag - 32;
						}
						if((flag - 16)>=0)
						{
							if(first)
								tmp_str += "Shield";
							else
								tmp_str += " and Shield";
							first = false;
							flag = flag - 16;
						}
						if((flag - 8)>=0)
						{
							if(first)
								tmp_str += "Armor";
							else
								tmp_str += " and Armor";
							first = false;
							flag = flag - 8;
						}
						if((flag - 4)>=0)
						{
							if(first)
								tmp_str += "Headgear";
							else
								tmp_str += " and Headgear";
							first = false;
							flag = flag - 4;
						}
						if((flag - 2)>=0)
						{
							if(first)
								tmp_str += "Weapon (left)";
							else
								tmp_str += " and Weapon (left)";
							first = false;
							flag = flag - 2;
						}
						if((flag - 1)>=0)
						{
							if(first)
								tmp_str += "Weapon";
							else
								tmp_str += " and Weapon";
							first = false;
							flag = flag - 1;
						}
						if(tempDesc != "[if the sum of "+tmp_str+" refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[if the sum of "+tmp_str+" refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[if the sum of "+tmp_str+" refine level is "+ ItemOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					descriptionString += "-"+ BuildItemDescription(ItemOBJ[setIndex][j + 2], ItemOBJ[setIndex][j + 3] ); // add them to Strings
					j += 2;
				}
				else
					descriptionString += BuildItemDescription( ItemOBJ[setIndex][j], ItemOBJ[setIndex][j + 1] );
			}
			if ( ITEM_NAME[setIndex][2 + 2 * Language] !== bon_NONE )
			{
				descriptionString += ITEM_NAME[setIndex][2 + 2 * Language] + "<br/>";
			}
			descriptionString += "";
		}
	}
	
	// Post the description
	myInnerHtml( "ItemDescription", descriptionString, 0 );
}

function DisplayEnchantDescription( EnchantIndex )
{
	//ItemCardNumberCheck = EnchantIndex;
	//ActiveSkillSetPlus();
	
	// Build general information
	myInnerHtml( "nm080", EnchantOBJ[EnchantIndex][1]/*ITEM_NAME[EnchantIndex][1 + Language * 2]*/, 0 );
	myInnerHtml( "ITEM1", GetWord( 160 ),0 );
	myInnerHtml( "ITEM3", GetWord( 161 ),0 );
	myInnerHtml( "ITEM4", GetWord( 162 ),0 );
	// if ( EnchantOBJ[EnchantIndex][itm_TYPE] < 50 )
	// {
		// myInnerHtml( "ITEM0", "ATK", 0 );
		// myInnerHtml( "ITEM2", GetWord( 163 ), 0 );
		// myInnerHtml( "ITEM_W_LV", EnchantOBJ[EnchantIndex][itm_WLVL], 0 );
	// }
	// else
	// {
		myInnerHtml( "ITEM0", "DEF", 0 );
		myInnerHtml( "ITEM2", "", 0 );
		myInnerHtml( "ITEM_W_LV", "", 0 );
	// }

	myInnerHtml( "ITEM_DATA", "", 0 );
	myInnerHtml( "ITEM_SLOT", "", 0 );
	myInnerHtml( "ITEM_LV", "", 0 );
	myInnerHtml( "ITEM_WAIT", "", 0 );

	// Description String
		descriptionString = "";
	for ( var i = 3; EnchantOBJ[EnchantIndex][i] !== bon_NONE; i += 2 )
	{ // Collect Bonusses
		descriptionString += BuildItemDescription(EnchantOBJ[EnchantIndex][i], EnchantOBJ[EnchantIndex][i + 1] ); // add them to Strings
	}
	// if ( ITEM_NAME[EnchantIndex][2 + 2 * Language] !== bon_NONE )
	// {
		// descriptionString += ITEM_NAME[EnchantIndex][2 + 2 * Language] +"<BR>";
	// }
	if(EnchantOBJ[EnchantIndex][2] != 0)
	{
		descriptionString += /*"<br>" +*/ EnchantOBJ[EnchantIndex][2];
	}
	// Post the description
	myInnerHtml( "ItemDescription", descriptionString, 0 );
}

// display item data
function Click_Card( CardIndex )
{ 
	ItemCardNumberCheck = CardIndex;

	ActiveSkillSetPlus();

	for ( i = 0;i <= 4; i++ )
	{
		myInnerHtml( "ITEM" + i, "", 0 );
	}
	myInnerHtml("ITEM_W_LV","",0);
	myInnerHtml("ITEM_DATA","",0);
	myInnerHtml("ITEM_SLOT","",0);
	myInnerHtml("ITEM_LV","",0);
	myInnerHtml("ITEM_WAIT","",0);

	if(CardIndex == 106)
	{ // StarCrumb
		myInnerHtml("nm080","Very Strong or Top10",0);
		var str = "A damaged piece of stars +5<BR>If the star piece is constant damage (?)";
		str += "+40<BR>TOP10 Rank damage +10<BR>(Rank card manufacturing weapons of TOP10 the 4th column)";
		myInnerHtml( "ItemDescription", str, 0 );
		return;
	}
	if(201 <= CardIndex && CardIndex <= 204)
	{ // Ele Stones
		myInnerHtml("nm080",cardOBJ[CardIndex][card_att_NAME],0);
		myInnerHtml("ItemDescription", "[" + ZokuseiOBJ[CardIndex-200][Language] + "]" + GetWord(173),0);
		return;
	}
	myInnerHtml("nm080",cardOBJ[CardIndex][card_att_NAME] +" Card",0);

	CBIstr = "";
	var tempDesc = "";
	var tempDesc2 = "";
	
	for(i=card_att_BONUS_START;cardOBJ[CardIndex][i] != bon_NONE;i+=2) // Collect Bonusses
	{
		if(isNaN(cardOBJ[CardIndex][i] ))//NEW
		{
			if(cardOBJ[CardIndex][i] == "ev_ref")
			{
				if(cardOBJ[CardIndex][i + 1] == 1)
				{
					if(tempDesc2 != "[For each refine lvl]<br>")
					{
						tempDesc2 = "[For each refine lvl]<br>";
						tempDesc += "<br>[For each refine lvl]<br>";
					}
				}
				else
				{
					if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " refine lvl]<br>")
					{
						tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " refine lvl]<br>";
						tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " refine lvl]<br>";
					}
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_bstr")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " base STR]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " base STR]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " base STR]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_bagi")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " base AGI]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " base AGI]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " base AGI]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_bvit")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " base VIT]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " base VIT]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " base VIT]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_bint")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " base INT]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " base INT]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " base INT]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_bdex")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " base DEX]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " base DEX]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " base DEX]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_bluk")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " base LUK]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " base LUK]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " base LUK]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_blvl")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " base level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " base level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " base level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_blvl")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " job level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " job level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " job level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ref_lvl")
			{
				if(tempDesc2 != "[If refine lv +"+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If refine lv +"+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If refine lv +"+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "bstr_hi")
			{
				if(tempDesc2 != "[If base STR is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If base STR is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If base STR is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "bagi_hi")
			{
				if(tempDesc2 != "[If base AGI is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If base AGI is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If base AGI is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "bvit_hi")
			{
				if(tempDesc2 != "[If base VIT is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If base VIT is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If base VIT is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "bint_hi")
			{
				if(tempDesc2 != "[If base INT is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If base INT is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If base INT is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "bdex_hi")
			{
				if(tempDesc2 != "[If base DEX is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If base DEX is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If base DEX is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "bluk_hi")
			{
				if(tempDesc2 != "[If base LUK is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If base LUK is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If base LUK is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "blvl_hi")
			{
				if(tempDesc2 != "[If base level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If base level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If base level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "jlvl_hi")
			{
				if(tempDesc2 != "[If job level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If job level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If job level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_head_ref")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " upper headgear refine level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " upper headgear refine level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " upper headgear refine level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_body_ref")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " armor refine level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " armor refine level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " armor refine level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_weap_ref")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " weapon refine level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " weapon refine level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " weapon refine level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_shield_ref")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " shield refine level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " shield refine level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " shield refine level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_garm_ref")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " garment refine level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " garment refine level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " garment refine level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "ev_shoes_ref")
			{
				if(tempDesc2 != "[For each "+ cardOBJ[CardIndex][i + 1] + " shoes refine level]<br>")
				{
					tempDesc2 = "[For each "+ cardOBJ[CardIndex][i + 1] + " shoes refine level]<br>";
					tempDesc += "<br>[For each "+ cardOBJ[CardIndex][i + 1] + " shoes refine level]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "head_ref_lvl")
			{
				if(tempDesc2 != "[If upper headgear refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If upper headgear refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If upper headgear refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "body_ref_lvl")
			{
				if(tempDesc2 != "[If armor refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If armor refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If armor refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "weap_ref_lvl")
			{
				if(tempDesc2 != "[If weapon refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If weapon refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If weapon refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "shield_ref_lvl")
			{
				if(tempDesc2 != "[If shield refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If shield refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If shield refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "garm_ref_lvl")
			{
				if(tempDesc2 != "[If garment refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If garment refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If garment refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i] == "shoes_ref_lvl")
			{
				if(tempDesc2 != "[If shoes refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>")
				{
					tempDesc2 = "[If shoes refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
					tempDesc += "<br>[If shoes refine level is "+ cardOBJ[CardIndex][i + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i].substr(0,7) == "set_ref")
			{
				
				let flag = 0;
				let first = true;
				let tempDesc = "";
				flag = parseInt(cardOBJ[CardIndex][i].substr(7));
				if((flag - 64)>=0)
				{
					tempDesc += "Shoes";
					first = false;
					flag = flag - 64;
				}
				if((flag - 32)>=0)
				{
					if(first)
						tempDesc += "Garment";
					else
						tempDesc += " and Garment";
					first = false;
					flag = flag - 32;
				}
				if((flag - 16)>=0)
				{
					if(first)
						tempDesc += "Shield";
					else
						tempDesc += " and Shield";
					first = false;
					flag = flag - 16;
				}
				if((flag - 8)>=0)
				{
					if(first)
						tempDesc += "Armor";
					else
						tempDesc += " and Armor";
					first = false;
					flag = flag - 8;
				}
				if((flag - 4)>=0)
				{
					if(first)
						tempDesc += "Headgear";
					else
						tempDesc += " and Headgear";
					first = false;
					flag = flag - 4;
				}
				if((flag - 2)>=0)
				{
					if(first)
						tempDesc += "Weapon (left)";
					else
						tempDesc += " and Weapon (left)";
					first = false;
					flag = flag - 2;
				}
				if((flag - 1)>=0)
				{
					if(first)
						tempDesc += "Weapon";
					else
						tempDesc += " and Weapon";
					first = false;
					flag = flag - 1;
				}
				if(tempDesc != "[if "+tempDesc+" refine level is "+ cardOBJ[CardIndex][j + 1] + " or higher]<br>")
				{
					tempDesc = "[if "+tempDesc+" refine level is "+ cardOBJ[CardIndex][j + 1] + " or higher]<br>";
					descriptionString += "<br>[if "+tempDesc+" refine level is "+ cardOBJ[CardIndex][j + 1] + " or higher]<br>";
				}
			}
			if(cardOBJ[CardIndex][i].substr(0,7) == "set_sum")
			{
				let flag = 0;
				let first = true;
				let tempDesc = "";
				flag = parseInt(cardOBJ[CardIndex][i].substr(7));
				if((flag - 64)>=0)
				{
					tempDesc += "Shoes";
					first = false;
					flag = flag - 64;
				}
				if((flag - 32)>=0)
				{
					if(first)
						tempDesc += "Garment";
					else
						tempDesc += " and Garment";
					first = false;
					flag = flag - 32;
				}
				if((flag - 16)>=0)
				{
					if(first)
						tempDesc += "Shield";
					else
						tempDesc += " and Shield";
					first = false;
					flag = flag - 16;
				}
				if((flag - 8)>=0)
				{
					if(first)
						tempDesc += "Armor";
					else
						tempDesc += " and Armor";
					first = false;
					flag = flag - 8;
				}
				if((flag - 4)>=0)
				{
					if(first)
						tempDesc += "Headgear";
					else
						tempDesc += " and Headgear";
					first = false;
					flag = flag - 4;
				}
				if((flag - 2)>=0)
				{
					if(first)
						tempDesc += "Weapon (left)";
					else
						tempDesc += " and Weapon (left)";
					first = false;
					flag = flag - 2;
				}
				if((flag - 1)>=0)
				{
					if(first)
						tempDesc += "Weapon";
					else
						tempDesc += " and Weapon";
					first = false;
					flag = flag - 1;
				}
			}
			tempDesc += "-"+ BuildItemDescription(cardOBJ[CardIndex][i + 2], cardOBJ[CardIndex][i + 3] ); // add them to Strings
			i += 2;
		}
		else
			tempDesc += BuildItemDescription(cardOBJ[CardIndex][i], cardOBJ[CardIndex][i + 1] ); // add them to Strings
		// tempDesc += BuildItemDescription(cardOBJ[CardIndex][i],cardOBJ[CardIndex][i+1]); // add them to String
	}
	CBIstr += tempDesc;
	if(cardOBJ[CardIndex][card_att_DESC] != 0)
		CBIstr += "<br>"+ cardOBJ[CardIndex][card_att_DESC] +"<BR>";
	
	// Build Set Bonus Descriptions if any
	var check = 0;
	for ( var i = card_att_BONUS_START; cardOBJ[CardIndex][i] !== bon_NONE; i += 2 )
	{ // Check for Sets
		if ( cardOBJ[CardIndex][i] === bon_SETID )
		{			
			CBIstr += "<br/><b>When equipping "+ SetCardName(cardOBJ[CardIndex][i + 1]);
			var setIndex = w_SC[cardOBJ[CardIndex][i + 1]][0];
			while ( cardOBJ[CardIndex][i + 2] !== bon_NONE && check === 0 )
			{
				if ( setIndex == w_SC[cardOBJ[CardIndex][i+3]][0])
				{
					CBIstr += " or<br/>" + SetCardName(cardOBJ[CardIndex][i + 3]);
					i += 2;
				}
				else
				{
					check = 1;
				}
			}
			CBIstr += " at the same time:</b><br/>";
			check = 0;
			for ( var j = card_att_BONUS_START; cardOBJ[setIndex][j] !== bon_NONE; j += 2 )
			{
				if(isNaN(cardOBJ[setIndex][j] ))//NEW
				{
					if(cardOBJ[setIndex][j] == "ev_ref")
					{
						if(cardOBJ[setIndex][j + 1] == 1)
						{
							if(tempDesc2 != "[For each refine lvl]<br>")
							{
								tempDesc2 = "[For each refine lvl]<br>";
								tempDesc += "<br>[For each refine lvl]<br>";
							}
						}
						else
						{
							if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " refine lvl]<br>")
							{
								tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " refine lvl]<br>";
								tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " refine lvl]<br>";
							}
						}
					}
					if(cardOBJ[setIndex][j] == "ev_bstr")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " base STR]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " base STR]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " base STR]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_bagi")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " base AGI]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " base AGI]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " base AGI]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_bvit")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " base VIT]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " base VIT]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " base VIT]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_bint")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " base INT]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " base INT]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " base INT]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_bdex")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " base DEX]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " base DEX]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " base DEX]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_bluk")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " base LUK]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " base LUK]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " base LUK]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_blvl")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " base level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " base level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " base level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_blvl")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " job level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " job level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " job level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ref_lvl")
					{
						if(tempDesc2 != "[If refine lv +"+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If refine lv +"+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If refine lv +"+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "bstr_hi")
					{
						if(tempDesc2 != "[If base STR is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If base STR is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If base STR is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "bagi_hi")
					{
						if(tempDesc2 != "[If base AGI is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If base AGI is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If base AGI is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "bvit_hi")
					{
						if(tempDesc2 != "[If base VIT is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If base VIT is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If base VIT is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "bint_hi")
					{
						if(tempDesc2 != "[If base INT is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If base INT is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If base INT is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "bdex_hi")
					{
						if(tempDesc2 != "[If base DEX is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If base DEX is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If base DEX is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "bluk_hi")
					{
						if(tempDesc2 != "[If base LUK is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If base LUK is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If base LUK is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "blvl_hi")
					{
						if(tempDesc2 != "[If base level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If base level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If base level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "jlvl_hi")
					{
						if(tempDesc2 != "[If job level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If job level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If job level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_head_ref")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " upper headgear refine level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " upper headgear refine level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " upper headgear refine level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_body_ref")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " armor refine level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " armor refine level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " armor refine level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_weap_ref")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " weapon refine level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " weapon refine level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " weapon refine level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_shield_ref")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " shield refine level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " shield refine level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " shield refine level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_garm_ref")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " garment refine level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " garment refine level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " garment refine level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "ev_shoes_ref")
					{
						if(tempDesc2 != "[For each "+ cardOBJ[setIndex][j + 1] + " shoes refine level]<br>")
						{
							tempDesc2 = "[For each "+ cardOBJ[setIndex][j + 1] + " shoes refine level]<br>";
							tempDesc += "<br>[For each "+ cardOBJ[setIndex][j + 1] + " shoes refine level]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "head_ref_lvl")
					{
						if(tempDesc2 != "[If upper headgear refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If upper headgear refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If upper headgear refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "body_ref_lvl")
					{
						if(tempDesc2 != "[If armor refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If armor refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If armor refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "weap_ref_lvl")
					{
						if(tempDesc2 != "[If weapon refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If weapon refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If weapon refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "shield_ref_lvl")
					{
						if(tempDesc2 != "[If shield refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If shield refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If shield refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "garm_ref_lvl")
					{
						if(tempDesc2 != "[If garment refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If garment refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If garment refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j] == "shoes_ref_lvl")
					{
						if(tempDesc2 != "[If shoes refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc2 = "[If shoes refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							tempDesc += "<br>[If shoes refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j].substr(0,7) == "set_ref")
					{
						
						let flag = 0;
						let first = true;
						let tempDesc = "";
						flag = parseInt(cardOBJ[setIndex][j].substr(7));
						if((flag - 64)>=0)
						{
							tempDesc += "Shoes";
							first = false;
							flag = flag - 64;
						}
						if((flag - 32)>=0)
						{
							if(first)
								tempDesc += "Garment";
							else
								tempDesc += " and Garment";
							first = false;
							flag = flag - 32;
						}
						if((flag - 16)>=0)
						{
							if(first)
								tempDesc += "Shield";
							else
								tempDesc += " and Shield";
							first = false;
							flag = flag - 16;
						}
						if((flag - 8)>=0)
						{
							if(first)
								tempDesc += "Armor";
							else
								tempDesc += " and Armor";
							first = false;
							flag = flag - 8;
						}
						if((flag - 4)>=0)
						{
							if(first)
								tempDesc += "Headgear";
							else
								tempDesc += " and Headgear";
							first = false;
							flag = flag - 4;
						}
						if((flag - 2)>=0)
						{
							if(first)
								tempDesc += "Weapon (left)";
							else
								tempDesc += " and Weapon (left)";
							first = false;
							flag = flag - 2;
						}
						if((flag - 1)>=0)
						{
							if(first)
								tempDesc += "Weapon";
							else
								tempDesc += " and Weapon";
							first = false;
							flag = flag - 1;
						}
						if(tempDesc != "[If "+tempDesc+" refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>")
						{
							tempDesc = "[If "+tempDesc+" refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
							descriptionString += "<br>[If "+tempDesc+" refine level is "+ cardOBJ[setIndex][j + 1] + " or higher]<br>";
						}
					}
					if(cardOBJ[setIndex][j].substr(0,7) == "set_sum")
					{
						let flag = 0;
						let first = true;
						let tempDesc = "";
						flag = parseInt(cardOBJ[setIndex][j].substr(7));
						if((flag - 64)>=0)
						{
							tempDesc += "Shoes";
							first = false;
							flag = flag - 64;
						}
						if((flag - 32)>=0)
						{
							if(first)
								tempDesc += "Garment";
							else
								tempDesc += " and Garment";
							first = false;
							flag = flag - 32;
						}
						if((flag - 16)>=0)
						{
							if(first)
								tempDesc += "Shield";
							else
								tempDesc += " and Shield";
							first = false;
							flag = flag - 16;
						}
						if((flag - 8)>=0)
						{
							if(first)
								tempDesc += "Armor";
							else
								tempDesc += " and Armor";
							first = false;
							flag = flag - 8;
						}
						if((flag - 4)>=0)
						{
							if(first)
								tempDesc += "Headgear";
							else
								tempDesc += " and Headgear";
							first = false;
							flag = flag - 4;
						}
						if((flag - 2)>=0)
						{
							if(first)
								tempDesc += "Weapon (left)";
							else
								tempDesc += " and Weapon (left)";
							first = false;
							flag = flag - 2;
						}
						if((flag - 1)>=0)
						{
							if(first)
								tempDesc += "Weapon";
							else
								tempDesc += " and Weapon";
							first = false;
							flag = flag - 1;
						}
					}
					tempDesc += "-"+ BuildItemDescription(cardOBJ[setIndex][j + 2], cardOBJ[setIndex][j + 3] ); // add them to Strings
					j += 2;
				}
				else
					CBIstr += BuildItemDescription( cardOBJ[setIndex][j], cardOBJ[setIndex][j + 1] );
			}
			if ( cardOBJ[setIndex][card_att_DESC] !== bon_NONE )
			{
				CBIstr += cardOBJ[setIndex][card_att_DESC] + "<br/>";
			}
			
			CBIstr += "";
		}
	}

	myInnerHtml( "ItemDescription", CBIstr, 0 );
}

// EventWeaponCardShortcuts
function ChangeShortCut_R()
{ 
	if(n_SaveMode == 1)
		LoadShortCut();
}

// Apply WeaponCardShortcuts
function LoadShortCut()
{ 
	var num = eval(document.calcForm.A_SHORTCUT_R.value);
	if(n_SaveMode == 0)
	{
		var w = ItemOBJ[DataShortCut[n_LastSaveNum][num][0]][1];
		var w2 = ItemOBJ[DataShortCut[n_LastSaveNum][num][0]][2];
		var w4 = ItemOBJ[DataShortCut[n_LastSaveNum][num][0]][4];
		if(JobASPD[n_A_JOB][w] != 0 && JobEquipItemSearch(w2) == 1 || (w4 == 4 && SuperNoviceFullWeaponCHECK))
		{
			document.calcForm.A_WeaponType.value = w;
			ClickWeaponType(w);
			document.calcForm.A_weapon1.value = DataShortCut[n_LastSaveNum][num][0];
			document.calcForm.A_Weapon_ATKplus.value = DataShortCut[n_LastSaveNum][num][1];
			document.calcForm.A_Weapon_element.value = DataShortCut[n_LastSaveNum][num][2];
			document.calcForm.A_weapon1_card1.value = DataShortCut[n_LastSaveNum][num][3];
			document.calcForm.A_weapon1_card2.value = DataShortCut[n_LastSaveNum][num][4];
			document.calcForm.A_weapon1_card3.value = DataShortCut[n_LastSaveNum][num][5];
			document.calcForm.A_weapon1_card4.value = DataShortCut[n_LastSaveNum][num][6];
		}
	}
	else
	{
		document.calcForm.A_weapon1_card1.value = DataShortCut[0][num][3];
		document.calcForm.A_weapon1_card2.value = DataShortCut[0][num][4];
		document.calcForm.A_weapon1_card3.value = DataShortCut[0][num][5];
		document.calcForm.A_weapon1_card4.value = DataShortCut[0][num][6];
	}
	StAllCalc();
	ActiveSkillSetPlus();
}

function LoadShortCut_L()
{
	var num = eval(document.calcForm.A_SHORTCUT_R.value);
	if(n_SaveMode == 0)
	{
		var w = ItemOBJ[DataShortCut[n_LastSaveNum][num][0]][1];
		if(w == 11)
			return;
		var w2 = ItemOBJ[DataShortCut[n_LastSaveNum][num][0]][2];
		var w4 = ItemOBJ[DataShortCut[n_LastSaveNum][num][0]][4];
		if(JobASPD[n_A_JOB][w] != 0 && JobEquipItemSearch(w2) == 1 || (w4 == 4 && SuperNoviceFullWeaponCHECK))
		{
			document.calcForm.A_Weapon2Type.value = w;
			ClickWeaponType2(w);
			document.calcForm.A_weapon2.value = DataShortCut[n_LastSaveNum][num][0];
			document.calcForm.A_Weapon2_ATKplus.value = DataShortCut[n_LastSaveNum][num][1];
			document.calcForm.A_weapon2_card1.value = DataShortCut[n_LastSaveNum][num][3];
			document.calcForm.A_weapon2_card2.value = DataShortCut[n_LastSaveNum][num][4];
			document.calcForm.A_weapon2_card3.value = DataShortCut[n_LastSaveNum][num][5];
			document.calcForm.A_weapon2_card4.value = DataShortCut[n_LastSaveNum][num][6];
		}
	}
	StAllCalc();
	ActiveSkillSetPlus();
}

// EquipCardShortcuts
function SetCardShort()
{ 
with(document.calcForm)
{
	w = eval(A_cardshort.value); // dropdown
	if ( w > 0 ) 
	{
		if ( EquipShortCutData[w][0] !== 9999 )
		{
			if(EquipShortCutData[w][1] != 0)
				A_weapon1_card1.value = EquipShortCutData[w][1];
			if(EquipShortCutData[w][2] != 0)
				A_head1_card.value = EquipShortCutData[w][2];
			if(EquipShortCutData[w][3] != 0)
				A_left_card.value = EquipShortCutData[w][3];
			if(EquipShortCutData[w][4] != 0)
				A_body_card.value = EquipShortCutData[w][4];
			if(EquipShortCutData[w][5] != 0)
				A_shoulder_card.value = EquipShortCutData[w][5];
			if(EquipShortCutData[w][6] != 0)
				A_shoes_card.value = EquipShortCutData[w][6];
			if(EquipShortCutData[w][7] != 0)
				A_acces1_card.value = EquipShortCutData[w][7];
			if(EquipShortCutData[w][8] != 0)
				A_acces2_card.value = EquipShortCutData[w][8];
		}
		else
		{
			A_weapon1_card1.value = 0;
			A_weapon1_card2.value = 0;
			A_weapon1_card3.value = 0;
			A_weapon1_card4.value = 0;
	
			if(typeof A_weapon2_card1 != "undefined")
			{
				A_weapon2_card1.value = 0;
				A_weapon2_card2.value = 0;
				A_weapon2_card3.value = 0;
				A_weapon2_card4.value = 0;
			}
	
			A_head1_card.value = 0;
			A_head2_card.value = 0;
			A_left_card.value = 0;
			A_body_card.value = 0;
			A_shoulder_card.value = 0;
			A_shoes_card.value = 0;
			A_acces1_card.value = 0;
			A_acces2_card.value = 0;
		}
		ActiveSkillSetPlus();
	}
}
}
