//Unused function from cookies.js

function Load(LoadData)
{
	with(document.calcForm)
	{
		var w = LoadData;
			if(StoN2(w.substr(1,2)) == 20 && StoN2(w.substr(90,1)))
			{
				SuperNoviceFullWeaponCHECK = 1;
			}
			else
			{
				SuperNoviceFullWeaponCHECK = 0;
			}

			A_JOB.value = StoN2(w.substr(1,2));
			ChangeJob(StoN2(w.substr(1,2)),2);
			A_BaseLV.value = StoN2(w.substr(3,2));
			A_JobLV.value = StoN2(w.substr(5,2));
			A_STR.value = StoN2(w.substr(7,2));
			A_AGI.value = StoN2(w.substr(9,2));
			A_VIT.value = StoN2(w.substr(11,2));
			A_DEX.value = StoN2(w.substr(13,2));
			A_INT.value = StoN2(w.substr(15,2));
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
			{
				A_Arrow.value = StoN2(w.substr(22,1));
			}
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
				selfBuffs[i] = StoN2(w.substr(81+i,1));
			}
			
			/*var x = 81 + i;
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
				monsterDebuffs[0] = StoN2(w.substr(x+1,1));
				monsterDebuffs[1] = Math.floor(StoN2(w.substr(x+2,1)) / 6);
				monsterDebuffs[18] = StoN2(w.substr(x+2,1)) % 6;
				var wn = StoN2(w.substr(x+3,1));
				monsterDebuffs[2] = Math.floor(wn / 16);
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
				/* !New! Test for Shadows and enchant save*/
			// SaveData[x++] = NtoS2(eval(A_SHADOW_BODY_DEF_PLUS),1);
			// SaveData[x++] = NtoS2(eval(A_SHADOW_body),1);
	}
}

function LoadButton()
{
	if(document.calcForm.A_SaveType.value == 0)
	{
		var wStr = unescape(window.localStorage.SaveDataMain);
		var SaveData2 = new Array();
		SaveData2 = wStr.split("?");
		var num = eval(document.calcForm.saveList.value);
		Load(SaveData2[num]);
	}
	else
	{
		var wStr = "";
		var SaveData = new Array();
		SaveData = document.cookie.split("; ");
		for(var i=0;SaveData[i];i++)
		{
			if(SaveData[i].substr(0,13) == "SavedataMain=")
			{
				wStr = SaveData[i].substr(13,SaveData[i].length);
				var SaveData2 = new Array();
				SaveData2 = wStr.split("?");
				var num = eval(document.calcForm.saveList.value);
				Load(SaveData2[num]);
				break;
			}
		}

	}
	document.calcForm.saveName.value = LoadDataName[num];
	HOJYO_SYOKIKA();
	n_LastSaveNum = num;

	if ( n_SaveMode == 0 )
	{
		SetShortCut();
	}
	
}

function LoadCookieSP()
{
with(document.calcForm)
{
	var wStr = "";
	for(var k=0;k<=18;k++)
	{
		var SaveData = new Array();
		if(k <= 7)
			var	cookieNum = "num0"+k;
		if(k == 8)
			var	cookieNum = "num09";
		if(k == 9)
			var	cookieNum = "num10";
		if(k > 10)
			var cookieNum = "num"+k;
		SaveData = document.cookie.split("; ");
		var ch=0;
		for(i=0;SaveData[i];i++)
		{
			if (SaveData[i].substr(0,6) == cookieNum +"=")
			{
				wStr += SaveData[i].substr(6,SaveData[i].length);
				ch = 1;
				var x=0;
				for(var i=0;i<=maxcookie;i++)
					x += SaveStr1[i];
				for(i=x;i<=159;i++)
					wStr += 0;
				wStr += "<BR>";
			}
		}
		if(ch==0)
		{
			for(var i=0;i<=159;i++)
				wStr += 0;
			wStr += "<BR>";
		}
	}
	myInnerHtml("PR1",wStr,0);
}
}

