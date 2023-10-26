function calcMAtk( includeMultipliers )
{
	let StatMATK = CalcStatMatk();
	let BaseWeaponDamage = getBaseWeaponMATK();
	let WeaponMATK = 0;
	let overRefineMagicAttack = CalcOverRefineMatk();
	let minOverRefineMagicAttack = 0;
	let UpgradeMATK = CalcUpgradeMatk();
	let extraMATK = 0;
	
	// equipMATK = calcExtraMATK();
	extraMATK = calcExtraMATK();
	
	if(overRefineMagicAttack > 0)
		minOverRefineMagicAttack = 1;
	// Calculate variance based on weapon MATK
	n_A_MATK_Variance = calcVarianceMATK();
	
	// Do the math!
	
	StatMATK = Math.floor(StatMATK);
	//WeaponMATK = BaseWeaponDamage + Variance + RefinementBonus
	WeaponMATK = BaseWeaponDamage + UpgradeMATK;
	// CalcOverRefineMatk();
	n_A_MATK_Variance = Math.floor( n_A_MATK_Variance );
	extraMATK = Math.floor(extraMATK);
	
	n_A_MATK = [0,0,0];
	
	StatMATK *= ( 100 + (5 * SkillSearch(skill_HW_MYSTICAL_AMPLIFICATION) ) ) / 100;
	WeaponMATK *= ( 100 + (5 * SkillSearch(skill_HW_MYSTICAL_AMPLIFICATION) ) ) / 100;
	if ( SkillSearch( skill_WAR_RECOGNIZED_SPELL ) )
	{ // always max damage
		n_A_MATK[0] = StatMATK + WeaponMATK + extraMATK + n_A_MATK_Variance + minOverRefineMagicAttack;
		n_A_MATK[2] = StatMATK + WeaponMATK + extraMATK + n_A_MATK_Variance + overRefineMagicAttack;
	}
	else
	{
		n_A_MATK[0] = StatMATK + WeaponMATK + extraMATK - n_A_MATK_Variance + minOverRefineMagicAttack;
		n_A_MATK[2] = StatMATK + WeaponMATK + extraMATK + n_A_MATK_Variance + overRefineMagicAttack;
	}
	
	n_A_MATK[1] = Math.floor( ( n_A_MATK[0] + n_A_MATK[2] ) / 2 );
	
	BK_n_A_MATK = [0,0,0];
	
	// console.log("mysticalAmplification " + mysticalAmplification);
	
	for(let i = 0 ; i <= 2 ; i++)
	{
		BK_n_A_MATK[i] = n_A_MATK[i];
	}
	
}

function CalcMATKMultipliers(MATK)
{
	let StatMATK = CalcStatMatk();
	let BaseWeaponDamage = getBaseWeaponMATK();
	let UpgradeMATK = CalcUpgradeMatk();
	let WeaponMATK = BaseWeaponDamage + UpgradeMATK;
	let damage = MATK;
	let mysticalAmplification = 0;
	
	mysticalAmplification += StatMATK *((5 * SkillSearch(skill_HW_MYSTICAL_AMPLIFICATION))/100);
	mysticalAmplification += WeaponMATK *((5 * SkillSearch(skill_HW_MYSTICAL_AMPLIFICATION))/100);
	//https://irowiki.org/wiki/MATK
	//RaceMultiplier, SizeMultiplier, TargetPropertyMultiplier, MonsterMultiplier, MATKMultiplier, SkillPropertyMultiplier, and BossMATKMultiplier are applied to this in that particular order.
	
	//RaceMultiplier
	damage *= ( 100 + magicRaceMultiplier() ) / 100;

	//SizeMultiplier
	damage *= ( 100 + magicSizMultiplier() ) / 100;
	
	//TargetPropertyMultiplier
	damage *= ( 100 + magicElementMultiplier() ) / 100;

	//MonsterMultiplier
	//TODO

	//MATKMultiplier
	damage *= ( 100 + magicAtkMul() ) / 100;
	

	
		// SkillPropertyMultiplier
	damage *=  ( 100 + magicSkillElementMultiplier() ) / 100;
	// BossMATKMultiplier
	damage *= ( 100 + magicBossMod() ) / 100;
	
	// damage *= ( 100 + (5 * SkillSearch(skill_HW_MYSTICAL_AMPLIFICATION) ) ) / 100;
	
	// damage += mysticalAmplification;
	
	
	return damage;
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
	let upgradeMATK = 0;
	
	// bows are broken and always
	// give 0 MATK for upgrades
	if ( n_A_WeaponType == weapTyp_BOW )
		return upgradeMATK;
		
	if ( n_A_WeaponLV === 1 )
		upgradeMATK = n_A_Weapon_ATKplus * 2;
	else if ( n_A_WeaponLV === 2 )
		upgradeMATK = n_A_Weapon_ATKplus * 3;
	else if ( n_A_WeaponLV === 3 )
		upgradeMATK = n_A_Weapon_ATKplus * 5;
	else if ( n_A_WeaponLV === 4 )
		upgradeMATK = n_A_Weapon_ATKplus * 7;
	
	if ( n_Nitou )
		upgradeMATK += CalcUpgradeMatk2();
	
	return upgradeMATK;
}

