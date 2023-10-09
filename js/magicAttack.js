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
		matk_mul = 100;
		matk_mul += n_tok[bon_MATK_MUL];
		
		if(n_A_HEAD_DEF_PLUS >= 9 && n_A_card[8]==177) // KatheryneK
			matk_mul += 2;
		if(n_A_JobSearch()==cls_MAG && CardNumSearch(card_ISET_MAGESET))
			matk_mul +=3;
		if(n_A_JobSearch2() == cls_ROG)
			matk_mul += 10 * CardNumSearch(card_BODY_BYORGUE); // Byorgue

		if(EquipNumSearch(484) && SU_INT >= 70) // SageDiary
			matk_mul += 5;
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(642)) // LBW
			matk_mul += 3;
		if(EquipNumSearch(646)) // SoDestru
			matk_mul += Math.floor(n_A_Weapon_ATKplus / 2);
		if(EquipNumSearch(737)) // ??
			matk_mul += Min(n_A_Weapon_ATKplus,10);
		if ( EquipNumSearch( 849 ) ) // Balloon Hat
			matk_mul += 2 + Math.floor(n_A_HEAD_DEF_PLUS / 2);
		if(EquipNumSearch(897) && (n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN))
			matk_mul += 15 * EquipNumSearch(897); // AssaDamaB
		if(EquipNumSearch(898) && (n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN))
			matk_mul += 15 * EquipNumSearch(898); // AssaDamaV
		if(EquipNumSearch(1029) && n_A_HEAD_DEF_PLUS >= 6) // Pagdayaw
			matk_mul += n_A_HEAD_DEF_PLUS - 5;
		if(EquipNumSearch(1042)) // GentlemanSet
			matk_mul += n_A_Weapon_ATKplus;
		if(EquipNumSearch(1083))
		{ // Glorious DestruStaff
			matk_mul += n_A_Weapon_ATKplus;
			if (n_A_Weapon_ATKplus >= 6)
				n_tok[bon_MDMG_RC_DEMI_HUMAN] += Math.min(20, 2*(n_A_Weapon_ATKplus-5));
		}
		if(n_A_card[card_loc_HEAD_UPPER] == 551 && n_A_HEAD_DEF_PLUS >=9) // Uzhas	
		{
			n_tok[bon_MDMG_RC_DEMON] += 5 ;
		}
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1084)) // GloArcWand
			matk_mul += 5;
		if(n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1095)) // GloApocalypse
			matk_mul += 5;
		if(EquipNumSearch(1173)) // StaffOfThea
			matk_mul += Math.floor(n_A_Weapon_ATKplus / 2);
		if ( EquipNumSearch( 565 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Dress Hat
			matk_mul += 1;
		}
		if ( EquipNumSearch( 872 ) )
		{ // Crown of Deceit
			if ( n_A_HEAD_DEF_PLUS >= 7 )
			{
				matk_mul += 5;
			}
			if ( n_A_HEAD_DEF_PLUS >= 9 )
			{
				matk_mul += 5;
			}
		}
		if ( EquipNumSearch( 1214 ) )
		{ // Red Wing Hat
			if ( n_A_HEAD_DEF_PLUS >= 7 )
			{
				matk_mul += 2;
			}
			if ( n_A_HEAD_DEF_PLUS >= 9 )
			{
				matk_mul += 2;
			}
		}
		if ( EquipNumSearch( 1149 ) )
		{ // Skull Cap
			if ( n_A_HEAD_DEF_PLUS >= 5 )
			{
				matk_mul += 3;
			}
			if ( n_A_HEAD_DEF_PLUS >= 7 )
			{
				matk_mul += 3;
			}
		}
		if ( EquipNumSearch( 1338 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Cancer Diadem
			matk_mul += 2;
		}
		if ( EquipNumSearch( 1340 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Gemini Diadem
			matk_mul += 8;
		}
		if ( EquipNumSearch( 1343 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Pisces Diadem
			matk_mul += 2;
		}
		if ( EquipNumSearch( 1344 ) && n_A_HEAD_DEF_PLUS >= 10 )
		{ // Sagittarius Diadem
			matk_mul += 4;
		}
		if ( EquipNumSearch( 1348 ) && n_A_HEAD_DEF_PLUS >= 10 )
		{ // Aries Crown
			matk_mul += 2;
		}
		if ( EquipNumSearch( 1353 ) && n_A_HEAD_DEF_PLUS >= 9 )
		{ // Pisces Crown
			matk_mul += 2;
		}
		if ( EquipNumSearch( 1352 ) && n_A_HEAD_DEF_PLUS >= 7 )
		{ // Libra Crown
			matk_mul += 3;
			if ( EquipNumSearch( 1352 ) && n_A_HEAD_DEF_PLUS >= 9 )
			{ // Libra Crown
				matk_mul += 5;
			}
		}
		if(EquipNumSearch(1401))
		{ // Ancient Gold Ornament
			if(n_A_JobSearch()==cls_ACO || n_A_JobSearch()==cls_MAG)
				matk_mul += 8;
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
			matk_mul += n_A_LEFT_DEF_PLUS;
		}
		if( EquipNumSearch(1522) ) 
		{ // Chibi Pope
			if (n_A_HEAD_DEF_PLUS >= 9) { w += 7; }
			if (n_A_HEAD_DEF_PLUS >= 12) { w += 5; }
		}
		if ( (EquipNumSearch( 1637 ) ) )
		{// "Thanatos' Dolor Hat"
			if(n_A_HEAD_DEF_PLUS > 6)
			{
				matk_mul += 5;
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
				matk_mul += 5;
			}
		}
		if ( EquipNumSearch( 1795 ) )
		{//INT Glove
			if(SU_INT >= 110)
				matk_mul += 1 * EquipNumSearch( 1795 );
		}
		if(EquipNumSearch(1883))
		{ //"Magic Foxtrail Staff"
			matk_mul += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
		}
		if(EquipNumSearch(1884))
		{ //"Magic Yellow Foxtrail Staff"
			matk_mul += 3 * Math.floor(n_A_Weapon_ATKplus / 2);
		}
		if(EquipNumSearch(1877))
		{ //"Wondrous Foxtail Staff"
			matk_mul += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
		}
		// if ( EquipNumSearch( 2040 ) )
		// {//Armor of Sixtus the Wise
				// matk_mul += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
		// }
		if(EquipNumSearch(2079) && n_A_Weapon_ATKplus >= 7)
		{//Crimson Rose
			matk_mul += 5;
		}
		if(EquipNumSearch(2119))
		{//Evil Slayer Vanquisher Staff
			if(n_A_Weapon_ATKplus >= 7)
				matk_mul += 5;
			if(n_A_Weapon_ATKplus >= 9)
				matk_mul += 7;
		}
		// if(EquipNumSearch(2145))
		// {// "Chronocloak of Intellect"
			// matk_mul += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
			// if(n_A_SHOULDER_DEF_PLUS >= 7)
				// matk_mul += 7;
		// }
		if(EquipNumSearch(2161))
		{// "Sunflower Boy"
			matk_mul += Math.floor(n_A_Weapon_ATKplus / 2);
		}
		if(EquipNumSearch(2209))
		{// Flattery Robe + Survivor's Manteau
			matk_mul += n_A_BODY_DEF_PLUS;
		}
		if(EquipNumSearch(2222) || // Old Magic Stone Hat [1]
		   EquipNumSearch(2224) )  // Old Wind Whisper [1]
		{
			matk_mul += n_A_HEAD_DEF_PLUS;
		}
		if(EquipNumSearch(2230))
		{// Agenda Robe [1]
			if(n_A_BaseLV >= 120)
			{
				matk_mul += 4;
			}
			if(n_A_BaseLV >= 140)
			{
				matk_mul += 5;
			}
		}
		if(EquipNumSearch(2410))
		{//Korean Judge Hat
			if(n_A_JobSearch() == cls_MAG || n_A_JobSearch() == cls_ACO || n_A_JobSearch2() == cls_NIN || n_A_JOB == cls_SL )
				matk_mul += Math.floor(n_A_HEAD_DEF_PLUS / 2);
		}
		
		if(n_A_Equip[eq_ACCI] == 2449)
	{//Demon God's Ring
		if(n_A_card[card_loc_ACCI] == 647 || n_A_card[card_loc_ACCI] == 648 || n_A_card[card_loc_ACCI] == 649)
		{
			matk_mul += 5;
		}
	}
	if(n_A_Equip[eq_ACCII] == 2449)
	{//Demon God's Ring
		if(n_A_card[card_loc_ACCII] == 647 || n_A_card[card_loc_ACCII] == 648 || n_A_card[card_loc_ACCII] == 649)
		{
			matk_mul += 5;
		}
	}
		
//Shadows
		if ( EquipNumSearch( 1656 ) )
		{ // "Shadow Mystic Gloves"
			if (n_A_SHADOW_WEAPON_DEF_PLUS >= 7) { matk_mul += 1; }
			if (n_A_SHADOW_WEAPON_DEF_PLUS >= 9) { matk_mul += 1; }
		}
		if ( EquipNumSearch( 1657 ) )
		{ // "Shadow Mystic Ring"
			if (n_A_SHADOW_EARRING_DEF_PLUS >= 7) { matk_mul += 1; }
		}
		if ( EquipNumSearch( 1658 ) )
		{ // "Shadow Mystic Pendant"
			if (n_A_SHADOW_PENDANT_DEF_PLUS >= 7) { matk_mul += 1; }
		}
		if ( EquipNumSearch( 1662 ) )
		{ // "Shadow Strongman Pendant"
			if (n_A_SHADOW_PENDANT_DEF_PLUS >= 7) { matk_mul += 1; }
		}
		if ( EquipNumSearch( 1659 ) )
		{ // "Shadow Mystic Set"
			if ((n_A_SHADOW_PENDANT_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_WEAPON_DEF_PLUS)>= 20) { matk_mul += 1; }
			if ((n_A_SHADOW_PENDANT_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_WEAPON_DEF_PLUS)>= 25) { matk_mul += 1; }
		}
		if ( EquipNumSearch(1823) || EquipNumSearch(1824))
		{ // Shadow Taekwon  Shield or Shadow Super Novice Shield
			if(n_A_SHADOW_SHIELD_DEF_PLUS >=7){matk_mul += 2;}
			if(n_A_SHADOW_SHIELD_DEF_PLUS >=9){matk_mul += 3;}
		}
		if ( EquipNumSearch(1839) )
		{ // Shadow Ninja Gloves
			if(n_A_SHADOW_WEAPON_DEF_PLUS >=7){matk_mul += 3;}
			if(n_A_SHADOW_WEAPON_DEF_PLUS >=9){matk_mul += 4;}
		}
		if ( EquipNumSearch(1840) )
		{ // Shadow Taekwon Gloves
			matk_mul += n_A_SHADOW_WEAPON_DEF_PLUS;
		}
		if ( EquipNumSearch(1996) )
		{ // Shadow Doram Mage Gloves
			if(n_A_SHADOW_WEAPON_DEF_PLUS >=7){matk_mul += 5;}
			if(n_A_SHADOW_WEAPON_DEF_PLUS >=9){matk_mul += 5;}
		}
		
//Enchant
		if(EnchNumSearch( 284 ))//Special INT = 284
		{
			if(n_A_SHOULDER_DEF_PLUS >8)
			{
				matk_mul += 1;
			}
		}
		if(EnchNumSearch( 285 ))//Special DEX = 285
		{
			if(n_A_SHOULDER_DEF_PLUS >8)
			{
				matk_mul += 1;
			}
		}
		if(EnchNumSearch( 5160 ))
		{//Rune of Intellect 1
			if(n_A_BODY_DEF_PLUS >= 10)
				matk_mul += 5;
		}
		if(EnchNumSearch( 5161 ))
		{//Rune of Intellect 2
			if(n_A_BODY_DEF_PLUS >= 11)
				matk_mul += 7;
		}
		if(EnchNumSearch( 5162 ))
		{//Rune of Intellect 3
			if(n_A_BODY_DEF_PLUS >= 12)
				matk_mul += 8;
			if(n_A_BODY_DEF_PLUS >= 13)
				matk_mul += 2;
		}
		
//Cards
		if(CardNumSearch(582))
		{//Professor Card
			if(SU_DEX >= 110)
			matk_mul += 7;
		}
		
		if(CardNumSearch(741) && (n_A_JOB == cls_SOR || n_A_JOB == cls_SORt))
		{//Sorcerer Celia Card
			matk_mul += 10;
		}
		if((CardNumSearch(745) && (n_A_JOB == cls_SHA || n_A_JOB == cls_SHAt)) ||
		   (CardNumSearch(747) && (n_A_JOB == cls_WAR || n_A_JOB == cls_WARt)) )
		{//Shadow Chaser Gertie Card
			matk_mul += 15;
		}
		if(CardNumSearch(826) && EquipNumSearch(2393))
		{//Sweet Nightmare Card + Vampire's Familiar [1]
			matk_mul += Math.floor(n_A_BODY_DEF_PLUS / 3);
		}
	
//items
		if ( usableItems[ksArchmagePotion] )
		{
			matk_mul += 1;
		}
		if(otherBuffs[ksMurderBonus])
			matk_mul += 10;

		n_A_StatMATK = (n_A_StatMATK * matk_mul / 100);
		n_A_MATK_Variance = (n_A_MATK_Variance * matk_mul / 100);
		n_A_EquipMATK = (n_A_EquipMATK * matk_mul / 100);
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
		n_A_EquipMATK+= Math.floor(SU_INT / 10) * EquipNumSearch( 1795 );
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
	if( EquipNumSearch( 1759 ) )
	{ // Diabolic Halo
		n_A_EquipMATK += Math.floor(n_A_HEAD_DEF_PLUS / 2) * 15;
	}
	if(EquipNumSearch(2200) || EquipNumSearch(1955))  //Int Boots
	{
		n_A_EquipMATK += Math.floor(n_A_SHOES_DEF_PLUS / 3) * 10;
		if(SU_INT >= 120)
			n_A_EquipMATK += 60;
	}
	if(EquipNumSearch(1949))  //Int Boots Slot
	{
		n_A_EquipMATK += Math.floor(n_A_SHOES_DEF_PLUS / 3) * 5;
		if(SU_INT >= 120)
			n_A_EquipMATK += 30;
	}
	if( EquipNumSearch(2053) || //Blade of Light
		EquipNumSearch(2055) || //Tide Conch
		EquipNumSearch(2056) || //Thorn Whip
		EquipNumSearch(2059) || //Magic Sword
		EquipNumSearch(2063) || //Rusty Dragon's Wand
		EquipNumSearch(2064) || //Wand of the Purple Orb
		EquipNumSearch(2065) || //Shadow Eater
		EquipNumSearch(2066) || //Ice Guardian
		EquipNumSearch(2071) || //All-Holy Book
		EquipNumSearch(2080) || //Master of Souls
		EquipNumSearch(2083) ) //Meowmeow Foxtail
	{
		n_A_EquipMATK += 10 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if ( EquipNumSearch( 2086 ) )
	{//Revised Encyclopedia
		if(n_A_LEFT_DEF_PLUS >= 9)
			n_A_EquipMATK += 5;
	}
	// if(EquipNumSearch(2145))
	// {// "Chronocloak of Intellect"
		// n_A_EquipMATK += 10 * Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	// }
	if(EquipNumSearch(2162) || // Vicious Mind Staff
	   EquipNumSearch(2163) || // Vicious Mind Rod
	   EquipNumSearch(2168) || // Vicious Mind Book
	   EquipNumSearch(2180) || // Crimson Staff
	   EquipNumSearch(2181) ) // Crimson Rod
	{
		if(n_A_Weapon_ATKplus <= 15)
		{
			n_A_EquipMATK += n_A_Weapon_ATKplus * n_A_Weapon_ATKplus;
		}
		else
		{
			n_A_EquipMATK += 15 * 15;
		}
	}
	if(EquipNumSearch(2164) || // Vicious Mind Wire
	   EquipNumSearch(2165) || // Vicious Mind Violin
	   EquipNumSearch(2170) || // Vicious Mind Huuma Shuriken
	   EquipNumSearch(2174) || // Vicious Mind Dagger
	   EquipNumSearch(2176) || // Vicious Mind Two-Handed Sword
	   EquipNumSearch(2186) || // Crimson Bible
	   EquipNumSearch(2188) || // Crimson Huuma Shuriken
	   EquipNumSearch(2192) || // Crimson Dagger
	   EquipNumSearch(2194) )  // Crimson Two-Handed Sword
	{
		if(n_A_Weapon_ATKplus <= 15)
		{
			n_A_EquipMATK += (n_A_Weapon_ATKplus * n_A_Weapon_ATKplus) / 2;
		}
		else
		{
			n_A_EquipMATK += (15 * 15) / 2;
		}
	}
	if(EquipNumSearch(2180) || // Crimson Staff
	   EquipNumSearch(2181) ) // Crimson Rod
	{
		if(n_A_BaseLV >= 70)
		{
			n_A_EquipMATK += Math.floor((n_A_BaseLV - 70)/10) * 5;
		}
	}
	if(EquipNumSearch(2207))
	{// Flattery Robe
		if(n_A_BaseLV >= 120)
			n_A_EquipMATK += 50;
		if(n_A_BaseLV >= 140)
			n_A_EquipMATK += 50;
	}
	if(EquipNumSearch(2216))  // Old Mitra [1]
	{
		n_A_EquipMATK += n_A_HEAD_DEF_PLUS * 2;
	}
	if(EquipNumSearch(2219))  // Old Shadow Handicraft [1]
	{
		n_A_EquipMATK += n_A_HEAD_DEF_PLUS * 4;
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		n_A_EquipMATK += 3 * n_A_SHOULDER_DEF_PLUS;
		if(SU_INT >= 90)
			n_A_EquipMATK += 20;
	}
	if(n_A_Equip[eq_WEAPON] == 2246)
	{// Sealed Magic Sword [2]
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_A_EquipMATK += 85;
		}
		if(n_A_Weapon_ATKplus >= 10)
		{
			n_A_EquipMATK += 45;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2246)
	{// Sealed Magic Sword [2]
		if(n_A_Weapon2_ATKplus >= 7)
		{
			n_A_EquipMATK += 85;
		}
		if(n_A_Weapon2_ATKplus >= 10)
		{
			n_A_EquipMATK += 45;
		}
	}

	if(EquipNumSearch(2388))
	{ // Illusion Ancient Cape + Illusion Moonlight Dagger
		if(n_A_JOB == cls_SHA || n_A_JOB == cls_SHAt )
		{ 
			n_A_EquipMATK += 80;
			if(n_A_SHOULDER_DEF_PLUS >= 7 && n_A_Weapon_ATKplus >= 7)
				n_A_EquipMATK += 80;
			if((n_A_SHOULDER_DEF_PLUS + n_A_Weapon_ATKplus) >= 18)
				n_A_EquipMATK += 40;
		}
	}
	if(EquipNumSearch(2400))
	{//Illusion Survivor's Manteau + Survivor's Rod
		if(n_A_Weapon_ATKplus <= 10)
		{
			n_A_EquipMATK += 20 * n_A_Weapon_ATKplus;
		}
		else
			n_A_EquipMATK += 200;
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
	 EquipNumSearch( 1842 ) || // "Shadow Gunslinger Gloves"
	 EquipNumSearch( 1995 ) || // "Shadow Doram Battler Gloves"
	 EquipNumSearch( 1996 ) )  // "Shadow Doram Mage Gloves"
	{ // 
		n_A_EquipMATK += n_A_SHADOW_WEAPON_DEF_PLUS; 
	}
	if ( EquipNumSearch(1839) )
	{ // Shadow Ninja Gloves
		if(n_A_SHADOW_SHIELD_DEF_PLUS >=9){n_A_EquipMATK += SkillSearch(skill_NIN_NINJA_MASTERY) * 3;}
	}
	if( EquipNumSearch(2255) || // Wyrmeater's Shadow Gloves
		EquipNumSearch(2256) || // Tiger Spirit Shadow Gloves
		EquipNumSearch(2257) || // Katra's Shadow Gloves
		EquipNumSearch(2258) || // Exorcist Shadow Gloves
		EquipNumSearch(2259) || // Rondius' Shadow Gloves
		EquipNumSearch(2260) || // Gunther's Shadow Gloves
		EquipNumSearch(2261) || // Talos' Shadow Gloves
		EquipNumSearch(2262) || // Sylphir's Shadow Gloves
		EquipNumSearch(2263) || // Dordaleon's Shadow Gloves
		EquipNumSearch(2264) || // Osma's Shadow Gloves
		EquipNumSearch(2265) || // Garmia's Shadow Gloves
		EquipNumSearch(2266) )  // Boscard's Shadow Gloves
	{
		n_A_EquipMATK += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
//Cards
	if(CardNumSearch(555))
	{//Antique Book Card
		n_A_EquipMATK += 5 * Math.floor(SU_INT / 10);
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
	if(CardNumSearch(589))
	{//Big Eggring Card
		if(SU_INT <=50)
		{
			n_A_EquipMATK -= 5 * Math.floor(SU_INT/10);
		}
		else
		{
			n_A_EquipMATK -= 25;
		}
	}
	if(CardNumSearch(623) && (n_A_JOB == cls_BAR || n_A_JOB == cls_DAN || n_A_JOB == cls_CLO || n_A_JOB == cls_GYP ||
							  n_A_JOB == cls_MIN || n_A_JOB == cls_MINt || n_A_JOB == cls_WAN || n_A_JOB == cls_WANt ))
	{//Grand Pere Card 
			n_A_EquipMATK += 15 * n_A_BODY_DEF_PLUS;
	}
	if(CardNumSearch( 637 ))
	{ // Payon Soldier Card
		if(n_A_WeaponType == weapTyp_2HSPEAR || n_A_WeaponType == weapTyp_SPEAR)
		{
			if(n_A_Weapon_ATKplus >= 10)
				n_A_EquipMATK += 20;
			if(n_A_Weapon_ATKplus >= 14)
				n_A_EquipMATK += 20;
		}
			
	}
	if(n_A_card[8]==669)
	{ // Fenrir Card
		n_A_EquipMATK += 5 * n_A_HEAD_DEF_PLUS;
	}
	for(var i = 0;i<8;i++)
	{
		if(n_A_card[card_loc_WEAPON_I+i] == 775)
		{//Cowraiders Class 3 Card
			if(i<4)
			{
				if(n_A_WeaponType == weapTyp_DAGGER)
				{
					if(n_A_Weapon_ATKplus >= 10)
						n_A_EquipMATK += 20;
					if(n_A_Weapon_ATKplus >= 14)
						n_A_EquipMATK += 20;
				}
			}
			else
			{
				if(n_A_Weapon2Type == weapTyp_DAGGER)
				{
					if(n_A_Weapon2_ATKplus >= 10)
						n_A_EquipMATK += 20;
					if(n_A_Weapon2_ATKplus >= 14)
						n_A_EquipMATK += 20;
				}
			}
		}
	}
	if(CardNumSearch(812) && EquipNumSearch(121))
	{//Resentful Munak Card + Girl's Diary
		n_A_EquipMATK += 100;
	}
	if(CardNumSearch(829) && EquipNumSearch(2393))
	{//Bomi Card + Vampire's Familiar [1]
		n_A_EquipMATK += 30;
	}

//Enchants
	if(EnchNumSearch( 5244 ))
		{//Modification Orb (MATK)
			if(n_A_BODY_DEF_PLUS >= 7)
				n_A_EquipMATK += 25 * EnchNumSearch( 5244 );
			if(n_A_BODY_DEF_PLUS >= 9)
				n_A_EquipMATK += 25 * EnchNumSearch( 5244 );
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
	if ( SkillSearch( skill_ROY_SHIELD_SPELL ) === 3 && PATCH == 2)
	{ // Shield Spell
		n_A_EquipMATK += 150;
	}
	//TODO
	//Add Shadow Spell to the passiv skill for SC
	// if ( SkillSearch( skill_SHA_AUTO_SHADOW_SPELL ) )
	// {
		// n_A_EquipMATK += 5 * SkillSearch( skill_SHA_AUTO_SHADOW_SPELL );
	// }
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

// Magic Damage (rawMDmg)
function CalcMagicDamage( rawDamage )
{ 	
	wBMC_MDEF = n_B[en_HARDMDEF];
	var MDEF_Musi = 0;
	var Ign_MDEF = 0;
	
	if ( n_B[en_BOSS] == 0 && CardNumSearch(card_HEAD_HIGHWIZARD) ) //High Wizard
	{
		MDEF_Musi = 1;
	}
	
	if ( MDEF_Musi != 0 )
	{
		wBMC_MDEF = 0;
		n_B_MDEF2 = 0;
	}

	
	//Calc MDEF after bypass MDEF
	wBMC_MDEF = wBMC_MDEF - ((wBMC_MDEF /100) * Ign_MDEF) ;
	if(wBMC_MDEF < 0)
		wBMC_MDEF = 0;
	n_B_MDEF2 = n_B_MDEF2 - ((n_B_MDEF2 /100) * Ign_MDEF) ;
	if(n_B_MDEF2 < 0)
		n_B_MDEF2 = 0;
	// Calc Damage based on MDEF of opponent
	if ( n_A_ActiveSkill == skill_WI_FIRE_PILLAR )
	{
		// fire pillar ignores some def?
		wBMC2 = Math.floor( rawDamage + 50 );
	}
	else
	{
		for(var i = 0 ; i < 3 ; i++)
		{
			if ( n_tok[bon_MDEFIGN_SIZ_SMALL + i] > 0 &&  n_B[en_SIZE]==(siz_SMALL + i))
			{
				wBMC_MDEF = wBMC_MDEF - (wBMC_MDEF * (n_tok[bon_MDEFIGN_SIZ_SMALL + i] / 100) );
			}
		}
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
	
// Multiplier (race)
	var wX = n_tok[bon_MDMG_RC_FORMLESS + n_B[en_RACE]];
	
	if ( n_B[en_RACE] == race_DRAGON  && SkillSearch( skill_SA_DRAGONOLOGY ) )
	{
		wX += SkillSearch( skill_SA_DRAGONOLOGY ) * 2;
	}
	if ( n_B[en_RACE] == race_UNDEAD  && EquipNumSearch(2066) && n_A_Weapon_ATKplus >= 9)
	{//Ice Guardian
		wX += 10;
	}
	if ( EquipNumSearch( 2040 ) )
	{//Armor of Sixtus the Wise
		if(n_A_BODY_DEF_PLUS >= 9)
		{
			if(n_B[en_RACE] == race_BRUTE || n_B[en_RACE] == race_DEMON )
			{
				wX += 10;
			}
			
		}
	}
	if( EquipNumSearch( 2362 ) )
	{ //Celine's Brooch + Celine's Ribbon
		if(n_A_HEAD_DEF_PLUS >= 11)
		{
			if(n_B[en_BOSS] == 1 )
			{
				wX += 20;
			}
			
		}
	}
	if(n_B[en_BOSS] == 1 )
	{
		wX += n_tok[bon_DMG_BOSS];
	}
	else
	{
		wX += n_tok[bon_MDMG_NON_BOSS];
	}
	
//Cards
	if ( n_B[en_RACE] == race_BRUTE  && CardNumSearch(706) && n_A_HEAD_DEF_PLUS >= 9)
	{//Jaguar Card
		wX += 10;
	}
	if ( n_B[en_RACE] == race_INSECT  && CardNumSearch(707) && n_A_HEAD_DEF_PLUS >= 9)
	{//Toucan Card
		wX += 5;
	}
	
	if (SkillSearch(skill_WAR_INTENSE_TELEKINESIS) && 
		(n_A_ActiveSkill === skill_MA_NAPALM_BEAT ||
		n_A_ActiveSkill === skill_MA_SOUL_STRIKE ||
		n_A_ActiveSkill === skill_HW_NAPALM_VULCAN ||
		n_A_ActiveSkill === skill_WAR_SOUL_EXPANSION)) {
	    wX += 40 * SkillSearch(skill_WAR_INTENSE_TELEKINESIS);
	}
	
	wBMC2 = wBMC2 * ( 100 + wX ) / 100;
	
//Multiplier (size)
	wX = n_tok[bon_MDMG_SIZ_SMALL + Math.floor(n_B[en_SIZE])];
	 // StPlusEnchant(i)
	wX += wBMC2 = wBMC2 * ( 100 + wX ) / 100;
	
//Multiplier (element)
	wX = n_tok[bon_MDMG_ELE_NEUTRAL + Math.floor(n_B[en_ELEMENT]/10)];
	wX += n_tok[bon_MDMG_ELE_ALL];
	// console.log("n_B[en_ELEMENT] = " + n_B[en_ELEMENT]);
	// console.log("n_tok[bon_MDMG_ELE_NEUTRAL + n_B[en_ELEMENT]] = " + n_tok[bon_MDMG_ELE_NEUTRAL + n_B[en_ELEMENT]]);
	// console.log("n_tok[bon_MDMG_ELE_WIND] = " + n_tok[bon_MDMG_ELE_WIND]);
	if(CardNumSearch(620) && Math.floor(n_B[en_ELEMENT]/10) == ele_EARTH )
	{
		if(n_A_SHOULDER_DEF_PLUS >= 7)
		{
			wX += 5;
		}
		if(n_A_SHOULDER_DEF_PLUS >= 9)
		{
			wX += 7;
		}
	}
	if(EquipNumSearch(2064) && Math.floor(n_B[en_ELEMENT]/10) == ele_FIRE && n_A_Weapon_ATKplus >= 11)
	{//Wand of the Purple Orb
		wX += 7;
	}
	
	if(EquipNumSearch(1681))
	{ //"Amistr Hat"
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_NEUTRAL || n_A_Weapon_element == ele_HOLY)
			{
				wX += 10;
			}
		}	
	}
	if(EquipNumSearch(1759))
	{ // Diabolic Halo
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_NEUTRAL || n_A_Weapon_element == ele_DARK)
			{
				wX += 10;
			}
		}
		if(n_A_HEAD_DEF_PLUS >= 11) 
		{ 
			if(n_A_Weapon_element == ele_WATER || n_A_Weapon_element == ele_WIND || n_A_Weapon_element == ele_FIRE || n_A_Weapon_element == ele_EARTH)
			{
				wX += 10;
			}
		}
	}
	if(EquipNumSearch(2053))
	{ // Blade of Light
		if(n_A_HEAD_DEF_PLUS >= 11) 
		{ 
			if(n_A_Weapon_element == ele_HOLY)
			{
				wX += 15;
			}
		}
	}
	if(EquipNumSearch(2055) || EquipNumSearch(2056))
	{ // Tide Conch || Thorn Whip
		if(n_A_Weapon_element == ele_NEUTRAL)
		{
			wX += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
		}
	}
	if(EquipNumSearch(2059))
	{ //Magic Sword
		wX += 10;
	}
	if(EquipNumSearch(2064) && n_A_Weapon_ATKplus >= 9)
	{ // Wand of the Purple Orb
		if(n_A_Weapon_element == ele_WATER)
		{
			wX += 7;
		}
	}
	if(EquipNumSearch(2066) && n_A_Weapon_ATKplus >= 11)
	{ // Ice Guardian
		if(n_A_Weapon_element == ele_WATER)
		{
			wX += 10;
		}
	}
	if(EquipNumSearch(2072))
	{ // Mace of the Righteous
		if(n_A_Weapon_element == ele_HOLY)
		{
			wX += Math.floor(n_A_Weapon_ATKplus / 2);
			if(n_A_Weapon_ATKplus >= 11)
				wX += 10;
		}
	}
	if ( EquipNumSearch( 2040 ) )
	{//Armor of Sixtus the Wise
		if(n_A_BODY_DEF_PLUS >= 11)
		{
			for(var i = 1; i <= 4 ; i++)
			{
				if(n_B[en_ELEMENT] == ((ele_WIND * 10) + i)  || n_B[en_ELEMENT] ==  ((ele_EARTH * 10) + i))
				{
					wX += 10;
				}
			}
			
		}
	}
	if(EquipNumSearch(2388))
	{ // Illusion Ancient Cape + Illusion Moonlight Dagger
		if(n_A_JOB == cls_SHA || n_A_JOB == cls_SHAt )
		{
			if((n_A_SHOULDER_DEF_PLUS + n_A_Weapon_ATKplus) >= 18)
			{
				if(n_A_Weapon_element == ele_FIRE)
				{
					wX += 15;
				}
			}
		}
		
	}
	
//Cards
	if ( Math.floor(n_B[en_ELEMENT]/10) == ele_WATER  && CardNumSearch(708))
	{//Curupira Card
		if(n_A_Weapon_ATKplus >= 7)
			wX += 5 * CardNumSearch(708);
		if(n_A_Weapon_ATKplus >= 9)
			wX += 7 * CardNumSearch(708);
	}
	if(CardNumSearch(558))
	{ //Lichtern Blue Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_WATER)
			{
				wX += 5 * CardNumSearch(558);
			}
		}	
	}
	if(CardNumSearch(559))
	{ //Lichtern Yellow Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_GHOST)
			{
				wX += 5 * CardNumSearch(559);
			}
		}	
	}
	if(CardNumSearch(560))
	{ //Lichtern Red Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_FIRE)
			{
				wX += 5 * CardNumSearch(560);
			}
		}	
	}
	if(CardNumSearch(561))
	{ //Lichtern Green Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_EARTH)
			{
				wX += 5 * CardNumSearch(561);
			}
		}	
	}
	if(CardNumSearch(568))
	{ //Tikbalang Card
		if(n_A_HEAD_DEF_PLUS >= 9) 
		{ 
			if(n_A_Weapon_element == ele_WIND)
			{
				wX += 5 * CardNumSearch(568);
			}
		}	
	}
	if ( CardNumSearch( 633 ))
	{ // Faceworm Larva
		if(n_A_Weapon_element == ele_WATER)
		{
			wX += 3 * n_A_SHOULDER_DEF_PLUS;
		}
	}
	// if(EquipNumSearch(2145))
	// {// "Chronocloak of Intellect"
		// wX += 3 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4);
	// }
//Shadows
	if( (EquipNumSearch(2258) || EquipNumSearch(2260)) && n_A_Weapon_element == ele_HOLY)
	{// Exorcist Shadow Gloves || Gunther's Shadow Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7)
		{
			wX += 3; 
		}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9)
		{
			wX += 4; 
		}
	}
	if( EquipNumSearch(2262) && n_A_Weapon_element == ele_WIND)
	{// Sylphir's Shadow Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7)
		{
			wX += 3; 
		}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9)
		{
			wX += 4; 
		}
	}
	if( EquipNumSearch(2264) && n_A_Weapon_element == ele_EARTH)
	{// Osma's Shadow Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7)
		{
			wX += 3; 
		}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9)
		{
			wX += 4; 
		}
	}
	if( EquipNumSearch(2275) && (n_A_Weapon_element == ele_WATER || n_A_Weapon_element == ele_NEUTRAL || n_A_Weapon_element == ele_FIRE))
	{// Dordaleon's Shadow Ring
		wX += 2 * Math.floor(n_A_SHADOW_EARRING_DEF_PLUS/3); 
	}
	wBMC2 = wBMC2 * ( 100 + wX ) / 100;
