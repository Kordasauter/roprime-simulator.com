function calcMAtk( includeMultipliers )
{
	n_A_StatMATK = CalcStatMatk();
	n_A_EquipMATK = n_tok[bon_MATK];
	
	// Adder ---
	if ( acolyteBuffs[ksImposito] > 0 )
	{ // Imposito Manus
		n_A_EquipMATK += acolyteBuffs[ksImposito] * 5;
	}
	if ( SkillSearch(skill_SOR_SUMMON_TYPE) == 2 && SkillSearch(skill_SOR_SUMMON_LEVEL) > 0 && SkillSearch(skill_SOR_SPIRIT_CONTROL) == 1 ) {
		//Aqua
		n_A_EquipMATK += 40*SkillSearch(skill_SOR_SUMMON_LEVEL);
	}
	if (otherBuffs[ksOdinsPower] >= 1) { //Odin's Power
		n_A_EquipMATK += 70+30*(otherBuffs[ksOdinsPower] - 1);
	}
	if ( SkillSearch(skill_KAG_16TH_NIGHT) )
		n_A_EquipMATK += 50 * SkillSearch(725);
	if ( EquipNumSearch(897) && ( n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN ) ) // AssaDamaB
		n_A_EquipMATK += 130 * EquipNumSearch(897);
	if ( EquipNumSearch(898) && ( n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN ) ) // AssaDamaV
		n_A_EquipMATK += 130 * EquipNumSearch(898);

	
	// Get MATK from weapon upgrades
	n_A_UpgradeMATK = CalcUpgradeMatk();
	CalcOverRefineMatk();
	if ( n_Nitou )
	{
		n_A_UpgradeMATK += CalcUpgradeMatk2();
		CalcOverRefineMatk2();
	}

	// Calculate variance based on weapon MATK
	n_A_MATK_Variance = Math.floor( ( StPlusWeapon( bon_MATK ) + n_A_UpgradeMATK ) * 0.1 * n_A_WeaponLV );
		
	n_A_EquipMATK += n_A_UpgradeMATK;
		
	// Item Multipliers
	if ( includeMultipliers )
	{
		w = 100;
		w += n_tok[bon_MATK_MUL];
		
		if(n_A_HEAD_DEF_PLUS >= 9 && n_A_card[8]==177) // KatheryneK
			w += 2;
		if(n_A_JobSearch()==cls_MAG && CardNumSearch(card_ISET_MAGESET))
			w +=3;
		if(n_A_JobSearch2() == cls_ROG)
			w += 10 * CardNumSearch(card_BODY_BYORGUE); // Byorgue

		if(EquipNumSearch(484) && SU_INT >= 70) // SageDiary
			w += 5;
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(642)) // LBW
			w += 3;
		if(EquipNumSearch(646)) // SoDestru
			w += Math.floor(n_A_Weapon_ATKplus / 2);
		if(EquipNumSearch(737)) // ??
			w += Min(n_A_Weapon_ATKplus,10);
		if ( EquipNumSearch( 849 ) ) // Balloon Hat
			w += 2 + Math.floor(n_A_HEAD_DEF_PLUS / 2);
		if(EquipNumSearch(897) && (n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN))
			w += 15 * EquipNumSearch(897); // AssaDamaB
		if(EquipNumSearch(898) && (n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN))
			w += 15 * EquipNumSearch(898); // AssaDamaV
		if(EquipNumSearch(1029) && n_A_HEAD_DEF_PLUS >= 6) // Pagdayaw
			w += n_A_HEAD_DEF_PLUS - 5;
		if(EquipNumSearch(1042)) // GentlemanSet
			w += n_A_Weapon_ATKplus;
		if(EquipNumSearch(1083))
		{ // Glorious DestruStaff
			w += n_A_Weapon_ATKplus;
			if (n_A_Weapon_ATKplus >= 6)
				n_tok[bon_MDMG_RC_DEMI_HUMAN] += Math.min(20, 2*(n_A_Weapon_ATKplus-5));
		}
		if(n_A_card[card_loc_HEAD_UPPER] == 551 && n_A_HEAD_DEF_PLUS >=9) // Uzhas	
		{
			n_tok[bon_MDMG_RC_DEMON] += 5 ;
		}
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1084)) // GloArcWand
			w += 5;
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1095)) // GloApocalypse
			w += 5;
		if(EquipNumSearch(1173)) // StaffOfThea
			w += Math.floor(n_A_Weapon_ATKplus / 2);
		if ( EquipNumSearch( 565 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Dress Hat
			w += 1;
		}
		if ( EquipNumSearch( 872 ) )
		{ // Crown of Deceit
			if ( n_A_HEAD_DEF_PLUS >= 7 )
			{
				w += 5;
			}
			if ( n_A_HEAD_DEF_PLUS >= 9 )
			{
				w += 5;
			}
		}
		if ( EquipNumSearch( 1214 ) )
		{ // Red Wing Hat
			if ( n_A_HEAD_DEF_PLUS >= 7 )
			{
				w += 2;
			}
			if ( n_A_HEAD_DEF_PLUS >= 9 )
			{
				w += 2;
			}
		}
		if ( EquipNumSearch( 1149 ) )
		{ // Skull Cap
			if ( n_A_HEAD_DEF_PLUS >= 5 )
			{
				w += 3;
			}
			if ( n_A_HEAD_DEF_PLUS >= 7 )
			{
				w += 3;
			}
		}
		if ( EquipNumSearch( 1338 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Cancer Diadem
			w += 2;
		}
		if ( EquipNumSearch( 1340 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Gemini Diadem
			w += 8;
		}
		if ( EquipNumSearch( 1343 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Pisces Diadem
			w += 2;
		}
		if ( EquipNumSearch( 1344 ) && n_A_HEAD_DEF_PLUS >= 10 )
		{ // Sagittarius Diadem
			w += 4;
		}
		if ( EquipNumSearch( 1348 ) && n_A_HEAD_DEF_PLUS >= 10 )
		{ // Aries Crown
			w += 2;
		}
		if ( EquipNumSearch( 1353 ) && n_A_HEAD_DEF_PLUS >= 9 )
		{ // Pisces Crown
			w += 2;
		}
		if ( EquipNumSearch( 1352 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Libra Crown
			w += 3;
			if ( EquipNumSearch( 1352 ) && n_A_HEAD_DEF_PLUS >= 9 )
			{ // Libra Crown
				w += 5;
			}
		}
		if(EquipNumSearch(1401))
		{ // Ancient Gold Ornament
			if(n_A_JobSearch()==cls_ACO || n_A_JobSearch()==cls_MAG)
				w += 8;
		}
		if( EquipNumSearch(1401) ) 
		{ // RWC Memory Staff
			if (n_A_Weapon_ATKplus >= 6) { IncMagDmgAllRace(5); }
			if (n_A_Weapon_ATKplus >= 9) { IncMagDmgAllRace(5); }
		}
		if( EquipNumSearch(1487) ) 
		{ // RWC Memory Knife
			if (n_A_Weapon_ATKplus >= 6) { IncMagDmgAllRace(5); }
			if (n_A_Weapon_ATKplus >= 9) { IncMagDmgAllRace(5); }
		}
		if( EquipNumSearch(1519) ) 
		{ // Orlean's glove + Plate
			w += n_A_SHIELD_DEF_PLUS;
		}
		if( EquipNumSearch(1522) ) 
		{ // Chibi Pope
			if (n_A_HEAD_DEF_PLUS >= 9) { w += 7; }
			if (n_A_HEAD_DEF_PLUS >= 12) { w += 5; }
		}
		if( EquipNumSearch( 1582 ) )
		{//Loli Ruri's Cat
			if(n_A_HEAD_DEF_PLUS >= 7)
			{
				w += 2;
			}
			if(n_A_HEAD_DEF_PLUS >= 9)
			{
				w += 3;
			}
		}
		if ( (EquipNumSearch( 1637 ) ) )
		{// "Thanatos' Dolor Hat"
			if(n_A_HEAD_DEF_PLUS > 6)
			{
				w += 5;
			}
		}
		if(EquipNumSearch(1681))
		{ //"Amistr Hat"
			if(n_A_HEAD_DEF_PLUS >= 11) { w += 3;}	
		}
		if(EquipNumSearch(1682))
		{ //"Officer's Cap"
			if(n_A_HEAD_DEF_PLUS > 6)
			{
				w += 5;
			}
		}
		if ( EquipNumSearch( 1795 ) )
		{//INT Glove
			if(SU_INT >= 110)
				w += 1;
		}
		if(EquipNumSearch(1883))
		{ //"Magic Foxtrail Staff"
			w += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
		}
		if(EquipNumSearch(1884))
		{ //"Magic Yellow Foxtrail Staff"
			w += 3 * Math.floor(n_A_Weapon_ATKplus / 2);
		}
		if(EquipNumSearch(1877))
		{ //"Wondrous Foxtail Staff"
			w += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
		}
		
		//Shadows
		if ( EquipNumSearch( 1656 ) )
		{ // "Shadow Mystic Gloves"
			if (n_A_SHADOW_WEAPON_DEF_PLUS >= 7) { w += 1; }
			if (n_A_SHADOW_WEAPON_DEF_PLUS >= 9) { w += 1; }
		}
		if ( EquipNumSearch( 1657 ) )
		{ // "Shadow Mystic Ring"
			if (n_A_SHADOW_EARRING_DEF_PLUS >= 7) { w += 1; }
		}
		if ( EquipNumSearch( 1658 ) )
		{ // "Shadow Mystic Pendant"
			if (n_A_SHADOW_PENDANT_DEF_PLUS >= 7) { w += 1; }
		}
		if ( EquipNumSearch( 1662 ) )
		{ // "Shadow Strongman Pendant"
			if (n_A_SHADOW_PENDANT_DEF_PLUS >= 7) { w += 1; }
		}
		if ( EquipNumSearch( 1659 ) )
		{ // "Shadow Mystic Set"
			if ((n_A_SHADOW_PENDANT_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_WEAPON_DEF_PLUS)>= 20) { w += 1; }
			if ((n_A_SHADOW_PENDANT_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_WEAPON_DEF_PLUS)>= 25) { w += 1; }
		}
		if ( EquipNumSearch(1823) || EquipNumSearch(1824))
		{ // Shadow Taekwon  Shield or Shadow Super Novice Shield
			if(n_A_SHADOW_SHIELD_DEF_PLUS >=7){w += 2;}
			if(n_A_SHADOW_SHIELD_DEF_PLUS >=9){w += 3;}
		}
		if ( EquipNumSearch(1839) )
		{ // Shadow Ninja Gloves
			if(n_A_SHADOW_WEAPON_DEF_PLUS >=7){w += 3;}
			if(n_A_SHADOW_WEAPON_DEF_PLUS >=9){w += 4;}
		}
		if ( EquipNumSearch(1840) )
		{ // Shadow Taekwon Gloves
			w += n_A_SHADOW_WEAPON_DEF_PLUS;
		}
		//Enchant
		if(EnchNumSearch( 284 ))//Special INT = 284
		{
			if(EquipNumSearch(1545) && n_A_SHOULDER_DEF_PLUS >8)
			{
				w += 1;
			}
		}
		if(EnchNumSearch( 285 ))//Special DEX = 285
		{
			if(EquipNumSearch(1545) && n_A_SHOULDER_DEF_PLUS >8)
			{
				w += 1;
			}
		}
		
		if(CardNumSearch(582))
		{//Professor Card
			if(SU_DEX >= 110)
			w += 7;
		}
		
		//items
		if ( usableItems[ksArchmagePotion] )
		{
			w += 1;
		}
		if(otherBuffs[ksMurderBonus])
			w += 10;

		n_A_StatMATK = (n_A_StatMATK * w / 100);
		n_A_MATK_Variance = (n_A_MATK_Variance * w / 100);
		n_A_EquipMATK = (n_A_EquipMATK * w / 100);
	}

	// Items
	if ( usableItems[ksRainbowCake] )
	{
		n_A_EquipMATK += 10;
	}
	if ( usableItems[ksBoxOfDrowsiness] )
	{
		n_A_EquipMATK += 20;
	}
	if ( usableItems[ksWhiteRation] )
	{
		n_A_EquipMATK += 15;
	}
	if ( usableItems[ksDurian] )
	{
		n_A_EquipMATK += 10;
	}
	if ( usableItems[ksRuneStrawberryCake] )
	{
		n_A_EquipMATK += 5;
	}
	if ( usableItems[ksBlessingOfTyr] )
	{
		n_A_EquipMATK += 20;
	}
	if ( usableItems[ksManaPlus] )
	{
		n_A_EquipMATK += 50;
	}
	if ( usableItems[ksMardukTransScroll] )
	{
		n_A_EquipMATK += 25;
	}
	if ( usableItems[ksArchmagePotion] )
	{
		n_A_EquipMATK += 30;
	}
	if(usableItems[ksSuperhumanSweets])
	{
		n_A_EquipMATK += 30;
	}
		
	// Equipment
	if(SU_STR >= 120 && EquipNumSearch(1253)) // Rune Circlet
		n_A_EquipMATK += 5;
	if(SU_INT >= 120 && EquipNumSearch(1254)) // Mitra
		n_A_EquipMATK += 10;
	if(SU_INT >= 120 && EquipNumSearch(1263)) // Whispers of Wind
		n_A_EquipMATK += 10;
	if(SU_INT >= 120 && EquipNumSearch(1264)) // Reissue Schmitz Helm
		n_A_EquipMATK += 10;
	if ( EquipNumSearch( 1218 ) && n_A_HEAD_DEF_PLUS >= 5 )
	{ // Moon Rabbit Hat
		n_A_EquipMATK += n_A_HEAD_DEF_PLUS - 4;
	}
	if ( EquipNumSearch( 1149 ) )
	{ // Skull Cap
		if ( EquipNumSearch( 89 ) || EquipNumSearch( 936 ) )
		{ // Evil Bone Wand or Thorn Staff of Darkness
			n_A_EquipMATK += n_A_Weapon_ATKplus * 10;
		}
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if ( SU_INT >= 90 && n_A_SHOULDER_DEF_PLUS >= 7) { n_A_EquipMATK += 30; }
		if ( SU_INT >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { n_A_EquipMATK += 20; }
	}
	if ( EquipNumSearch( 1583 ) )
	{ //Golden Angel Wing
		if ( SU_INT >= 90 ) { n_A_EquipMATK += 15; }
		if ( SU_INT >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { n_A_EquipMATK += 15; }
	}
	if ( EquipNumSearch( 1584 ) )
	{ //Golden Angel Hairband
		if ( SU_INT >= 70 ) { n_A_EquipMATK += 5; }
		if ( SU_INT >= 70 && n_A_HEAD_DEF_PLUS >= 7) { n_A_EquipMATK += 10; }
	}
	if ( EquipNumSearch(1634) )
	{//"Zaha Doll Hat(transformation mode)"
			if ( n_A_HEAD_DEF_PLUS >= 2) {n_A_EquipMATK += 30*(n_A_HEAD_DEF_PLUS-1) }; 
	}
	if ( EquipNumSearch( 1487 ) )
	{ // "RWC Memory Staff" 
		n_A_EquipMATK += Math.floor(n_A_Weapon_ATKplus/3)*20;
	}
	if ( EquipNumSearch( 1489 ) )
	{ // "RWC Memory Staff" 
		n_A_EquipMATK += Math.floor(n_A_Weapon_ATKplus/3)*30;
	}
	if ( EquipNumSearch( 1491 ) )
	{ // "RWC Memory Knife + RWC 2012 Pendant"
		n_A_EquipMATK += n_A_Weapon_ATKplus*10;
	}
	if ( EquipNumSearch( 1493 ) )
	{ // "RWC Memory Staff + RWC 2012 Pendant"
		n_A_EquipMATK += n_A_Weapon_ATKplus*5;
	}
	if(SU_INT >= 120 && EquipNumSearch(1390)) // Gefenia Report of Water
		n_A_EquipMATK += 10;
	if(EquipNumSearch(1545))
	{ //Fallen Angel Wing
		n_A_EquipMATK += Math.floor(SU_INT/20);
	}
	if(EquipNumSearch(1681))
	{ //"Amistr Hat"
		n_A_EquipMATK += Math.floor(n_A_HEAD_DEF_PLUS / 2) * 10;
		if(EquipNumSearch(1684))// Amistr Hat + Holy Stick
		{
			n_A_EquipMATK += 10 * Math.floor(n_A_Weapon_ATKplus / 2);
		}
	}
	if(EquipNumSearch(1682))
	{ //"Officer's Cap"
		n_A_EquipMATK += Math.floor( n_A_HEAD_DEF_PLUS/2 );
	}
	if ( EquipNumSearch( 1795 ) )
	{//Int Glove
		n_A_EquipMATK+= Math.floor(SU_INT / 10)
	}
	if(EquipNumSearch(1883))
	{ //"Magical Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_A_EquipMATK += 104;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			n_A_EquipMATK += 52 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			n_A_EquipMATK += 52 * 3;
		}
	}
	if(EquipNumSearch(1884))
	{ //"Magical Yellow Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_A_EquipMATK += 112;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			n_A_EquipMATK += 56 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			n_A_EquipMATK += 56 * 3;
		}
	}
	if(EquipNumSearch(1873))
	{ //"Marvelous Foxtail Staff"
		n_A_EquipMATK += 10 * Math.floor( n_A_Weapon_ATKplus / 3 );
	}
	if(EquipNumSearch(1877))
	{ //"Wondrous Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_A_EquipMATK += 96;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			n_A_EquipMATK += 48 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			n_A_EquipMATK += 48 * 3;
		}
	}
	if(EquipNumSearch(1919))
	{ //"Foxtail Ring"
		if(n_A_BaseLV <= 50)
		{
			n_A_EquipMATK += 2 * Math.floor(n_A_BaseLV /5);
		}
		else
		{
			n_A_EquipMATK += 20;
		}
	}
	//shadows
	if ( EquipNumSearch( 1657 ) )
	{ // "Shadow Mystic Ring"
		n_A_EquipMATK += n_A_SHADOW_EARRING_DEF_PLUS ;
	}
	if ( EquipNumSearch( 1658 ) )
	{ // "Shadow Mystic Pendant"
		n_A_EquipMATK += n_A_SHADOW_PENDANT_DEF_PLUS;
	}
	if ( EquipNumSearch( 1712 ) )// "Shadow Swordsman Gloves"
	{ 
		n_A_EquipMATK += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if ( EquipNumSearch( 1716 ) )// "Shadow Diviner Gloves"
	{ 
		n_A_EquipMATK += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if ( EquipNumSearch( 1719 ) )
	{ // "Shadow Diviner Set"
		n_A_EquipMATK += (n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS);
	}
	if( EquipNumSearch( 1759 ) )
	{ // Diabolic Halo
		n_A_EquipMATK += Math.floor(n_A_HEAD_DEF_PLUS / 2) * 15;
	}	
	if ( EquipNumSearch( 1826 ) || // "Shadow Runeknight Gloves"
	 EquipNumSearch( 1827 ) || // "Shadow Royalguard Gloves"
	 EquipNumSearch( 1828 ) || // "Shadow Mechanic Gloves"
	 EquipNumSearch( 1829 ) || // "Shadow Genetic Gloves"
	 EquipNumSearch( 1830 ) || // "Shadow Archbishop Gloves"
	 EquipNumSearch( 1831 ) || // "Shadow Sura Gloves"
	 EquipNumSearch( 1832 ) || // "Shadow Guillotine Gloves"
	 EquipNumSearch( 1833 ) || // "Shadow Shadowchaser Gloves"
	 EquipNumSearch( 1834 ) || // "Shadow Warlock Gloves"
	 EquipNumSearch( 1835 ) || // "Shadow Sorcerer Gloves"
	 EquipNumSearch( 1836 ) || // "Shadow Ranger Gloves"
	 EquipNumSearch( 1837 ) || // "Shadow Minstrel Gloves"
	 EquipNumSearch( 1838 ) || // "Shadow Wanderer Gloves"
	 EquipNumSearch( 1839 ) || // "Shadow Ninja Gloves"
	 EquipNumSearch( 1840 ) || // "Shadow Taekwon Gloves"
	 EquipNumSearch( 1841 ) || // "Shadow Super Novice Gloves"
	 EquipNumSearch( 1842 ) )  // "Shadow Gunslinger Gloves"
	{ // 
		n_A_EquipMATK += n_A_SHADOW_WEAPON_DEF_PLUS; 
	}
	if ( EquipNumSearch(1839) )
	{ // Shadow Ninja Gloves
		if(n_A_SHADOW_SHIELD_DEF_PLUS >=9){n_A_EquipMATK += SkillSearch(skill_NIN_NINJA_MASTERY) * 3;}
	}
	if(CardNumSearch(555))
	{//Antique Book Card
		n_A_EquipMATK += Math.floor(SU_INT / 10);
	}
	if(CardNumSearch(557))
	{//Faithful Manager Card
		if (  n_A_WeaponType == weapTyp_BOOK)
		{
			if(n_A_Weapon_ATKplus >= 10)
				n_A_EquipMATK += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
			if(n_A_Weapon_ATKplus >= 14)
				n_A_EquipMATK += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
		}
	}
	
	// Skills
	if ( performerBuffs[ksWandererSolo] === ksMoonlightSerenade &&
		 performerBuffs[ksWandererSoloLevel] > 0 )
	{ // Moonlight Serenade
		var skillBonus = performerBuffs[ksWandererSoloLevel] * 6;
		var voiceLessonsBonus = performerBuffs[ksWandererVoiceLessons];
		var jobLvlBonus = performerBuffs[ksWandererJobLevel] / 5.0;

		n_A_EquipMATK += skillBonus + voiceLessonsBonus + jobLvlBonus;
	}
	if ( SkillSearch( skill_SUM_CHATTERING ) )
	{ // Chattering
		n_A_EquipMATK += 100;
	}
	if ( SkillSearch( skill_SUM_MEOW_MEOW ) || summonerBuffs[ksMeowMeow])
	{ // Meow Meow
		n_A_EquipMATK += 100;
	}
	if(SkillSearch(skill_SUM_SILVERVINE_ROOT_TWIST) && SkillSearch(skill_SUM_SPIRIT_OF_LAND))
	{
		n_A_EquipMATK += n_A_BaseLV;
	}
	if(SkillSearch(skill_SUM_NYANG_GRASS) && SkillSearch(skill_SUM_SPIRIT_OF_LAND))
	{
		n_A_EquipMATK += n_A_BaseLV;
	}

	// Skill Multipliers
	if ( includeMultipliers )
	{
		if ( otherBuffs[ksMindBreaker] )
		{
			w = 20 * otherBuffs[ksMindBreaker];

			n_A_StatMATK = (n_A_StatMATK * (1+ w/100));
			n_A_MATK_Variance = (n_A_MATK_Variance * (1+ w/100));
			n_A_EquipMATK = (n_A_EquipMATK * (1+ w/100)); 

		}
		if ( SkillSearch( skill_HW_MYSTICAL_AMPLIFICATION ) )
		{
			var w2 = [51,54,56,57,125,126,127,128,131,132,133,534,540,542,545,547,553];
			
			if ( SkillSearch( skill_WAR_READING_SPELLBOOK ) == 0 || NumSearch( n_A_ActiveSkill, w2 ) == 0 )
			{ // doesn't work with myst amp
				w = 5 * SkillSearch(skill_HW_MYSTICAL_AMPLIFICATION);
				n_A_StatMATK = (n_A_StatMATK * (1+ w/100));
				n_A_MATK_Variance = (n_A_MATK_Variance * (1+ w/100));
				n_A_EquipMATK = (n_A_EquipMATK * (1+ w/100)); 
			}
		}
		if ( SkillSearch( skill_WAR_RECOGNIZED_SPELL ) )
		{ // always max damage
			n_A_EquipMATK += n_A_MATK_Variance;
			n_A_MATK_Variance = 0;
		}
	}
	
	// Do the math!
	n_A_StatMATK = Math.floor(n_A_StatMATK);
	n_A_MATK_Variance = Math.floor( n_A_MATK_Variance );
	n_A_EquipMATK = Math.floor(n_A_EquipMATK);
	
	n_A_MATK = [0,0,0];
	n_A_MATK[0] = n_A_StatMATK + n_A_EquipMATK - n_A_MATK_Variance + minOverrefineMagicAttack;
	n_A_MATK[2] = n_A_StatMATK + n_A_EquipMATK + n_A_MATK_Variance + overrefineMagicAttack;
	n_A_MATK[1] = Math.floor( ( n_A_MATK[0] + n_A_MATK[2] ) / 2 );

	BK_n_A_MATK = [0,0,0];
	BK_n_A_MATK[0] = n_A_MATK[0];
	BK_n_A_MATK[1] = n_A_MATK[1];
	BK_n_A_MATK[2] = n_A_MATK[2];
}
// Increase damage to all races
function IncMagDmgAllRace(value) 
{
	n_tok[bon_MDMG_RC_FORMLESS] += value; 
	n_tok[bon_MDMG_RC_UNDEAD] += value; 
	n_tok[bon_MDMG_RC_BRUTE] += value; 
	n_tok[bon_MDMG_RC_PLANT] += value; 
	n_tok[bon_MDMG_RC_INSECT] += value; 
	n_tok[bon_MDMG_RC_FISH] += value; 
	n_tok[bon_MDMG_RC_DEMON] += value; 
	n_tok[bon_MDMG_RC_DEMI_HUMAN] += value; 
	n_tok[bon_MDMG_RC_ANGEL] += value; 
	n_tok[bon_MDMG_RC_DRAGON] += value; 
}

// statusMATK formula
function CalcStatMatk()
{
	var statusMATK
	
	statusMATK = n_A_INT + Math.floor( n_A_INT / 2 );
	statusMATK += Math.floor( n_A_DEX / 5 )
	statusMATK += Math.floor( n_A_LUK / 3 )
	statusMATK += Math.floor( n_A_BaseLV / 4 );
	
	return statusMATK;
}

// matk from first weapon's upgrade
function CalcUpgradeMatk()
{
	var upgradeMATK = 0;
	
	if ( n_A_WeaponType == weapTyp_BOW )
	{
		// bows are broken and always
		// give 0 MATK for upgrades
		return upgradeMATK;
	}
		
	if ( n_A_WeaponLV === 1 )
	{
		upgradeMATK = n_A_Weapon_ATKplus * 2;
	}
	else if ( n_A_WeaponLV === 2 )
	{
		upgradeMATK = n_A_Weapon_ATKplus * 3;
	}
	else if ( n_A_WeaponLV === 3 )
	{
		upgradeMATK = n_A_Weapon_ATKplus * 5;
	}
	else if ( n_A_WeaponLV === 4 )
	{
		upgradeMATK = n_A_Weapon_ATKplus * 7;
	}
	
	return upgradeMATK;
}

// matk from second weapon's upgrade
function CalcUpgradeMatk2()
{
	var upgradeMATK = 0;

	if ( n_Nitou )
	{
		if ( n_A_Weapon2LV === 1 )
		{
			upgradeMATK = n_A_Weapon2_ATKplus * 2;
		}
		else if ( n_A_Weapon2LV === 2 )
		{
			upgradeMATK = n_A_Weapon2_ATKplus * 3;
		}
		else if ( n_A_Weapon2LV === 3 )
		{
			upgradeMATK = n_A_Weapon2_ATKplus * 5;
		}
		else if ( n_A_Weapon2LV === 4 )
		{
			upgradeMATK = n_A_Weapon2_ATKplus * 7;
		}
	}
	
	return upgradeMATK;
}

function CalcOverRefineMatk()
{
	overrefineMagicAttack = 0;
	
	if ( n_A_WeaponType == weapTyp_BOW )
	{
		// bows are broken and always
		// give 0 MATK for upgrades
		return overrefineMagicAttack;
	}
	
	if ( n_A_WeaponLV == 1 )
	{
		if ( n_A_Weapon_ATKplus >= 8 )
		{
			overrefineMagicAttack = 3 * ( n_A_Weapon_ATKplus - 7 );
		}
	}
	else if ( n_A_WeaponLV == 2 )
	{
		if ( n_A_Weapon_ATKplus >= 7 )
		{
			overrefineMagicAttack = 5 * ( n_A_Weapon_ATKplus - 6 );
		}
	}
	else if ( n_A_WeaponLV == 3 )
	{
		if ( n_A_Weapon_ATKplus >= 6 )
		{
			overrefineMagicAttack = 8 * ( n_A_Weapon_ATKplus - 5 );
		}
	}
	else if ( n_A_WeaponLV == 4 )
	{
		if ( n_A_Weapon_ATKplus >= 5 )
		{
			overrefineMagicAttack = 14 * ( n_A_Weapon_ATKplus - 4 );
		}
	}
	
	minOverrefineMagicAttack = 0;
	if ( overrefineMagicAttack > 0 )
	{
		minOverrefineMagicAttack = 1;
	}
}

function CalcOverRefineMatk2()
{
	if ( n_A_Weapon2LV == 1 )
	{
		if ( n_A_Weapon2_ATKplus >= 8 )
		{
			overrefineMagicAttack += 3 * ( n_A_Weapon2_ATKplus - 7 );
		}
	}
	else if ( n_A_Weapon2LV == 2 )
	{
		if ( n_A_Weapon2_ATKplus >= 7 )
		{
			overrefineMagicAttack += 5 * ( n_A_Weapon2_ATKplus - 6 );
		}
	}
	else if ( n_A_Weapon2LV == 3 )
	{
		if ( n_A_Weapon2_ATKplus >= 6 )
		{
			overrefineMagicAttack += 8 * ( n_A_Weapon2_ATKplus - 5 );
		}
	}
	else if ( n_A_Weapon2LV == 4 )
	{
		if ( n_A_Weapon2_ATKplus >= 5 )
		{
			overrefineMagicAttack += 14 * ( n_A_Weapon2_ATKplus - 4 );
		}
	}
	
	if ( overrefineMagicAttack > 0 )
	{
		minOverrefineMagicAttack = 1;
	}
}

function CalcMagicDamage( rawDamage )
{ // Magic Damage (rawMDmg)	
	wBMC_MDEF = n_B[en_HARDMDEF];
	var MDEF_Musi = 0;
	
	if ( n_B[en_BOSS] == 0 && CardNumSearch(card_HEAD_HIGHWIZARD) ) //High Wizard
	{
		MDEF_Musi = 1;
	}
	
	if ( MDEF_Musi != 0 )
	{
		wBMC_MDEF = 0;
		n_B_MDEF2 = 0;
	}
	if( EquipNumSearch( 645 ) )
	{//piercing staff
		wBMC_MDEF = wBMC_MDEF - ((wBMC_MDEF /100) *10) ;
		n_B_MDEF2 = n_B_MDEF2 - ((n_B_MDEF2 /100) *10) ;
	}
	if( EquipNumSearch( 1582 ) )
	{//Loli Ruri's Cat
		if(n_A_HEAD_DEF_PLUS >= 7)
		{
			wBMC_MDEF = wBMC_MDEF - ((wBMC_MDEF /100) * (n_A_HEAD_DEF_PLUS + 5 )) ;
			n_B_MDEF2 = n_B_MDEF2 - ((n_B_MDEF2 /100) * (n_A_HEAD_DEF_PLUS + 5 )) ;		
		}
		else
		{
			wBMC_MDEF = wBMC_MDEF - ((wBMC_MDEF /100) *n_A_HEAD_DEF_PLUS) ;
			n_B_MDEF2 = n_B_MDEF2 - ((n_B_MDEF2 /100) *n_A_HEAD_DEF_PLUS) ;
		}
	}
	// Calc Damage based on MDEF of opponent
	if ( n_A_ActiveSkill == skill_WI_FIRE_PILLAR )
	{
		// fire pillar ignores some def?
		wBMC2 = Math.floor( rawDamage + 50 );
	}
	else
	{
		wBMC2 = Math.floor( rawDamage * mdefReduction( wBMC_MDEF ) - n_B_MDEF2 );
	}
	
	wBMC2 = Max( 1, wBMC2 );
	
	/*if ( n_A_ActiveSkill == skill_PR_MAGNUS_EXORCISMUS )
	{
		if ( n_B[en_RACE] != 6 && n_B[en_ELEMENT] < 90 )
		{
			wBMC2=0;
		}
	}*/
	
	wBMC2 = Math.floor( wBMC2 * element[n_B[en_ELEMENT]][n_A_Weapon_element] / 100 );

	if ( 90 <= n_B[en_ELEMENT] && n_A_ActiveSkill == skill_MA_SOUL_STRIKE )
	{
		wBMC2 = Math.floor( wBMC2 * ( 1 + 0.05 * n_A_ActiveSkillLV ) );
	}
	
	// Multiplier	
	var wX = n_tok[bon_MDMG_RC_FORMLESS + n_B[en_RACE]];
	
	if ( n_B[en_RACE] == race_DRAGON  && SkillSearch( skill_SA_DRAGONOLOGY ) )
	{
		wX += SkillSearch( skill_SA_DRAGONOLOGY ) * 2;
	}
	
	
	if (SkillSearch(skill_WAR_INTENSE_TELEKINESIS) && 
		(n_A_ActiveSkill === skill_MA_NAPALM_BEAT ||
		n_A_ActiveSkill === skill_MA_SOUL_STRIKE ||
		n_A_ActiveSkill === skill_HW_NAPALM_VULCAN ||
		n_A_ActiveSkill === skill_WAR_SOUL_EXPANSION)) {
	    wX += 40 * SkillSearch(skill_WAR_INTENSE_TELEKINESIS);
	}
	
	wBMC2 = wBMC2 * ( 100 + wX ) / 100;

	wBMC2 = tPlusDamCut( wBMC2 );

	// Skill Multipliers from equipment
	var matkMultiplier = 0;
	// matkMultiplier = StPlusCalc2( 5000 + n_A_ActiveSkill ) + StPlusCard( 5000 + n_A_ActiveSkill /*+ StPlusEnchant( 5000 + n_A_ActiveSkill /*);
	matkMultiplier = StPlusCalc2( 5000 + n_A_ActiveSkill ) + StPlusCard( 5000 + n_A_ActiveSkill );
	
	if ( n_A_ActiveSkill === skill_MA_NAPALM_BEAT ||
		 n_A_ActiveSkill === skill_MA_SOUL_STRIKE ||
		 n_A_ActiveSkill === skill_HW_NAPALM_VULCAN )
	{
		if ( n_A_JobSearch() === cls_MAG )
		{ // Banshee card gives a bonus to mages who use these skills
			matkMultiplier += 20 * CardNumSearch(card_HEAD_BANSHEE);
		}
	}
	
	if ( n_A_ActiveSkill==skill_WI_EARTH_SPIKE ||
		 n_A_ActiveSkill == skill_WI_HEAVENS_DRIVE )
	{
		if ( EquipNumSearch( 1146 ) )
		{ // Katyusha Flowers?
			matkMultiplier += n_A_HEAD_DEF_PLUS;
		}
	}
	
	if ( n_A_ActiveSkill == skill_WI_STORM_GUST )
	{
		if ( EquipNumSearch( 1169 ) )
		{ // La'cryma Stick gives bonus of 1% for each upgrade level
			matkMultiplier += n_A_Weapon_ATKplus;
		}
	}
	
	if ( n_A_ActiveSkill == skill_MIWA_METALLIC_SOUND )
	{
		if ( monsterDebuffs[status_en_DEEPSLEEP] || monsterDebuffs[status_en_SLEEP] )
		{
			// sleeping targets take 1.5x damage from Metallic Sound
			matkMultiplier += 50;
		}
	}
	if ( (n_A_JOB == cls_KAGOB) && SkillSearch( skill_KAG_SUMMON_ELEMENTAL_SEAL ) && SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL ) != 2 )
	{ // Summon Elemental Spirits damage multiplier
		if (n_A_Weapon_element == ele_NEUTRAL + SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL ))
			matkMultiplier += 10 * SkillSearch( skill_KAG_SUMMON_ELEMENTAL_SEAL );
	}
	
	if (  n_A_ActiveSkill == skill_PR_MAGNUS_EXORCISMUS  || 
		  n_A_ActiveSkill == skill_AC_HOLY_LIGHT  || 
		  n_A_ActiveSkill == skill_AC_HOLY_LIGHT_SL ||
		  n_A_ActiveSkill == skill_PR_HOLY_LIGHT_SL ||
	   	  n_A_ActiveSkill == skill_ABI_ADORAMUS ||
		  n_A_ActiveSkill == skill_ABI_JUDEX  ) 
	{
		if ( SkillSearch( skill_HP_BASILICA ) )
		{
			matkMultiplier += 3 * SkillSearch( skill_HP_BASILICA );
		}
	}
	if(EquipNumSearch(1681))
	{ //"Amistr Hat"
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_NEUTRAL || n_A_Weapon_element == ele_HOLY)
			{
				matkMultiplier += 10;
			}
		}	
	}
	if(EquipNumSearch(1759))
	{ // Diabolic Halo
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_NEUTRAL || n_A_Weapon_element == ele_HOLY)
			{
				matkMultiplier += 10;
			}
		}
		if(n_A_HEAD_DEF_PLUS >= 11) 
		{ 
			if(n_A_Weapon_element == ele_WATER || n_A_Weapon_element == ele_WIND || n_A_Weapon_element == ele_FIRE || n_A_Weapon_element == ele_EARTH)
			{
				matkMultiplier += 10;
			}
		}
	}
	
	if(CardNumSearch(558))
	{ //Lichtern Blue Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_WATER)
			{
				matkMultiplier += 5 * CardNumSearch(558);
			}
		}	
	}
	if(CardNumSearch(559))
	{ //Lichtern Yellow Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_GHOST)
			{
				matkMultiplier += 5 * CardNumSearch(559);
			}
		}	
	}
	if(CardNumSearch(560))
	{ //Lichtern Red Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_FIRE)
			{
				matkMultiplier += 5 * CardNumSearch(560);
			}
		}	
	}
	if(CardNumSearch(561))
	{ //Lichtern Green Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_EARTH)
			{
				matkMultiplier += 5 * CardNumSearch(561);
			}
		}	
	}
	if(CardNumSearch(568))
	{ //Tikbalang Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_WIND)
			{
				matkMultiplier += 5 * CardNumSearch(568);
			}
		}	
	}
	if ( EquipNumSearch( 1719 ) )
	{ // "Shadow Diviner Set"
		if((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS) >= 23)
		{
			matkMultiplier += 1;
		}
	}
	
	if(EquipNumSearch( 1759 ))
	{// Diabolic Halo
		if(EquipNumSearch( 1292 ) && n_A_ActiveSkill == skill_SOR_PSYCHIC_WAVE)
		{// Mental Stick
			matkMultiplier += Math.floor(n_A_Weapon_ATKplus / 2) * 5;
		}
		if(EquipNumSearch( 1172 ) && n_A_ActiveSkill == skill_WAR_HELL_INFERNO)
		{// Kronos
			matkMultiplier += Math.floor(n_A_Weapon_ATKplus / 2) * 10;
		}
		if(EquipNumSearch( 1452 ) && EquipNumSearch( 1453 ))
		{// Mikatsuki + Raksasa Dagger
			if(n_A_ActiveSkill == skill_NIN_FLAMING_PETALS || n_A_ActiveSkill == skill_NIN_FREEZING_SPEAR || n_A_ActiveSkill == skill_NIN_WIND_BLADE )
			matkMultiplier += Math.floor((n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 2) * 5;
		}
	}
	
	//skills
	if(SkillSearch(skill_SUM_BUNCH_OF_SHRIMP) || summonerBuffs[ksBunchOfShrimp])
	{
		matkMultiplier += 10;
	}
	if(SkillSearch(skill_SUM_POWER_OF_LAND) && SkillSearch(skill_SUM_PLANT))
	{
		matkMultiplier += 20;
	}
	
	// Apply multiplier, floor, and return value
	wBMC2 = wBMC2 * ( 100 + matkMultiplier ) / 100;
	wBMC2 = Math.floor( wBMC2 );
	return wBMC2;
}