// matk from second weapon's upgrade
function CalcUpgradeMatk2()
{
	let upgradeMATK = 0;

	if ( n_A_Weapon2LV === 1 )
		upgradeMATK = n_A_Weapon2_ATKplus * 2;
	else if ( n_A_Weapon2LV === 2 )
		upgradeMATK = n_A_Weapon2_ATKplus * 3;
	else if ( n_A_Weapon2LV === 3 )
		upgradeMATK = n_A_Weapon2_ATKplus * 5;
	else if ( n_A_Weapon2LV === 4 )
		upgradeMATK = n_A_Weapon2_ATKplus * 7;

	return upgradeMATK;
}

function CalcOverRefineMatk()
{
	let overRefine = 0;
	
	// bows are broken and always
	// give 0 MATK for upgrades
	if ( n_A_WeaponType == weapTyp_BOW )
		return overRefine;
	
	if ((n_A_WeaponLV == 1) && (n_A_Weapon_ATKplus >= 8))
			overRefine = 3 * ( n_A_Weapon_ATKplus - 7 );
	else if ((n_A_WeaponLV == 2) && (n_A_Weapon_ATKplus >= 7))
			overRefine = 5 * ( n_A_Weapon_ATKplus - 6 );
	else if ((n_A_WeaponLV == 3) && (n_A_Weapon_ATKplus >= 6))
			overRefine = 8 * ( n_A_Weapon_ATKplus - 5 );
	else if ((n_A_WeaponLV == 4) && (n_A_Weapon_ATKplus >= 5))
			overRefine = 14 * ( n_A_Weapon_ATKplus - 4 );
		
	if ( n_Nitou )
		overRefine += CalcOverRefineMatk2();
	
	return overRefine;
}

function CalcOverRefineMatk2()
{
	let overRefine = 0;
	
	if ((n_A_Weapon2LV == 1) && (n_A_Weapon2_ATKplus >= 8))
			overRefine += 3 * ( n_A_Weapon2_ATKplus - 7 );
	else if ((n_A_Weapon2LV == 2) && (n_A_Weapon2_ATKplus >= 7))
			overRefine += 5 * ( n_A_Weapon2_ATKplus - 6 );
	else if ((n_A_Weapon2LV == 3) && (n_A_Weapon2_ATKplus >= 6))
			overRefine += 8 * ( n_A_Weapon2_ATKplus - 5 );
	else if ((n_A_Weapon2LV == 4) && (n_A_Weapon2_ATKplus >= 5))
			overRefine += 14 * ( n_A_Weapon2_ATKplus - 4 );
	
	return overRefine;
}