function Save()
{
with(document.calcForm)
{
	calc();
	SaveData = new Array();

	for(var i=0;i<=maxcookie;i++)
		SaveData[i]="a";

	SaveData[0] = NtoS2(0,1);
	SaveData[1] = NtoS2(eval(A_JOB.value),2);
	SaveData[2] = NtoS2(eval(A_BaseLV.value),2);
	SaveData[3] = NtoS2(eval(A_JobLV.value),2);
	SaveData[4] = NtoS2(eval(A_STR.value),2);
	SaveData[5] = NtoS2(eval(A_AGI.value),2);
	SaveData[6] = NtoS2(eval(A_VIT.value),2);
	SaveData[7] = NtoS2(eval(A_DEX.value),2);
	SaveData[8] = NtoS2(eval(A_INT.value),2);
	SaveData[9] = NtoS2(eval(A_LUK.value),2);
	SaveData[10] = NtoS2(eval(speedPot.value) * 10 + eval(A_Weapon_element.value),1);

	SaveData[11] = NtoS2(eval(A_WeaponType.value),1);
	if(n_Nitou)
		SaveData[12] = NtoS2(eval(A_Weapon2Type.value),1);

	if(n_A_JobSearch()==2 || n_A_JobSearch()==4 || (n_A_JOB==45 && n_A_WeaponType!=0))
		SaveData[13] = NtoS2(eval(A_Arrow.value),1);

	SaveData[14] = NtoS2(eval(A_weapon1.value),2);
	SaveData[15] = NtoS2(eval(A_Weapon_ATKplus.value),1);
	SaveData[16] = NtoS2(eval(A_weapon1_card1.value),2);
	SaveData[17] = NtoS2(eval(A_weapon1_card2.value),2);
	SaveData[18] = NtoS2(eval(A_weapon1_card3.value),2);
	SaveData[19] = NtoS2(eval(A_weapon1_card4.value),2);
	if(n_Nitou)
	{
		SaveData[20] = NtoS2(eval(A_weapon2.value),2);
		SaveData[21] = NtoS2(eval(A_Weapon2_ATKplus.value),1);
		SaveData[22] = NtoS2(eval(A_weapon2_card1.value),2);
		SaveData[23] = NtoS2(eval(A_weapon2_card2.value),2);
		SaveData[24] = NtoS2(eval(A_weapon2_card3.value),2);
		SaveData[25] = NtoS2(eval(A_weapon2_card4.value),2);
	}
	else
	{
		SaveData[20] = NtoS2(eval(A_left.value),2);
		SaveData[21] = NtoS2(eval(A_LEFT_DEF_PLUS.value),1);
		SaveData[22] = NtoS2(eval(A_left_card.value),2);
		SaveData[24] = SaveData[25] = SaveData[23] = NtoS2(0,2);;
	}
	SaveData[26] = NtoS2(eval(A_head1.value),2);
	SaveData[27] = NtoS2(eval(A_head1_card.value),2);
	SaveData[28] = NtoS2(eval(A_head2.value),2);
	SaveData[29] = NtoS2(eval(A_head2_card.value),2);
	SaveData[30] = NtoS2(eval(A_head3.value),2);
	SaveData[31] = NtoS2(eval(A_body.value),2);
	SaveData[32] = NtoS2(eval(A_body_card.value),2);
	SaveData[33] = NtoS2(eval(A_shoulder.value),2);
	SaveData[34] = NtoS2(eval(A_shoulder_card.value),2);
	SaveData[35] = NtoS2(eval(A_shoes.value),2);
	SaveData[36] = NtoS2(eval(A_shoes_card.value),2);
	SaveData[37] = NtoS2(eval(A_acces1.value),2);
	SaveData[38] = NtoS2(eval(A_acces1_card.value),2);
	SaveData[39] = NtoS2(eval(A_acces2.value),2);
	SaveData[40] = NtoS2(eval(A_acces2_card.value),2);
	SaveData[41] = NtoS2(eval(A_HEAD_DEF_PLUS.value),1);
	SaveData[42] = NtoS2(eval(A_BODY_DEF_PLUS.value),1);
	SaveData[43] = NtoS2(eval(A_SHOULDER_DEF_PLUS.value),1);
	SaveData[44] = NtoS2(eval(A_SHOES_DEF_PLUS.value),1);
	SaveData[45] = NtoS01(A_youshi.checked,0,0,0,0);

	n_A_JobSet();
	var w = n_A_JOB;

	var ch = 0;
	for(var i=0;i<=19 && ch==0;i++)
	{
		if(JobSkillPassOBJ[w][i]!=999)
		{
			SaveData[47+i] = NtoS2(selfBuffs[i],1);
		}
		else
		{
			SaveData[46] = NtoS2(i,1);
			ch = 1;
		}
	}

	var x = 47 + i - 1;
	for(var i=0;i<=14 && acolyteBuffs[i]==0;i++);
	if(i==15)
	{
		SaveData[x] = NtoS2(0,1);
	}
	else
	{
		SaveData[x] = NtoS2(1,1);
		SaveData[x+1] = NtoS2(acolyteBuffs[0],1);
		SaveData[x+2] = NtoS2(acolyteBuffs[1],1);
		SaveData[x+3] = NtoS2(acolyteBuffs[4],1);
		SaveData[x+4] = NtoS2(acolyteBuffs[9],1);
		SaveData[x+5] = NtoS05(acolyteBuffs[2],acolyteBuffs[6]);
		SaveData[x+6] = NtoS05(acolyteBuffs[8],acolyteBuffs[10]);
		SaveData[x+7] = NtoS05(acolyteBuffs[13],acolyteBuffs[14]);
		SaveData[x+8] = NtoS01(acolyteBuffs[3],acolyteBuffs[5],acolyteBuffs[7],acolyteBuffs[11],acolyteBuffs[12]);
		x += 8;
	}

	SaveData[x+1] = NtoS2(A_ActiveSkill.value,2);


		SaveData[x+2] = NtoS2(eval(A_ActiveSkillLV.value),1);
	SaveData[x+3] = NtoS2(0,3);
	if(n_A_ActiveSkill==66 || n_A_ActiveSkill==326 || n_A_ActiveSkill==131 || n_A_ActiveSkill==88 || n_A_ActiveSkill==197 || n_A_ActiveSkill==394 || n_A_ActiveSkill==395 || n_A_ActiveSkill==405 || n_A_ActiveSkill==429)
		SaveData[x+3] = NtoS2(eval(SkillSubNum.value),3);
	SaveData[x+4] = NtoS2(n_B[en_ID],2);
	x+=4;

	x+=1;
	for(var i=0;i<=24 && monsterDebuffs[i]==0;i++);
	if(i==25)
	{
		SaveData[x] = NtoS2(0,1);
	}
	else
	{
		SaveData[x] = NtoS2(1,1);
		SaveData[x+1] = NtoS2(monsterDebuffs[status_en_PROVOKE],1);
		SaveData[x+2] = NtoS05(monsterDebuffs[status_en_QUAG],monsterDebuffs[18]);
		SaveData[x+3] = NtoS01(monsterDebuffs[status_en_POISON],monsterDebuffs[3],monsterDebuffs[4],monsterDebuffs[5],monsterDebuffs[6]);
		SaveData[x+4] = NtoS01(monsterDebuffs[7],monsterDebuffs[8],monsterDebuffs[9],monsterDebuffs[10],monsterDebuffs[19]);
		SaveData[x+5] = NtoS2(monsterDebuffs[11],1);
		SaveData[x+6] = NtoS2(monsterDebuffs[12],1);
		SaveData[x+7] = NtoS01(monsterDebuffs[13],monsterDebuffs[14],monsterDebuffs[15],monsterDebuffs[16],monsterDebuffs[17]);
		SaveData[x+8] = NtoS01(monsterDebuffs[20],monsterDebuffs[21],monsterDebuffs[22],0,0);
		SaveData[x+9] = NtoS05(monsterDebuffs[23],monsterDebuffs[24]);
		x+=9;
	}

	x+=1;
	for(var i=0;i<=9 && monsterBuffs[i]==0;i++);
	if(i==10)
	{
		SaveData[x] = NtoS2(0,1);
	}
	else
	{
		SaveData[x] = NtoS2(1,1);
		SaveData[x+1] = NtoS2(monsterBuffs[0],1);
		SaveData[x+2] = NtoS01(monsterBuffs[1],monsterBuffs[2],monsterBuffs[3],monsterBuffs[4],monsterBuffs[5]);
		SaveData[x+3] = NtoS2(monsterBuffs[6],2);
		SaveData[x+4] = NtoS05(monsterBuffs[7],monsterBuffs[8]);
		SaveData[x+5] = NtoS01(monsterBuffs[9],0,0,0,0);
		x+=5;
	}

	x+=1;
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
	SaveData[x] = NtoS01(checkHIT[0],checkHIT[1],checkHIT[2],checkHIT[3],checkHIT[4]);

	if(checkHIT[0])
	{
		SaveData[x+1] = NtoS2(performerBuffs[0],1);
		SaveData[x+2] = NtoS2(performerBuffs[1],1);
		SaveData[x+3] = NtoS2(performerBuffs[2],1);
		SaveData[x+4] = NtoS2(performerBuffs[3],1);
		SaveData[x+5] = NtoS2(performerBuffs[4],1);
		SaveData[x+6] = NtoS2(performerBuffs[5],1);
		SaveData[x+7] = NtoS2(performerBuffs[6],1);
		SaveData[x+8] = NtoS05(performerBuffs[7],performerBuffs[8]);
		SaveData[x+9] = NtoS05(performerBuffs[9],performerBuffs[10]);
		SaveData[x+10] = NtoS01(performerBuffs[11],performerBuffs[18],0,0,0);
		SaveData[x+11] = NtoS2(performerBuffs[12],2);
		SaveData[x+12] = NtoS2(performerBuffs[13],2);
		SaveData[x+13] = NtoS2(performerBuffs[14],2);
		SaveData[x+14] = NtoS2(performerBuffs[15],2);
		SaveData[x+15] = NtoS2(performerBuffs[16],2);
		SaveData[x+16] = NtoS2(performerBuffs[17],2);
		SaveData[x+17] = NtoS2(performerBuffs[20],2);
		SaveData[x+18] = NtoS2(performerBuffs[30],1);
		SaveData[x+19] = NtoS2(performerBuffs[21],2);
		SaveData[x+20] = NtoS2(performerBuffs[31],1);
		SaveData[x+21] = NtoS2(performerBuffs[22],2);
		SaveData[x+22] = NtoS2(performerBuffs[29],2);
		SaveData[x+23] = NtoS2(performerBuffs[32],1);
		SaveData[x+24] = NtoS2(performerBuffs[23],2);
		SaveData[x+25] = NtoS2(performerBuffs[33],1);
		SaveData[x+26] = NtoS2(performerBuffs[24],2);
		SaveData[x+27] = NtoS2(performerBuffs[34],1);
		SaveData[x+28] = NtoS2(performerBuffs[25],2);
		SaveData[x+29] = NtoS2(performerBuffs[35],1);
		SaveData[x+30] = NtoS2(performerBuffs[26],2);
		SaveData[x+31] = NtoS2(performerBuffs[36],1);
		x+=31;
	}

	if(checkHIT[1])
	{
		SaveData[x+1] = NtoS01(performerBuffs[40],0,0,0,0);
		SaveData[x+2] = NtoS05(performerBuffs[41],performerBuffs[42]);
		SaveData[x+3] = NtoS05(performerBuffs[43],performerBuffs[44]);
		x+=3;
	}

	if(checkHIT[2])
	{
		SaveData[x+1] = NtoS01(battleChantBuffs[0],battleChantBuffs[1],battleChantBuffs[2],battleChantBuffs[3],battleChantBuffs[4]);
		SaveData[x+2] = NtoS01(battleChantBuffs[5],0,0,0,0);
		x+=2;
	}

	if(checkHIT[3])
	{
		SaveData[x+1] = NtoS05(otherBuffs[0],otherBuffs[1]);
		SaveData[x+2] = NtoS05(otherBuffs[2],otherBuffs[4]);
		SaveData[x+3] = NtoS05(otherBuffs[5],0);
		SaveData[x+4] = NtoS2(otherBuffs[3],1);
		SaveData[x+5] = NtoS01(otherBuffs[6],0,0,0,0);
		x+=5;
	}

	if(checkHIT[4])
	{
		SaveData[x+1] = NtoS2(usableItems[3],2);
		SaveData[x+2] = NtoS2(usableItems[4],2);
		SaveData[x+3] = NtoS2(usableItems[5],2);
		SaveData[x+4] = NtoS2(usableItems[6],2);
		SaveData[x+5] = NtoS2(usableItems[7],2);
		SaveData[x+6] = NtoS2(usableItems[8],2);
		SaveData[x+7] = NtoS01(usableItems[0],usableItems[1],usableItems[2],usableItems[9],usableItems[10]);
		SaveData[x+8] = NtoS01(usableItems[11],usableItems[12],usableItems[13],usableItems[14],usableItems[15]);
		x+=8;
	}

	SaveData[x+1] = NtoS2(eval(document.calcForm.Conf01.value),2);
	x+=1;
	console.log("save()");
	wStr = "" +SaveData[0];
	for(i=1;i<=x;i++)
	{
		wStr += ""+SaveData[i];
	}
	return wStr;
}
}