//skill (element)
	wX = n_tok[bon_MDMG_ELE_NEUTRAL + n_A_Weapon_element];
	wX += n_tok[bon_INC_MAGIC_ALL];
	if((SkillSearch( skill_SA_ENDOW_BLAZE ) && n_A_Weapon_element == ele_FIRE) || 
	(SkillSearch( skill_SA_ENDOW_TSUNAMI ) && n_A_Weapon_element == ele_WATER) ||
	(SkillSearch( skill_SA_ENDOW_TORNADO ) && n_A_Weapon_element == ele_WIND) ||
	(SkillSearch( skill_SA_ENDOW_QUAKE ) && n_A_Weapon_element == ele_EARTH) )
		wX += 5;
	
	wBMC2 = wBMC2 * ( 100 + wX ) / 100;

	wBMC2 = tPlusDamCut( wBMC2 );

	// Skill Multipliers from equipment
	var matkMultiplier = 0;
	// matkMultiplier = StPlusCalc2( 5000 + n_A_ActiveSkill ) + StPlusCard( 5000 + n_A_ActiveSkill /*+ StPlusEnchant( 5000 + n_A_ActiveSkill /*);
	// matkMultiplier = StPlusCalc2( 5000 + n_A_ActiveSkill ) + StPlusCard( 5000 + n_A_ActiveSkill );
	
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
	if(EquipNumSearch(2080) && n_A_Weapon_ATKplus >= 7)
	{////Master of Souls
		matkMultiplier += 5;
	}
	if(EquipNumSearch(2083))
	{//Meowmeow Foxtail
		matkMultiplier += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if ( EquipNumSearch( 1719 ) )
	{ // "Shadow Diviner Set"
		if((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS) >= 23)
		{
			matkMultiplier += 1;
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
	
	//test
	wBMC2 = ApplySkillModifiers( wBMC2 );
	wBMC2 = Math.floor( wBMC2 );
	return wBMC2;
}