// Magic Damage (rawMDmg)
function CalcMagicDamage( rawDamage )
{
	
	// console.log(BK_n_A_MATK[1] * 1.5 * );
	
	wBMC_MDEF = n_B[en_HARDMDEF];
	var MDEF_Musi = 0;
	var Ign_MDEF = 0;
	
	wBMC2 = Math.floor( rawDamage * element[n_B[en_ELEMENT]][n_A_Weapon_element] / 100 );

	if ( 90 <= n_B[en_ELEMENT] && n_A_ActiveSkill == skill_MA_SOUL_STRIKE )
	{
		wBMC2 = Math.floor( wBMC2 * ( 1 + 0.05 * n_A_ActiveSkillLV ) );
	}

	wBMC2 = tPlusDamCut( wBMC2 );
	
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
		wBMC2 = Math.floor( wBMC2 * mdefReduction( wBMC_MDEF ) - n_B_MDEF2 );
	}
	
	wBMC2 = Max( 1, wBMC2 );
	
	
	

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
	
	// if ( n_A_ActiveSkill==skill_WI_EARTH_SPIKE ||
		 // n_A_ActiveSkill == skill_WI_HEAVENS_DRIVE )
	// {
		// if ( EquipNumSearch( 1146 ) )
		// { // Katyusha Flowers?
			// matkMultiplier += n_A_HEAD_DEF_PLUS;
		// }
	// }
	
//skills
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
		// console.log("wBMC2 " + wBMC2);
	// Apply multiplier, floor, and return value
	wBMC2 = wBMC2 * ( 100 + matkMultiplier ) / 100;
		
	//test
	wBMC2 = ApplySkillModifiers( wBMC2 );
	wBMC2 = Math.floor( wBMC2 );
	return wBMC2;
}

//Multiplier (race)
function magicRaceMultiplier()
{
	let rcMul=0;
	
	rcMul = n_tok[bon_MDMG_RC_FORMLESS + n_B[en_RACE]];
	
	if ( n_B[en_RACE] == race_DRAGON  && SkillSearch( skill_SA_DRAGONOLOGY ) )
		rcMul += SkillSearch( skill_SA_DRAGONOLOGY ) * 2;
		
	if (SkillSearch(skill_WAR_INTENSE_TELEKINESIS) && 
		(n_A_ActiveSkill === skill_MA_NAPALM_BEAT ||
		n_A_ActiveSkill === skill_MA_SOUL_STRIKE ||
		n_A_ActiveSkill === skill_HW_NAPALM_VULCAN ||
		n_A_ActiveSkill === skill_WAR_SOUL_EXPANSION)) {
	    rcMul += 40 * SkillSearch(skill_WAR_INTENSE_TELEKINESIS);
	}
	return rcMul;
}

//Multiplier (element) - VS [Element] Monster
function magicElementMultiplier()
{
	let eleMul=0;
	
	eleMul = n_tok[bon_MDMG_ELE_NEUTRAL + Math.floor(n_B[en_ELEMENT]/10)];
	eleMul += n_tok[bon_MDMG_ELE_ALL];
	
	return eleMul;
}

//Multiplier (element) - Skill Element
function magicSkillElementMultiplier()
{
	let eleSkillMul = 0;
	
	eleSkillMul = n_tok[bon_INC_MAGIC_NEUTRAL + n_A_Weapon_element];
	eleSkillMul += n_tok[bon_INC_MAGIC_ALL];

	
	if(EquipNumSearch(2388))
	{ // Illusion Ancient Cape + Illusion Moonlight Dagger
		if(n_A_JOB == cls_SHA || n_A_JOB == cls_SHAt )
		{
			if((n_A_SHOULDER_DEF_PLUS + n_A_Weapon_ATKplus) >= 18)
			{
				if(n_A_Weapon_element == ele_FIRE)
				{
					eleSkillMul += 15;
				}
			}
		}
		
	}	
		
//skill (element)
	if((SkillSearch( skill_SA_ENDOW_BLAZE ) && n_A_Weapon_element == ele_FIRE) || 
	(SkillSearch( skill_SA_ENDOW_TSUNAMI ) && n_A_Weapon_element == ele_WATER) ||
	(SkillSearch( skill_SA_ENDOW_TORNADO ) && n_A_Weapon_element == ele_WIND) ||
	(SkillSearch( skill_SA_ENDOW_QUAKE ) && n_A_Weapon_element == ele_EARTH) )
		eleSkillMul += 5;
	
	return eleSkillMul;
}