function SaveButton()
{
	
with(document.calcForm)
{
	if(!(location.href.match("file:/")) && n_SaveMode == 1)
		return;

	SaveShortCutSP(); // void of savemode = 1
	// console.log("test");
	var num = saveList.value;
	var wName = "";
	console.log(saveName.value);
	// if(saveName.value == Word(84) || saveName.value == "")
	if(saveName.value == GetWord(84) || saveName.value == "")
	{ // if no custom text
		wName = JobName[n_A_JOB][Language];
	}
	else
	{
		wName = saveName.value;
		var r = /\?/;
		if(wName.match(r))
		{
			saveName.value = "?????????????";
			return;
		}
		var r = /\;/;
		if(wName.match(r))
		{
			saveName.value = "??????;??????";
			return;
		}
	}
	saveList.options[num-1] = new Option("Save"+ num +" "+ wName,num);
	LoadDataName[num] = wName;
	saveList.value = num;

	LoadDataMain[num] = Save();
	var wStrMain = "";
	wStrMain = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?";
	var wStrName = "";
	if(A_SaveType.value == 0)
	{
		for(var i=1;i<=99;i++)
			wStrMain += escape(LoadDataMain[i]) + "?";
		window.localStorage.SaveDataMain = wStrMain;

		for(var i=1;i<=99;i++)
			wStrName += escape(LoadDataName[i]) + "?";
		window.localStorage.SaveDataName = wStrName;
	}
	else
	{
		var wDay = 99000;
		var wCookie = new Date();
		wCookie.setTime(wCookie.getTime()+(wDay*1000*60*60*24));
		var expDay = wCookie.toGMTString();

		for(var i=1;i<=15;i++)
			wStrMain += escape(LoadDataMain[i]) + "?";
		document.cookie = "SavedataMain="+ wStrMain +"; expires="+ expDay;

		for(var i=1;i<=15;i++)
			wStrName += escape(LoadDataName[i]) + "?";
		document.cookie = "SavedataName="+ wStrName +"; expires="+ expDay;
	}
}
}

