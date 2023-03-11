//old- (Floor[{(atk)*(mod+% from players+%range attack-%race,size,element.card)+banes/masteries}*elemantal*e.def]-s.def)*bonus*hit
//wATK = [weaponBaseAtk + weaponBaseAtk*STR/200 + weaponUpgradeBonus - randomFactor];
//ATK = [ (2*sATK + (wATK * sizeMod + eATK) * raceMod * elementMod * bossMod * atkMod + masteryATK) * rangedMod ];
function GetBaseDmg( weaponElement, forced, addMasteries )
{
	//ATK = sATK * 2 + wATK + eATK + masteries
	//Weapon ATK = (Base Weapon ATK + Variance + STR Bonus + Refinement Bonus)*Size Penalty
	CalcAtk();
	CalcElementalMod( weaponElement );
	
	// reset values
	var damageRange = [0,0,0];
	
	// Calc Status attack with elemental modifier (it's always forced Neutral)
	var finalStatusAttack = Math.floor( statusAttack * 2 * statusElementalMod / 100 );

	// Calc Weapon attack with elemental modifier
	var finalWeaponAttack = new Array();
	var baseWeaponAttack = n_A_Weapon_ATK + strengthBonusAttack + weaponUpgradeAttack;
	if ( SkillSearch( skill_AX_ENCHANT_DEADLY_POISON ) )
	{
		if( n_A_ActiveSkill != skill_AS_GRIMTOOTH && n_A_ActiveSkill != skill_AS_VENOM_KNIFE && n_A_ActiveSkill != skill_AX_METEOR_ASSAULT)
		{
			baseWeaponAttack *= 5;
			// baseWeaponAttack *= 4;
			equipmentAttack *= 4;
		}
		
	}
	finalWeaponAttack[0] = ( baseWeaponAttack - varianceAttack + minOverrefineAttack ) * weaponSizeMod;
	finalWeaponAttack[2] = ( baseWeaponAttack + varianceAttack + overrefineAttack ) * weaponSizeMod;
	finalWeaponAttack[1] = Math.floor( ( finalWeaponAttack[0] + finalWeaponAttack[2] ) / 2 );
	var MB = 0;
	
	for ( var i = 0; i < 3; i++ )
	{
		// add equipment attack
		if (!noequipatk) finalWeaponAttack[i] += equipmentAttack;
		// multiply element mod
		if (otherBuffs[ksMagnumBreak]) {
			if (forced) {
				MB = finalWeaponAttack[i] * 0.2 * weaponElementalMod / 100;
			}
			else {
				MB = finalWeaponAttack[i] * 0.2 * element[n_B[en_ELEMENT]][ele_FIRE] / 100;
			}
		}
		finalWeaponAttack[i] *= weaponElementalMod / 100;
		finalWeaponAttack[i] += MB;
		// multiply race mod
		finalWeaponAttack[i] *= ( racialMod + 100 ) / 100;
		// multiply special race mod
		finalWeaponAttack[i] *= ( specialRacialMod + 100 ) / 100;
		// multiply size mod
		finalWeaponAttack[i] *= ( sizeMod + 100 ) / 100;
		// multiply boss mod
		finalWeaponAttack[i] *= ( bossMod + 100 ) / 100;
		// multiply attack mod
		finalWeaponAttack[i] *= attackMod;
	}
	
	// Build Damage Range
	for ( var i = 0; i < 3; i++ )
	{
		// Add Status attack, weapon attack and mastery attack
		damageRange[i] = finalStatusAttack + finalWeaponAttack[i] + masteryAttack + addMasteries;
		if (damageType == kDmgTypeRanged) {
			// Multiply by the ranged mod
			damageRange[i] *= ( rangedMod + 100 ) / 100;
		}
		// and floor
		damageRange[i] = Math.floor( damageRange[i] );
	}
	
	return damageRange;
}

//wATK = [weaponBaseAtk + weaponBaseAtk*STR/200 + weaponUpgradeBonus - randomFactor];
//ATK = [ (2*sATK + (wATK * sizeMod + eATK) * raceMod * elementMod * bossMod * atkMod + masteryATK) * rangedMod ];
function GetOffhandDmg( weaponElement )
{
	//ATK = sATK * 2 + wATK + eATK + masteries
	//Weapon ATK = (Base Weapon ATK + Variance + STR Bonus + Refinement Bonus)*Size Penalty
	CalcElementalMod( weaponElement );
	
	// reset values
	var damageRange = [0,0,0];
	
	// Calc Status attack with elemental modifier (it's always forced Neutral)
	var offhandStatusAttack = Math.floor( statusAttack * statusElementalMod / 100 );

	// Calc Weapon attack with elemental modifier
	var finalWeaponAttack = new Array();
	var baseWeaponAttack = n_A_Weapon2_ATK + strengthBonusAttack2 + weaponUpgradeAttack2;
	if ( SkillSearch( skill_AX_ENCHANT_DEADLY_POISON ) )
	{
		baseWeaponAttack *= 5;
		// baseWeaponAttack *= 4;
		equipmentAttack *= 4;
	}
	finalWeaponAttack[0] = ( baseWeaponAttack - varianceAttack2 + minOverrefineAttack2 ) * weapon2SizeMod;
	finalWeaponAttack[2] = ( baseWeaponAttack + varianceAttack2 + overrefineAttack2 ) * weapon2SizeMod;
	finalWeaponAttack[1] = Math.floor( ( finalWeaponAttack[0] + finalWeaponAttack[2] ) / 2 );
	for ( var i = 0; i < 3; i++ )
	{
		// multiply element mod
		finalWeaponAttack[i] *= weaponElementalMod / 100;
	}

	// Build Damage Range
	for ( var i = 0; i < 3; i++ )
	{
		// Add Status attack, weapon attack and mastery attack
		damageRange[i] = offhandStatusAttack + finalWeaponAttack[i] + masteryAttack;
		if (n_A_JOB == cls_KAGOB)
			damageRange[i] *= ( 5.0 + SkillSearch( skill_AS_LEFTHAND_MASTERY ) ) / 10.0;
		else
			damageRange[i] *= ( 3.0 + SkillSearch( skill_AS_LEFTHAND_MASTERY ) ) / 10.0;
		
		// and floor
		damageRange[i] = Math.floor( damageRange[i] );
	}
	
	return damageRange;
} 

function calcAttackSpecialBoosts() {
	var baseDamageMod = 100;
	if ( n_A_ActiveSkill != skill_MO_OCCULT_IMPACTION/* &&
		 n_A_ActiveSkill != skill_MO_GUILLOTINE_FIST &&
		 n_A_ActiveSkill != skill_MO_MAX_GUILLOTINE_FIST*/ ) //Dunno why should not work o.o
	{
		if (SkillSearch(skill_SW_BERSERK))
			baseDamageMod += 32;
		else if (otherBuffs[ksProvoke])
			baseDamageMod += 2 + 3 * otherBuffs[ksProvoke];
		else if (otherBuffs[ksAloe])
			baseDamageMod += 5;
		if (battleChantBuffs[pass_V_ATK])
			baseDamageMod += 100;
		if (otherBuffs[ksMurderBonus])
			baseDamageMod += 10;
		if (StPlusCalc2(87))
			baseDamageMod += StPlusCalc2(87);
		if (miscEffects[ksCursed])
			baseDamageMod -= 25;
	}
	
		n_A_Weapon_ATK = Math.floor(n_A_Weapon_ATK * baseDamageMod / 100.0);
		weaponUpgradeAttack = Math.floor(weaponUpgradeAttack * baseDamageMod / 100.0);
		statusAttack = Math.floor(statusAttack * baseDamageMod / 100.0);
		strengthBonusAttack = Math.floor(strengthBonusAttack * baseDamageMod / 100.0);
		equipmentAttack = Math.floor(equipmentAttack * baseDamageMod / 100.0);
		overrefineAttack = Math.floor(overrefineAttack * baseDamageMod / 100.0);
		varianceAttack = Math.floor(varianceAttack * baseDamageMod / 100.0);
		minOverrefineAttack = Math.floor(minOverrefineAttack * baseDamageMod / 100.0);
		if ( n_Nitou ) {
			n_A_Weapon2_ATK = Math.floor(n_A_Weapon2_ATK * baseDamageMod / 100.0);
			weaponUpgradeAttack2 = Math.floor(weaponUpgradeAttack2 * baseDamageMod / 100.0);
			strengthBonusAttack2 = Math.floor(strengthBonusAttack2 * baseDamageMod / 100.0);
			overrefineAttack2 = Math.floor(overrefineAttack2 * baseDamageMod / 100.0);
			varianceAttack2 = Math.floor(varianceAttack2 * baseDamageMod / 100.0);
			minOverrefineAttack2 = Math.floor(minOverrefineAttack2 * baseDamageMod / 100.0);
		}
	
}

function CalcAtk()
{
	ClearBonuses();
	
	// Calc pieces of attack formula
	statusAttack = CalcStatAtk();
	n_A_WeaponLV = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL];
	n_A_Weapon_ATK = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_ATK];
	if(PATCH < 2)
	{
		if (otherBuffs[ksStriking] >= 1 && n_A_Equip[eq_WEAPON] !== 0) {
		n_A_Weapon_ATK += (8 + (otherBuffs[ksStriking] * 2)) * n_A_WeaponLV;
		}
		if (otherBuffs[ksStrikingEndowBonus] >= 1) {
			n_A_Weapon_ATK += 5 * otherBuffs[ksStrikingEndowBonus];
		}
	}
	else if(PATCH == 2)
	{
		if (otherBuffs[ksStriking] >= 1)
		{
			n_A_Weapon_ATK += 20 * otherBuffs[ksStrikingEndowBonus];
		}
	}
	
	if (otherBuffs[ksOdinsPower] >= 1) { // Odin's Power
		n_A_Weapon_ATK += 70+30*(otherBuffs[ksOdinsPower] - 1);
	}
	CalcUpgradeAtk();
	CalcVarianceAtk();
	CalcOverRefineAtk();
	equipmentAttack = CalcEquipAtk();
	masteryAttack = CalcMasteryAtk();
	CalcWeaponSizeMod();
	CalcRacialMod();
	CalcBossMod();
	CalcAttackMod();
	CalcCriticalMod();
	CalcRangedMod();
	CalcSpecialRacialMod();
	CalcSizeMod();
	if ( n_A_WeaponType != weapTyp_BOW &&
		 n_A_WeaponType != weapTyp_INSTRU &&
		 n_A_WeaponType != weapTyp_WHIP &&
		 n_A_WeaponType != weapTyp_HANDGUN &&
		 n_A_WeaponType != weapTyp_RIFLE &&
		 n_A_WeaponType != weapTyp_SHOTGUN &&
		 n_A_WeaponType != weapTyp_GATLING_GUN &&
		 n_A_WeaponType != weapTyp_GRENADE_LAUNCHER )
	{
		strengthBonusAttack = Math.floor( n_A_Weapon_ATK * n_A_STR / 200 );
	}
	else
	{
		strengthBonusAttack = Math.floor( n_A_Weapon_ATK * n_A_DEX / 200 );
	}
	if ( n_Nitou )
	{ // Dual Hand
		n_A_Weapon2LV = ItemOBJ[n_A_Equip[eq_WEAPONII]][itm_WLVL];
		n_A_Weapon2_ATK = ItemOBJ[n_A_Equip[eq_WEAPONII]][itm_ATK];
		strengthBonusAttack2 = Math.floor( n_A_Weapon2_ATK * n_A_STR / 200 );
		CalcUpgradeAtk2();
		CalcVarianceAtk2();
		CalcOverRefineAtk2();
	}
	calcAttackSpecialBoosts(); // BOOSTS THAT WERE CALCULATED IN CalcBaseDamageMods FUNCTION
}

function GetOldAtk()
{
	CalcAtk();
	
	// for damage calculation
	var tempAttack = equipmentAttack;
	tempAttack += (n_A_Weapon_ATK + weaponUpgradeAttack + overrefineAttack + strengthBonusAttack * element[n_B[en_ELEMENT]][ele_NEUTRAL] / 100) * weaponSizeMod;
	// multiply race mod
	tempAttack *= ( racialMod + 100 ) / 100;
	// multiply special race mod
	tempAttack *= ( specialRacialMod + 100 ) / 100;
	// multiply size mod
	tempAttack *= ( sizeMod + 100 ) / 100;
	// multiply boss mod
	tempAttack *= ( bossMod + 100 ) / 100;
	// multiply attack mod
	tempAttack *= ( attackMod + 100 ) / 100;
	tempAttack = (Max(tempAttack,0));
	return tempAttack;
}

function GetDisplayAtk()
{
	CalcAtk();
	
	// for damage calculation
	var tempAttack = equipmentAttack;
	tempAttack += n_A_Weapon_ATK + weaponUpgradeAttack + strengthBonusAttack + masteryAttack;
	tempAttack = (Max(tempAttack,0));
	return tempAttack;
}

function CalcStatAtk()
{
	statusAttack = 0;
	
	// LUK and Base Level
	statusAttack = ( n_A_LUK / 3 ) + ( n_A_BaseLV / 4 );
	
	if ( n_A_WeaponType != weapTyp_BOW &&
		 n_A_WeaponType != weapTyp_INSTRU &&
		 n_A_WeaponType != weapTyp_WHIP &&
		 n_A_WeaponType != weapTyp_HANDGUN &&
		 n_A_WeaponType != weapTyp_RIFLE &&
		 n_A_WeaponType != weapTyp_SHOTGUN &&
		 n_A_WeaponType != weapTyp_GATLING_GUN &&
		 n_A_WeaponType != weapTyp_GRENADE_LAUNCHER )
	{
		// ranged weapon, use DEX
		statusAttack += n_A_STR + ( n_A_DEX / 5 );
	}
	else
	{
		// melee, use STR
		statusAttack += n_A_DEX + ( n_A_STR / 5 );
	}
	
	return Math.floor( statusAttack );
}

function CalcUpgradeAtk()
{
	weaponUpgradeAttack = 0;
	
	if ( n_A_WeaponLV === 1 )
	{
		weaponUpgradeAttack = n_A_Weapon_ATKplus * 2;
	}
	else if ( n_A_WeaponLV === 2 )
	{
		weaponUpgradeAttack = n_A_Weapon_ATKplus * 3;
	}
	else if ( n_A_WeaponLV === 3 )
	{
		weaponUpgradeAttack = n_A_Weapon_ATKplus * 5;
	}
	else if ( n_A_WeaponLV === 4 )
	{
		weaponUpgradeAttack = n_A_Weapon_ATKplus * 7;
	}
}

function CalcUpgradeAtk2()
{
	weaponUpgradeAttack2 = 0;
	
	if ( n_Nitou )
	{
		if ( n_A_Weapon2LV == 1 )
		{
			weaponUpgradeAttack2 = n_A_Weapon2_ATKplus * 2;
		}
		else if ( n_A_Weapon2LV == 2 )
		{
			weaponUpgradeAttack2 = n_A_Weapon2_ATKplus * 3;
		}
		else if ( n_A_Weapon2LV == 3 )
		{
			weaponUpgradeAttack2 = n_A_Weapon2_ATKplus * 5;
		}
		else if ( n_A_Weapon2LV == 4 )
		{
			weaponUpgradeAttack2 = n_A_Weapon2_ATKplus * 7;
		}
	}
}

function CalcVarianceAtk()
{
	varianceAttack = 0;
	
	varianceAttack = n_A_Weapon_ATK * 0.05 * n_A_WeaponLV;
}

function CalcVarianceAtk2()
{
	varianceAttack2 = 0;
	
	if ( n_Nitou )
	{
		varianceAttack2 = n_A_Weapon2_ATK * 0.05 * n_A_Weapon2LV;
	}
}

function CalcOverRefineAtk()
{
	overrefineAttack = 0;
	
	if ( n_A_WeaponLV == 1 )
	{
		if ( n_A_Weapon_ATKplus >= 8 )
		{
			overrefineAttack = 3 * ( n_A_Weapon_ATKplus - 7 );
		}
	}
	else if ( n_A_WeaponLV == 2 )
	{
		if ( n_A_Weapon_ATKplus >= 7 )
		{
			overrefineAttack = 5 * ( n_A_Weapon_ATKplus - 6 );
		}
	}
	else if ( n_A_WeaponLV == 3 )
	{
		if ( n_A_Weapon_ATKplus >= 6 )
		{
			overrefineAttack = 8 * ( n_A_Weapon_ATKplus - 5 );
		}
	}
	else if ( n_A_WeaponLV == 4 )
	{
		if ( n_A_Weapon_ATKplus >= 5 )
		{
			overrefineAttack = 14 * ( n_A_Weapon_ATKplus - 4 );
		}
	}
	
	minOverrefineAttack = 0;
	if ( overrefineAttack > 0 )
	{
		minOverrefineAttack = 1;
	}
}

function CalcOverRefineAtk2()
{
	overrefineAttack2 = 0;
	
	if ( n_Nitou )
	{
		if ( n_A_Weapon2LV == 1 )
		{
			if ( n_A_Weapon2_ATKplus >= 8 )
			{
				overrefineAttack2 = 3 * ( n_A_Weapon2_ATKplus - 7 );
			}
		}
		else if ( n_A_Weapon2LV == 2 )
		{
			if ( n_A_Weapon2_ATKplus >= 7 )
			{
				overrefineAttack2 = 5 * ( n_A_Weapon2_ATKplus - 6 );
			}
		}
		else if ( n_A_Weapon2LV == 3 )
		{
			if ( n_A_Weapon2_ATKplus >= 6 )
			{
				overrefineAttack2 = 8 * ( n_A_Weapon2_ATKplus - 5 );
			}
		}
		else if ( n_A_Weapon2LV == 4 )
		{
			if ( n_A_Weapon2_ATKplus >= 5 )
			{
				overrefineAttack2 = 14 * ( n_A_Weapon2_ATKplus - 4 );
			}
		}
	}
	
	minOverrefineAttack2 = 0;
	if ( overrefineAttack2 > 0 )
	{
		minOverrefineAttack2 = 1;
	}
}

function CalcEquipAtk()
{
	equipmentAttack = 0;
	
	// Get attack from 
	equipmentAttack=n_tok[bon_ATK]; // cur eqAtk
	
	// Projectiles
	if ( n_A_WeaponType === weapTyp_BOW ||
		 n_A_WeaponType === weapTyp_INSTRU ||
		 n_A_WeaponType === weapTyp_WHIP ||
		 n_A_WeaponType === weapTyp_HANDGUN ||
		 n_A_WeaponType === weapTyp_RIFLE ||
		 n_A_WeaponType === weapTyp_SHOTGUN ||
		 n_A_WeaponType === weapTyp_GATLING_GUN ||
		 n_A_WeaponType === weapTyp_GRENADE_LAUNCHER )
	{ // Arrows
		equipmentAttack += ArrowOBJ[n_A_Arrow][arr_att_ATK];
	}
	if ( n_A_ActiveSkill ===  skill_GEN_CART_CANNON )
	{ // Cannon Balls
		equipmentAttack += CannonBallOBJ[n_A_Arrow][arr_att_ATK];
	}
	if ( SkillSearch(skill_SOR_SUMMON_TYPE) == 0 && SkillSearch(skill_SOR_SUMMON_LEVEL) > 0 && SkillSearch(skill_SOR_SPIRIT_CONTROL) == 1 ) {
		//Agni
		equipmentAttack += 60*SkillSearch(skill_SOR_SUMMON_LEVEL);
	}

	if ( otherBuffs[ksElementField] == ksVolcano && otherBuffs[ksElementFieldLvl] >= 1 )
	{ // Volcano
		equipmentAttack += otherBuffs[ksElementFieldLvl] * 10;
	}

// items
	if ( usableItems[ksRainbowCake] )
	{
		equipmentAttack += 10;
	}
	if ( usableItems[ksBoxOfResentment] )
	{
		equipmentAttack += 20;
	}
	if ( usableItems[ksRuneStrawberryCake] )
	{
		equipmentAttack += 5;
	}
	if ( usableItems[ksBlessingOfTyr] )
	{
		equipmentAttack += 20;
	}
	if ( usableItems[ksKillerPotion] )
	{
		equipmentAttack += 50;
	}
	if ( usableItems[ksDurian] )
	{
		equipmentAttack += 10;
	}
	if ( usableItems[ksPinkRation] )
	{
		equipmentAttack += 15;
	}
	if ( usableItems[ksDistilledFightingSpirit] )
	{
		equipmentAttack += 30;
	}
	if ( usableItems[ksArchmagePotion] )
	{
		equipmentAttack += 30;
	}
	if(usableItems[ksSuperhumanSweets])
	{
		equipmentAttack += 30;
	}
	// Cards
	if(CardNumSearch(515) && n_A_Weapon_ATKplus >= 12) // Tendrillion
		equipmentAttack += 35;
	if ( SU_STR >= 80 && CardNumSearch( 267 ) )
	{ // GWhisper
		equipmentAttack += 20;
	}
	if ( CardNumSearch( 492 ) )
	{ // Ifrit
		equipmentAttack += Math.floor( n_A_JobLV / 10 ) * CardNumSearch( 492 );
	}
	if(CardNumSearch( 542 ))
	{ // Wakwak Card
		equipmentAttack += Math.floor(SU_STR/10)*5;
	}
	if(CardNumSearch( 637 ))
	{ // Payon Soldier Card
		if(n_A_WeaponType == weapTyp_2HSPEAR || n_A_WeaponType == weapTyp_SPEAR)
		{
			if(n_A_Weapon_ATKplus >= 10)
				equipmentAttack += 20;
			if(n_A_Weapon_ATKplus >= 14)
				equipmentAttack += 20;
		}
			
	}
	
	// Ice Pick Effect
	if ( n_tok[bon_ICE_PICK] || (n_A_ActiveSkill == skill_MO_OCCULT_IMPACTION || n_A_ActiveSkill == skill_REB_MASS_SPIRAL))
	{ // adds (monsters def)/2 equip attack
		equipmentAttack += Math.floor( n_B[en_HARDDEF] / 2 );
	}
		
// Equipment
	if ( SU_STR >= 95 && EquipNumSearch( 621 ) )
	{ //DoomSlayer
		equipmentAttack += 340;
	}
	if ( SU_STR >= 44 && EquipNumSearch( 625 ) )
	{ // Holgrens Refining Hammer
		equipmentAttack += 44;
	}
	if ( SU_AGI >= 90 && EquipNumSearch( 442 ) )
	{ // Rogue's Treasure
		equipmentAttack += 10 * EquipNumSearch( 442 );
	}
	if ( SU_STR >= 95 && EquipNumSearch( 1160 ) )
	{ // Krasnaya
		equipmentAttack += 20;
	}
	if ( SU_LUK >= 90 && EquipNumSearch( 1164 ) )
	{ // Berchel Axe
		equipmentAttack += 20;
	}
	if ( EquipNumSearch( 676 ) )
	{ // Mythical Lion Mask
		equipmentAttack += n_A_HEAD_DEF_PLUS * 2;
	}
	if ( EquipNumSearch( 1120 ) && n_A_JobSearch() === cls_ARC )
	{ // Archer Figurine
		equipmentAttack += 10 * EquipNumSearch( 1120 ) ;
	}
	if ( EquipNumSearch( 1165 ) )
	{ // Veteran Axe
		equipmentAttack += 10 * SkillSearch( 311 );
	}
	if ( SU_STR >= 120 && EquipNumSearch( 1253 ) )
	{ // Rune Circlet
		equipmentAttack += 10;
	}
	if ( SU_STR >= 120 && EquipNumSearch( 1256 ) )
	{ // Driver Band
		equipmentAttack += 10;
	}
	if ( SU_AGI >= 120 && EquipNumSearch( 1257 ) )
	{ // Shadow Crown
		equipmentAttack += 10;
	}
	if ( SU_STR >= 120 && EquipNumSearch( 1259 ) )
	{ // Midas Whispers
		equipmentAttack += 5;
	}
	if ( SU_STR >= 120 && EquipNumSearch( 1261 ) )
	{ // Burning Spirit
		equipmentAttack += 10;
	}
	if ( SU_AGI >= 120 && EquipNumSearch( 1262 ) )
	{ // Silent Enforcer
		equipmentAttack += 10;
	}
	if ( EquipNumSearch( 1218 ) && n_A_HEAD_DEF_PLUS >= 5 )
	{ // Moon Rabbit Hat
		equipmentAttack += n_A_HEAD_DEF_PLUS - 4;
	}
	if ( EquipNumSearch( 1336 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Aquarius Diadem
		equipmentAttack += 15;
	}
	if ( EquipNumSearch( 1345 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Scorpio Diadem
		equipmentAttack += 5;
	}
	if ( EquipNumSearch( 1347 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Aquarius Crown
		equipmentAttack += 15;
	}
	if ( EquipNumSearch( 1349 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Cancer Crown
		equipmentAttack += 15;
	}
	if ( EquipNumSearch( 1355 ) && n_A_HEAD_DEF_PLUS >= 10 )
	{ // Scorpio Crown
		equipmentAttack += 5;
	}
	if ( EquipNumSearch( 1365 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Gemini Crown
		equipmentAttack += 15;
	}
	if ( SU_STR >= 120 && EquipNumSearch( 1386 ) )
	{ // Gigantic Lance
		equipmentAttack += 300;
	}
	if ( EquipNumSearch( 953 ) || EquipNumSearch( 1499 ) )
	{ // Giant Majestic Goat
		equipmentAttack += Math.floor(n_A_JobLV/7*2);
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if (n_A_SHOULDER_DEF_PLUS >= 7 && SU_STR >= 90) { equipmentAttack += 20; }
		if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_STR >= 90) { equipmentAttack += 10; }
	}
	if ( EquipNumSearch( 1639 ) )
	{ //Sleepy Little Tiger(transformation mode)
		equipmentAttack += 25 * n_A_HEAD_DEF_PLUS;
	}
	if ( EquipNumSearch( 1583 ) )
	{ //Golden Angel Wing
		if (SU_STR >= 90) { equipmentAttack += 15; }
		if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_STR >= 90) { equipmentAttack += 15; }
	}
	if ( EquipNumSearch( 1584 ) )
	{ //Golden Angel HAirband
		if (SU_STR >= 70) { equipmentAttack += 5; }
		if (n_A_HEAD_DEF_PLUS >= 7 && SU_STR >= 70) { equipmentAttack += 10; }
	}
	if ( EquipNumSearch( 1487 ) )
	{ // "RWC Memory Knife" 
		equipmentAttack += Math.floor(n_A_Weapon_ATKplus/3)*20;
	}
	if ( EquipNumSearch( 1488 ) )
	{ // "RWC Memory Mace" 
		equipmentAttack += Math.floor(n_A_Weapon_ATKplus/3)*30;
	}
	if ( EquipNumSearch( 1490 ) )
	{ // "RWC Memory Knife + RWC 2012 Ring"
		equipmentAttack += n_A_Weapon_ATKplus*10;
	}
	if ( EquipNumSearch( 1492 ) )
	{ // "RWC Memory Mace + RWC 2012 Ring"
		equipmentAttack += n_A_Weapon_ATKplus*5;
	}
	if(EquipNumSearch(1545))
	{ //Fallen Angel Wing
		equipmentAttack += Math.floor(SU_STR/20);
	}
	if(EquipNumSearch(1681))
	{ //"Amistr Hat"
		equipmentAttack += Math.floor( n_A_HEAD_DEF_PLUS/2 ) * 10;
	}
	if(EquipNumSearch(1682))
	{ //"Officer's Cap"
		equipmentAttack += Math.floor( n_A_HEAD_DEF_PLUS/2 );
	}
	if(EquipNumSearch(1683))
	{ //"Glove Of Shura"
		if(SU_STR >= 120)
			equipmentAttack += 30;
	}
	if(EquipNumSearch(1702))
	{ //"Dog Cap"
		equipmentAttack += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
		if(n_A_HEAD_DEF_PLUS >= 7)
			equipmentAttack += 30;
	}
	if(EquipNumSearch(1703) || EquipNumSearch(1704) || EquipNumSearch(1705) || EquipNumSearch(1706) || EquipNumSearch(1707))
	{ //"Probation Gatling Gun" "Probation Grenade Launcher" "Probation Revolver" "Probation Rifle" "Probation Shotgun "
		if(n_A_BaseLV <= 160)
		{
			equipmentAttack += 6 * Math.floor(n_A_BaseLV / 10);
		}
		else
		{
			equipmentAttack += 96;
		}
		
	}
	if ( EquipNumSearch( 1776 ) )
	{ // Nab Hood
		equipmentAttack += n_A_SHOULDER_DEF_PLUS * 2 ;
	}
	if ( EquipNumSearch( 1779 ) )
	{ // Nab Set
		if(SU_STR >= 120)
			equipmentAttack += 30;
	}
	if ( EquipNumSearch( 1780 ) )
	{ // Black Wing Suits
		equipmentAttack += n_A_BODY_DEF_PLUS * 3;
	}
	if ( EquipNumSearch( 1792 ) )
	{//Str Glove
		equipmentAttack += Math.floor(SU_STR / 10) * EquipNumSearch( 1792 );
	}
	if ( EquipNumSearch( 1822 ) )
	{//Shadow Ninja Shield
		equipmentAttack += SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE) * 3;
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
		equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS; 
	}
	if(EquipNumSearch(1860))
	{ //"Feathered Tricorn"
		equipmentAttack += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	if(EquipNumSearch(1874))
	{ //"Fine Foxtail Replica"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipmentAttack += 78;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipmentAttack += 39 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipmentAttack += 39 * 3;
		}
	}
	if(EquipNumSearch(1880))
	{ //"Elaborate Foxtail Replica"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipmentAttack += 96;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipmentAttack += 48 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipmentAttack += 48 * 3;
		}
	}
	if(EquipNumSearch(1881))
	{ //"Elaborate Yellow Foxtail Replica"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipmentAttack += 108;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipmentAttack += 54 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipmentAttack += 54 * 3;
		}
	}
	if(EquipNumSearch(1883))
	{ //"Magical Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipmentAttack += 48;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipmentAttack += 24 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipmentAttack += 24 * 3;
		}
	}
	if(EquipNumSearch(1884))
	{ //"Magical Yellow Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipmentAttack += 56;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipmentAttack += 28 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipmentAttack += 28 * 3;
		}
	}
	if(EquipNumSearch(1877))
	{ //"Wondrous Foxtail Staff"
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipmentAttack += 40;
		}
		if(n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10 )
		{
			equipmentAttack += 20 * (n_A_Weapon_ATKplus - 7);
		}
		if(n_A_Weapon_ATKplus > 10)
		{
			equipmentAttack += 20 * 3;
		}
	}
	if(EquipNumSearch(1919))
	{ //"Foxtail Ring"
		if(n_A_BaseLV <= 50)
		{
			equipmentAttack += 2 * Math.floor(n_A_BaseLV /5);
		}
		else
		{
			equipmentAttack += 20;
		}
	}
	if(EquipNumSearch(1942))
	{ //"General's Helmet"
		equipmentAttack += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	if( EquipNumSearch(1944) )
	{//General's Helmet + Zweihander 
		equipmentAttack += 20 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(2197) || EquipNumSearch(1952))  //Str Boots
	{
		equipmentAttack += 7 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
		if(SU_STR >= 120)
		{
			equipmentAttack += 50;
		}
	}
	if(EquipNumSearch(1946))  //Str Boots slot
	{
		equipmentAttack += 5 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
		if(SU_STR >= 120)
		{
			equipmentAttack += 30;
		}
	}
	if( EquipNumSearch(2019) )
	{//Pile Bunker P 
		equipmentAttack += 5 * n_A_Weapon_ATKplus;
	}
	if( EquipNumSearch(2021) )
	{//Gigant Blade 
		if(SU_STR <= 110)
			equipmentAttack -= 250;
	}
	if( EquipNumSearch(2050) || //Runic Katana
		EquipNumSearch(2052) || //Trident of Undine
		EquipNumSearch(2054) || //Bow of Narcissus
		EquipNumSearch(2057) || //Hand of Death
		EquipNumSearch(2058) || //Steel Flower
		EquipNumSearch(2060) || //Fatalist
		EquipNumSearch(2061) || //Empyrean
		EquipNumSearch(2062) || //Scarlet Dragon's Bow
		EquipNumSearch(2067) || //Avenger
		EquipNumSearch(2068) || //Big Badaboom
		EquipNumSearch(2069) || //Sword of Blue Fire
		EquipNumSearch(2070) || //Slate Sword
		EquipNumSearch(2073) || //Iron Claw
		EquipNumSearch(2074) || //Claws of the Bifrost
		EquipNumSearch(2075) || //Four Mirrors
		EquipNumSearch(2079) || //Crimson Rose
		EquipNumSearch(2082) || //Guttling Gun
		EquipNumSearch(2083) ) //Meowmeow Foxtail
	{
		equipmentAttack += 10 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(2084)) //Kagero & Oboro Dual Dagger Set
	{
		equipmentAttack += 10 * Math.floor((n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 3);
	}
	if(EquipNumSearch(2081)) //Big Game Trophy
	{
		equipmentAttack += 15 * Math.floor((n_A_Weapon_ATKplus) / 3);
	}
	if(EquipNumSearch(2142) || // "Chronocloak of Strength"
	   EquipNumSearch(2143) || // "Chronocloak of Agility"
	   EquipNumSearch(2144) || // "Chronocloak of Vitality"
	   EquipNumSearch(2146) )  // "Chronocloak of Dexterity"
	{
		equipmentAttack += 10 * Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if(EquipNumSearch(2164) || // Vicious Mind Revolver
	   EquipNumSearch(2165) || // Vicious Mind Wire
	   EquipNumSearch(2166) || // Vicious Mind Violin
	   EquipNumSearch(2167) || // Vicious Mind Bow
	   EquipNumSearch(2168) || // Vicious Mind Book
	   EquipNumSearch(2169) || // Vicious Mind Katar
	   EquipNumSearch(2170) || // Vicious Mind Huuma Shuriken
	   EquipNumSearch(2171) || // Vicious Mind Two Handed Axe
	   EquipNumSearch(2172) || // Vicious Mind Mace
	   EquipNumSearch(2173) || // Vicious Mind Knuckle
	   EquipNumSearch(2174) || // Vicious Mind Dagger
	   EquipNumSearch(2175) || // Vicious Mind Sabre
	   EquipNumSearch(2176) || // Vicious Mind Two-Handed Sword
	   EquipNumSearch(2177) || // Vicious Mind Spear
	   EquipNumSearch(2178) || // Vicious Mind Lance
	   EquipNumSearch(2182) || // Crimson Revolver
	   EquipNumSearch(2183) || // Crimson Wire
	   EquipNumSearch(2184) || // Crimson Violin
	   EquipNumSearch(2185) || // Crimson Bow
	   EquipNumSearch(2186) || // Crimson Book
	   EquipNumSearch(2187) || // Crimson Katar
	   EquipNumSearch(2188) || // Crimson Huuma Shuriken
	   EquipNumSearch(2189) || // Crimson Two Handed Axe
	   EquipNumSearch(2190) || // Crimson Mace
	   EquipNumSearch(2191) || // Crimson Knuckle
	   EquipNumSearch(2192) || // Crimson Dagger
	   EquipNumSearch(2193) || // Crimson Sabre
	   EquipNumSearch(2194) || // Crimson Two-Handed Sword
	   EquipNumSearch(2195) || // Crimson Spear
	   EquipNumSearch(2196) )  // Crimson Lance
	{
		if(n_A_Weapon_ATKplus <= 15)
		{
			equipmentAttack += n_A_Weapon_ATKplus * n_A_Weapon_ATKplus;
		}
		else
		{
			equipmentAttack += 15 * 15;
		}
	}
	if(EquipNumSearch(2182) || // Crimson Revolver
	   EquipNumSearch(2183) || // Crimson Wire
	   EquipNumSearch(2184) || // Crimson Violin
	   EquipNumSearch(2185) || // Crimson Bow
	   EquipNumSearch(2186) || // Crimson Bible
	   EquipNumSearch(2187) || // Crimson Katar
	   EquipNumSearch(2188) || // Crimson Huuma Shuriken
	   EquipNumSearch(2189) || // Crimson Two Handed Axe
	   EquipNumSearch(2190) || // Crimson Mace
	   EquipNumSearch(2191) || // Crimson Knuckle
	   EquipNumSearch(2192) || // Crimson Dagger
	   EquipNumSearch(2193) || // Crimson Sabre
	   EquipNumSearch(2194) || // Crimson Two-Handed Sword
	   EquipNumSearch(2195) || // Crimson Spear
	   EquipNumSearch(2196) )  // Crimson Lance
	{
		if(n_A_BaseLV >= 70)
		{
			equipmentAttack += Math.floor((n_A_BaseLV - 70)/10) * 5;
		}
	}
	if(EquipNumSearch(2215) || // Old Rune Circlet [1]
	   EquipNumSearch(2216) || // Old Mitra [1]
	   EquipNumSearch(2217) || // Old Driver Band (Red) [1]
	   EquipNumSearch(2218) || // Old Driver Band (Yellow) [1]
	   EquipNumSearch(2219) || // Old Shadow Handicraft [1]
	   EquipNumSearch(2221) || // Old Midas Whisper [1]
	   EquipNumSearch(2223) || // Old Blazing Soul [1]
	   EquipNumSearch(2224) || // Old Wind Whisper [1]
	   EquipNumSearch(2228) )  // Old Casket of Protection [1]
	{
		equipmentAttack += n_A_HEAD_DEF_PLUS * 4;
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		equipmentAttack += 2 * n_A_SHOULDER_DEF_PLUS;
		if(SU_STR >= 90)
			equipmentAttack += 10;
	}
	if(n_A_Equip[eq_WEAPON] == 2247)
	{// Sealed Maximum Sword [2]
		if(n_A_Weapon_ATKplus >= 7)
		{
			equipmentAttack += 65;
		}
		if(n_A_Weapon_ATKplus >= 10)
		{
			equipmentAttack += 45;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2247)
	{// Sealed Maximum Sword [2]
		if(n_A_Weapon2_ATKplus >= 7)
		{
			equipmentAttack += 65;
		}
		if(n_A_Weapon2_ATKplus >= 10)
		{
			equipmentAttack += 45;
		}
	}
	if(EquipNumSearch(2250))
	{//YSF01 Manteau
		if(n_A_SHOULDER_DEF_PLUS >= 8)
			equipmentAttack += 20;
	}
	
	if(EquipNumSearch(2315))
	{//Dog Cap + Thanatos Katar
		equipmentAttack += 20 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	
//Cards
	if(CardNumSearch(557))
	{//Faithful Manager Card
		if (  n_A_WeaponType == weapTyp_BOOK)
		{
			if(n_A_Weapon_ATKplus >= 10)
				equipmentAttack += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
			if(n_A_Weapon_ATKplus >= 14)
				equipmentAttack += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
		}
	}
	if(CardNumSearch(589))
	{//Big Eggring Card
		if(SU_STR <=50)
		{
			equipmentAttack -= 5 * Math.floor(SU_STR/10);
		}
		else
		{
			equipmentAttack -= 25;
		}
	}
	if(CardNumSearch(691))
	{//Gigantes Card
		if(SU_AGI >= 120)
			equipmentAttack += 20 * CardNumSearch(691);
	}
	if(CardNumSearch(703))
	{//General Daehyun Card
		if(n_A_WeaponType == weapTyp_SWORD || n_A_WeaponType == weapTyp_2HSWORD)
			equipmentAttack += 100 * CardNumSearch(703);
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
						equipmentAttack += 20;
					if(n_A_Weapon_ATKplus >= 14)
						equipmentAttack += 20;
				}
			}
			else
			{
				if(n_A_Weapon2Type == weapTyp_DAGGER)
				{
					if(n_A_Weapon2_ATKplus >= 10)
						equipmentAttack += 20;
					if(n_A_Weapon2_ATKplus >= 14)
						equipmentAttack += 20;
				}
			}
		}
	}
	if(CardNumSearch(812) && EquipNumSearch(121))
	{//Resentful Munak Card + Girl's Diary
		equipmentAttack += 100;
	}
	
	
	
//shadows
	if ( EquipNumSearch( 1661 ) )
	{ // "Shadow Strongman Ring"
		equipmentAttack += n_A_SHADOW_EARRING_DEF_PLUS;
	}
	if ( EquipNumSearch( 1662 ) )
	{ // "Shadow Strongman Ring"
		equipmentAttack += n_A_SHADOW_PENDANT_DEF_PLUS;
	}
	if ( EquipNumSearch( 1729 ) )// "Shadow Alchemist Armor"
	{ 
		equipmentAttack += SkillSearch(skill_AL_POTION_RESEARCH);
		if(n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack += (1+(n_A_SHADOW_BODY_DEF_PLUS - 6)) * SkillSearch(skill_AL_POTION_RESEARCH);
	}	
	if ( EquipNumSearch( 1742 ) )// "Shadow Rogue Boots"
	{ 
		equipmentAttack += SkillSearch(skill_SW_SWORD_MASTERY);
		if(n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack += (1+(n_A_SHADOW_BODY_DEF_PLUS - 6)) * SkillSearch(skill_SW_SWORD_MASTERY);
	}
	if ( EquipNumSearch( 1754 ) )// "Shadow Bard Boots"
	{ 
		equipmentAttack += SkillSearch(skill_BA_MUSIC_LESSONS);
		if(n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack += (1+(n_A_SHADOW_BODY_DEF_PLUS - 6)) * SkillSearch(skill_BA_MUSIC_LESSONS);
	}
	if ( EquipNumSearch( 1757 ) )// "Shadow Dancer Boots"
	{ 
		equipmentAttack += SkillSearch(skill_DA_DANCE_LESSONS);
		if(n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack += (1+(n_A_SHADOW_BODY_DEF_PLUS - 6)) * SkillSearch(skill_DA_DANCE_LESSONS);
	}
	if ( EquipNumSearch( 1712 ) )// "Shadow Swordsman Gloves"
	{ 
		equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if ( EquipNumSearch( 1715 ) )
	{ // "Shadow Swordsman Set"
		equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS;
	}
	if ( EquipNumSearch( 1716 ) )// "Shadow Diviner Gloves"
	{ 
		equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if( EquipNumSearch(1995) || EquipNumSearch(1996))
	{// Shadow Doram Battler Gloves ||Shadow Doram Mage Glove
		equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
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
		equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if( EquipNumSearch(2293) ) // Katra's Shadow Set
	{
		equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS;
	}
	
//Enchants
	if(EnchNumSearch( 281 ))//Special STR = 281
	{
		if(n_A_SHOULDER_DEF_PLUS >8)
		{
			equipmentAttack += 1;
		}
	}
	if(EnchNumSearch( 282 ))//Special AGI = 282
	{
		if(n_A_SHOULDER_DEF_PLUS >8)
		{
			equipmentAttack += 1;
		}
	}
// Skills
	if( SkillSearch( skill_GS_LAST_STAND ) )
	{ // LastStand
		equipmentAttack += 100;
	}
	if ( SkillSearch( skill_GS_GATLING_FEVER ) )
	{ // Gatling Fever
		if ( n_A_WeaponType === weapTyp_GATLING_GUN || n_A_WeaponType === weapTyp_NONE )
		{
			equipmentAttack += 20 + 10 * SkillSearch( skill_GS_GATLING_FEVER );
		}
	}
	if ( SkillSearch( skill_ROY_SHIELD_SPELL ) === 1 && PATCH < 2)
	{ // Shield Spell
		equipmentAttack += ItemOBJ[n_A_Equip[eq_SHIELD]][itm_DEF];
	}
	if ( SkillSearch( skill_ROY_SHIELD_SPELL ) === 3 && PATCH == 2)
	{ // Shield Spell
		equipmentAttack += 150;
	}
	if ( SkillSearch( skill_ROY_BANDING ) )
	{ // Banding ATK increase: [# of Royal Guard party members x (10 + 10 * Skill Level)]
		if(PATCH < 2)
			equipmentAttack += ( 10 + 10 * SkillSearch( skill_ROY_BANDING ) ) * SkillSearch( skill_ROY_NUM_GUARDS );
	}
	if ( SkillSearch( skill_ROY_INSPIRATION ) )
	{ 
		if(PATCH < 2)
		{
			// Inspiration [Skill Level x 40 ] + [Caster’s Job Level x 3 ]
			equipmentAttack += ( 40 * SkillSearch( skill_ROY_INSPIRATION ) ) + ( 3 * n_A_JobLV );
		}
		else if(PATCH == 2)
		{
			// Inspiration [Skill Level x 40 ]
			equipmentAttack += ( 40 * SkillSearch( skill_ROY_INSPIRATION ) );
		}
	}
	if ( performerBuffs[ksEnsemble] === ksBattleTheme && performerBuffs[ksEnsembleLevel] > 0 )
	{ // Battle Theme
		// equipmentAttack += 125 + ( 25 * performerBuffs[ksEnsembleLevel] );
		equipmentAttack += 15 + ( 5 * performerBuffs[ksEnsembleLevel] );
	}
	if ( acolyteBuffs[ksImposito] > 0 )
	{ // Imposito Manus
		equipmentAttack += acolyteBuffs[ksImposito] * 5;
	}
	if ( performerBuffs[ksChorus] === ksSaturdayNightFever &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Saturday Night Fever
		var skillBonus = performerBuffs[ksChorusLevel] * 100;
		
		equipmentAttack += skillBonus;
	}
	if ( SkillSearch( skill_GEN_CART_BOOST ) )
	{ // Cart boost
		equipmentAttack += 10 * SkillSearch( skill_GEN_CART_BOOST );
	}
	if ( SkillSearch( skill_RUN_FIGHTING_SPIRIT ) )
	{ // Asir Rune
		equipmentAttack += 70;
		equipmentAttack += SkillSearch( skill_RUN_FIGHTING_SPIRIT ) * 7;
	}
	if ( SkillSearch ( skill_REB_PLATINUM_ALTAR ))
	{
		equipmentAttack += (10 * SkillSearch ( skill_REB_PLATINUM_ALTAR )) + (SkillSearch( skill_GS_COIN_FLIP ) * 10);
	}
	if ( performerBuffs[ksMaestroSolo] === ksWindmillRush && performerBuffs[ksMaestroSoloLevel] > 0 )
	{ // Windmill Rush
		var skillBonus = performerBuffs[ksMaestroSoloLevel] * 6;
		var voiceLessonsBonus = performerBuffs[ksMaestroVoiceLessons];
		var jobLvlBonus = performerBuffs[ksMaestroJobLevel] / 5.0;

		equipmentAttack += Math.floor( skillBonus + voiceLessonsBonus + jobLvlBonus );
	}
	if ( performerBuffs[ksChorus] === ksDancesWithWargs &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Dances with Wargs
		var skillBonus = performerBuffs[ksChorusLevel] * 2;
		var performerBonus = performerBuffs[ksNumPerformers];
		
		if ( performerBonus > 7 )
		{
			performerBonus = 7;
		}

		equipmentAttack += skillBonus * performerBonus;
	}
	if ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) || acolyteBuffs[ksPPChange] > 0 )
	{ // Gentle Touch Convert: ATK [{(Caster’s DEX / 4) + (Caster’s STR / 2)} x Skill Level / 5]
		if ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) )
		{
			var dexBonus = n_A_DEX / 4.0;
			var strBonus = n_A_STR / 2.0;
			var attackBonus = Math.floor( ( dexBonus + strBonus ) * SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) / 5.0 );
			equipmentAttack += attackBonus;
		}
		else
		{
			var dexBonus = acolyteBuffs[ksSuraDexterity] / 4.0;
			var strBonus = acolyteBuffs[ksSuraStrength] / 2.0;
			equipmentAttack += Math.floor( ( dexBonus + strBonus ) * acolyteBuffs[ksPPChange] / 5.0 );
		}
	}
	
	// if (SkillSearch(skill_SUR_FLASH_COMBO)) {
	    // equipmentAttack += 40 * SkillSearch(skill_SUR_FLASH_COMBO);
	// }
	if(n_A_ActiveSkill == skill_SUR_FLASH_COMBO)
	{
		equipmentAttack += 40 * n_A_ActiveSkillLV;
	}
	if ( SkillSearch( skill_SUM_CHATTERING ) )
	{ // Chattering
		equipmentAttack += 100;
	}
	if ( SkillSearch( skill_SUM_MEOW_MEOW ) || summonerBuffs[ksMeowMeow])
	{ // Meow Meow
		equipmentAttack += 100;
	}
	//TEST
	if ( SkillSearch( skill_MS_MAXIMUM_POWER_THUST ) )
	{
		equipmentAttack += n_A_Weapon_ATK * (0.20 * SkillSearch( skill_MS_MAXIMUM_POWER_THUST ));
	}
	else
	{
		if ( SkillSearch( skill_BS_POWER_THRUST ) )
		{
			equipmentAttack += n_A_Weapon_ATK * (SkillSearch( skill_BS_POWER_THRUST ) * 0.05);
		}
		else if ( otherBuffs[ksPowerThrust] )
		{
			equipmentAttack += n_A_Weapon_ATK * 0.05;
			if (otherBuffs[ksPowerThrust] >= 3 )
			{
				equipmentAttack += n_A_Weapon_ATK * 0.05;
			}
			if (otherBuffs[ksPowerThrust] >= 5 )
			{
				equipmentAttack += n_A_Weapon_ATK * 0.05;
			}
			
		}
	}

	return equipmentAttack;
}

function CalcMasteryAtk()
{
	masteryAttack = 0;

	// weapon masteries
	if ( n_A_WeaponType == weapTyp_DAGGER || n_A_WeaponType == weapTyp_SWORD )
	{ // sword mastery/training
		masteryAttack += 4 * SkillSearch( skill_SW_SWORD_MASTERY );
		masteryAttack += 10 * SkillSearch( skill_GEN_SWORD_TRAINING );
	}
	if ( n_A_WeaponType == weapTyp_SWORDII)
	{ // two handed sword mastery
		masteryAttack += 4 * SkillSearch( skill_SW_TWO_HAND_SWORD_MASTERY );
	}
	if ( n_A_WeaponType == weapTyp_SPEAR || n_A_WeaponType == weapTyp_SPEARII )
	{ // spear mastery
		masteryAttack += 4 * SkillSearch( skill_KN_SPEAR_MASTERY );
		
		if ( SkillSearch( skill_KN_CAVALIER_MASTERY ) > 0 ||
			 SkillSearch( skill_RUN_DRAGON_TRAINING ) > 0 )
		{
			masteryAttack += SkillSearch( skill_KN_SPEAR_MASTERY );
		}
	}
	if ( n_A_WeaponType == weapTyp_AXE || n_A_WeaponType == weapTyp_AXEII )
	{ // alchemist or mechanic axe mastery
		masteryAttack += 3 *SkillSearch( skill_AL_AXE_MASTERY );
		masteryAttack += 5 * SkillSearch( skill_MEC_AXE_TRAINING );
	}
	if ( n_A_WeaponType == weapTyp_MACE )
	{ // mace mastery
		masteryAttack += 3 * SkillSearch( skill_PR_MACE_MASTERY );
		masteryAttack += 4 * SkillSearch( skill_MEC_AXE_TRAINING );
	}
	if ( n_A_WeaponType == weapTyp_KATAR)
	{ // katar mastery
		masteryAttack += 3 * SkillSearch( skill_AS_KATAR_MASTERY );
	}
	if ( n_A_WeaponType == weapTyp_BOOK)
	{ // study
		masteryAttack += 3 * SkillSearch( skill_SA_STUDY );
	}
	if ( n_A_WeaponType == weapTyp_KNUCKLE || n_A_WeaponType == weapTyp_NONE )
	{ // iron fist
		masteryAttack += 3 * SkillSearch( skill_MO_IRON_FIST );
	}
	if ( n_A_WeaponType == weapTyp_INSTRUMENT)
	{ // music lessons
		masteryAttack += 3 * SkillSearch( skill_BA_MUSIC_LESSONS );
	}
	if ( n_A_WeaponType == weapTyp_WHIP)
	{ // dance lessons
		masteryAttack += 3 * SkillSearch( skill_DA_DANCE_LESSONS );
	}
	if ( n_A_WeaponType == weapTyp_NONE && SkillSearch( skill_TK_SPRINT ) )
	{ // sprint
		masteryAttack += 10 * SkillSearch(skill_TK_SPRINT );
	}
	// if ( n_A_WeaponType !== weapTyp_NONE && SkillSearch( skill_LK_AURA_BLADE ) )
	// { // aura blade
		// masteryAttack += n_A_BaseLV * (SkillSearch( skill_LK_AURA_BLADE ) + 3);
	// }
	if ( n_A_WeaponType == weapTyp_NONE && SkillSearch( skill_TK_SPRINT ) )
	{ // sprint bonus to kicks
		if ( n_A_ActiveSkill == skill_TK_TORNADO_KICK ||
			 n_A_ActiveSkill == skill_TK_HEEL_DROP ||
			 n_A_ActiveSkill == skill_TK_ROUNDOUSE ||
			 n_A_ActiveSkill == skill_TK_COUNTER_KICK )
		{
			masteryAttack += 10 * SkillSearch(skill_TK_SPRINT);
		}
	}
	
	// Star Crumbs
	var weaponOneCrumbs = 0;
	for ( var i = 0; i < 4; i++ )
	{
		if ( n_A_card[i] === 106 )
		{
			weaponOneCrumbs++;
		}
	}
	if ( weaponOneCrumbs > 0 )
	{
		if ( weaponOneCrumbs === 1 )
		{
			masteryAttack += 5;
		}
		else if ( weaponOneCrumbs === 2 )
		{
			masteryAttack += 10;
		}
		else
		{
			masteryAttack += 40;
		}
	}
	var weaponTwoCrumbs = 0;
	for ( var i = 4; i < 8; i++ )
	{
		if ( n_A_card[i] === 106 )
		{
			weaponTwoCrumbs++;
		}
	}
	if ( weaponTwoCrumbs > 0 )
	{
		if ( weaponTwoCrumbs === 1 )
		{
			masteryAttack += 5;
		}
		else if ( weaponTwoCrumbs === 2 )
		{
			masteryAttack += 10;
		}
		else
		{
			masteryAttack += 40;
		}
	}
	
	// skill masteries
	if ( SkillSearch( skill_BS_WEAPONRY_RESEARCH ) )
	{ // weapon research
		masteryAttack += 2 * SkillSearch( skill_BS_WEAPONRY_RESEARCH );
	}
	if ( SkillSearch( skill_MEC_MAGIC_GEAR_LICENSE ) )
	{ // mado license
		masteryAttack += 15 * SkillSearch( skill_MEC_MAGIC_GEAR_LICENSE );
	}
	if ( SkillSearch( skill_MO_SUMMON_SPIRIT_SPHERE ) )
	{ // spirit spheres
		masteryAttack += 3 * SkillSearch( skill_MO_SUMMON_SPIRIT_SPHERE );
	}
	else if ( acolyteBuffs[ksSpheres] )
	{ // spirit spheres for non-monks
		masteryAttack += 3 * acolyteBuffs[ksSpheres];
	}
	if ( SkillSearch( skill_GS_COIN_FLIP ) )
	{ // Coin Flip
		masteryAttack += 3 * SkillSearch( skill_GS_COIN_FLIP );
	}
	if ( performerBuffs[ksEnsemble] === ksHarmonicLick &&
	     performerBuffs[ksEnsembleLevel] > 0 &&
	     n_A_WeaponLV === 4 )
	{ // Harmonic Lick
		//masteryAttack += 50 + 25 * performerBuffs[ksEnsembleLevel];
	}
	if(n_B[en_RACE] == race_DEMON || (90 <= n_B[en_ELEMENT] && n_B[en_ELEMENT] <= 99))
	{ // Undead 1~9
		if(SkillSearch(skill_AC_DEMON_BANE))
		{ // Demon Bane
			masteryAttack += Math.floor((3 + 5/100 * n_A_BaseLV) * SkillSearch(skill_AC_DEMON_BANE));
		}
	}
	if(n_B[en_RACE] == race_BRUTE || n_B[en_RACE] == race_INSECT)
	{ // Best Bane
		masteryAttack += 4 * SkillSearch(skill_HU_BEAST_BANE);
		if(SkillSearch(skill_HU_HUNTER_SPIRIT))
		{ // Hunter Spirit
			masteryAttack += n_A_STR;
		}
	}
	if ( n_B[en_RACE] == race_BRUTE || n_B[en_RACE] == race_PLANT || n_B[en_RACE] == race_FISH )
	{ // Ranger Main
		masteryAttack += 5 * SkillSearch( skill_RAN_RANGER_MAIN );
	}
	if ( ( n_B[en_ELEMENT] >= ( ele_EARTH * 10 ) && n_B[en_ELEMENT] <= ( ele_EARTH * 10 + 9 ) ) ||
	     ( n_B[en_ELEMENT] >= ( ele_FIRE  * 10 ) && n_B[en_ELEMENT] <= ( ele_FIRE  * 10 + 9 ) ) )
	{ // Fire and Earth Research
		masteryAttack += 10 * SkillSearch( skill_MEC_RESEARCH_FIRE_EARTH );
	}
	if ( SkillSearch( skill_RAN_CAMOUFLAGE ) )
	{ // Camouflage
		masteryAttack += 300;
	}
	
	return Math.floor( masteryAttack );
}

function CalcElementalMod( weaponElement )
{ // Elemental modifiers
	weaponElementalMod = element[n_B[en_ELEMENT]][weaponElement];
	statusElementalMod = element[n_B[en_ELEMENT]][ele_NEUTRAL];
	if ( SkillSearch( skill_HP_BASILICA ) )
	{
		n_tok[bon_DMG_ELE_UNDEAD] +=  5 * SkillSearch( skill_HP_BASILICA );
		n_tok[bon_DMG_ELE_DARK] +=  5 * SkillSearch( skill_HP_BASILICA );
	}
	if ( monsterBuffs[status_en_buff_Elemental] )
	{ // Elemental Reduction
		weaponElementalMod -= monsterBuffs[status_en_buff_Elemental];
	}
	if ( (EquipNumSearch( 1637 ) ) )
	{// "Thanatos' Dolor Hat"
		if(n_A_HEAD_DEF_PLUS < 13)
		{
			n_tok[bon_DMG_ELE_DARK] += n_A_HEAD_DEF_PLUS / 2 ;
		}
		else
		{
			n_tok[bon_DMG_ELE_DARK] += 6 ;
		}
		if(n_A_HEAD_DEF_PLUS < 13)
		{
			n_tok[bon_DMG_ELE_HOLY] += n_A_HEAD_DEF_PLUS / 2 ;
		}
		else
		{
			n_tok[bon_DMG_ELE_HOLY] += 6 ;
		}
	}
	if(CardNumSearch(552) && n_A_BODY_DEF_PLUS >=9) // Wood Goblin
	{
		n_tok[bon_DMG_ELE_WATER] += 5 ;
		n_tok[bon_DMG_ELE_EARTH] += 5 ;
	}
	for(var i = 0 ; i < 6 ; i++)
	{
		if ( EquipNumSearch( 2037 + i ) && i != 3)
		{//Armor of Sixtus (all)
			if(n_A_BODY_DEF_PLUS >= 11)
			{
				n_tok[bon_DMG_ELE_WIND] += 30;
				n_tok[bon_DMG_ELE_EARTH] += 30;
			}
		}
	}
	if ( EquipNumSearch( 2040 ) )
	{//Armor of Sixtus the Wise
		if(n_A_BODY_DEF_PLUS >= 11)
		{
			n_tok[bon_MDMG_ELE_WIND] += 30;
			n_tok[bon_MDMG_ELE_EARTH] += 30;
		}
	}
	if(EquipNumSearch(2075) && n_A_Weapon_ATKplus >= 11)
	{//Four Mirrors
		n_tok[bon_DMG_ELE_FIRE] += 15;
		n_tok[bon_DMG_ELE_DARK] += 15;
	}
	// Card Bonuses
	if (not_use_card != 1)
		weaponElementalMod += n_tok[bon_DMG_ELE_NEUTRAL + Math.floor( n_B[en_ELEMENT] / 10 )];
}

// phyisical and magical calculated, only physical saved out.
function CalcRacialMod()
{ 
	racialMod = 0;
	
	// Racial bonuses
	if ( n_A_Arrow == arrTyp_HOLY )
	{
		n_tok[bon_DMG_RC_DEMON] += 5;
	}
	if ( SkillSearch( skill_SA_DRAGONOLOGY ) )
	{
		n_tok[bon_DMG_RC_DRAGON] += SkillSearch( skill_SA_DRAGONOLOGY ) * 4;
	}
	if ( EquipNumSearch( 1335 ) && n_A_HEAD_DEF_PLUS >= 5 )
	{ // Cat Ear Beret
		for ( var i = 5; i <= 12; i++ )
		{ // bonus is applied for levels 5-12
			if ( i <= n_A_HEAD_DEF_PLUS )
			{
				n_tok[bon_DMG_RC_DEMI_HUMAN] += 2;
			}
		}
	}
	if(EquipNumSearch(2057))
	{
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_tok[bon_DMG_RC_DEMI_HUMAN] += 15;
			n_tok[bon_DMG_RC_BRUTE] += 15;
		}
		if(n_A_Weapon_ATKplus >= 11)
		{
			n_tok[bon_DMG_RC_DEMI_HUMAN] += 20;
			n_tok[bon_DMG_RC_BRUTE] += 20;
		}
	}
	for(var i = 0 ; i < 6 ; i++)
	{
		if ( EquipNumSearch( 2037 + i ) && i != 3)
		{//Armor of Sixtus (all)
			if(n_A_BODY_DEF_PLUS >= 7)
			{
				n_tok[bon_DEFIGN_RC_BRUTE] += 30;
				n_tok[bon_DEFIGN_RC_DEMON] += 30;
			}
			if(n_A_BODY_DEF_PLUS >= 9)
			{
				n_tok[bon_DMG_RC_BRUTE] += 30;
				n_tok[bon_DMG_RC_DEMON] += 30;
			}
		}
		if ( EquipNumSearch( 2043 + i ) && i != 3)
		{//Armor of Sixtus Set (all)
			if((n_A_BODY_DEF_PLUS + n_A_SHOES_DEF_PLUS) >= 21)
			{
				n_tok[bon_DEFIGN_RC_BRUTE] += 20;
				n_tok[bon_DEFIGN_RC_DEMON] += 20;
			}
		}
	}
	if( EquipNumSearch(2305) || //Guillotine Cross set
		EquipNumSearch(2307) || //Ranger set
		EquipNumSearch(2313) )  //Wanderer Set
	{
		n_tok[bon_DEFIGN_RC_ALL] += n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS;
	}
	if( EquipNumSearch(2306) || //Arch Bishop set
		EquipNumSearch(2308) || //Royal Guard set
		EquipNumSearch(2310) || //Sorcerer set
		EquipNumSearch(2311) || //Shadow Chaser set
		EquipNumSearch(2312) )  //Warlock set
	{
		n_tok[bon_MDEFIGN_RC_ALL] += n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS;
	}
	if(EquipNumSearch(2075) && n_A_Weapon_ATKplus >= 11)
	{//Four Mirrors
		n_tok[bon_DMG_RC_UNDEAD] += 20;
		n_tok[bon_DMG_RC_DEMON] += 20;
	}
	if( EquipNumSearch(2078) && n_A_Weapon_ATKplus >= 11)   
	{//Demon's Shot
		n_tok[bon_DMG_RC_UNDEAD] += 15;
		n_tok[bon_DMG_RC_DEMON] += 15;
	}
	if(EquipNumSearch(2142) || 
	   EquipNumSearch(2143) || 
	   EquipNumSearch(2144) || 
	   EquipNumSearch(2145) || 
	   EquipNumSearch(2146) || 
	   EquipNumSearch(2147) ) 
	{//Chronocloak (all)
		if(n_A_SHOULDER_DEF_PLUS >= 9)
		{
			n_tok[bon_DEFIGN_RC_BRUTE] += 20;
			n_tok[bon_DEFIGN_RC_DEMON] += 20;
		}
		if(n_A_SHOULDER_DEF_PLUS >= 11)
		{
			n_tok[bon_DEFIGN_RC_BRUTE] += 10;
			n_tok[bon_DEFIGN_RC_DEMON] += 10;
		}
	}
	if(EquipNumSearch(2148) || 
	   EquipNumSearch(2149) || 
	   EquipNumSearch(2150) || 
	   EquipNumSearch(2151) || 
	   EquipNumSearch(2152) || 
	   EquipNumSearch(2153) ) 
	{//Chronocloak + Temporal Boots Sets (all)
		if(n_A_SHOES_DEF_PLUS >= 10)
		{
			n_tok[bon_DEFIGN_RC_BRUTE] += 30;
			n_tok[bon_DEFIGN_RC_DEMON] += 30;
		}
	}
	if( EquipNumSearch(2210) )   
	{// Abusive Robe
		n_tok[bon_DEFIGN_RC_DEMI_HUMAN] += 4 * n_A_BODY_DEF_PLUS;
		n_tok[bon_DEFIGN_RC_DEMON] += 4 * n_A_BODY_DEF_PLUS;
		n_tok[bon_DEFIGN_RC_UNDEAD] += 4 * n_A_BODY_DEF_PLUS;
	}
	
// Magical
	if ( EquipNumSearch( 1250 ) && n_A_HEAD_DEF_PLUS >= 5 )
	{ // Red Pom Hat
		n_tok[bon_MDMG_RC_DEMI_HUMAN] += n_A_HEAD_DEF_PLUS * 2;
	}
	if ( EquipNumSearch( 1666 ) &&  n_A_HEAD_DEF_PLUS >= 6 )
	{// "Headband Beret"
		n_tok[bon_MDMG_RC_DEMI_HUMAN] += n_A_HEAD_DEF_PLUS - 5;
	}
	if ( EquipNumSearch( 2040 ) )
	{//Armor of Sixtus the Wise
		if(n_A_BODY_DEF_PLUS >= 9)
		{
			n_tok[bon_MDMG_RC_BRUTE] += 30;
			n_tok[bon_MDMG_RC_DEMON] += 30;
		}
	}
	//GLORIOUS WEAPONS
	if ( (EquipNumSearch( 1076 ) || EquipNumSearch( 1077 ) || EquipNumSearch( 1081 ) ||
		  EquipNumSearch( 1082 ) || EquipNumSearch( 1086 ) || EquipNumSearch( 1088 ) ||
		  EquipNumSearch( 1089 ) || EquipNumSearch( 1090 ) || EquipNumSearch( 1091 ) ||
		  EquipNumSearch( 1092 ) || EquipNumSearch( 1093 ) || EquipNumSearch( 1094 ) ||
		  EquipNumSearch( 1096 ) || EquipNumSearch( 1097 ) || EquipNumSearch( 1100 ) ||
		  EquipNumSearch( 1101 ) || EquipNumSearch( 1102 ) || EquipNumSearch( 1103 )) && n_A_Weapon_ATKplus >= 6 ) {
		n_tok[bon_DMG_RC_DEMI_HUMAN] += Math.pow(Math.min(10, n_A_Weapon_ATKplus-4), 2);
	}
	if ( (EquipNumSearch( 1080 ) || EquipNumSearch( 1087 ) || EquipNumSearch( 1098 )) && n_A_Weapon_ATKplus >= 6 ) {
		n_tok[bon_DMG_RC_DEMI_HUMAN] += Math.pow(Math.min(10, n_A_Weapon_ATKplus-3), 2);
	}
	if ( (EquipNumSearch( 1637 ) ) )
	{// "Thanatos' Dolor Hat"
		if(n_A_HEAD_DEF_PLUS < 13)
		{
			n_tok[bon_DMG_RC_ANGEL] += n_A_HEAD_DEF_PLUS / 2 ;
		}
		else
		{
			n_tok[bon_DMG_RC_ANGEL] += 6 ;
		}
		if(n_A_HEAD_DEF_PLUS < 13)
		{
			n_tok[bon_DMG_RC_DRAGON] += n_A_HEAD_DEF_PLUS / 2 ;
		}
		else
		{
			n_tok[bon_DMG_RC_DRAGON] += 6 ;
		}
	}
	
//Shadows
	if ( EquipNumSearch( 1673 ) )
	{ // "Shadow Dragonslayer Boots"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) { n_tok[bon_DMG_RC_DRAGON] += 1; }
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) { n_tok[bon_DMG_RC_DRAGON] += 3; }
	}
	if ( EquipNumSearch( 1676 ) )
	{ // "Shadow Undertaker Boots"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) { n_tok[bon_DMG_RC_UNDEAD] += 1; }
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) { n_tok[bon_DMG_RC_UNDEAD] += 3; }
	}
	if ( EquipNumSearch( 1679 ) )
	{ // "Shadow Tamer Boots"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) { n_tok[bon_DMG_RC_BRUTE] += 1; }
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) { n_tok[bon_DMG_RC_BRUTE] += 3; }
	}
//Cards
	if ( CardNumSearch( 711 ) )
	{ // "Piranha Card"
		if (n_A_SHOES_DEF_PLUS >= 9) { n_tok[bon_DMG_RC_FISH] += 5; }
	}
	
	if (not_use_card == 1)
		racialMod = 0;
	else
		racialMod = n_tok[bon_DMG_RC_FORMLESS + n_B[en_RACE]];
	if ( monsterBuffs[status_en_buff_Race] )
	{ // Race Reduction
		racialMod -= monsterBuffs[status_en_buff_Race];
	}
}

function CalcSpecialRacialMod()
{
	specialRacialMod = 0;
	
	if ( ( n_B[en_ID] >= 108 && n_B[en_ID] <= 115 ) || n_B[en_ID] === 319 )
	{ // Goblins
		specialRacialMod = n_tok[bon_DMG_GOBLIN];
	}
	if ( n_B[en_ID] >= 116 && n_B[en_ID] <= 120 )
	{ // Kobolds
		specialRacialMod = n_tok[bon_DMG_KOBOLD];
	}
	if ( ( n_B[en_ID] >= 49 && n_B[en_ID] <= 52 ) || n_B[en_ID] === 55 || n_B[en_ID] === 221 )
	{ // Orc
		specialRacialMod = n_tok[bon_DMG_ORC];
	}
	if ( n_B[en_ID] === 106 || n_B[en_ID] === 152 ||
		 n_B[en_ID] === 308 || n_B[en_ID] === 32  ||
		 n_B[en_ID] === 541 )
	{ // Golem
		specialRacialMod = n_tok[bon_DMG_GOLEM];
	}
	if (n_B[en_ID] >= 549 && n_B[en_ID] <= 557)
	{
		specialRacialMod = n_tok[bon_DMG_SCARABA];
	}
}

function CalcSizeMod()
{
	sizeMod = 0;
	
	if ( EquipNumSearch( 1487 ) || EquipNumSearch( 1488 ) )
	{ // "RWC Memory Knife or RWC Memory Mace"
		if (n_A_Weapon_ATKplus >= 6) { n_tok[bon_DMG_SIZ_SMALL] += 5; n_tok[bon_DMG_SIZ_MEDIUM] += 5; n_tok[bon_DMG_SIZ_LARGE] += 5; }
		if (n_A_Weapon_ATKplus >= 9) { n_tok[bon_DMG_SIZ_SMALL] += 5; n_tok[bon_DMG_SIZ_MEDIUM] += 5; n_tok[bon_DMG_SIZ_LARGE] += 5; }
	}
	if(EquipNumSearch(2067) && n_A_Weapon_ATKplus >= 11) //Avenger
	{
		n_tok[bon_DMG_SIZ_SMALL] += 15; 
		n_tok[bon_DMG_SIZ_MEDIUM] += 15; 
		n_tok[bon_DMG_SIZ_LARGE] += 15;
	}
	if(EquipNumSearch(2142) ||// "Chronocloak of Strength"
	   EquipNumSearch(2143) )  // "Chronocloak of Agility"
	{
		n_tok[bon_DMG_SIZ_SMALL] += 5 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4); 
		n_tok[bon_DMG_SIZ_MEDIUM] += 5 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4); 
		n_tok[bon_DMG_SIZ_LARGE] += 5 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4);
	}
//Shadows
	if ( EquipNumSearch( 1726 ) )
	{ // "Shadow Blacksmith Armor"
		if( SkillSearch( skill_BS_WEAPON_PERFECTION ) )
		{
			n_tok[bon_DMG_SIZ_SMALL] += 5; 
			n_tok[bon_DMG_SIZ_MEDIUM] += 5; 
			n_tok[bon_DMG_SIZ_LARGE] += 5;
			if(n_A_SHADOW_BODY_DEF_PLUS > 6)
			{
				n_tok[bon_DMG_SIZ_SMALL] += n_A_SHADOW_BODY_DEF_PLUS - 6; 
				n_tok[bon_DMG_SIZ_MEDIUM] += n_A_SHADOW_BODY_DEF_PLUS - 6; 
				n_tok[bon_DMG_SIZ_LARGE] += n_A_SHADOW_BODY_DEF_PLUS - 6;
			}
		}
	}
	if( EquipNumSearch(2256) )
	{// Tiger Spirit Shadow Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7)
		{
			n_tok[bon_DMG_SIZ_SMALL] += 3; 
			n_tok[bon_DMG_SIZ_MEDIUM] += 3; 
			n_tok[bon_DMG_SIZ_LARGE] += 3;
		}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9)
		{
			n_tok[bon_DMG_SIZ_SMALL] += 4; 
			n_tok[bon_DMG_SIZ_MEDIUM] += 4; 
			n_tok[bon_DMG_SIZ_LARGE] += 4;
		}
	}
	if( EquipNumSearch(2269) || EquipNumSearch(2278) )
	{// Katra's Shadow Ring || Boscard's Shadow Ring
		n_tok[bon_DMG_SIZ_SMALL] += Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2); 
		n_tok[bon_DMG_SIZ_MEDIUM] += Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2); 
		n_tok[bon_DMG_SIZ_LARGE] += Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2);
	}
	if( EquipNumSearch(2271) )
	{// Rondius' Shadow Ring
		n_tok[bon_DMG_SIZ_SMALL] += 2 * Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2); 
		n_tok[bon_DMG_SIZ_MEDIUM] += 2 * Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2); 
		n_tok[bon_DMG_SIZ_LARGE] += 2 * Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2);
	}
	sizeMod = n_tok[bon_DMG_SIZ_SMALL + n_B[en_SIZE]];
	if ( monsterBuffs[status_en_buff_Size] )
	{ // Size Reduction
		sizeMod -= monsterBuffs[status_en_buff_Size];
	}
}

function CalcBossMod()
{
	bossMod = 0;
	
	if ( SU_STR >= 120 && EquipNumSearch( 348 ) )
	{ // Megingjard
		n_tok[bon_DMG_BOSS] += 10;
	}
	if(EquipNumSearch(1513))
	{//Lord of the Dead Helm
		if (n_A_HEAD_DEF_PLUS >= 5) 
			n_tok[bon_DMG_BOSS] += n_A_HEAD_DEF_PLUS-5;
		if (CardNumSearch(31)) 
			n_tok[bon_DMG_BOSS] += 5;
	}
	if(EquipNumSearch(1569))
	{//Warlock King's Crown
		if (CardNumSearch(31)) 
			n_tok[bon_DMG_BOSS] += 5;
	}
	if( EquipNumSearch(2078) && n_A_Weapon_ATKplus >= 7)   
	{//Demon's Shot
		n_tok[bon_DMG_BOSS] += 10;
	}
	
	if ( n_B[en_BOSS] === 1 )
	{
		bossMod = n_tok[bon_DMG_BOSS];
	}
}

function CalcAttackMod()
{
	// Attack Mod is physical mod *
	attackMod = 1;
	
// Equipment
	if ( n_A_JobSearch2() === cls_ROG && CardNumSearch( 479 ) )
	{ // Byrogue Card
		n_tok[bon_PHY_ATK] += 10;
	}
	if ( EquipNumSearch( 1401 ) && n_A_JobSearch2()==cls_SWO || n_A_JobSearch2()==cls_THI || n_A_JobSearch2()==cls_MER ) {
		n_tok[bon_PHY_ATK] += 8;
	}
	if ( EquipNumSearch( 992 ) &&
		 ( EquipNumSearch( 616 ) ||
		   EquipNumSearch( 617 ) ||
		   EquipNumSearch( 618 ) ) )
	{ // Tournament Shield with Long Horn/Battle Hook/Hunting Spear
		n_tok[bon_PHY_ATK] += 4;
	}
	if ( n_A_Weapon_ATKplus >= 9 && EquipNumSearch( 1101 ) )
	{ // Glorious Gatling Gun
		n_tok[bon_PHY_ATK] += n_A_Weapon_ATKplus;
	}
	if ( EquipNumSearch( 565 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Dress Hat
		n_tok[bon_PHY_ATK] += 1;
	}
	if ( EquipNumSearch( 1214 ) )
	{ // Red Wing Hat
		if ( n_A_HEAD_DEF_PLUS >= 7 )
		{
			n_tok[bon_PHY_ATK] += 2;
		}
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			n_tok[bon_PHY_ATK] += 2;
		}
	}
	if ( EquipNumSearch( 1342 ) && n_A_HEAD_DEF_PLUS >= 9 )
	{ // Libra Diadem
		n_tok[bon_PHY_ATK] += 3;
	}
	if(EquipNumSearch(1514))
	{//Evil Marching Hat
		if (n_A_HEAD_DEF_PLUS >= 9) n_tok[bon_PHY_ATK] += 5;
	}
	if ( (EquipNumSearch( 1637 ) ) )
	{// "Thanatos' Dolor Hat"
		if(n_A_HEAD_DEF_PLUS > 6)
		{
			n_tok[bon_PHY_ATK] += 5;
		}
	}
	if(EquipNumSearch(1682))
	{ //"Officer's Cap"
		if(n_A_HEAD_DEF_PLUS > 6)
		{
			n_tok[bon_PHY_ATK] += 5;
		}
	}
	if(EquipNumSearch(1681))
	{ //"Amistr Hat"
		if(n_A_HEAD_DEF_PLUS >= 11) { n_tok[bon_PHY_ATK] += 5;}	
	}
	if(EquipNumSearch(1702) || EquipNumSearch(1860) || EquipNumSearch(1942))
	{ //"Dog Cap"        or    "Feathered Tricorn"   or   General's Helmet
		if(n_A_HEAD_DEF_PLUS >= 9)
			n_tok[bon_PHY_ATK] += 5;
	}
	if ( EquipNumSearch( 1792 ) )
	{//Str Glove
		if(SU_STR >= 110)
			n_tok[bon_PHY_ATK] += 1 * EquipNumSearch( 1792 );
	}
	if ( EquipNumSearch( 2028 ) )
	{//Supplement Part Str
			n_tok[bon_PHY_ATK] += Math.floor(n_A_BODY_DEF_PLUS / 4);
	}
	if ( EquipNumSearch( 2037 ) )
	{//Armor of Sixtus the Mighty
			n_tok[bon_PHY_ATK] += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
	}
	if(EquipNumSearch(2084)) //Kagero & Oboro Dual Dagger Set
	{
		n_tok[bon_PHY_ATK] += 2 * Math.floor((n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 5);
	}
	if(EquipNumSearch(2079) && n_A_Weapon_ATKplus >= 7)
	{//Crimson Rose
		n_tok[bon_PHY_ATK] += 5;
	}
	if(EquipNumSearch(2083))
	{//Meowmeow Foxtail
		n_tok[bon_PHY_ATK] += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(2120) || // "Evil Slayer Stabber Dagger"
	   EquipNumSearch(2121) || // "Evil Slayer Destroyer Hammer"
	   EquipNumSearch(2122) || // "Evil Slayer Piercer Bow"
	   EquipNumSearch(2123) || // "Evil Slayer Sword"
	   EquipNumSearch(2124) )  // "Evil Slayer Ripper Katar"
	{
		if(n_A_Weapon_ATKplus >= 7)
			n_tok[bon_PHY_ATK] += 5;
		if(n_A_Weapon_ATKplus >= 9)
			n_tok[bon_PHY_ATK] += 7;
	}
	if(EquipNumSearch(2142))
	{// "Chronocloak of Strength"
		n_tok[bon_PHY_ATK] += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if(EquipNumSearch(2142) || // "Chronocloak of Strength"
	   EquipNumSearch(2143) || // "Chronocloak of Agility"
	   EquipNumSearch(2144) || // "Chronocloak of Vitality"
	   EquipNumSearch(2146) || // "Chronocloak of Dexterity"
	   EquipNumSearch(2147) )  // "Chronocloak of Luck"
	{
		if(n_A_SHOULDER_DEF_PLUS >= 7)
			n_tok[bon_PHY_ATK] += 7;
	}
	if(EquipNumSearch(2160) || //Lindy Hop
	   EquipNumSearch(2179) )  //Juliette D Rachel
	{
		n_tok[bon_PHY_ATK] += Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(2212))
	{// Abusive Robe + Valkyrie Manteau
		n_tok[bon_PHY_ATK] += n_A_BODY_DEF_PLUS;
	}
	if(EquipNumSearch(2249))
	{//YSF01 Plate
		if(n_A_BODY_DEF_PLUS >= 8)
			n_tok[bon_PHY_ATK] += 5;
		if(n_A_BODY_DEF_PLUS >= 11)
			n_tok[bon_PHY_ATK] += 2;
		if(n_A_BODY_DEF_PLUS >= 13)
			n_tok[bon_PHY_ATK] += 4;
		if(SU_STR >= 125)
			n_tok[bon_PHY_ATK] += n_A_BODY_DEF_PLUS;
			
	}
	
//shadows
	if ( EquipNumSearch( 1660 ) )
	{ // "Shadow Strongman Gloves"
		n_tok[bon_PHY_ATK] += Math.floor(n_A_SHADOW_WEAPON_DEF_PLUS/2);
	}
	if ( EquipNumSearch( 1661 ) )
	{ // "Shadow Strongman Ring"
		if(n_A_SHADOW_EARRING_DEF_PLUS >= 9) { n_tok[bon_PHY_ATK] += 1;}
	}
	if ( EquipNumSearch( 1662 ) )
	{ // "Shadow Strongman Pendant"
		if(n_A_SHADOW_PENDANT_DEF_PLUS >= 9) { n_tok[bon_PHY_ATK] += 1;}
	}
	if ( EquipNumSearch( 1663 ) )
	{ // "Shadow Strongman Set"
		if ((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS) >= 20) { n_tok[bon_PHY_ATK] += 1; }
		if ((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS) >= 25) { n_tok[bon_PHY_ATK] += 1; }
	}
	if ( EquipNumSearch( 1712 ) )
	{ // "Shadow Swordsman Gloves"
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7)
		{
			n_tok[bon_PHY_ATK] += 1;
		}
	}
	if ( EquipNumSearch( 1715 ) )
	{ // "Shadow Swordsman Set"
		if((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS) >= 23)
		{
			n_tok[bon_PHY_ATK] += 1;
		}
	}
	if ( EquipNumSearch(1823) || EquipNumSearch(1824) )
	{ // Shadow Taekwon  Shield or Shadow Super Novice Shield
		if(n_A_SHADOW_SHIELD_DEF_PLUS >=7){n_tok[bon_PHY_ATK] += 2;}
		if(n_A_SHADOW_SHIELD_DEF_PLUS >=9){n_tok[bon_PHY_ATK] += 3;}
	}
	if ( EquipNumSearch(1839) )
	{ // Shadow Ninja Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >=7){n_tok[bon_PHY_ATK] += 3;}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >=9){n_tok[bon_PHY_ATK] += 4;}
	}
	if ( EquipNumSearch(1840) )
	{ // Shadow Taekwon Gloves
		n_tok[bon_PHY_ATK] += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	
//enchants
	if(EnchNumSearch( 1391 ))
	{//Rune of Strength 1
		if(n_A_BODY_DEF_PLUS >= 10)
			n_tok[bon_PHY_ATK] += 5;
	}
	if(EnchNumSearch( 1392 ))
	{//Rune of Strength 2
		if(n_A_BODY_DEF_PLUS >= 11)
			n_tok[bon_PHY_ATK] += 7;
	}
	if(EnchNumSearch( 1393 ))
	{//Rune of Strength 3
		if(n_A_BODY_DEF_PLUS >= 12)
			n_tok[bon_PHY_ATK] += 8;
		if(n_A_BODY_DEF_PLUS >= 13)
			n_tok[bon_PHY_ATK] += 2;
	}
	
	
//items
	if ( usableItems[ksArchmagePotion] )
	{
		n_tok[bon_PHY_ATK] += 1;
	}
	
//Cards
	if(CardNumSearch(583))
	{//Champion Card
		if(SU_AGI >= 110)
			n_tok[bon_PHY_ATK] += 7;
	}
	
	if((CardNumSearch(742) && (n_A_JOB == cls_SUR || n_A_JOB == cls_SURt)) || //Sura Chen Card
	   (CardNumSearch(749) && (n_A_JOB == cls_ROY || n_A_JOB == cls_ROYt)) )  //Royal Guard Randel Card
	{
		n_tok[bon_PHY_ATK] += 10;
	}
	
	if((CardNumSearch(743) && (n_A_JOB == cls_GLT || n_A_JOB == cls_GLTt)) || //Guillotine Cross Eremes Card
	   (CardNumSearch(744) && (n_A_JOB == cls_GEN || n_A_JOB == cls_GENt)) || //Geneticist Flamel Card
	   (CardNumSearch(746) && (n_A_JOB == cls_MEC || n_A_JOB == cls_MECt)) || //Mechanic Howard Card
	   (CardNumSearch(750) && (n_A_JOB == cls_RUN || n_A_JOB == cls_RUNt)) )  //Rune Knight Seyren Card
	{
		n_tok[bon_PHY_ATK] += 15;
	}
	
	if(CardNumSearch(745) && (n_A_JOB == cls_SHA || n_A_JOB == cls_SHAt))
	{//Shadow Chaser Gertie Card
		n_tok[bon_PHY_ATK] += 5;
	}
	if(CardNumSearch(751) && (n_A_JOB == cls_RAN || n_A_JOB == cls_RANt))
	{//Ranger Cecil Card
		if(n_A_WeaponType == weapTyp_BOW)
			n_tok[bon_PHY_ATK] += 15;
	}
	
	if(CardNumSearch(828) && EquipNumSearch(2393))
	{//Restless Dead Card + Vampire's Familiar [1]
		n_tok[bon_PHY_ATK] += Math.floor(n_A_BODY_DEF_PLUS / 3);
	}
	
	attackMod *= ( 100 + n_tok[bon_PHY_ATK] ) / 100;
	
	var cardnEquipBonus = StPlusCalc2( bon_DMG_MONSTER+n_B[en_ID] ) + StPlusCard( bon_DMG_MONSTER+n_B[en_ID] );
	attackMod *= ( 100 + cardnEquipBonus ) / 100;
		
// Skills
	if ( SkillSearch( skill_LK_FRENZY ) )
	{
		attackMod *= 2;
	}		
	if ( n_A_WeaponType === weapTyp_KATAR && SkillSearch( skill_AX_ADVANCED_KATAR_MASTERY ) )
	{
		attackMod *= ( 110 + 2 * SkillSearch( skill_AX_ADVANCED_KATAR_MASTERY ) ) / 100;
	}
	if(SkillSearch(skill_SUM_BUNCH_OF_SHRIMP) || summonerBuffs[ksBunchOfShrimp])
	{
		attackMod += 0.1;
	}
	//TEST
	// if ( SkillSearch( skill_MS_MAXIMUM_POWER_THUST ) )
	// {
		// attackMod += 0.20 * SkillSearch( skill_MS_MAXIMUM_POWER_THUST );
	// }
	// else
	// {
		// if ( SkillSearch( skill_BS_POWER_THRUST ) )
		// {
			// attackMod += SkillSearch( skill_BS_POWER_THRUST ) * 0.05;
		// }
		// else if ( otherBuffs[ksPowerThrust] )
		// {
			// attackMod += 0.05;
			// if (otherBuffs[ksPowerThrust] >= 3 )
			// {
				// attackMod += 0.05;
			// }
			// if (otherBuffs[ksPowerThrust] >= 5 )
			// {
				// attackMod += 0.05;
			// }
			
		// }
	// }
	
	var multiplier = 0;
	if ( SkillSearch(skill_TKM_STELLAR_WRATH) && SkillSearch(skill_TKM_SOLAR_LUNAR_AND_STELLAR_MIRACLE ) )
	{
		multiplier = ( n_A_BaseLV + n_A_STR + n_A_LUK + n_A_DEX ) / ( 12 - SkillSearch( skill_TKM_STELLAR_WRATH ) * 3 );
	}
	else if ( SkillSearch( skill_TKM_STELLAR_WRATH ) && n_B[en_SIZE] == 2 && n_B[en_HP] >= 17392 )
	{
		multiplier = ( n_A_BaseLV + n_A_STR + n_A_LUK + n_A_DEX ) / ( 12 - SkillSearch( skill_TKM_STELLAR_WRATH ) * 3 );
	}
	else if ( SkillSearch( skill_TKM_SOLAR_WRATH ) && n_B[en_SIZE] == 0 )
	{
		multiplier = ( n_A_BaseLV + n_A_LUK + n_A_DEX ) / ( 12 - SkillSearch( skill_TKM_SOLAR_WRATH ) * 3 );
	}
	else if ( SkillSearch( skill_TKM_LUNAR_WRATH ) && n_B[en_SIZE] == 1 && n_B[en_HP] >= 5218 )
	{
		multiplier = ( n_A_BaseLV + n_A_LUK + n_A_DEX ) / ( 12 - SkillSearch( skill_TKM_LUNAR_WRATH ) * 3 );
	}
	else if ( SkillSearch( skill_REB_HIT_BARREL ) )
	{
		multiplier = (6 + (SkillSearch( skill_REB_HIT_BARREL ) * 2)) * SkillSearch( skill_GS_COIN_FLIP); 
	}
	// }
	if( SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL) && SkillSearch(skill_KAG_GET_ELEMENTAL_SEAL) == ele_EARTH )
	{
		multiplier = 15 *  SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
	}
	
	attackMod *= ( 100 + multiplier ) / 100;
}

function CalcCriticalMod()
{
	criticalMod = 0;
	
	// Critical
	
//Equipment
	if ( EquipNumSearch( 1089 ) )
	{ // Glorious Hunter Bow
		n_tok[bon_DMG_CRIT] += ( 2 * n_A_Weapon_ATKplus );
	}
	if ( EquipNumSearch( 1305 ) && n_A_Arrow == arrTyp_SHARP )
	{ // Little Feather Hat + Sharp Arrows
		n_tok[bon_DMG_CRIT] += 5;
		if ( n_A_HEAD_DEF_PLUS >= 7 )
		{
			n_tok[bon_DMG_CRIT] += 5;
		}
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if ( SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 7) { n_tok[bon_DMG_CRIT] += 10; }
		if ( SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { n_tok[bon_DMG_CRIT] += 5; }
	}
	if ( EquipNumSearch( 1583 ) )
	{ //Golden Angel Wing
		if ( SU_LUK >= 90 ) { n_tok[bon_DMG_CRIT] += 5; }
		if ( SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { n_tok[bon_DMG_CRIT] += 5; }
	}
	if ( EquipNumSearch( 1584 ) )
	{ //Golden Angel Hairband
		if ( SU_LUK >= 70 ) { n_tok[bon_DMG_CRIT] += 2; }
		if ( SU_LUK >= 70 && n_A_HEAD_DEF_PLUS >= 7) { n_tok[bon_DMG_CRIT] += 3; }
	}
	if(EquipNumSearch(1545))
	{ //Fallen Angel Wing
		n_tok[bon_DMG_CRIT] += Math.floor(SU_LUK/20);
	}
	if(EquipNumSearch(1702))
	{ //"Dog Cap"
		if(n_A_HEAD_DEF_PLUS >= 11)
			n_tok[bon_DMG_CRIT] += 3;
	}
	if ( EquipNumSearch( 1797 ) )
	{//LUK Glove
		if(SU_LUK >= 110)
			n_tok[bon_DMG_CRIT] += 1 * EquipNumSearch( 1797 );
	}
	if(EquipNumSearch(1942))
	{ //"General's Helmet"
		if(n_A_HEAD_DEF_PLUS >= 11)
			n_tok[bon_DMG_CRIT] += 15;
	}
	if(EquipNumSearch(2202) || EquipNumSearch(1957))  //Luk Boots
	{
		n_tok[bon_DMG_CRIT] += 2 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
		if(SU_LUK >= 120)
			n_tok[bon_DMG_CRIT] += 30;
	}
	if(EquipNumSearch(1951))  //Luk Boots Slot
	{
		n_tok[bon_DMG_CRIT] += 2 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
		if(SU_LUK >= 120)
			n_tok[bon_DMG_CRIT] += 20;
	}
	if( EquipNumSearch(2021) )
	{//Gigant Blade 
		n_tok[bon_DMG_CRIT] += n_A_Weapon_ATKplus;
	}
	if ( EquipNumSearch( 2042 ) )
	{//Armor of Sixtus the Lucky
		n_tok[bon_DMG_CRIT] += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
	}
	if(EquipNumSearch(2057))
	{//Hand of Death
		n_tok[bon_DMG_CRIT] += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(2079) && n_A_Weapon_ATKplus >= 9)
	{//Crimson Rose
		n_tok[bon_DMG_CRIT] += 20;
	}
	if(EquipNumSearch(2143) || // "Chronocloak of Agility"
	   EquipNumSearch(2147) )  // "Chronocloak of Luck"
	{
		n_tok[bon_DMG_CRIT] += 3 * Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if(EquipNumSearch(2146) )
	{// "Chronocloak of Dexterity"
		n_tok[bon_DMG_CRIT] += 3 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4);
	}
	if(EquipNumSearch(2227) )  // Old Bone Circlet [1]
	{
		n_tok[bon_DMG_CRIT] += n_A_HEAD_DEF_PLUS;
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		n_tok[bon_DMG_CRIT] +=  n_A_SHOULDER_DEF_PLUS;
		if(SU_LUK >= 90)
			n_tok[bon_DMG_CRIT] += 15;
	}
	if(EquipNumSearch(2251))
	{//YSF01 Greave
		if(n_A_SHOES_DEF_PLUS >= 13)
			n_tok[bon_DMG_CRIT] += 10;
		if(SU_LUK >= 125)
			n_tok[bon_DMG_CRIT] += 30;
	}
	if(EquipNumSearch(2390))
	{// Illusion Skull Ring + Illusion Book of the Apocalypse
		n_tok[bon_DMG_CRIT] += 5 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	
//Enchants
	if(EnchNumSearch( 1406 ))
	{//Rune of Luck 1
		if(n_A_BODY_DEF_PLUS >= 10)
			n_tok[bon_DMG_CRIT] += 5;
	}
	if(EnchNumSearch( 1407 ))
	{//Rune of Luck 2
		if(n_A_BODY_DEF_PLUS >= 11)
			n_tok[bon_DMG_CRIT] += 7;
	}
	if(EnchNumSearch( 1408 ))
	{//Rune of Luck 3
		if(n_A_BODY_DEF_PLUS >= 12)
			n_tok[bon_DMG_CRIT] += 8;
		if(n_A_BODY_DEF_PLUS >= 13)
			n_tok[bon_DMG_CRIT] += 6;
	}

//Shadow
	if( EquipNumSearch(1825))
	{//Shadow Gunslinger Shield
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 7){n_tok[bon_DMG_CRIT] += 2;}
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 9){n_tok[bon_DMG_CRIT] += 3;}
	}
	if( EquipNumSearch(2281))
	{//Katra's Shadow Pendant
		n_tok[bon_DMG_CRIT] += Math.floor(n_A_SHADOW_PENDANT_DEF_PLUS / 2);
	}
	
//Cards
	if(CardNumSearch(562))
	{//Petal Card
		n_tok[bon_DMG_CRIT] += Math.floor(SU_LUK/10) * 2;
	}
	if(CardNumSearch(589))
	{//Big Eggring Card
		if(SU_LUK <=50)
		{
			n_tok[bon_DMG_CRIT] -= 2 * Math.floor(SU_LUK/10);
		}
		else
		{
			n_tok[bon_DMG_CRIT] -= 10;
		}
	}
	if ( CardNumSearch( 635 ))
	{ // Faceworm Queen Card
		n_tok[bon_DMG_CRIT] += n_A_SHOES_DEF_PLUS;
	}
	if(CardNumSearch(724))
	{//Powerful Soldier  Skeleton Card
		if(n_A_BaseLV >= 100)
			n_tok[bon_DMG_CRIT] += 5;
	}
	
// Pets
	if ( miscEffects[ksPetEffects] == 22 )
	{ // Dullahan Pet
		n_tok[bon_DMG_CRIT] += 5;
	}
	
	//Skills
	if ( performerBuffs[ksDancerSolo] === ksLadyLuck && performerBuffs[ksDancerSoloLevel] > 0 )
	{ // Lady Luck
		// var skillBonus = 10 + performerBuffs[ksDancerSoloLevel];
		// var danceLessonsBous = Math.floor( performerBuffs[ksDanceLessons] / 2 );
		// var lukBonus = Math.floor( performerBuffs[ksDancerLuk] / 10 );
		// n_A_CRI += skillBonus + danceLessonsBous + lukBonus;
		var skillBonus = performerBuffs[ksDancerSoloLevel];
		n_tok[bon_DMG_CRIT] += skillBonus * 2;
	}
	criticalMod = n_tok[bon_DMG_CRIT];
}

 // Calc Dmg from RAWDmg (rawDmg, (min,avg,max,crit:=10))
function CalcFinalDamage2( damage, type )
{
	damage = ApplyDamageModifiers( damage );
	damage = ApplySkillModifiers( damage );
	var aura_blade = 0;
	if ( n_A_WeaponType !== weapTyp_NONE && SkillSearch( skill_LK_AURA_BLADE ) )
	{ // aura blade
		aura_blade += n_A_BaseLV * (SkillSearch( skill_LK_AURA_BLADE ) + 3);
	}
	//--------------------------------------
	criticalMod = 0;
	/*
	// Critical
	if ( EquipNumSearch( 1089 ) )
	{ // Glorious Hunter Bow
		criticalMod += ( 2 * n_A_Weapon_ATKplus );
	}
	if ( EquipNumSearch( 1305 ) && n_A_Arrow == arrTyp_SHARP )
	{ // Little Feather Hat + Sharp Arrows
		criticalMod += 5;
		if ( n_A_HEAD_DEF_PLUS >= 7 )
		{
			criticalMod += 5;
		}
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if ( SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 7) { criticalMod += 10; }
		if ( SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) {criticalMod += 5; }
	}
	if ( EquipNumSearch( 1583 ) )
	{ //Golden Angel Wing
		if ( SU_LUK >= 90 ) { criticalMod += 5; }
		if ( SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { criticalMod += 5; }
	}
	if ( EquipNumSearch( 1584 ) )
	{ //Golden Angel Hairband
		if ( SU_LUK >= 70 ) { criticalMod += 2; }
		if ( SU_LUK >= 70 && n_A_SHOULDER_DEF_PLUS >= 7) { criticalMod += 3; }
	}
	
	// Pets
	if ( miscEffects[ksPetEffects] == 22 )
	{ // Dullahan Pet
		criticalMod += 5;
	}*/
	CalcCriticalMod();
	//criticalMod = n_tok[bon_DMG_CRIT];
	//--------------------------------------
	
	
	if ( type == 10 )
	{
		// damage = ApplyEnemyDefense( damage * 1.4, type, 0 );
		damage += aura_blade;
		damage = ApplyEnemyDefense( (damage * 1.4) * ((100+criticalMod)/100), type, 0 );
	}
	else
	{
		damage += aura_blade;
		damage = ApplyEnemyDefense( damage, type, 0 );
	}
	damage = Math.floor(tPlusDamCut(damage));	
	damage = Max( 0, damage );
	return Math.floor( damage );
	
/* Old BattleCalc order
	if ( type == 10 )
	{
		damage = ApplyEnemyDefense( damage * 1.4, type, 0 );
	}
	else
	{
		damage = ApplyEnemyDefense( damage, type, 0 );
	}
	
	damage = Max( 0, damage );
	damage = ApplyDamageModifiers( damage );
	return Math.floor( damage );
*/
}

function CalcRangedMod()
{
	// Calc Ranged bonuses
	rangedMod = 0;
	
// Equipment
	if ( EquipNumSearch( 626 ) && n_A_Arrow == arrTyp_FIRE )
	{ // Burning Bow
		n_tok[bon_DMG_RANGE] += 25;
	}
	else if ( EquipNumSearch( 627 ) && n_A_Arrow == arrTyp_CRYSTAL )
	{ // Freezing Bow
		n_tok[bon_DMG_RANGE] += 25;
	}
	else if ( EquipNumSearch( 628 ) && n_A_Arrow == arrTyp_STONE )
	{ // Earthen Bow
		n_tok[bon_DMG_RANGE] += 25;
	}
	else if ( EquipNumSearch( 629 ) && n_A_Arrow == arrTyp_WIND )
	{ // Gale Bow
		n_tok[bon_DMG_RANGE] += 25;
	}
	else if ( EquipNumSearch( 630 ) && n_A_Arrow == arrTyp_STEEL )
	{ // Orc Archer Bow
		n_tok[bon_DMG_RANGE] += 50;
	}
	else if ( EquipNumSearch( 1286 ) && n_A_Arrow == arrTyp_ELVEN )
	{ // Elven Bow
		n_tok[bon_DMG_RANGE] += 50;
	}
	else if ( EquipNumSearch( 101 ) && n_A_Arrow == arrTyp_HUNTING )
	{ // Hunter Bow
		n_tok[bon_DMG_RANGE] += 50;
	}
	if ( EquipNumSearch( 1255 ) && SU_AGI >= 120 )
	{ // Sniper Googles
		n_tok[bon_DMG_RANGE] += 4;
	}
	if ( EquipNumSearch( 1265 ) )
	{ // Dying Swan
		n_tok[bon_DMG_RANGE] += 5;
	}
	if ( EquipNumSearch( 1258 ) )
	{ // Maestro Song Hat
		n_tok[bon_DMG_RANGE] += 5;
	}
	if ( EquipNumSearch( 1217 ) )
	{ // Captain's Hat and pipe? Not in iRO
		n_tok[bon_DMG_RANGE] += n_A_HEAD_DEF_PLUS;
	}
	if ( EquipNumSearch( 1354 ) && n_A_HEAD_DEF_PLUS >= 9 )
	{ // Sagittarius Crown
		n_tok[bon_DMG_RANGE] += 3;
	}
	if ( EquipNumSearch( 1401 ) && n_A_JobSearch()==cls_ARC )
	{ // Ancient Gold Ornament
		n_tok[bon_DMG_RANGE] += 10;
	}
	if ( EquipNumSearch( 1408 ) )
	{ // White Wing Suit
		n_tok[bon_DMG_RANGE] += 2*n_A_BODY_DEF_PLUS;
	}
	if(EquipNumSearch(1514))
	{//Evil Marching Hat
		if (n_A_HEAD_DEF_PLUS >= 9) 
		    n_tok[bon_DMG_RANGE] += 5;
	}
	if (SkillSearch(skill_RAN_NO_LIMITS)) {
		n_tok[bon_DMG_RANGE] += 50 * SkillSearch(skill_RAN_NO_LIMITS);
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if (n_A_SHOULDER_DEF_PLUS >= 7 && SU_DEX >= 90) { n_tok[bon_DMG_RANGE] += 5; }
		if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_DEX >= 90) { n_tok[bon_DMG_RANGE] += 5; }
	}
	if ( EquipNumSearch( 1583 ) )
	{ //Golden Angel Wing
		if (SU_DEX >= 90) { n_tok[bon_DMG_RANGE] += 5; }
		if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_DEX >= 90) { n_tok[bon_DMG_RANGE] += 5; }
	}
	if ( EquipNumSearch( 1584 ) )
	{ //Golden Angel Hairband
		if (SU_DEX >= 70) { n_tok[bon_DMG_RANGE] += 2; }
		if (n_A_HEAD_DEF_PLUS >= 7 && SU_DEX >= 70) { n_tok[bon_DMG_RANGE] += 3; }
	}
	if ( EquipNumSearch( 1665 ) )
	{ //"Red Fox Ears(transformation mode)"
		if (n_A_HEAD_DEF_PLUS >= 6 && n_A_HEAD_DEF_PLUS <= 12) { n_tok[bon_DMG_RANGE] += n_A_HEAD_DEF_PLUS - 5; }
		if (n_A_HEAD_DEF_PLUS >= 6 && n_A_HEAD_DEF_PLUS > 12) { n_tok[bon_DMG_RANGE] += 7; }
	}
	if(EquipNumSearch(1545))
	{ //Fallen Angel Wing
		n_tok[bon_DMG_RANGE] += Math.floor(SU_DEX/20);
	}
	if(EquipNumSearch(1702))
	{ //"Dog Cap"
		if(n_A_HEAD_DEF_PLUS >= 11)
			n_tok[bon_DMG_RANGE] += 3;
	}
	if(EquipNumSearch(1703))
	{ //"Probation Gatling Gun"
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_tok[bon_DMG_RANGE] += SkillSearch(433);
		}
	}
	if(EquipNumSearch(1705))
	{ //"Probation Revolver"
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_tok[bon_DMG_RANGE] += SkillSearch(427);
		}
	}
	if(EquipNumSearch(1706))
	{ //"Probation Rifle"
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_tok[bon_DMG_RANGE] += SkillSearch(427);
		}
	}
	if ( EquipNumSearch( 1796 ) )
	{//DEX Glove
		if(SU_DEX >= 110)
			n_tok[bon_DMG_RANGE] += 1 * EquipNumSearch( 1796 );
	}
	if(EquipNumSearch(1950) || EquipNumSearch(1956) || EquipNumSearch(2201))  //Dex Boots
	{
		if(SU_DEX >= 120)
			n_tok[bon_DMG_RANGE] += 5;
	}
	if(EquipNumSearch(1969))
	{//Hero Silverleather Boots
		if(n_A_SHOES_DEF_PLUS >= 8 && n_A_SHOES_DEF_PLUS <=13)
			n_tok[bon_DMG_RANGE] += n_A_SHOES_DEF_PLUS - 7;
		else if(n_A_SHOES_DEF_PLUS >13)
			n_tok[bon_DMG_RANGE] += 6;
	}
	if( EquipNumSearch(2051) && n_A_Weapon_ATKplus >= 11) 
	{//Dragon Slayer (Ancient Weapon)
		n_tok[bon_DMG_RANGE] += 10;
	}
	if(EquipNumSearch(2078) || EquipNumSearch(2081))   
	{//Demon's Shot || Big Game Trophy
		n_tok[bon_DMG_RANGE] += 3 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(2075) || EquipNumSearch(2082))   
	{//Four Mirrors || Guttling Gun
		n_tok[bon_DMG_RANGE] += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if( EquipNumSearch(2052) || //Trident of Undine
		EquipNumSearch(2054) || //Bow of Narcissus
		EquipNumSearch(2069) || //Sword of Blue Fire
		EquipNumSearch(2073))   //Iron Claw
	{
		n_tok[bon_DMG_RANGE] += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(2061) && n_A_Weapon_ATKplus >= 11)
	{//Empyrean
		n_tok[bon_DMG_RANGE] += 5;
	}
	if(EquipNumSearch(2146))
	{// "Chronocloak of Dexterity"
		n_tok[bon_DMG_RANGE] += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	
	if(EquipNumSearch(2220) || // Old Maestro Song's Hat [1]
	   EquipNumSearch(2225) || // Old Dying Swan [1]
	   EquipNumSearch(2221) || // Old Midas Whisper [1]
	   EquipNumSearch(2226) )  // Old Camouflage Bunny Hood [1]
	{
		n_tok[bon_DMG_RANGE] += n_A_HEAD_DEF_PLUS;
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		n_tok[bon_DMG_RANGE] +=  n_A_SHOULDER_DEF_PLUS;
		if(SU_DEX >= 90)
			n_tok[bon_DMG_RANGE] += 3;
	}
	if(EquipNumSearch(2232))
	{// Republic Hat [1]
		if(n_A_HEAD_DEF_PLUS >= 7)
			n_tok[bon_DMG_RANGE] += 2;
		if(n_A_HEAD_DEF_PLUS >= 10)
			n_tok[bon_DMG_RANGE] += 4;
	}
	if(EquipNumSearch(2241))
	{//Dark Rose [2]
		if(n_A_Weapon_ATKplus >= 7)
			n_tok[bon_DMG_RANGE] += 15;
	}
	else if ( EquipNumSearch( 2243 ) && n_A_Arrow == bulTyp_ArmorPiercing )
	{ // Dustfire [2]
		n_tok[bon_DMG_RANGE] += 30;
	}
	// if(EquipNumSearch())
	// {
	// }
	
//Shadow
	if( EquipNumSearch(1842))
	{//Shadow Gunslinger Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7){n_tok[bon_DMG_RANGE] += 3;}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 8){n_tok[bon_DMG_RANGE] += 5;}
	}
	if( EquipNumSearch(1995))
	{//Shadow Doram Battler Gloves
		n_tok[bon_DMG_RANGE] += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if(EquipNumSearch(1860))
	{ //"Feathered Tricorn"
		if(n_A_HEAD_DEF_PLUS >= 7){n_tok[bon_DMG_RANGE] += 7;}
		if(n_A_HEAD_DEF_PLUS >= 11){n_tok[bon_DMG_RANGE] += 5;}
	}
	if(EquipNumSearch(1881))
	{ //"Elaborate Yellow Foxtail Replica"
		n_tok[bon_DMG_RANGE] += 1 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if ( EquipNumSearch( 2041 ) )
	{//Armor of Sixtus the Dexterous
			n_tok[bon_DMG_RANGE] += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
	}
	if( EquipNumSearch(2255) || // Wyrmeater's Shadow Gloves
		EquipNumSearch(2259) || // Rondius' Shadow Gloves
		EquipNumSearch(2261) || // Talos' Shadow Gloves
		EquipNumSearch(2265) || // Garmia's Shadow Gloves
		EquipNumSearch(2266) )  // Boscard's Shadow Gloves
	{
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7)
			n_tok[bon_DMG_RANGE] += 3;
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9)
			n_tok[bon_DMG_RANGE] += 4;
	}
	
//Cards	
	if(CardNumSearch( 541 ))
	{ //Menblatt Card
		n_tok[bon_DMG_RANGE] += Math.floor(SU_DEX/10);
	}
	if(CardNumSearch(589))
	{//Big Eggring Card
		if(SU_DEX <=50)
		{
			n_tok[bon_DMG_RANGE] -= 1 * Math.floor(SU_DEX/10);
		}
		else
		{
			n_tok[bon_DMG_RANGE] -= 5;
		}
	}
	if ( CardNumSearch( 689 ))
	{ // Airship Raid Card
		n_tok[bon_DMG_RANGE] += Math.floor(n_A_Weapon_ATKplus / 2) * CardNumSearch(689);
	}
	if(CardNumSearch(722))
	{//Powerful Archer Skeleton Card
		if(n_A_BaseLV >= 100)
			n_tok[bon_DMG_RANGE] += 2 * CardNumSearch(722);
	}
	if(CardNumSearch(771))
	{//Heart Hunter Card
		if(n_A_WeaponType == weapTyp_HANDGUN || n_A_WeaponType == weapTyp_RIFLE || n_A_WeaponType == weapTyp_GRENADE_LAUNCHER)
		{
			n_tok[bon_DMG_RANGE] += (5 * CardNumSearch(771)) + (n_A_Weapon_ATKplus * CardNumSearch(771));
			if(n_A_Weapon_ATKplus >= 10)
				n_tok[bon_DMG_RANGE] += (5 * CardNumSearch(771));
		}
	}
	if(CardNumSearch(818))
	{//Resentful Soldier Card
		if(n_A_WeaponType == weapTyp_BOW && n_A_Weapon_ATKplus >= 10)
			n_tok[bon_DMG_RANGE] += 20 * CardNumSearch(818);
	}
	
//Enchants
	if(EnchNumSearch( 1403 ))
	{//Rune of Dexterity 1
		if(n_A_BODY_DEF_PLUS >= 10)
			n_tok[bon_DMG_RANGE] += 5;
	}
	if(EnchNumSearch( 1404 ))
	{//Rune of Dexterity 2
		if(n_A_BODY_DEF_PLUS >= 11)
			n_tok[bon_DMG_RANGE] += 7;
	}
	if(EnchNumSearch( 1405 ))
	{//Rune of Dexterity 3
		if(n_A_BODY_DEF_PLUS >= 12)
			n_tok[bon_DMG_RANGE] += 8;
		if(n_A_BODY_DEF_PLUS >= 13)
			n_tok[bon_DMG_RANGE] += 2;
	}
	
//Skills
	if(SkillSearch(skill_SUM_POWER_OF_LIFE) && SkillSearch(skill_SUM_ANIMAL))
	{
		n_tok[bon_DMG_RANGE] += 20;
	}
	if((SkillSearch(skill_SUM_ARCLOUSE_DASH) || summonerBuffs[ksArclouseDash]) && n_A_JOB == cls_SUM)
	{
		n_tok[bon_DMG_RANGE] += 10;
	}
	
//Item
	if ( usableItems[ksRaydricArcherTransScroll] && n_A_WeaponType === weapTyp_BOW)
	{
		n_tok[bon_DMG_RANGE] += 25;
	}
	if (not_use_card == 1)
	rangedMod = 0;
	else
	rangedMod = n_tok[bon_DMG_RANGE];
	if ( monsterBuffs[status_en_buff_Ranged] )
	{ // Ranged Reduction
		rangedMod -= monsterBuffs[status_en_buff_Ranged];
	}
	if(n_A_ActiveSkill == skill_SHA_FEINT_BOMB)
	{
		rangedMod=0;
	}
}

function CalcWeaponSizeMod()
{
	// Calc Weapon Size Mod
	weaponSizeMod = weaponsize[n_A_WeaponType][n_B[en_SIZE]];
	if ( n_Nitou )
	{ // Dual Hand
		weapon2SizeMod = weaponsize[n_A_Weapon2Type][n_B[en_SIZE]];
	}
	
	// Skills
	if( SkillSearch( skill_KN_CAVALIER_MASTERY ) || SkillSearch( skill_RUN_DRAGON_TRAINING ) )
	{
		if ( n_A_WeaponType === weapTyp_SPEAR || n_A_WeaponType === weapTyp_2HSPEAR )
		{
			// spears do 100% damage to
			// medium monsters while on a mount
			weaponSizeMod = 1;
		}
	}
	if ( SkillSearch( skill_BS_WEAPON_PERFECTION ) || otherBuffs[ksWeaponPerfection] )
	{ // Weapon Perfection gives perfect size mod
		weaponSizeMod = 1;
		weapon2SizeMod = 1;
	}
	
	// Cards
	for ( var i = 0; i < 8; i++ )
	{
		if ( cardOBJ[n_A_card[i]][0] == 32 )
		{ // Drake card
			weaponSizeMod = 1;
			weapon2SizeMod = 1;
		}
	}
	
	// Equipment
	if ( EquipNumSearch( 1177 ) )
	{ // Large Orc Hero Helm
		weaponSizeMod = 1;
		weapon2SizeMod = 1;
	}
}

{
JobHP_A = new Array(
   0 //Novice
, 70 //Swordman
, 50 //Thief
, 40 //Acolyte
, 50 //Archer
, 30 //Mage
, 40 //Merchant
,150 //Knight
,110 //Assassin
, 75 //Priest
, 85 //Hunter
, 55 //Wizard
, 90 //Blacksmith
,110 //Crusader
, 85 //Rogue
, 90 //Monk
, 75 //Bard
, 75 //Dancer
, 75 //Sage
, 90 //Alchemist
,  0 //Super Novice
,150 //Lord Knight
,110 //Assassin Cross
, 75 //High Priest
, 85 //Sniper
, 55 //High Wizard
, 90 //Master Smith
,110 //Paladin
, 85 //Stalker
, 90 //Champion
, 75 //Minstrel
, 75 //Gypsy
, 75 //Scholar
, 90 //Biochemist
,  0 //High Novice
, 70 //High Swordman
, 50 //High Thief
, 40 //High Acolyte
, 50 //High Archer
, 30 //High Magician
, 40 //High Merchant
, 70 //Taekwon Kid
, 90 //Taekwon Master
, 75 //Soul Linker
, 75//80 //Ninja
, 90//75 //Gunslinger
,150 //Rune Knight (non-trans)
,150 //Rune Knight (trans)
,110 //Glt Cross (non-trans)
,110 //Glt Cross (trans)
, 75 //Arch Bishop (non-trans)
, 75 //Arch Bishop (trans)
, 85 //Ranger (non-trans)
, 85 //Ranger (trans)
, 55 //Warlock (non-trans)
, 55 //Warlock (trans)
, 90 //Mechanic (non-trans)
, 90 //Mechanic (trans)
,110 //Royal Guard (non-trans)
,110 //Royal Guard (trans)
, 85 //Shadow Chaser (non-trans)
, 85 //Shadow Chaser (trans)
, 90 //Sura (non-trans)
, 90 //Sura (trans)
, 75 //Maestro (non-trans)
, 75 //Maestro (trans)
, 75 //Wanderer (non-trans)
, 75 //Wanderer (trans)
, 75 //Sorcerer (non-trans)
, 75 //Sorcerer (trans)
, 90 //Geneticist (non-trans)
, 90 //Geneticist (trans)
,  0 //Kagero/Oboro
,  0 //Expanded Super Novice
, 90 //Rebellion
, 90 //Summoner
);
JobHP_B = new Array(
  5 //Novice
, 5 //Swordman
, 5 //Thief
, 5 //Acolyte
, 5 //Archer
, 5 //Mage
, 5 //Merchant
, 5 //Knight
, 5 //Assassin
, 5 //Priest
, 5 //Hunter
, 5 //Wizard
, 5 //Blacksmith
, 7 //Crusader
, 5 //Rogue
, 6.5 //Monk
, 3 //Bard
, 3 //Dancer
, 5 //Sage
, 5 //Alchemist
, 5 //Super Novice
, 5 //Lord Knight
, 5 //Assassin Cross
, 5 //High Priest
, 5 //Sniper
, 5 //High Wizard
, 5 //Master Smith
, 7 //Paladin
, 5 //Stalker
, 6.5 //Champion
, 3 //Minstrel
, 3 //Gypsy
, 5 //Scholar
, 5 //Biochemist
, 5 //High Novice
, 5 //High Swordman
, 5 //High Thief
, 5 //High Acolyte
, 5 //High Archer
, 5 //High Mage
, 5 //High Merchant
, 5 //Taekwon Kid
, 6.5 //Taekwon Master
, 5 //Soul Linker
, 5//2.59 // Ninja
, 5//0 //Gunslinger
, 5 //Rune Knight (non-trans)
, 5 //Rune Knight (trans)
, 5 //Glt Cross (non-trans)
, 5 //Glt Cross (trans)
, 5 //Arch Bishop (non-trans)
, 5 //Arch Bishop (trans)
, 5 //Ranger (non-trans)
, 5 //Ranger (trans)
, 5 //Warlock (non-trans)
, 5 //Warlock (trans)
, 5 //Mechanic (non-trans)
, 5 //Mechanic (trans)
, 7 //Royal Guard (non-trans)
, 7 //Royal Guard (trans)
, 5 //Shadow Chaser (non-trans)
, 5 //Shadow Chaser (trans)
, 6.5 //Sura (non-trans)
, 6.5 //Sura (trans)
, 3 //Maestro (non-trans)
, 3 //Maestro (trans)
, 3 //Wanderer (non-trans)
, 3 //Wanderer (trans)
, 5 //Sorcerer (non-trans)
, 5 //Sorcerer (trans)
, 5 //Geneticist (non-trans)
, 5 //Geneticist (trans)
, 5 //Kagero/Oboro
, 5 //Expanded Super Novice
, 6.5 //Rebellion
, 5 //Summoner
);
JobHP_Third = [
/* RK */[8100,8133,8242,8352,8464,8576,8690,8804,8920,9036,9154,9273,9393,9514,9636,9759,9883,10008,10134,10261,10389,10518,10648,10779,10912,11045,11180,11315,11452,11589,11728,11868,12009,12151,12294,12438,12583,12729,12876,13024,13173,13323,13474,13626,13780,13934,14090,14246,14404,14562,14722,14883,15042,15100,15260,15321,15481,15541,15600,15760,15820,15980,16141,16303,16466,16630,16795,16961,17128,17296,17465,17635,17806,17978,18151,18325,18500,18675,18850,19025,19200,19375,19550,19725,19900,20075,20250,20425,20600,20775,20950,21125,21300,21475,21650,21825,22000,22175,22350,22525,22700,22875],
/* GX */[6050,6093,6208,6324,6441,6559,6678,6798,6920,7043,7167,7292,7418,7545,7673,7802,7932,8063,8196,8330,8465,8601,8738,8876,9015,9155,9296,9438,9582,9727,9873,10020,10168,10317,10467,10618,10770,10923,11078,11234,11391,11549,11708,11868,12029,12191,12354,12518,12684,12851,13019,13188,13351,13518,13684,13850,14016,14182,14349,14515,14681,14830,14966,15103,15241,15380,15520,15661,15803,15946,16090,16235,16381,16528,16676,16825,16975,17125,17275,17425,17575,17725,17875,18025,18175,18325,18475,18625,18775,18925,19075,19225,19375,19525,19675,19825,19975,20125,20275,20425,20575,20725],
/* AB */[4300,4333,4412,4491,4570,4649,4728,4807,4886,4965,5044,5123,5202,5281,5360,5439,5518,5597,5676,5755,5834,5913,5992,6071,6150,6229,6308,6387,6466,6545,6624,6703,6782,6861,6940,7019,7098,7177,7256,7335,7414,7493,7572,7651,7730,7809,7888,7967,8046,8125,8204,8283,8362,8441,8520,8599,8678,8757,8836,8915,8994,9115,9276,9438,9601,9765,9930,10096,10263,10431,10600,10770,10941,11113,11286,11460,11635,11810,11985,12160,12335,12510,12685,12860,13035,13210,13385,13560,13735,13910,14085,14260,14435,14610,14785,14960,15135,15310,15485,15660,15835,16010],
/* RA */[4800,4828,4918,5009,5101,5194,5288,5382,5477,5573,5670,5768,5867,5967,6068,6170,6273,6377,6482,6588,6694,6801,6909,7018,7128,7239,7351,7464,7578,7693,7809,7926,8044,8162,8281,8401,8522,8644,8767,8891,9016,9142,9269,9397,9526,9656,9786,9917,10049,10182,10316,10451,10585,10719,10853,10987,11121,11255,11389,11523,11657,11790,11926,12063,12201,12340,12480,12621,12763,12906,13050,13195,13341,13488,13636,13785,13935,14085,14235,14385,14535,14685,14835,14985,15135,15285,15435,15585,15735,15885,16035,16185,16335,16485,16635,16785,16935,17085,17235,17385,17535,17685],
/* WL */[3200,3313,3383,3455,3528,3601,3675,3749,3824,3899,3975,4051,4129,4208,4287,4367,4447,4528,4609,4691,4773,4857,4941,5026,5112,5198,5285,5372,5460,5548,5638,5728,5819,5911,6003,6096,6189,6283,6377,6473,6569,6666,6763,6861,6960,7059,7159,7259,7361,7463,7566,7669,7771,7874,7976,8079,8181,8284,8386,8489,8591,8730,8891,9053,9216,9380,9545,9711,9878,10046,10215,10385,10556,10728,10901,11075,11250,11250,11425,11600,11775,11950,12125,12300,12475,12650,12825,13000,13175,13350,13525,13700,13875,14050,14225,14400,14575,14750,14925,15100,15275,15450,15625],
/* ME */[5807,5844,5952,6061,6172,6283,6396,6510,6625,6741,6857,6974,7093,7212,7333,7455,7578,7702,7828,7954,8081,8208,8337,8467,8598,8730,8864,8998,9134,9271,9408,9546,9685,9825,9967,10109,10253,10398,10544,10691,10838,10987,11136,11287,11439,11592,11746,11901,12057,12215,12372,12531,12688,12845,13003,13160,13318,13475,13633,13790,13948,14105,14266,14428,14591,14755,14920,15086,15253,15421,15590,15760,15931,16103,16276,16450,16625,16800,16975,17150,17325,17500,17675,17850,18025,18200,18375,18550,18725,18900,19075,19250,19425,19600,19775,19950,20125,20300,20475,20650,20825,21000],
/* RG */[6050,6093,6208,6324,6441,6559,6678,6798,6920,7043,7167,7292,7418,7545,7673,7802,7932,8063,8196,8330,8465,8601,8738,8876,9015,9155,9296,9438,9582,9727,9873,10020,10168,10317,10467,10618,10770,10923,11078,11234,11391,11549,11708,11868,12029,12191,12354,12518,12684,12851,13019,13188,13355,13522,13690,13857,14025,14192,14360,14527,14695,14860,15021,15183,15346,15510,15675,15841,16008,16176,16345,16515,16686,16858,17031,17205,17380,17555,17730,17905,18080,18255,18430,18605,18780,18955,19130,19305,19480,19655,19830,20005,20180,20355,20530,20705,20880,21055,21230,21405,21580,21755],
/* SC */[6050,6093,6208,6324,6441,6559,6678,6798,6920,7043,7167,7292,7418,7545,7673,7802,7932,8063,8196,8330,8465,8601,8738,8876,9015,9155,9296,9438,9582,9727,9873,10020,10168,10317,10467,10618,10770,10923,11078,11234,11391,11549,11708,11868,12029,12191,12354,12518,12684,12851,13019,13188,13300,13420,13500,13600,13700,13800,13900,14000,14100,14200,14301,14403,14506,14610,14715,14821,14928,15036,15145,15255,15366,15478,15591,15705,15820,15935,16050,16165,16280,16395,16510,16625,16740,16855,16970,17085,17200,17315,17430,17545,17660,17775,17890,18005,18120,18235,18350,18465,18580,18695],
/* SU */[5050,5082,5176,5271,5367,5464,5562,5661,5761,5862,5963,6065,6168,6272,6377,6483,6590,6698,6807,6917,7027,7138,7250,7363,7477,7592,7708,7825,7943,8062,8181,8301,8422,8544,8667,8791,8916,9042,9169,9297,9425,9554,9684,9815,9947,10080,10214,10349,10485,10622,10759,10897,11033,11170,11307,11444,11581,11718,11855,11992,12129,12265,12406,12548,12691,12835,12980,13126,13273,13421,13570,13720,13871,14023,14176,14330,14485,14640,14795,14950,15105,15260,15415,15570,15725,15880,16035,16190,16345,16500,16655,16810,16965,17120,17275,17430,17585,17740,17895,18050,18205,18360],
/* MI */[4800,4828,4918,5009,5101,5194,5288,5382,5477,5573,5670,5768,5867,5967,6068,6170,6273,6377,6482,6588,6694,6801,6909,7018,7128,7239,7351,7464,7578,7693,7809,7926,8044,8162,8281,8401,8522,8644,8767,8891,9016,9142,9269,9397,9526,9656,9786,9917,10049,10182,10316,10451,10584,10717,10851,10984,11118,11251,11385,11518,11652,11785,11921,12058,12196,12335,12475,12616,12758,12901,13045,13190,13336,13483,13631,13780,13930,14080,14230,14380,14530,14680,14830,14980,15130,15280,15430,15580,15730,15880,16030,16180,16330,16480,16630,16780,16930,17080,17230,17380,17530,17680],
/* WA */[4800,4828,4918,5009,5101,5194,5288,5382,5477,5573,5670,5768,5867,5967,6068,6170,6273,6377,6482,6588,6694,6801,6909,7018,7128,7239,7351,7464,7578,7693,7809,7926,8044,8162,8281,8401,8522,8644,8767,8891,9016,9142,9269,9397,9526,9656,9786,9917,10049,10182,10316,10451,10584,10717,10851,10984,11118,11251,11385,11518,11652,11785,11921,12058,12196,12335,12475,12616,12758,12901,13045,13190,13336,13483,13631,13780,13930,14080,14230,14380,14530,14680,14830,14980,15130,15280,15430,15580,15730,15880,16030,16180,16330,16480,16630,16780,16930,17080,17230,17380,17530,17680],
/* SO */[4080,4103,4180,4257,4335,4414,4494,4574,4655,4737,4819,4902,4986,5071,5157,5244,5332,5420,5509,5599,5689,5780,5872,5965,6058,6153,6248,6344,6441,6539,6637,6737,6837,6937,7038,7140,7243,7347,7451,7557,7663,7770,7878,7987,8097,8207,8318,8429,8541,8654,8768,8883,8994,9107,9220,9280,9340,9450,9570,9680,9798,9915,10036,10158,10281,10405,10530,10656,10783,10911,11040,11170,11301,11433,11566,11700,11835,11970,12105,12240,12375,12510,12645,12780,12915,13050,13185,13320,13455,13590,13725,13860,13995,14130,14265,14400,14535,14670,14805,14940,15075,15210],
/* GE */[4730,4766,4853,4940,5027,5113,5200,5287,5374,5461,5548,5635,5722,5809,5896,5982,6069,6156,6243,6330,6417,6504,6591,6678,6765,6851,6938,7025,7112,7199,7286,7373,7460,7547,7634,7720,7807,7894,7981,8068,8155,8242,8329,8416,8503,8589,8676,8763,8850,8937,9024,9111,9198,9285,9372,9459,9546,9633,9720,9807,9894,9980,10141,10303,10466,10630,10795,10961,11128,11296,11465,11635,11806,11978,12151,12325,12500,12675,12850,13025,13200,13375,13550,13725,13900,14075,14250,14425,14600,14775,14950,15125,15300,15475,15650,15825,16000,16175,16350,16525,16700,16875],
/* KO */[4250,4305,4360,4415,4470,4525,4580,4635,4690,4745,4800,4855,4910,4965,5020,5075,5130,5185,5240,5295,5350,5405,5460,5515,5570,5625,5680,5735,5790,5845,5900,5955,6010,6065,6120,6175,6230,6285,6340,6395,6450,6505,6560,6615,6670,6725,6780,6835,6890,6945,7000,7055,7110,7265,7320,7575,7730,7985,8240,8495,8550,8705,8860,9015,9170,9325,9480,9635,9790,9945,10100,10255,10410,10565,10720,10875,11030,11185,11340,11495,11650,11805,11960,12115,12270,12425,12580,12735,12890,13045,13200,13355,13510,13665,13820,13975,14130,14285,14440,14595,14750,14905],	// 171 - 175], //Used Oboro table
// /* KO */[4181,4260,4340,4421,4503,4585,4668,4752,4837,4922,5008,5095,5183,5271,5360,5450,5541,5632,5724,5817,5911,6005,6100,6196,6293,6390,6488,6587,6687,6787,6888,6990,7093,7196,7300,7405,7511,7617,7724,7832,7941,8050,8160,8271,8383,8495,8608,8722,8837,8952,9068,9185, 9303,9421,9540,9660,9781,9902,10024,10147,10271,10395,10520,10646,10773,10900,11028,11157,11287,11417,11548,11680,11813,11946,12080,12215,12351],	// 171 - 175], //Used Oboro table
/* KAG  [4250,4305,4360,4415,4470,4525,4580,4635,4690,4745,4800,4855,4910,4965,5020,5075,5130,5185,5240,5295,5350,5405,5460,5515,5570,5625,5680,5735,5790,5845,5900,5955,6010,6065,6120,6175,6230,6285,6340,6395,6450,6505,6560,6615,6670,6725,6780,6835,6890,6945,7000,7055,7210,7465,7620,7875,8330,8385,8440,8695,8850,9005,11157, 11287, 11417, 11548, 11680,11813, 11946, 12080, 12215, 12351],*/
/* EN */[2530,2535,2540,2545,2550,2555,2560,2565,2570,2575,2580,2585,2590,2595,2600,2605,2610,2615,2620,2625,2630,2635,2640,2645,2650,2655,2660,2665,2670,2675,2680,2685,2690,2695,2700,2705,2710,2715,2720,2725,2730,2735,2740,2745,2750,2755,2760,2765,2770,2775,2780,2785],
/* RE */[4304,4391,4479,4568,4658,4749,4841,4933,5026,5120,5215,5311,5408,5506,5605,5704,5804,5905,6007,6110,6214,6319,6425,6531,6638,6746,6855,6965,7076,7188,7301,7415,7529,7644,7760,7877,7995,8114,8234,8355,8476,8598,8721,8845,8970,9096,9223,9351,9479,9608,9738,9869,10001,10134,10268,10403,10539,10675,10812,10950,11089,11229,11370,11512,11655,11798,11942,12087,12233,12380,12528,12677,12827,12977,13128,13280,13433],
// /* SUM */[0,40,69,80,92,105,119,134,150,167,185,204,224,245,267,291,315,341,368,395,423,453,483,515,548,582,617,653,690,728,767,807,848,890,933,978,1023,1070,1118,1166,1215,1266,1317,1370,1424,1479,1535,1592,1650,1709,1769,1830,1892,1955,2019,2085,2151,2219,2288,2357,2427,2499,2571,2645,2720,2796,2873,2951,3030,3110,3191,3273,3356,3440,3525,3612,3699,3788,3878,3968,4059,4152,4245,4340,4436,4533,4631,4730,4830,4931,5033,5136,5240,5345,5451,5559,5667,5777,5888,5999,6120,6240,6360,6480,6600,6735,6870,7005,7140,7275,7425,7575,7725,7875,8025,8190,8355,8520,8685,8850,9030,9210,9390,9570,9750,9945,10140,10335,10530,10725,10935,11145,11355,11565,11775,12000,12225,12450,12675,12900,13140,13380,13620,13860,14100,14355,14610,14865,15120,15375,15645,15915,16185,16455,16725,17010,17295,17580,17865,18150,18450,18750,19050,19350,19650,19965,20280,20595,20910,21225,21555,21885,22215,22545,22875,23220,23565,23910,24255,24600,24945,25305,25665,26025,26385,26745,27105,27480,27855,28230,28605,28980,29370,29760,30150,30540,30930,31335,31740,32145,32550],
];
HP_COEFF = [
/* RK */
/* GX, RG, SC */
/* ME */
/* SU */
/* RA, MI, WA */
/* GE */
/* SO */
/* AB */
/* WL */
    
/* RK */[120,750], // original was 150, 500
/* GX */[110,500],
/* AB */[65,500],
/* RA */[85,500],
/* WL */[60,500],
/* ME */[105,500],
/* RG */[110,500],
// /* RG */[110,700],
/* SC */[110,500],
/* SU */[90,500],
/* MI */[85,500],
/* WA */[85,500],
/* SO */[70,500],
/* GE */[65,500],
/* KO */[80,0],
/* EN */[0,500],
/* RE */[88,0]
]
}
function calcHP()
{
	n_A_MaxHP = 0;
	
	// Job ---
	if ( thirdClass === 0 || n_A_JOB === cls_ENOVI )
	{ // not 3rd class
		n_A_MaxHP = 0;
		for ( var i = 2; i <= n_A_BaseLV; i++ )
		{
			n_A_MaxHP += Math.round(JobHP_A[n_A_JOB] * i /100);
		}

		n_A_MaxHP = Math.floor( ( JobHP_B[n_A_JOB] * n_A_BaseLV ) + 35 + n_A_MaxHP );

		if ( n_A_JOB === cls_TKK && n_A_BaseLV >= 70 )
		{
			if ( n_A_BaseLV <=79 )
			{
				n_A_MaxHP = 2127 + 10 * (n_A_BaseLV-70);
			}
			else if ( n_A_BaseLV <=89 )
			{
				n_A_MaxHP = 2200 + 50 * (n_A_BaseLV-80);
			}
			else if ( n_A_BaseLV <= 99 )
			{
				n_A_MaxHP = 2700 + 50 * (n_A_BaseLV-90);
				if(SkillSearch(skill_TK_TAEKWON_RANKER))
					n_A_MaxHP = n_A_MaxHP * 3;
			}
		}
		
		if(n_A_JOB == cls_TKM && n_A_BaseLV >= 70)
		{
			// TKM HP 90~99
			wKenseiHP = [3455,3524,3593,3663,3834,3806,3878,3951,4025,4500];
			if(n_A_BaseLV <=79)
				n_A_MaxHP = 2670 + 10 * (n_A_BaseLV-70);
			else if(n_A_BaseLV <=89)
				n_A_MaxHP = 3000 + 20 * (n_A_BaseLV-80);
			else if(n_A_BaseLV <=99)
				n_A_MaxHP = wKenseiHP[n_A_BaseLV-90];
		}
		
		wHPSL = 0;
		if(n_A_JOB == cls_SL)
		{
			if(n_A_BaseLV >= 70){
				if(n_A_BaseLV <= 79)
					wHPSL = (n_A_BaseLV - 70) *40;
				else if(n_A_BaseLV <= 84)
					wHPSL = (n_A_BaseLV - 80) *50;
				else if(n_A_BaseLV <= 89)
					wHPSL = (n_A_BaseLV - 80) *50 -10;
				else if(n_A_BaseLV <= 92)
					wHPSL = (n_A_BaseLV - 90) *50;
				else if(n_A_BaseLV <= 97)
					wHPSL = (n_A_BaseLV - 90) *50 -10;
				else if(n_A_BaseLV == 98) wHPSL = 375;
				else wHPSL = 4;
			}
		}
		
		/*if ( n_A_JOB == cls_NIN )
		{
			NinHP = new Array(      131, 137, 144, 151, 159, 167, 175, 184, 193,
							   202, 212, 222, 232, 243, 254, 265, 277, 289, 301,
							   316, 331, 346, 364, 382, 400, 420, 440, 460, 482,
							   504, 526, 548, 572, 596, 620, 646, 672, 698, 726,
							   754, 784, 814, 844, 876, 908, 940, 975,1010,1100,
							  1247,1180,1220,1260,1300,1340,1385,1430,1475,1520, // 50 is correct
							  1565,1615,1665,1715,1765,1815,1880,1935,1990,2045,
							  2100,2160,2200,2280,2340,2400,2460,2520,2580,2640,
							  2705,2770,2835,2900,2965,3030,3100,3170,3240,3310,
							  3380,3455,3530,3605,3680,3760,3840,3920,4000,4250); // 99 is correct
			n_A_MaxHP = NinHP[n_A_BaseLV-1];
		}*/
		
		if(n_A_JOB == cls_GUN)
		{
			GunHP = new Array(       38,  44,  50,  57,  64,  73,  82,  93, 104,
							   202, 212, 222, 232, 243, 254, 265, 277, 289, 301,
							   316, 331, 346, 364, 382, 400, 420, 440, 460, 490,
							   520, 550, 580, 610, 650, 680, 710, 740, 770, 800,
							   830, 860, 890, 920, 950, 990,1020,1050,1080,1509,
							  1140,1180,1230,1280,1330,1395,1455,1515,1575,1635, // 50 is correct
							  1695,1760,1820,1885,1950,2015,2080,2145,2210,2275,
							  2340,2410,2480,2550,2620,2690,2760,2830,2900,2970,
							  3040,3115,3190,3265,3340,3415,3490,3565,3640,3715,
							  3790,3870,3950,4030,4110,4190,4270,4350,4330,4510); // 99 is correct
			n_A_MaxHP = GunHP[n_A_BaseLV-1];
		}
                
		if (n_A_JOB === cls_ENOVI && n_A_BaseLV >= 150) {
			n_A_MaxHP += 2000;
		}
		
		if (n_A_JOB === cls_KAGOB) {
			n_A_MaxHP = JobHP_Third[13][n_A_BaseLV - 99];
		}
		if (n_A_JOB === cls_REB) {
			n_A_MaxHP = JobHP_Third[15][n_A_BaseLV - 99];
		}
		//if (n_A_JOB === cls_SUM) {
		//	n_A_MaxHP = JobHP_Third[16][n_A_BaseLV];
		//}
		if(n_A_JOB === cls_SUM){
			SumHP = new Array(40,69,80,92,105,119,134,150,167,185,
								  204,224,245,267,291,315,341,368,395,423,
								  453,483,515,548,582,617,653,690,728,767,
								  807,848,890,933,978,1023,1070,1118,1166,1215,
								  1266,1317,1370,1424,1479,1535,1592,1650,1709,1769,// 50
								  1830,1892,1955,2019,2085,2151,2219,2288,2357,2427,
								  2499,2571,2645,2720,2796,2873,2951,3030,3110,3191,
								  3273,3356,3440,3525,3612,3699,3788,3878,3968,4059,
								  4152,4245,4340,4436,4533,4631,4730,4830,4931,5033,
								  5136,5240,5345,5451,5559,5667,5777,5888,5999,6120,// 100
								  6240,6360,6480,6600,6735,6870,7005,7140,7275,7425,
								  7575,7725,7875,8025,8190,8355,8520,8685,8850,9030,
								  9210,9390,9570,9750,9945,10140,10335,10530,10725,10935,
								  11145,11355,11565,11775,12000,12225,12450,12675,12900,13140,
								  13380,13620,13860,14100,14355,14610,14865,15120,15375,15645,//150
								  15915,16185,16455,16725,17010,17295,17580,17865,18150,18450,
								  18750,19050,19350,19650,19965,20280,20595,20910,21225,21555,
								  21885,22215,22545,22875,23220,23565,23910,24255,24600,24945,
								  25305,25665,26025,26385,26745,27105,27480,27855,28230,28605,
								  28980,29370,29760,30150,30540,30930,31335,31740,32145,32550);//200
			n_A_MaxHP = SumHP[n_A_BaseLV-1];
		}
	}
	else
	{
//            if (n_A_JOB === cls_RUN || n_A_JOB === cls_RUNt) {
//                var base99HP = 8100;
//                var added100HP = 33;
//                
//                
//            }
		var k = 0;
		for (var j = 2; j <= n_A_BaseLV; j++)
			k += (HP_COEFF[Math.floor( n_A_JOB / 2 ) - 23][0]*j + 50)/100.0;
		    
		n_A_MaxHP = JobHP_Third[Math.floor( n_A_JOB / 2 ) - 23][n_A_BaseLV - 99];
	}

	// Rebirth ---
	if ( rebirthClass )
	{
		n_A_MaxHP = Math.floor( n_A_MaxHP * 125 / 100 );
	}
		
	// Adopted ---
	if ( n_A_Adopted )
	{
		n_A_MaxHP = Math.floor( n_A_MaxHP * 70 / 100 );
	}
	
	// Vit ---
	n_A_MaxHP = Math.floor((n_A_MaxHP - wHPSL) * (100 + n_A_VIT) / 100);
        
        if ( ( n_A_JOB === cls_SNOVI || n_A_JOB === cls_ENOVI ) && n_A_BaseLV >= 99 )
        {
                n_A_MaxHP += 2000;
        }

	// Additions ---
	var additiveHP = 0;
	additiveHP += n_tok[bon_HP_ADD];
	additiveHP += StPlusCalc2(bon_VIT);
	additiveHP += StPlusCalc2(bon_ALL_STATS);

	if(CardNumSearch(186)) // Remover
		additiveHP -= 40 * n_A_BODY_DEF_PLUS;
	if(n_A_BODY_DEF_PLUS >= 9 && CardNumSearch(225)) // Apocalypse
		additiveHP += 800;
	if(n_A_JobSearch()==cls_MAG) // MageCls
		additiveHP += CardNumSearch(card_HEAD_BANSHEE) * -100; // Banshee
	if(n_A_JobSearch()==cls_SWO) // SwordsCls
		additiveHP += 500 * CardNumSearch(477); // Echio

		//if(n_A_Equip[8]==536){ // ??
	if ( EquipNumSearch( 536 ) )
	{ // Valkyrian Shoes
		wHPVS = n_A_JobSearch();
		if(wHPVS==cls_ACO || wHPVS==cls_ARC || wHPVS==cls_MAG)
			additiveHP += 5 * n_A_BaseLV;
	}
	if(EquipNumSearch(762)) // SnipingSuit R
		additiveHP += 20 * n_A_BaseLV;
	if(EquipNumSearch(770)) // Quill + Small Book Pen
		additiveHP += 3 * n_A_BaseLV;
	if(EquipNumSearch(836)) // Diabolus Boots
		additiveHP += n_A_BaseLV *10;
	if(EquipNumSearch(859)) // Brynhild
		additiveHP += n_A_BaseLV *20;
	if(EquipNumSearch(883) && n_A_BaseLV <= 79) // Badge Academy
		additiveHP += 400 * EquipNumSearch(883);
	if(EquipNumSearch(986)) // Chameleon Armor
		additiveHP += 7 * n_A_BaseLV;
	if(EquipNumSearch(1116) && n_A_JobSearch()==cls_NOV) // Novice Figurine
		additiveHP += 30 * EquipNumSearch(1116);
	if(n_A_Weapon_ATKplus >= 6 && EquipNumSearch(1168)) // Withered Branch Staff
		additiveHP += -200;
	if(EquipNumSearch(1172)) // Chronos
		additiveHP += 50 * Math.floor(n_A_Weapon_ATKplus / 2);
	if ( EquipNumSearch( 1360 ) )
	{ // Mascara Chique de Carnaval (bRO)
		additiveHP += n_A_HEAD_DEF_PLUS * 100;
	}
	if ( EquipNumSearch( 1370 ) )
	{ // Sigrun's Wings
		if ( n_A_JobSearch() == cls_NOV )
		{ // Novices
			additiveHP += 80;
		}
	}
	if ( EquipNumSearch( 1475 ) )
	{ // WoE Robe
		if (n_A_BODY_DEF_PLUS >= 9) { additiveHP += 1000; }
	}
	if ( EquipNumSearch( 1567 ) )
	{//Poring Fedora Hat
		additiveHP += (n_A_HEAD_DEF_PLUS * 75);
	}
	if ( EquipNumSearch( 1794 ) )
	{//Vit Glove
		additiveHP+= 50 * Math.floor(SU_VIT / 10) * EquipNumSearch( 1794 );
	}
	if(EquipNumSearch(1919))
	{ //"Foxtail Ring"
		if(n_A_BaseLV <= 50)
		{
			additiveHP += 10 * Math.floor(n_A_BaseLV /5);
		}
		else
		{
			additiveHP += 100;
		}
	}
	
	if(EquipNumSearch(1946) || EquipNumSearch(1952) || EquipNumSearch(2197)  //Str Boots
	|| EquipNumSearch(1947) || EquipNumSearch(1953) || EquipNumSearch(2198)  //Agi Boots
	|| EquipNumSearch(1949) || EquipNumSearch(1955) || EquipNumSearch(2200)  //Int Boots
	|| EquipNumSearch(1950) || EquipNumSearch(1956) || EquipNumSearch(2201)  //Dex Boots
	|| EquipNumSearch(1951) || EquipNumSearch(1957) || EquipNumSearch(2202)) //Luk Boots
	{
		additiveHP += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	}
	if(EquipNumSearch(1948) || EquipNumSearch(1954) || EquipNumSearch(2199))  //Vit Boots
	{
		additiveHP += 300 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	}
	if(EquipNumSearch(1869))
	{//Elegant Doram Shoes
		additiveHP += 100 * Math.floor(n_A_SHOES_DEF_PLUS / 2);
	}
	if(EquipNumSearch(2129))
	{//Felrock‘s Armor
		if(n_A_BODY_DEF_PLUS >= 7)
			additiveHP += 500;
		if(n_A_BODY_DEF_PLUS >= 9)
			additiveHP += 200;
		if(n_A_BODY_DEF_PLUS >= 12)
			additiveHP += 300;
	}
	if(EquipNumSearch(2144))
	{// "Chronocloak of Vitality"
		additiveHP += 400 * Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if(EquipNumSearch(2233))
	{//Mercenary Ring Type A
		if(n_A_JobSearch() == cls_NOV)
		{
			additiveHP += 1000;
		}
	}
	if(n_A_Equip[eq_WEAPON] == 2247)
	{// Sealed Maximum Sword [2]
		if(n_A_Weapon_ATKplus >= 7)
		{
			additiveHP += 500;
		}
		if(n_A_Weapon_ATKplus >= 10)
		{
			additiveHP += 500;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2247)
	{// Sealed Maximum Sword [2]
		if(n_A_Weapon2_ATKplus >= 7)
		{
			additiveHP += 500;
		}
		if(n_A_Weapon2_ATKplus >= 10)
		{
			additiveHP += 500;
		}
	}
	
//Cards
	if(CardNumSearch(565))
	{//Jejeling Card
		additiveHP += Math.floor(SU_VIT / 10) * 200;
	}
	if(CardNumSearch(721))
	{//Powerful Amdarais Card
		if(n_A_BaseLV >= 100)
			additiveHP += 500;
	}
//Shadows
	
	if ( EquipNumSearch( 1646 ) )
	{ // "Dragan's Shadow Gloves"
		additiveHP += n_A_SHADOW_WEAPON_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1647 ) )
	{ // "Dragan's Shadow Boots"
		additiveHP += n_A_SHADOW_SHOES_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1648 ) )
	{ // "Dragan's Shadow Armor"
		additiveHP += n_A_SHADOW_BODY_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1649 ) )
	{ // "Dragan's Shadow Shield"
		additiveHP += n_A_SHADOW_SHIELD_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1650 ) )
	{ // "Dragan's Shadow Earring"
		additiveHP += n_A_SHADOW_EARRING_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1651 ) )
	{ // "Dragan's Shadow Signet-Ring"
		additiveHP += n_A_SHADOW_PENDANT_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1655 ) )
	{ // "Shadow Champion Set"
		additiveHP += (n_A_SHADOW_SHOES_DEF_PLUS + n_A_SHADOW_BODY_DEF_PLUS);
	}
	if ( EquipNumSearch( 1672 ) )
	{ // "Shadow Dragonslayer Shield"
		additiveHP += n_A_SHADOW_SHIELD_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1673 ) )
	{ // "Shadow Dragonslayer Boots"
		additiveHP += n_A_SHADOW_SHOES_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1675 ) )
	{ // "Shadow Undertaker Shield"
		additiveHP += n_A_SHADOW_SHIELD_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1676 ) )
	{ // "Shadow Undertaker Boots"
		additiveHP += n_A_SHADOW_SHOES_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1678 ) )
	{ // "Shadow Tamer Shield"
		additiveHP += n_A_SHADOW_SHIELD_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1679 ) )
	{ // "Shadow Tamer Boots"
		additiveHP += n_A_SHADOW_SHOES_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1709 ) || // "Shadow Warlock Armor"
		 EquipNumSearch( 1720 ) || // "Shadow Knight Armor"
		 EquipNumSearch( 1723 ) || // "Shadow Crusader Armor"
		 EquipNumSearch( 1726 ) || // "Shadow Blacksmith Armor"
		 EquipNumSearch( 1729 ) || // "Shadow Alchemist Armor"
		 EquipNumSearch( 1732 ) || // "Shadow Priest Armor"
		 EquipNumSearch( 1735 ) || // "Shadow Monk Armor"
		 EquipNumSearch( 1738 ) || // "Shadow Assassin Armor"
		 EquipNumSearch( 1741 ) || // "Shadow Rogue Armor"
		 EquipNumSearch( 1744 ) || // "Shadow Wizard Armor"
		 EquipNumSearch( 1747 ) || // "Shadow Sage Armor"
		 EquipNumSearch( 1750 ) || // "Shadow Hunter Armor"
		 EquipNumSearch( 1753 ) || // "Shadow Bard Armor"
		 EquipNumSearch( 1756 ) || // "Shadow Dancer Armor"
		 EquipNumSearch( 1997 ) || // "Shadow Doram Battler Armor"
		 EquipNumSearch( 1998 ) || // "Shadow Doram Mage Armor"
		 EquipNumSearch( 2007 ) || // "Shadow Oboro Armor"
		 EquipNumSearch( 2008 ) || // "Shadow Kagerou Armor"
		 EquipNumSearch( 2009 ) )  // "Shadow Rebellion Armor"
	{ // 
		additiveHP += n_A_SHADOW_BODY_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1708 ) || // "Shadow Warlock Boots"
		 EquipNumSearch( 1721 ) || // "Shadow Knight Boots"
		 EquipNumSearch( 1724 ) || // "Shadow Crusader Boots"
		 EquipNumSearch( 1727 ) || // "Shadow Blacksmith Boots"
		 EquipNumSearch( 1730 ) || // "Shadow Alchemist Boots"
		 EquipNumSearch( 1733 ) || // "Shadow Priest Boots"
		 EquipNumSearch( 1736 ) || // "Shadow Monk Boots"
		 EquipNumSearch( 1739 ) || // "Shadow Assassin Boots"
		 EquipNumSearch( 1742 ) || // "Shadow Rogue Boots"
		 EquipNumSearch( 1745 ) || // "Shadow Wizard Boots"
		 EquipNumSearch( 1748 ) || // "Shadow Sage Boots"
		 EquipNumSearch( 1751 ) || // "Shadow Hunter Boots"
		 EquipNumSearch( 1754 ) || // "Shadow Bard Boots"
		 EquipNumSearch( 1757 ) || // "Shadow Dancer Boots"
		 EquipNumSearch( 1999 ) || // "Shadow Doram Battler Boots"
		 EquipNumSearch( 2000 ) || // "Shadow Doram Mage Boots"
		 EquipNumSearch( 2010 ) || // "Shadow Oboro Boots"
		 EquipNumSearch( 2011 ) || // "Shadow Kagerou Boots"
		 EquipNumSearch( 2012 ) )  // "Shadow Rebellion Boots"
	{ // 
		additiveHP += n_A_SHADOW_SHOES_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1809 ) || // "Shadow Runeknight Shield"
		 EquipNumSearch( 1810 ) || // "Shadow Royalguard Shield"
		 EquipNumSearch( 1811 ) || // "Shadow Mechanic Shield"
		 EquipNumSearch( 1812 ) || // "Shadow Genetic Shield"
		 EquipNumSearch( 1813 ) || // "Shadow Archbishop Shield"
		 EquipNumSearch( 1814 ) || // "Shadow Sura Shield"
		 EquipNumSearch( 1815 ) || // "Shadow Guillotine Shield"
		 EquipNumSearch( 1816 ) || // "Shadow Shadowchaser Shield"
		 EquipNumSearch( 1817 ) || // "Shadow Warlock Shield"
		 EquipNumSearch( 1818 ) || // "Shadow Sorcerer Shield"
		 EquipNumSearch( 1819 ) || // "Shadow Ranger Shield"
		 EquipNumSearch( 1820 ) || // "Shadow Minstrel Shield"
		 EquipNumSearch( 1821 ) || // "Shadow Wanderer Shield"
		 EquipNumSearch( 1822 ) || // "Shadow Ninja Shield"
		 EquipNumSearch( 1823 ) || // "Shadow Taekwon Shield"
		 EquipNumSearch( 1824 ) || // "Shadow Super Novice Shield"
		 EquipNumSearch( 1825 ) || // "Shadow Gunslinger Shield"
		 EquipNumSearch( 1993 ) || // "Shadow Doram Battler Shield"
		 EquipNumSearch( 1994 ) )  // "Shadow Doram Mage Shield"
	{ // 
		additiveHP += n_A_SHADOW_SHIELD_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1710 ) ) // "Shadow Warlock Shield"
	{
		additiveHP += n_A_SHADOW_SHIELD_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1713 ) || // "Shadow Swordsman Ring"
		 EquipNumSearch( 1718 ))   // "Shadow Diviner Ring"
	{
		additiveHP += n_A_SHADOW_EARRING_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1714 ) || // "Shadow Swordsman Pendant"
		 EquipNumSearch( 1717 ))   // "Shadow Diviner Pendant"
	{
		additiveHP += n_A_SHADOW_PENDANT_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1763 ) || // "Shadow Boots of Hypnos"
		 EquipNumSearch( 1764 ))   // "Shadow Boots of Harpos"
	{
		additiveHP += n_A_SHADOW_SHOES_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1765 ) || // "Shadow Armor of Hypnos"
		 EquipNumSearch( 1766 ))   // "Shadow Armor of Harpos"
	{
		additiveHP += n_A_SHADOW_BODY_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch( 1767 ) ) // "Shadow Shield of the Steadfast"
	{
		additiveHP += n_A_SHADOW_SHIELD_DEF_PLUS * 10; 
	}
	if ( EquipNumSearch(1840) )
	{ // Shadow Taekwon Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7){additiveHP += 1000;}
	}
	if( EquipNumSearch(2267) || // Wyrmeater's Shadow Ring
		EquipNumSearch(2268) || // Tiger Spirit Shadow Ring
		EquipNumSearch(2269) || // Katra's Shadow Ring
		EquipNumSearch(2270) || // Exorcist Shadow Ring
		EquipNumSearch(2271) || // Rondius' Shadow Ring
		EquipNumSearch(2272) || // Gunther's Shadow Ring
		EquipNumSearch(2273) || // Talos' Shadow Ring
		EquipNumSearch(2274) || // Sylphir's Shadow Ring
		EquipNumSearch(2275) || // Dordaleon's Shadow Ring
		EquipNumSearch(2276) || // Osma's Shadow Ring
		EquipNumSearch(2277) || // Garmia's Shadow Ring
		EquipNumSearch(2278) )  // Boscard's Shadow Ring
	{
		additiveHP += n_A_SHADOW_EARRING_DEF_PLUS * 10;
	}
	if( EquipNumSearch(2278) || // Wyrmeater's Shadow Pendant
		EquipNumSearch(2279) || // Tiger Spirit Shadow Pendant
		EquipNumSearch(2280) || // Katra's Shadow Pendant
		EquipNumSearch(2281) || // Exorcist Shadow Pendant
		EquipNumSearch(2282) || // Rondius' Shadow Pendant
		EquipNumSearch(2283) || // Gunther's Shadow Pendant
		EquipNumSearch(2284) || // Talos' Shadow Pendant
		EquipNumSearch(2285) || // Sylphir's Shadow Pendant
		EquipNumSearch(2286) || // Dordaleon's Shadow Pendant
		EquipNumSearch(2287) || // Osma's Shadow Pendant
		EquipNumSearch(2288) || // Garmia's Shadow Pendant
		EquipNumSearch(2289) )  // Boscard's Shadow Pendant
	{
		additiveHP += n_A_SHADOW_PENDANT_DEF_PLUS * 10;
	}
//cards
	if(CardNumSearch(589))
	{//Big Eggring Card
		if(SU_VIT <=50)
		{
			additiveHP -= 200 * Math.floor(SU_VIT/10);
		}
		else
		{
			additiveHP -= 1000;
		}
	}
	
// Items
	if ( usableItems[ksIncreaseHP] > 0 )
	{
		var modifier = 1500;
		
		if ( usableItems[ksIncreaseHP] === 1 )
		{
			modifier -= 1000;
		}
		else if ( usableItems[ksIncreaseHP] === 3 )
		{
			modifier += 1000;
		}
		additiveHP += Math.floor( 10 / 3 * n_A_BaseLV ) + modifier;
	}

// Skills
	if ( SkillSearch( skill_CR_FAITH ) )
	{ // Faith
		n_A_MaxHP += SkillSearch(skill_CR_FAITH) * 200;
	}
	if ( performerBuffs[ksChorus] === ksLeradsDew &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Lerad's Dew
		var skillBonus = 200 * performerBuffs[ksChorusLevel];
		var performerBonus = 300 * performerBuffs[ksNumPerformers];
		if ( performerBonus > 1500 )
		{
			performerBonus = 1500;
		}
		additiveHP += skillBonus + performerBonus;
	}
	if ( SkillSearch( skill_ROY_INSPIRATION ) )
	{ // Inspiration (Skill Level x 600 )
		if(PATCH < 2)
			additiveHP += SkillSearch( skill_ROY_INSPIRATION ) * 600;
	}
	if ( SkillSearch( skill_SUM_SPRITE_MARBLE ) )
	{
		additiveHP += 1000;
	}
	
	n_A_MaxHP += additiveHP;

	if(n_A_MaxHP < 1)
		n_A_MaxHP = 1;
	
// Multipliers ---
	var hpMultiplier = 100;
	
	hpMultiplier += n_tok[bon_HP_MUL];

// Cards
	if(SU_VIT >= 80 && CardNumSearch(267))
	{ // Giant Whisper
		hpMultiplier += 3;
	}
	if(n_A_BODY_DEF_PLUS >= 12 && CardNumSearch(519)) // Hardrock Mammoth
		hpMultiplier += 10;
	if(n_A_BODY_DEF_PLUS >= 14 && CardNumSearch(519)) // Hardrock Mammoth
		hpMultiplier += 3;
	if(n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch(304))
	{ // FireLockSoldier
		hpMultiplier += 10;
	}
	if(CardNumSearch(card_GRMT_ALIOT))
	{ // Aliot
		if ( n_A_JobSearch() == cls_SWO ||
			 n_A_JobSearch() == cls_THI ||
			 n_A_JobSearch() == cls_MER )
		{ // SwordCls, ThiefCls, MerchCls
			hpMultiplier += 5;
		}
	}
	if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407))
	{ // GoldAcidus
		hpMultiplier += 4;
	}
	if(CardNumSearch(563))
	{//Bungisngis Card
		hpMultiplier += Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	if(CardNumSearch(578))
	{//Alphoccio Basil Card
		if(n_A_JobSearch2() == cls_BAR)
		hpMultiplier += 10;
	}
	if(CardNumSearch(579))
	{//Trentini Card
		if(n_A_JobSearch2() == cls_DAN)
		hpMultiplier += 10;
	}
	if(CardNumSearch(580))
	{//Paladin Card
		if(SU_INT >= 110)
		hpMultiplier += 10;
	}
    if((CardNumSearch(740) && (n_A_JOB == cls_MIN || n_A_JOB == cls_MINt)) || //Maestro Alphoccio Card
	   (CardNumSearch(752) && (n_A_JOB == cls_WAN || n_A_JOB == cls_WANt)) )  //Wanderer Trentini Card
	{//Maestro Alphoccio Card
		hpMultiplier += 15;
	}
	if((CardNumSearch(741) && (n_A_JOB == cls_SOR || n_A_JOB == cls_SORt)) || //Sorcerer Celia Card
	   (CardNumSearch(742) && (n_A_JOB == cls_SUR || n_A_JOB == cls_SURt)) || //Sura Chen Card
	   (CardNumSearch(748) && (n_A_JOB == cls_ABI || n_A_JOB == cls_ABIt)) )  //Arch Bishop Margaretha Card
	{
		hpMultiplier += 10;
	}
	if(CardNumSearch(769))
	{//Venomous Chimera Card
		if(n_A_SHOES_DEF_PLUS >= 12)
			hpMultiplier += 15;
	}
	
// Equipment
	if(EquipNumSearch(715))
	{ // Variant Shoes
		hpMultiplier -= n_A_SHOES_DEF_PLUS;
	}
	if ( EquipNumSearch( 1583 ) )
	{ // Golden Angel Wing
		if ( SU_VIT >= 90 ) { hpMultiplier += 5; }
		if ( SU_VIT >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { hpMultiplier += 5;  }
	}
	if ( EquipNumSearch( 1584 ) )
	{ // Golden Angel Hairband
		if ( SU_VIT >= 70 ) { hpMultiplier += 2; }
		if ( SU_VIT >= 70 && n_A_HEAD_DEF_PLUS >= 7) { hpMultiplier += 3;  }
	}
	if(EquipNumSearch(1440))
	{ // Ur's Plate
		hpMultiplier += n_A_BODY_DEF_PLUS;
	}
	if(EquipNumSearch(1442) && n_A_SHOES_DEF_PLUS > 7)
	{ // Ur's Greaves
		hpMultiplier += n_A_SHOES_DEF_PLUS - 7;
	}
	if ( EquipNumSearch( 1292 ) )
	{ // Mental Stick
		if (n_A_Weapon_ATKplus > 5) hpMultiplier -= (n_A_Weapon_ATKplus-5)*2;
	}
	if ( EquipNumSearch( 1477 ) )
	{ // WoE Plate
		if (n_A_BODY_DEF_PLUS >= 9) { hpMultiplier += 25; }
	}
	if ( EquipNumSearch( 1476 ) )
	{ // WoE Suit
		if (n_A_BODY_DEF_PLUS >= 9) { hpMultiplier += 15; }
	}
	if ( EquipNumSearch( 1524 ) && n_A_HEAD_DEF_PLUS >= 1)
	{ // Turkey On Your Head
		hpMultiplier += n_A_HEAD_DEF_PLUS;
	}
	if ( EquipNumSearch( 1525 ) && n_A_HEAD_DEF_PLUS >= 7)
	{ // Sweet Valentine
		hpMultiplier += 4;
		if (n_A_HEAD_DEF_PLUS == 8) { hpMultiplier += 1; }
		else if (n_A_HEAD_DEF_PLUS == 9) { hpMultiplier += 2; }
		else if (n_A_HEAD_DEF_PLUS >= 10) { hpMultiplier += 3; }
	}
	if ( EquipNumSearch( 1687 ) && n_A_HEAD_DEF_PLUS >= 12)
	{ // Turkey On Your Head
		hpMultiplier += 7;
	}
	if ( EquipNumSearch( 1794 ) )
	{//Vit Glove
		if(SU_VIT >= 110)
			hpMultiplier += 1 * EquipNumSearch( 1794 );
	}
	if(EquipNumSearch(1948) || EquipNumSearch(1954))
	{//Vit Boots
		if(SU_VIT >= 120)
			hpMultiplier += 8;
	}
	if(EquipNumSearch(1990) && n_A_LEFT_DEF_PLUS >= 7)
	{// Seraphing Shield
		hpMultiplier += 5;
	}
	if ( EquipNumSearch( 2030 ) )
	{//Supplement Part Con
		hpMultiplier += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if ( EquipNumSearch( 2039 ) )
	{//Armor of Sixtus the Tough
		hpMultiplier += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
	}
	if( EquipNumSearch(2051)) 
	{//Dragon Slayer (Ancient Weapon)
		hpMultiplier += 3 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if( EquipNumSearch( 2091 ) )
	{//Anti-magic Suit
		if(n_A_BODY_DEF_PLUS >=9)
			hpMultiplier += 2;
	}
	if(EquipNumSearch(2132))
	{//Felrock‘s Set
		if((n_A_BODY_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS) >= 30)
			hpMultiplier += 5;
	}
	if(EquipNumSearch(2139))
	{//Chip set
		if((n_A_HEAD_DEF_PLUS) >= 9)
			hpMultiplier += 10;
	}
	if(EquipNumSearch(2144))
	{// "Chronocloak of Vitality"
		hpMultiplier += 3 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4);
	}
	if(EquipNumSearch(2049))
	{// "Ancient Hero Boots"
		if(n_A_SHOES_DEF_PLUS > 15)
			hpMultiplier += 10;
		else
			hpMultiplier += 2 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	}
	if(EquipNumSearch(2209))
	{// Flattery Robe + Survivor's Manteau
		hpMultiplier += n_A_BODY_DEF_PLUS;
	}
	if(EquipNumSearch(2212))
	{// Abusive Robe + Valkyrie Manteau
		hpMultiplier += n_A_BODY_DEF_PLUS;
	}
	for(var i = 0 ; i < 14 ; i++)
	{
		if(EquipNumSearch(2215 + i))
		{// Bio 5 Headgears
			hpMultiplier += Math.floor(n_A_HEAD_DEF_PLUS / 2);
		}
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		hpMultiplier += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	
//Shadows
	if ( EquipNumSearch( 1653 ) )
	{ // "Shadow Champion Armor"
		if (n_A_SHADOW_BODY_DEF_PLUS >= 7) { hpMultiplier += 1; }
	}
	if ( EquipNumSearch( 1654 ) )
	{ // "Shadow Champion Boots"
		if (n_A_SHADOW_SHOES_DEF_PLUS >= 7) { hpMultiplier += 1; }
	}
	if ( EquipNumSearch( 1655 ) )
	{ // "Shadow Champion Set"
		if ((n_A_SHADOW_SHOES_DEF_PLUS + n_A_SHADOW_BODY_DEF_PLUS) >= 15) { hpMultiplier += 1; }
	}
	if ( EquipNumSearch( 1657 ) )
	{ // "Shadow Mystic Ring"
		if (n_A_SHADOW_EARRING_DEF_PLUS >= 7) { hpMultiplier += 1; }
	}
	if ( EquipNumSearch( 1661 ) )
	{ // "Shadow Strongman Ring"
		if (n_A_SHADOW_EARRING_DEF_PLUS >= 7) { hpMultiplier += 1; }
	}
	if ( EquipNumSearch( 1714 ) )
	{ // "Shadow Swordman Pendant"
		if (n_A_SHADOW_EARRING_DEF_PLUS >= 7) { hpMultiplier += 1; }
	}
	if ( EquipNumSearch(1840) )
	{ // Shadow Taekwon Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9){ hpMultiplier += 10;}
	}
	if ( EquipNumSearch(1841) )
	{ // Shadow Super Novice Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7){ hpMultiplier += 5;}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9){ hpMultiplier += 5;}
	}
	if(EquipNumSearch(2291) || EquipNumSearch(2292))
	{// Wyrmeater's Shadow Set || Tiger Spirit Shadow Set
		hpMultiplier += Math.floor((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS)/2);
	}
	
//Enchant
	if(EnchNumSearch( 286 ))//Special LUK = 286
	{
		if(n_A_SHOULDER_DEF_PLUS >8)
		{
			hpMultiplier += 1;
		}
	}
	if(EnchNumSearch( 1397 ))
	{//Rune of Vitality 1
		if(n_A_BODY_DEF_PLUS >= 10)
			hpMultiplier += 5;
	}
	if(EnchNumSearch( 1398 ))
	{//Rune of Vitality 2
		if(n_A_BODY_DEF_PLUS >= 11)
			hpMultiplier += 7;
	}
	if(EnchNumSearch( 1399 ))
	{//Rune of Vitality 3
		if(n_A_BODY_DEF_PLUS >= 12)
			hpMultiplier += 8;
		if(n_A_BODY_DEF_PLUS >= 13)
			hpMultiplier += 2;
	}
	
	
// Items
	
// Skills
	if ( performerBuffs[ksBardSolo] === ksSongOfLutie && performerBuffs[ksBardSoloLevel] > 0 )
	{ // Song of Lutie
		var skillBonus = performerBuffs[ksBardSoloLevel];
		/*var skillBonus = 5 + ( performerBuffs[ksBardSoloLevel] * 2 );
		var musicLessonsBonus = performerBuffs[ksMusicLessons];
		var vitBonus = Math.floor( performerBuffs[ksBardVit] / 10 );
		hpMultiplier += skillBonus + musicLessonsBonus + vitBonus;*/
		if(skillBonus < 10)
			hpMultiplier += 9 + (skillBonus);
		else
			hpMultiplier += 20;
	}
	if ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) || acolyteBuffs[ksPPChange] > 0 )
	{ // Gentle Touch Convert
		if ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) )
		{
			hpMultiplier -= SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) * 4;
		}
		else
		{
			hpMultiplier -= acolyteBuffs[ksPPChange] * 4;
		}
	}
	else if ( SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) || acolyteBuffs[ksPPRevitalize] > 0 )
	{ // Gentle Touch Revitalize Max HP increase: [Skill Level x 2] %
		if ( SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) )
		{
			hpMultiplier += SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) * 2;
		}
		else
		{
			hpMultiplier += acolyteBuffs[ksPPRevitalize] * 2;
		}
	}
	if ( SkillSearch(skill_SOR_SUMMON_TYPE) == 3 && SkillSearch(skill_SOR_SUMMON_LEVEL) > 0 && SkillSearch(skill_SOR_SPIRIT_CONTROL) == 1 ) {
		//Tera
		hpMultiplier += SkillSearch(skill_SOR_SUMMON_LEVEL)*5;
	}
	if ( battleChantBuffs[pass_V_HP] )
	{ // BC +100% HP
		hpMultiplier += 100;
	}
	if ( SkillSearch( skill_SUR_RISING_DRAGON ) )
	{ // Rising Dragon
		hpMultiplier += 2 + SkillSearch( skill_SUR_RISING_DRAGON );
	}
	if ( SkillSearch( skill_ROY_FORCE_OF_VANGUARD ) )
	{ // Force of Vanguard
		hpMultiplier += 3 * SkillSearch( skill_ROY_FORCE_OF_VANGUARD );
	}
	if ( SkillSearch( skill_RUN_STONEHARD_SKIN ) )
	{ // Hagalaz Rune
		hpMultiplier -= 20;
	}
	if ( performerBuffs[ksChorus] === ksWarcryFromBeyond &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Warcry from Beyond
		var skillReduction = performerBuffs[ksChorusLevel] * 4;
		var performerBonus = performerBuffs[ksNumPerformers] * 4;
		
		if ( performerBonus > 20 )
		{
			performerBonus = 20;
		}
		
		hpMultiplier -= skillReduction + performerBonus;
	}
	if ( SkillSearch( skill_ROY_INSPIRATION ) )
	{ 
		if(PATCH < 2)
		{		
			// Inspiration (Skill Level x 5 )%
			hpMultiplier += SkillSearch( skill_ROY_INSPIRATION ) * 5;
		}
		else if(PATCH == 2)
		{
			hpMultiplier += SkillSearch( skill_ROY_INSPIRATION ) * 4;
		}

	}
	if ( ( SkillSearch (skill_AC_ANGELUS) || acolyteBuffs[ksAngelus] ) )
	{
		if( SkillSearch (skill_AC_ANGELUS) )
		{
			n_A_MaxHP += 50 * SkillSearch(skill_AC_ANGELUS);
		}
		else
		{
			n_A_MaxHP += 50 * acolyteBuffs[ksAngelus];
		}
	}
		
	// Apply Multiplier
	n_A_MaxHP = ( n_A_MaxHP * hpMultiplier ) / 100;

	if ( SkillSearch( skill_LK_FRENZY ) ) // Berserk
		n_A_MaxHP *= 3;
		
	if ( otherBuffs[ksElementField] == ksDeluge && otherBuffs[ksElementFieldLvl] >= 1 )
	{
		var dHP = [5,9,12,14,15];
		n_A_MaxHP = n_A_MaxHP * (100 + dHP[otherBuffs[ksElementFieldLvl]-1]) /100;
	}

	if(n_A_MaxHP < 1) // not negative
		n_A_MaxHP = 1;
		
	n_A_MaxHP = Math.floor(n_A_MaxHP);
	
	if (performerBuffs[ksMaestroSolo] === ksFriggsSongM || performerBuffs[ksWandererSolo] === ksFriggsSongW) {
	    var buffHPFriggsSong;
	    
	    if (performerBuffs[ksMaestroSolo] && performerBuffs[ksWandererSolo]) {
			if (performerBuffs[ksMaestroSoloLevel] >= performerBuffs[ksWandererSoloLevel]) {
				buffHPFriggsSong = performerBuffs[ksMaestroSoloLevel];
			} else {
				buffHPFriggsSong = performerBuffs[ksWandererSoloLevel];
			}
		} else {
		if (performerBuffs[ksMaestroSoloLevel]) {
			buffHPFriggsSong = performerBuffs[ksMaestroSoloLevel];
		} else {
			buffHPFriggsSong = performerBuffs[ksWandererSoloLevel];
		}
	    }
	 
	    n_A_MaxHP = Math.floor(n_A_MaxHP * (1 + (0.05 * buffHPFriggsSong)));
	}
	
	return n_A_MaxHP;
}

{JobSP_A = new Array(1, 2, 2, 5, 2, 6, 3,  3,  4, 8, 4, 9, 4,4.7, 5,4.7, 6, 6, 7, 4,1,  3,  4, 8, 4, 9, 4,4.7, 5,4.7, 6, 6, 7, 4,1, 2, 2, 5, 2, 6, 3, 2,4.7, 9,3.75,3.75,  3,  3,  4,  4, 8, 8, 4, 4, 9, 9, 4, 4,4.7,4.7, 5, 5,4.7,4.7, 6, 6, 6, 6, 7, 7, 4, 4, 1, 1,1);
JobSP_Third = [
/* RK */[300,310,313,316,319,322,325,328,331,334,337,340,343,346,349,352,355,358,361,364,367,370,373,376,379,382,385,388,391,394,397,400,403,406,409,412,415,418,421,424,427,430,433,436,439,442,445,448,451,454,457,460,500,566,629,672,710,748,781,824,847,890,894,898,902,906,910,915,920,925,930,935,941,947,953,959,965,971,977,983,989,995,1001,1007,1013,1019,1025,1031,1037,1043,1049,1055,1061,1067,1073,1079,1085,1091,1097,1103,1109,1115],
/* GX */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,670,695,700,715,730,745,760,785,790,805,810,815,820,825,830,836,842,848,854,860,867,874,881,888,895,902,909,916,923,930,937,944,951,958,965,972,979,986,993,1000,1007,1014,1021,1028,1035,1042,1049,1056,1063,1070],
/* AB */[800,810,818,826,834,842,850,858,866,874,882,890,898,906,914,922,930,938,946,954,962,970,978,986,994,1002,1010,1018,1026,1034,1042,1050,1058,1066,1074,1082,1090,1098,1106,1114,1122,1130,1138,1146,1154,1162,1170,1178,1186,1194,1202,1210,1258,1286,1334,1372,1410,1458,1466,1474,1482,1490,1499,1508,1517,1526,1535,1545,1555,1565,1575,1585,1596,1607,1618,1629,1640,1651,1662,1673,1684,1695,1706,1717,1728,1739,1750,1761,1772,1783,1794,1805,1816,1827,1838,1849,1860,1871,1882,1893,1904,1915],
/* RA */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,650,675,680,695,710,725,740,765,770,785,790,795,800,805,810,816,822,828,834,840,847,854,861,868,875,882,889,896,903,910,917,924,931,938,945,952,959,966,973,980,987,994,1001,1008,1015,1022,1029,1036,1043,1050],
/* WL */[900,910,919,928,937,946,955,964,973,982,991,1000,1009,1018,1027,1036,1045,1054,1063,1072,1081,1090,1099,1108,1117,1126,1135,1144,1153,1162,1171,1180,1189,1198,1207,1216,1225,1234,1243,1252,1261,1270,1279,1288,1297,1306,1315,1324,1333,1342,1351,1360,1369,1378,1387,1396,1405,1414,1423,1432,1441,1450,1460,1470,1480,1490,1500,1511,1522,1533,1544,1555,1567,1579,1591,1603,1615,1627,1639,1651,1663,1675,1687,1699,1711,1723,1735,1747,1759,1771,1783,1795,1807,1819,1831,1843,1855,1867,1879,1891,1903,1915],
/* ME */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,700,760,820,880,930,965,1020,1132,1160,1230,1235,1240,1245,1250,1255,1261,1267,1273,1279,1285,1292,1299,1306,1313,1320,1327,1334,1341,1348,1355,1362,1369,1376,1383,1390,1397,1404,1411,1418,1425,1432,1439,1446,1453,1460,1467,1474,1481,1488,1495],
/* RG */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,700,760,820,880,930,965,1020,1132,1160,1230,1235,1240,1245,1250,1255,1261,1267,1273,1279,1285,1292,1299,1306,1313,1320,1327,1334,1341,1348,1355,1362,1369,1376,1383,1390,1397,1404,1411,1418,1425,1432,1439,1446,1453,1460,1467,1474,1481,1488,1495],
/* SC */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,614,618,622,626,630,634,638,642,646,650,655,660,665,670,675,681,687,693,699,705,712,719,726,733,740,747,754,761,768,775,782,789,796,803,810,817,824,831,838,845,852,859,866,873,880,887,894,901,908,915],
/* SU */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,614,618,622,626,630,634,638,642,646,650,655,660,665,670,675,681,687,693,699,705,712,719,726,733,740,747,754,761,768,775,782,789,796,803,810,817,824,831,838,845,852,859,866,873,880,887,894,901,908,915],
/* MI */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,614,648,702,726,750,774,808,822,846,850,855,860,865,870,875,881,887,893,899,905,912,919,926,933,940,947,954,961,968,975,982,989,996,1003,1010,1017,1024,1031,1038,1045,1052,1059,1066,1073,1080,1087,1094,1101,1108,1115],
/* WA */[400,410,414,418,422,426,430,434,438,442,446,450,454,458,462,466,470,474,478,482,486,490,494,498,502,506,510,514,518,522,526,530,534,538,542,546,550,554,558,562,566,570,574,578,582,586,590,594,598,602,606,610,614,648,702,726,750,774,808,822,846,850,855,860,865,870,875,881,887,893,899,905,912,919,926,933,940,947,954,961,968,975,982,989,996,1003,1010,1017,1024,1031,1038,1045,1052,1059,1066,1073,1080,1087,1094,1101,1108,1115],
/* SO */[900,910,919,928,937,946,955,964,973,982,991,1000,1009,1018,1027,1036,1045,1054,1063,1072,1081,1090,1099,1108,1117,1126,1135,1144,1153,1162,1171,1180,1189,1198,1207,1216,1225,1234,1243,1252,1261,1270,1279,1288,1297,1306,1315,1324,1333,1342,1351,1360,1369,1378,1387,1396,1405,1414,1423,1432,1441,1450,1460,1470,1480,1490,1500,1511,1522,1533,1544,1555,1567,1579,1591,1603,1615,1627,1639,1651,1663,1675,1687,1699,1711,1723,1735,1747,1759,1771,1783,1795,1807,1819,1831,1843,1855,1867,1879,1891,1903,1915],
/* GE */[900,910,919,928,937,946,955,964,973,982,991,1000,1009,1018,1027,1036,1045,1054,1063,1072,1081,1090,1099,1108,1117,1126,1135,1144,1153,1162,1171,1180,1189,1198,1207,1216,1225,1234,1243,1252,1261,1270,1279,1288,1297,1306,1315,1324,1333,1342,1351,1360,1369,1378,1387,1396,1405,1414,1423,1432,1441,1450,1460,1470,1480,1490,1500,1511,1522,1533,1544,1555,1567,1579,1591,1603,1615,1627,1639,1651,1663,1675,1687,1699,1711,1723,1735,1747,1759,1771,1783,1795,1807,1819,1831,1843,1855,1867,1879,1891,1903,1915],
// /* KO */[544,550,555,560,566,571,577,582,587,593,598,604,609,614,620,625,631,636,641,647,652,658,663,668,674,679,685,690,695,701,706,712,717,722,728,733,739,744,749,755,760,766,771,776,782,787,793,798,803,809,814,820,825,830,836,841,847,852,857,863,868,874,879,884,890,895,901,906,911,917,922,928,933,938,944,949,955] //Used Kagerou
/* KO */[522,530,538,546,554,562,570,578,586,594,602,610,618,626,634,642,650,658,666,674,682,690,698,706,714,722,730,738,746,754,762,770,778,786,794,802,810,818,826,834,842,850,858,866,874,882,890,898,906,914,922,930,938,946,954,962,970,978,986,994,1002,1010,1018,1026,1034,1042,1050,1058,1066,1074,1082,1090,1098,1106,1114,1122,1130,1138,1146,1154,1162,1170,1178,1186,1194,1202,1210,1218,1226,1234,1242,1250,1258,1266,1274,1282,1290,1298,1306,1314,1322,1330] //Used Kagerou
/* OBO  [522,530,538,546,554,562,570,578,586,594,602,610,618,626,634,642,650,658,666,674,682,690,698,706,714,722,730,738,746,754,762,770,778,786,794,802,810,818,826,834,842,850,858,866,874,882,890,898,906,914,922,930,958,976,994,1002,1014,1028,1046,1060,1082,1100]*/
/* RE *///[456,462,468,474,480,486,492,498,504,510,516,522,528,534,540,546,552,558,564,570,576,582,588,594,600,606,612,618,624,630,636,642,648,654,660,666,672,678,684,690,696,702,708,714,720,726,732,738,744,750,756,762,774,780,786,792,798,804,810,816,822,830],
];
var SP_COEFF = [
/* WL, SO, GE */
/* AB */
/* GX, RA, ME, RG, SU, SC, WA, MI */
/* RK */

/* RK */300,
/* GX */400,
/* AB */800,
/* RA */400,
/* WL */900,
/* ME */400,
/* RG */400,
/* SC */400,
/* SU */400,
/* MI */400,
/* WA */400,
/* SO */900,
/* GE */900,
/* KO */515
];
}

function calcSP( n_A_MaxSP )
{
	if ( thirdClass === 0 || n_A_JOB === cls_ENOVI )
	{ // Non-3rd class
		wSPSL = 0;
		if(n_A_JOB == cls_SL)
		{
			if(n_A_BaseLV >= 70)
			{
				if(n_A_BaseLV < 80)
					wSPSL = (n_A_BaseLV - 70) *4 +5;
				else if(n_A_BaseLV < 90)
					wSPSL = (n_A_BaseLV - 80) *4;
				else if(n_A_BaseLV < 93)
					wSPSL = (n_A_BaseLV - 90) *4;
				else if(n_A_BaseLV < 99)
					wSPSL = (n_A_BaseLV - 90) *4 -10;
				else wSPSL = 1;
			}
		}
		n_A_MaxSP = Math.floor(10 + n_A_BaseLV * JobSP_A[n_A_JOB] - wSPSL);
		if(n_A_JOB == cls_TKK && n_A_BaseLV >= 70)
		{
			if(n_A_BaseLV <=79)
				n_A_MaxSP = 150 + 1 * (n_A_BaseLV-70);
			else if(n_A_BaseLV <=89)
				n_A_MaxSP = 160 + 1 * (n_A_BaseLV-70);
			else if(n_A_BaseLV <=99)
			{
				n_A_MaxSP = 190;
				if(SkillSearch(skill_TK_TAEKWON_RANKER))
					n_A_MaxSP = n_A_MaxSP * 3;
				n_A_MaxSP = Math.floor(n_A_MaxSP);
			}
		}
		if(n_A_JOB == cls_TKM && n_A_BaseLV >= 70)
		{
			if(n_A_BaseLV <=79)
				n_A_MaxSP = 339 + 2 * (n_A_BaseLV-70);
			else if(n_A_BaseLV <=89)
				n_A_MaxSP = 386 + 2 * (n_A_BaseLV-80);
			else if(n_A_BaseLV <=99)
				n_A_MaxSP = 430 + 3 * (n_A_BaseLV-90);
		}
		if(n_A_JOB == cls_NIN)
		{
			if(n_A_BaseLV <= 20) n_A_MaxSP = 11 + n_A_BaseLV * 3;
			else if(n_A_BaseLV <= 40) n_A_MaxSP = 71 +(n_A_BaseLV-20)*4;
			else if(n_A_BaseLV <= 60) n_A_MaxSP = 151 +(n_A_BaseLV-40)*5;
			else if(n_A_BaseLV <= 80) n_A_MaxSP = 251 +(n_A_BaseLV-60)*6;
			else n_A_MaxSP = 370 +(n_A_BaseLV-80)*8;
		}
		if(n_A_JOB == cls_GUN || n_A_JOB == cls_REB)
		{
			if(n_A_BaseLV <= 25) n_A_MaxSP = 10 + n_A_BaseLV * 3;
			else if(n_A_BaseLV <= 35) n_A_MaxSP = 85 +(n_A_BaseLV-25)*4;
			else if(n_A_BaseLV <= 40) n_A_MaxSP = 126 +(n_A_BaseLV-35)*3;
			else if(n_A_BaseLV <= 50) n_A_MaxSP = 141 +(n_A_BaseLV-40)*4;
			else if(n_A_BaseLV <= 75) n_A_MaxSP = 181 +(n_A_BaseLV-50)*5;
			else if(n_A_BaseLV <= 78) n_A_MaxSP = 306 +(n_A_BaseLV-75)*6;
			else n_A_MaxSP = 330 +(n_A_BaseLV-78)*6;
		}
		if (n_A_JOB === cls_KAGOB) {
                    n_A_MaxSP = JobSP_Third[13][n_A_BaseLV - 99];
                }
		/*if (n_A_JOB === cls_REB) {
                    n_A_MaxSP = JobSP_Third[14][n_A_BaseLV - 99];
                }*/
			if (n_A_JOB === cls_SUM) {
			SumSP = new Array(8,10,13,15,18,20,23,25,28,30,
								  33,35,38,40,43,45,48,50,53,55,
								  58,60,63,65,68,70,73,75,78,80,
								  83,85,88,90,93,95,98,100,103,105,
								  108,110,113,115,118,120,123,125,128,130,// 50
								  133,135,138,140,143,145,148,150,153,155,
								  158,160,163,165,168,170,173,175,178,180,
								  183,185,188,190,193,195,198,200,203,205,
								  208,210,213,215,218,220,223,225,228,230,
								  233,235,238,240,243,245,248,250,253,257,// 100
								  261,265,269,273,278,283,288,293,298,304,
								  310,316,322,328,335,342,349,356,363,371,
								  379,387,395,403,412,421,430,439,448,458,
								  468,478,488,498,509,520,531,542,553,565,
								  577,589,601,613,626,639,642,655,668,682,// 150
								  696,710,724,738,753,768,783,798,813,829,
								  835,851,867,883,899,916,933,950,967,984,
								  1002,1020,1038,1056,1074,1082,1090,1098,1106,1114,
								  1122,1130,1138,1146,1154,1162,1170,1178,1186,1194,
								  1202,1210,1218,1226,1234,1242,1250,1258,1266,1274);//200
			n_A_MaxSP = SumSP[n_A_BaseLV-1];
		}
	}
	else
	{ // 3rd Class
		n_A_MaxSP = JobSP_Third[Math.floor( n_A_JOB / 2 ) - 23][n_A_BaseLV - 99];
	}
	if ( rebirthClass )
	{ // Rebirth
		n_A_MaxSP = Math.floor(n_A_MaxSP * 125 /100);
	}
	if ( n_A_Adopted )
	{ // Adopted
		n_A_MaxSP = Math.floor(n_A_MaxSP *70 /100);
	}
	n_A_MaxSP = Math.floor(n_A_MaxSP * (100 + n_A_INT) / 100);

	// Flat Additions -------------------------
	w=0;
	
	w += n_tok[bon_SP_ADD];
	w += StPlusCalc2(bon_INT);
	w += StPlusCalc2(bon_ALL_STATS);

	// Cards
	if(n_A_JobSearch()==cls_MAG)
	{ // MageCls
		w += 100 * CardNumSearch(card_HEAD_BANSHEE); // Banshee
		w += 100 * CardNumSearch(476); // Agav
	}
	if(n_A_HEAD_DEF_PLUS <= 4 && n_A_card[card_loc_HEAD_UPPER]==179) // Blue Acidus
		w += 40;
	if(n_A_card[card_loc_HEAD_MIDDLE]==179) // Blue Acidus
		w += 40;
	if(n_A_HEAD_DEF_PLUS >= 9 && n_A_card[card_loc_HEAD_UPPER] == 298) // Carat
		w += 150;

	// Equipment
	if ( EquipNumSearch( 536 ) )
	{ // ValkShoes
		jobClass = n_A_JobSearch();
		if ( jobClass === cls_SWO ||
			 jobClass === cls_THI ||
			 jobClass === cls_MER )
		{
			w += 2 * n_A_JobLV;
		}
	}
	if ( n_A_Weapon_ATKplus >= 9 && EquipNumSearch(642))
	{ // LBW
		w += 300;
	}
	if ( EquipNumSearch( 762 ) )
	{
		w += 5 * n_A_BaseLV;
	}
	if ( EquipNumSearch( 770 ) )
	{ // Quill + Small Book Pen
		w += n_A_JobLV;
	}
	if ( EquipNumSearch( 859 ) )
	{ // Brynhild
		w += n_A_BaseLV *5;
	}
	if ( EquipNumSearch( 883 ) && n_A_BaseLV <= 79 )
	{ // Badge Academy
		w += 200 * EquipNumSearch(883);
	}
	if ( EquipNumSearch(986) )
	{ // Chameleon
		w += Math.floor(0.5 * n_A_BaseLV);
	}
	if ( EquipNumSearch( 1118 ) && n_A_JobSearch() == cls_ACO )
	{ // AcolyteFigurine
		w += 50 * EquipNumSearch( 1118 );
	}
	if ( n_A_Weapon_ATKplus >= 6 && EquipNumSearch( 1168 ) )
	{ // Withered Branch Staff
		w += -100;
	}
	if ( EquipNumSearch( 1193 ) )
	{ // Proxy Skin Fragment
		w += Math.floor(n_A_BaseLV / 3) + n_A_SHOULDER_DEF_PLUS * 10;
	}
	if ( EquipNumSearch( 1172 ) && n_A_Weapon_ATKplus > 0 )
	{ // Kronos
		var kronosMod = Math.floor(n_A_Weapon_ATKplus / 2);
		w += 50 * kronosMod;
	}
	if ( EquipNumSearch( 1370 ) )
	{ // Sigrun's Wings
		if ( n_A_JobSearch() == cls_NOV )
		{ // Novices
			w += 30;
		}
	}
	if ( EquipNumSearch( 1475 ) )
	{ // WoE Robe
		if (n_A_BODY_DEF_PLUS >= 9) { w += 100; }
	}
	if(EquipNumSearch(1874))
	{ //"Fine Foxtail Replica"
		w += 15 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(1880))
	{ //"Elaborate Foxtail Replica"
		w += 15 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(1881))
	{ //"Elaborate Yellow Foxtail Replica"
		w += 20 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(1875))
	{ //"Foxtail Replica"
		w += 10 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(1873))
	{ //"Marvelous Foxtail Staff"
		w += 10 * Math.floor( n_A_Weapon_ATKplus / 3 );
	}
	if(EquipNumSearch(1919))
	{ //"Foxtail Ring"
		if(n_A_BaseLV <= 50)
		{
			w += 5 * Math.floor(n_A_BaseLV /5);
		}
		else
		{
			w += 50;
		}
	}
	if(EquipNumSearch(1946) || EquipNumSearch(1952) || EquipNumSearch(2197)  //Str Boots
	|| EquipNumSearch(1947) || EquipNumSearch(1953) || EquipNumSearch(2198)  //Agi Boots
	|| EquipNumSearch(1948) || EquipNumSearch(1954) || EquipNumSearch(2199)  //Vit Boots
	|| EquipNumSearch(1949) || EquipNumSearch(1955) || EquipNumSearch(2200)  //Int Boots
	|| EquipNumSearch(1950) || EquipNumSearch(1956) || EquipNumSearch(2201)  //Dex Boots
	|| EquipNumSearch(1951) || EquipNumSearch(1957) || EquipNumSearch(2202)) //Luk Boots
	{
		w += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	}
	if(EquipNumSearch(1869))
	{//Elegant Doram Shoes
		w += 20 * Math.floor(n_A_SHOES_DEF_PLUS / 2);
	}
	if(EquipNumSearch(2129))
	{//Felrock‘s Armor
		if(n_A_BODY_DEF_PLUS >= 7)
			w += 50;
		if(n_A_BODY_DEF_PLUS >= 9)
			w += 20;
		if(n_A_BODY_DEF_PLUS >= 12)
			w += 30;
	}
	if(EquipNumSearch(2233))
	{//Mercenary Ring Type A
		if(n_A_JobSearch() == cls_NOV)
		{
			w += 200;
		}
	}
	if(n_A_Equip[eq_WEAPON] == 2246)
	{// Sealed Magic Sword [2]
		if(n_A_Weapon_ATKplus >= 7)
		{
			w += 50;
		}
		if(n_A_Weapon_ATKplus >= 10)
		{
			w += 50;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2246)
	{// Sealed Magic Sword [2]
		if(n_A_Weapon2_ATKplus >= 7)
		{
			w += 50;
		}
		if(n_A_Weapon2_ATKplus >= 10)
		{
			w += 50;
		}
	}
	
	
//Shadows
	if ( EquipNumSearch( 1655 ) )
	{ // "Shadow Champion Set"
		w  += (n_A_SHADOW_SHOES_DEF_PLUS + n_A_SHADOW_BODY_DEF_PLUS);
	}
	if ( EquipNumSearch(1840) )
	{ // Shadow Taekwon Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7){w += 200;}
	}
	
// Skills	
	if ( SkillSearch( skill_SL_KAINA ) )
	{
		w += 30 * SkillSearch( skill_SL_KAINA );
	}
	if ( SkillSearch( skill_RAN_RESEARCH_TRAP ) )
	{
		w += ( 200 + 20 * SkillSearch( skill_RAN_RESEARCH_TRAP ) );
	}
	if ( SkillSearch( skill_MIWA_VOICE_LESSONS ) )
	{
		w += 30 * SkillSearch( skill_MIWA_VOICE_LESSONS );
	}
	if ( SkillSearch( skill_SUM_SPRITE_MARBLE ) )
	{
		w += 100;
	}

	n_A_MaxSP += w;
	n_A_MaxSP = Max(0,n_A_MaxSP);

	// Multipliers ---------------
	var spMultiplier = 0;
	
	spMultiplier += n_tok[bon_SP_MUL];
	
// Cards
	if ( n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch( 304 ) )
	{ // Firelock Soldier
		spMultiplier += 10;
	}
	if ( CardNumSearch( 405 ) )
	{ // Aliot
		if ( n_A_JobSearch() == cls_ACO ||
			 n_A_JobSearch() == cls_ARC ||
			 n_A_JobSearch() == cls_MAG )
		{
			spMultiplier += 5;
		}
	}
	if(CardNumSearch(578))
	{//Alphoccio Basil Card
		if(n_A_JobSearch2() == cls_BAR)
		spMultiplier += 5;
	}
	if(CardNumSearch(579))
	{//Trentini Card
		if(n_A_JobSearch2() == cls_DAN)
		spMultiplier += 5;
	}
	if((CardNumSearch(740) && (n_A_JOB == cls_MIN || n_A_JOB == cls_MINt)) || //Maestro Alphoccio Card
	   (CardNumSearch(752) && (n_A_JOB == cls_WAN || n_A_JOB == cls_WANt)) )  //Wanderer Trentini Card
	{
		spMultiplier += 10;
	}
	if(CardNumSearch(769))
	{//Venomous Chimera Card
		if(n_A_SHOES_DEF_PLUS >= 12)
			spMultiplier += 15;
	}
	
// Equipment
	if ( n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch( 407 ) )
	{ // Gold Acidus
		spMultiplier += 4;
	}
	if ( EquipNumSearch( 715 ) )
	{ // Variant Shoes
		spMultiplier -= n_A_SHOES_DEF_PLUS;
	}
	if ( EquipNumSearch( 1583 ) )
	{ // Golden Angel Wing
		if ( SU_VIT >= 90 ) { spMultiplier += 5; }
		if ( SU_VIT >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) { spMultiplier += 5;  }
	}
	if ( EquipNumSearch( 1584 ) )
	{ // Golden Angel Hairband
		if ( SU_VIT >= 70 ) { spMultiplier += 2; }
		if ( SU_VIT >= 70 && n_A_HEAD_DEF_PLUS >= 7) { spMultiplier += 3;  }
	}
	if ( EquipNumSearch( 1524 ) && n_A_HEAD_DEF_PLUS >= 1)
	{ // Turkey On Your Head
		spMultiplier += n_A_HEAD_DEF_PLUS;
	}
	if ( EquipNumSearch( 1525 ) && n_A_HEAD_DEF_PLUS >= 7)
	{ // Sweet Valentine
		spMultiplier += 4;
		if (n_A_HEAD_DEF_PLUS == 8) { spMultiplier += 1; }
		else if (n_A_HEAD_DEF_PLUS == 9) { spMultiplier += 2; }
		else if (n_A_HEAD_DEF_PLUS >= 10) { spMultiplier += 3; }
	}
	if ( EquipNumSearch( 1687 ) && n_A_HEAD_DEF_PLUS >= 12)
	{ // Turkey On Your Head
		spMultiplier += 3;
	}
	if(EquipNumSearch(1883))
	{ //"Magic Foxtrail Staff"
		spMultiplier += 1 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(1877))
	{ //"Wondrous Foxtail Staff"
		spMultiplier += 1 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(1990) && n_A_LEFT_DEF_PLUS >= 7)
	{// Seraphing Shield
		spMultiplier += 5;
	}
	if( EquipNumSearch(2051)) 
	{//Dragon Slayer (Ancient Weapon)
		spMultiplier += 3 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if( EquipNumSearch(2078))   
	{//Demon's Shot
		spMultiplier += 2 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(2132))
	{//Felrock‘s Set
		if((n_A_BODY_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS) >= 30)
			spMultiplier += 5;
	}
	if(EquipNumSearch(2139))
	{//Chip set
		if((n_A_HEAD_DEF_PLUS) >= 9)
			spMultiplier += 50;
	}
	if(EquipNumSearch(2049))
	{// "Ancient Hero Boots"
		if(n_A_SHOES_DEF_PLUS > 15)
			spMultiplier += 5;
		else
			spMultiplier += Math.floor(n_A_SHOES_DEF_PLUS / 3);
	}
	if(EquipNumSearch(2208))
	{// Flattery Robe + Ancient Cape[0]\[1]
		spMultiplier += n_A_BODY_DEF_PLUS;
	}
	for(var i = 0 ; i < 14 ; i++)
	{
		if(EquipNumSearch(2215 + i))
		{// Bio 5 Headgears
			spMultiplier += Math.floor(n_A_HEAD_DEF_PLUS / 2);
		}
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		spMultiplier += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	
//Shadows
	if ( EquipNumSearch( 1654 ) )
	{ // "Shadow Champion Boots"
		if (n_A_SHADOW_SHOES_DEF_PLUS >= 7) { spMultiplier += 1; }
	}
	if ( EquipNumSearch( 1658 ) )
	{ // "Shadow Mystic Pendant"
		if (n_A_SHADOW_PENDANT_DEF_PLUS >= 7) { spMultiplier += 1; }
	}
	if ( EquipNumSearch( 1710 ) )
	{ // "Shadow Warlock Shield"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) { spMultiplier += 1; }
	}
	if ( EquipNumSearch( 1717 ) )
	{ // "Shadow Diviner Pendant"
		if (n_A_SHADOW_PENDANT_DEF_PLUS >= 7) { spMultiplier += 1; }
	}
	if ( EquipNumSearch(1840) )
	{ // Shadow Taekwon Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9){spMultiplier += 10;}
	}
	if ( EquipNumSearch(1841) )
	{ // Shadow Super Novice Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7){spMultiplier += 5;}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9){spMultiplier += 5;}
	}
	if ( EquipNumSearch( 1662 ) )
	{ // "Shadow Strongman Pendant"
		if (n_A_SHADOW_PENDANT_DEF_PLUS >= 7) { spMultiplier += 1; }
	}
	if(EquipNumSearch(2291) || EquipNumSearch(2292))
	{// Wyrmeater's Shadow Set || Tiger Spirit Shadow Set
		spMultiplier += Math.floor((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS)/2);
	}
	
//Enchant
	if(EnchNumSearch( 283 ))//Special VIT = 283
	{
		if(n_A_SHOULDER_DEF_PLUS >8)
		{
			spMultiplier += 1;
		}
	}
	// Skills
	if ( SkillSearch( skill_SUR_RISING_DRAGON ) )
	{ // Rising Dragon
		spMultiplier += 2 + SkillSearch( skill_SUR_RISING_DRAGON );
	}
	if ( SkillSearch( skill_HP_MEDIATIO ) )
	{ // Meditatio
		spMultiplier += SkillSearch(skill_HP_MEDIATIO);
	}
	if ( SkillSearch( skill_HW_SOUL_DRAIN ) )
	{ // Soul Drain
		spMultiplier += SkillSearch( skill_HW_SOUL_DRAIN ) * 2;
	}
	if ( battleChantBuffs[pass_V_SP] )
	{ // Battle Chant
		spMultiplier += 100;
	}
	if ( performerBuffs[ksDancerSolo] === ksGypsysKiss && performerBuffs[ksDancerSoloLevel] > 0 )
	{ // Gypsy's Kiss
		// var skillBonus = 15 + performerBuffs[ksDancerSoloLevel];
		// var danceLessonsBonus = Math.floor( performerBuffs[ksDanceLessons] / 2 );
		// var intBonus = Math.floor( performerBuffs[ksDancerInt] / 10 );
		// spMultiplier += skillBonus + danceLessonsBonus + intBonus;
		var skillBonus = performerBuffs[ksDancerSoloLevel];
		if(skillBonus < 10)
			spMultiplier += 9 + (skillBonus);
		else
			spMultiplier += 20;
	}
		
	// Items
	if ( usableItems[ksVitataFiveHundred] )
	{
		spMultiplier += 5;
	}
	if ( usableItems[ksIncreaseSP] > 0 )
	{
		var modifier = 0;
		
		if ( usableItems[ksIncreaseSP] === 1 )
		{
			modifier = -5;
		}
		else if ( usableItems[ksIncreaseSP] === 3 )
		{
			modifier = 5;
		}
		spMultiplier += ( n_A_BaseLV / 10 ) + modifier;
	}
	if(usableItems[ksMindPotion])
	{
		spMultiplier += 10;
	}
	

	n_A_MaxSP = Math.floor( n_A_MaxSP * ( 100 + spMultiplier ) / 100 );
	
	return n_A_MaxSP;
}

function calcHardDef( n_A_totalDEF )
{
	n_A_DEF = n_tok[bon_DEF];
	
	for(i=2;i<=10;i++)
		n_A_DEF += ItemOBJ[n_A_Equip[i]][itm_DEF];

	n_A_DEFplus = n_A_HEAD_DEF_PLUS + n_A_BODY_DEF_PLUS + n_A_LEFT_DEF_PLUS + n_A_SHOULDER_DEF_PLUS + n_A_SHOES_DEF_PLUS;
	
	// +5 gives additional def, +9 further, +13 further, +17 further
	n_A_DEFplus += Max(0,n_A_HEAD_DEF_PLUS-4) + Max(0,n_A_BODY_DEF_PLUS-4) + Max(0,n_A_LEFT_DEF_PLUS-4) + Max(0,n_A_SHOULDER_DEF_PLUS-4) + Max(0,n_A_SHOES_DEF_PLUS-4);
	n_A_DEFplus += Max(0,n_A_HEAD_DEF_PLUS-8) + Max(0,n_A_BODY_DEF_PLUS-8) + Max(0,n_A_LEFT_DEF_PLUS-8) + Max(0,n_A_SHOULDER_DEF_PLUS-8) + Max(0,n_A_SHOES_DEF_PLUS-8);
	n_A_DEFplus += Max(0,n_A_HEAD_DEF_PLUS-12) + Max(0,n_A_BODY_DEF_PLUS-12) + Max(0,n_A_LEFT_DEF_PLUS-12) + Max(0,n_A_SHOULDER_DEF_PLUS-12) + Max(0,n_A_SHOES_DEF_PLUS-12);
	n_A_DEFplus += Max(0,n_A_HEAD_DEF_PLUS-16) + Max(0,n_A_BODY_DEF_PLUS-16) + Max(0,n_A_LEFT_DEF_PLUS-16) + Max(0,n_A_SHOULDER_DEF_PLUS-16) + Max(0,n_A_SHOES_DEF_PLUS-16);
		
	if(n_A_LEFT_DEF_PLUS <= 5 && CardNumSearch(222)) // Arclouze
		n_A_DEF += 2;
	if(n_A_BODY_DEF_PLUS <= 5 && CardNumSearch(283)) // Goat
		n_A_DEF += 2;
	if(n_A_BODY_DEF_PLUS >= 12 && CardNumSearch(519)) // Hardrock Mammoth
		n_A_DEF += 20;
	if(CardNumSearch(721))
	{//Powerful Amdarais Card
		n_A_DEF += n_A_BODY_DEF_PLUS * 10;
	}
	if(CardNumSearch(749) && (n_A_JOB == cls_ROY || n_A_JOB == cls_ROYt))
	{//Royal Guard Randel Card
		n_A_DEF += 350;
	}
		
	if (otherBuffs[ksOdinsPower] >= 1) { //Odin's Power
		n_A_DEF -= 20;
	}

	if(EquipNumSearch(521)){ // Lunar Bow
		if(n_A_Weapon_ATKplus <= 5)
			n_A_DEF += 2;
		else if(n_A_Weapon_ATKplus >= 9)
			n_A_DEF += 7;
		else
			n_A_DEF += 5;
	}
	if(EquipNumSearch(658)) // Gatekeeper-DD
		n_A_DEF += n_A_Weapon_ATKplus;
	if(EquipNumSearch(715)) // Variant Shoes
		n_A_DEF += Math.floor(n_A_SHOES_DEF_PLUS /2);
	if(EquipNumSearch(742) && n_A_JobSearch()==cls_SWO) // Set ?
		n_A_DEF += 6;
	if(EquipNumSearch(764)) // Set ?
		n_A_DEFplus -= (n_A_HEAD_DEF_PLUS + n_A_LEFT_DEF_PLUS);
	if(EquipNumSearch(809)) // Leaf Hat
		n_A_DEFplus -= n_A_HEAD_DEF_PLUS;
	if(EquipNumSearch(942)) // Cardo
		n_A_DEF += Math.floor(n_A_Weapon_ATKplus / 2);;
	if(EquipNumSearch(986) && (n_A_JobSearch()==cls_SWO || n_A_JobSearch()==cls_THI || n_A_JobSearch()==cls_MER)) // Chameleon Armor
		n_A_DEF += 3;
	if(EquipNumSearch(987) && (EquipNumSearch(616) || EquipNumSearch(617) || EquipNumSearch(618))) // SprintMail / Set
		n_A_DEF += 2;
	if(EquipNumSearch(1026)) // Santa Beard
		n_A_DEF -= 5;
	if(EquipNumSearch(1117) && n_A_JobSearch()==cls_SWO) // Swordsman Figurine
		n_A_DEF += 2 * EquipNumSearch(1117);
	if(SU_INT >= 120 && EquipNumSearch(1264)) // Reissue Schmitz Helm
		n_A_DEF += 5;
	if ( EquipNumSearch( 872 ) )
	{ // Crown of Deceit
		if ( n_A_HEAD_DEF_PLUS >= 7 )
		{
			n_A_DEF += 5;
		}
	}
	if ( EquipNumSearch( 1336 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Aquarius Diadem
		n_A_DEF += 1;
	}
	if ( EquipNumSearch( 1337 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Aries Diadem
		n_A_DEF += 1;
	}
	if ( EquipNumSearch( 1346 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Taurus Diadem
		n_A_DEF += 2;
	}
	if ( EquipNumSearch( 1349 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Cancer Crown
		n_A_DEF += 1;
	}
	if ( EquipNumSearch( 1356 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Taurus Crown
		n_A_DEF += 2;
	}
	if ( EquipNumSearch( 1351 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Leo Crown
		n_A_DEF += 1;
	}i
	if(EquipNumSearch(1546))
	{ // Enhanced Variant Shoes
		n_A_DEF += Math.floor(n_A_SHOES_DEF_PLUS /2);
	}
	if(EquipNumSearch(2205))
	{ // Royal Guard Shield
		n_A_DEF += n_A_LEFT_DEF_PLUS * 10;
	}
	if(n_A_Equip[eq_WEAPON] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon_ATKplus >= 10)
		{
			n_A_DEF += 50;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon2_ATKplus >= 10)
		{
			n_A_DEF += 50;
		}
	}
	
// Shadows
	if(EquipNumSearch(1812))
	{ // Shadow Genetic Shield
		n_A_DEF += n_A_SHADOW_SHIELD_DEF_PLUS * (SkillSearch(skill_GEN_CART_TORNADO) + SkillSearch(skill_GEN_CART_CANNON) + SkillSearch(skill_GEN_CART_BOOST));
	}
	if(EquipNumSearch(1837))
	{ // Shadow Minstrel Shield
		n_A_DEF += n_A_SHADOW_SHIELD_DEF_PLUS * (SkillSearch(skill_MIN_WINDMILL) + SkillSearch(skill_MIN_ECHO_SONG) + SkillSearch(skill_MIN_HARMONIZE));
	}
	if(EquipNumSearch(1838))
	{ // Shadow Wanderer Shield
		n_A_DEF += n_A_SHADOW_SHIELD_DEF_PLUS * (SkillSearch(skill_WAN_MOONLIGHT) + SkillSearch(skill_WAN_SYMPHONY) + SkillSearch(skill_WAN_SWING_DANCE));
	}
	
// Skills
	if ( performerBuffs[ksEnsemble] === ksBattleTheme && performerBuffs[ksEnsembleLevel] > 0 )
	{ // Battle Theme
		n_A_DEF += 15 * performerBuffs[ksEnsembleLevel];
	}
	if ( SkillSearch( skill_MEC_MAINFRAME_RESTRUCTURE ) )
	{ // Remodel Mainframe
		n_A_DEF += 20 + 20 * SkillSearch( skill_MEC_MAINFRAME_RESTRUCTURE );
	}
	if ( SkillSearch( skill_ROY_SHIELD_SPELL ) === 3 && PATCH < 2)
	{ // shield sell DEF increase: [(Shield Upgrade x 10) x (Caster’s Base Level / 100)]
		n_A_DEF += Math.floor( ( n_A_LEFT_DEF_PLUS * 10 ) * n_A_BaseLV / 100.0 );
	}
	if ( SkillSearch( skill_ROY_PRESTIGE ) )
	{ // Prestige DEF increase: [{(Skill Level x 15) + (Defending Aura Skill Level x 10)} x Caster’s Base Level / 100]
		n_A_DEF += Math.floor( ( ( SkillSearch( skill_ROY_PRESTIGE ) * 15 ) + ( SkillSearch( skill_CR_DEFENDING_AURA ) * 10 ) ) * n_A_BaseLV / 100.0 );
	}
	if ( SkillSearch(skill_ROY_BANDING ) )
	{ // Banding DEF increase: [# of Royal Guard party members x (5 + 1 * Skill Level)]
		n_A_DEF += ( 5 + SkillSearch( skill_ROY_BANDING ) ) * SkillSearch( skill_ROY_NUM_GUARDS );
	}
	if ( SkillSearch( skill_RUN_STONEHARD_SKIN ) )
	{ // Hagalaz Rune
		n_A_DEF += Math.floor( n_A_JobLV * SkillSearch( skill_RUN_RUNE_MASTERY ) / 4 );
	}
	if ( acolyteBuffs[ksAssumptio] )
	{ // Assumptio
		n_A_DEF += acolyteBuffs[ksAssumptio] * 50;
	}
		
	// Total Physical Defense
	n_A_totalDEF = n_A_DEF + n_A_DEFplus;

	// Multipliers-----------------
	if(n_tok[bon_USR_DEF_DIV])
		n_A_totalDEF = Math.floor(n_A_totalDEF / n_tok[bon_USR_DEF_DIV]);
	if(n_tok[bon_DEF_MUL]) // ?
		n_A_totalDEF -= Math.floor(n_A_totalDEF * n_tok[bon_DEF_MUL] /100);
	if(miscEffects[ksPoisoned])
		n_A_totalDEF -= Math.floor(n_A_totalDEF * 25 / 100);
	
	
	var defenseMultiplier = 0;
	
	if ( SkillSearch( skill_LK_SPEAR_DYNAMO ) )
	{ // Spear Dynamo
		// defenseMultiplier += -1 * 0.05 * SkillSearch( skill_LK_SPEAR_DYNAMO );
		defenseMultiplier += -1 * (0.05+(0.02 * SkillSearch( skill_LK_SPEAR_DYNAMO )));
	}
	if ( SkillSearch( skill_ROY_FORCE_OF_VANGUARD ) )
	{ // Vanguard Force
		defenseMultiplier += 0.02 * SkillSearch( skill_ROY_FORCE_OF_VANGUARD );
	}
	if ( performerBuffs[ksMaestroSolo] === ksEchoSong && performerBuffs[ksMaestroSoloLevel] > 0 )
	{ // Echo Song
		var skillBonus = performerBuffs[ksMaestroSoloLevel] * 6;
		var voiceLessonsBonus = performerBuffs[ksMaestroVoiceLessons];
		var jobLvlBonus = performerBuffs[ksMaestroJobLevel] / 4.0;

		defenseMultiplier += ( skillBonus + voiceLessonsBonus + jobLvlBonus ) / 100;
	}
	if ( performerBuffs[ksChorus] === ksSaturdayNightFever &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Saturday Night Fever
		var skillBonus = 0.1 + 0.1 * performerBuffs[ksChorusLevel];
		
		defenseMultiplier -= skillBonus;
	}
	
	if ( CardNumSearch( 392 ) )
	{ // Tao Gunka
		defenseMultiplier -= 0.5;
	}
	// Apply multipliers
	n_A_totalDEF *= ( 1 + defenseMultiplier );
	
	// Reduction per enemy
	if ( miscEffects[ksNumEnemies] >= 3 )
	{
		n_A_totalDEF -= Math.floor( n_A_totalDEF * ( miscEffects[ksNumEnemies] - 2 ) * 5 / 100 );
	}
	
	// Frenzy just removes all DEF
	if ( SkillSearch( skill_LK_FRENZY ) )
	{
		n_A_totalDEF = 0;
	}
	if ( SkillSearch( skill_RAN_CAMOUFLAGE ) )
	{ // Camouflage
		n_A_totalDEF = 0;
	}
	
	n_A_totalDEF = Math.floor( n_A_totalDEF );
	
	return n_A_totalDEF;
}

function calcSoftDef( n_A_VITDEF )
{
	n_A_VITDEF = Math.floor((n_A_VIT / 2) + (n_A_BaseLV /2) + (n_A_AGI / 5));
	if(acolyteBuffs[ksAngelus])
	{
		//n_A_VITDEF = Math.floor(n_A_VITDEF * (1 + 0.05 * acolyteBuffs[ksAngelus]));
		n_A_VITDEF = Math.floor((Math.floor(n_A_VIT * (1 + 0.05 * acolyteBuffs[ksAngelus])) / 2) + (n_A_BaseLV /2) + (n_A_AGI / 5));
	}
	if(SkillSearch(skill_SW_BERSERK))
	{ // AutoBerserk
		n_A_VITDEF = Math.floor(n_A_VITDEF * 0.45);
	}
	else if(otherBuffs[ksProvoke])
	{
			n_A_VITDEF = Math.floor(n_A_VITDEF * (0.95 - 0.05 * otherBuffs[ksProvoke]));
	}
	else if(otherBuffs[ksAloe])
	{
			n_A_VITDEF = Math.floor(n_A_VITDEF * 0.9);
	}
	if ( SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) || acolyteBuffs[ksPPRevitalize] )
	{ // sura revitalize STAT DEF increase: [(Caster’s VIT / 4) x Skill Level]
		if ( SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) )
		{
			n_A_VITDEF += Math.floor( ( n_A_VIT / 4 ) * SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) );
		}
		else
		{
			n_A_VITDEF += Math.floor( ( acolyteBuffs[ksSuraVitality] / 4 ) * acolyteBuffs[ksPPRevitalize] );
		}
	}
	if(n_tok[bon_USR_DEF_DIV])
	{
		n_A_VITDEF = Math.floor(n_A_VITDEF / n_tok[bon_USR_DEF_DIV]);
	}
	if(miscEffects[ksNumEnemies] >= 3)
		n_A_VITDEF -= Math.floor(n_A_VITDEF * (miscEffects[ksNumEnemies] - 2) * 5 / 100);
	
	if(TimeItemNumSearch(temp_MMMANT))
		n_A_VITDEF -= Math.floor(n_A_VITDEF * 20 / 100);
	
	if(miscEffects[ksPoisoned])
		n_A_VITDEF -= Math.floor(n_A_VITDEF * 25 / 100);
	if(SkillSearch(skill_LK_SPEAR_DYNAMO)) // Spear Dynamo
		n_A_VITDEF = Math.floor(-1 * (0.05+(0.02 * SkillSearch( skill_LK_SPEAR_DYNAMO ))));//Math.floor(n_A_VITDEF * (1 - 0.05 * SkillSearch(skill_LK_SPEAR_DYNAMO)));
	if(SkillSearch(skill_LK_FRENZY)) // Berserk
		n_A_VITDEF = 0;
	if ( acolyteBuffs[ksAssumptio] )
	{ // Assumptio
		n_A_VITDEF *= 1;
	}
		
	return n_A_VITDEF;
}

function calcHardMDef(n_A_MDEF)
{
	n_A_MDEF = n_tok[bon_MDEF];

	// Card modifiers
	if(CardNumSearch(199) && n_A_JobSearch()==cls_MAG) // Frus
		n_A_MDEF += 3;
	if(n_A_HEAD_DEF_PLUS <= 5 && n_A_card[card_loc_HEAD_UPPER] == 213) // Gibbet
		n_A_MDEF += 5;
	if(n_A_card[card_loc_HEAD_MIDDLE] == 213) // Gibbet
		n_A_MDEF += 5;
	if(n_A_LEFT_DEF_PLUS <= 5 && CardNumSearch(222)) // Arclouse
		n_A_MDEF += 3;
	if(n_A_SHOULDER_DEF_PLUS <= 5 && CardNumSearch(258)) // Kappa
		n_A_MDEF += 8;
	if(n_A_BODY_DEF_PLUS <= 5 && CardNumSearch(283)) // Goat
		n_A_MDEF += 5;
	if(n_A_LEFT_DEF_PLUS >= 9 && CardNumSearch(310)) // Sting
		n_A_MDEF += 5;
	if(n_A_SHOES_DEF_PLUS <= 5 && CardNumSearch(381)) // Megalith
		n_A_MDEF += 7;
	if(n_A_JobSearch()==cls_ACO) // AcolyteCls
		n_A_MDEF += CardNumSearch(383); // RideWord
	if(CardNumSearch(747) && (n_A_JOB == cls_WAR || n_A_JOB == cls_WARt))
	{//Warlock Kathryne Card
		n_A_MDEF += 80;
	}
	
	if (otherBuffs[ksOdinsPower] >= 1) { //Odin's Power
		n_A_MDEF -= 20;
	}
	// Equipment modifiers
	if ( EquipNumSearch( 872 ) )
	{ // Crown of Deceit
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			n_A_MDEF += 5;
		}
	}
	if ( EquipNumSearch( 1337 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Aries Diadem
		n_A_MDEF += 5;
	}
	if ( EquipNumSearch( 1338 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Cancer Diadem
		n_A_MDEF += 1;
	}
	if ( EquipNumSearch( 1340 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Gemini Diadem
		n_A_MDEF += 7;
	}
	if ( EquipNumSearch( 1348 ) && n_A_HEAD_DEF_PLUS >= 10 )
	{ // Aries Crown
		n_A_MDEF += 5;
	}
	if ( EquipNumSearch( 1353 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Pisces Crown
		n_A_MDEF += 5;
	}
	if ( EquipNumSearch(764))
	{ // VShield + Odin + Fricca
		n_A_MDEF += (n_A_HEAD_DEF_PLUS + n_A_LEFT_DEF_PLUS);
	}
	if ( EquipNumSearch(809))
	{ // LeafHat
		n_A_MDEF += n_A_HEAD_DEF_PLUS;
	}
	if ( EquipNumSearch(986) && (n_A_JobSearch()==cls_ACO || n_A_JobSearch()==cls_ARC || n_A_JobSearch()==cls_MAG))
	{ // Chameleon Armor
		n_A_MDEF += 5;
	}
	if ( EquipNumSearch(1169))
	{ // LacrimaStick
		n_A_MDEF += n_A_Weapon_ATKplus;
	}
	if ( EquipNumSearch(1800)  ||  EquipNumSearch( 1806 ))
	{//Bangungot Boots of Nightmare
		n_A_MDEF += n_A_SHOES_DEF_PLUS;
	}
	if( EquipNumSearch( 1964 ) )
	{//Hero Magic Coat
		if(n_A_BODY_DEF_PLUS % 2 == 0) // If an even refine level
		{
			n_A_MDEF += Math.floor(n_A_BODY_DEF_PLUS / 2);
		}
	}
	if( EquipNumSearch( 2091 ) )
	{//Anti-magic Suit
		if(n_A_BODY_DEF_PLUS >=7)
			n_A_MDEF += 5;
		if(n_A_BODY_DEF_PLUS >=9)
			n_A_MDEF += 5;
	}
	if(EquipNumSearch(2205))
	{ // Royal Guard Shield
		n_A_MDEF += n_A_LEFT_DEF_PLUS;
	}
	if(n_A_Equip[eq_WEAPON] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_A_MDEF += 10;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon2_ATKplus >= 7)
		{
			n_A_MDEF += 10;
		}
	}
	
	if(EquipNumSearch(1820))
	{ // Shadow Minstrel Shield
		n_A_MDEF += n_A_SHADOW_SHIELD_DEF_PLUS * (SkillSearch(skill_MIN_WINDMILL) + SkillSearch(skill_MIN_ECHO_SONG) + SkillSearch(skill_MIN_HARMONIZE));
	}
	if(EquipNumSearch(1821))
	{ // Shadow Wanderer Shield
		n_A_MDEF += n_A_SHADOW_SHIELD_DEF_PLUS * (SkillSearch(skill_WAN_MOONLIGHT) + SkillSearch(skill_WAN_SYMPHONY) + SkillSearch(skill_WAN_SWING_DANCE));
	}
	// Skill modifiers
	if ( SkillSearch( skill_SW_ENDURE ) )
	{ // Endure
		n_A_MDEF += SkillSearch( skill_SW_ENDURE );
	}
	else if ( SkillSearch( skill_LK_SPEAR_DYNAMO ) )
	{ // Spear Dynamo
		n_A_MDEF += 1;
	}
	if ( SkillSearch( skill_RUN_STONEHARD_SKIN ) )
	{ // Hagalaz Rune
		n_A_MDEF += Math.floor( n_A_JobLV * SkillSearch( skill_RUN_RUNE_MASTERY ) / 4 );
	}
	if ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) || acolyteBuffs[ksPPChange] > 0 )
	{ // Gentle Touch Convert: MDEF decrease: MDEF [(200 / Caster’s INT) x Skill Level]
		if ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) )
		{
			n_A_MDEF -= Math.floor( ( 200 / n_A_INT ) * SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) );
		}
		else
		{
			n_A_MDEF -= Math.floor( ( 200 / acolyteBuffs[ksSuraIntelligence] ) * acolyteBuffs[ksPPChange] );
		}
	}
	
	// Multipliers-----------------
	var mdefMultiplier = 0;
	
	if ( acolyteBuffs[ksAssumptio] )
	{
		mdefMultiplier += 1;
	}
	if ( CardNumSearch( 392 ) )
	{ // Tao Gunka
		mdefMultiplier -= 0.5;
	}
	if ( performerBuffs[ksWandererSolo] === ksLoversSymphony && performerBuffs[ksWandererSoloLevel] > 0 )
	{ //Lover's Symphony
		var skillBonus = performerBuffs[ksWandererSoloLevel] * 12;
		var voiceLessonsBonus = performerBuffs[ksWandererVoiceLessons];
		var jobLvlBonus = performerBuffs[ksWandererJobLevel] / 4.0;

		mdefMultiplier += ( skillBonus + voiceLessonsBonus + jobLvlBonus ) / 100;
	}
	
	// Apply multipliers
	n_A_MDEF *= ( 1 + mdefMultiplier );
	
	if ( SkillSearch( skill_LK_FRENZY ) )
	{ // Berserk
		n_A_MDEF = 0;
	}

	return n_A_MDEF;
}

function calcSoftMDef( n_A_INTMDEF )
{
	n_A_INTMDEF = Math.floor( n_A_INT + ( n_A_VIT / 5 ) + ( n_A_DEX / 5 ) + ( n_A_BaseLV / 4 ) );
	
	if ( TimeItemNumSearch( temp_ULFHEDINN ) )
	{
		n_A_INTMDEF -= Math.floor( n_A_INTMDEF * 20 / 100 );
	}
	if ( acolyteBuffs[ksAssumptio] )
	{ // Assumptio
		n_A_INTMDEF *= 1;
	}

	return n_A_INTMDEF;
}

function calcHit(n_A_HIT)
{
	n_A_HIT = 175 + n_A_BaseLV + n_A_DEX + Math.floor(n_A_LUK / 3);

	n_A_HIT += n_tok[bon_HIT];

	// Cards
	if(n_A_WeaponType==weapTyp_SWORD || n_A_WeaponType==weapTyp_SWORDII) // Sword 2hS
		n_A_HIT += CardNumSearch(464) * 5; // Sword Guardian
	if(n_A_WeaponType==weapTyp_BOW) // Bow
		n_A_HIT += CardNumSearch(465) * 5; // Bow Guardian
	if(CardNumSearch(492)) // Ifrit
		n_A_HIT += Math.floor(n_A_JobLV /10) * CardNumSearch(492);
	if(CardNumSearch(636)) // Irene Elder Card 
		n_A_HIT += Math.floor(n_A_SHOULDER_DEF_PLUS / 3) * 5;
	if(CardNumSearch(584))
	{//Stalker Card
		if(SU_LUK >= 110)
			n_A_HIT += 20;
	}
	if(CardNumSearch(699))
	{//DR815 Card
		if(n_A_BaseLV >= 90)
			n_A_HIT += CardNumSearch(699);
		if(n_A_BaseLV >= 120)
			n_A_HIT += CardNumSearch(699);
	}
	if(CardNumSearch(746) && (n_A_JOB == cls_MEC || n_A_JOB == cls_MECt))
	{//Mechanic Howard Card
		n_A_HIT += 20;
	}
	if(CardNumSearch(766))
	{//Humanoid Chimera Card
		if(n_A_BaseLV >= 90)
			n_A_HIT += 10 * CardNumSearch(766);
	}
	
	// Equipment
	if ( EquipNumSearch( 442 ) && SU_STR >= 90 )
	{ // Rogue's Treasure
		n_A_HIT += 10 * EquipNumSearch( 442 );
	}
	if ( EquipNumSearch( 1381 ) )
	{ // Agent Katar
		n_A_HIT += Math.floor(n_A_LUK/2);
	}
	if ( EquipNumSearch( 1261 ) && SU_STR >= 120 )
	{ // Burning Spirit
		n_A_HIT += 3;
	}
	if ( EquipNumSearch( 1167 ) && SU_STR >= 95 )
	{ // Giant Axe
		n_A_HIT += 10;
	}
	if ( EquipNumSearch(1176) && SkillSearch(skill_AS_KATAR_MASTERY) === 10 )
	{ // Chakram
		n_A_HIT += 10;
	}
	if ( EquipNumSearch( 654 ) )
	{ // Western Outlaw
		n_A_HIT += Math.floor( SU_AGI / 10 );
	}
	if ( EquipNumSearch( 1602 ) )
	{ // "Mythic Wasteland Outlaw (7 d.)"
		n_A_HIT += Math.floor( SU_AGI / 10 );
	}
	if ( EquipNumSearch( 656 ) )
	{ // Jungle Carbine
		n_A_HIT -= Math.floor( SU_DEX / 3 );
	}
	if ( EquipNumSearch( 1796 ) )
	{//Dex Glove
		n_A_HIT += Math.floor(SU_DEX / 10) * EquipNumSearch( 1796 );
	}
	
	
	// Skills
	n_A_HIT += 1 * SkillSearch(skill_AR_VULTURES_EYE);
	n_A_HIT += 10 * SkillSearch(skill_LK_SPEAR_DYNAMO);
	n_A_HIT += 3 * SkillSearch(skill_SN_FALCON_EYES);
	n_A_HIT += 2 * SkillSearch(skill_GS_SINGLE_ACTION);
	n_A_HIT += 1 * SkillSearch(skill_GS_SNAKE_EYES);
	if( ( SkillSearch(skill_AC_BLESSING) || acolyteBuffs[ksBlessing] ) )
	{
		if(  SkillSearch(skill_AC_BLESSING) )
		{
			n_A_HIT += 2 * SkillSearch(skill_AC_BLESSING);
		}
		else
		{
			n_A_HIT += 2 * acolyteBuffs[ksBlessing];
		}
	}
	if ( SkillSearch( skill_GS_GUNSLINGER_PANIC ) )
	{
		n_A_HIT -= 30;
	}
	if ( SkillSearch( skill_GS_INCREASE_ACCURACY ) )
	{
		n_A_HIT += 20;
	}
	if ( SkillSearch( skill_MEC_AXE_TRAINING ) )
	{ // axe mastery
		if ( n_A_WeaponType == weapTyp_AXE || n_A_WeaponType == weapTyp_AXEII )
		{ // axe weapon
			n_A_HIT += 3 * SkillSearch( skill_MEC_AXE_TRAINING );
		}
		if ( n_A_WeaponType == weapTyp_MACE )
		{ // mace weapon
			n_A_HIT += 2 * SkillSearch( skill_MEC_AXE_TRAINING );
		}
	}
	if ( SkillSearch( skill_ROY_INSPIRATION ) )
	{ 
		if(PATCH < 2)
		{
			// Inspiration [Skill Level x 5 ] + [Caster’s Job Level / 2 ]
			n_A_HIT += Math.floor( ( 5 * SkillSearch( skill_ROY_INSPIRATION ) ) + ( n_A_JobLV / 2 ) );
		}
		else if(PATCH == 2)
		{
			n_A_HIT += 12 * SkillSearch( skill_ROY_INSPIRATION );
		}
	}
	if ( n_A_ActiveSkill === skill_PA_RAPID_SMITING )
	{ // Rapid Smiting
		n_A_HIT += 20;
	}
	if ( n_A_ActiveSkill === skill_SHA_FATAL_MENACE )
	{ // Fatal Menace
		n_A_HIT += (n_A_ActiveSkillLV * 5) - 35;
	}
	
	if ( battleChantBuffs[pass_V_HIT_FLEE] )
	{
		n_A_HIT += 50;
	}
	if ( performerBuffs[ksDancerSolo] === ksFocusBallet && performerBuffs[ksDancerSoloLevel] > 0 )
	{ // Focus Ballet
		// var skillBonus = 10 + performerBuffs[ksDancerSoloLevel] * 2;
		// var danceLessonsBonus = performerBuffs[ksDanceLessons];
		// var dexBonus = Math.floor( performerBuffs[ksDancerDex] / 10 );
		// n_A_HIT += skillBonus + danceLessonsBonus + dexBonus;
		var skillBonus = performerBuffs[ksDancerSoloLevel];
		n_A_HIT += skillBonus * 4;
	}
	if ( SkillSearch( skill_GEN_CART_REMODELING ) )
	{ // Cart remodeling
		n_A_HIT += 4 * SkillSearch( skill_GEN_CART_REMODELING );
	}
	if ( SkillSearch( skill_GLT_VENOM_PRESSURE ) )
	{ // Venom Pressure
		n_A_HIT += 10 + 4 * SkillSearch( skill_GLT_VENOM_PRESSURE );
	}
	if ( SkillSearch( skill_REB_HIT_BARREL ) )
	{
		n_A_HIT -= 25 + (SkillSearch( skill_REB_HIT_BARREL ) * 5);
	}
	if(SkillSearch(skill_SUM_POWER_OF_LIFE))
	{
		n_A_HIT += 20;
	}
	if ( n_A_WeaponType == weapTyp_2HSWORD  && SkillSearch( skill_KN_TWOHAND_QUICKEN )  )
	{ // Two Hand Quicken
		n_A_HIT += 2 * SkillSearch( skill_KN_TWOHAND_QUICKEN ) ;
	}
	

	
// Items
	if ( usableItems[ksSesamePastry] )
	{
		n_A_HIT += 30;
	}
	if ( usableItems[ksBlessingOfTyr] )
	{
		n_A_HIT += 30;
	}
	if ( usableItems[ksMilitaryRationB] )
	{
		n_A_HIT += 33;
	}
	if ( usableItems[ksBoucheDeNoel] )
	{
		n_A_HIT += 3;
	}
	if ( usableItems[ksSchwartzwaldPineJubilee] )
	{
		n_A_HIT += 10;
	}
	if ( usableItems[ksArchmagePotion] )
	{
		n_A_HIT += 30;
	}
	return n_A_HIT;
}

function calcFlee( n_A_FLEE )
{
	n_A_FLEE = 100 + n_A_BaseLV + n_A_AGI + Math.floor(n_A_LUK / 5);

	n_A_FLEE += n_tok[bon_FLEE];
	
	if(n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(271)) // NineTail
		n_A_FLEE += 20;
	if(n_A_JobSearch()==cls_THI && CardNumSearch(295)) // Wanderer
		n_A_FLEE += 20;
	if(n_A_SHOULDER_DEF_PLUS <= 4 && CardNumSearch(401)) // KavachIcarus
		n_A_FLEE += 10;
	if(n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch(403)) // OrcBaby
		n_A_FLEE += 5;
	if(CardNumSearch(553)) // Vavayaga	
		n_A_FLEE += n_A_SHOES_DEF_PLUS * 2;
		
	if ( SU_STR >= 90 && EquipNumSearch( 442 ) )
	{ // Rogue's Treasure
		n_A_FLEE += 10 * EquipNumSearch( 442 );
	}
	if(n_A_Equip[0]==483) // Bloody Roar
		n_A_FLEE -= (n_A_BaseLV + SU_AGI);
	if(SU_AGI >= 120 && EquipNumSearch(1257)) // Shadow Crown
		n_A_FLEE += 3;
	if(SU_INT >= 120 && EquipNumSearch(1263)) // Whispers of Wind
		n_A_FLEE += 3;
	if ( EquipNumSearch( 1341 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Leo Diadem
		n_A_FLEE += 10;
	}
	if ( EquipNumSearch( 1342 ) && n_A_HEAD_DEF_PLUS >= 9 )
	{ // Libra Diadem
		n_A_FLEE += 5;
	}
	if ( EquipNumSearch( 1349 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Cancer Crown
		n_A_FLEE += 10;
	}
	if ( EquipNumSearch( 1351 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Leo Crown
		n_A_FLEE += 10;
	}
	if ( EquipNumSearch( 1408 ) )
	{ // White Wing Suit
		n_A_FLEE += n_A_BODY_DEF_PLUS;
	}
	if ( EquipNumSearch( 1475 ) )
	{ // WoE Robe
		if (n_A_BODY_DEF_PLUS >= 6) { n_A_FLEE += 5; }
	}
	if ( EquipNumSearch( 1776 ) )
	{ // Nab Hood
		n_A_FLEE += n_A_SHOULDER_DEF_PLUS * 2 ;
	}
	if ( EquipNumSearch( 1793 ) )
	{//Agi Glove
		n_A_FLEE += Math.floor(SU_AGI / 10) * EquipNumSearch( 1793 );
	}
	if(EquipNumSearch(2208))
	{// Flattery Robe + Ancient Cape[0]\[1]
		n_A_FLEE += n_A_BODY_DEF_PLUS;
	}
	if(EquipNumSearch(2238))
	{//Consultation Robe [1] + Morrigane's Manteau
		n_A_FLEE += n_A_BODY_DEF_PLUS * 2;
	}
	
	if(n_A_JobSearch2() == cls_ASS || n_A_JobSearch2() == cls_ROG)
		n_A_FLEE += 4 * SkillSearch(skill_TH_IMPROVE_DODGE);
	else
		n_A_FLEE += 3 * SkillSearch(skill_TH_IMPROVE_DODGE);
	if(SkillSearch(skill_GLT_HALLUCINATION_WALK))
		n_A_FLEE += 50 * SkillSearch(skill_GLT_HALLUCINATION_WALK);
	
	Mikiri = new Array(0,1,3,4,6,7,9,10,12,13,15);
	n_A_FLEE += Mikiri[SkillSearch(skill_MO_FLEE)];
	if(SkillSearch(skill_LK_BERSERK))
		n_A_FLEE /= 2;
	if(n_A_JOB == cls_SNI || n_A_JOB == cls_RAN || n_A_JOB == cls_RANt)
		n_A_FLEE += Math.round(SkillSearch(skill_SN_WIND_WALK) /2);
	if(otherBuffs[ksWindWalker] && SkillSearch(skill_SN_WIND_WALK)==0)
		n_A_FLEE += Math.round(otherBuffs[ksWindWalker] /2);
	if(SkillSearch(skill_TKM_LUNAR_PROTECTION))
		n_A_FLEE += Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 10);
	if(SkillSearch(skill_RG_CLOSE_CONFINE))
		n_A_FLEE += 10;
	if(SkillSearch(skill_GS_GUNSLINGER_PANIC))
		n_A_FLEE += 30;
	if(SkillSearch(skill_GS_GATLING_FEVER))
	{
		if(n_A_WeaponType==weapTyp_GATLING_GUN || n_A_WeaponType==weapTyp_NONE)
			n_A_FLEE -= 5 * SkillSearch(skill_GS_GATLING_FEVER);
	}
	
	if(otherBuffs[ksElementField] == ksWhirlwind && otherBuffs[ksElementFieldLvl] >= 1)
		n_A_FLEE += otherBuffs[ksElementFieldLvl] *3;
	if(battleChantBuffs[pass_V_HIT_FLEE])
		n_A_FLEE += 50;
	
// Items
	if ( usableItems[ksHoneyPastry] )
	{
		n_A_FLEE += 30;
	}
	if ( usableItems[ksBlessingOfTyr] )
	{
		n_A_FLEE += 30;
	}
	if ( usableItems[ksMilitaryRationC] )
	{
		n_A_FLEE += 33;
	}
	if ( usableItems[ksSchwartzwaldPineJubilee] )
	{
		n_A_FLEE += 20;
	}
	if ( usableItems[ksArchmagePotion] )
	{
		n_A_FLEE += 30;
	}
// Skills
	if ( performerBuffs[ksBardSolo] === ksPerfectTablature && performerBuffs[ksBardSoloLevel] > 0 )
	{ // Perfect Tablature
		var skillBonus = performerBuffs[ksBardSoloLevel];
		/*var musicLessonsBonus = Math.floor( performerBuffs[ksMusicLessons] / 2 );
		var agiBonus = Math.floor( performerBuffs[ksBardAgi] / 10 );
		n_A_FLEE += skillBonus + musicLessonsBonus + agiBonus;*/
		n_A_FLEE += 18 + (skillBonus * 2);
	}
	if ( performerBuffs[ksWandererSolo] === ksGloomyShynessW && performerBuffs[ksWandererSoloLevel] > 0 )
	{ // Gloomy Shyness
		n_A_FLEE -= 20 + 5 * performerBuffs[ksWandererSoloLevel];
	}
	else if ( performerBuffs[ksMaestroSolo] === ksGloomyShynessM && performerBuffs[ksMaestroSoloLevel] > 0 )
	{ // Gloomy Shyness
		n_A_FLEE -= 20 + 5 * performerBuffs[ksMaestroSoloLevel];
	}
	if ( ( n_A_WeaponType == weapTyp_SPEAR || n_A_WeaponType == weapTyp_2HSPEAR ) && SkillSearch( skill_CR_SPEAR_QUICKEN ) )
	{ // Spear Quicken
		n_A_FLEE += SkillSearch( skill_CR_SPEAR_QUICKEN ) * 2;
	}
	if(SkillSearch(skill_SUM_GROOMING) || summonerBuffs[ksPurring])
	{
		n_A_FLEE += 100;
	}
	if(SkillSearch(skill_SUM_POWER_OF_LIFE))
	{
		n_A_FLEE += 20;
	}
// Cards
	if(CardNumSearch(585))
	{//Clown Card
		if(SU_VIT >= 110)
			n_A_FLEE += 20;
	}
	if(CardNumSearch(586))
	{//Gypsy Card
		if(SU_VIT >= 110)
			n_A_FLEE += 20;
	}
	if(CardNumSearch(721))
	{//Powerful Amdarais Card
		n_A_FLEE -= n_A_BODY_DEF_PLUS * 2;
	}
	if(CardNumSearch(744) && (n_A_JOB == cls_GEN || n_A_JOB == cls_GENt))
	{//Geneticist Flamel Card
		n_A_FLEE += 20;
	}
	if(CardNumSearch(767))
	{//Material Chimera Card
		if(n_A_BaseLV >= 90)
			n_A_FLEE += 10 * CardNumSearch(767);
	}
	// Multipliers
	var fleeMultiplier = 1;
	
	if ( performerBuffs[ksChorus] === ksSaturdayNightFever &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Saturday Night Fever
		var skillBonus = 0.4 + 0.1 * performerBuffs[ksChorusLevel];
		
		fleeMultiplier -= skillBonus;
	}
	
	// Apply multipliers
	n_A_FLEE = Math.floor( n_A_FLEE * fleeMultiplier );
	
	// Flee eaten by enemies
	if ( miscEffects[ksNumEnemies] >= 3 )
	{
		var w = miscEffects[ksNumEnemies] - 2;
		if ( w > 10 )
		{
			w = 10;
		}
		n_A_FLEE -= Math.floor(n_A_FLEE * w * 10 / 100);
	}

	return n_A_FLEE;
}

function calcPDodge( n_A_LUCKY )
{
	n_A_LUCKY = 1 + Math.floor(n_A_LUK / 10);
	
	n_A_LUCKY += n_tok[bon_PDODGE];
	
	if(n_A_JobSearch()==cls_SWO)
		n_A_LUCKY += 3 * CardNumSearch(354); // Heater
	if(n_A_JobSearch()==cls_THI)
		n_A_LUCKY += 5 * CardNumSearch(391); // WildRose
	if(n_A_SHOULDER_DEF_PLUS <= 4 && CardNumSearch(401)) // KavIcarus
		n_A_LUCKY += 1;

	if ( EquipNumSearch( 535 ) )
	{ // ValkMant
		var wHPVS = n_A_JobSearch();
		if(wHPVS==cls_ACO || wHPVS==cls_ARC || wHPVS==cls_MAG)
			n_A_LUCKY += 5+ n_A_SHOULDER_DEF_PLUS * 2;
	}
	if(n_A_JobSearch()==cls_TKK && EquipNumSearch(678)) // HahoeMask
		n_A_LUCKY += 2;
	if(SU_AGI >= 120 && EquipNumSearch(1262)) // Silent Enforcer
		n_A_LUCKY += 5;
	if ( EquipNumSearch( 1781 ) )
	{ // Black Wing Manteau
		if(n_A_SHOULDER_DEF_PLUS > 6)
			n_A_LUCKY += n_A_SHOULDER_DEF_PLUS - 6;
	}
	if ( EquipNumSearch( 1793 ) )
	{//Agi Glove
		if(SU_AGI >= 110)
			n_A_LUCKY += 1 * EquipNumSearch( 1793 );
	}
	if( EquipNumSearch(1665))
	{//Doram Manteau
		n_A_LUCKY += Math.floor(n_A_SHOULDER_DEF_PLUS / 3);
	}
	if( EquipNumSearch(1871))
	{//Luxurious Doram Manteau
		n_A_LUCKY += Math.floor(n_A_SHOULDER_DEF_PLUS / 3);
	}
	if( EquipNumSearch(1868))
	{//Elegant Doram Manteau
		n_A_LUCKY += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if(EquipNumSearch(2226) )  // Old Camouflage Bunny Hood [1]
	{
		n_A_LUCKY += Math.floor(n_A_HEAD_DEF_PLUS / 3);
	}
	
//Cards
	if(CardNumSearch(743) && (n_A_JOB == cls_GLT || n_A_JOB == cls_GLTt))
	{//Guillotine Cross Eremes Card
		n_A_LUCKY += 10;
	}
	
	if(CardNumSearch(827) && EquipNumSearch(2393))
	{//Matte Drainliar Card + Vampire's Familiar [1]
		n_A_LUCKY += 5;
	}
	
//Shadows
	if( EquipNumSearch(1995))
	{//Shadow Doram Battler Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 7){n_A_LUCKY += 2;}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >= 9){n_A_LUCKY += 3;}
	}
	// Perfect Tablature
	if ( performerBuffs[ksBardSolo] === ksPerfectTablature && performerBuffs[ksBardSoloLevel] > 0 )
	{
		var skillBonus = Math.floor( performerBuffs[ksBardSoloLevel] / 2 );
		//var musicLessonsBonus = Math.floor( performerBuffs[ksMusicLessons] / 2 );
		//var agiBonus = Math.floor( performerBuffs[ksBardAgi] / 10 );
		n_A_LUCKY += skillBonus;
	}
	if(SkillSearch(skill_SUM_CATNIP_POWDERING) && SkillSearch(skill_SUM_SPIRIT_OF_LAND))
	{
		n_A_LUCKY += Math.floor(n_A_BaseLV / 12);
	}
	if(SkillSearch(skill_SUM_HISS) || summonerBuffs[ksHiss])
	{
		n_A_LUCKY += 50;
	}

//Enchants
	if(EnchNumSearch( 1394 ))
	{//Rune of Agility 1
		if(n_A_BODY_DEF_PLUS >= 10)
			n_A_LUCKY += 5;
	}
	if(EnchNumSearch( 1395 ))
	{//Rune of Agility 2
		if(n_A_BODY_DEF_PLUS >= 11)
			n_A_LUCKY += 7;
	}
	if(EnchNumSearch( 1396 ))
	{//Rune of Agility 3
		if(n_A_BODY_DEF_PLUS >= 12)
			n_A_LUCKY += 5;
		if(n_A_BODY_DEF_PLUS >= 13)
			n_A_LUCKY += 5;
	}

	n_A_LUCKY = Math.round( n_A_LUCKY * 10 ) / 10;
	
	return n_A_LUCKY;
}

function calcCrit( n_A_CRI )
{
	n_A_CRI = 1 + Math.floor( n_A_LUK / 3 );

	n_A_CRI += n_tok[bon_CRIT];
	var Race_Crit = n_tok[bon_CRIT_RC_FORMLESS+n_B[en_RACE]];

// Card modifiers
	if(n_A_JobSearch()==cls_ACO)
	{
		if(n_B[en_RACE]==race_UNDEAD || n_B[en_RACE] == race_DEMON )
		{
			Race_Crit += 9 * CardNumSearch(253); // FurSeal
		}
	}
	if(SU_LUK >= 80 && CardNumSearch(267)) // GiantWhisper
		n_A_CRI += 3;
	if(n_A_JobSearch()==cls_THI)
		n_A_CRI += 4 * CardNumSearch(328); // Mobster
	if(CardNumSearch(card_GRMT_GREENMAIDEN)) // GreenMaiden
		n_A_CRI += n_A_SHOULDER_DEF_PLUS;
	if(n_A_WeaponType==weapTyp_SWORDII || n_A_WeaponType==weapTyp_SWORD)
		n_A_CRI += CardNumSearch(464) * 5; // SwordGuardian
	if(n_A_WeaponType==weapTyp_BOW) // Bow
		n_A_CRI += CardNumSearch(465) * 5; // BowGuardian
	if(CardNumSearch(492)) // Ifrit
		n_A_CRI += Math.floor(n_A_JobLV /10) * CardNumSearch(492);
	if(CardNumSearch(515) && n_A_Weapon_ATKplus >= 14) // Tendrillion
		n_A_CRI += 10;
	if(CardNumSearch(581))
	{//Creator Card
		if(SU_STR >= 110)
		n_A_CRI += 20;
	}
	if ( CardNumSearch( 635 ))
	{ // Faceworm Queen Card
		n_A_CRI += n_A_SHOES_DEF_PLUS;
	}
	if ( CardNumSearch( 689 ))
	{ // Airship Raid Card
		n_A_CRI += Math.floor(n_A_Weapon_ATKplus / 2) * CardNumSearch(689);
	}
	if(CardNumSearch(724))
	{//Powerful Soldier  Skeleton Card
		if(n_A_BaseLV >= 100)
			n_A_CRI += 1;
	}
	if(CardNumSearch(751) && (n_A_JOB == cls_RAN || n_A_JOB == cls_RANt))
	{//Ranger Cecil Card
		n_A_CRI += 20;
	}
	
// Equipment modifiers
	if ( SU_AGI >= 90 && EquipNumSearch( 442 ) )
	{ // Rogue's Treasure
		n_A_CRI += 10 * EquipNumSearch( 442 );
	}
	if(EquipNumSearch(623)) // HeartBreaker
		n_A_CRI += n_A_Weapon_ATKplus;
	if(EquipNumSearch(640)) // GiantEncyclopedia
		n_A_CRI += Math.floor(SU_LUK / 5);
	if(EquipNumSearch(1615)) // GiantEncyclopedia
		n_A_CRI += Math.floor(SU_LUK / 5);
	if(n_A_JobSearch()==cls_TKK && EquipNumSearch(675)) // BrideMask
		n_A_CRI += 5;
	if(EquipNumSearch(689)) // SnipingSuit
		n_A_CRI += Math.floor(SU_LUK / 10);
	if(n_A_HEAD_DEF_PLUS >= 6 && EquipNumSearch(785)) // DevilringHat
		n_A_CRI += (n_A_HEAD_DEF_PLUS -5);	
	if(n_A_Weapon_ATKplus >= 6 && n_B[en_RACE]==race_DEMI_HUMAN && EquipNumSearch(1091)) // GlorJamadhar
		Race_Crit += 5;
	if(EquipNumSearch(1122) && n_A_JobSearch()==cls_MER) // Merchant Figurine
		n_A_CRI += 5 * EquipNumSearch(1122) ;
	if(EquipNumSearch(1161)) // VeteranHammer
		n_A_CRI += (2 * SkillSearch(skill_PR_MACE_MASTERY));
	if(SU_DEX >= 90 && EquipNumSearch(1164)) // BerchelAxe
		n_A_CRI += 5;
	if(SU_AGI >= 120 && EquipNumSearch(1200)) { // BradiumBrooch
		n_A_CRI += 4*EquipNumSearch(1200);
	}
	if ( SU_STR >= 120 && EquipNumSearch( 1256 ) )
	{ // Driver Band
		n_A_CRI += 3;
	}
	if ( EquipNumSearch( 1299 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Mercury Riser
		n_A_CRI += 2;
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			n_A_CRI += 2;
		}
	}
	if ( n_A_ActiveSkill != skill_SN_FOCUSED_ARROW_STRIKE )
	{
		if ( n_A_WeaponType == weapTyp_BOW && n_A_Arrow == arrTyp_SHARP )
		{
			n_A_CRI += 20;
		}
		if ( n_A_WeaponType == weapTyp_BOW || weapTyp_HANDGUN <= n_A_WeaponType && n_A_WeaponType<=weapTyp_GRENADE_LAUNCHER )
		{ // Drosera
			n_A_CRI += CardNumSearch( 462 ) * 15;
		}
		
		n_A_CRI += Race_Crit;
	}
	if ( EquipNumSearch( 1361 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Black Cat (bRO) + Black Cat Tail
		n_A_CRI += 5;
	}
	if(EquipNumSearch(1514))
	{//Evil Marching Hat
		if (n_A_HEAD_DEF_PLUS >= 7) n_A_CRI += 10;
	}
	if(EquipNumSearch(1771))
	{//Sapha Hood
		n_A_CRI += n_A_SHOULDER_DEF_PLUS;
	}
	if ( EquipNumSearch( 1779 ) )
	{ // Nab Set
		if(SU_STR >= 120)
			n_A_CRI -= 20;
	}
	if ( EquipNumSearch( 1797 ) )
	{//Luk Glove
		n_A_CRI += Math.floor(SU_LUK / 10) * EquipNumSearch( 1797 );
	}
	if ( EquipNumSearch( 2086 ) )
	{//Revised Encyclopedia
		if(n_A_LEFT_DEF_PLUS >= 7)
			n_A_CRI += 2;
		if(n_A_LEFT_DEF_PLUS >= 9)
			n_A_CRI += 2;
	}
	if(EquipNumSearch(2147))
	{// "Chronocloak of Luck"
		n_A_CRI += 3 * Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if( EquipNumSearch(2211) )   
	{// Abusive Robe + Morrigane's Manteau
		n_A_CRI += n_A_BODY_DEF_PLUS;
	}
	if( EquipNumSearch(2223) )  // Old Blazing Soul [1]
	{
		n_A_CRI += 2 * n_A_HEAD_DEF_PLUS;
	}
	if(n_A_Equip[eq_WEAPON] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon_ATKplus >= 7)
		{
			n_A_CRI += 30;
		}
		if(n_A_Weapon_ATKplus >= 10)
		{
			n_A_CRI += 20;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon2_ATKplus >= 7)
		{
			n_A_CRI += 30;
		}
		if(n_A_Weapon2_ATKplus >= 10)
		{
			n_A_CRI += 20;
		}
	}
	
//Shadow
	if( EquipNumSearch(1825))
	{//Shadow Gunslinger Shield
		n_A_CRI += n_A_SHADOW_SHIELD_DEF_PLUS;
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 9){ n_A_CRI += SkillSearch(skill_GS_SINGLE_ACTION) * 2 }
	}
	
	// Skill modifiers
	if ( SkillSearch(skill_MO_FURY ) )
	{
		n_A_CRI += 7.5 + SkillSearch(skill_MO_FURY) * 2.5;
	}
	else if ( TimeItemNumSearch( temp_ROFL ) )
	{
		n_A_CRI += 10;
	}
	if ( SkillSearch( skill_SN_FURY ) )
	{
		n_A_CRI += 50;
	}
	if ( ( n_A_WeaponType == weapTyp_SPEAR || n_A_WeaponType == weapTyp_2HSPEAR ) && SkillSearch( skill_CR_SPEAR_QUICKEN ) )
	{ // Spear Quicken
		n_A_CRI += SkillSearch( skill_CR_SPEAR_QUICKEN ) * 3;
	}
	if ( n_A_WeaponType == weapTyp_2HSWORD  && SkillSearch( skill_KN_TWOHAND_QUICKEN ) )
	{ // Two Hand Quicken
		n_A_CRI += 2 + SkillSearch( skill_KN_TWOHAND_QUICKEN ) ;
	}
	if ( ( n_A_WeaponType == weapTyp_MACE ) && SkillSearch( skill_PR_MACE_MASTERY ) )
	{ // Mace Mastery
		n_A_CRI += SkillSearch( skill_PR_MACE_MASTERY );
	}
	n_A_CRI += SkillSearch( skill_SN_FALCON_EYES );
	
	// Items
	if ( usableItems[ksBoucheDeNoel] )
	{
		n_A_CRI += 7;
	}
	if ( usableItems[ksArunafeltzDesertSandwich] )
	{
		n_A_CRI += 7;
	}
	if ( usableItems[ksAbrasive] )
	{
		n_A_CRI += 30;
	}
	// Skills
	if ( performerBuffs[ksDancerSolo] === ksLadyLuck && performerBuffs[ksDancerSoloLevel] > 0 )
	{ // Lady Luck
		// var skillBonus = 10 + performerBuffs[ksDancerSoloLevel];
		// var danceLessonsBous = Math.floor( performerBuffs[ksDanceLessons] / 2 );
		// var lukBonus = Math.floor( performerBuffs[ksDancerLuk] / 10 );
		// n_A_CRI += skillBonus + danceLessonsBous + lukBonus;
		var skillBonus = performerBuffs[ksDancerSoloLevel];
		n_A_CRI += skillBonus;
	}
	if ( SkillSearch( skill_RAN_CAMOUFLAGE ) )
	{ // Camouflage
		n_A_CRI += 100;
	}
	if(SkillSearch(skill_SUM_POWER_OF_LIFE))
	{
		n_A_CRI += 20;
	}
	if ( performerBuffs[ksChorus] === ksWarcryFromBeyond &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Warcry from Beyond
		n_A_CRI += performerBuffs[ksChorusLevel] * performerBuffs[ksNumPerformers];
	}
	if (otherBuffs[ksStriking] >= 1 && n_A_Equip[eq_WEAPON] !== 0) {
		n_A_CRI += otherBuffs[ksStriking];
	}
	
	if ( miscEffects[ksNoCrit])
	{
		n_A_CRI = 0;
	}
		
	if ( n_A_WeaponType == weapTyp_KATAR)
	{ // Katar
		n_A_CRI *= 2;
	}

	n_A_CRI = Math.round(n_A_CRI * 10) / 10;

	return n_A_CRI;
}

function calcASPD()
{
	n_A_ASPD = 0;
	
	// Base ASPD --------------------------------------------------
	jobASPD = ItemAspd[n_A_JOB][n_A_WeaponType + 1]; // BaseASPD
		
	// DualHand Staff Adjustments ---
	if ( n_A_JOB === cls_ABI || n_A_JOB === cls_ABIt )
	{
		if ( StPlusWeapon( bon_TWO_HANDED_STAFF ) )
		{
			jobASPD += 5;
		}
	}
	if ( n_A_JobSearch2() === cls_MON )
	{
		if ( StPlusWeapon( bon_TWO_HANDED_STAFF ) )
		{
			if ( n_A_JOB === cls_SUR || n_A_JOB === cls_SURt )
			{
				jobASPD += 2;
			}
			else
			{
				jobASPD -= 2;
			}
		}
	}
	if ( n_Nitou )
	{ // Dual Weapon
		var index = Number( n_A_Weapon2Type ) + Number( weapTyp_SHIELD ) + 1;
		jobASPD += ItemAspd[n_A_JOB][index];
	}
	
	// Stat ASPD --------------------------------------------------
	// statASPD = Math.sqrt( ( n_A_AGI * 9.9987 ) + ( n_A_DEX * 0.1922 ) );
	statASPD = Math.sqrt( ( n_A_AGI * 9.999 ) + ( n_A_DEX * 0.1921 ) );

	// flat ASPD bonuses --------------------------------------
	var shieldPenalty = 0;
	if ( n_A_Equip[eq_SHIELD] !== 305 )
	{ // 305 = "(No Shield)"
		shieldPenalty += ItemAspd[n_A_JOB][weapTyp_SHIELD + 1];
	}
		
	// % ASPD Mods ---------------------------------------------
	var aspdMultiplier = 0;
	var ASPDch = 0; // for some mutual exclusive skills

	// Skills
	if ( SkillSearch( skill_GS_GATLING_FEVER ) )
	{ // Gatling Fever
		if ( n_A_WeaponType == weapTyp_GATLING_GUN )
		{
			aspdMultiplier += SkillSearch( skill_GS_GATLING_FEVER );
		}
	}
	// if ( ( SkillSearch( skill_AC_INCREASE_AGI ) || acolyteBuffs[ksIncreaseAgi] ) )
	// {
		// if ( SkillSearch( skill_AC_INCREASE_AGI ))
		// {
			// aspdMultiplier += SkillSearch( skill_AC_INCREASE_AGI );
		// }
		// else
		// {
			// aspdMultiplier += acolyteBuffs[ksIncreaseAgi] ;
		// }
		
	// }
	if ( ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) || acolyteBuffs[ksPPChange] ) )
	{ // Suras PP Change ASPD increase: [(Target’s AGI x Skill Level) / 60] %
		if ( SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) )
		{
			var aspdMod = ( ( n_A_AGI * SkillSearch( skill_SUR_GENTLE_TOUCH_CHANGE ) ) / 60.0 );
			aspdMultiplier += aspdMod;
		}
		else
		{
			aspdMultiplier += ( ( acolyteBuffs[ksSuraAgility] * acolyteBuffs[ksPPChange] ) / 60.0 );
		}
	}
	if ( performerBuffs[ksWandererSolo] === ksGloomyShynessW && performerBuffs[ksWandererSoloLevel] > 0 )
	{ // Gloomy Shyness
		aspdMultiplier -= 15 + 5 * performerBuffs[ksWandererSoloLevel];
	}
	else if ( performerBuffs[ksMaestroSolo] === ksGloomyShynessM && performerBuffs[ksMaestroSoloLevel] > 0 )
	{ // Gloomy Shyness
		aspdMultiplier -= 15 + 5 * performerBuffs[ksMaestroSoloLevel];
	}
	if ( SkillSearch( skill_LK_FRENZY ) )
	{ // Frenzy
		aspdMultiplier += 30;
	}
	if ( SkillSearch( skill_RG_INTIMIDATE ) )
	{ // Intimidate
		aspdMultiplier += SkillSearch( skill_RG_INTIMIDATE );
	}
	
	if ( n_A_WeaponType == weapTyp_BOOK && SkillSearch( skill_SA_STUDY ) )
	{ // Study
		aspdMultiplier += Math.floor( ( SkillSearch( skill_SA_STUDY ) ) / 2 );
	}
	if ( miscEffects[ksQuagmire] == 0 && miscEffects[ksAgiDown] == 0 )
	{ // things affected by Quagmire/agi down
		if ( n_A_WeaponType == 3 && SkillSearch( skill_KN_TWOHAND_QUICKEN ) && SkillSearch(skill_LK_FRENZY) == 0 )
		{ // Two Handed Quicken
			aspdMultiplier += 30;
		}
		if ( SkillSearch( skill_BS_ADRENALINE_RUSH ) )
		{ // Own AR
			if ( weapTyp_AXE <= n_A_WeaponType && n_A_WeaponType<=weapTyp_MACE )
			{
				aspdMultiplier += 30;
			}
		}
		else if ( otherBuffs[ksAdrenalineRush] == 1 )
		{ // PartyAR
			if ( weapTyp_AXE <= n_A_WeaponType && n_A_WeaponType <= weapTyp_MACE )
			{
				aspdMultiplier += 25;
			}
		}
		else if ( otherBuffs[ksAdrenalineRush] == 2 )
		{ // PartyFAR
			if ( n_A_WeaponType != weapTyp_BOW && !(weapTyp_HANDGUN <= n_A_WeaponType && n_A_WeaponType <= weapTyp_GRENADE) )
			{
				aspdMultiplier += 25;
			}
		}
		else if ( otherBuffs[ksAdrenalineRush] == 3 )
		{ // AR Scroll
			if ( weapTyp_AXE <= n_A_WeaponType && n_A_WeaponType<=weapTyp_MACE )
			{
				aspdMultiplier += 30;
			}
		}

		if ( n_A_WeaponType == weapTyp_SWORD && SkillSearch( skill_KN_ONE_HAND_QUICKEN ) )
		{ // One Handed Quicken
			aspdMultiplier += 30;
			ASPDch = 1;
		}
		if ( ASPDch === 0 && ( TimeItemNumSearch( temp_ALCHESET ) || TimeItemNumSearch( temp_NOBLE ) ) )
		{ // ???
			aspdMultiplier += 30;
			ASPDch = 1;
		}
		if ( ( n_A_WeaponType == weapTyp_SPEAR || n_A_WeaponType == weapTyp_2HSPEAR ) && SkillSearch( skill_CR_SPEAR_QUICKEN ) )
		{ // Spear Quicken
			aspdMultiplier += 30;
			ASPDch = 1;
		}
	}
	if ( SkillSearch( skill_TKM_SOLAR_LUNAR_AND_STELLAR_SHADOW ) && n_A_JobLV >= 50 )
	{ // Shadow
		ASPDch = 1;
		aspdMultiplier += 3 * SkillSearch( skill_TKM_SOLAR_LUNAR_AND_STELLAR_SHADOW );
	}
	if ( SkillSearch( skill_GS_LAST_STAND ) )
	{ // Last Stand
		aspdMultiplier += 20;
	}
	if ( SkillSearch( skill_GS_SINGLE_ACTION ) )
	{ // Single Action
		aspdMultiplier += Math.floor( ( SkillSearch( skill_GS_SINGLE_ACTION ) + 1 ) / 2 );
	}
	if ( performerBuffs[ksBardSolo] === ksImpressiveRiff &&
	     performerBuffs[ksBardSoloLevel] > 0 &&
	     ASPDch === 0 )
	{ // Impressive Riff
		if ( n_A_WeaponType != weapTyp_BOW &&
		     !( weapTyp_HANDGUN <= n_A_WeaponType && n_A_WeaponType <= weapTyp_GRENADE_LAUNCHER ) )
		{
			var skillBonus = performerBuffs[ksBardSoloLevel];
			/*var musicLessonsBonus = performerBuffs[ksMusicLessons];
			var agiBonus = Math.floor( performerBuffs[ksBardAgi] / 10 );
			aspdMultiplier += skillBonus + musicLessonsBonus + agiBonus;*/
			aspdMultiplier += (skillBonus * 2) -1 + Math.floor(skillBonus / 10);
		}
	}
	if ( n_A_JobSearch2() === cls_CRU && SkillSearch( skill_KN_CAVALIER_MASTERY ) )
	{ // Cavalier Mastery
		console.log("before aspdMultiplier = " + aspdMultiplier);
		aspdMultiplier -= ( 5 - SkillSearch( skill_KN_CAVALIER_MASTERY ) ) * 10;
		console.log("after aspdMultiplier = " + aspdMultiplier);
	}
	if ( n_A_JobSearch2() === cls_KNI &&
		 ( SkillSearch( skill_KN_CAVALIER_MASTERY ) || SkillSearch( skill_RUN_DRAGON_TRAINING ) ) )
	{ // Cavalier or Dragon Mastery
		if ( SkillSearch( skill_KN_CAVALIER_MASTERY ) )
		{
			aspdMultiplier -= ( 5 - SkillSearch( skill_KN_CAVALIER_MASTERY ) ) * 10;
		}
		else
		{
			aspdMultiplier -= ( 5 - SkillSearch( skill_RUN_DRAGON_TRAINING ) ) * 5;
		}
	}
	if ( SkillSearch( skill_MO_MENTAL_STRENGTH ) )
	{ // Mental Strength
		aspdMultiplier -= 25;
	}
	if ( SkillSearch( skill_CR_DEFENDING_AURA ) )
	{ // Defending Aura
		aspdMultiplier -= ( 25 - SkillSearch( skill_CR_DEFENDING_AURA ) * 5 );
	}
	if ( performerBuffs[ksWandererSolo] === ksSwingDance && performerBuffs[ksWandererSoloLevel] > 0 )
	{ // Swing Dance
		var skillBonus = performerBuffs[ksWandererSoloLevel] * 5;
		var voiceLessonsBonus = performerBuffs[ksWandererVoiceLessons];

		aspdMultiplier += skillBonus + voiceLessonsBonus;
	}
	if ( performerBuffs[ksChorus] === ksDancesWithWargs &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Dances with Wargs
		var skillBonus = 5;
		var performerBonus = performerBuffs[ksNumPerformers] * 5;
		
		if ( performerBonus > 25 )
		{
			performerBonus = 25;
		}

		aspdMultiplier += skillBonus + performerBonus;
	}
	// if ( SkillSearch( skill_RUN_FIGHTING_SPIRIT ) )
	// { // Asir Rune
		// aspdMultiplier += SkillSearch( skill_RUN_RUNE_MASTERY ) / 10.0 * 4;
	// }
		
	// Items
	if ( usableItems[ksAttackSpeed] || usableItems[ksGuaranaCandy] )
	{ // non-stackable speed pots
		var _mul = 0;
		if ( usableItems[ksAttackSpeed] === spdpot_CONC || usableItems[ksGuaranaCandy] )
		{ // Concentration Postion and Guarana Candy (per Lord Novice)
			_mul = 10;
		}
		if ( usableItems[ksAttackSpeed] === spdpot_AWAK )
		{ // Awakening Potion
			_mul = 15;
		}
		if ( usableItems[ksAttackSpeed] === spdpot_BERSERK )
		{ // Berserk Potion
			_mul = 20;
		}
		aspdMultiplier += _mul;
	}
	
	aspdMultiplier = ( 100 - aspdMultiplier ) / 100.0
	
	// Correction ---------------------------------------------
	var aspdCorrection = 0;
	if ( n_A_AGI < 205 )
	{
		aspdCorrection = ( Math.sqrt( 205 ) - Math.sqrt( n_A_AGI ) ) / 7.15;
	}
	
	// Penalty ------------------------------------------------
	var aspdPenalty = 0.96;
	if ( jobASPD > 145 )
	{
		aspdPenalty = 1 - ( jobASPD - 144 ) / 50;
	}
		
	// Calculate ASPD -----------------------------------------
	 n_A_ASPD = ( 200 - ( 200 - ( jobASPD + shieldPenalty - aspdCorrection + statASPD * aspdPenalty ) ) * aspdMultiplier );
	
	// Equipment ASPD -----------------------------------------
	var equipASPD = n_tok[bon_ASPD_MUL];
	if ( EquipNumSearch( 654 ) )
	{ // Western Outlaw
		equipASPD += Math.floor( n_A_AGI / 14 );
	}
	if ( EquipNumSearch( 1602 ) )
	{ // "Mythic Wasteland Outlaw (7 d.)"
		equipASPD += Math.floor( n_A_AGI / 14 );
	}
	if ( n_A_Equip[eq_WEAPON] === 484 && SU_STR >= 50 )
	{ // Sage's Diary
		equipASPD += 5;
	}
	if ( EquipNumSearch( 624 ) )
	{ // Hurricane Fury
		equipASPD += n_A_Weapon_ATKplus;
	}
	if ( EquipNumSearch( 641 ) )
	{ // Book of the Dead
		equipASPD += n_A_Weapon_ATKplus;
	}
	if ( SU_STR >= 77 && EquipNumSearch( 944 ) )
	{ // Lunar Skillet
		equipASPD += 4;
	}
	if ( n_A_JobSearch2() === cls_KNI && rebirthClass && EquipNumSearch( 855 ) )
	{ // Tournament Shield System Set
		equipASPD -= 5;
	}
	if ( EquipNumSearch( 1086 ) || EquipNumSearch( 1088 ) )
	{ // Glorious Morning Star/Cleaver
		if ( n_A_Weapon_ATKplus >= 6 )
		{
			equipASPD += 5;
		}
		if ( n_A_Weapon_ATKplus >= 9 )
		{
			equipASPD += 5;
		}
	}
	if ( EquipNumSearch( 1081 ) )
	{ // Glorious Spear
		if ( n_A_Weapon_ATKplus >= 6 )
		{
			equipASPD += 10;
		}
	}
	if ( EquipNumSearch( 1077 ) )
	{ // Glorious Flamberge
		if ( n_A_Weapon_ATKplus >= 7 )
		{
			equipASPD += 5;
		}
		if ( n_A_Weapon_ATKplus >= 9 )
		{
			equipASPD += 5;
		}
	}
	if ( SU_STR >= 95 && EquipNumSearch( 621 ) )
	{ // DoomSlayer
		equipASPD -= 40;
	}
	if ( EquipNumSearch( 903 ) && n_A_JobSearch2() === cls_CRU )
	{ // Assaulter Spear
		equipASPD += 20;
	}
	if ( SU_STR >= 95 && EquipNumSearch( 1167 ) )
	{ // Giant Axe
		equipASPD += 3;
	}
	if ( EquipNumSearch( 1121 ) && n_A_JobSearch() === cls_THI )
	{ // Thief Figurine
		equipASPD += 3 * EquipNumSearch( 1121 );
	}
	if ( EquipNumSearch( 1299 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Mercury Riser
		equipASPD += 2;
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			equipASPD += 2;
		}
	}
	if ( EquipNumSearch( 1341 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Leo Diadem
		equipASPD += 3;
	}
	if ( EquipNumSearch( 1354 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Sagittarius Crown
		equipASPD += 2;
	}
	if ( EquipNumSearch( 1355 ) && n_A_HEAD_DEF_PLUS >= 8 )
	{ // Scorpio Crown
		equipASPD += 2;
		if ( EquipNumSearch( 1355 ) && n_A_HEAD_DEF_PLUS >= 10 )
		{ // Scorpio Crown
			equipASPD += 2;
		}
	}
	if ( EquipNumSearch( 1004 ) || EquipNumSearch( 1006 ) )
	{ // Rogue's Treasure + Cold Heart/Black Cat
		equipASPD += Math.floor( n_A_Weapon_ATKplus / 2 );
	}
	if ( usableItems[ksCelermineJuice] )
	{ // Celermine Juice
		equipASPD += 10;
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if (n_A_SHOULDER_DEF_PLUS >= 7 && SU_AGI >= 90) { equipASPD += 8; }
	}
	if ( EquipNumSearch( 1584 ) )
	{ //Golden Angel HAirband
		if (SU_AGI >= 70) { equipASPD += 2; }
		if (n_A_HEAD_DEF_PLUS >= 7 && SU_AGI >= 70) { equipASPD += 3; }
	}
	if ( EquipNumSearch( 1515 ) )
	{ //Pegasus Ear Wing
		if (n_A_BaseLV >= 100) { equipASPD += 1; }
		if (n_A_BaseLV >= 150) { equipASPD += 1; }
	}
	if ( EquipNumSearch( 1553 ) )
	{//Small poring Band
		if ( n_A_HEAD_DEF_PLUS >= 3)
		{
			equipASPD += 2;
		}
		if ( n_A_HEAD_DEF_PLUS >= 6)
		{
			equipASPD += 2;
		}
		if ( n_A_HEAD_DEF_PLUS >= 9)
		{
			equipASPD += 2;
		}
	}
	if ( EquipNumSearch( 1497 ) )
	{ // UFO Poring Hat
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			equipASPD += 5;
		}
	}
	if(EquipNumSearch(1545))
	{ //Fallen Angel Wing
		equipASPD += Math.floor(SU_AGI/20);
	}
	if(EquipNumSearch(2029))
	{ //Supplement Part Agi
		if(n_A_SHOES_DEF_PLUS >=4)
			equipASPD += 1;
	}
	if(EquipNumSearch(2035))
	{ //Pile Bunker S
		equipASPD += Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if (EquipNumSearch(2038))
	{//Armor of Sixtus the Agile
		equipASPD += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
	}
	if((EquipNumSearch(2052) || EquipNumSearch(2057) || EquipNumSearch(2061) || EquipNumSearch(2071) ) && n_A_Weapon_ATKplus >= 9) 
	{//Trident of Undine || Hand of Death || Empyrean || All-Holy Book
		equipASPD += 10;
	}
	if(EquipNumSearch(2058) || EquipNumSearch(2059) || EquipNumSearch(2060))
	{//Steel Flower || Magic Sword || Fatalist
		equipASPD += 2 *  Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(2079) || EquipNumSearch(2080))
	{//Crimson Rose || Master of Souls
		equipASPD += 3 *  Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(1942))
	{ //"General's Helmet"
		if(n_A_HEAD_DEF_PLUS >=7)
			equipASPD += 10;
	}
	if(EquipNumSearch(2198) || EquipNumSearch(1953))  //Agi Boots
	{
		equipASPD += 3 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	}
	if(EquipNumSearch(1947))  //Agi Boots Slot
	{
		equipASPD += 2 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	}
	if(EquipNumSearch(2092))
	{//Revised Encyclopedia + Giant Encyclopedia
		equipASPD += n_A_LEFT_DEF_PLUS;
	}
	if(EquipNumSearch(2131))
	{//Felrock's Boots
		if(n_A_SHOES_DEF_PLUS >= 7)
			equipASPD += 5;
		if(n_A_SHOES_DEF_PLUS >= 9)
			equipASPD += 5;
	}
	if(EquipNumSearch(2147))
	{// "Chronocloak of Luck"
		equipASPD += 5 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4);
	}
	if(EquipNumSearch(2160) || //Lindy Hop
	   EquipNumSearch(2179) )  //Juliette D Rachel
	{
		equipASPD += n_A_Weapon_ATKplus;
	}
	if(EquipNumSearch(2227) )  // Old Bone Circlet [1]
	{
		equipASPD += n_A_HEAD_DEF_PLUS;
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		equipASPD += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
		if(SU_AGI >= 90)
			equipASPD += 3;
	}
	if(EquipNumSearch(2240))
	{// Ultralight Magic Shield [1]
		if(n_A_LEFT_DEF_PLUS >= 7)
			equipASPD += 2;
		if(n_A_LEFT_DEF_PLUS >= 9)
			equipASPD += 3;
	}
	if(EquipNumSearch(2251))
	{//YSF01 Greave
		if(n_A_SHOES_DEF_PLUS >= 8)
			equipASPD += 8;
	}
	if(EquipNumSearch(2253))
	{//YSF01 Plate + Greave
			equipASPD += n_A_SHOES_DEF_PLUS;
	}
	// if(EquipNumSearch())
	// {
	// }
	
//Cards
	if(CardNumSearch(556))
	{//Cenere Card
		equipASPD += 2 * Math.floor(SU_AGI/10);
	}
	if(CardNumSearch(589))
	{//Big Eggring Card
		if(SU_AGI <=50)
		{
			equipASPD -= 2 * Math.floor(SU_AGI/10);
		}
		else
		{
			equipASPD -= 10;
		}
	}
	if(CardNumSearch(691))
	{//Gigantes Card
		if(SU_AGI >= 120)
			equipASPD += 3 * CardNumSearch(691);
	}
	if(CardNumSearch(700))
	{//GC109 Card
		if(n_A_BaseLV >= 90)
			equipASPD += CardNumSearch(700);
		if(n_A_BaseLV >= 120)
			equipASPD += CardNumSearch(700);
	}
	if(CardNumSearch(770))
	{//Cutie Card
		equipASPD += Math.floor(n_A_SHOES_DEF_PLUS / 2);
	}
	
//Shadows
	if ( EquipNumSearch( 1747 ) )// "Shadow Sage Armor"
	{ 
		if(SkillSearch(skill_SA_HINDSIGHT))
		{
			equipASPD += n_A_SHADOW_BODY_DEF_PLUS;
		}
	}	
	if ( EquipNumSearch( 1755 ) || EquipNumSearch( 1758 ))// "Shadow Bard Set" or "Shadow Dancer Set"
	{ 
		if(SkillSearch(skill_BD_AMP))
		{
			equipASPD += 50;
		}
	}
	if ( EquipNumSearch( 1713 ) )
	{ // "Shadow Swordsman Ring"
		if(n_A_SHADOW_EARRING_DEF_PLUS >= 7)
		{
			equipASPD += 2;
		}
	}
	if( (EquipNumSearch( 1809 ) &&  SkillSearch(skill_RUN_ENCHANT_BLADE) ) ||// Shadow Runeknight Shield
		(EquipNumSearch( 1816 ) &&  SkillSearch(skill_SHA_AUTO_SHADOW_SPELL) ) ||//Shadow Shadowchaser Shield
		EquipNumSearch( 1824 ) ) //Shadow Super Novice Shield
	{
		equipASPD += n_A_SHADOW_SHIELD_DEF_PLUS;
	}
	if( EquipNumSearch( 1824 ) ) //Shadow Super Novice Shield
	{
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 9){ equipASPD += SkillSearch(skill_TH_DOUBLE_ATTACK);}
	}
	// if ( SkillSearch( skill_RUN_FIGHTING_SPIRIT ) )
	// { // Asir Rune
		// equipASPD += SkillSearch( skill_RUN_RUNE_MASTERY ) / 10.0 * 4;
	// }
	//Skill
	if ( ( SkillSearch( skill_AC_INCREASE_AGI ) || acolyteBuffs[ksIncreaseAgi] ) )
	{ // INCREASE AGI
		if ( SkillSearch( skill_AC_INCREASE_AGI ))
		{
			equipASPD += SkillSearch( skill_AC_INCREASE_AGI );
		}
		else
		{
			equipASPD += acolyteBuffs[ksIncreaseAgi] ;
		}
		
	}
	if ( n_A_WeaponType == 3 && SkillSearch( skill_KN_TWOHAND_QUICKEN ) )
		{ // Two Handed Quicken
			equipASPD += 10;
		}
	
	if ( SkillSearch( skill_RUN_FIGHTING_SPIRIT ) )
	{ // Asir Rune
		n_A_ASPD += SkillSearch( skill_RUN_RUNE_MASTERY ) / 10.0 * 4;
	} 
	equipASPD = equipASPD / 100.0 ;
	percentAspdEquipment = (195 - n_A_ASPD) * equipASPD;
	n_A_ASPD += percentAspdEquipment;
	
	// flat ASPD bonuses --------------------------------------
	var flatASPD = n_tok[bon_ASPD_ADD];
	if ( n_A_Equip[eq_WEAPON] === 47 )
	{ // Masamune
		flatASPD += 2;
	}
	if ( SU_AGI >= 120 && EquipNumSearch( 1255 ) )
	{ // Sniper Googles
		flatASPD += 1;
	}
	if ( SU_AGI >= 120 && EquipNumSearch( 1399 ) )
	{ // Giant Crossbow
		flatASPD += 1;
	}
	if ( SU_STR >= 120 && EquipNumSearch( 1259 ) )
	{ // Midas Whispers
		flatASPD += 1;
	}
	if ( EquipNumSearch( 1284 ) )
	{ // alca bringer
		flatASPD += Math.floor( n_A_Weapon_ATKplus / 2 );
	}
	if ( n_A_WeaponType==weapTyp_2HSWORD && CardNumSearch( 509 ) )
	{ // Fanat
		if ( n_A_Weapon_ATKplus >= 10 ) flatASPD += 1;
		if ( n_A_Weapon_ATKplus >= 14 ) flatASPD += 1;
	}
	if ( n_A_WeaponType==weapTyp_BOW && CardNumSearch( 504 ) )
	{ // Beholder Master
		if ( n_A_Weapon_ATKplus >= 10 ) flatASPD += 1;
		if ( n_A_Weapon_ATKplus >= 14 ) flatASPD += 1;
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_AGI >= 90) { flatASPD += 1; }
	}
	if ( EquipNumSearch( 1583 ) )
	{ //Golden Angel Wing
		if (SU_AGI >= 90) { flatASPD += 1; }
		if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_AGI >= 90) { flatASPD += 1; }
	}
	if ( EquipNumSearch( 1553 ) )
	{//Small poring Band
		if ( n_A_HEAD_DEF_PLUS >= 10 )
		{
			flatASPD +=1;
		}
	}
	if(EquipNumSearch(1702) || EquipNumSearch(1860) || EquipNumSearch(1942))
	{ //"Dog Cap" or "Feathered Tricorn" or "General's Helmet"
		if(n_A_HEAD_DEF_PLUS >= 9)
			flatASPD += 1;
	}
	if(EquipNumSearch(1947) || EquipNumSearch(1953) || EquipNumSearch(2198))  //Agi Boots
	{
		if(SU_AGI >= 120)
		{
			flatASPD += 1;
		}
	}
	if(EquipNumSearch(1990) && n_A_LEFT_DEF_PLUS >= 9) // Seraphing Shield
	{
		flatASPD += 1;
	}
	if((EquipNumSearch(2079) || EquipNumSearch(2080)) && n_A_Weapon_ATK >= 7)
	{//Crimson Rose || Master of Souls
		flatASPD += 1;
	}
	if(EquipNumSearch(2131))
	{//Felrock's Boots
		if(n_A_SHOES_DEF_PLUS >= 12)
			flatASPD += 1;
	}
	if(EquipNumSearch(2215) || // Old Rune Circlet [1]
	   EquipNumSearch(2217) || // Old Driver Band (Red) [1]
	   EquipNumSearch(2218) || // Old Driver Band (Yellow) [1]
	   EquipNumSearch(2228) )  // Old Casket of Protection [1]
	{
		flatASPD += Math.floor(n_A_HEAD_DEF_PLUS / 5);
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		if(n_A_SHOULDER_DEF_PLUS >= 10)
			flatASPD += 1;
	}
	if(EquipNumSearch(2241))
	{//Dark Rose [2]
		if(n_A_Weapon_ATKplus >= 9)
			flatASPD += 1;
	}
	if(n_A_Equip[eq_WEAPON] == 2247)
	{// Sealed Maximum Sword [2]
		if(n_A_Weapon_ATKplus >= 10)
		{
			flatASPD += 1;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2247)
	{// Sealed Maximum Sword [2]
		if(n_A_Weapon2_ATKplus >= 10)
		{
			flatASPD += 1;
		}
	}
	if(n_A_Equip[eq_WEAPON] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon_ATKplus >= 10)
		{
			flatASPD += 1;
		}
	}
	if(n_A_Equip[eq_WEAPONII] == 2248)
	{// Sealed Evil Sword [2]
		if(n_A_Weapon2_ATKplus >= 10)
		{
			flatASPD += 1;
		}
	}
	if(EquipNumSearch(2251))
	{//YSF01 Greave
		if(n_A_SHOES_DEF_PLUS >= 11)
			flatASPD += 1;
	}
	// if(EquipNumSearch())
	// {
	// }
	
//Cards
	if(CardNumSearch(750) && (n_A_JOB == cls_RUN || n_A_JOB == cls_RUNt))
	{//Rune Knight Seyren Card
		flatASPD += 2;
	}
//Shadows
	if( (EquipNumSearch( 1809 ) &&  SkillSearch(skill_RUN_ENCHANT_BLADE) ) || // Shadow Runeknight Shield
		(EquipNumSearch( 1816 ) &&  SkillSearch(skill_SHA_AUTO_SHADOW_SPELL) ) ) // Shadow Shadowchaser Shield
	{
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 7) {flatASPD += 1;}
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 9) {flatASPD += 1;}
	}
	if( (EquipNumSearch( 1822 ) &&  SkillSearch(skill_NIN_NINJA_AURA) ) ) //Shadow Ninja Shield
	{
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 9) {flatASPD += 1;}
	}
	if ( EquipNumSearch(1840) || EquipNumSearch(1842) )
	{ // Shadow Taekwon Gloves or Shadow Gunslinger Gloves
		if(n_A_SHADOW_WEAPON_DEF_PLUS >=7){flatASPD += 1;}
		if(n_A_SHADOW_WEAPON_DEF_PLUS >=9){flatASPD += 1;}
	}
	if( EquipNumSearch(1995))
	{//Shadow Doram Battler Gloves
		if(SkillSearch(skill_SUM_SPIRIT_OF_LAND))
			flatASPD += 1;
	}
	if( EquipNumSearch(1993))
	{//Shadow Doram Battler Shield
		if(SkillSearch(skill_SUM_ARCLOUSE_DASH))
			flatASPD += 1;
	}
	// if ( SkillSearch( skill_RUN_FIGHTING_SPIRIT ) )
	// { // Asir Rune
		// flatASPD += SkillSearch( skill_RUN_RUNE_MASTERY ) / 10.0 * 4;
	// }
	// if ( SkillSearch( skill_RUN_FIGHTING_SPIRIT ) )
	// { // Asir Rune
		// flatASPD += Math.floor(4 * (100 - equipASPD) / 100);
	// }
	if ( SkillSearch(skill_SOR_SUMMON_TYPE) == 1 && SkillSearch(skill_SOR_SUMMON_LEVEL) > 0 && SkillSearch(skill_SOR_SPIRIT_CONTROL) == 1 ) {
		flatASPD += 5;
	}
	if ( SkillSearch( skill_REB_HIT_BARREL ) )
	{
		flatASPD += SkillSearch( skill_REB_HIT_BARREL );
	}
	
	//Enchant
	for(var i = 0; i < 6; i++)
	{
		if(EnchNumSearch( 281 + i ))//Special STR = 281 ~ Special Luk = 286
		{
			if(n_A_SHOULDER_DEF_PLUS > 11)
			{
				flatASPD += 1;
			}
		}
	}
	
	//Items
	if ( usableItems[ksArchmagePotion] )
	{
		flatASPD += 1;
	}
	n_A_ASPD += flatASPD;

	// Cap to limits ------------------------------------------
	if ( thirdClass === 1 || n_A_JOB == cls_KAGOB || n_A_JOB == cls_ENOVI || n_A_JOB == cls_REB)
	{ // 3rd class
		n_A_ASPD = Min( n_A_ASPD, 193 );
	}
	else
	{ // non-3rd class
		n_A_ASPD = Min( n_A_ASPD, 190 );
	}
	
	return n_A_ASPD.toFixed(2);
}

// reset variable cast
function CalcVariableCast()
{
	variableCastTime = ( 1 - Math.sqrt( ( n_A_DEX * 2 + n_A_INT ) / 530 ) );
	variableCastTime = Max( variableCastTime, 0 );
	
	
	var VCT=100;
	VCT += n_tok[bon_RED_CAST];
	
	if ( n_A_JobSearch() == cls_MAG && CardNumSearch( 454 ) )
	{ // MageSet ?
		VCT -= 15;
	}
	if ( n_A_JobSearch2() == cls_SAG && CardNumSearch( 460 ) )
	{ // SageSet ?
		VCT -= 15;
	}
	if ( EquipNumSearch( 750 ) )
	{ // Set ?
		VCT -= n_A_Weapon_ATKplus;
	}
	if ( n_A_card[8] == 177 )
	{ // Katheryne
		VCT -= n_A_HEAD_DEF_PLUS;
	}
	/*if ( EquipNumSearch( 849 ) )
	{ // Balloon Hat
		VCT -= n_A_HEAD_DEF_PLUS;
	}*/
	if ( n_A_Weapon_ATKplus >= 9 &&EquipNumSearch(1084))
	{ // Glorious Arc Wand
		VCT -= 5;
	}
	if ( n_A_Weapon_ATKplus >= 9 &&EquipNumSearch(1095))
	{ // Glorious Apocalypse
		VCT -= 5;
	}
	if(SU_DEX >= 120 && EquipNumSearch(1260))
	{ // Magic Stone Hat
		VCT -= 2;
	}
	if ( EquipNumSearch( 1145 ) )
	{ // Mini Propeller (Kafra)
		VCT -= n_A_HEAD_DEF_PLUS;
	}
	if ( EquipNumSearch( 750 ) )
	{ // Spiritual Ring/Soul Staff/Wizardry Staff
		VCT -= n_A_Weapon_ATKplus;
	}
	if ( EquipNumSearch( 872 ) )
	{ // Crown of Deceit
		if ( n_A_HEAD_DEF_PLUS >= 7 )
		{
			VCT -= 5;
		}
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			VCT -= 5;
		}
	}
	if ( EquipNumSearch( 1149 ) )
	{ // Skull Cap
		if ( EquipNumSearch( 89 ) || EquipNumSearch( 936 ) )
		{ // Evil Bone Wand or Thorn Staff of Darkness
			if ( n_A_Weapon_ATKplus >= 10 )
			{
				VCT -= 10;
			}
		}
	}
	if ( EquipNumSearch( 1339 ) && n_A_HEAD_DEF_PLUS >= 8 )
	{ // Capricorn Diadem
		VCT -= 3;
	}
	if ( EquipNumSearch( 1344 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Sagittarius Diadem
		VCT -= 3;
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			VCT -= 2;
		}
	}
	if ( EquipNumSearch( 1006 ) )
	{ // Rogue's Treasure + Black Cat
		VCT -= Math.floor( n_A_Weapon_ATKplus / 2 );
	}
	if ( EquipNumSearch( 1497 ) )
	{ // UFO Poring Hat
		if ( n_A_HEAD_DEF_PLUS >= 7 )
		{
			VCT -= 5;
		}
	}
	if(EquipNumSearch(1681))
	{ //"Amistr Hat"
		if ( n_A_HEAD_DEF_PLUS >= 7 )
		{
			VCT -= 10;
		}
	}
	if( EquipNumSearch( 1759 ) )
	{ // Diabolic Halo
		if(n_A_HEAD_DEF_PLUS >= 7)
		{
			VCT -= 10;
		}
		if(EquipNumSearch( 1452 ) && EquipNumSearch( 1453 ))
		{// Mikatsuki + Raksasa Dagger
			VCT -= n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus;
		}
	}	
	if( EquipNumSearch( 1964 ) )
	{//Hero Magic Coat
		if(n_A_BODY_DEF_PLUS % 2 == 1) // If an odd refine level
		{
			VCT += 20;
		}
		else
		{
			VCT -= Math.floor(n_A_BODY_DEF_PLUS / 2);
		}
	}
	if( EquipNumSearch( 1968 ) )
	{//Hero Nependess Shoes
		if(n_A_SHOES_DEF_PLUS >=8)
			VCT -= 5;
		if(n_A_SHOES_DEF_PLUS >=8 && n_A_SHOES_DEF_PLUS < 11) 
			VCT -= n_A_SHOES_DEF_PLUS - 8;
		if(n_A_SHOES_DEF_PLUS >=11)
			VCT -= 3;
		if(n_A_SHOES_DEF_PLUS >=11 && n_A_SHOES_DEF_PLUS < 13)
			VCT -= (n_A_SHOES_DEF_PLUS - 11) * 3;
		if(n_A_SHOES_DEF_PLUS >=13)
			VCT -= 9;
	}
	if( (EquipNumSearch(2053) || EquipNumSearch(2063) || EquipNumSearch(2065) || EquipNumSearch(2072))&& n_A_Weapon_ATKplus >= 9)
	{//Blade of Light || Rusty Dragon's Wand || Shadow Eater || Mace of the Righteous
		VCT -= 10;
	}
	if(EquipNumSearch(2068) && n_A_Weapon_ATKplus >= 11) 
	{//Big Badaboom
		VCT -= 15;
	}
	if(EquipNumSearch(2130))
	{//Felrock's Cloak
		if(n_A_SHOULDER_DEF_PLUS >= 7)
			VCT -= 10;
		if(n_A_SHOULDER_DEF_PLUS >= 9)
			VCT -= 10;
		if(n_A_SHOULDER_DEF_PLUS >= 12)
			VCT -= 5;
	}
	if(EquipNumSearch(2236))
	{// Agenda Robe + Ancient Cape[0]\[1]
		VCT -= n_A_BODY_DEF_PLUS * 2;
	}
	if(EquipNumSearch(2234))
	{//Mercenary Ring Type B
		if(n_A_JobSearch() == cls_NOV)
		{
			VCT -= 30;
		}
	}
	
	if(EquipNumSearch(1745))
	{ //"Shadow Wizard Boots"
		if ( n_A_ActiveSkill == skill_WI_METEOR_STORM || n_A_ActiveSkill == skill_WI_LORD_OF_VERMILLION || n_A_ActiveSkill == skill_WI_STORM_GUST )
		{
			VCT -= 3 * n_A_SHADOW_SHOES_DEF_PLUS;
		}
	}
	
	if( EquipNumSearch(2309) || //Mechanic set
		EquipNumSearch(2314) )  //Geneticist set
	{
		VCT -= Math.floor((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS)/2);
	}
	
	if( EquipNumSearch( 1824 ) ) //Shadow Super Novice Shield
	{
		VCT -= n_A_SHADOW_SHIELD_DEF_PLUS;
		if(n_A_SHADOW_SHIELD_DEF_PLUS >= 9){ VCT -= SkillSearch(skill_AR_OWLS_EYE);}
	}
	if ( EquipNumSearch(1996) )
	{ // Shadow Doram Mage Gloves
		VCT -= n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	
// Skills
	if ( performerBuffs[ksBardSolo] === ksMagicStrings && performerBuffs[ksBardSoloLevel] > 0 )
	{ // Magic Strings
		var skillBonus = performerBuffs[ksBardSoloLevel];
		/*var musicLessonsBonus = performerBuffs[ksMusicLessons];
		var dexBonus = Math.floor( performerBuffs[ksBardDex] / 10 );
		VCT -= skillBonus + musicLessonsBonus + dexBonus;*/
		VCT -= skillBonus * 2;
	}
	if ( SkillSearch(skill_KAG_16TH_NIGHT) ) {
		VCT -= 50;
	}
	
	if ( TimeItemNumSearch( temp_ISILLA ) )
	{ // Isilla
		VCT -= 50;
	}

	if ( VCT < 0 )
	{
		VCT=0;
	}

	variableCastTime *= VCT /100;

	VCT = 100;
	
	if(StPlusCalc2(bon_CAST_SKILL+ n_A_ActiveSkill) != 0)
		VCT -= StPlusCalc2(bon_CAST_SKILL+ n_A_ActiveSkill);
	if(StPlusCard(bon_CAST_SKILL+ n_A_ActiveSkill) != 0)
		VCT -= StPlusCard(bon_CAST_SKILL+ n_A_ActiveSkill);
	if(StPlusEnchant(bon_CAST_SKILL+ n_A_ActiveSkill) != 0)
		VCT -= StPlusEnchant(bon_CAST_SKILL+ n_A_ActiveSkill);
	if ( n_A_ActiveSkill==321 || n_A_ActiveSkill==197)
	{ // Guillotine Fist
		if ( SkillSearch(195) && n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1097))
		{ // Glorious Fist
			VCT -= 100;
		}
	}
	if ( n_A_ActiveSkill === 430 )
	{ // Tracking
		if ( n_A_Weapon_ATKplus >= 9 && EquipNumSearch( 1100 ) )
		{ // Glorious Rifle
			VCT += 25;
		}
	}
	if ( n_A_ActiveSkill === 131 )
	{
		if ( n_A_Weapon_ATKplus >= 10 && EquipNumSearch( 1169 ) )
		{ // Lacrima Stick
			VCT -= 8;
		}
	}
	if ( (EquipNumSearch( 1637 ) ) )
	{// "Thanatos' Dolor Hat"
		if(n_A_HEAD_DEF_PLUS > 8)
		{
			VCT -= 10;
		}
	}
	
	if ( (EquipNumSearch( 1718 ) ) )
	{// "Shadow Diviner Ring"
		if(n_A_SHADOW_EARRING_DEF_PLUS >= 7)
		{
			VCT -= 2;
		}
	}
	
	
	
	if ( VCT < 0 )
	{
		VCT = 0;
	}
	
	variableCastTime *= VCT /100;

	if ( acolyteBuffs[ksSuffragium] )
	{
		variableCastTime *= ( 100 - ( 5 + ( 5 * acolyteBuffs[ksSuffragium] ) ) ) / 100;
	}
	if ( SkillSearch( skill_PR_MEMORIZE ) )
	{
		variableCastTime = variableCastTime / 2;
	}
		
	if ( SkillSearch( skill_WAR_READING_SPELLBOOK ) )
	{
		// instant list
		var w2 = [51,54,56,57,125,126,127,128,131,132,133,534,540,542,545,547,553];
		if ( NumSearch( n_A_ActiveSkill, w2 ) )
		{
			variableCastTime = 0;
		}
	}
	
	if (SkillSearch(skill_WAR_INTENSE_TELEKINESIS)) {
	    variableCastTime -= (10 * SkillSearch(skill_WAR_INTENSE_TELEKINESIS)) / 100;
;	}
		
	return variableCastTime;
}

function CalcFixedCast()
{
	fixedCastTime = 1;
	var reductionPercentage = 0;
	var reductionFlat = 0;
	
	reductionPercentage += n_tok[bon_RED_FIXEDCAST];
	
	if(EquipNumSearch(1905) || // "Doram Gear Set"
	   EquipNumSearch(1909) || // "Luxury Doram Gear Set"
	   EquipNumSearch(1913) )  // "Elegant Doram Gear Set"
	{
		reductionPercentage += n_A_SHOULDER_DEF_PLUS + n_A_BODY_DEF_PLUS + n_A_SHOES_DEF_PLUS;
	}
	//Enchant
	for(var i = 0; i < 6; i++)
	{
		if(EnchNumSearch( 281 + i ))//Special STR = 281 ~ Special Luk = 286
		{
			if(n_A_SHOULDER_DEF_PLUS > 11)
			{
				reductionPercentage += 7;
			}
		}
	}
	
	// Items
	if ( usableItems[ksArchmagePotion] )
	{
		reductionPercentage += 30;
	}
	// Skills
	if ( SkillSearch( skill_WAR_RADIUS ) )
	{ // Radius
		if ( n_A_ActiveSkill >= skill_WAR_READING_SPELLBOOK && n_A_ActiveSkill <= skill_WAR_TETRA_VORTEX )
		{ // reduce fixed cast time of warlock skills
			reductionPercentage += Math.floor(n_A_INT/15) + Math.floor(n_A_BaseLV/15) + 5 * SkillSearch( skill_WAR_RADIUS );
		}
	}
	
	if ( acolyteBuffs[ksSacrament] )
	{ // Sacrament
		reductionPercentage += acolyteBuffs[ksSacrament] * 10;
	}
	
	if ( performerBuffs[ksChorus] === ksDancesWithWargs &&
		 performerBuffs[ksChorusLevel] > 0 &&
		 performerBuffs[ksNumPerformers] >= 2 )
	{ // Dances with Wargs
		var performerBonus = performerBuffs[ksNumPerformers] * 10;
		
		if ( performerBonus > 70 )
		{
			performerBonus = 70;
		}

		reductionPercentage += performerBonus;
	}
	
	// Fixed Cast is capped at 50% reduction
	if ( reductionPercentage > 50 )
	{
		reductionPercentage = 50;
	}
	
	// Calculate final Fixed Cast Percentage
	fixedCastTime *= ( 1 - reductionPercentage / 100 );
	
	// Calculate final Fixed Cast Fixed reduction
	fixedCastTime += reductionFlat;
	
	if(fixedCastTime < 0 )
		fixedCastTime = 0;
	
	//
	if ( SkillSearch(skill_KAG_16TH_NIGHT) ) {
		fixedCastTime = 0;
	}
	
	// Reading Spellbook gets instant cast
	if ( SkillSearch( skill_WAR_READING_SPELLBOOK ) )
	{
		// instant list
		var spellbookSpells = [51,54,56,57,125,126,127,128,131,132,133,534,540,542,545,547,553];
		if ( NumSearch( n_A_ActiveSkill, spellbookSpells ) )
		{
			fixedCastTime = 0;
		}
	}
	
	return fixedCastTime;
}
function CalcFixedCastFlat()
{
	var reductionFlat = 0;
	
	// reductionFlat -= StPlusCalc2(bon_CAST_SKILL_FLAT);
	reductionFlat -= StPlusCalc2(bon_RED_FIXEDCAST_FLAT) + StPlusCard(bon_RED_FIXEDCAST_FLAT) + StPlusEnchant(bon_RED_FIXEDCAST_FLAT);
	// Equipment
	if ( EquipNumSearch(1634) )
	{//"Zaha Doll Hat(transformation mode)"
		reductionFlat += -0.08;
		if ( n_A_HEAD_DEF_PLUS >= 2) {reductionFlat += -0.08*(n_A_HEAD_DEF_PLUS-1) }; 
	}
	if(EquipNumSearch(1681) || EquipNumSearch(1702) || EquipNumSearch(1759) || EquipNumSearch(1860) || EquipNumSearch(1942))
	{ //"Amistr Hat"              "Dog Cap"               "Diabolic Halo"         "Feathered Tricorn"   "General's Helmet"
		if ( n_A_HEAD_DEF_PLUS >= 11 && n_A_HEAD_DEF_PLUS <= 15)
		{
			reductionFlat += -0.1*(n_A_HEAD_DEF_PLUS - 10);
		}
		else if( n_A_HEAD_DEF_PLUS > 15)
		{
			reductionFlat += -0.5;
		}
	}
	if(EquipNumSearch(1950) || EquipNumSearch(1956) || EquipNumSearch(2201))  //Dex Boots
	{
		if(SU_DEX >= 120)
			reductionFlat += -0.5;
	}
	if ( EquipNumSearch(1996) )
	{ // Shadow Doram Mage Gloves
		if(SkillSearch(skill_SUM_SPIRIT_OF_LAND))
			reductionFlat += -0.1;
	}
	if(EquipNumSearch(2049))
	{// "Ancient Hero Boots"
		if(n_A_SHOES_DEF_PLUS >= 9)
			reductionFlat += -0.3;
		if(n_A_SHOES_DEF_PLUS >= 12)
			reductionFlat += -0.5;
	}
	return reductionFlat;
}

function CalcDelay()
{
	globalCastDelay = 0;
	
// Equipment
	if ( n_A_Weapon_ATKplus >= 9 && EquipNumSearch( 934 ) )
	{ // Tae Goo Lyeon
		n_tok[bon_RED_CASTDELAY] += 20;
	}
	if ( EquipNumSearch( 1036 ) && n_A_HEAD_DEF_PLUS >= 6 )
	{ // Parade Hat
		n_tok[bon_RED_CASTDELAY] += n_A_HEAD_DEF_PLUS - 5;
	}
	if(n_A_Weapon_ATKplus >= 9 &&EquipNumSearch(1084)) // Glorius ArcWand
		n_tok[bon_RED_CASTDELAY] += 5;
	if(n_A_Weapon_ATKplus >= 9 &&EquipNumSearch(1095)) // Glorius Apocalypse
		n_tok[bon_RED_CASTDELAY] += 5;
	if ( EquipNumSearch(936) )
	{ // Thorn Staff of Darkness
		n_tok[bon_RED_CASTDELAY] += 3 * Math.floor( n_A_Weapon_ATKplus / 2 );
	}
	if ( EquipNumSearch( 872 ) )
	{ // Crown of Deceit
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			n_tok[bon_RED_CASTDELAY] += 5;
		}
	}
	if ( EquipNumSearch( 1459 ) ) {
		n_tok[bon_RED_CASTDELAY] += n_A_LEFT_DEF_PLUS*2;
	}
		if ( EquipNumSearch( 1497 ) )
	{ // UFO Poring Hat
		if ( n_A_HEAD_DEF_PLUS >= 9 )
		{
			n_tok[bon_RED_CASTDELAY] += 5;
		}
	}
	if ( (EquipNumSearch( 1637 ) ) )
		{// "Thanatos' Dolor Hat"
			if(n_A_HEAD_DEF_PLUS > 10)
			{
				n_tok[bon_RED_CASTDELAY] += 15;
			}
		}
	if ( (EquipNumSearch( 1667 ) ) )
	{ // "Bandeau of Lovers"
		n_tok[bon_RED_CASTDELAY] += 3 * Math.floor( n_A_HEAD_DEF_PLUS / 3);
	}
	if ( EquipNumSearch( 1992 ) )
	{ // "Sacred Rosary + Recovery Light"
		n_tok[bon_RED_CASTDELAY] += 3 * Math.floor( n_A_Weapon_ATKplus / 2);
	}
	if(EquipNumSearch(2025)) 
	{// Upgrade Part - Engine
		if(n_A_SHOULDER_DEF_PLUS >= 9)
			n_tok[bon_RED_CASTDELAY] += 10;
		
	}
	if((EquipNumSearch(2058) && n_A_Weapon_ATKplus >= 11) ||
	   (EquipNumSearch(2060) && n_A_Weapon_ATKplus >= 11) )
	{//Steel Flower || Fatalist
		n_tok[bon_RED_CASTDELAY] += 7;
	}
	if((EquipNumSearch(2051) && n_A_Weapon_ATKplus >= 9) ||//Dragon Slayer (Ancient Weapon)
	   (EquipNumSearch(2070) && n_A_Weapon_ATKplus >= 11) )//Slate Sword
	{
		n_tok[bon_RED_CASTDELAY] += 10;
	}
	
	if(EquipNumSearch(2062)) 
	{//Scarlet Dragon's Bow
		n_tok[bon_RED_CASTDELAY] += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if(EquipNumSearch(2049))
	{// "Ancient Hero Boots"
		if(n_A_SHOES_DEF_PLUS >= 14)
			n_tok[bon_RED_CASTDELAY] += 5;
	}
	if(EquipNumSearch(2161))
	{// "Sunflower Boy"
		n_tok[bon_RED_CASTDELAY] += n_A_Weapon_ATKplus;
	}
	if(EquipNumSearch(2250))
	{//YSF01 Manteau
		if(n_A_SHOULDER_DEF_PLUS >= 11)
			n_tok[bon_RED_CASTDELAY] += 3;
		if(n_A_SHOULDER_DEF_PLUS >= 13)
			n_tok[bon_RED_CASTDELAY] += 4;
		if(SU_VIT >= 125)
			n_tok[bon_RED_CASTDELAY] += 10;
	}
	if(EquipNumSearch(2252))
	{//YSF01 Plate + Manteau
		n_tok[bon_RED_CASTDELAY] += n_A_SHOULDER_DEF_PLUS;
	}
	if(EquipNumSearch(2400))
	{//Illusion Survivor's Manteau + Survivor's Rod
		n_tok[bon_RED_CASTDELAY] += 3 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	
	// Skills
	if ( performerBuffs[ksBardSolo] === ksMagicStrings && performerBuffs[ksBardSoloLevel] > 0 )
	{ // Magic Strings
		var skillBonus = performerBuffs[ksBardSoloLevel];
		/*var musicLessonsBonus = performerBuffs[ksMusicLessons] * 2;
		var intBonus = Math.floor( performerBuffs[ksBardInt] / 5 );

		n_tok[bon_RED_CASTDELAY] += skillBonus + musicLessonsBonus + intBonus;*/
		n_tok[bon_RED_CASTDELAY] += skillBonus * 3;
	}
	
	n_tok[bon_RED_CASTDELAY] = Min( n_tok[bon_RED_CASTDELAY], 100 );
	globalCastDelay = n_tok[bon_RED_CASTDELAY];
}

function calcReUse()
{
	// todo
	return 1;
}

function calcHPReg( n_A_HPR )
{
	n_A_HPR = Math.floor( n_A_VIT / 5 ) + Math.floor( n_A_MaxHP / 200 );
	if ( n_A_HPR < 1 )
	{
		n_A_HPR = 1;
	}
	
	multiplier = 100;
	multiplier += n_tok[bon_HP_REG];
	
	if( EquipNumSearch(1866))
	{//Doram Shoes
		multiplier += 10 * Math.floor(n_A_SHOES_DEF_PLUS / 3 );
	}
	if( EquipNumSearch(1872))
	{//Luxurious Doram Shoes
		multiplier += 20 * Math.floor(n_A_SHOES_DEF_PLUS / 3 );
	}
	
	// cards
	if ( SU_LUK >= 77)
	{ // ArcAngel
		multiplier += 100 * CardNumSearch(221);
	}
	if ( n_A_JobSearch()==cls_TKK && EquipNumSearch(672))
	{ // MagistreHat
		multiplier += 3;
	}
	if ( n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407))
	{ // GoldAcidus
		multiplier += 5;
	}
		
	// Items
	if ( usableItems[ksBoucheDeNoel] )
	{ // Bouche De Noel
		multiplier += 3;
	}
	if ( usableItems[ksIncreaseSP] > 0 )
	{ // Increase SP Potion
		var modifier = 3;
		
		if ( usableItems[ksIncreaseSP] === 1 )
		{
			modifier = 2;
		}
		else if ( usableItems[ksIncreaseSP] === 3 )
		{
			modifier = 5;
		}
		multiplier += modifier;
	}
	
	// Skills
	if ( SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) || acolyteBuffs[ksPPRevitalize] > 0 )
	{
		// Natural HP recovery increase: [(Skill Level x 30) + 50] %
		if ( SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) )
		{
			multiplier += ( ( SkillSearch( skill_SUR_GENTLE_TOUCH_REVITALIZE ) * 30 ) + 50 ) - 100;
		}
		else
		{
			multiplier += ( ( acolyteBuffs[ksPPRevitalize] * 30 ) + 50 ) - 100;
		}
	}

	// apply to regen
	n_A_HPR = Math.floor( n_A_HPR * multiplier / 100 );

	if ( miscEffects[ksPoisoned] )
	{ // poison drops it to zero
		n_A_HPR = 0;
	}
	
	return n_A_HPR;
}

function calcSPReg(n_A_SPR)
{
	n_A_SPR = Math.floor(n_A_INT /6) + Math.floor(n_A_MaxSP /100) +1;

	w=100;
	w += SkillSearch(skill_HP_MEDIATIO) *3;

	w += n_tok[bon_SP_REG];

	// Skills
	if ( SkillSearch( skill_RUN_VITALITY_ACTIVATION ) )
	{ // Isia Rune
		w-=100;
	}
	if ( SkillSearch( skill_HP_MEDIATIO ) )
	{ // Meditatio
		w += 3 * SkillSearch( skill_HP_MEDIATIO );
	}
		
	// Equipment
	if( EquipNumSearch(1866))
	{//Doram Shoes
		w += 10 *Math.floor(n_A_SHOES_DEF_PLUS / 3 );
	}
	if( EquipNumSearch(1872))
	{//Luxurious Doram Shoes
		w += 20 * Math.floor(n_A_SHOES_DEF_PLUS / 3 );
	}
	// Cards
	if(SU_LUK >= 77)
		w += 100 * CardNumSearch(221); // ArcAngel
	
	if(n_A_JobSearch()==cls_TKK && EquipNumSearch(673)) // Ayam
		w += 3;
	if(n_A_HEAD_DEF_PLUS <= 4 && n_A_card[card_loc_HEAD_UPPER]==179) // BlueAcidus
		w += 5;
	if(n_A_card[card_loc_HEAD_MIDDLE]==179) // BlueAcidus
		w += 5;
	if(n_A_SHOES_DEF_PLUS <= 4 && CardNumSearch(407)) // GoldAcidus
		w += 5;
	if(EquipNumSearch(1119) && n_A_JobSearch()==cls_MAG) // MageFigure
		w += 5 * EquipNumSearch(1119);
	
	// Items
	if ( usableItems[ksBoucheDeNoel] )
	{ // Bouche De Noel
		w += 3;
	}
	if ( usableItems[ksIncreaseSP] > 0 )
	{ // Increase SP Potion
		var modifier = 4;
		
		if ( usableItems[ksIncreaseSP] === 1 )
		{
			modifier = 2;
		}
		else if ( usableItems[ksIncreaseSP] === 3 )
		{
			modifier = 8;
		}
		w += modifier;
	}

	n_A_SPR = Math.floor(n_A_SPR * w /100);

	if(n_A_INT>=120)
		n_A_SPR += Math.floor((n_A_INT-120)/2) +4;

	if(miscEffects[ksPoisoned])
		n_A_SPR = 0;
	
	return n_A_SPR;

}

function getWeaponElement()
{
	n_A_Weapon_element= parseInt(formElements["A_Weapon_element"].value)
	n_A_Weapon2_element = n_A_Weapon_element; // Left hand

	if ( n_A_Weapon_element == ele_NEUTRAL )
	{ // no endow
		for ( var j=0;ItemOBJ[n_A_Equip[eq_WEAPON]][j +itm_BONUS_START] != bon_NONE;j += 2)
		{ // Right Hand
			if(bon_ELEMENT == ItemOBJ[n_A_Equip[eq_WEAPON]][j +itm_BONUS_START])
			{
				n_A_Weapon_element = ItemOBJ[n_A_Equip[eq_WEAPON]][j +itm_BONUS_START+1];
			}
		}
		for ( var j=0;ItemOBJ[n_A_Equip[eq_WEAPONII]][j +itm_BONUS_START] != bon_NONE;j += 2)
		{ // LeftHand
			if ( bon_ELEMENT == ItemOBJ[n_A_Equip[eq_WEAPONII]][j + itm_BONUS_START] )
			{
				n_A_Weapon2_element = ItemOBJ[n_A_Equip[eq_WEAPONII]][j + itm_BONUS_START + 1];
			}
		}
		// pseudo cards (ele stones)
		if ( 201 <= cardOBJ[n_A_card[card_loc_WEAPON_I]][card_att_ID] &&
			 cardOBJ[n_A_card[card_loc_WEAPON_I]][card_att_ID] <= 204 )
		{
			n_A_Weapon_element = cardOBJ[n_A_card[card_loc_WEAPON_I]][card_att_ID] -200;
		}
		if ( 201 <= cardOBJ[n_A_card[card_loc_WEAPONII_I]][card_att_ID] &&
			 cardOBJ[n_A_card[card_loc_WEAPONII_I]][card_att_ID] <= 204 )
		{
			n_A_Weapon2_element = cardOBJ[n_A_card[card_loc_WEAPONII_I]][card_att_ID] -200;
		}
		if ( n_A_WeaponType==weapTyp_BOW ||
			 ( weapTyp_HANDGUN <= n_A_WeaponType && n_A_WeaponType <= weapTyp_GRENADE_LAUNCHER ) )
		{ // bows and guns
			n_A_Weapon_element = ArrowOBJ[n_A_Arrow][arr_att_ELEMENT];
		}
		if ( n_A_ActiveSkill === skill_GEN_CART_CANNON )
		{
			n_A_Weapon_element = CannonBallOBJ[n_A_Arrow][arr_att_ELEMENT];
		}
	}
	if ( SkillSearch( skill_SHA_INVISIBILITY ) )
	{
		n_A_Weapon_element = ele_GHOST;
	}
	if ( SkillSearch( skill_KAG_SUMMON_ELEMENTAL_SEAL ) == 10 && SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL ) )
	{
		n_A_Weapon_element = ele_NEUTRAL + SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL );
	}
	
	BK_Weapon_element = n_A_Weapon_element;
}

function getArmorElement(n_A_BodyZokusei)
{

	n_A_BodyZokusei = StPlusCard(bon_USR_ELEMENT);
	if(n_A_BodyZokusei==ele_NEUTRAL)
		n_A_BodyZokusei = StPlusCalc2(bon_USR_ELE);
	if ( SkillSearch(skill_MEC_SHAPE_SHIFT ) )
	{
		var skillLevel = SkillSearch( skill_MEC_SHAPE_SHIFT );
		if ( skillLevel === 1 )
		{
			n_A_BodyZokusei = ele_FIRE;
		}
		else if ( skillLevel === 2 )
		{
			n_A_BodyZokusei = ele_EARTH;
		}
		else if ( skillLevel === 3 )
		{
			n_A_BodyZokusei = ele_WIND;
		}
		else if ( skillLevel === 4 )
		{
			n_A_BodyZokusei = ele_WATER;
		}
	}
	if(n_A_JobSearch2() === cls_CRU && CardNumSearch(456)) // CrusaderSet
		n_A_BodyZokusei = ele_HOLY;
	if(otherBuffs[ksBSS])
		n_A_BodyZokusei = ele_HOLY;
	if(usableItems[ksHolyElemental])
		n_A_BodyZokusei = ele_HOLY;
	
	return n_A_BodyZokusei;
}

function calcRaceElementalReduction()
{ 
// Card modifiers
	if ( CardNumSearch( 452 ) && n_A_JobSearch() === cls_ACO )
	{ // Enchanted Peach Tree Card and Acolyte
		n_tok[bon_RED_RC_UNDEAD] += 30;
		n_tok[bon_RED_RC_DEMON] += 30;
	}
	if ( n_A_SHOULDER_DEF_PLUS >= 9 && CardNumSearch( 403 ) )
	{ // Orc Baby Card
		n_tok[bon_RED_ELE_NEUTRAL] += 5;
	}
	if ( CardNumSearch( 452 ) && n_A_HEAD_DEF_PLUS >= 9)
	{ // Enchanted Peach Tree Card and Acolyte
		n_tok[bon_RED_RC_INSECT] += 5;
	}
	if ( CardNumSearch( 632 ))
	{ // Faceworm Egg
		if(n_A_SHOES_DEF_PLUS >= 7)
			n_tok[bon_RED_ELE_FIRE] += 1;
		if(n_A_SHOES_DEF_PLUS >= 9)
			n_tok[bon_RED_ELE_FIRE] += 2;
	}
	if ( CardNumSearch( 698 ))
	{ // Scrap Robots Card
		if(n_A_SHOULDER_DEF_PLUS >= 7)
			n_tok[bon_RED_RC_FORMLESS] += 5;
	}
	
	// Equipment modifiers
	for ( var i = 971; i <= 977; i++ )
	{ // BG Sets
		if ( EquipNumSearch( i ) )
		{
			n_tok[bon_RED_RC_FORMLESS] -= 200;
			n_tok[bon_RED_RC_UNDEAD] -= 200;
			n_tok[bon_RED_RC_BRUTE] -= 200;
			n_tok[bon_RED_RC_PLANT] -= 200;
			n_tok[bon_RED_RC_INSECT] -= 200;
			n_tok[bon_RED_RC_FISH] -= 200;
			n_tok[bon_RED_RC_DEMON] -= 200;
			n_tok[bon_RED_RC_ANGEL] -= 200;
			n_tok[bon_RED_RC_DRAGON] -= 200;
		}
	}
	if ( EquipNumSearch( 737 ) )
	{ // Survivor's Mant + Survivor's Rod
		n_tok[bon_RED_ELE_NEUTRAL] += n_A_SHOULDER_DEF_PLUS * 3;
	}
	if ( EquipNumSearch( 1597 ) )
	{ // Survivor's Mant + Survivor's Rod
		n_tok[bon_RED_ELE_NEUTRAL] += n_A_SHOULDER_DEF_PLUS * 3;
	}
	if ( EquipNumSearch( 957 ) )
	{ // Asprika
		for ( var i = 0; i <= ele_UNDEAD; i++ )
		{
			n_tok[bon_RED_ELE_NEUTRAL + i] += 30;
		}
	}
	if ( EquipNumSearch( 1295 ) && n_A_LEFT_DEF_PLUS >= 5 )
	{ // Immune Shield
		for ( var i = 5; i <= 12; i++ )
		{ // bonus is applied for levels 5-12
			if ( i <= n_A_LEFT_DEF_PLUS )
			{
				n_tok[bon_RED_ELE_NEUTRAL] += 1;
			}
		}
	}
	if ( EquipNumSearch( 1335 ) && n_A_HEAD_DEF_PLUS >= 5 )
	{ // Cat Ear Beret
		for ( var i = 5; i <= 12; i++ )
		{ // bonus is applied for levels 5-12
			if ( i <= n_A_HEAD_DEF_PLUS )
			{
				n_tok[bon_RED_RC_DEMI_HUMAN] += 2;
			}
		}
	}
	if ( EquipNumSearch( 1340 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Gemini Diadem
		n_tok[bon_RED_ELE_WIND] += 5;
	}
	if ( EquipNumSearch( 1356 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Taurus Crown
		n_tok[bon_RED_ELE_FIRE] += 7;
	}
	if ( EquipNumSearch( 1365 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Gemini Crown
		n_tok[bon_RED_ELE_WIND] += 5;
	}
	if ( EquipNumSearch( 1367 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Virgo Crown
		n_tok[bon_RED_ELE_EARTH] += 5;
	}
	if ( EquipNumSearch( 1464 ) )
	{ //Heroic Backpack
		if (n_A_SHOULDER_DEF_PLUS >= 7 && SU_VIT >= 90) { n_tok[bon_RED_ELE_NEUTRAL] += 5; }
		if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_VIT >= 90) { n_tok[bon_RED_ELE_NEUTRAL] += 5; }
	}
	if(EquipNumSearch(1545))
	{ //Fallen Angel Wing
		n_tok[bon_RED_ELE_NEUTRAL] += Math.floor(SU_VIT/20);
	}
	if(EquipNumSearch(2025)) 
	{// Upgrade Part - Engine
		if(n_A_SHOULDER_DEF_PLUS >= 7)
			n_tok[bon_RED_ELE_NEUTRAL] += 10;
		if(n_A_SHOULDER_DEF_PLUS >= 9)
			n_tok[bon_RED_ELE_NEUTRAL] += 10;
		
	}
	if(EquipNumSearch(2229))
	{// Fallen Warrior Manteau
		if(SU_VIT >= 90)
			n_tok[bon_RED_ELE_NEUTRAL] += 3;
		if(n_A_SHOULDER_DEF_PLUS >= 8)
			n_tok[bon_RED_ELE_NEUTRAL] += 3;
		if(n_A_SHOULDER_DEF_PLUS >= 10)
			n_tok[bon_RED_ELE_NEUTRAL] += 4;
	}
	if(EquipNumSearch(2231))
	{//Consultation Robe [1]
		n_tok[bon_RED_ELE_FIRE] += n_A_BODY_DEF_PLUS * 3;
		n_tok[bon_RED_ELE_SHADOW] += n_A_BODY_DEF_PLUS * 3;
	}
	if(EquipNumSearch(2239))
	{//Consultation Robe [1] + Valkyrie Manteau
		if(n_A_SHOULDER_DEF_PLUS >= 10)
			n_tok[bon_RED_ELE_NEUTRAL] += n_A_BODY_DEF_PLUS * 10;
	}
	if(EquipNumSearch(2240))
	{// Ultralight Magic Shield [1]
		if(n_A_LEFT_DEF_PLUS >= 7)
			n_tok[bon_RED_ELE_NEUTRAL] += 2;
		if(n_A_LEFT_DEF_PLUS >= 9)
			n_tok[bon_RED_ELE_NEUTRAL] += 3;
	}
	if(EquipNumSearch(2400))
	{//Illusion Survivor's Manteau + Survivor's Rod
		if(n_A_Weapon_ATKplus <= 10)
		{
			n_tok[bon_RED_ELE_NEUTRAL] += Math.floor(n_A_Weapon_ATKplus / 2);
		}
		else
			n_tok[bon_RED_ELE_NEUTRAL] += 5;
	}

//Shadows
	if ( EquipNumSearch( 1672 ) )
	{ // "Shadow Dragonslayer Shield"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) { n_tok[bon_RED_RC_DRAGON] += 1; }
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) { n_tok[bon_RED_RC_DRAGON] += 1; }
	}
	if ( EquipNumSearch( 1675 ) )
	{ // "Shadow Undertaker Shield"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) { n_tok[bon_RED_RC_UNDEAD] += 1; }
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) { n_tok[bon_RED_RC_UNDEAD] += 1; }
	}
	if ( EquipNumSearch( 1678 ) )
	{ // "Shadow Tamer Shield"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) { n_tok[bon_RED_RC_BRUTE] += 1; }
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) { n_tok[bon_RED_RC_BRUTE] += 1; }
	}
	
// Skill modifiers
	if ( otherBuffs[ksResistantSouls] && n_A_JobSearch2() != cls_CRU )
	{ // Resistant Souls given to other classes other than crusader
		n_tok[bon_RED_RC_DEMON] += otherBuffs[ksResistantSouls] * 5;
	}
	if ( SkillSearch( skill_SA_DRAGONOLOGY ) )
	{ // Dragonology
		n_tok[bon_RED_RC_DRAGON] += SkillSearch( skill_SA_DRAGONOLOGY ) * 4;
	}
	if(SkillSearch(150))
	{
		n_tok[bon_RED_ELE_NEUTRAL] += SkillSearch(150);
		n_tok[bon_RED_ELE_FIRE] += 4 * SkillSearch(150);
	}
	if(SkillSearch(156))
	{
		n_tok[bon_RED_ELE_HOLY] += 5 * SkillSearch(156);
	}
	if(otherBuffs[ksResistantSouls] && n_A_JobSearch2() != cls_CRU)
	{
		n_tok[bon_RED_ELE_HOLY] += 5 * otherBuffs[ksResistantSouls];
	}
	if ( performerBuffs[ksEnsemble] === ksAcousticRhythm && performerBuffs[ksEnsembleLevel] > 0 )
	{ // Acoustic Rhythm
		for ( i = bon_RED_ELE_WATER; i <= bon_RED_ELE_UNDEAD; i++ )
		{
			// n_tok[i] += 55 + 5 * performerBuffs[ksEnsembleLevel];
			n_tok[i] += 3 * performerBuffs[ksEnsembleLevel];
		}
		for ( i = bon_RES_STATUS_POISON; i <= bon_RES_STATUS_STONE; i++ )
		{
			// n_tok[i] += 10 * performerBuffs[ksEnsembleLevel];
			n_tok[i] += 5 * performerBuffs[ksEnsembleLevel];
		}
	}
	
	// Item Modifiers
	if ( usableItems[ksColdproof] )
	{
		n_tok[bon_RED_ELE_WATER] += 20;
		n_tok[bon_RED_ELE_WIND] -= 15;
	}
	if ( usableItems[ksEarthproof] )
	{
		n_tok[bon_RED_ELE_EARTH] += 20;
		n_tok[bon_RED_ELE_FIRE] -= 15;
	}
	if ( usableItems[ksFireproof] )
	{
		n_tok[bon_RED_ELE_FIRE] += 20;
		n_tok[bon_RED_ELE_WATER] -= 15;
	}
	if ( usableItems[ksThunderproof] )
	{
		n_tok[bon_RED_ELE_WIND] += 20;
		n_tok[bon_RED_ELE_EARTH] -= 15;
	}
	if( usableItems[ksUndeadElemental] )
	{
		n_tok[bon_RED_ELE_WATER] += 20;
		n_tok[bon_RED_ELE_FIRE] += 20;
		n_tok[bon_RED_ELE_WIND] += 20;
		n_tok[bon_RED_ELE_EARTH] += 20;
	}
// ---------------------------------------------
	if(EquipNumSearch(624)) // Hurricane Fury
		n_tok[bon_RED_SIZ_MEDIUM] += n_A_Weapon_ATKplus;
	if(EquipNumSearch(1389) && n_A_LEFT_DEF_PLUS >= 9) // Giant Shield
		n_tok[bon_RED_SIZ_LARGE] += 5;
	if(EquipNumSearch(1990)) // Seraphing Shield
	{
		n_tok[bon_RED_SIZ_SMALL] += 2 * Math.floor(n_A_LEFT_DEF_PLUS / 3);
		n_tok[bon_RED_SIZ_MEDIUM] += 2 * Math.floor(n_A_LEFT_DEF_PLUS / 3);
		n_tok[bon_RED_SIZ_LARGE] += 2 * Math.floor(n_A_LEFT_DEF_PLUS / 3);
	}
	if(EquipNumSearch(2023)) 
	{// Upgrade Part - Plate
		if(n_A_BODY_DEF_PLUS >= 7)
			n_tok[bon_RED_SIZ_LARGE] += 10;
		if(n_A_BODY_DEF_PLUS >= 9)
		{
			n_tok[bon_RED_SIZ_SMALL] += 5;
			n_tok[bon_RED_SIZ_MEDIUM] += 5;
		}
	}
	if(CardNumSearch(658) && (n_A_JOB == cls_MEC || n_A_JOB == cls_MECt))
	{ //Kick Step Card
		n_tok[bon_RED_RANGE] += 30;
	}
// ---------------------------------------------	
	if(SkillSearch(421))
		n_tok[bon_RED_RANGE] += 20;
	
	if(EquipNumSearch(1030))
	{
		n_tok[bon_RED_BOSS] -= (5 * EquipNumSearch(1030));
		n_tok[bon_RED_NONBOSS] -= (5 * EquipNumSearch(1030));
	}
	if(EquipNumSearch(1500))
	{//Phoenix Crown
		n_tok[bon_RED_BOSS] += n_A_HEAD_DEF_PLUS;
	}
	if(EquipNumSearch(1513) && CardNumSearch(31))
	{//Lord of the Dead Helm
		if (n_A_HEAD_DEF_PLUS >= 11) n_tok[bon_RED_NON_BOSS] += 5;
	}
	if(EquipNumSearch(1569) && CardNumSearch(31))
	{//Warlock King's Crown
		if (n_A_HEAD_DEF_PLUS >= 6 && n_A_HEAD_DEF_PLUS <= 10)
		{
			n_tok[bon_RED_NON_BOSS] += n_A_HEAD_DEF_PLUS - 5;
		}
		if (n_A_HEAD_DEF_PLUS >10)
		{
			n_tok[bon_RED_NON_BOSS] += 5;
		}
	}
	if ( EquipNumSearch( 1556 ) )
	{//Anubis Helmet
		if ( n_A_HEAD_DEF_PLUS >= 5)
		{
			n_tok[bon_RED_BOSS] += 1;
		}
		if ( n_A_HEAD_DEF_PLUS >= 6)
		{
			n_tok[bon_RED_BOSS] += 1;
		}
		if ( n_A_HEAD_DEF_PLUS >= 7)
		{
			n_tok[bon_RED_BOSS] += 1;
		}
		if ( n_A_HEAD_DEF_PLUS >= 8)
		{
			n_tok[bon_RED_BOSS] += 2;
		}
		if ( n_A_HEAD_DEF_PLUS >= 9)
		{
			n_tok[bon_RED_BOSS] += 3;
		}
	}
	if ( EquipNumSearch( 1801 ) ||  EquipNumSearch( 1806 ) )
	{ // Kalasag
		n_tok[bon_RED_BOSS] += Math.floor(n_A_LEFT_DEF_PLUS / 3);
	}
	if ( EquipNumSearch( 1803 ) ||  EquipNumSearch( 1808 ) )
	{ // Bakonawa Scale Armor
		n_tok[bon_RED_BOSS] += Math.floor(n_A_BODY_DEF_PLUS / 3);
	}
	if ( EquipNumSearch( 1567 ) )
	{//Poring Fedora Hat
		if( n_A_HEAD_DEF_PLUS >= 9)
		{
			n_tok[bon_RED_RC_DEMI_HUMAN] += 5;
		}
	}
	if ( EquipNumSearch( 1666 ) &&  n_A_HEAD_DEF_PLUS >= 6 )
	{// "Headband Beret"
		n_tok[bon_RED_RC_DEMI_HUMAN] += n_A_HEAD_DEF_PLUS - 5;
	}
	if ( EquipNumSearch( 1568 ) )
	{//Winged Diadem
			n_tok[bon_RED_BOSS] += n_A_HEAD_DEF_PLUS;
		
	}

	// Sanctuary. Not sure why this is here...
	if ( EquipNumSearch( 1085 ) )
	{
		if(n_A_Weapon_ATKplus >= 6) 
		{
			n_tok[bon_SANC_MUL] += 5;
		}
		if(n_A_Weapon_ATKplus >= 10)
		{
			n_tok[bon_SANC_MUL] += 5;
		}
	}
	if ( EquipNumSearch( 1338 ) && n_A_HEAD_DEF_PLUS >= 7 )
	{ // Cancer Diadem
		n_tok[bon_SANC_MUL] += 3;
	}
	if ( EquipNumSearch( 1339 ) && n_A_HEAD_DEF_PLUS >= 9 )
	{ // Capricorn Diadem
		n_tok[bon_SANC_MUL] += 4;
	}

	// Status Reductions
	if ( EquipNumSearch(534) )
	{
		wSPVS = n_A_JobSearch();
		if(wSPVS==1 || wSPVS==2 || wSPVS==6)
			n_tok[bon_RES_STATUS_STUN] += 50;
		if(wSPVS==3 || wSPVS==4 || wSPVS==5)
			n_tok[bon_RES_STATUS_SILENCE] += 50;
	}
	if ( EquipNumSearch(828) )
	{
		n_tok[bon_RES_STATUS_STUN] += 2 * n_A_HEAD_DEF_PLUS;
		n_tok[bon_RES_STATUS_FREEZE] += 2 * n_A_HEAD_DEF_PLUS;
		n_tok[bon_RES_STATUS_STONE] += 2 * n_A_HEAD_DEF_PLUS;
	}
	//Shadows
	if ( EquipNumSearch(1763) )
	{//Shadow Boots of Hypnos
		n_tok[bon_RES_STATUS_SLEEP] += n_A_SHADOW_SHOES_DEF_PLUS;
	}
	if ( EquipNumSearch(1764) )
	{//Shadow Boots of Harpos
		n_tok[bon_RES_STATUS_SILENCE] += n_A_SHADOW_SHOES_DEF_PLUS;
	}
	if ( EquipNumSearch(1765) )
	{//Shadow Armor of Hypnos
		n_tok[bon_RES_STATUS_SLEEP] += n_A_SHADOW_BODY_DEF_PLUS;
	}
	if ( EquipNumSearch(1766) )
	{//Shadow Armor of Harpos
		n_tok[bon_RES_STATUS_SILENCE] += n_A_SHADOW_BODY_DEF_PLUS;
	}
	if ( EquipNumSearch(1767) )
	{//Shadow Shield of the Steadfast
		n_tok[bon_RES_STATUS_BLIND] += n_A_SHADOW_SHIELD_DEF_PLUS;
		n_tok[bon_RES_STATUS_SILENCE] += n_A_SHADOW_SHIELD_DEF_PLUS;
		n_tok[bon_RES_STATUS_SLEEP] += n_A_SHADOW_SHIELD_DEF_PLUS;
		n_tok[bon_RES_STATUS_STONE] += n_A_SHADOW_SHIELD_DEF_PLUS;
		n_tok[bon_RES_STATUS_BLEEDING] += Math.floor(n_A_SHADOW_SHIELD_DEF_PLUS / 2);
		n_tok[bon_RES_STATUS_CURSE] += Math.floor(n_A_SHADOW_SHIELD_DEF_PLUS / 2);
		n_tok[bon_RES_STATUS_FREEZE] += Math.floor(n_A_SHADOW_SHIELD_DEF_PLUS / 2);
		n_tok[bon_RES_STATUS_STUN] += Math.floor(n_A_SHADOW_SHIELD_DEF_PLUS / 2);
	}
	if ( EquipNumSearch(1768) )
	{//Shadow Shield of the Steadfast + Shadow Armor of Hypnos + Shadow Boots of Hypnos
		if( (n_A_SHADOW_BODY_DEF_PLUS + n_A_SHADOW_SHOES_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS) >= 20)
			n_tok[bon_RES_STATUS_SLEEP] += 100;
	}
	if ( EquipNumSearch(1769) )
	{//Shadow Shield of the Steadfast + Shadow Armor of Harpos + Shadow Boots of Harpos
		if( (n_A_SHADOW_BODY_DEF_PLUS + n_A_SHADOW_SHOES_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS) >= 20)
			n_tok[bon_RES_STATUS_SILENCE] += 100;
	}
	
	if ( CardNumSearch(176) )
	{
		if (SU_AGI >= 90 )
		{
			n_tok[bon_RES_STATUS_STUN] += 30 * CardNumSearch(176);
			n_tok[bon_RES_STATUS_SILENCE] += 30 * CardNumSearch(176);
		}
		if ( SU_VIT >= 80 )
		{
			n_tok[bon_RES_STATUS_SLEEP] += 50 * CardNumSearch(176);
			n_tok[bon_RES_STATUS_STONE] += 50 * CardNumSearch(176);
		}
	}
	if ( miscEffects[ksPetEffects] == 42 && EquipNumSearch(1218))
	{
		n_tok[bon_RES_STATUS_STUN] += 10;
	}
	if ( SkillSearch( skill_ROY_SHIELD_SPELL ) === 3 && PATCH == 2)
	{ // Shield Spell status effect resistance: [(Shield Upgrade x 2) + (Caster’s LUK / 10)] %
		var resistanceBonus = Math.floor( ( n_A_LEFT_DEF_PLUS * 2 ) + ( n_A_LUK / 10.0 ) );
		for ( var i = bon_RES_STATUS_POISON; i <= bon_RES_STATUS_STONE; i++ )
		{
			n_tok[i] += resistanceBonus;
		}
	}
	
}

var enemySkills = [ //0 normal atk, 1 ign def, 2 mdef based, 3 mdef ign, 4 ranged, 5 ranged ign def
//-1 non elemental -2 element dependent
["Basic Attack", 0,-1, 1], // baseAtk.
["Random (Elemental) Attack", 0,-2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // ELEMENT ATTACK
["Piercing Attack", 1,-1, 1], // PIERCINGATT. 1 = ignoring def
["Self Destruction", 1,-1, 1], // SELFDESTRUCTION
["Combo Attack", 0,-1, 1], // COMBOATTACK
["Critical Hit", 0,-1, 1.4], // CRITICALSLASH
["Splash Attack", 0, ele_NEUTRAL, 1],
["Dark Cross", 0,ele_DARK, 1.35, 1.7, 2.05, 2.4, 2.75, 3.1, 3.45, 3.8, 4.15, 4.50], // DARKCROSS
["Dark Strike", 2,ele_DARK, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5], // DARKSTRIKE
["Dark Thunder", 2,ele_DARK, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // DARKTHUNDER
["Ranged Attack", 4,-1, 1], // RANGEDATT
//["Break (Armor, Weapon, Shield, Helm)", 0, ele_NEUTRAL, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

["Shadow Property Attack", 0, ele_DARK, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Fire Property Attack", 0, ele_FIRE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Earth Property Attack", 0, ele_EARTH, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Holy Property Attack", 0, ele_HOLY, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Water Property Attack", 0, ele_WATER, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Poison Property Attack", 0, ele_POISON, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Ghost Property Attack", 0, ele_GHOST, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Undead Property Attack", 0, ele_UNDEAD, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
["Wind Property Attack", 0, ele_WIND, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

["Blood Drain", 0, ele_DARK, 1],
["Energy Drain", 0, ele_DARK, 1],
["Exile", 4, ele_NEUTRAL, 1],
["Fatal Wound", 0, ele_NEUTRAL, 1],
["Petrify Attack", 0, ele_EARTH, 1],
["Curse Attack", 0, ele_DARK, 1],
["Poison(ing) Attack", 0, ele_POISON, 1],
["Sleep Attack", 0, ele_NEUTRAL, 1],
["Stun Attack", 0, ele_NEUTRAL, 1],
["Blind Attack", 0, ele_DARK, 1],

["Grand Cross of Darkness", 1,ele_DARK, 1.4, 1.8, 2.2, 2.6, 3, 3.4, 3.8, 4.2, 4.6, 5], // GRANDDARKNESS
["Hell's Judgement", 0, ele_NEUTRAL, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // HELLJUDGEMENT
["Ice Breath", 0, ele_WATER, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // ICEBREATH
["Fire Breath", 0, ele_FIRE, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // FIREBREATH
["Acid Breath", 0, ele_POISON, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // ACIDBREATH
["Thunder Breath", 0, ele_WIND, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // ACIDBREATH
["Pulse Strike", 0,-1, 1, 2, 3, 4, 5], // PULSESTRIKE
["Vampire Gift", 0,ele_NEUTRAL, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5], // VAMPIRE GIFT
["Earthquake (non-ranged)", 1,ele_NEUTRAL, 3*3, 5*3, 6*3, 8*3, 10*3, 12*3, 13*3, 15*3, 16*3, 18*3], // EARTHQUAKE
["Earthquake (ranged)", 5,ele_NEUTRAL, 3*3, 5*3, 6*3, 8*3, 10*3, 12*3, 13*3, 15*3, 16*3, 18*3], // EARTHQUAKE

]

function calcIncomingDamage()
{ // incoming damage - return avg	
	w_HiDam = new Array();
	wBHD = n_B[en_MAXATK];
	var skill_formula = enemySkills[n_A_MobSkill][n_A_MobSkillLV+2];
	var start_w_HiDam = new Array();
	w_HiDam[0] = n_B[en_MINATK] * skill_formula; // Atk (Min)
	w_HiDam[1] = ((n_B[en_MINATK] *5 + wBHD) /6) * skill_formula;
	w_HiDam[2] = ((n_B[en_MINATK] *4 + wBHD *2) /6) * skill_formula;
	w_HiDam[3] = ((n_B[en_MINATK] + wBHD) /2) * skill_formula;
	w_HiDam[4] = ((n_B[en_MINATK] *2 + wBHD *4) /6) * skill_formula;
	w_HiDam[5] = ((n_B[en_MINATK] + wBHD *5) /6) * skill_formula;
	w_HiDam[6] = wBHD * skill_formula;
	if(n_B[en_MINATK] == n_B[en_MAXATK])
		w_HiDam[6] = (wBHD - 1) * skill_formula;
	
	if (n_A_MobSkill == 2) {
		for (var i = 0; i < 7; i++)
			w_HiDam[i] = n_B[en_HP];
	}
	for (var i = 0; i < 7; i++)
		start_w_HiDam[i] = w_HiDam[i];
	
	if ( SkillSearch( skill_AC_DIVINE_PROTECTION ) && (n_B[en_ELEMENT] >= 90 || n_B[en_RACE] === 6 ) )
	{ // Divine Protection
		wBHD = Math.floor( ( 3 + 4 / 100 * n_A_BaseLV ) * SkillSearch( skill_AC_DIVINE_PROTECTION ) );
		
		for ( var i = 0; i <= 6; i++ )
		{
			w_HiDam[i] -= wBHD;
		}
	}
	if ( ( n_B[en_ELEMENT] >= ( ele_EARTH * 10 ) && n_B[en_ELEMENT] <= ( ele_EARTH * 10 + 9 ) ) ||
	     ( n_B[en_ELEMENT] >= ( ele_FIRE * 10) && n_B[en_ELEMENT] <= ( ele_FIRE * 10 + 9 ) ) )
	{ // Fire and Earth Research
		wBHD = 10 * SkillSearch( skill_MEC_RESEARCH_FIRE_EARTH );
		
		for ( var i = 0; i <= 6; i++ )
		{
			w_HiDam[i] -= wBHD;
		}
	}
	if ( n_B[en_RACE] === race_BRUTE || n_B[en_RACE] === race_PLANT || n_B[en_RACE] === race_FISH )
	{ // Ranger Main
		wBHD = 5 * SkillSearch( skill_RAN_RANGER_MAIN );
		
		for ( var i = 0; i <= 6; i++ )
		{
			w_HiDam[i] -= wBHD;
		}
	}
	if ( SkillSearch( skill_TKM_SOLAR_PROTECTION ) )
	{ // Solar Protection
		wBHD = Math.floor((n_A_BaseLV + n_A_LUK + n_A_DEX) / 2);
		
		for ( var i = 0; i <= 6; i++ )
		{
			w_HiDam[i] -= wBHD;
		}
	}
	if (enemySkills[n_A_MobSkill][2] >= 0) {
		wBHD = n_tok[bon_RED_ELE_NEUTRAL + enemySkills[n_A_MobSkill][2]];
		// Forced neutral skills affected by armor enchants
		armor = element[n_A_BodyZokusei * 10 +1][ele_NEUTRAL + enemySkills[n_A_MobSkill][2]] / 100;
		wBHD = 100 - ((100 - wBHD)*armor);
	}
	else if (enemySkills[n_A_MobSkill][2] == -1) {
		wBHD = n_tok[bon_RED_ELE_NEUTRAL];
	} else if (enemySkills[n_A_MobSkill][2] == -2) {
		wBHD = n_tok[bon_RED_ELE_NEUTRAL+Math.floor(n_B[en_ELEMENT]/8)-1]; // + element
	}
	if(wBHD != 0)
	{
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
	}
	
	if(SkillSearch(skill_MA_ENERGY_COAT))
	{
		wBHD = 6 * SkillSearch(skill_MA_ENERGY_COAT);
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
	}

	wBHD = n_tok[bon_RED_RC_FORMLESS+n_B[en_RACE]];
	if(wBHD != 0)
	{
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
	}

	wBHD = n_tok[bon_RED_SIZ_SMALL+n_B[en_SIZE]];
	if(wBHD != 0)
	{
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
	}

	if(n_B[en_BOSS] == 0){
		wBHD = n_tok[bon_RED_NONBOSS];
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
	}

	if(n_B[en_RANGED] || enemySkills[n_A_MobSkill][1] == 4 || enemySkills[n_A_MobSkill][1] == 5){
		wBHD = n_tok[bon_RED_RANGE];
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		
		if(SkillSearch(skill_CR_DEFENDING_AURA)){
			wBHD = 5 + 15 * SkillSearch(skill_CR_DEFENDING_AURA);
			for(i=0;i<=6;i++)
				w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
		}
	}

	if(n_B[en_BOSS]==1){
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * n_tok[bon_RED_BOSS] /100);
		
	}

	if(TimeItemNumSearch(temp_ULFHEDINN))
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * 20 /100);


	wBHD = n_tok[330 + Math.floor(n_B[en_ELEMENT] / 10)]; // New shieldcards ?
	if(wBHD != 0){
		for(i=0;i<=6;i++)
			w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);
	}

	wBHD = StPlusCard(bon_RED_MONSTER+n_B[en_ID]);
	wBHD += StPlusEnchant(bon_RED_MONSTER+n_B[en_ID]);
	wBHD += StPlusCalc2(bon_RED_MONSTER+n_B[en_ID]);
	for(i=0;i<=6;i++)
		w_HiDam[i] -= Math.floor(w_HiDam[i] * wBHD /100);

	// player defense
	if (enemySkills[n_A_MobSkill][1] % 2 == 0)
	{
		for ( var i = 0; i <= 6; i++ )
		{ 
			var _def = n_A_totalDEF;
			// if (enemySkills[n_A_MobSkill][n_A_MobSkillLV+1] == 2) _def = n_A_totalMDEF;
			if (enemySkills[n_A_MobSkill][n_A_MobSkillLV+1] == 2) _def = n_A_MDEF;
			w_HiDam[i] = w_HiDam[i] * defReduction(_def);
			if (enemySkills[n_A_MobSkill][n_A_MobSkillLV+1] == 2) 
				w_HiDam[i] = w_HiDam[i] - n_A_INTMDEF;
			else w_HiDam[i] = w_HiDam[i] - n_A_VITDEF;
		}
	}
	
	if(SkillSearch(skill_MO_STEEL_BODY))
	{
		for(i=0;i<=6;i++)
			w_HiDam[i] = Math.floor(w_HiDam[i] * 10 /100);
	}
	
	for(i=0;i<=6;i++)
	{ // MinDmg 1
		w_HiDam[i]=Max(1,w_HiDam[i]);
	}

	if(battleChantBuffs[pass_V_DAMAGE])
		for(i=0;i<=6;i++)
			w_HiDam[i] = Math.floor(w_HiDam[i] / 2);

	w_HiDam[0] = Math.floor(w_HiDam[0]);
	w_HiDam[6] = Math.floor(w_HiDam[6]);

	
	wBHD=0;
	for(i=0;i<=6;i++)
		wBHD += w_HiDam[i];
	wBHD = Math.round(wBHD / 7);

	var name64 = GetWord(65);
	var wRefStr = "";
	if(PlayerVersusPlayer==0)
	{
		var asm=1;
		if(acolyteBuffs[ksAssumptio])
		{
			asm = 2;
		}
		if(SkillSearch(skill_CR_SHIELD_REFLECT))
		{
			var wRSnum = (10 + 3 * SkillSearch(skill_CR_SHIELD_REFLECT)) * asm;
			var wRef1 = new Array();
			wRef1[0] = Math.floor(wBHD * wRSnum / 100);
			wRef1[1] = Math.floor(w_HiDam[0] * wRSnum / 100);
			wRef1[2] = Math.floor(w_HiDam[6] * wRSnum / 100);
			wRefStr += "<BR><Font color='Blue'><B>"+ wRef1[0] +" ("+ wRef1[1] +"~"+ wRef1[2] +")</B>";
			name64 += "<BR><Font color=Blue><B>Damage Reflected</B></Font>";
		}
		
		if ( EquipNumSearch( 535 ) )
		{ // Valk Mant Reflect
			var wVM = n_A_JobSearch();
			if ( wVM == 1 || wVM == 2 || wVM == 6 )
			{
				n_tok[bon_REFLECT_PHY_DMG] += 5 + n_A_SHOULDER_DEF_PLUS * 2;
			}
		}
		if(n_tok[bon_REFLECT_PHY_DMG])
		{
			var wRef2 = new Array();
			var w = n_tok[bon_REFLECT_PHY_DMG] * asm;
			wRef2[0] = Math.floor(wBHD * w / 100);
			wRef2[1] = Math.floor(w_HiDam[0] * w / 100);
			wRef2[2] = Math.floor(w_HiDam[6] * w / 100);
			wRefStr += "<BR><Font color='Blue'><B>"+ wRef2[0] +" ("+ wRef2[1] +"~"+ wRef2[2] +")</B>";
			name64 += "<BR><Font color=Blue><B>Damage Reflected</B></Font>";
		}
	}
	reduct = "<br/>("+(Math.floor(100 - w_HiDam[0]/start_w_HiDam[0]*100))+"% reduction)"
	myInnerHtml( "nm065", name64, 0 );
	myInnerHtml("B_AveAtk",wBHD +" ("+ w_HiDam[0] +"~"+ w_HiDam[6]+")"+ wRefStr + reduct,0);

	// Include Flee/ PDodge ---------------------------------
	wBHD = Math.round(wBHD *(100-n_A_LUCKY))/100;
	wBHD = Math.round(wBHD *(100-w_FLEE))/100;
	
	if(SkillSearch(skill_CR_GUARD))
		wBHD = Math.round(wBHD * w_AG[SkillSearch(skill_CR_GUARD)])/100;
		
	if(n_A_WeaponType==weapTyp_SWORDII && SkillSearch(skill_LK_PARRYING))
		wBHD = Math.round(wBHD * (80- SkillSearch(skill_LK_PARRYING) *3))/100;
		
	if(SkillSearch(skill_ST_COUNTER_INSTINCT))
		wBHD = Math.round(wBHD * (100- SkillSearch(skill_ST_COUNTER_INSTINCT) *7.5))/100;
		
	myInnerHtml("B_Ave2Atk",wBHD+" Damage",0);
}

function CalcSkillModAdditions( skillMod )
{ // skillmod + x
	// Power Thrust and Maximum Power Thrust
	// if ( SkillSearch( skill_MS_MAXIMUM_POWER_THUST ) )
	// {
		// skillMod += 20 * SkillSearch( skill_MS_MAXIMUM_POWER_THUST );
	// }
	// else
	// {
		// if ( SkillSearch( skill_BS_POWER_THRUST ) )
		// {
			// skillMod += SkillSearch( skill_BS_POWER_THRUST ) * 5;
		// }
		// else if ( otherBuffs[ksPowerThrust] )
		// {
			// skillMod += 5;
			// if (otherBuffs[ksPowerThrust] >= 3 )
			// {
				// skillMod += 5;
			// }
			// if (otherBuffs[ksPowerThrust] >= 5 )
			// {
				// skillMod += 5;
			// }
			
		// }
	// }
	
	// Spear Dynamo
	if ( SkillSearch( skill_LK_SPEAR_DYNAMO ) )
	{
		//skillMod += SkillSearch( skill_LK_SPEAR_DYNAMO ) * 5;
		skillMod += 5+ (SkillSearch( skill_LK_SPEAR_DYNAMO ) * 2);
	}
	/*if ( n_A_ActiveSkill==skill_KN_BRANDISH_SPEAR)
	{
		skillMod += (n_A_STR * 5)/100; 
	}*/
	// Falcon Eyes
	if ( SkillSearch( skill_SN_FALCON_EYES ) )
	{
		skillMod += SkillSearch( skill_SN_FALCON_EYES ) * 2;
	}
	
	// Kihop
	if ( SkillSearch( skill_TK_KIHOP ) )
	{
		skillMod += 2 * SkillSearch( skill_TK_KIHOP ) * SkillSearch( skill_TK_KIHOP_PARTY );
	}
	
	
	
	
	return skillMod;
}