//Multiplier (size)
function magicSizMultiplier()
{
	let sizMul=0;
	
	sizMul = n_tok[bon_MDMG_SIZ_SMALL + Math.floor(n_B[en_SIZE])];
	
	return sizMul;
}

//Multiplier (boss)
function magicBossMod()
{
	let bossMul=0;
	
	if(n_B[en_BOSS] == 1 )
		bossMul += n_tok[bon_MDMG_BOSS];
	else
		bossMul += n_tok[bon_MDMG_NON_BOSS];
	
	return bossMul;
}

//Multiplier
function magicAtkMul()
{
	let matk_mul = 0;
	
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
		
//skills
		if(SkillSearch(skill_SUM_BUNCH_OF_SHRIMP) || summonerBuffs[ksBunchOfShrimp])
			matk_mul += 10;
		if(SkillSearch(skill_SUM_POWER_OF_LAND) && SkillSearch(skill_SUM_PLANT))
			matk_mul += 20;
		
		if ( otherBuffs[ksMindBreaker] )
		{
			matk_mul = 20 * otherBuffs[ksMindBreaker];

		}
		// if ( SkillSearch( skill_HW_MYSTICAL_AMPLIFICATION ) )
		// {
			// var w2 = [51,54,56,57,125,126,127,128,131,132,133,534,540,542,545,547,553];
			
			// if ( SkillSearch( skill_WAR_READING_SPELLBOOK ) == 0 || NumSearch( n_A_ActiveSkill, w2 ) == 0 )
			// { // doesn't work with myst amp
				// matk_mul = 5 * SkillSearch(skill_HW_MYSTICAL_AMPLIFICATION);
			// }
		// }
	
	return matk_mul;
}

//Return ExtraMATK
function calcExtraMATK()
{
	let extraMATK = 0;

	extraMATK = (calcEquipMATK() + calcConsumableMATK() + calcPseudoBuffMATK());
	
	return extraMATK;
}

//Return ConsumableMATK
function calcConsumableMATK()
{
	let consumableMATK  = 0;
	
	// Items
	if ( usableItems[ksRainbowCake] )
		consumableMATK += 10;
	
	if ( usableItems[ksBoxOfDrowsiness] )
		consumableMATK += 20;
	
	if ( usableItems[ksWhiteRation] )
		consumableMATK += 15;
	
	if ( usableItems[ksDurian] )
		consumableMATK += 10;
	
	if ( usableItems[ksRuneStrawberryCake] )
		consumableMATK += 5;
	
	if ( usableItems[ksBlessingOfTyr] )
		consumableMATK += 20;
	
	if ( usableItems[ksManaPlus] )
		consumableMATK += 50;
	
	if ( usableItems[ksMardukTransScroll] )
		consumableMATK += 25;
	
	if ( usableItems[ksArchmagePotion] )
		consumableMATK += 30;
	
	if(usableItems[ksSuperhumanSweets])
		consumableMATK += 30;
	
	return consumableMATK;
}