function SaveShortCut()
{
	var num = eval(document.calcForm.A_SHORTCUT_R.value);
	DataShortCut[n_LastSaveNum][num][0] = eval(document.calcForm.A_weapon1.value);
	DataShortCut[n_LastSaveNum][num][1] = eval(document.calcForm.A_Weapon_ATKplus.value);
	DataShortCut[n_LastSaveNum][num][2] = eval(document.calcForm.A_Weapon_element.value);
	DataShortCut[n_LastSaveNum][num][3] = eval(document.calcForm.A_weapon1_card1.value);
	DataShortCut[n_LastSaveNum][num][4] = eval(document.calcForm.A_weapon1_card2.value);
	DataShortCut[n_LastSaveNum][num][5] = eval(document.calcForm.A_weapon1_card3.value);
	DataShortCut[n_LastSaveNum][num][6] = eval(document.calcForm.A_weapon1_card4.value);

	var wCardName = ShortCutNameChange(num);

	var wHuyo="";
	if(DataShortCut[n_LastSaveNum][num][2] != 0)
		wHuyo = "("+ ZokuseiOBJ[DataShortCut[n_LastSaveNum][num][2]][Language] +")";
	wWeaponName = "+"+ DataShortCut[n_LastSaveNum][num][1] +" "+ wCardName + ITEM_NAME[DataShortCut[n_LastSaveNum][num][0]][1+Language*2] + wHuyo;
	document.calcForm.A_SHORTCUT_R.options[num] = new Option(wWeaponName,num);

	document.calcForm.A_SHORTCUT_R.value = num;

	if(n_SaveMode == 0)
	{
		var wStr = "";
		var i,j,k;
		for(i=0;i<=99;i++){
			for(j=0;j<=49;j++){
				for(k=0;k<=6;k++){
					wStr += DataShortCut[i][j][k];
					if(k==6 && j==49)
						wStr += ":";
					else if(k==6)
						wStr += "/";
					else
						wStr += "?";
				}
			}
		}
		window.localStorage.SaveDataShortCut = wStr;
	}
}

function SaveShortCutSP()
{
	if(n_SaveMode == 0)
	{
		var w_num = eval(document.calcForm.saveList.value);
		if(n_LastSaveNum != w_num)
		{
			for(var i=0;i<=49;i++)
			{
				for(var k=0;k<=6;k++)
					DataShortCut[w_num][i][k] = DataShortCut[n_LastSaveNum][i][k];
			}

			var wStr = "";
			var i,j,k;
			for(i=0;i<=99;i++)
			{
				for(j=0;j<=49;j++)
				{
					for(k=0;k<=6;k++)
					{
						wStr += DataShortCut[i][j][k];
						if(k==6 && j==49)
							wStr += ":";
						else if(k==6)
							wStr += "/";
						else
							wStr += "?";
					}
				}
			}
			window.localStorage.SaveDataShortCut = wStr;
		}
	}
}