//Return equipMATK
function calcEquipMATK()
{
	let equipMATK = 0;
	
	equipMATK = n_tok[bon_MATK];
	
		
// Equipment
	if(SU_STR >= 120 && EquipNumSearch(1253)) // Rune Circlet
		equipMATK += 5;
	if(SU_INT >= 120 && EquipNumSearch(1254)) // Mitra
		equipMATK += 10;
	if(SU_INT >= 120 && EquipNumSearch(1263)) // Whispers of Wind
		equipMATK += 10;
	if(SU_INT >= 120 && EquipNumSearch(1264)) // Reissue Schmitz Helm
		equipMATK += 10;
	if ( EquipNumSearch( 1218 ) && n_A_HEAD_DEF_PLUS >= 5 )
	{ // Moon Rabbit Hat
		equipMATK += n_A_HEAD_DEF_PLUS - 4;
	}
	if ( EquipNumSearch( 1149 ) )
	{ // Skull Cap
		if ( EquipNumSearch( 89 ) || EquipNumSearch( 936 ) )
		{ // Evil Bone Wand or Thorn Staff of Darkness
			equipMATK += n_A_Weapon_ATKplus * 10;
		}
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if ( SU_INT >= 90 && n_A_SHOULDER_DEF_PLUS >= 7) { equipMATK += 30; }
		if ( SU_INT >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { equipMATK += 20; }
	}
	if ( EquipNumSearch( 1583 ) )
	{ //Golden Angel Wing
		if ( SU_INT >= 90 ) { equipMATK += 15; }
		if ( SU_INT >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { equipMATK += 15; }
	}
	if ( EquipNumSearch( 1584 ) )
	{ //Golden Angel Hairband
		if ( SU_INT >= 70 ) { equipMATK += 5; }
		if ( SU_INT >= 70 && n_A_HEAD_DEF_PLUS >= 7) { equipMATK += 10; }
	}
	if ( EquipNumSearch(1634) )
	{//"Zaha Doll Hat(transformation mode)"
			if ( n_A_HEAD_DEF_PLUS >= 2) {equipMATK += 30*(n_A_HEAD_DEF_PLUS-1) }; 
	}
	if ( EquipNumSearch( 1487 ) )
	{ // "RWC Memory Staff" 
		equipMATK += Math.floor(n_A_Weapon_ATKplus/3)*20;
	}
	if ( EquipNumSearch( 1489 ) )
	{ // "RWC Memory Staff" 
		equipMATK += Math.floor(n_A_Weapon_ATKplus/3)*30;
	}
	if ( EquipNumSearch( 1491 ) )
	{ // "RWC Memory Knife + RWC 2012 Pendant"
		equipMATK += n_A_Weapon_ATKplus*10;
	}
	if ( EquipNumSearch( 1493 ) )
	{ // "RWC Memory Staff + RWC 2012 Pendant"
		equipMATK += n_A_Weapon_ATKplus*5;
	}
	if(SU_INT >= 120 && EquipNumSearch(1390)) // Gefenia Report of Water
		equipMATK += 10;
	if(EquipNumSearch(1545))
	{ //Fallen Angel Wing
		equipMATK += Math.floor(SU_INT/20);
	}
	if(EquipNumSearch(1682))
	{ //"Officer's Cap"
		equipMATK += Math.floor( n_A_HEAD_DEF_PLUS/2 );
	}
	if ( EquipNumSearch( 1795 ) )
	{//Int Glove
		equipMATK+= Math.floor(SU_INT / 10) * EquipNumSearch( 1795 );
	}
	if(EquipNumSearch(1883))
	{ //"Magical Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipMATK += 104;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipMATK += 52 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipMATK += 52 * 3;
		}
	}
	if(EquipNumSearch(1884))
	{ //"Magical Yellow Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipMATK += 112;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipMATK += 56 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipMATK += 56 * 3;
		}
	}
	if(EquipNumSearch(1873))
	{ //"Marvelous Foxtail Staff"
		equipMATK += 10 * Math.floor( n_A_Weapon_ATKplus / 3 );
	}
	if(EquipNumSearch(1877))
	{ //"Wondrous Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipMATK += 96;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipMATK += 48 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipMATK += 48 * 3;
		}
	}
	if(EquipNumSearch(1919))
	{ //"Foxtail Ring"
		if(n_A_BaseLV <= 50)
		{
			equipMATK += 2 * Math.floor(n_A_BaseLV /5);
		}
		else
		{
			equipMATK += 20;
		}
	}
	if(EquipNumSearch(2200) || EquipNumSearch(1955))  //Int Boots
	{
		equipMATK += Math.floor(n_A_SHOES_DEF_PLUS / 3) * 10;
		if(SU_INT >= 120)
			equipMATK += 60;
	}
	if(EquipNumSearch(1949))  //Int Boots Slot
	{
		equipMATK += Math.floor(n_A_SHOES_DEF_PLUS / 3) * 5;
		if(SU_INT >= 120)
			equipMATK += 30;
	}

	if( EquipNumSearch(2063) || //Rusty Dragon's Wand
		EquipNumSearch(2065) || //Shadow Eater
		EquipNumSearch(2071) )  //All-Holy Book
	{
		equipMATK += 10 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if ( EquipNumSearch( 2086 ) )
	{//Revised Encyclopedia
		if(n_A_LEFT_DEF_PLUS >= 9)
			equipMATK += 5;
	}

	if(EquipNumSearch(2162) || // Vicious Mind Staff
	   EquipNumSearch(2163) || // Vicious Mind Rod
	   EquipNumSearch(2168) || // Vicious Mind Book
	   EquipNumSearch(2180) || // Crimson Staff
	   EquipNumSearch(2181) ) // Crimson Rod
	{
		if(n_A_Weapon_ATKplus <= 15)
		{
			equipMATK += n_A_Weapon_ATKplus * n_A_Weapon_ATKplus;
		}
		else
		{
			equipMATK += 15 * 15;
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
			equipMATK += (n_A_Weapon_ATKplus * n_A_Weapon_ATKplus) / 2;
		}
		else
		{
			equipMATK += (15 * 15) / 2;
		}
	}
	if(EquipNumSearch(2180) || // Crimson Staff
	   EquipNumSearch(2181) ) // Crimson Rod
	{
		if(n_A_BaseLV >= 70)
		{
			equipMATK += Math.floor((n_A_BaseLV - 70)/10) * 5;
		}
	}
	if(EquipNumSearch(2207))
	{// Flattery Robe
		if(n_A_BaseLV >= 120)
			equipMATK += 50;
		if(n_A_BaseLV >= 140)
			equipMATK += 50;
	}
	if(EquipNumSearch(2216))  // Old Mitra [1]
	{
		equipMATK += n_A_HEAD_DEF_PLUS * 2;
	}
	if(EquipNumSearch(2219))  // Old Shadow Handicraft [1]
	{
		equipMATK += n_A_HEAD_DEF_PLUS * 4;
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		equipMATK += 3 * n_A_SHOULDER_DEF_PLUS;
		if(SU_INT >= 90)
			equipMATK += 20;
	}
	if(n_A_Equip[eq_WEAPON] == 2246)
	{// Sealed Magic Sword [2]
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipMATK += 85;
		}
		if(n_A_Weapon_ATKplus >= 10)
		{
			equipMATK += 45;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2246)
	{// Sealed Magic Sword [2]
		if(n_A_Weapon2_ATKplus >= 7)
		{
			equipMATK += 85;
		}
		if(n_A_Weapon2_ATKplus >= 10)
		{
			equipMATK += 45;
		}
	}

	if(EquipNumSearch(2388))
	{ // Illusion Ancient Cape + Illusion Moonlight Dagger
		if(n_A_JOB == cls_SHA || n_A_JOB == cls_SHAt )
		{ 
			equipMATK += 80;
			if(n_A_SHOULDER_DEF_PLUS >= 7 && n_A_Weapon_ATKplus >= 7)
				equipMATK += 80;
			if((n_A_SHOULDER_DEF_PLUS + n_A_Weapon_ATKplus) >= 18)
				equipMATK += 40;
		}
	}
	if(EquipNumSearch(2400))
	{//Illusion Survivor's Manteau + Survivor's Rod
		if(n_A_Weapon_ATKplus <= 10)
		{
			equipMATK += 20 * n_A_Weapon_ATKplus;
		}
		else
			equipMATK += 200;
	}
	
//shadows
	if ( EquipNumSearch( 1657 ) )
	{ // "Shadow Mystic Ring"
		equipMATK += n_A_SHADOW_EARRING_DEF_PLUS ;
	}
	if ( EquipNumSearch( 1658 ) )
	{ // "Shadow Mystic Pendant"
		equipMATK += n_A_SHADOW_PENDANT_DEF_PLUS;
	}
	if ( EquipNumSearch( 1712 ) )// "Shadow Swordsman Gloves"
	{ 
		equipMATK += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if ( EquipNumSearch( 1716 ) )// "Shadow Diviner Gloves"
	{ 
		equipMATK += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if ( EquipNumSearch( 1719 ) )
	{ // "Shadow Diviner Set"
		equipMATK += (n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS);
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
		equipMATK += n_A_SHADOW_WEAPON_DEF_PLUS; 
	}
	if ( EquipNumSearch(1839) )
	{ // Shadow Ninja Gloves
		if(n_A_SHADOW_SHIELD_DEF_PLUS >=9){equipMATK += SkillSearch(skill_NIN_NINJA_MASTERY) * 3;}
	}
	if( EquipNumSearch(2255) || // Wyrmeater's Shadow Gloves
		EquipNumSearch(2256) || // Tiger Spirit Shadow Gloves
		EquipNumSearch(2257) || // Katra's Shadow Gloves
		EquipNumSearch(2259) || // Rondius' Shadow Gloves
		EquipNumSearch(2261) || // Talos' Shadow Gloves
		EquipNumSearch(2263) || // Dordaleon's Shadow Gloves
		EquipNumSearch(2265) || // Garmia's Shadow Gloves
		EquipNumSearch(2266) )  // Boscard's Shadow Gloves
	{
		equipMATK += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
//Cards
	if(CardNumSearch(555))
	{//Antique Book Card
		equipMATK += 5 * Math.floor(SU_INT / 10);
	}
	if(CardNumSearch(557))
	{//Faithful Manager Card
		if (  n_A_WeaponType == weapTyp_BOOK)
		{
			if(n_A_Weapon_ATKplus >= 10)
				equipMATK += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
			if(n_A_Weapon_ATKplus >= 14)
				equipMATK += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
		}
	}
	if(CardNumSearch(589))
	{//Big Eggring Card
		if(SU_INT <=50)
		{
			equipMATK -= 5 * Math.floor(SU_INT/10);
		}
		else
		{
			equipMATK -= 25;
		}
	}
	if(CardNumSearch(623) && (n_A_JOB == cls_BAR || n_A_JOB == cls_DAN || n_A_JOB == cls_CLO || n_A_JOB == cls_GYP ||
							  n_A_JOB == cls_MIN || n_A_JOB == cls_MINt || n_A_JOB == cls_WAN || n_A_JOB == cls_WANt ))
	{//Grand Pere Card 
			equipMATK += 15 * n_A_BODY_DEF_PLUS;
	}
	if(CardNumSearch( 637 ))
	{ // Payon Soldier Card
		if(n_A_WeaponType == weapTyp_2HSPEAR || n_A_WeaponType == weapTyp_SPEAR)
		{
			if(n_A_Weapon_ATKplus >= 10)
				equipMATK += 20;
			if(n_A_Weapon_ATKplus >= 14)
				equipMATK += 20;
		}
			
	}
	if(n_A_card[8]==669)
	{ // Fenrir Card
		equipMATK += 5 * n_A_HEAD_DEF_PLUS;
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
						equipMATK += 20;
					if(n_A_Weapon_ATKplus >= 14)
						equipMATK += 20;
				}
			}
			else
			{
				if(n_A_Weapon2Type == weapTyp_DAGGER)
				{
					if(n_A_Weapon2_ATKplus >= 10)
						equipMATK += 20;
					if(n_A_Weapon2_ATKplus >= 14)
						equipMATK += 20;
				}
			}
		}
	}
	if(CardNumSearch(812) && EquipNumSearch(121))
	{//Resentful Munak Card + Girl's Diary
		equipMATK += 100;
	}
	if(CardNumSearch(829) && EquipNumSearch(2393))
	{//Bomi Card + Vampire's Familiar [1]
		equipMATK += 30;
	}

//Enchants
	if(EnchNumSearch( 5244 ))
	{//Modification Orb (MATK)
		if(n_A_BODY_DEF_PLUS >= 7)
			equipMATK += 25 * EnchNumSearch( 5244 );
		if(n_A_BODY_DEF_PLUS >= 9)
			equipMATK += 25 * EnchNumSearch( 5244 );
	}
	// console.log(equipMATK);
	return equipMATK;
}

//Return pseudoBuffMATK
function calcPseudoBuffMATK()
{
	let pseudoBuffMATK = 0;
	
	return pseudoBuffMATK;
}

//Return BuffMATK
function calcBuffMATK()
{
	let buffMATK = 0;
	
	// Imposito Manus
	if ( acolyteBuffs[ksImposito] > 0 )
		buffMATK += acolyteBuffs[ksImposito] * 5;
	
	//Aqua
	if ( SkillSearch(skill_SOR_SUMMON_TYPE) == 2 && SkillSearch(skill_SOR_SUMMON_LEVEL) > 0 && SkillSearch(skill_SOR_SPIRIT_CONTROL) == 1 )		
		buffMATK += 40*SkillSearch(skill_SOR_SUMMON_LEVEL);
	//Odin's Power
	if (otherBuffs[ksOdinsPower] >= 1)
		buffMATK += 70+30*(otherBuffs[ksOdinsPower] - 1);
	
	if ( SkillSearch(skill_KAG_16TH_NIGHT) )
		buffMATK += 50 * SkillSearch(725);
	
	if ( EquipNumSearch(897) && ( n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN ) ) // AssaDamaB
		buffMATK += 130 * EquipNumSearch(897);
		
	if ( EquipNumSearch(898) && ( n_A_JobSearch2() == cls_ROG || n_A_JOB == cls_NIN ) ) // AssaDamaV
		buffMATK += 130 * EquipNumSearch(898);
	
	// Moonlight Serenade
	if ( performerBuffs[ksWandererSolo] === ksMoonlightSerenade &&
		 performerBuffs[ksWandererSoloLevel] > 0 )
	{ 
		var skillBonus = performerBuffs[ksWandererSoloLevel] * 6;
		var voiceLessonsBonus = performerBuffs[ksWandererVoiceLessons];
		var jobLvlBonus = performerBuffs[ksWandererJobLevel] / 5.0;

		buffMATK += skillBonus + voiceLessonsBonus + jobLvlBonus;
	}
	
	// Chattering
	if ( SkillSearch( skill_SUM_CHATTERING ) )
		buffMATK += 100;
	
	// Meow Meow
	if ( SkillSearch( skill_SUM_MEOW_MEOW ) || summonerBuffs[ksMeowMeow])
		buffMATK += 100;

	if(SkillSearch(skill_SUM_SILVERVINE_ROOT_TWIST) && SkillSearch(skill_SUM_SPIRIT_OF_LAND))
		buffMATK += n_A_BaseLV;
	
	if(SkillSearch(skill_SUM_NYANG_GRASS) && SkillSearch(skill_SUM_SPIRIT_OF_LAND))
		buffMATK += n_A_BaseLV;
	
	// Shield Spell
	if ( SkillSearch( skill_ROY_SHIELD_SPELL ) === 3 && PATCH == 2)
		buffMATK += 150;
	
	//TODO
	//Add Shadow Spell to the passiv skill for SC
	// if ( SkillSearch( skill_SHA_AUTO_SHADOW_SPELL ) )
	// {
		// buffMATK += 5 * SkillSearch( skill_SHA_AUTO_SHADOW_SPELL );
	// }
	
	return buffMATK;
}

function calcVarianceMATK()
{
	let variance = 0;
	variance = Math.floor( ( n_tok[bon_WEAPON_MATK] + CalcUpgradeMatk() ) * 0.1 * n_A_WeaponLV );
	return variance;
}

function getBaseWeaponMATK()
{
	return n_tok[bon_WEAPON_MATK];
}

function calcWeaponMATK()
{
	return (getBaseWeaponMATK() + CalcUpgradeMatk()/* + CalcOverRefineMatk()*/);
}
