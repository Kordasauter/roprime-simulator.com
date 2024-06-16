function getBaseDamage(isCrit,offHand) {
	let StatusATK = getStatATK();
	let MasteryATK = getMasteryATK();
	let BuffATK = 0;
	let PATK = 0; //4th class stat

	let groupAMul = groupAMultiplier(isCrit,offHand);
	let groupBMul = groupBMultiplier(isCrit,offHand);

	let PropertyMultiplier = getPropertyMultiplier();

	let baseDamage = new Array();
	if(!offHand || (n_A_WeaponType == weapTyp_KATAR)){
		StatusATK *= 2;
	}
	
	for (let i = 0; i <= 2; i++) {
		if (SkillSearch(skill_TK_MILD_WIND) == 0)
			baseDamage[i] =	Math.floor(StatusATK  + groupAMul[i] + groupBMul[i]) * (1 + PATK / 100) + MasteryATK + BuffATK;
		else
			baseDamage[i] =	Math.floor(StatusATK * (1 + PropertyMultiplier / 100)  +	groupAMul[i] + groupBMul[i]) * (1 + PATK / 100) + MasteryATK + BuffATK;
		baseDamage[i] = Math.floor(baseDamage[i]);
	}
	
	return baseDamage;
}
function getOffHandBonus()
{
	let OffHandBonus = 0;
	OffHandBonus += AS_LEFTHAND_MASTERY.skillFormula(SkillSearch(skill_AS_LEFTHAND_MASTERY)) / 100;
	if (n_A_JOB == cls_KAGOB) OffHandBonus += 0.2;
	if(n_A_WeaponType == weapTyp_KATAR)
	OffHandBonus = (1+(SkillSearch(skill_TH_DOUBLE_ATTACK)*2))/100;
	return OffHandBonus;
}
// function getBaseDamage2() {
// 	let StatusATK = getStatATK();
// 	let MasteryATK = getMasteryATK();
// 	let BuffATK = 0;
// 	let PATK = 0; //4th class stat

// 	let groupAMul = groupAMultiplier2(0);
// 	let groupBMul = groupBMultiplier2(0);
// 	// let groupBMul = [0,0,0];

// 	let PropertyMultiplier = getPropertyMultiplier();

// 	let baseDamage = new Array();
// 	// let leftHandBonus =	AS_LEFTHAND_MASTERY.skillFormula(SkillSearch(skill_AS_LEFTHAND_MASTERY)) / 100;
// 	let leftHandBonus =	1;
// 	if (n_A_JOB == cls_KAGOB) leftHandBonus += 0.2;
// 	console.log("leftHandBonus " + leftHandBonus)

// 	for (let i = 0; i <= 2; i++) {
// 	if (SkillSearch(skill_TK_MILD_WIND) == 0)
// 		baseDamage[i] = Math.floor(StatusATK * 1 + ((groupAMul[i] + groupBMul[i]) * 1)) * (1 + PATK / 100) + MasteryATK + BuffATK;
// 	else
// 		baseDamage[i] = Math.floor(StatusATK * PropertyMultiplier * 1 + groupAMul[i] + groupBMul[i]) * (1 + PATK / 100) + MasteryATK + BuffATK;
// 	//ATK = {(StatusATK × 2) + [(WeaponATK + ExtraATK) × Type2ATKMultiplier] + [(WeaponATK + ExtraATK) × (1 + RaceMultiplier) × (1 + SizeMultiplier) × ...]} × (1 + P.ATK ÷ 100) + MasteryATK + BuffATK
// 	// baseDamage[i] = Math.floor(baseDamage[i] * leftHandBonus);
// 	baseDamage[i] = Math.floor(baseDamage[i] * 1);
// 	}
// 	return baseDamage;
// }
function getBaseDamageNoMastery() {
	let StatusATK = getStatATK();
	let MasteryATK = 0;
	let BuffATK = 0;
	let PATK = 0; //4th class stat

	let groupAMul = groupAMultiplier();
	let groupBMul = groupBMultiplier();

	let baseDamage = new Array();
	for (let i = 0; i <= 2; i++) {
	baseDamage[i] =
		Math.floor(StatusATK * 2 + groupAMul[i] + groupBMul[i]) *
		(1 + PATK / 100) +
		MasteryATK +
		BuffATK;
	//ATK = {(StatusATK × 2) + [(WeaponATK + ExtraATK) × Type2ATKMultiplier] + [(WeaponATK + ExtraATK) × (1 + RaceMultiplier) × (1 + SizeMultiplier) × ...]} × (1 + P.ATK ÷ 100) + MasteryATK + BuffATK
	baseDamage[i] = Math.floor(baseDamage[i]);
	}
	return baseDamage;
}

function getFinalDamage(finalDamage, sk, SkillLevel, isCrit,offHand) {
	for (let i = 0; i <= 2; i++) {
	
	// //off hand adjustment 
	// if(offHand && n_A_WeaponType != weapTyp_KATAR)//only dual wielding !
	// 	finalDamage[i] *= getOffHandBonus()
	
	if (sk.id == skill_AX_SOUL_DESTROYER || sk.id == skill_CR_GRAND_CROSS)
		finalDamage[i] += BK_n_A_MATK[i];
	if (sk.id == skill_CR_GRAND_CROSS) finalDamage[i] /= 2;
	//CriticalMultiplier
	if (isCrit)
	{
		if (sk.id == skill_ALL_BASIC_ATTACK && sk.id == skill_RUN_GIANT_GROWTH && sk.id == skill_TH_DOUBLE_ATTACK)
			finalDamage[i] = Math.floor(finalDamage[i] * (1 + (getCriticalMultiplier() / 100)));
		else
			//for skills, crit multiplier are halved
			finalDamage[i] = Math.floor(finalDamage[i] * (1 + getCriticalMultiplier() / 200));
	}

	//ranged multiplier
	if (sk.range[SkillLevel - 1] > 4 ||	(sk.id == skill_RUN_WIND_CUTTER && PATCH == 2))
	{
		//ranged multiplier
		finalDamage[i] = Math.floor(
		finalDamage[i] * (1 + getRangedMultiplier() / 100)
		);
		//ranged reduction
		//finalDamage[i] = Math.floor(finalDamage[i] * (1 + (getRangedReduction()/100)));
	}
	if (!sk.isSpecialFormula) {
		if(sk.id == skill_SUR_KNUCKLE_ARROW && SkillLevel > 10)//for Knuckle arrow knockback damages
			finalDamage[i] *= Math.floor(sk.skillFormula2(SkillLevel-10)) / 100;
		else
			finalDamage[i] *= Math.floor(sk.skillFormula(SkillLevel)) / 100;
	} else {
		switch (sk.id) {
		case skill_LK_CLASHING_SPIRAL:
			finalDamage[i] =
			(getBaseDamageNoMastery()[i] +
				ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WEIGHT]) *
				0.7 *
				(1 + 0.15 * (2 - n_B[en_SIZE])) +
			getMasteryATK();
			finalDamage[i] *= Math.floor(sk.skillFormula(SkillLevel)) / 100;
			break;
		case skill_SN_FALCON_ASSAULT:
			finalDamage[i] = sk.skillFormula(SkillLevel);
			break;
		case skill_HW_STAVE_CRASHER:
			finalDamage[i] = BK_n_A_MATK[i];
			break;
		case skill_BC_ACID_DEMONSTRATION:
			if (PATCH <= 2) finalDamage = sk.skillFormula(SkillLevel);
			else finalDamage[i] *= Math.floor(sk.skillFormula(SkillLevel)) / 100;
			break;
		case skill_NIN_KILLING_STRIKE:
		case skill_NIN_KILLING_STRIKE_MAX:
			let remainingHP = n_A_MaxHP;
			let numMirrors = parseInt(formElements["SkillSubNum2"].value);
			if (sk.id == skill_NIN_KILLING_STRIKE)
			remainingHP = parseInt(formElements["SkillSubNum"].value);

			finalDamage[i] *= Math.floor(sk.skillFormula(SkillLevel));
			finalDamage[i] = 1 + finalDamage[i] / n_A_MaxHP;
			finalDamage[i] *= remainingHP;
			if (SkillSearch(skill_NIN_MIRROR_IMAGE))
			finalDamage[i] *= (6 + numMirrors) / 5;
			break;
		//skill that deal fix damage an bypass def
		case skill_GS_COING_FLING:
		case skill_KAG_OVERTHROW:
		case skill_SUM_SILVERVINE_ROOT_TWIST:
		case skill_SRIP_SOUL_EXPLOSION:
			finalDamage[0] = sk.skillFormula(SkillLevel);
			finalDamage[1] = finalDamage[0];
			finalDamage[2] = finalDamage[0];
			return finalDamage;
		case skill_RUN_DRAGON_BREATH:
		case skill_RUN_DRAGON_BREATH_WATER:
		case skill_MEC_FAW_SILVER_SNIPER:
		case skill_MIWA_SOUND_OF_DESTRUCTION:
		case skill_GEN_THORN_TRAP:
		case skill_REB_BINDING_TRAP:
		case skill_HU_BLITZ_BEAT:
		case skill_MEC_SELF_DESTRUCTION:
			finalDamage[0] = sk.skillFormula(SkillLevel);
			finalDamage[1] = finalDamage[0];
			finalDamage[2] = finalDamage[0];
			break;
		case skill_HU_LAND_MINE:
		case skill_HU_BLAST_MINE:
		case skill_HU_CLAYMORE_TRAP:
			finalDamage = sk.skillFormula(SkillLevel);
			break;
		case skill_GEN_HELLS_PLANT:
			if (PATCH < 2) {
			finalDamage[0] = sk.skillFormula(SkillLevel);
			finalDamage[1] = finalDamage[0];
			finalDamage[2] = finalDamage[0];
			} else
			finalDamage[i] *= Math.floor(sk.skillFormula(SkillLevel)) / 100;
			break;
		case skill_RAN_FIRING_TRAP:
		case skill_RAN_ICEBOUND_TRAP:
			//ATK 100% + [{(Trap Skill Level x Caster’s DEX) + (INT x 5)} x (1.5 + Caster’s Base Level / 100)] x {(Trap Research Skill Level x 20) / 100 }
			finalDamage[i] *= Math.floor(sk.skillFormula(SkillLevel)) / 100;
			finalDamage[i] +=
			(SkillLevel * n_A_DEX + n_A_INT * 5) *
			(1.5 + n_A_BaseLV / 100) *
			((SkillSearch(skill_RAN_RESEARCH_TRAP) * 20) / 100);
			break;
		case skill_RAN_CLUSTER_BOMB:
			//ATK% + [{(Trap Skill Level x Caster’s DEX) + (INT x 5)} x (1.5 + Caster’s Base Level / 100)] x {(Trap Research Skill Level x 20) / 50 }
			finalDamage[i] *= Math.floor(sk.skillFormula(SkillLevel)) / 100;
			finalDamage[i] +=
			(SkillLevel * n_A_DEX + n_A_INT * 5) *
			(1.5 + n_A_BaseLV / 100) *
			((SkillSearch(skill_RAN_RESEARCH_TRAP) * 20) / 50);
			break;
		case skill_TH_ENVENOM:
			break;
		default:
			console.log("error with the skill formula");
			return "error with the skill formula";
			break;
		}
	}
	
	//Damage Multiplier
	finalDamage[i] = Math.floor(
		finalDamage[i] * (1 + getDamageMultiplier() / 100)
	);
	
	//exclude ice pick effect && Katar offHand
	if((n_tok[bon_ICE_PICK] === 0)/* && !(offHand && n_A_WeaponType == weapTyp_KATAR)*/){
		if ((!sk.bypassDef )) {
			//HardDEF Reduction
			finalDamage[i] = Math.floor(finalDamage[i] * getHardDEFReduction());
			//SoftDEF Reduction
			finalDamage[i] = Math.floor(finalDamage[i] - getSoftDEF(true));
		} else {
			//Hard def used as soft def, should apply def bypass ?
				finalDamage[i] -= n_B[en_HARDDEF];
		}
	}
	
	//BaseCriticalMultiplier
	if (isCrit)
		finalDamage[i] = Math.floor(finalDamage[i] * BaseCriticalMultiplier());

	if (
		Skill[n_A_ActiveSkill].id == skill_MO_GUILLOTINE_FIST ||
		Skill[n_A_ActiveSkill].id == skill_MO_MAX_GUILLOTINE_FIST
	)
		finalDamage[i] += 250 + 150 * SkillLevel;
	
	//Final Damage Multiplier
	finalDamage[i] = Math.floor(
		finalDamage[i] * (1 + getFinalDamageMultiplier(sk.id) / 100)
	);

	//Final Damage Reduction
	finalDamage[i] = Math.floor(
		finalDamage[i] * (getFinalDamageReduction() / 100)
	);

	//flat bonus
	switch (sk.id) {
		case 0: //for basic attacks only
		if (SkillSearch(skill_RUN_ENCHANT_BLADE))
			finalDamage[i] +=
			RUN_ENCHANT_BLADE.skillFormula(
				SkillSearch(skill_RUN_ENCHANT_BLADE)
			) + BK_n_A_MATK[i];
		if (SkillSearch(skill_RUN_GIANT_GROWTH))
			finalDamage[i] += Math.floor(finalDamage[i] * 2.5);
		break;
		case skill_RUN_GIANT_GROWTH: //work as basic attack + GG bonuses
		case skill_TH_DOUBLE_ATTACK: //work as basic attack + DA bonuses
		if (SkillSearch(skill_RUN_GIANT_GROWTH))
			finalDamage[i] += Math.floor(finalDamage[i] * 2.5);
		break;
		case skill_ROY_SHIELD_PRESS:
		finalDamage[i] += n_A_LEFT_DEF_PLUS * n_A_VIT;
		break;
		case skill_SUR_FALLEN_EMPIRE:
		if (PATCH < 2) {
			// let sizePart = (((1 + n_B[en_SIZE]) * 2) + SkillLevel - 1) * n_A_STR;
			let sizePart = ((n_B[en_SIZE] + 1) * 2 + SkillLevel - 1) * n_A_STR;
			let weightPart = n_B[en_LEVEL] * 50;

			// finalDamage[i] += sizePart + weightPart;
			// finalDamage[i] += (sizePart + weightPart) - (Math.floor(n_B[en_HARDDEF]) + getSoftDEF(true));
			// finalDamage[i] += (sizePart + weightPart) - (MonsterOBJ[n_B[en_ID]][en_HARDDEF] + getSoftDEF(true));

			finalDamage[i] += (sizePart + weightPart) * getHardDEFReduction();
			// finalDamage[i] = Math.floor(finalDamage[i] - getSoftDEF(true));
			// finalDamage[i] = Math.floor(finalDamage[i] - n_B[en_HARDDEF]);
		}
		break;
		case skill_SUR_TIGER_CANNON:
		let TCbonus = n_B[en_LEVEL] * 40;
		// TCbonus = Math.floor(TCbonus * getHardDEFReduction());
		if (formElements["SkillSubNum"].checked)
			finalDamage[i] += 500 * SkillLevel;
		else finalDamage[i] += 240 * SkillLevel;
		finalDamage[i] += TCbonus;
		break;
		case skill_SUR_GATE_OF_HELL:
		let remainingHP = parseInt(formElements["SkillSubNum2"].value);
		let remainingSP = parseInt(formElements["SkillSubNum3"].value);
		if (formElements["SkillSubNum"].checked)
			finalDamage[i] +=
			n_A_MaxHP -
			remainingHP +
			remainingSP * (1 + 0.2 * SkillLevel) +
			n_A_BaseLV * 10;
		else
			finalDamage[i] +=
			n_A_MaxHP -
			remainingHP +
			n_A_MaxSP * (1 + 0.2 * SkillLevel) +
			n_A_BaseLV * 40;
		break;
		case skill_SUR_CRESCENT_ELBOW:
		finalDamage[i] +=
			parseInt(formElements["SkillSubNum"].value) * (1 + 0.2 * SkillLevel);
		break;
		default:
		break;
	}
	//aura blade should be in post def damage
	finalDamage[i] += LK_AURA_BLADE.skillFormula(
		SkillSearch(skill_LK_AURA_BLADE)
	);
	//off hand adjustment 
	if(offHand /*&& n_A_WeaponType == weapTyp_KATAR*/)//only katar !
		finalDamage[i] *= getOffHandBonus()
	
	//hit divisibility
	finalDamage[i] =
		Math.floor(finalDamage[i] / eval(sk.hitDivisibility)) *
		eval(sk.hitDivisibility);

	//multi hit
	finalDamage[i] = finalDamage[i] * eval(sk.hitAmount);

	if (sk.id == skill_RUN_GIANT_GROWTH)
		finalDamage[i] *= sk.skillFormula2(1) / 100;

	if (sk.id == skill_SUR_KNUCKLE_ARROW)
		if (formElements["SkillSubNum"].checked && SkillLevel<=10)
		finalDamage[i] += getFinalDamage(
			getBaseDamage(0),
			SUR_KNUCKLE_ARROW,
			SkillLevel+10,
			0
		)[i];
	
	//damage can't go lower than 0
	finalDamage[i] = Max(finalDamage[i], 1);
	}
	if(!isCrit && sk.id == n_A_ActiveSkill)
		w_DMG = finalDamage;

	return finalDamage;
}
function groupAMultiplier(isCrit,offHand) {
	let WeaponATK = getWeaponATK(isCrit);
	if(offHand && n_A_WeaponType != weapTyp_KATAR)
			WeaponATK = getWeaponATK2(isCrit);
	let ExtraATK = getExtraATK();
	let Type2ATKMultiplier = getType2ATKMultiplier();
	// Type2ATKMultiplier in script = bAtkRate
	let PropertyMultiplier = getPropertyMultiplier();

	let groupAMul = new Array();
	for (let i = 0; i <= 2; i++)
	groupAMul[i] = Math.floor(
		(WeaponATK[i] + ExtraATK) *
		(Type2ATKMultiplier / 100) *
		(PropertyMultiplier / 100)
	);
	return groupAMul;
}
function getType2ATKMultiplier() {
	// Type2ATKMultiplier in script = bAtkRate
	let bAtkRate = StPlusCalc2(bon_ATK_MUL) + StPlusEnchant(bon_ATK_MUL);
	if (not_use_card == 0) bAtkRate += StPlusCard(bon_ATK_MUL);
	// Attack Mod is physical mod *

	// Equipment
	// "Thanatos' Dolor Hat"
	if (EquipNumSearch(1637) && n_A_HEAD_DEF_PLUS > 6) bAtkRate += 5;
	//"Officer's Cap"
	if (EquipNumSearch(1682) && n_A_HEAD_DEF_PLUS > 6) bAtkRate += 5;
	//"Dog Cap" || "Feathered Tricorn" || General's Helmet
	if (
	(EquipNumSearch(1702) || EquipNumSearch(1860) || EquipNumSearch(1942)) &&
	n_A_HEAD_DEF_PLUS >= 9
	)
	bAtkRate += 5;
	//Armor of Sixtus the Mighty
	if (EquipNumSearch(2037)) bAtkRate += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
	//Prime only ?
	//Kagero & Oboro Dual Dagger Set
	if (EquipNumSearch(2084))
	//Kagero & Oboro Dual Dagger Set
	bAtkRate += 2 * Math.floor((n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 5);
	//Crimson Rose
	if (EquipNumSearch(2079) && n_A_Weapon_ATKplus >= 7) bAtkRate += 5;

	if (
	EquipNumSearch(2120) || // "Evil Slayer Stabber Dagger"
	EquipNumSearch(2121) || // "Evil Slayer Destroyer Hammer"
	EquipNumSearch(2122) || // "Evil Slayer Piercer Bow"
	EquipNumSearch(2123) || // "Evil Slayer Sword"
	EquipNumSearch(2124)
	) {
	// "Evil Slayer Ripper Katar"
	if (n_A_Weapon_ATKplus >= 7) bAtkRate += 5;
	if (n_A_Weapon_ATKplus >= 9) bAtkRate += 7;
	}
	("Chronocloak of Strength");
	if (EquipNumSearch(2142)) bAtkRate += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);

	if (
	EquipNumSearch(2142) || // "Chronocloak of Strength"
	EquipNumSearch(2143) || // "Chronocloak of Agility"
	EquipNumSearch(2144) || // "Chronocloak of Vitality"
	EquipNumSearch(2146) || // "Chronocloak of Dexterity"
	EquipNumSearch(2147)
	)
	if (n_A_SHOULDER_DEF_PLUS >= 7)
		// "Chronocloak of Luck"
		bAtkRate += 7;

	//YSF01 Plate
	if (EquipNumSearch(2249)) {
	if (n_A_BODY_DEF_PLUS >= 8) bAtkRate += 5;
	if (n_A_BODY_DEF_PLUS >= 11) bAtkRate += 2;
	if (n_A_BODY_DEF_PLUS >= 13) bAtkRate += 4;
	if (SU_STR >= 125) bAtkRate += n_A_BODY_DEF_PLUS;
	}
	//Tengu Shoes
	if (EquipNumSearch(2684))
	bAtkRate += 4 * SkillSearch(skill_SUR_GENTLE_TOUCH_SILENCE);

	//shadows
	// Shadow Taekwon Shield or Shadow Super Novice Shield
	if (EquipNumSearch(1823) || EquipNumSearch(1824)) {
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) bAtkRate += 2;
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) bAtkRate += 3;
	}
	// Shadow Taekwon Gloves
	if (EquipNumSearch(1840)) bAtkRate += n_A_SHADOW_WEAPON_DEF_PLUS;
	//test
	// "Shadow Strongman Gloves"
	if (EquipNumSearch(1660))
	bAtkRate += Math.floor(n_A_SHADOW_WEAPON_DEF_PLUS / 2);
	// "Shadow Strongman Ring"
	if (EquipNumSearch(1661) && n_A_SHADOW_EARRING_DEF_PLUS >= 9) bAtkRate += 1;
	// "Shadow Strongman Pendant"
	if (EquipNumSearch(1662) && n_A_SHADOW_PENDANT_DEF_PLUS >= 9) bAtkRate += 1;
	// "Shadow Strongman Set"
	if (EquipNumSearch(1663)) {
	if (
		n_A_SHADOW_WEAPON_DEF_PLUS +
		n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS >=
		20
	)
		bAtkRate += 1;
	if (
		n_A_SHADOW_WEAPON_DEF_PLUS +
		n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS >=
		25
	)
		bAtkRate += 1;
	}

	//items
	//Archmage Potion
	//no source about what kind of atk (Type2ATKMultiplier or ATKMultiplier)
	if (usableItems[ksArchmagePotion]) bAtkRate += 1;

	//Cards
	//script : bonus2 bWeaponDamageRate,W_BOW,15; Type2ATKMultiplier ???
	if (CardNumSearch(751) && (n_A_JOB == cls_RAN || n_A_JOB == cls_RANt)) {
	//Ranger Cecil Card
	if (n_A_WeaponType == weapTyp_BOW) bAtkRate += 15;
	}

	// Skills
	// else if( SkillSearch( skill_REB_HIT_BARREL ) )
	// {
	// multiplier = (6 + (SkillSearch( skill_REB_HIT_BARREL ) * 2)) * SkillSearch( skill_GS_COIN_FLIP);
	// }

	//Enchants
	if(EnchNumSearch(5586) && EnchNumSearch(862))
		{//Thousand Bow && Hawkeye
			bAtkRate += 10;
		}
	//not 100% sure it belong here
	//rathena say : "final attack bonuses that aren't affected by cards"
	if (
	SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL) &&
	SkillSearch(skill_KAG_GET_ELEMENTAL_SEAL) == ele_EARTH
	)
	bAtkRate += 15 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
	//not 100% sure it belong here
	if (SkillSearch(skill_TK_KIHOP))
	bAtkRate +=
		2 * SkillSearch(skill_TK_KIHOP) * SkillSearch(skill_TK_KIHOP_PARTY);

	return bAtkRate;
}
function groupBMultiplier(isCrit,offHand) {
	let WeaponATK = getWeaponATK(isCrit);
	if(offHand && n_A_WeaponType != weapTyp_KATAR)
			WeaponATK = getWeaponATK2(isCrit);
	let ExtraATK = getExtraATK();
	let RaceMultiplier = getRaceMultiplier();
	let SizeMultiplier = getSizeMultiplier();
	let TargetPropertyMultiplier = getTargetPropertyMultiplier();
	let MonsterMultiplier = getMonsterMultiplier();
	let ATKMultiplier = getATKMultiplier(); // ATKMultiplier in script = bAddClass,Class_All = n_tok[bon_PHY_ATK] in sim
	let PropertyMultiplier = getPropertyMultiplier();
console.log(ATKMultiplier)
	let skillBonus = 0;
	if (
	n_A_ActiveSkill != skill_AS_VENOM_SPLASHER &&
	n_A_ActiveSkill != skill_AX_METEOR_ASSAULT &&
	n_A_ActiveSkill != skill_AS_GRIMTOOTH &&
	n_A_ActiveSkill != skill_AS_VENOM_KNIFE &&
	SkillSearch(skill_AX_ENCHANT_DEADLY_POISON)
	)
	skillBonus += AX_ENCHANT_DEADLY_POISON.skillFormula(
		SkillSearch(skill_AX_ENCHANT_DEADLY_POISON)
	);
	if (
	(SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE) ||
		acolyteBuffs[ksPPChange] > 0) &&
	PATCH >= 2
	) {
	if (SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE))
		skillBonus += SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE);
	else skillBonus += acolyteBuffs[ksPPChange];
	}

	skillBonus += TKM_SOLAR_WRATH.skillFormula(
	SkillSearch(skill_TKM_SOLAR_WRATH)
	);
	skillBonus += TKM_LUNAR_WRATH.skillFormula(
	SkillSearch(skill_TKM_LUNAR_WRATH)
	);
	skillBonus += TKM_STELLAR_WRATH.skillFormula(
	SkillSearch(skill_TKM_STELLAR_WRATH)
	);

	let groupBMul = new Array();
	for (let i = 0; i <= 2; i++)
	groupBMul[i] = Math.floor(
		(WeaponATK[i] + ExtraATK) *
		(1 + RaceMultiplier / 100) *
		(1 + SizeMultiplier / 100) *
		(1 + TargetPropertyMultiplier / 100) *
		(1 + MonsterMultiplier / 100) *
		(1 + ATKMultiplier / 100) *
		(PropertyMultiplier / 100) *
		(1 + skillBonus / 100)
	);
	
	return groupBMul;
}
function getRaceMultiplier() {
	let raceMultiplier =
	StPlusCalc2(bon_DMG_RC_FORMLESS + n_B[en_RACE]) +
	StPlusEnchant(bon_DMG_RC_FORMLESS + n_B[en_RACE]);
	if (not_use_card == 0)
	raceMultiplier += StPlusCard(bon_DMG_RC_FORMLESS + n_B[en_RACE]);

	// Racial bonuses
	if (n_A_Arrow == arrTyp_HOLY && n_B[en_RACE] == race_DEMON)
	raceMultiplier += 5;

	// if( SkillSearch( skill_SA_DRAGONOLOGY ) && n_B[en_RACE]== race_DRAGON)
	// 	raceMultiplier += SkillSearch( skill_SA_DRAGONOLOGY ) * 4;
	raceMultiplier += SA_DRAGONOLOGY.skillFormula(
	SkillSearch(skill_SA_DRAGONOLOGY)
	);

	if (
	EquipNumSearch(1335) &&
	n_A_HEAD_DEF_PLUS >= 5 &&
	n_B[en_RACE] == race_DEMI_HUMAN
	) {
	// Cat Ear Beret
	for (var i = 5; i <= 12; i++) {
		// bonus is applied for levels 5-12
		if (i <= n_A_HEAD_DEF_PLUS) raceMultiplier += 2;
	}
	}
	if (
	EquipNumSearch(2057) &&
	(n_B[en_RACE] == race_DEMI_HUMAN || n_B[en_RACE] == race_BRUTE)
	) {
	if (n_A_Weapon_ATKplus >= 7) raceMultiplier += 15;
	if (n_A_Weapon_ATKplus >= 11) raceMultiplier += 20;
	}
	//Four Mirrors
	if (
	EquipNumSearch(2075) &&
	n_A_Weapon_ATKplus >= 11 &&
	(n_B[en_RACE] == race_UNDEAD || n_B[en_RACE] == race_DEMON)
	)
	raceMultiplier += 20;
	//Demon's Shot
	if (
	EquipNumSearch(2078) &&
	n_A_Weapon_ATKplus >= 11 &&
	(n_B[en_RACE] == race_UNDEAD || n_B[en_RACE] == race_DEMON)
	)
	raceMultiplier += 15;
	// "Headband Beret"
	if (
	EquipNumSearch(1666) &&
	n_A_HEAD_DEF_PLUS >= 6 &&
	n_B[en_RACE] == race_DEMI_HUMAN
	)
	raceMultiplier -= n_A_HEAD_DEF_PLUS - 5;

	//GLORIOUS WEAPONS
	if (
	(EquipNumSearch(1076) ||
		EquipNumSearch(1077) ||
		EquipNumSearch(1081) ||
		EquipNumSearch(1082) ||
		EquipNumSearch(1086) ||
		EquipNumSearch(1088) ||
		EquipNumSearch(1089) ||
		EquipNumSearch(1090) ||
		EquipNumSearch(1091) ||
		EquipNumSearch(1092) ||
		EquipNumSearch(1093) ||
		EquipNumSearch(1094) ||
		EquipNumSearch(1096) ||
		EquipNumSearch(1097) ||
		EquipNumSearch(1100) ||
		EquipNumSearch(1101) ||
		EquipNumSearch(1102) ||
		EquipNumSearch(1103)) &&
	n_A_Weapon_ATKplus >= 6 &&
	n_B[en_RACE] == race_DEMI_HUMAN
	) {
	raceMultiplier += Math.pow(Math.min(10, n_A_Weapon_ATKplus - 4), 2);
	}
	if (
	(EquipNumSearch(1080) || EquipNumSearch(1087) || EquipNumSearch(1098)) &&
	n_A_Weapon_ATKplus >= 6 &&
	n_B[en_RACE] == race_DEMI_HUMAN
	) {
	raceMultiplier += Math.pow(Math.min(10, n_A_Weapon_ATKplus - 3), 2);
	}
	if (
	EquipNumSearch(1637) &&
	(n_B[en_RACE] == race_ANGEL || n_B[en_RACE] == race_DRAGON)
	) {
	// "Thanatos' Dolor Hat"
	if (n_A_HEAD_DEF_PLUS < 13) raceMultiplier += n_A_HEAD_DEF_PLUS / 2;
	else raceMultiplier += 6;
	}
	//Armor of Sixtus the Mighty
	if (
	EquipNumSearch(2037) &&
	n_A_BODY_DEF_PLUS >= 9 &&
	(n_B[en_RACE] == race_BRUTE || n_B[en_RACE] == race_DEMON)
	)
	raceMultiplier += 10;

	//Shadows
	if (EquipNumSearch(1673) && n_B[en_RACE] == race_DRAGON) {
	// "Shadow Dragonslayer Boots"
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) raceMultiplier += 1;
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) raceMultiplier += 3;
	}
	if (EquipNumSearch(1676) && n_B[en_RACE] == race_UNDEAD) {
	// "Shadow Undertaker Boots"
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) raceMultiplier += 1;
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) raceMultiplier += 3;
	}
	if (EquipNumSearch(1679) && n_B[en_RACE] == race_BRUTE) {
	// "Shadow Tamer Boots"
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) raceMultiplier += 1;
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) raceMultiplier += 3;
	}

	//Cards
	// "Piranha Card"
	if (CardNumSearch(711) && n_B[en_RACE] == race_FISH)
	if (n_A_SHOES_DEF_PLUS >= 9) raceMultiplier += 5;
	if (
	(CardNumSearch(742) && (n_A_JOB == cls_SUR || n_A_JOB == cls_SURt)) || //Sura Chen Card
	(CardNumSearch(749) && (n_A_JOB == cls_ROY || n_A_JOB == cls_ROYt))
	)
	//Royal Guard Randel Card
	raceMultiplier += 10;
	if (
	(CardNumSearch(743) && (n_A_JOB == cls_GLT || n_A_JOB == cls_GLTt)) || //Guillotine Cross Eremes Card
	(CardNumSearch(744) && (n_A_JOB == cls_GEN || n_A_JOB == cls_GENt)) || //Geneticist Flamel Card
	(CardNumSearch(746) && (n_A_JOB == cls_MEC || n_A_JOB == cls_MECt)) || //Mechanic Howard Card
	(CardNumSearch(750) && (n_A_JOB == cls_RUN || n_A_JOB == cls_RUNt))
	)
	//Rune Knight Seyren Card
	raceMultiplier += 15;
	//Shadow Chaser Gertie Card
	if (CardNumSearch(745) && (n_A_JOB == cls_SHA || n_A_JOB == cls_SHAt))
	raceMultiplier += 5;

	//enchants
	if (EnchNumSearch(5151)) {
	//Rune of Strength 1
	if (n_A_BODY_DEF_PLUS >= 10) raceMultiplier += 5;
	}
	if (EnchNumSearch(5152)) {
	//Rune of Strength 2
	if (n_A_BODY_DEF_PLUS >= 11) raceMultiplier += 7;
	}
	if (EnchNumSearch(5153)) {
	//Rune of Strength 3
	if (n_A_BODY_DEF_PLUS >= 12) raceMultiplier += 8;
	if (n_A_BODY_DEF_PLUS >= 13) raceMultiplier += 2;
	}

	// if(not_use_card == 1)
	// 	raceMultiplier = 0;
	// else
	// 	raceMultiplier = n_tok[bon_DMG_RC_FORMLESS + n_B[en_RACE]];
	// Race Reduction
	if (monsterBuffs[status_en_buff_Race])
	raceMultiplier -= monsterBuffs[status_en_buff_Race];

	return raceMultiplier;
}
function getSizeMultiplier() {
	let sizeMultiplier =
	StPlusCalc2(bon_DMG_SIZ_SMALL + n_B[en_SIZE]) +
	StPlusEnchant(bon_DMG_SIZ_SMALL + n_B[en_SIZE]);
	if (not_use_card == 0)
	sizeMultiplier += StPlusCard(bon_DMG_SIZ_SMALL + n_B[en_SIZE]);

	//Cards
	if (not_use_card == 0) {
	//Mutant Plaga Card
	if (
		CardNumSearch(847) &&
		n_A_WeaponType == weapTyp_KNUCKLE &&
		n_B[en_SIZE] == siz_LARGE
	) {
		sizeMultiplier += n_A_Weapon_ATKplus;
		if (n_A_Weapon_ATKplus >= 10) sizeMultiplier += 15;
	}
	//Mutant Dolor Card
	if (
		CardNumSearch(849) &&
		n_A_WeaponType == weapTyp_KATAR &&
		n_A_Weapon_ATKplus >= 10
	)
		sizeMultiplier += 15;
	}
	//Equips
	// "RWC Memory Knife or RWC Memory Mace"
	if (EquipNumSearch(1487) || EquipNumSearch(1488)) {
	if (n_A_Weapon_ATKplus >= 6) sizeMultiplier += 5;
	if (n_A_Weapon_ATKplus >= 9) sizeMultiplier += 5;
	}
	//Avenger
	if (EquipNumSearch(2067) && n_A_Weapon_ATKplus >= 11) sizeMultiplier += 15;
	// "Chronocloak of Strength"// "Chronocloak of Agility"
	if (EquipNumSearch(2142) || EquipNumSearch(2143))
	sizeMultiplier += 5 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4);
	//Enchants
	if(EnchNumSearch(5585) && EnchNumSearch(861))
	{//Strong && Bear's Power
		sizeMultiplier += 25;
	}
	//Shadows
	// "Shadow Blacksmith Armor"
	if (EquipNumSearch(1726) && SkillSearch(skill_BS_WEAPON_PERFECTION)) {
	sizeMultiplier += 5;
	if (n_A_SHADOW_BODY_DEF_PLUS > 6)
		sizeMultiplier += n_A_SHADOW_BODY_DEF_PLUS - 6;
	}
	// Tiger Spirit Shadow Gloves
	if (EquipNumSearch(2256)) {
	if (n_A_SHADOW_WEAPON_DEF_PLUS >= 7) sizeMultiplier += 3;
	if (n_A_SHADOW_WEAPON_DEF_PLUS >= 9) sizeMultiplier += 4;
	}
	// Katra's Shadow Ring || Boscard's Shadow Ring
	if (EquipNumSearch(2269) || EquipNumSearch(2278))
	sizeMultiplier += Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2);
	// Rondius' Shadow Ring
	if (EquipNumSearch(2271))
	sizeMultiplier += 2 * Math.floor(n_A_SHADOW_EARRING_DEF_PLUS / 2);

	// Size Reduction
	if (monsterBuffs[status_en_buff_Size]) {
	sizeMultiplier -= monsterBuffs[status_en_buff_Size];
	}

	return sizeMultiplier;
}
function getTargetPropertyMultiplier() {
	let targetPropertyMultipluer =
	StPlusCalc2(bon_DMG_ELE_NEUTRAL + Math.floor(n_B[en_ELEMENT] / 10)) +
	StPlusEnchant(bon_DMG_ELE_NEUTRAL + Math.floor(n_B[en_ELEMENT] / 10));
	// Card Bonuses
	if (not_use_card == 0)
	targetPropertyMultipluer += StPlusCard(
		bon_DMG_ELE_NEUTRAL + Math.floor(n_B[en_ELEMENT] / 10)
	);

	if (
	SkillSearch(skill_HP_BASILICA) &&
	(Math.floor(n_B[en_ELEMENT] / 10) == ele_UNDEAD ||
		Math.floor(n_B[en_ELEMENT] / 10) == ele_DARK)
	)
	targetPropertyMultipluer += 5 * SkillSearch(skill_HP_BASILICA);
	// "Thanatos' Dolor Hat"
	if (
	EquipNumSearch(1637) &&
	(Math.floor(n_B[en_ELEMENT] / 10) == ele_DARK ||
		Math.floor(n_B[en_ELEMENT] / 10) == ele_HOLY)
	) {
	if (n_A_HEAD_DEF_PLUS < 13)
		targetPropertyMultipluer += n_A_HEAD_DEF_PLUS / 2;
	else targetPropertyMultipluer += 6;
	}
	// Wood Goblin
	if (
	CardNumSearch(552) &&
	n_A_BODY_DEF_PLUS >= 9 &&
	(Math.floor(n_B[en_ELEMENT] / 10) == ele_WATER ||
		Math.floor(n_B[en_ELEMENT] / 10) == ele_EARTH)
	)
	targetPropertyMultipluer += 5;
	//Armor of Sixtus (all)
	for (var i = 0; i < 6; i++)
	if (
		EquipNumSearch(2037 + i) &&
		i != 3 &&
		(Math.floor(n_B[en_ELEMENT] / 10) == ele_WIND ||
		Math.floor(n_B[en_ELEMENT] / 10) == ele_EARTH) &&
		n_A_BODY_DEF_PLUS >= 11
	)
		targetPropertyMultipluer += 30;
	//Four Mirrors
	if (
	EquipNumSearch(2075) &&
	n_A_Weapon_ATKplus >= 11 &&
	(Math.floor(n_B[en_ELEMENT] / 10) == ele__FIRE ||
		Math.floor(n_B[en_ELEMENT] / 10) == ele_DARK)
	)
	targetPropertyMultipluer += 15;

	if(EquipNumSearch(2699) && n_A_LEFT_DEF_PLUS >= 11)
	{
		//dark cannon ball
		if((n_A_Arrow == 1) && (Math.floor(n_B[en_ELEMENT] / 10) == ele_HOLY))
			targetPropertyMultipluer += 10;
		//holy cannon ball
		if((n_A_Arrow == 2) && (Math.floor(n_B[en_ELEMENT] / 10) == ele_DARK))
			targetPropertyMultipluer += 10;
	}		

	return targetPropertyMultipluer;
}
function getMonsterMultiplier() {
	let monsterMultiplier = 0;

	// Goblins
	if ((n_B[en_ID] >= 108 && n_B[en_ID] <= 115) || n_B[en_ID] === 319)
	monsterMultiplier = n_tok[bon_DMG_GOBLIN];
	// Kobolds
	if (n_B[en_ID] >= 116 && n_B[en_ID] <= 120)
	monsterMultiplier = n_tok[bon_DMG_KOBOLD];
	// Orc
	if (
	(n_B[en_ID] >= 49 && n_B[en_ID] <= 52) ||
	n_B[en_ID] === 55 ||
	n_B[en_ID] === 221
	)
	monsterMultiplier = n_tok[bon_DMG_ORC];
	// Golem
	if (
	n_B[en_ID] === 106 ||
	n_B[en_ID] === 152 ||
	n_B[en_ID] === 308 ||
	n_B[en_ID] === 32 ||
	n_B[en_ID] === 541
	)
	monsterMultiplier = n_tok[bon_DMG_GOLEM];
	// Scaraba
	if (n_B[en_ID] >= 549 && n_B[en_ID] <= 557)
	monsterMultiplier = n_tok[bon_DMG_SCARABA];

	return monsterMultiplier;
}
function getATKMultiplier() {
	//bonus2 bAddClass,Class_All
	//bonus2 bAddClass,Class_Boss
	//bonus2 bAddClass,Class_Normal
	let ATKMultiplier = StPlusCalc2(bon_PHY_ATK) + StPlusEnchant(bon_PHY_ATK);
	if (not_use_card == 0) ATKMultiplier += StPlusCard(bon_PHY_ATK);
	//Cards
	// Byorgue Card
	if (n_A_JobSearch2() === cls_ROG && CardNumSearch(479)) ATKMultiplier += 10;
	//Champion Card
	if (CardNumSearch(583) && SU_AGI >= 110) ATKMultiplier += 7;
	//Restless Dead Card + Vampire's Familiar [1]
	if (CardNumSearch(828) && EquipNumSearch(2393))
	ATKMultiplier += Math.floor(n_A_BODY_DEF_PLUS / 3);

	//Equipments
	// "Ancient Gold Ornament"
	if (
	(EquipNumSearch(1401) && n_A_JobSearch2() == cls_SWO) ||
	n_A_JobSearch2() == cls_THI ||
	n_A_JobSearch2() == cls_MER
	)
	ATKMultiplier += 8;
	// Tournament Shield with Long Horn/Battle Hook/Hunting Spear
	if (
	EquipNumSearch(992) &&
	(EquipNumSearch(616) || EquipNumSearch(617) || EquipNumSearch(618))
	)
	ATKMultiplier += 4;
	// Glorious Gatling Gun
	if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1101))
	ATKMultiplier += n_A_Weapon_ATKplus;
	// Dress Hat
	if (EquipNumSearch(565) && n_A_HEAD_DEF_PLUS >= 7) ATKMultiplier += 1;
	// Red Wing Hat
	if (EquipNumSearch(1214)) {
	if (n_A_HEAD_DEF_PLUS >= 7) ATKMultiplier += 2;
	if (n_A_HEAD_DEF_PLUS >= 9) ATKMultiplier += 2;
	}
	// Libra Diadem
	if (EquipNumSearch(1342) && n_A_HEAD_DEF_PLUS >= 9) ATKMultiplier += 3;
	//Evil Marching Hat
	if (EquipNumSearch(1514) && n_A_HEAD_DEF_PLUS >= 9) ATKMultiplier += 5;
	//Str Glove
	if (EquipNumSearch(1792) && SU_STR >= 110)
	ATKMultiplier += 1 * EquipNumSearch(1792);
	//Supplement Part Str
	if (EquipNumSearch(2028)) ATKMultiplier += Math.floor(n_A_BODY_DEF_PLUS / 4);
	//Iro only ?
	//Kagero & Oboro Dual Dagger Set
	// if(EquipNumSearch(2084)) //Kagero & Oboro Dual Dagger Set
	// 	ATKMultiplier+= 2 * Math.floor((n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 5);
	//Lindy Hop //Juliette D Rachel
	if (EquipNumSearch(2160) || EquipNumSearch(2179))
	ATKMultiplier += Math.floor(n_A_Weapon_ATKplus / 2);
	// Abusive Robe + Valkyrie Manteau
	if (EquipNumSearch(2212)) ATKMultiplier += n_A_BODY_DEF_PLUS;
	//Korean Judge Hat
	if (EquipNumSearch(2410))
	if (
		n_A_JobSearch() == cls_SWO ||
		n_A_JobSearch() == cls_MER ||
		n_A_JobSearch() == cls_THI ||
		n_A_JobSearch2() == cls_MON ||
		n_A_JOB == cls_TKK ||
		n_A_JOB == cls_TKM
	)
		ATKMultiplier += Math.floor(n_A_HEAD_DEF_PLUS / 2);
	//Demon God's Ring
	if (n_A_Equip[eq_ACCI] == 2449)
	if (
		n_A_card[card_loc_ACCI] == 638 ||
		n_A_card[card_loc_ACCI] == 639 ||
		n_A_card[card_loc_ACCI] == 640
	)
		ATKMultiplier += 5;
	//Demon God's Ring
	if (n_A_Equip[eq_ACCII] == 2449)
	if (
		n_A_card[card_loc_ACCII] == 638 ||
		n_A_card[card_loc_ACCII] == 639 ||
		n_A_card[card_loc_ACCII] == 640
	)
		ATKMultiplier += 5;
	//Shadows
	// // "Shadow Strongman Gloves"
	// if( EquipNumSearch( 1660 ) )
	// 	ATKMultiplier += Math.floor(n_A_SHADOW_WEAPON_DEF_PLUS/2);
	// // "Shadow Strongman Ring"
	// if( EquipNumSearch( 1661 ) && (n_A_SHADOW_EARRING_DEF_PLUS >= 9))
	// 	ATKMultiplier += 1;
	// // "Shadow Strongman Pendant"
	// if( EquipNumSearch( 1662 ) && (n_A_SHADOW_PENDANT_DEF_PLUS >= 9))
	// 	ATKMultiplier += 1;
	// // "Shadow Strongman Set"
	// if( EquipNumSearch( 1663 ) )
	// {
	// 	if((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS) >= 20)
	// 		ATKMultiplier += 1;
	// 	if((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_EARRING_DEF_PLUS + n_A_SHADOW_PENDANT_DEF_PLUS) >= 25)
	// 		ATKMultiplier += 1;
	// }
	// "Shadow Swordsman Gloves"
	if (EquipNumSearch(1712) && n_A_SHADOW_WEAPON_DEF_PLUS >= 7)
	ATKMultiplier += 1;
	// "Shadow Swordsman Set"
	if (
	EquipNumSearch(1715) &&
	n_A_SHADOW_WEAPON_DEF_PLUS +
		n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS >=
		23
	)
	ATKMultiplier += 1;

	if (n_B[en_BOSS] === 1)
		ATKMultiplier += getBossATKMultiplier();
	else
		ATKMultiplier += getNonBossATKMultiplier();

	return ATKMultiplier;
}
function getBossATKMultiplier() {
	//bonus2 bAddClass,Class_Boss
	let bossMultiplier = 0;

	if (SU_STR >= 120 && EquipNumSearch(348)) {
		// Megingjard
		bossMultiplier += 10;
	}
	if (EquipNumSearch(1513)) {
		//Lord of the Dead Helm
		if (n_A_HEAD_DEF_PLUS >= 5) bossMultiplier += n_A_HEAD_DEF_PLUS - 5;
		if (CardNumSearch(31)) bossMultiplier += 5;
	}
	if (EquipNumSearch(1569)) {
		//Warlock King's Crown
		if (CardNumSearch(31)) bossMultiplier += 5;
	}
	if (EquipNumSearch(2078) && n_A_Weapon_ATKplus >= 7) {
		//Demon's Shot
		bossMultiplier += 10;	
	}
		//Black Feather
	if(EquipNumSearch(2695) && (n_A_HEAD_DEF_PLUS >= 10) && (EnchNumSearch(ench_INVISIBILITY + 1)))
		bossMultiplier += 50;

	bossMultiplier +=
	StPlusCalc2(bon_DMG_BOSS) +
	StPlusCard(bon_DMG_BOSS) +
	StPlusEnchant(bon_DMG_BOSS);

	return bossMultiplier;
}
function getNonBossATKMultiplier(){
	//bonus2 bAddClass,Class_Normal
	let nonBossMultiplier = 0;
	// Shadow Ninja Gloves
	if (EquipNumSearch(1839)) {
		if (n_A_SHADOW_WEAPON_DEF_PLUS >= 7) nonBossMultiplier += 3;
		if (n_A_SHADOW_WEAPON_DEF_PLUS >= 9) nonBossMultiplier += 4;
	}
	nonBossMultiplier +=
		StPlusCalc2(bon_DMG_NON_BOSS) +
		StPlusCard(bon_DMG_NON_BOSS) +
		StPlusEnchant(bon_DMG_NON_BOSS);
	return nonBossMultiplier;
}
function getPropertyMultiplier() {
	/* elemental weapon vs element monster */
	n_A_Weapon_element = parseInt(formElements["A_Weapon_element"].value);
	n_A_Weapon2_element = n_A_Weapon_element; // Left hand

	if (n_A_Weapon_element == ele_NEUTRAL) {
	// no endow
	for (
		var j = 0;
		ItemOBJ[n_A_Equip[eq_WEAPON]][j + itm_BONUS_START] != bon_NONE;
		j += 2
	) {
		// Right Hand
		if (bon_ELEMENT == ItemOBJ[n_A_Equip[eq_WEAPON]][j + itm_BONUS_START]) {
		n_A_Weapon_element =
			ItemOBJ[n_A_Equip[eq_WEAPON]][j + itm_BONUS_START + 1];
		}
	}
	for (
		var j = 0;
		ItemOBJ[n_A_Equip[eq_WEAPONII]][j + itm_BONUS_START] != bon_NONE;
		j += 2
	) {
		// LeftHand
		if (bon_ELEMENT == ItemOBJ[n_A_Equip[eq_WEAPONII]][j + itm_BONUS_START]) {
		n_A_Weapon2_element =
			ItemOBJ[n_A_Equip[eq_WEAPONII]][j + itm_BONUS_START + 1];
		}
	}
	// pseudo cards (ele stones)
	if (
		201 <= cardOBJ[n_A_card[card_loc_WEAPON_I]][card_att_ID] &&
		cardOBJ[n_A_card[card_loc_WEAPON_I]][card_att_ID] <= 204
	) {
		n_A_Weapon_element =
		cardOBJ[n_A_card[card_loc_WEAPON_I]][card_att_ID] - 200;
	}
	if (
		201 <= cardOBJ[n_A_card[card_loc_WEAPONII_I]][card_att_ID] &&
		cardOBJ[n_A_card[card_loc_WEAPONII_I]][card_att_ID] <= 204
	) {
		n_A_Weapon2_element =
		cardOBJ[n_A_card[card_loc_WEAPONII_I]][card_att_ID] - 200;
	}
	if (
		n_A_WeaponType == weapTyp_BOW ||
		(weapTyp_HANDGUN <= n_A_WeaponType &&
		n_A_WeaponType <= weapTyp_GRENADE_LAUNCHER)
	) {
		// bows and guns
		n_A_Weapon_element = ArrowOBJ[n_A_Arrow][arr_att_ELEMENT];
	}
	if (n_A_ActiveSkill === skill_GEN_CART_CANNON) {
		n_A_Weapon_element = CannonBallOBJ[n_A_Arrow][arr_att_ELEMENT];
	}
	}
	if (SkillSearch(skill_SHA_INVISIBILITY)) {
	n_A_Weapon_element = ele_GHOST;
	}
	if (
	SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL) == 10 &&
	SkillSearch(skill_KAG_GET_ELEMENTAL_SEAL)
	) {
	n_A_Weapon_element =
		ele_NEUTRAL + SkillSearch(skill_KAG_GET_ELEMENTAL_SEAL);
	}

	if (
	otherBuffs[ksInsignia] == ksFireInsignia &&
	otherBuffs[ksInsigniaLvl] == 2
	)
	n_A_Weapon_element += ele_FIRE;
	if (
	otherBuffs[ksInsignia] == ksWindInsignia &&
	otherBuffs[ksInsigniaLvl] == 2
	)
	n_A_Weapon_element += ele_WIND;
	if (
	otherBuffs[ksInsignia] == ksWaterInsignia &&
	otherBuffs[ksInsigniaLvl] == 2
	)
	n_A_Weapon_element += ele_WATER;
	if (
	otherBuffs[ksInsignia] == ksEarthInsignia &&
	otherBuffs[ksInsigniaLvl] == 2
	)
	n_A_Weapon_element += ele_EARTH;

	BK_Weapon_element = n_A_Weapon_element;

	if (Skill[n_A_ActiveSkill].forcedElement)
	n_A_Weapon_element = Skill[n_A_ActiveSkill].skillElement;
	return element[n_B[en_ELEMENT]][n_A_Weapon_element];
	// return 0;
}
/*TODO*/
function getElementalReduction() {
	weaponElementalMod = element[n_B[en_ELEMENT]][weaponElement];
	if (monsterBuffs[status_en_buff_Elemental]) {
	// Elemental Reduction
	weaponElementalMod -= monsterBuffs[status_en_buff_Elemental];
	}
	return 0;
}

function getStatATK() {
	//in rathena = batk
	let weaponType = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_TYPE];

	//When using a Bow, Gun, Instrument or Whip.
	//StatusATK = (BaseLevel ÷ 4) + (Str ÷ 5) + Dex + (Luk ÷ 3)
	if (
	weaponType == weapTyp_BOW ||
	weaponType == weapTyp_INSTRU ||
	weaponType == weapTyp_WHIP ||
	weaponType == weapTyp_HANDGUN ||
	weaponType == weapTyp_RIFLE ||
	weaponType == weapTyp_SHOTGUN ||
	weaponType == weapTyp_GATLING_GUN ||
	weaponType == weapTyp_GRENADE_LAUNCHER
	)
	return (
		getStatATKBonus(
		Math.floor(n_A_BaseLV / 4 + n_A_STR / 5 + n_A_DEX + n_A_LUK / 3)
		) *
		(element[n_B[en_ELEMENT]][ele_NEUTRAL] / 100)
	);

	//StatusATK = (BaseLevel ÷ 4) + Str + (Dex ÷ 5) + (Luk ÷ 3)
	return (
	getStatATKBonus(
		Math.floor(n_A_BaseLV / 4 + n_A_STR + n_A_DEX / 5 + n_A_LUK / 3)
	) *
	(element[n_B[en_ELEMENT]][ele_NEUTRAL] / 100)
	);
}
function getStatATKBonus(batk) {
	//code from rathena src/map/status.cpp status_calc_batk()
	let tempBatk = 0;
	//those bonuses doen't stack sim will take the higher stat
	// if(sc->getSCE(SC_ATKPOTION))
	// 	batk += sc->getSCE(SC_ATKPOTION)->val1;
	//Rune Strawberry Cake
	if (usableItems[ksRuneStrawberryCake]) tempBatk += 5;
	//Durian
	if (usableItems[ksDurian]) tempBatk += 10;
	//Rainbow Cake
	if (usableItems[ksRainbowCake]) tempBatk += 10;
	//Tasty Pink Ration
	if (usableItems[ksPinkRation]) tempBatk += 15;
	//Box of Resentment
	if (usableItems[ksBoxOfResentment]) tempBatk += 20;
	//Tyr's Blessing
	if (usableItems[ksBlessingOfTyr]) tempBatk += 20;
	//Takoyaki (+20 atk)
	/*TODO*/
	//Distilled Fighting Spirit
	if (usableItems[ksDistilledFightingSpirit]) tempBatk += 30;
	//STR Biscuit Stick (+11~111 atk)
	/*TODO*/
	batk += tempBatk;

	// if(sc->getSCE(SC_BATKFOOD))
	// 	batk += sc->getSCE(SC_BATKFOOD)->val1;
	//Rainbow Cake -> different Rainbow Cake, wr doesn't have this one on prime

	// if(sc->getSCE(SC_FULL_SWING_K))
	// 	batk += sc->getSCE(SC_FULL_SWING_K)->val1;
	//Killer's Potion
	if (usableItems[ksKillerPotion]) batk += 50;

	// if(sc->getSCE(SC_ASH))
	// 	batk -= batk * sc->getSCE(SC_ASH)->val4 / 100;
	// Volcanic Ash, this part of the debuff only affect water monsters

	// if(bl->type == BL_HOM && sc->getSCE(SC_PYROCLASTIC))
	// 	batk += sc->getSCE(SC_PYROCLASTIC)->val2;
	//Pyroplastic skill from Dieter
	/*TODO*/

	// if (sc->getSCE(SC_ANGRIFFS_MODUS))
	// 	batk += sc->getSCE(SC_ANGRIFFS_MODUS)->val2;
	//Angriffs Modus skill from Bayeri
	/*TODO*/

	// if(sc->getSCE(SC_2011RWC_SCROLL))
	// 	batk += 30;
	//not on prime yet

	// if(sc->getSCE(SC_INCATKRATE))
	// 	batk += batk * sc->getSCE(SC_INCATKRATE)->val1/100;
	//not on prime yet
	//Bluefin Tuna Skewer

	// if(sc->getSCE(SC_PROVOKE))
	// 	batk += batk * sc->getSCE(SC_PROVOKE)->val2/100;
	if (SkillSearch(skill_SW_BERSERK))
	batk += SW_BERSERK.skillFormula(SkillSearch(skill_SW_BERSERK));
	else if (otherBuffs[ksProvoke]) batk += 2 + 3 * otherBuffs[ksProvoke];

	// if(sc->getSCE(SC_SKE))
	// 	batk += batk * 3;
	//Eske, only usable on monsters

	// if(sc->getSCE(SC_BLOODLUST))
	// 	batk += batk * sc->getSCE(SC_BLOODLUST)->val2/100;
	//Blood Lust skill from Amistr
	/*TODO*/

	// if(sc->getSCE(SC_JOINTBEAT) && sc->getSCE(SC_JOINTBEAT)->val2&BREAK_WAIST)
	// 	batk -= batk * 25/100;
	//Joint Beat / Vital Strike debuff, should be added for pvp sim
	/*TODO*/

	// if(sc->getSCE(SC_CURSE))
	// 	batk -= batk * 25/100;
	// /* Curse shouldn't effect on this? <- Curse OR Bleeding??
	if (miscEffects[ksCursed]) batk -= (batk * 25) / 100;

	// if(sc->getSCE(SC_BLEEDING))
	// 	batk -= batk * 25 / 100; */
	//bleeding reduce atk ?

	// if(sc->getSCE(SC_FLEET))
	// 	batk += batk * sc->getSCE(SC_FLEET)->val3/100;
	//Flitting skill from Filir
	/*TODO*/

	// if(sc->getSCE(SC__ENERVATION))
	// 	batk -= batk * sc->getSCE(SC__ENERVATION)->val2 / 100;
	/*TODO*/
	//Masquerade-Enervation debuff, should be added for pvp sim

	// if( sc->getSCE(SC_ZANGETSU) )
	// 	batk += sc->getSCE(SC_ZANGETSU)->val2;
	/*TODO*/
	//https://irowiki.org/wiki/Distorted_Crescent

	// if(sc->getSCE(SC_QUEST_BUFF1))
	// 	batk += sc->getSCE(SC_QUEST_BUFF1)->val1;
	// if(sc->getSCE(SC_QUEST_BUFF2))
	// 	batk += sc->getSCE(SC_QUEST_BUFF2)->val1;
	// if(sc->getSCE(SC_QUEST_BUFF3))
	// 	batk += sc->getSCE(SC_QUEST_BUFF3)->val1;

	// if (sc->getSCE(SC_SHRIMP))
	// batk += batk * sc->getSCE(SC_SHRIMP)->val2 / 100;
	if (SkillSearch(skill_SUM_BUNCH_OF_SHRIMP))
	batk +=
		(batk *
		SUM_BUNCH_OF_SHRIMP.skillFormula(
			SkillSearch(skill_SUM_BUNCH_OF_SHRIMP)
		)) /
		100;
	else if (summonerBuffs[ksBunchOfShrimp])
	batk += (batk * SUM_BUNCH_OF_SHRIMP.skillFormula(SkillSearch(1))) / 100;

	// if (sc->getSCE(SC_LOUD))
	// 	batk += 30;
	batk += ME_CRAZY_UPROAR.skillFormula(SkillSearch(skill_ME_CRAZY_UPROAR));
	/*TODO*/
	//add buff for party members

	// if (sc->getSCE(SC_NIBELUNGEN) && sc->getSCE(SC_NIBELUNGEN)->val2 == RINGNBL_ATKRATE)
	// 	batk += batk * 20 / 100;
	if (
	performerBuffs[ksEnsemble] === ksHarmonicLick &&
	performerBuffs[ksEnsembleLevel] > 0
	) {
	// Harmonic Lick
	/*TODO*/
	//the skill give random bonus, should make the user choose the buff with the skill level select
	//for now the skill will only give atk bonus, possible bonuses list :
	// Increases attack speed (reduces delay after attack by 20%)
	// Atk + 20%
	// Matk + 20%
	// MaxHP + 30%
	// MaxSP + 30%
	// All Stat + 15
	// Hit + 50
	// Flee + 50
	batk += (batk * 20) / 100;
	}
	//Star Emperor skill
	// if (sc->getSCE(SC_SUNSTANCE))
	// 	batk += batk * sc->getSCE(SC_SUNSTANCE)->val2 / 100;
	if(SkillSearch(skill_STEM_SOLAR_STANCE))
		batk += batk * (SkillSearch(skill_STEM_SOLAR_STANCE) + 2);
	
	// if (sc->getSCE(SC_ALMIGHTY))
	// 	batk += 30;
	if (usableItems[ksSuperhumanSweets]) batk += 30;

	// if (sc->getSCE(SC_ULTIMATECOOK))
	// 	batk += 30;
	//not on prime yet

	// if(sc->getSCE(SC_LIMIT_POWER_BOOSTER))
	// 	batk += sc->getSCE(SC_LIMIT_POWER_BOOSTER)->val1;
	//Archmage Potion
	if (usableItems[ksArchmagePotion]) batk += 30;

	// if(sc->getSCE(SC_SPARKCANDY))
	// 	batk += 20;
	/*TODO*/
	//add Sparking Candy to buff food

	// if(sc->getSCE(SC_SKF_ATK))
	// 	batk += sc->getSCE(SC_SKF_ATK)->val1;
	//not on prime yet

	return batk;
}

function getWeaponATK(isCrit) {
	//WeaponATK = (BaseWeaponDamage + Variance + StatBonus + RefinementBonus + OverUpgradeBonus) × SizePenalty
	let weaponATK = new Array();
	let ATKOverUpgradeBonus = getWeaponATKOverUpgradeBonus();
	let minATKOverUpgradeBonus = 0;
	if (ATKOverUpgradeBonus) minATKOverUpgradeBonus = 1;

	weaponATK[0] = Math.floor(
	(getBaseWeaponATK() -
		Math.floor(getWeaponATKVariance()) +
		Math.floor(getWeaponATKStatBonus()) +
		getWeaponATKRefinementBonus() +
		minATKOverUpgradeBonus +
		getWeaponATKHighUpgradeBonus()) *
		getSizePenalty()
	);
	if (isCrit)
	weaponATK[0] = Math.floor(
		(getBaseWeaponATK() +
		getWeaponATKVariance() +
		Math.floor(getWeaponATKStatBonus()) +
		getWeaponATKRefinementBonus() +
		minATKOverUpgradeBonus +
		getWeaponATKHighUpgradeBonus()) *
		getSizePenalty()
	);
	weaponATK[2] = Math.floor(
	(getBaseWeaponATK() +
		getWeaponATKVariance() +
		Math.floor(getWeaponATKStatBonus()) +
		getWeaponATKRefinementBonus() +
		ATKOverUpgradeBonus +
		getWeaponATKHighUpgradeBonus()) *
		getSizePenalty()
	);
	weaponATK[1] = Math.floor((weaponATK[0] + weaponATK[2]) / 2);
	if (SkillSearch(skill_BS_POWER_MAXIMIZE))
	weaponATK[0] = weaponATK[1] = weaponATK[2];
	if (SkillSearch(GS_MAGICAL_BULLET)) {
	weaponATK[0] += BK_n_A_MATK[0];
	weaponATK[1] += BK_n_A_MATK[1];
	weaponATK[2] += BK_n_A_MATK[2];
	}

	return weaponATK;
}
function getWeaponATK2(isCrit) {
	//WeaponATK = (BaseWeaponDamage + Variance + StatBonus + RefinementBonus + OverUpgradeBonus) × SizePenalty
	let weaponATK = new Array();
	let ATKOverUpgradeBonus = getWeaponATKOverUpgradeBonus2();
	// let ATKOverUpgradeBonus = 0;
	let minATKOverUpgradeBonus = 0;
	if (ATKOverUpgradeBonus) minATKOverUpgradeBonus = 1;
		weaponATK[0] = Math.floor((getBaseWeaponATK2() - Math.floor( getWeaponATKVariance2()) + Math.floor(getWeaponATKStatBonus2()) + getWeaponATKRefinementBonus2() + minATKOverUpgradeBonus + getWeaponATKHighUpgradeBonus2()) * getSizePenalty2());
	if (isCrit)
		weaponATK[0] = Math.floor((getBaseWeaponATK2() + Math.floor(getWeaponATKVariance2()) + Math.floor(getWeaponATKStatBonus2()) + getWeaponATKRefinementBonus2() + minATKOverUpgradeBonus + getWeaponATKHighUpgradeBonus2()) * getSizePenalty2());
	weaponATK[2] = Math.floor((getBaseWeaponATK2() + Math.floor(getWeaponATKVariance2()) + Math.floor(getWeaponATKStatBonus2())  + getWeaponATKRefinementBonus2() +	ATKOverUpgradeBonus + getWeaponATKHighUpgradeBonus()) *	getSizePenalty2());
	weaponATK[1] = Math.floor((weaponATK[0] + weaponATK[2]) / 2);
	if (SkillSearch(skill_BS_POWER_MAXIMIZE))
		weaponATK[0] = weaponATK[1] = weaponATK[2];
	if (SkillSearch(GS_MAGICAL_BULLET)) {
		weaponATK[0] += BK_n_A_MATK[0];
		weaponATK[1] += BK_n_A_MATK[1];
		weaponATK[2] += BK_n_A_MATK[2];
	}

	return weaponATK;
}
function getBaseWeaponATK() {
	return ItemOBJ[n_A_Equip[eq_WEAPON]][itm_ATK];
}
function getBaseWeaponATK2() {
	return ItemOBJ[n_A_Equip[eq_WEAPONII]][itm_ATK];
}
function getWeaponATKVariance() {
	//Variance = ± 0.05 × WeaponLevel × BaseWeaponDamage
	return 0.05 * getWeaponLevel() * getBaseWeaponATK();
}
function getWeaponATKVariance2() {
	//Variance = ± 0.05 × WeaponLevel × BaseWeaponDamage
	return 0.05 * getWeaponLevel2() * getBaseWeaponATK2();
}
function getWeaponLevel() {
	return ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL];
}
function getWeaponLevel2() {
	return ItemOBJ[n_A_Equip[eq_WEAPONII]][itm_WLVL];
}
function getWeaponATKStatBonus() {
	let weaponType = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_TYPE];
	let isRanged = false;

	if (
	weaponType == weapTyp_BOW ||
	weaponType == weapTyp_INSTRU ||
	weaponType == weapTyp_WHIP ||
	weaponType == weapTyp_HANDGUN ||
	weaponType == weapTyp_RIFLE ||
	weaponType == weapTyp_SHOTGUN ||
	weaponType == weapTyp_GATLING_GUN ||
	weaponType == weapTyp_GRENADE_LAUNCHER
	)
	isRanged = true;

	// StatBonus when using a Bow, Gun, Instrument or Whip.
	// StatBonus = BaseWeaponDamage × Dex ÷ 200
	if (isRanged) return (getBaseWeaponATK() * n_A_DEX) / 200;

	//StatBonus = BaseWeaponDamage × Str ÷ 200
	return (getBaseWeaponATK() * n_A_STR) / 200;
}
function getWeaponATKStatBonus2() {
	let weaponType = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_TYPE];
	let isRanged = false;

	if (
	weaponType == weapTyp_BOW ||
	weaponType == weapTyp_INSTRU ||
	weaponType == weapTyp_WHIP ||
	weaponType == weapTyp_HANDGUN ||
	weaponType == weapTyp_RIFLE ||
	weaponType == weapTyp_SHOTGUN ||
	weaponType == weapTyp_GATLING_GUN ||
	weaponType == weapTyp_GRENADE_LAUNCHER
	)
	isRanged = true;

	// StatBonus when using a Bow, Gun, Instrument or Whip.
	// StatBonus = BaseWeaponDamage × Dex ÷ 200
	if (isRanged) return (getBaseWeaponATK2() * n_A_DEX) / 200;

	//StatBonus = BaseWeaponDamage × Str ÷ 200
	// return (getBaseWeaponATK2() * n_A_STR) / 200;
	return (getBaseWeaponATK2() * n_A_STR) / 200;
}
function getWeaponATKRefinementBonus() {
	let weaponRefineLevel = getWeaponRefineLevel();

	switch (getWeaponLevel()) {
	case 1:
		return weaponRefineLevel * 2;
	case 2:
		return weaponRefineLevel * 3;
	case 3:
		return weaponRefineLevel * 5;
	case 4:
		return weaponRefineLevel * 7;
	default:
		console.log("Error with refine bonus calculation");
		break;
	}

	return 0;
	//https://irowiki.org/wiki/Refinement_System#Weapons
}
function getWeaponATKRefinementBonus2() {
	let weaponRefineLevel = getWeaponRefineLevel2();

	switch (getWeaponLevel2()) {
	case 1:
		return weaponRefineLevel * 2;
	case 2:
		return weaponRefineLevel * 3;
	case 3:
		return weaponRefineLevel * 5;
	case 4:
		return weaponRefineLevel * 7;
	default:
		console.log("Error with refine bonus calculation");
		break;
	}

	return 0;
	//https://irowiki.org/wiki/Refinement_System#Weapons
}
function getWeaponRefineLevel() {
	return n_A_Weapon_ATKplus;
}
function getWeaponRefineLevel2() {
	return n_A_Weapon2_ATKplus;
}
function getWeaponATKOverUpgradeBonus() {
	//https://irowiki.org/wiki/Refinement_System#Weapons
	let weaponRefineLevel = getWeaponRefineLevel();

	switch (getWeaponLevel()) {
	case 1:
		if (weaponRefineLevel > 7) return (weaponRefineLevel - 7) * 3;
		break;
	case 2:
		if (weaponRefineLevel > 6) return (weaponRefineLevel - 6) * 5;
		break;
	case 3:
		if (weaponRefineLevel > 5) return (weaponRefineLevel - 5) * 8;
		break;
	case 4:
		if (weaponRefineLevel > 4) return (weaponRefineLevel - 4) * 14;
		break;
	default:
		console.log("Error with over refine bonus calculation");
		break;
	}

	return 0;
}
function getWeaponATKOverUpgradeBonus2() {
	//https://irowiki.org/wiki/Refinement_System#Weapons
	let weaponRefineLevel = getWeaponRefineLevel2();

	switch (getWeaponLevel2()) {
	case 1:
		if (weaponRefineLevel > 7) return (weaponRefineLevel - 7) * 3;
		break;
	case 2:
		if (weaponRefineLevel > 6) return (weaponRefineLevel - 6) * 5;
		break;
	case 3:
		if (weaponRefineLevel > 5) return (weaponRefineLevel - 5) * 8;
		break;
	case 4:
		if (weaponRefineLevel > 4) return (weaponRefineLevel - 4) * 14;
		break;
	default:
		console.log("Error with over refine bonus calculation");
		break;
	}

	return 0;
}
function getWeaponATKHighUpgradeBonus() {
	//https://irowiki.org/wiki/Refinement_System#Weapons
	let weaponRefineLevel = getWeaponRefineLevel();

	if (weaponRefineLevel == 15 || weaponRefineLevel == 16) {
	switch (getWeaponLevel()) {
		case 1:
		return (weaponRefineLevel - 14) * 16;
		case 2:
		return (weaponRefineLevel - 14) * 32;
		case 3:
		return (weaponRefineLevel - 14) * 32;
		case 4:
		return (weaponRefineLevel - 14) * 48;
		default:
		console.log("Error with high refine bonus calculation");
		break;
	}
	}
	if (weaponRefineLevel > 16) {
	switch (getWeaponLevel()) {
		case 1:
		return (weaponRefineLevel - 16) * 1 + 32;
		case 2:
		return (weaponRefineLevel - 16) * 2 + 64;
		case 3:
		return (weaponRefineLevel - 16) * 2 + 64;
		case 4:
		return (weaponRefineLevel - 16) * 3 + 96;
		default:
		console.log("Error with high refine bonus calculation");
		break;
	}
	}
	return 0;
}
function getWeaponATKHighUpgradeBonus2() {
	//https://irowiki.org/wiki/Refinement_System#Weapons
	let weaponRefineLevel = getWeaponRefineLevel2();

	if (weaponRefineLevel == 15 || weaponRefineLevel == 16) {
	switch (getWeaponLevel2()) {
		case 1:
		return (weaponRefineLevel - 14) * 16;
		case 2:
		return (weaponRefineLevel - 14) * 32;
		case 3:
		return (weaponRefineLevel - 14) * 32;
		case 4:
		return (weaponRefineLevel - 14) * 48;
		default:
		console.log("Error with high refine bonus calculation");
		break;
	}
	}
	if (weaponRefineLevel > 16) {
	switch (getWeaponLevel2()) {
		case 1:
		return (weaponRefineLevel - 16) * 1 + 32;
		case 2:
		return (weaponRefineLevel - 16) * 2 + 64;
		case 3:
		return (weaponRefineLevel - 16) * 2 + 64;
		case 4:
		return (weaponRefineLevel - 16) * 3 + 96;
		default:
		console.log("Error with high refine bonus calculation");
		break;
	}
	}
	return 0;
}
function getSizePenalty() {
	// return 1;
	  //enchant
	  if (EnchNumSearch(5590)) {
		// enchant for Shield of the sun Knight
		return 1;
	  }
	return weaponsize[n_A_WeaponType][n_B[en_SIZE]];
}
function getSizePenalty2() {
	// return 1;
	if (EnchNumSearch(5590)) {
		// enchant for Shield of the sun Knight
		return 1;
	  }
	return weaponsize[n_A_Weapon2Type][n_B[en_SIZE]];
}

function getExtraATK() {
	let EquipATK = getEquipATK();
	let ConsumableATK = getConsumableATK(); //now added in getWeaponATKBonus and getStatATKBonus
	let AmmunitionATK = getAmmunitionATK();
	let PseudoBuffATK = getPseudoBuffATK();

	//ExtraATK = (EquipATK + ConsumableATK + AmmunitionATK + PseudoBuffATK);
	return (
	EquipATK +
	ConsumableATK +
	AmmunitionATK +
	PseudoBuffATK +
	getWeaponATKBonus(0)
	);
}
function getWeaponATKBonus(watk) {
	//code from rathena src/map/status.cpp status_calc_watk()

	// if (sc->getSCE(SC_IMPOSITIO))
	// 	watk += sc->getSCE(SC_IMPOSITIO)->val2;
	watk += PR_IMPOSITIO_MANUS.skillFormula(acolyteBuffs[ksImposito]);

	// if(sc->getSCE(SC_WATKFOOD))
	// 	watk += sc->getSCE(SC_WATKFOOD)->val1;
	//not used in rathena

	// if(sc->getSCE(SC_VOLCANO))
	// 	watk += sc->getSCE(SC_VOLCANO)->val2;
	watk += SA_VOLCANO.skillFormula(otherBuffs[ksElementFieldLvl]);

	// if(sc->getSCE(SC_MERC_ATKUP))
	// 	watk += sc->getSCE(SC_MERC_ATKUP)->val2;
	//no mercenary in prime

	// if(sc->getSCE(SC_WATER_BARRIER))
	// 	watk -= sc->getSCE(SC_WATER_BARRIER)->val2;
	// water barrier skill from Aqua lv.3 , only used for elemental's incomming damage

	// 	if(sc->getSCE(SC_INCATKRATE))
	// 	watk += watk * sc->getSCE(SC_INCATKRATE)->val1/100;
	//not on prime yet
	//Bluefin Tuna Skewer

	// if(sc->getSCE(SC_PROVOKE))
	// 	watk += watk * sc->getSCE(SC_PROVOKE)->val2/100;
	if (SkillSearch(skill_SW_BERSERK))
	watk += SW_BERSERK.skillFormula(SkillSearch(skill_SW_BERSERK));
	else if (otherBuffs[ksProvoke]) watk += 2 + 3 * otherBuffs[ksProvoke];

	// if(sc->getSCE(SC_SKE))
	// 	watk += watk * 3;
	//Eske, only usable on monsters

	// if(sc->getSCE(SC_FLEET))
	// 	watk += watk * sc->getSCE(SC_FLEET)->val3/100;
	//Flitting skill from Filir
	/*TODO*/

	// if(sc->getSCE(SC_CURSE))
	// 	watk -= watk * 25/100;
	if (miscEffects[ksCursed]) watk -= (watk * 25) / 100;
	// if(sc->getSCE(SC_STRIPWEAPON) && bl->type != BL_PC)
	// 	watk -= watk * sc->getSCE(SC_STRIPWEAPON)->val2/100;
	//strip weapon on non player character

	// if(sc->getSCE(SC_FIGHTINGSPIRIT))
	// 	watk += sc->getSCE(SC_FIGHTINGSPIRIT)->val1;
	watk += RUN_FIGHTING_SPIRIT.skillFormula(
	SkillSearch(skill_RUN_FIGHTING_SPIRIT)
	);

	// if (sc->getSCE(SC_SHIELDSPELL_ATK))
	// 	watk += sc->getSCE(SC_SHIELDSPELL_ATK)->val2;
	watk += ROY_SHIELD_SPELL.skillFormula(SkillSearch(skill_ROY_SHIELD_SPELL));

	// if(sc->getSCE(SC_INSPIRATION))
	// 	watk += sc->getSCE(SC_INSPIRATION)->val2;
	watk += ROY_INSPIRATION.skillFormula(SkillSearch(skill_ROY_INSPIRATION));

	// if(sc->getSCE(SC_GT_CHANGE))
	// 	watk += sc->getSCE(SC_GT_CHANGE)->val2;
	watk += SUR_GENTLE_TOUCH_CHANGE.skillFormula(
	SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE)
	);

	// if(sc->getSCE(SC__ENERVATION))
	// 	watk -= watk * sc->getSCE(SC__ENERVATION)->val2 / 100;
	/*TODO*/
	//Masquerade-Enervation debuff, should be added for pvp sim

	// if(sc->getSCE(SC_STRIKING))
	// 	watk += sc->getSCE(SC_STRIKING)->val2;
	watk += SOR_STRIKING.skillFormula(otherBuffs[ksStriking]);

	// if(sc->getSCE(SC_RUSHWINDMILL))
	// 	watk += sc->getSCE(SC_RUSHWINDMILL)->val3;
	if (
	performerBuffs[ksMaestroSolo] === ksWindmillRush &&
	performerBuffs[ksMaestroSoloLevel] > 0
	)
	watk += MIN_WINDMILL.skillFormula(performerBuffs[ksMaestroSoloLevel]);

	// if(sc->getSCE(SC_FIRE_INSIGNIA) && sc->getSCE(SC_FIRE_INSIGNIA)->val1 == 2)
	// 	watk += 50;
	if (
	otherBuffs[ksInsignia] == ksFireInsignia &&
	otherBuffs[ksInsigniaLvl] == 2
	)
	watk += 50;

	// if((sc->getSCE(SC_FIRE_INSIGNIA) && sc->getSCE(SC_FIRE_INSIGNIA)->val1 == 2)
	//	|| (sc->getSCE(SC_WATER_INSIGNIA) && sc->getSCE(SC_WATER_INSIGNIA)->val1 == 2)
	//	|| (sc->getSCE(SC_WIND_INSIGNIA) && sc->getSCE(SC_WIND_INSIGNIA)->val1 == 2)
	//	|| (sc->getSCE(SC_EARTH_INSIGNIA) && sc->getSCE(SC_EARTH_INSIGNIA)->val1 == 2))
	// 	watk += watk * 10 / 100;

	//Every Insignia level 2 increase atk +10%
	if (otherBuffs[ksInsigniaLvl] == 2)
	watk += (getBaseWeaponATK() + buffATK) / 10;

	// if(sc->getSCE(SC_PYROTECHNIC_OPTION))
	// 	watk += sc->getSCE(SC_PYROTECHNIC_OPTION)->val2;
	//Agni lv.2
	// if(sc->getSCE(SC_HEATER_OPTION))
	// 	watk += sc->getSCE(SC_HEATER_OPTION)->val2;
	//Agni lv.3
	// if(sc->getSCE(SC_TROPIC_OPTION))
	// 	watk += sc->getSCE(SC_TROPIC_OPTION)->val2;
	if (
	SkillSearch(skill_SOR_SUMMON_TYPE) == 0 &&
	SkillSearch(skill_SOR_SUMMON_LEVEL) > 0 &&
	SkillSearch(skill_SOR_SPIRIT_CONTROL) == 1
	)
	watk += 60 * SkillSearch(skill_SOR_SUMMON_LEVEL);
	// if( sc && sc->getSCE(SC_TIDAL_WEAPON) )
	// 	watk += watk * sc->getSCE(SC_TIDAL_WEAPON)->val2 / 100;
	//Aqua lv.3
	// if(bl->type == BL_PC && sc->getSCE(SC_PYROCLASTIC))
	// 	watk += sc->getSCE(SC_PYROCLASTIC)->val2;
	//Pyroplastic skill from Dieter
	/*TODO*/
	// if(sc->getSCE(SC_ANGRIFFS_MODUS))
	// 	watk += watk * sc->getSCE(SC_ANGRIFFS_MODUS)->val2/100;
	//Angriffs Modus skill from Bayeri
	/*TODO*/
	// if(sc->getSCE(SC_ODINS_POWER))
	// 	watk += 40 + 30 * sc->getSCE(SC_ODINS_POWER)->val1;

	// if (sc->getSCE(SC_FLASHCOMBO))
	// 	watk += sc->getSCE(SC_FLASHCOMBO)->val2;
	if (n_A_ActiveSkill == skill_SUR_FLASH_COMBO)
	watk += 20 + 20 * n_A_ActiveSkillLV;
	// if (sc->getSCE(SC_CATNIPPOWDER))
	// 	watk -= watk * sc->getSCE(SC_CATNIPPOWDER)->val2 / 100;
	/*TODO*/
	//catnip powder debuff
	// if (sc->getSCE(SC_CHATTERING))
	// 	watk += sc->getSCE(SC_CHATTERING)->val2;
	watk += SUM_CHATTERING.skillFormula(SkillSearch(skill_SUM_CHATTERING));
	//Star Emperor Skill
	// if (sc->getSCE(SC_SUNSTANCE))
	// 	watk += watk * sc->getSCE(SC_SUNSTANCE)->val2 / 100;
	if(SkillSearch(skill_STEM_SOLAR_STANCE))
		watk += watk * (SkillSearch(skill_STEM_SOLAR_STANCE) + 2);
	
	// if (sc->getSCE(SC_SOULFALCON))
	// 	watk += sc->getSCE(SC_SOULFALCON)->val2;
	//Soul Reaper Skill
	// if (sc->getSCE(SC_PACKING_ENVELOPE1))
	// 	watk += sc->getSCE(SC_PACKING_ENVELOPE1)->val1;
	/*TODO*/
	//Packing Enveloppe from verus, should be added to the sim
	// if (sc->getSCE(SC_POWERFUL_FAITH))
	// 	watk += sc->getSCE(SC_POWERFUL_FAITH)->val2;
	//Inquisitor skill
	// if (sc->getSCE(SC_GUARD_STANCE))
	// 	watk -= sc->getSCE(SC_GUARD_STANCE)->val3;
	//Imperial Guard SKill

	return watk;
}
function getEquipATK() {
	equipmentAttack = 0;

	// Get attack from
	equipmentAttack = n_tok[bon_ATK]; // cur eqAtk

	// Cards
	if (CardNumSearch(515) && n_A_Weapon_ATKplus >= 12)
	// Tendrillion
	equipmentAttack += 35;
	if (SU_STR >= 80 && CardNumSearch(267)) {
	// GWhisper
	equipmentAttack += 20;
	}
	if (CardNumSearch(492)) {
	// Ifrit
	equipmentAttack += Math.floor(n_A_JobLV / 10) * CardNumSearch(492);
	}
	if (CardNumSearch(542)) {
	// Wakwak Card
	equipmentAttack += Math.floor(SU_STR / 10) * 5;
	}
	if (CardNumSearch(637)) {
	// Payon Soldier Card
	if (n_A_WeaponType == weapTyp_2HSPEAR || n_A_WeaponType == weapTyp_SPEAR) {
		if (n_A_Weapon_ATKplus >= 10) equipmentAttack += 20;
		if (n_A_Weapon_ATKplus >= 14) equipmentAttack += 20;
	}
	}
	// Equipment
	if (SU_STR >= 95 && EquipNumSearch(621)) {
	//DoomSlayer
	equipmentAttack += 340;
	}
	if (SU_STR >= 44 && EquipNumSearch(625)) {
	// Holgrens Refining Hammer
	equipmentAttack += 44;
	}
	if (SU_AGI >= 90 && EquipNumSearch(442)) {
	// Rogue's Treasure
	equipmentAttack += 10 * EquipNumSearch(442);
	}
	if (SU_STR >= 95 && EquipNumSearch(1160)) {
	// Krasnaya
	equipmentAttack += 20;
	}
	if (SU_LUK >= 90 && EquipNumSearch(1164)) {
	// Berchel Axe
	equipmentAttack += 20;
	}
	if (EquipNumSearch(676)) {
	// Mythical Lion Mask
	equipmentAttack += n_A_HEAD_DEF_PLUS * 2;
	}
	if (EquipNumSearch(1120) && n_A_JobSearch() === cls_ARC) {
	// Archer Figurine
	equipmentAttack += 10 * EquipNumSearch(1120);
	}
	if (EquipNumSearch(1165)) {
	// Veteran Axe
	equipmentAttack += 10 * SkillSearch(311);
	}
	if (SU_STR >= 120 && EquipNumSearch(1253)) {
	// Rune Circlet
	equipmentAttack += 10;
	}
	if (SU_STR >= 120 && EquipNumSearch(1256)) {
	// Driver Band
	equipmentAttack += 10;
	}
	if (SU_AGI >= 120 && EquipNumSearch(1257)) {
	// Shadow Crown
	equipmentAttack += 10;
	}
	if (SU_STR >= 120 && EquipNumSearch(1259)) {
	// Midas Whispers
	equipmentAttack += 5;
	}
	if (SU_STR >= 120 && EquipNumSearch(1261)) {
	// Burning Spirit
	equipmentAttack += 10;
	}
	if (SU_AGI >= 120 && EquipNumSearch(1262)) {
	// Silent Enforcer
	equipmentAttack += 10;
	}
	if (EquipNumSearch(1218) && n_A_HEAD_DEF_PLUS >= 5) {
	// Moon Rabbit Hat
	equipmentAttack += n_A_HEAD_DEF_PLUS - 4;
	}
	if (EquipNumSearch(1336) && n_A_HEAD_DEF_PLUS >= 7) {
	// Aquarius Diadem
	equipmentAttack += 15;
	}
	if (EquipNumSearch(1345) && n_A_HEAD_DEF_PLUS >= 7) {
	// Scorpio Diadem
	equipmentAttack += 5;
	}
	if (EquipNumSearch(1347) && n_A_HEAD_DEF_PLUS >= 7) {
	// Aquarius Crown
	equipmentAttack += 15;
	}
	if (EquipNumSearch(1349) && n_A_HEAD_DEF_PLUS >= 7) {
	// Cancer Crown
	equipmentAttack += 15;
	}
	if (EquipNumSearch(1355) && n_A_HEAD_DEF_PLUS >= 10) {
	// Scorpio Crown
	equipmentAttack += 5;
	}
	if (EquipNumSearch(1365) && n_A_HEAD_DEF_PLUS >= 7) {
	// Gemini Crown
	equipmentAttack += 15;
	}
	if (SU_STR >= 120 && EquipNumSearch(1386)) {
	// Gigantic Lance
	equipmentAttack += 300;
	}
	if (EquipNumSearch(953) || EquipNumSearch(1499)) {
	// Giant Majestic Goat
	equipmentAttack += Math.floor((n_A_JobLV / 7) * 2);
	}
	if (EquipNumSearch(1464)) {
	//Heroic Backpack
	if (n_A_SHOULDER_DEF_PLUS >= 7 && SU_STR >= 90) {
		equipmentAttack += 20;
	}
	if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_STR >= 90) {
		equipmentAttack += 10;
	}
	}
	if (EquipNumSearch(1639)) {
	//Sleepy Little Tiger(transformation mode)
	equipmentAttack += 25 * n_A_HEAD_DEF_PLUS;
	}
	if (EquipNumSearch(1583)) {
	//Golden Angel Wing
	if (SU_STR >= 90) {
		equipmentAttack += 15;
	}
	if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_STR >= 90) {
		equipmentAttack += 15;
	}
	}
	if (EquipNumSearch(1584)) {
	//Golden Angel HAirband
	if (SU_STR >= 70) {
		equipmentAttack += 5;
	}
	if (n_A_HEAD_DEF_PLUS >= 7 && SU_STR >= 70) {
		equipmentAttack += 10;
	}
	}
	if (EquipNumSearch(1487)) {
	// "RWC Memory Knife"
	equipmentAttack += Math.floor(n_A_Weapon_ATKplus / 3) * 20;
	}
	if (EquipNumSearch(1488)) {
	// "RWC Memory Mace"
	equipmentAttack += Math.floor(n_A_Weapon_ATKplus / 3) * 30;
	}
	if (EquipNumSearch(1490)) {
	// "RWC Memory Knife + RWC 2012 Ring"
	equipmentAttack += n_A_Weapon_ATKplus * 10;
	}
	if (EquipNumSearch(1492)) {
	// "RWC Memory Mace + RWC 2012 Ring"
	equipmentAttack += n_A_Weapon_ATKplus * 5;
	}
	if (EquipNumSearch(1545)) {
	//Fallen Angel Wing
	equipmentAttack += Math.floor(SU_STR / 20);
	}
	if (EquipNumSearch(1682)) {
	//"Officer's Cap"
	equipmentAttack += Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	if (EquipNumSearch(1683)) {
	//"Glove Of Shura"
	if (SU_STR >= 120) equipmentAttack += 30;
	}
	if (EquipNumSearch(1702)) {
	//"Dog Cap"
	equipmentAttack += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	if (n_A_HEAD_DEF_PLUS >= 7) equipmentAttack += 30;
	}
	if (
	EquipNumSearch(1703) ||
	EquipNumSearch(1704) ||
	EquipNumSearch(1705) ||
	EquipNumSearch(1706) ||
	EquipNumSearch(1707)
	) {
	//"Probation Gatling Gun" "Probation Grenade Launcher" "Probation Revolver" "Probation Rifle" "Probation Shotgun "
	if (n_A_BaseLV <= 160) {
		equipmentAttack += 6 * Math.floor(n_A_BaseLV / 10);
	} else {
		equipmentAttack += 96;
	}
	}
	if (EquipNumSearch(1776)) {
	// Nab Hood
	equipmentAttack += n_A_SHOULDER_DEF_PLUS * 2;
	}
	if (EquipNumSearch(1779)) {
	// Nab Set
	if (SU_STR >= 120) equipmentAttack += 30;
	}
	if (EquipNumSearch(1780)) {
	// Black Wing Suits
	equipmentAttack += n_A_BODY_DEF_PLUS * 3;
	}
	if (EquipNumSearch(1792)) {
	//Str Glove
	equipmentAttack += Math.floor(SU_STR / 10) * EquipNumSearch(1792);
	}
	if (EquipNumSearch(1822)) {
	//Shadow Ninja Shield
	equipmentAttack += SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE) * 3;
	}
	if (
	EquipNumSearch(1826) || // "Shadow Runeknight Gloves"
	EquipNumSearch(1827) || // "Shadow Royalguard Gloves"
	EquipNumSearch(1828) || // "Shadow Mechanic Gloves"
	EquipNumSearch(1829) || // "Shadow Genetic Gloves"
	EquipNumSearch(1830) || // "Shadow Archbishop Gloves"
	EquipNumSearch(1831) || // "Shadow Sura Gloves"
	EquipNumSearch(1832) || // "Shadow Guillotine Gloves"
	EquipNumSearch(1833) || // "Shadow Shadowchaser Gloves"
	EquipNumSearch(1834) || // "Shadow Warlock Gloves"
	EquipNumSearch(1835) || // "Shadow Sorcerer Gloves"
	EquipNumSearch(1836) || // "Shadow Ranger Gloves"
	EquipNumSearch(1837) || // "Shadow Minstrel Gloves"
	EquipNumSearch(1838) || // "Shadow Wanderer Gloves"
	EquipNumSearch(1839) || // "Shadow Ninja Gloves"
	EquipNumSearch(1840) || // "Shadow Taekwon Gloves"
	EquipNumSearch(1841) || // "Shadow Super Novice Gloves"
	EquipNumSearch(1842)
	) {
	// "Shadow Gunslinger Gloves"
	//
	equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if (EquipNumSearch(1860)) {
	//"Feathered Tricorn"
	equipmentAttack += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	if (EquipNumSearch(1874)) {
	//"Fine Foxtail Replica"
	if (n_A_Weapon_ATKplus >= 7) {
		equipmentAttack += 78;
	}
	if (n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10) {
		equipmentAttack += 39 * (n_A_Weapon_ATKplus - 7);
	}
	if (n_A_Weapon_ATKplus > 10) {
		equipmentAttack += 39 * 3;
	}
	}
	if (EquipNumSearch(1880)) {
	//"Elaborate Foxtail Replica"
	if (n_A_Weapon_ATKplus >= 7) {
		equipmentAttack += 96;
	}
	if (n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10) {
		equipmentAttack += 48 * (n_A_Weapon_ATKplus - 7);
	}
	if (n_A_Weapon_ATKplus > 10) {
		equipmentAttack += 48 * 3;
	}
	}
	if (EquipNumSearch(1881)) {
	//"Elaborate Yellow Foxtail Replica"
	if (n_A_Weapon_ATKplus >= 7) {
		equipmentAttack += 108;
	}
	if (n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10) {
		equipmentAttack += 54 * (n_A_Weapon_ATKplus - 7);
	}
	if (n_A_Weapon_ATKplus > 10) {
		equipmentAttack += 54 * 3;
	}
	}
	if (EquipNumSearch(1883)) {
	//"Magical Foxtail Staff"
	if (n_A_Weapon_ATKplus >= 7) {
		equipmentAttack += 48;
	}
	if (n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10) {
		equipmentAttack += 24 * (n_A_Weapon_ATKplus - 7);
	}
	if (n_A_Weapon_ATKplus > 10) {
		equipmentAttack += 24 * 3;
	}
	}
	if (EquipNumSearch(1884)) {
	//"Magical Yellow Foxtail Staff"
	if (n_A_Weapon_ATKplus >= 7) {
		equipmentAttack += 56;
	}
	if (n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10) {
		equipmentAttack += 28 * (n_A_Weapon_ATKplus - 7);
	}
	if (n_A_Weapon_ATKplus > 10) {
		equipmentAttack += 28 * 3;
	}
	}
	if (EquipNumSearch(1877)) {
	//"Wondrous Foxtail Staff"
	if (n_A_Weapon_ATKplus >= 7) {
		equipmentAttack += 40;
	}
	if (n_A_Weapon_ATKplus >= 8 && n_A_Weapon_ATKplus <= 10) {
		equipmentAttack += 20 * (n_A_Weapon_ATKplus - 7);
	}
	if (n_A_Weapon_ATKplus > 10) {
		equipmentAttack += 20 * 3;
	}
	}
	if (EquipNumSearch(1919)) {
	//"Foxtail Ring"
	if (n_A_BaseLV <= 50) {
		equipmentAttack += 2 * Math.floor(n_A_BaseLV / 5);
	} else {
		equipmentAttack += 20;
	}
	}
	if (EquipNumSearch(1942)) {
	//"General's Helmet"
	equipmentAttack += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	if (EquipNumSearch(1944)) {
	//General's Helmet + Zweihander
	equipmentAttack += 20 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if (EquipNumSearch(2197) || EquipNumSearch(1952)) {
	//Str Boots
	equipmentAttack += 7 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	if (SU_STR >= 120) {
		equipmentAttack += 50;
	}
	}
	if (EquipNumSearch(1946)) {
	//Str Boots slot
	equipmentAttack += 5 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	if (SU_STR >= 120) {
		equipmentAttack += 30;
	}
	}
	if (EquipNumSearch(2019)) {
	//Pile Bunker P
	equipmentAttack += 5 * n_A_Weapon_ATKplus;
	}
	if (EquipNumSearch(2021)) {
	//Gigant Blade
	if (SU_STR <= 110) equipmentAttack -= 250;
	}
	if (
	EquipNumSearch(2050) || //Runic Katana
	EquipNumSearch(2052) || //Trident of Undine
	EquipNumSearch(2054) || //Bow of Narcissus
	EquipNumSearch(2057) || //Hand of Death
	EquipNumSearch(2058) || //Steel Flower
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
	EquipNumSearch(2082)
	) {
	//Guttling Gun
	equipmentAttack += 10 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if (EquipNumSearch(2084)) {
	//Kagero & Oboro Dual Dagger Set
	equipmentAttack +=
		10 * Math.floor((n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus) / 3);
	}
	if (EquipNumSearch(2081)) {
	//Big Game Trophy
	equipmentAttack += 15 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if (
	EquipNumSearch(2142) || // "Chronocloak of Strength"
	EquipNumSearch(2143) || // "Chronocloak of Agility"
	EquipNumSearch(2144) || // "Chronocloak of Vitality"
	EquipNumSearch(2146)
	) {
	// "Chronocloak of Dexterity"
	equipmentAttack += 10 * Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	}
	if (
	EquipNumSearch(2164) || // Vicious Mind Revolver
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
	EquipNumSearch(2196)
	) {
	// Crimson Lance
	if (n_A_Weapon_ATKplus <= 15) {
		equipmentAttack += n_A_Weapon_ATKplus * n_A_Weapon_ATKplus;
	} else {
		equipmentAttack += 15 * 15;
	}
	}
	if (
	EquipNumSearch(2182) || // Crimson Revolver
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
	EquipNumSearch(2196)
	) {
	// Crimson Lance
	if (n_A_BaseLV >= 70) {
		equipmentAttack += Math.floor((n_A_BaseLV - 70) / 10) * 5;
	}
	}
	if (
	EquipNumSearch(2215) || // Old Rune Circlet [1]
	EquipNumSearch(2216) || // Old Mitra [1]
	EquipNumSearch(2217) || // Old Driver Band (Red) [1]
	EquipNumSearch(2218) || // Old Driver Band (Yellow) [1]
	EquipNumSearch(2219) || // Old Shadow Handicraft [1]
	EquipNumSearch(2221) || // Old Midas Whisper [1]
	EquipNumSearch(2223) || // Old Blazing Soul [1]
	EquipNumSearch(2224) || // Old Wind Whisper [1]
	EquipNumSearch(2228)
	) {
	// Old Casket of Protection [1]
	equipmentAttack += n_A_HEAD_DEF_PLUS * 4;
	}
	if (EquipNumSearch(2229)) {
	// Fallen Warrior Manteau
	equipmentAttack += 2 * n_A_SHOULDER_DEF_PLUS;
	if (SU_STR >= 90) equipmentAttack += 10;
	}
	if (n_A_Equip[eq_WEAPON] == 2247) {
	// Sealed Maximum Sword [2]
	if (n_A_Weapon_ATKplus >= 7) {
		equipmentAttack += 65;
	}
	if (n_A_Weapon_ATKplus >= 10) {
		equipmentAttack += 45;
	}
	}
	if (n_A_Equip[eq_WEAPONII] == 2247) {
	// Sealed Maximum Sword [2]
	if (n_A_Weapon2_ATKplus >= 7) {
		equipmentAttack += 65;
	}
	if (n_A_Weapon2_ATKplus >= 10) {
		equipmentAttack += 45;
	}
	}
	if (EquipNumSearch(2250)) {
	//YSF01 Manteau
	if (n_A_SHOULDER_DEF_PLUS >= 8) equipmentAttack += 20;
	}

	if (EquipNumSearch(2315)) {
	//Dog Cap + Thanatos Katar
	equipmentAttack += 20 * Math.floor(n_A_Weapon_ATKplus / 2);
	}

	if (EquipNumSearch(2639)) {
	//Black Ribbon
	equipmentAttack += 2 * Math.floor(SU_AGI / 5);
	}

	if (EquipNumSearch(2641)) {
	//Toy Ring
	equipmentAttack +=
		10 *
		Math.floor(SkillSearch(skill_SW_SWORD_MASTERY) / 2) *
		EquipNumSearch(2641);
	}
	// if(EquipNumSearch(2688))
	// {//Emerald Ring
	// 	equipmentAttack += 20 * Math.floor(SkillSearch(skill_AR_DOUBLE_STRAFE));
	// }

	//Cards
	if (CardNumSearch(557)) {
	//Faithful Manager Card
	if (n_A_WeaponType == weapTyp_BOOK) {
		if (n_A_Weapon_ATKplus >= 10) equipmentAttack += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
		if (n_A_Weapon_ATKplus >= 14) equipmentAttack += 20 * CardNumSearch(557); // Apply for each Faithful Manager Card
	}
	}
	if (CardNumSearch(589)) {
	//Big Eggring Card
	if (SU_STR <= 50) {
		equipmentAttack -= 5 * Math.floor(SU_STR / 10);
	} else {
		equipmentAttack -= 25;
	}
	}
	if (CardNumSearch(691)) {
	//Gigantes Card
	if (SU_AGI >= 120) equipmentAttack += 20 * CardNumSearch(691);
	}
	if (CardNumSearch(703)) {
	//General Daehyun Card
	if (n_A_WeaponType == weapTyp_SWORD || n_A_WeaponType == weapTyp_2HSWORD)
		equipmentAttack += 100 * CardNumSearch(703);
	}

	for (var i = 0; i < 8; i++) {
	if (n_A_card[card_loc_WEAPON_I + i] == 775) {
		//Cowraiders Class 3 Card
		if (i < 4) {
		if (n_A_WeaponType == weapTyp_DAGGER) {
			if (n_A_Weapon_ATKplus >= 10) equipmentAttack += 20;
			if (n_A_Weapon_ATKplus >= 14) equipmentAttack += 20;
		}
		} else {
		if (n_A_Weapon2Type == weapTyp_DAGGER) {
			if (n_A_Weapon2_ATKplus >= 10) equipmentAttack += 20;
			if (n_A_Weapon2_ATKplus >= 14) equipmentAttack += 20;
		}
		}
	}
	}
	if (CardNumSearch(812) && EquipNumSearch(121)) {
	//Resentful Munak Card + Girl's Diary
	equipmentAttack += 100;
	}
	if (CardNumSearch(847)) {
	//Mutant Plaga Card
	if (n_A_WeaponType == weapTyp_KNUCKLE) {
		equipmentAttack += 15;
	}
	}
	if (CardNumSearch(849)) {
	//Mutant Dolor Card
	if (n_A_WeaponType == weapTyp_KATAR) {
		equipmentAttack += 15;
	}
	}
	if (CardNumSearch(893)) {
	//Ominous Assaulter Card
	if (
		n_A_WeaponType == weapTyp_WHIP ||
		n_A_WeaponType == weapTyp_INSTRUMENT ||
		n_A_WeaponType == weapTyp_BOOK ||
		n_A_WeaponType == weapTyp_SWORDII ||
		n_A_WeaponType == weapTyp_SPEARII
	) {
		equipmentAttack += 3 * n_A_Weapon_ATKplus * CardNumSearch(893);
	}
	}

	//shadows
	if (EquipNumSearch(1661)) {
	// "Shadow Strongman Ring"
	equipmentAttack += n_A_SHADOW_EARRING_DEF_PLUS;
	}
	if (EquipNumSearch(1662)) {
	// "Shadow Strongman Ring"
	equipmentAttack += n_A_SHADOW_PENDANT_DEF_PLUS;
	}
	if (EquipNumSearch(1729)) {
	// "Shadow Alchemist Armor"
	equipmentAttack += SkillSearch(skill_AL_POTION_RESEARCH);
	if (n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack +=
		(1 + (n_A_SHADOW_BODY_DEF_PLUS - 6)) *
		SkillSearch(skill_AL_POTION_RESEARCH);
	}
	if (EquipNumSearch(1742)) {
	// "Shadow Rogue Boots"
	equipmentAttack += SkillSearch(skill_SW_SWORD_MASTERY);
	if (n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack +=
		(1 + (n_A_SHADOW_BODY_DEF_PLUS - 6)) *
		SkillSearch(skill_SW_SWORD_MASTERY);
	}
	if (EquipNumSearch(1754)) {
	// "Shadow Bard Boots"
	equipmentAttack += SkillSearch(skill_BA_MUSIC_LESSONS);
	if (n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack +=
		(1 + (n_A_SHADOW_BODY_DEF_PLUS - 6)) *
		SkillSearch(skill_BA_MUSIC_LESSONS);
	}
	if (EquipNumSearch(1757)) {
	// "Shadow Dancer Boots"
	equipmentAttack += SkillSearch(skill_DA_DANCE_LESSONS);
	if (n_A_SHADOW_BODY_DEF_PLUS > 6)
		equipmentAttack +=
		(1 + (n_A_SHADOW_BODY_DEF_PLUS - 6)) *
		SkillSearch(skill_DA_DANCE_LESSONS);
	}
	if (EquipNumSearch(1712)) {
	// "Shadow Swordsman Gloves"
	equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if (EquipNumSearch(1715)) {
	// "Shadow Swordsman Set"
	equipmentAttack +=
		n_A_SHADOW_WEAPON_DEF_PLUS +
		n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS;
	}
	if (EquipNumSearch(1716)) {
	// "Shadow Diviner Gloves"
	equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if (EquipNumSearch(1995) || EquipNumSearch(1996)) {
	// Shadow Doram Battler Gloves ||Shadow Doram Mage Glove
	equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if (
	EquipNumSearch(2255) || // Wyrmeater's Shadow Gloves
	EquipNumSearch(2256) || // Tiger Spirit Shadow Gloves
	EquipNumSearch(2257) || // Katra's Shadow Gloves
	EquipNumSearch(2259) || // Rondius' Shadow Gloves
	EquipNumSearch(2261) || // Talos' Shadow Gloves
	EquipNumSearch(2263) || // Dordaleon's Shadow Gloves
	EquipNumSearch(2265) || // Garmia's Shadow Gloves
	EquipNumSearch(2266)
	) {
	// Boscard's Shadow Gloves
	equipmentAttack += n_A_SHADOW_WEAPON_DEF_PLUS;
	}
	if (EquipNumSearch(2293)) {
	// Katra's Shadow Set
	equipmentAttack +=
		n_A_SHADOW_WEAPON_DEF_PLUS +
		n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS;
	}

	//Enchants
	if (EnchNumSearch(841)) {
	//Special STR = 281
	if (n_A_SHOULDER_DEF_PLUS > 8) {
		equipmentAttack += 1;
	}
	}
	if (EnchNumSearch(842)) {
	//Special AGI = 282
	if (n_A_SHOULDER_DEF_PLUS > 8) {
		equipmentAttack += 1;
	}
	}
	if (EnchNumSearch(5243)) {
	//Modification Orb (ATK)
	if (n_A_BODY_DEF_PLUS >= 7) equipmentAttack += 25 * EnchNumSearch(5243);
	if (n_A_BODY_DEF_PLUS >= 9) equipmentAttack += 25 * EnchNumSearch(5243);
	}

	return equipmentAttack;
}
function getConsumableATK() {
	let consumableATK = 0;

	return consumableATK;
}
function getAmmunitionATK() {
	let ammunitionATK = 0;
	// Projectiles
	if (
	n_A_WeaponType === weapTyp_BOW ||
	n_A_WeaponType === weapTyp_INSTRU ||
	n_A_WeaponType === weapTyp_WHIP ||
	n_A_WeaponType === weapTyp_HANDGUN ||
	n_A_WeaponType === weapTyp_RIFLE ||
	n_A_WeaponType === weapTyp_SHOTGUN ||
	n_A_WeaponType === weapTyp_GATLING_GUN ||
	n_A_WeaponType === weapTyp_GRENADE_LAUNCHER
	) {
	// Arrows
	ammunitionATK += ArrowOBJ[n_A_Arrow][arr_att_ATK];
	}
	if (n_A_ActiveSkill === skill_GEN_CART_CANNON) {
	// Cannon Balls
	ammunitionATK += CannonBallOBJ[n_A_Arrow][arr_att_ATK];
	}

	return ammunitionATK;
}
function getPseudoBuffATK() {
	//check rathena/src/map/status.cpp static unsigned short status_calc_watk(struct block_list *bl, status_change *sc, int watk)
	//for list of pseudo buff skills
	let pseudoBuffATK = 0;


	// Ice Pick Effect
	if (
	n_tok[bon_ICE_PICK] ||
	n_A_ActiveSkill == skill_MO_OCCULT_IMPACTION ||
	n_A_ActiveSkill == skill_REB_MASS_SPIRAL
	) {
	// adds (monsters def)/2 equip attack
	// pseudoBuffATK += Math.floor(n_B[en_HARDDEF] / 2);
	// pseudoBuffATK += Math.floor(MonsterOBJ[n_B[en_ID]][en_HARDDEF] / 2);
	pseudoBuffATK += Math.floor(MonsterOBJ[n_B[en_ID]][en_HARDDEF] / 2);
	// pseudoBuffATK += (MonsterOBJ[n_B[en_ID]][en_HARDDEF] / 2);
	}
	// if(n_A_ActiveSkill == skill_AS_SONIC_BLOW || n_A_ActiveSkill == skill_AS_SONIC_BLOW_SL)
	// pseudoBuffATK += AS_SONIC_ACCELERATION.skillFormula(SkillSearch(skill_AS_SONIC_ACCELERATION));

	return pseudoBuffATK;
}

function getMasteryATK() {
	let masteryATK = 0;

	//race
	masteryATK += AC_DEMON_BANE.skillFormula(SkillSearch(skill_AC_DEMON_BANE));
	masteryATK += HU_BEAST_BANE.skillFormula(SkillSearch(skill_HU_BEAST_BANE));
	masteryATK += RAN_RANGER_MAIN.skillFormula(
	SkillSearch(skill_RAN_RANGER_MAIN)
	);
	//element
	masteryATK += MEC_RESEARCH_FIRE_EARTH.skillFormula(
	SkillSearch(skill_MEC_RESEARCH_FIRE_EARTH)
	);

	//NC_RESEARCHFE ???

	//weapon
	masteryATK += SW_SWORD_MASTERY.skillFormula(
	SkillSearch(skill_SW_SWORD_MASTERY)
	);
	masteryATK += SW_TWO_HAND_SWORD_MASTERY.skillFormula(
	SkillSearch(skill_SW_TWO_HAND_SWORD_MASTERY)
	);
	masteryATK += KN_SPEAR_MASTERY.skillFormula(
	SkillSearch(skill_KN_SPEAR_MASTERY)
	);
	masteryATK += AS_KATAR_MASTERY.skillFormula(
	SkillSearch(skill_AS_KATAR_MASTERY)
	);
	masteryATK += MO_IRON_FIST.skillFormula(SkillSearch(skill_MO_IRON_FIST));
	masteryATK += BA_MUSIC_LESSONS.skillFormula(
	SkillSearch(skill_BA_MUSIC_LESSONS)
	);
	masteryATK += DA_DANCE_LESSONS.skillFormula(
	SkillSearch(skill_DA_DANCE_LESSONS)
	);
	masteryATK += SA_STUDY.skillFormula(SkillSearch(skill_SA_STUDY));
	masteryATK += AL_AXE_MASTERY.skillFormula(SkillSearch(skill_AL_AXE_MASTERY));
	masteryATK += TK_SPRINT.skillFormula(SkillSearch(skill_TK_SPRINT));
	masteryATK += MEC_AXE_TRAINING.skillFormula(
	SkillSearch(skill_MEC_AXE_TRAINING)
	);
	masteryATK += GEN_SWORD_TRAINING.skillFormula(
	SkillSearch(skill_GEN_SWORD_TRAINING)
	);
	//all weapons
	masteryATK += BS_WEAPONRY_RESEARCH.skillFormula(
	SkillSearch(skill_BS_WEAPONRY_RESEARCH)
	); //listed as mastery in rathena
	masteryATK += MEC_MAGIC_GEAR_LICENSE.skillFormula(
	SkillSearch(skill_MEC_MAGIC_GEAR_LICENSE)
	);
	//NV_BREAKTHROUGH <- extended novice skill

	//others
	if (SkillSearch(skill_SUR_RISING_DRAGON))
	masteryATK += SUR_RISING_DRAGON.skillFormula(
		SkillSearch(skill_SUR_RISING_DRAGON)
	);
	else
	masteryATK += MO_SUMMON_SPIRIT_SPHERE.skillFormula(
		SkillSearch(skill_MO_SUMMON_SPIRIT_SPHERE)
	);

	//code from src/map/status.cpp status_calc_watk()
	// rathena code :
	// 	//General skill masteries

	// 	if(skill_id == TF_POISON) //Additional ATK from Envenom is treated as mastery type damage [helvetica]
	// 	ATK_ADD(wd->masteryAtk, wd->masteryAtk2, 15 * skill_lv);
	if (n_A_ActiveSkill == skill_TH_ENVENOM)
	masteryATK += TH_ENVENOM.skillFormula(n_A_ActiveSkillLV);
	// if (skill_id != MC_CARTREVOLUTION && pc_checkskill(sd, BS_HILTBINDING) > 0)
	// 	ATK_ADD(wd->masteryAtk, wd->masteryAtk2, 4);
	masteryATK += BS_HILT_BINDING.skillFormula(
	SkillSearch(skill_BS_HILT_BINDING)
	);
	// if (skill_id != CR_SHIELDBOOMERANG)
	// 	ATK_ADD2(wd->masteryAtk, wd->masteryAtk2, ((wd->div_ < 1) ? 1 : wd->div_) * sd->right_weapon.star, ((wd->div_ < 1) ? 1 : wd->div_) * sd->left_weapon.star);
	// ATK_ADD(wd->masteryAtk, wd->masteryAtk2, ((wd->div_ < 1) ? 1 : wd->div_) * sd->spiritball * 3);

	// if (skill_id == NJ_SYURIKEN && (skill = pc_checkskill(sd,NJ_TOBIDOUGU)) > 0) { // !TODO: Confirm new mastery formula
	// 	ATK_ADD(wd->damage, wd->damage2, 3 * skill);
	// 	ATK_ADD(wd->masteryAtk, wd->masteryAtk2, 3 * skill);
	// }
	if (
	n_A_ActiveSkill == skill_NIN_THROW_HUUMA_SHURIKEN ||
	n_A_ActiveSkill == skill_NIN_THROW_DAGGER ||
	n_A_ActiveSkill == skill_NIN_THROW_KUNAI
	)
	masteryATK += NIN_DAGGER_THROWING_PRACTICE.skillFormula(
		SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE)
	);

	// switch(skill_id) {
	// 	case RA_WUGDASH:
	// 	case RA_WUGSTRIKE:
	// 	case RA_WUGBITE:
	// 		if (sd) {
	// 			skill = pc_checkskill(sd, RA_TOOTHOFWUG);

	// 			ATK_ADD(wd->damage, wd->damage2, 30 * skill);
	// 			ATK_ADD(wd->masteryAtk, wd->masteryAtk2, 30 * skill);
	// 		}
	// 		break;
	// }
	if (
	n_A_ActiveSkill == skill_RAN_WARG_BITE ||
	n_A_ActiveSkill == skill_RAN_WARG_DASH ||
	n_A_ActiveSkill == skill_RAN_WARG_STRIKE
	)
	masteryATK += RAN_TOOTH_OF_WARG.skillFormula(
		SkillSearch(skill_RAN_TOOTH_OF_WARG)
	);

	// if (sc) { // Status change considered as masteries
	// 	if (sc->getSCE(SC_NIBELUNGEN)) // With renewal, the level 4 weapon limitation has been removed
	// 		ATK_ADD(wd->masteryAtk, wd->masteryAtk2, sc->getSCE(SC_NIBELUNGEN)->val2);

	// 	if(sc->getSCE(SC_CAMOUFLAGE)) {
	// 		ATK_ADD(wd->damage, wd->damage2, 30 * min(10, sc->getSCE(SC_CAMOUFLAGE)->val3));
	// 		ATK_ADD(wd->masteryAtk, wd->masteryAtk2, 30 * min(10, sc->getSCE(SC_CAMOUFLAGE)->val3));
	// 	}
	masteryATK += RAN_CAMOUFLAGE.skillFormula(SkillSearch(skill_RAN_CAMOUFLAGE));
	// 	if(sc->getSCE(SC_GN_CARTBOOST)) {
	// 		ATK_ADD(wd->damage, wd->damage2, 10 * sc->getSCE(SC_GN_CARTBOOST)->val1);
	// 		ATK_ADD(wd->masteryAtk, wd->masteryAtk2, 10 * sc->getSCE(SC_GN_CARTBOOST)->val1);
	// 	}
	masteryATK += GEN_CART_BOOST.skillFormula(SkillSearch(skill_GEN_CART_BOOST));

	// 	if (sc->getSCE(SC_P_ALTER)) {
	// 		ATK_ADD(wd->damage, wd->damage2, sc->getSCE(SC_P_ALTER)->val2);
	// 		ATK_ADD(wd->masteryAtk, wd->masteryAtk2, sc->getSCE(SC_P_ALTER)->val2);
	// 	}
	masteryATK += REB_PLATINUM_ALTAR.skillFormula(
	SkillSearch(skill_REB_PLATINUM_ALTAR)
	);

	return masteryATK;
}
/*TODO*/
function getBuffATK() {
	let buffATK = 0;
	//code from src/map/status.cpp status_calc_watk()
	// rathena code :
	// if (sc->getSCE(SC_IMPOSITIO))
	// 	watk += sc->getSCE(SC_IMPOSITIO)->val2;
	// if(sc->getSCE(SC_WATKFOOD))
	// 	watk += sc->getSCE(SC_WATKFOOD)->val1;
	// if(sc->getSCE(SC_VOLCANO))
	// 	watk += sc->getSCE(SC_VOLCANO)->val2;
	// if(sc->getSCE(SC_MERC_ATKUP))
	// 	watk += sc->getSCE(SC_MERC_ATKUP)->val2;
	// if(sc->getSCE(SC_WATER_BARRIER))
	// 	watk -= sc->getSCE(SC_WATER_BARRIER)->val2;
	// if(sc->getSCE(SC_INCATKRATE))
	// 	watk += watk * sc->getSCE(SC_INCATKRATE)->val1/100;
	// if(sc->getSCE(SC_PROVOKE))
	// 	watk += watk * sc->getSCE(SC_PROVOKE)->val2/100;
	// if(sc->getSCE(SC_SKE))
	// 	watk += watk * 3;
	// if(sc->getSCE(SC_FLEET))
	// 	watk += watk * sc->getSCE(SC_FLEET)->val3/100;
	// if(sc->getSCE(SC_CURSE))
	// 	watk -= watk * 25/100;
	// if(sc->getSCE(SC_STRIPWEAPON) && bl->type != BL_PC)
	// 	watk -= watk * sc->getSCE(SC_STRIPWEAPON)->val2/100;
	// if(sc->getSCE(SC_FIGHTINGSPIRIT))
	// 	watk += sc->getSCE(SC_FIGHTINGSPIRIT)->val1;
	buffATK += RUN_FIGHTING_SPIRIT.skillFormula(
	SkillSearch(skill_RUN_FIGHTING_SPIRIT)
	);

	// if (sc->getSCE(SC_SHIELDSPELL_ATK))
	// 	watk += sc->getSCE(SC_SHIELDSPELL_ATK)->val2;
	// if(sc->getSCE(SC_INSPIRATION))
	// 	watk += sc->getSCE(SC_INSPIRATION)->val2;
	buffATK += ROY_INSPIRATION.skillFormula(SkillSearch(skill_ROY_INSPIRATION));

	// if(sc->getSCE(SC_GT_CHANGE))
	// 	watk += sc->getSCE(SC_GT_CHANGE)->val2;
	// buffATK += SUR_GENTLE_TOUCH_CHANGE.skillFormula(SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE));//in getWeaponATKBonus()

	// if(sc->getSCE(SC__ENERVATION))
	// 	watk -= watk * sc->getSCE(SC__ENERVATION)->val2 / 100;
	// if(sc->getSCE(SC_STRIKING))
	// 	watk += sc->getSCE(SC_STRIKING)->val2;
	// if(sc->getSCE(SC_RUSHWINDMILL))
	// 	watk += sc->getSCE(SC_RUSHWINDMILL)->val3;
	// if(sc->getSCE(SC_FIRE_INSIGNIA) && sc->getSCE(SC_FIRE_INSIGNIA)->val1 == 2)
	// 	watk += 50;
	if (
	otherBuffs[ksInsignia] == ksFireInsignia &&
	otherBuffs[ksInsigniaLvl] == 2
	)
	buffATK += 50;
	// if((sc->getSCE(SC_FIRE_INSIGNIA) && sc->getSCE(SC_FIRE_INSIGNIA)->val1 == 2)
	//	|| (sc->getSCE(SC_WATER_INSIGNIA) && sc->getSCE(SC_WATER_INSIGNIA)->val1 == 2)
	//	|| (sc->getSCE(SC_WIND_INSIGNIA) && sc->getSCE(SC_WIND_INSIGNIA)->val1 == 2)
	//	|| (sc->getSCE(SC_EARTH_INSIGNIA) && sc->getSCE(SC_EARTH_INSIGNIA)->val1 == 2))
	// 	watk += watk * 10 / 100;
	//Every Insignia level 2 increase atk +10%
	if (otherBuffs[ksInsigniaLvl] == 2)
	buffATK += (getBaseWeaponATK() + buffATK) / 10;
	//Agni lv.1
	// if(sc->getSCE(SC_PYROTECHNIC_OPTION))
	// 	watk += sc->getSCE(SC_PYROTECHNIC_OPTION)->val2;
	//Agni lv.2
	// if(sc->getSCE(SC_HEATER_OPTION))
	// 	watk += sc->getSCE(SC_HEATER_OPTION)->val2;
	//Agni lv.3
	// if(sc->getSCE(SC_TROPIC_OPTION))
	// 	watk += sc->getSCE(SC_TROPIC_OPTION)->val2;
	if (
	SkillSearch(skill_SOR_SUMMON_TYPE) == 0 &&
	SkillSearch(skill_SOR_SUMMON_LEVEL) > 0 &&
	SkillSearch(skill_SOR_SPIRIT_CONTROL) == 1
	)
	buffATK += 60 * SkillSearch(skill_SOR_SUMMON_LEVEL);

	// if( sc && sc->getSCE(SC_TIDAL_WEAPON) )
	// 	watk += watk * sc->getSCE(SC_TIDAL_WEAPON)->val2 / 100;
	// if(bl->type == BL_PC && sc->getSCE(SC_PYROCLASTIC))
	// 	watk += sc->getSCE(SC_PYROCLASTIC)->val2;
	// if(sc->getSCE(SC_ANGRIFFS_MODUS))
	// 	watk += watk * sc->getSCE(SC_ANGRIFFS_MODUS)->val2/100;
	// if(sc->getSCE(SC_ODINS_POWER))
	// 	watk += 40 + 30 * sc->getSCE(SC_ODINS_POWER)->val1;
	// if (sc->getSCE(SC_FLASHCOMBO))
	// 	watk += sc->getSCE(SC_FLASHCOMBO)->val2;
	if (n_A_ActiveSkill == skill_SUR_FLASH_COMBO)
	buffATK += 20 + 20 * n_A_ActiveSkillLV;

	// if (sc->getSCE(SC_CATNIPPOWDER))
	// 	watk -= watk * sc->getSCE(SC_CATNIPPOWDER)->val2 / 100;
	// if (sc->getSCE(SC_CHATTERING))
	// 	watk += sc->getSCE(SC_CHATTERING)->val2;
	buffATK += SUM_CHATTERING.skillFormula(SkillSearch(skill_SUM_CHATTERING));

	if (SkillSearch(skill_SUM_MEOW_MEOW) || summonerBuffs[ksMeowMeow]) {
	//not sure if misplaced
	// Meow Meow
	buffATK += 100;
	}

	// if (sc->getSCE(SC_SUNSTANCE))
	// 	watk += watk * sc->getSCE(SC_SUNSTANCE)->val2 / 100;
	
	// if (sc->getSCE(SC_SOULFALCON))
	// 	watk += sc->getSCE(SC_SOULFALCON)->val2;
	// if (sc->getSCE(SC_PACKING_ENVELOPE1))
	// 	watk += sc->getSCE(SC_PACKING_ENVELOPE1)->val1;
	// if (sc->getSCE(SC_POWERFUL_FAITH))
	// 	watk += sc->getSCE(SC_POWERFUL_FAITH)->val2;
	// if (sc->getSCE(SC_GUARD_STANCE))
	// 	watk -= sc->getSCE(SC_GUARD_STANCE)->val3;

	// Skills
	if (SkillSearch(skill_GS_LAST_STAND)) {
	//misplaced
	// LastStand
	buffATK += 100;
	}
	if (SkillSearch(skill_GS_GATLING_FEVER)) {
	//misplaced
	// Gatling Fever
	if (
		n_A_WeaponType === weapTyp_GATLING_GUN ||
		n_A_WeaponType === weapTyp_NONE
	) {
		buffATK += 20 + 10 * SkillSearch(skill_GS_GATLING_FEVER);
	}
	}
	if (SkillSearch(skill_ROY_BANDING)) {
	//not sure if misplaced
	// Banding ATK increase: [# of Royal Guard party members x (10 + 10 * Skill Level)]
	if (PATCH < 2)
		buffATK +=
		(10 + 10 * SkillSearch(skill_ROY_BANDING)) *
		SkillSearch(skill_ROY_NUM_GUARDS);
	}

	if (
	performerBuffs[ksEnsemble] === ksBattleTheme &&
	performerBuffs[ksEnsembleLevel] > 0
	) {
	//not sure if misplaced
	// Battle Theme
	// equipmentAttack += 125 + ( 25 * performerBuffs[ksEnsembleLevel] );
	buffATK += 15 + 5 * performerBuffs[ksEnsembleLevel];
	}

	if (
	performerBuffs[ksChorus] === ksSaturdayNightFever &&
	performerBuffs[ksChorusLevel] > 0 &&
	performerBuffs[ksNumPerformers] >= 2
	) {
	//not sure if misplaced
	// Saturday Night Fever
	// var skillBonus = performerBuffs[ksChorusLevel] * 100;

	buffATK += performerBuffs[ksChorusLevel] * 100;
	}

	if (
	performerBuffs[ksMaestroSolo] === ksWindmillRush &&
	performerBuffs[ksMaestroSoloLevel] > 0
	) {
	// Windmill Rush
	let skillBonus = performerBuffs[ksMaestroSoloLevel] * 6;
	let voiceLessonsBonus = performerBuffs[ksMaestroVoiceLessons];
	let jobLvlBonus = performerBuffs[ksMaestroJobLevel] / 5.0;

	buffATK += Math.floor(skillBonus + voiceLessonsBonus + jobLvlBonus);
	}
	if (
	performerBuffs[ksChorus] === ksDancesWithWargs &&
	performerBuffs[ksChorusLevel] > 0 &&
	performerBuffs[ksNumPerformers] >= 2
	) {
	// Dances with Wargs
	let skillBonus = performerBuffs[ksChorusLevel] * 2;
	let performerBonus = performerBuffs[ksNumPerformers];

	if (performerBonus > 7) {
		performerBonus = 7;
	}

	buffATK += skillBonus * performerBonus;
	}
	//TEST
	// if(SkillSearch(skill_SUM_BUNCH_OF_SHRIMP) || summonerBuffs[ksBunchOfShrimp])
	// {
	// 	attackMod += 0.1;
	// }
	return 0;
}

//resolving attacks
//https://irowiki.org/wiki/Attacks
function getRangedMultiplier() {
	//RangedMultiplier, See Archer Skeleton Card, Resentful Soldier Card.
	// Calc Ranged bonuses
	let rangedMultiplier =
	StPlusCalc2(bon_DMG_RANGE) + StPlusEnchant(bon_DMG_RANGE);
	if (not_use_card == 0) rangedMultiplier += StPlusCard(bon_DMG_RANGE);

	// Equipment

	if (
	(EquipNumSearch(626) && n_A_Arrow == arrTyp_FIRE) || // Burning Bow
	(EquipNumSearch(627) && n_A_Arrow == arrTyp_CRYSTAL) || // Freezing Bow
	(EquipNumSearch(628) && n_A_Arrow == arrTyp_STONE) || // Earthen Bow
	(EquipNumSearch(629) && n_A_Arrow == arrTyp_WIND)
	)
	// Gale Bow
	rangedMultiplier += 25;

	if (
	(EquipNumSearch(2657) && n_A_Arrow == arrTyp_FIRE) || // Elemental Tights + Burning Bow
	(EquipNumSearch(2658) && n_A_Arrow == arrTyp_CRYSTAL) || // Elemental Tights + Freezing Bow
	(EquipNumSearch(2659) && n_A_Arrow == arrTyp_STONE) || // Elemental Tights + Earthen Bow
	(EquipNumSearch(2660) && n_A_Arrow == arrTyp_WIND)
	)
	// Elemental Tights + Gale Bow
	rangedMultiplier += 20;

	if (
	(EquipNumSearch(630) && n_A_Arrow == arrTyp_STEEL) || // Orc Archer Bow
	(EquipNumSearch(1286) && n_A_Arrow == arrTyp_ELVEN) || // Elven Bow
	(EquipNumSearch(101) && n_A_Arrow == arrTyp_HUNTING) || //Hunter Bow
	(EquipNumSearch(2720) && n_A_Arrow == arrTyp_HUNTING) //Illusion Hunter Bow
	)
	// Hunter Bow
	rangedMultiplier += 50;

	// Sniper Googles
	if (EquipNumSearch(1255) && SU_AGI >= 120) rangedMultiplier += 4;
	// Dying Swan
	if (EquipNumSearch(1265)) rangedMultiplier += 5;
	// Maestro Song Hat
	if (EquipNumSearch(1258)) rangedMultiplier += 5;
	// Captain's Hat and pipe? Not in iRO
	if (EquipNumSearch(1217)) rangedMultiplier += n_A_HEAD_DEF_PLUS;
	// Sagittarius Crown
	if (EquipNumSearch(1354) && n_A_HEAD_DEF_PLUS >= 9) rangedMultiplier += 3;
	// Ancient Gold Ornament
	if (EquipNumSearch(1401) && n_A_JobSearch() == cls_ARC)
	rangedMultiplier += 10;
	// White Wing Suit
	if (EquipNumSearch(1408)) rangedMultiplier += 2 * n_A_BODY_DEF_PLUS;
	//Evil Marching Hat
	if (EquipNumSearch(1514) && n_A_HEAD_DEF_PLUS >= 9) rangedMultiplier += 5;

	if (EquipNumSearch(1464)) {
	//Heroic Backpack
	if (n_A_SHOULDER_DEF_PLUS >= 7 && SU_DEX >= 90) {
		rangedMultiplier += 5;
	}
	if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_DEX >= 90) {
		rangedMultiplier += 5;
	}
	}
	if (EquipNumSearch(1583)) {
	//Golden Angel Wing
	if (SU_DEX >= 90) {
		rangedMultiplier += 5;
	}
	if (n_A_SHOULDER_DEF_PLUS >= 9 && SU_DEX >= 90) {
		rangedMultiplier += 5;
	}
	}
	if (EquipNumSearch(1584)) {
	//Golden Angel Hairband
	if (SU_DEX >= 70) {
		rangedMultiplier += 2;
	}
	if (n_A_HEAD_DEF_PLUS >= 7 && SU_DEX >= 70) {
		rangedMultiplier += 3;
	}
	}
	if (EquipNumSearch(1665)) {
	//"Red Fox Ears(transformation mode)"
	if (n_A_HEAD_DEF_PLUS >= 6 && n_A_HEAD_DEF_PLUS <= 12) {
		rangedMultiplier += n_A_HEAD_DEF_PLUS - 5;
	}
	if (n_A_HEAD_DEF_PLUS >= 6 && n_A_HEAD_DEF_PLUS > 12) {
		rangedMultiplier += 7;
	}
	}
	//Fallen Angel Wing
	if (EquipNumSearch(1545)) rangedMultiplier += Math.floor(SU_DEX / 20);
	//"Dog Cap"
	if (EquipNumSearch(1702) && n_A_HEAD_DEF_PLUS >= 11) rangedMultiplier += 3;
	//"Probation Gatling Gun"
	if (EquipNumSearch(1703) && n_A_Weapon_ATKplus >= 7)
	rangedMultiplier += SkillSearch(433);
	//"Probation Revolver"
	if (EquipNumSearch(1705) && n_A_Weapon_ATKplus >= 7)
	rangedMultiplier += SkillSearch(427);
	//"Probation Rifle"
	if (EquipNumSearch(1706) && n_A_Weapon_ATKplus >= 7)
	rangedMultiplier += SkillSearch(427);
	//DEX Glove
	if (EquipNumSearch(1796) && SU_DEX >= 110)
	rangedMultiplier += 1 * EquipNumSearch(1796);
	//Dex Boots
	if (
	(EquipNumSearch(1950) || EquipNumSearch(1956) || EquipNumSearch(2201)) &&
	SU_DEX >= 120
	)
	rangedMultiplier += 5;

	if (EquipNumSearch(1969)) {
	//Hero Silverleather Boots
	if (n_A_SHOES_DEF_PLUS >= 8 && n_A_SHOES_DEF_PLUS <= 13)
		rangedMultiplier += n_A_SHOES_DEF_PLUS - 7;
	else if (n_A_SHOES_DEF_PLUS > 13) rangedMultiplier += 6;
	}
	//Dragon Slayer (Ancient Weapon)
	if (EquipNumSearch(2051) && n_A_Weapon_ATKplus >= 11) rangedMultiplier += 10;
	//Demon's Shot || Big Game Trophy
	if (EquipNumSearch(2078) || EquipNumSearch(2081))
	rangedMultiplier += 3 * Math.floor(n_A_Weapon_ATKplus / 2);
	//Four Mirrors || Guttling Gun
	if (EquipNumSearch(2075) || EquipNumSearch(2082))
	rangedMultiplier += 2 * Math.floor(n_A_Weapon_ATKplus / 3);

	if (
	EquipNumSearch(2052) || //Trident of Undine
	EquipNumSearch(2054) || //Bow of Narcissus
	EquipNumSearch(2069) || //Sword of Blue Fire
	EquipNumSearch(2073)
	)
	//Iron Claw
	rangedMultiplier += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
	//Empyrean
	if (EquipNumSearch(2061) && n_A_Weapon_ATKplus >= 11) rangedMultiplier += 5;
	// "Chronocloak of Dexterity"
	if (EquipNumSearch(2146))
	rangedMultiplier += Math.floor(n_A_SHOULDER_DEF_PLUS / 2);

	if (
	EquipNumSearch(2220) || // Old Maestro Song's Hat [1]
	EquipNumSearch(2225) || // Old Dying Swan [1]
	EquipNumSearch(2221) || // Old Midas Whisper [1]
	EquipNumSearch(2226)
	)
	// Old Camouflage Bunny Hood [1]
	rangedMultiplier += n_A_HEAD_DEF_PLUS;
	// Fallen Warrior Manteau
	if (EquipNumSearch(2229)) {
	rangedMultiplier += n_A_SHOULDER_DEF_PLUS;
	if (SU_DEX >= 90) rangedMultiplier += 3;
	}
	if (EquipNumSearch(2232)) {
	// Republic Hat [1]
	if (n_A_HEAD_DEF_PLUS >= 7) rangedMultiplier += 2;
	if (n_A_HEAD_DEF_PLUS >= 10) rangedMultiplier += 4;
	}
	//Dark Rose [2]
	if (EquipNumSearch(2241) && n_A_Weapon_ATKplus >= 7) rangedMultiplier += 15;
	// Dustfire [2]
	if (EquipNumSearch(2243) && n_A_Arrow == bulTyp_ArmorPiercing)
	rangedMultiplier += 30;
	//Korean Judge Hat
	if (
	EquipNumSearch(2410) &&
	(n_A_JobSearch() == cls_ARC || n_A_JobSearch() == cls_GUN)
	)
	rangedMultiplier += n_A_HEAD_DEF_PLUS;

	if(EquipNumSearch(2849) && CardNumSearch(191))
	{// Ceres Armor + Ancient Mimic Card
		rangedMultiplier += 10;
	}

	// if(EquipNumSearch())
	// {
	// }

	//Shadow
	//Shadow Gunslinger Gloves
	if (EquipNumSearch(1842)) {
	if (n_A_SHADOW_WEAPON_DEF_PLUS >= 7) {
		rangedMultiplier += 3;
	}
	if (n_A_SHADOW_WEAPON_DEF_PLUS >= 8) {
		rangedMultiplier += 5;
	}
	}
	//Shadow Doram Battler Gloves
	if (EquipNumSearch(1995)) rangedMultiplier += n_A_SHADOW_WEAPON_DEF_PLUS;
	//"Feathered Tricorn"
	if (EquipNumSearch(1860)) {
	if (n_A_HEAD_DEF_PLUS >= 7) {
		rangedMultiplier += 7;
	}
	if (n_A_HEAD_DEF_PLUS >= 11) {
		rangedMultiplier += 5;
	}
	}
	//"Elaborate Yellow Foxtail Replica"
	if (EquipNumSearch(1881))
	rangedMultiplier += 1 * Math.floor(n_A_Weapon_ATKplus / 2);
	//Armor of Sixtus the Dexterous
	if (EquipNumSearch(2041))
	rangedMultiplier += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);

	if (
	EquipNumSearch(2255) || // Wyrmeater's Shadow Gloves
	EquipNumSearch(2259) || // Rondius' Shadow Gloves
	EquipNumSearch(2261) || // Talos' Shadow Gloves
	EquipNumSearch(2265) || // Garmia's Shadow Gloves
	EquipNumSearch(2266)
	) {
	// Boscard's Shadow Gloves
	if (n_A_SHADOW_WEAPON_DEF_PLUS >= 7) rangedMultiplier += 3;
	if (n_A_SHADOW_WEAPON_DEF_PLUS >= 9) rangedMultiplier += 4;
	}

	//Cards
	//Menblatt Card
	if (CardNumSearch(541)) rangedMultiplier += Math.floor(SU_DEX / 10);
	//Big Eggring Card
	if (CardNumSearch(589)) {
	if (SU_DEX <= 50) rangedMultiplier -= 1 * Math.floor(SU_DEX / 10);
	else rangedMultiplier -= 5;
	}
	// Airship Raid Card
	if (CardNumSearch(689))
	rangedMultiplier += Math.floor(n_A_Weapon_ATKplus / 2) * CardNumSearch(689);
	//Powerful Archer Skeleton Card
	if (CardNumSearch(722) && n_A_BaseLV >= 100)
	rangedMultiplier += 2 * CardNumSearch(722);
	//Heart Hunter Card
	if (CardNumSearch(771)) {
	if (
		n_A_WeaponType == weapTyp_HANDGUN ||
		n_A_WeaponType == weapTyp_RIFLE ||
		n_A_WeaponType == weapTyp_GRENADE_LAUNCHER
	) {
		rangedMultiplier +=
		5 * CardNumSearch(771) + n_A_Weapon_ATKplus * CardNumSearch(771);
		if (n_A_Weapon_ATKplus >= 10) rangedMultiplier += 5 * CardNumSearch(771);
	}
	}
	//Resentful Soldier Card
	if (
	CardNumSearch(818) &&
	n_A_WeaponType == weapTyp_BOW &&
	n_A_Weapon_ATKplus >= 10
	)
	rangedMultiplier += 20 * CardNumSearch(818);
	//Heart Hunter Bellare Card
	if (CardNumSearch(842) && n_A_WeaponType == weapTyp_HANDGUN)
	rangedMultiplier += 5 + n_A_Weapon_ATKplus;
	//Mutant Heart Hunter Bellare Card
	if (CardNumSearch(843) && n_A_WeaponType == weapTyp_GATLING_GUN)
	rangedMultiplier += 5 + n_A_Weapon_ATKplus;

	//Enchants
	//Rune of Dexterity 1
	if (EnchNumSearch(5163) && n_A_BODY_DEF_PLUS >= 10) rangedMultiplier += 5;
	//Rune of Dexterity 2
	if (EnchNumSearch(5164) && n_A_BODY_DEF_PLUS >= 11) rangedMultiplier += 7;
	//Rune of Dexterity 3
	if (EnchNumSearch(5165)) {
	if (n_A_BODY_DEF_PLUS >= 12) rangedMultiplier += 8;
	if (n_A_BODY_DEF_PLUS >= 13) rangedMultiplier += 2;
	}
	//Modification Orb (Sharpshooter)
	if (EnchNumSearch(5245)) {
	if (n_A_BODY_DEF_PLUS >= 7) rangedMultiplier += 2 * EnchNumSearch(5245);
	if (n_A_BODY_DEF_PLUS >= 9) rangedMultiplier += 2 * EnchNumSearch(5245);
	}

	//Skills
	if (SkillSearch(skill_RAN_NO_LIMITS))
	rangedMultiplier += 50 * SkillSearch(skill_RAN_NO_LIMITS);
	if (SkillSearch(skill_SUM_POWER_OF_LIFE) && SkillSearch(skill_SUM_ANIMAL))
	rangedMultiplier += 20;

	if (
	(SkillSearch(skill_SUM_ARCLOUSE_DASH) || summonerBuffs[ksArclouseDash]) &&
	n_A_JOB == cls_SUM
	)
	rangedMultiplier += 10;

	//Item
	if (usableItems[ksRaydricArcherTransScroll] && n_A_WeaponType === weapTyp_BOW)
	rangedMultiplier += 25;

	if (not_use_card == 1) rangedMultiplier = 0;

	if (n_A_ActiveSkill == skill_SHA_FEINT_BOMB) {
	rangedMultiplier = 0;
	}
	return rangedMultiplier;
}
/*TODO*/
function getRangedReduction() {
	//RangedReduction, See Horn Card.
	let rangedReduction = 0;
	// Ranged Reduction
	if (monsterBuffs[status_en_buff_Ranged])
	rangedReduction -= monsterBuffs[status_en_buff_Ranged];

	return rangedReduction;
}
function getHardDEFReduction() {
	//Damage after Hard DEF = Damage × [(4000 + HardDEF) ÷ (4000 + HardDEF × 10)]
	return (4000 + n_B[en_HARDDEF]) / (4000 + n_B[en_HARDDEF] * 10);
}
function getHardDEFReduction2() {
	//Damage after Hard DEF = Damage × [(4000 + HardDEF) ÷ (4000 + HardDEF × 10)]
	//bypass def reduction
	return ((4000 + MonsterOBJ[n_B[en_ID]][en_HARDDEF]) / (4000 + MonsterOBJ[n_B[en_ID]][en_HARDDEF] * 10));
}
function getSoftDEF(isMonster) {
	let softDef = 0;
	//additive bonus
	let bonusA = 0;
	//multiplicative bonus
	let bonusB = 0;

	if (isMonster) return Math.floor((n_B[en_VIT] + n_B[en_LEVEL]) / 2);

	softDef = Math.floor(n_A_VIT / 2 + n_A_AGI / 5 + n_A_BaseLV / 2);

	//BonusA
	if (n_B[en_RACE] == race_UNDEAD || n_B[en_RACE] == race_DEMON)
	bonusA += 3 * SkillSearch(skill_AC_DIVINE_PROTECTION);

	//BonusB
	if (SkillSearch(skill_AC_ANGELUS) || acolyteBuffs[ksAngelus])
	if (SkillSearch(skill_AC_ANGELUS))
		bonusB += 5 * SkillSearch(skill_AC_ANGELUS);
	else bonusB += 5 * acolyteBuffs[ksAngelus];

	return Math.floor((softDef + bonusA) * (1 + bonusB / 100));
}
function getDamageMultiplier() {
	/* 
	skill multiplier is a damage multiplier, added to other mutiplier, like power thrust or spear dynamo
	skill damage increased by card like true chen lio is finalmutiplier (ATK_ADDRATE in rathena)
	check rathena src>map>battle.cpp>static int battle_calc_attack_skill_ratio
	*/
	//DamageMultiplier, See Falcon Eyes, Frenzy, Heat Barrel, Power-Thrust, Spear Dynamo.
	let damageMutltiplier = 0;

	if (n_A_ActiveSkill != PA_MARTYR_RECONING) {
	/// if(sc->getSCE(SC_OVERTHRUST))
	/// 	skillratio += sc->getSCE(SC_OVERTHRUST)->val3;
	if (SkillSearch(skill_BS_POWER_THRUST) == 0)
		//doesn't stack with power thrust
		damageMutltiplier += MS_MAXIMUM_POWER_THUST.skillFormula(
		SkillSearch(skill_MS_MAXIMUM_POWER_THUST)
		);

	/// if(sc->getSCE(SC_MAXOVERTHRUST))
	/// 	skillratio += sc->getSCE(SC_MAXOVERTHRUST)->val2;
	damageMutltiplier += BS_POWER_THRUST.skillFormula(
		SkillSearch(skill_BS_POWER_THRUST)
	);

	/// if(sc->getSCE(SC_BERSERK))
	/// 	skillratio += 200;
	if (SkillSearch(skill_LK_FRENZY)) damageMutltiplier += 200; // is 200 on rathena ?

	/// if (sc && sc->getSCE(SC_TRUESIGHT))
	/// 	skillratio += 2 * sc->getSCE(SC_TRUESIGHT)->val1;
	damageMutltiplier += SN_FALCON_EYES.skillFormula(
		SkillSearch(skill_SN_FALCON_EYES)
	);

	/// if (sc->getSCE(SC_CONCENTRATION) && (skill_id != RK_DRAGONBREATH && skill_id != RK_DRAGONBREATH_WATER && skill_id != NPC_DRAGONBREATH))
	/// 	skillratio += sc->getSCE(SC_CONCENTRATION)->val2;
	if (
		n_A_ActiveSkill != skill_RUN_DRAGON_BREATH &&
		n_A_ActiveSkill != skill_RUN_DRAGON_BREATH_WATER
	)
		damageMutltiplier += LK_SPEAR_DYNAMO.skillFormula(
		SkillSearch(skill_LK_SPEAR_DYNAMO)
		);

	/// if (!skill_id || skill_id == KN_AUTOCOUNTER) {
	/// 	if (sc->getSCE(SC_CRUSHSTRIKE)) {
	/// 		if (sd) { //ATK [{Weapon Level * (Weapon Upgrade Level + 6) * 100} + (Weapon ATK) + (Weapon Weight)]%
	/// 			short index = sd->equip_index[EQI_HAND_R];

	/// 			if (index >= 0 && sd->inventory_data[index] && sd->inventory_data[index]->type == IT_WEAPON)
	/// 				skillratio += -100 + sd->inventory_data[index]->weight / 10 + sd->inventory_data[index]->atk +
	/// 					100 * sd->inventory_data[index]->weapon_level * (sd->inventory.u.items_inventory[index].refine + 6);
	/// 		}
	/// 		status_change_end(src,SC_CRUSHSTRIKE);
	/// 		skill_break_equip(src,src,EQP_WEAPON,2000,BCT_SELF);
	/// 	} else {
	/// 		if (sc->getSCE(SC_GIANTGROWTH) && (sd->class_&MAPID_THIRDMASK) == MAPID_RUNE_KNIGHT) { // Increase damage again if Crush Strike is not active
	/// 			if (map_flag_vs(src->m)) // Only half of the 2.5x increase on versus-type maps
	/// 				skillratio += 125;
	/// 			else
	/// 				skillratio += 250;
	/// 		}
	/// 	}
	/// }
	}

	//battle.cpp -> battle_attack_sc_bonus()

	// if(SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE) || (acolyteBuffs[ksPPChange] > 0))
	// {
	// 	if(SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE))
	// 		damageMutltiplier += SkillSearch(skill_SUR_GENTLE_TOUCH_CHANGE);
	// 	else
	// 		damageMutltiplier += acolyteBuffs[ksPPChange];
	// }

	//all below looks misplaced

	//not 100% sure it belong here
	if (
	SkillSearch(skill_TKM_STELLAR_WRATH) &&
	SkillSearch(skill_TKM_SOLAR_LUNAR_AND_STELLAR_MIRACLE)
	) {
	damageMutltiplier =
		(n_A_BaseLV + n_A_STR + n_A_LUK + n_A_DEX) /
		(12 - SkillSearch(skill_TKM_STELLAR_WRATH) * 3);
	} else if (
	SkillSearch(skill_TKM_STELLAR_WRATH) &&
	n_B[en_SIZE] == 2 &&
	n_B[en_HP] >= 17392
	) {
	damageMutltiplier =
		(n_A_BaseLV + n_A_STR + n_A_LUK + n_A_DEX) /
		(12 - SkillSearch(skill_TKM_STELLAR_WRATH) * 3);
	} else if (SkillSearch(skill_TKM_SOLAR_WRATH) && n_B[en_SIZE] == 0) {
	damageMutltiplier =
		(n_A_BaseLV + n_A_LUK + n_A_DEX) /
		(12 - SkillSearch(skill_TKM_SOLAR_WRATH) * 3);
	} else if (
	SkillSearch(skill_TKM_LUNAR_WRATH) &&
	n_B[en_SIZE] == 1 &&
	n_B[en_HP] >= 5218
	) {
	damageMutltiplier =
		(n_A_BaseLV + n_A_LUK + n_A_DEX) /
		(12 - SkillSearch(skill_TKM_LUNAR_WRATH) * 3);
	}

	return damageMutltiplier;
}
/*TODO*/
function getFinalDamageMultiplier(currentSkill) {
	let FinalDamageMultiplier = getSkillMultiplier(currentSkill);
	//FinalDamageMultiplier, See Dark Claw, Advanced Katar Mastery
	//Advanced Katar Mastery stacks multiplicatively (and is also floored separately) with other FinalDamageMultipliers
	if (
	n_A_WeaponType === weapTyp_KATAR &&
	SkillSearch(skill_AX_ADVANCED_KATAR_MASTERY)
	)
	FinalDamageMultiplier += AX_ADVANCED_KATAR_MASTERY.skillFormula(
		SkillSearch(skill_AX_ADVANCED_KATAR_MASTERY)
	);

	if (SkillSearch(skill_GS_GUNSLINGER_PANIC)) FinalDamageMultiplier -= 20;

	if (
	(Skill[n_A_ActiveSkill].id == skill_MO_GUILLOTINE_FIST ||
		Skill[n_A_ActiveSkill].id == skill_MO_MAX_GUILLOTINE_FIST) &&
	SkillSearch(skill_SUR_RISING_DRAGON)
	)
	FinalDamageMultiplier += 100;

	return FinalDamageMultiplier;
}
/*TODO*/
function getFinalDamageReduction() {
	//FinalDamageReduction, See Energy Coat, Mental Strength, Stoop.
	// if ( monsterBuffs[status_en_buff_StoneSkin] )
	// 	return 20;
	return 100;
}

function getCriticalMultiplier() {
	//CriticalMultiplier, See Cruiser Card.
	//bon_DMG_CRIT
	let criticalMultiplier =
	StPlusCalc2(bon_DMG_CRIT) + StPlusEnchant(bon_DMG_CRIT);
	if (not_use_card == 0) criticalMultiplier += StPlusCard(bon_DMG_CRIT);

	//Equipment
	// Glorious Hunter Bow
	if (EquipNumSearch(1089)) criticalMultiplier += 2 * n_A_Weapon_ATKplus;
	// Little Feather Hat + Sharp Arrows
	if (EquipNumSearch(1305) && n_A_Arrow == arrTyp_SHARP) {
	criticalMultiplier += 5;
	if (n_A_HEAD_DEF_PLUS >= 7) criticalMultiplier += 5;
	}
	//Heroic Backpack
	if (EquipNumSearch(1464)) {
	if (SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 7) {
		criticalMultiplier += 10;
	}
	if (SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) {
		criticalMultiplier += 5;
	}
	}
	//Golden Angel Wing
	if (EquipNumSearch(1583)) {
	if (SU_LUK >= 90) {
		criticalMultiplier += 5;
	}
	if (SU_LUK >= 90 && n_A_SHOULDER_DEF_PLUS >= 9) {
		criticalMultiplier += 5;
	}
	}
	//Golden Angel Hairband
	if (EquipNumSearch(1584)) {
	if (SU_LUK >= 70) {
		criticalMultiplier += 2;
	}
	if (SU_LUK >= 70 && n_A_HEAD_DEF_PLUS >= 7) {
		criticalMultiplier += 3;
	}
	}
	//Fallen Angel Wing
	if (EquipNumSearch(1545)) criticalMultiplier += Math.floor(SU_LUK / 20);
	//"Dog Cap"
	if (EquipNumSearch(1702) && n_A_HEAD_DEF_PLUS >= 11) criticalMultiplier += 3;
	//LUK Glove
	if (EquipNumSearch(1797) && SU_LUK >= 110)
	criticalMultiplier += 1 * EquipNumSearch(1797);
	//"General's Helmet"
	if (EquipNumSearch(1942) && n_A_HEAD_DEF_PLUS >= 11) criticalMultiplier += 15;
	//Luk Boots
	if (EquipNumSearch(2202) || EquipNumSearch(1957)) {
	criticalMultiplier += 2 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	if (SU_LUK >= 120) criticalMultiplier += 30;
	}
	//Luk Boots Slot
	if (EquipNumSearch(1951)) {
	criticalMultiplier += 2 * Math.floor(n_A_SHOES_DEF_PLUS / 3);
	if (SU_LUK >= 120) criticalMultiplier += 20;
	}
	//Gigant Blade
	if (EquipNumSearch(2021)) criticalMultiplier += n_A_Weapon_ATKplus;
	//Armor of Sixtus the Lucky
	if (EquipNumSearch(2042))
	criticalMultiplier += 2 * Math.floor(n_A_BODY_DEF_PLUS / 3);
	//Hand of Death
	if (EquipNumSearch(2057))
	criticalMultiplier += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
	//Crimson Rose
	if (EquipNumSearch(2079) && n_A_Weapon_ATKplus >= 9) criticalMultiplier += 20;
	// "Chronocloak of Agility" || "Chronocloak of Luck"
	if (EquipNumSearch(2143) || EquipNumSearch(2147))
	criticalMultiplier += 3 * Math.floor(n_A_SHOULDER_DEF_PLUS / 2);
	// "Chronocloak of Dexterity"
	if (EquipNumSearch(2146))
	criticalMultiplier += 3 * Math.floor(n_A_SHOULDER_DEF_PLUS / 4);
	// Old Bone Circlet [1]
	if (EquipNumSearch(2227)) criticalMultiplier += n_A_HEAD_DEF_PLUS;
	// Fallen Warrior Manteau
	if (EquipNumSearch(2229)) {
	criticalMultiplier += n_A_SHOULDER_DEF_PLUS;
	if (SU_LUK >= 90) criticalMultiplier += 15;
	}
	//YSF01 Greave
	if (EquipNumSearch(2251)) {
	if (n_A_SHOES_DEF_PLUS >= 13) criticalMultiplier += 10;
	if (SU_LUK >= 125) criticalMultiplier += 30;
	}
	// Illusion Skull Ring + Illusion Book of the Apocalypse
	if (EquipNumSearch(2390))
	criticalMultiplier += 5 * Math.floor(n_A_Weapon_ATKplus / 2);
	//Rebellion's Scarf
	if (EquipNumSearch(2414))
	criticalMultiplier += 3 * SkillSearch(skill_REB_DRAGON_TAIL);
	//Demon God's Ring (Acc Slot 1)
	if (
	n_A_Equip[eq_ACCI] == 2449 &&
	(n_A_card[card_loc_ACCI] == 653 ||
		n_A_card[card_loc_ACCI] == 654 ||
		n_A_card[card_loc_ACCI] == 655)
	)
	criticalMultiplier += 5;
	//Demon God's Ring (Acc Slot 2)
	if (
	n_A_Equip[eq_ACCII] == 2449 &&
	(n_A_card[card_loc_ACCII] == 653 ||
		n_A_card[card_loc_ACCII] == 654 ||
		n_A_card[card_loc_ACCII] == 655)
	)
	criticalMultiplier += 5;

	//Enchants
	//Rune of Luck 1
	if (EnchNumSearch(5166) && n_A_BODY_DEF_PLUS >= 10) criticalMultiplier += 5;
	//Rune of Luck 2
	if (EnchNumSearch(5167) && n_A_BODY_DEF_PLUS >= 11) criticalMultiplier += 7;
	//Rune of Luck 3
	if (EnchNumSearch(5168) && n_A_BODY_DEF_PLUS >= 12) {
	criticalMultiplier += 8;
	if (n_A_BODY_DEF_PLUS >= 13) criticalMultiplier += 6;
	}
	//Modification Orb (Critical)
	if (EnchNumSearch(5248) && n_A_SHOULDER_DEF_PLUS >= 7) {
	criticalMultiplier += 5 * EnchNumSearch(5248);
	if (n_A_SHOULDER_DEF_PLUS >= 9)
		criticalMultiplier += 5 * EnchNumSearch(5248);
	}
	if(EnchNumSearch(5584) && EnchNumSearch(866))
	{//Flash && Speed of Light
		criticalMultiplier +=30;
	}

//Shadows
	//Shadow Gunslinger Shield
	if (EquipNumSearch(1825)) {
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) {
		criticalMultiplier += 2;
	}
	if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) {
		criticalMultiplier += 3;
	}
	}
	//Katra's Shadow Pendant
	if (EquipNumSearch(2281))
	criticalMultiplier += Math.floor(n_A_SHADOW_PENDANT_DEF_PLUS / 2);
	//Cards
	//Petal Card
	if (CardNumSearch(562)) criticalMultiplier += Math.floor(SU_LUK / 10) * 2;
	//Big Eggring Card
	if (CardNumSearch(589)) {
	if (SU_LUK <= 50) criticalMultiplier -= 2 * Math.floor(SU_LUK / 10);
	else criticalMultiplier -= 10;
	}
	// Faceworm Queen Card
	if (CardNumSearch(635)) criticalMultiplier += n_A_SHOES_DEF_PLUS;
	//Powerful Soldier Skeleton Card
	if (CardNumSearch(724) && n_A_BaseLV >= 100) criticalMultiplier += 5;
	//Mutant Dolor Card
	if (CardNumSearch(849) && n_A_WeaponType == weapTyp_KATAR)
	criticalMultiplier += n_A_Weapon_ATKplus * 2;
	//Ominous Assaulter Card
	if (
	CardNumSearch(893) &&
	(n_A_WeaponType == weapTyp_WHIP ||
		n_A_WeaponType == weapTyp_INSTRUMENT ||
		n_A_WeaponType == weapTyp_BOOK ||
		n_A_WeaponType == weapTyp_SWORDII ||
		n_A_WeaponType == weapTyp_SPEARII)
	)
	criticalMultiplier += n_A_Weapon_ATKplus * CardNumSearch(893);
	//Skills
	if (
	performerBuffs[ksDancerSolo] === ksLadyLuck &&
	performerBuffs[ksDancerSoloLevel] > 0
	) {
	// Lady Luck
	// var skillBonus = 10 + performerBuffs[ksDancerSoloLevel];
	// var danceLessonsBous = Math.floor( performerBuffs[ksDanceLessons] / 2 );
	// var lukBonus = Math.floor( performerBuffs[ksDancerLuk] / 10 );
	// n_A_CRI += skillBonus + danceLessonsBous + lukBonus;
	var skillBonus = performerBuffs[ksDancerSoloLevel];
	criticalMultiplier += skillBonus * 2;
	}

	return criticalMultiplier;
}
/*TODO*/
function BaseCriticalMultiplier() {
	//BaseCriticalMultiplier,
	//This value is set to 1.4 and is what differentiates the damage of a basic and
	//critical attack without any CriticalMultiplier.
	return 1.4;
}

function getSkillMultiplier(currentSkill) {
	// Skill Multipliers
	let testSkMod = 0;
	if (currentSkill == skill_SW_BASH) {
	if (n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch(362)) {
		// Freezer Card gives 10% to bash
		testSkMod += 10;
	}
	}
	if (currentSkill == skill_KN_BOWLING_BASH) {
	if (n_A_WeaponType == weapTyp_SWORD || n_A_WeaponType == weapTyp_2HSWORD) {
		// Sword Guardian card bonus
		testSkMod += 25 * CardNumSearch(464);
	}
	}
	if (currentSkill == skill_AR_ARROW_SHOWER) {
	if (n_A_WeaponType == weapTyp_BOW) {
		// Bow Guardian card bonus
		testSkMod += 50 * CardNumSearch(465);
	}
	}
	if (currentSkill == skill_AR_DS) {
	if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1089)) {
		// Glorious Hunter Bow Bonus
		testSkMod += 20;
	}
	}
	if (currentSkill == skill_GS_TRIGGER_HAPPY_SHOT) {
	if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1099)) {
		// glorious pistol increases trigger happy shot
		testSkMod += 2 * n_A_Weapon_ATKplus;
	}
	}
	if (currentSkill == skill_GS_TRACKING) {
	if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1100)) {
		// glorious rifle
		testSkMod += 3 * n_A_Weapon_ATKplus;
	}
	}
	if (currentSkill == skill_GS_SPREAD_SHOT) {
	if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1102)) {
		// glorious shotgun
		testSkMod += 2 * n_A_Weapon_ATKplus;
	}
	}
	if (currentSkill == skill_GS_GUNSLINGER_MINE) {
	if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1103)) {
		// glorious grenade launcher
		testSkMod += 2 * n_A_Weapon_ATKplus;
	}
	}
	if (currentSkill == skill_GS_TRIPLE_ACTION) {
	if (
		EquipNumSearch(1100) ||
		EquipNumSearch(1101) ||
		EquipNumSearch(1102) ||
		EquipNumSearch(1103)
	) {
		// glorious guns increase triple action by 30%
		testSkMod += 30;
	}
	}
	if (currentSkill == skill_SW_BASH || currentSkill == skill_KN_BOWLING_BASH) {
	if (n_A_ActiveSkillLV == 10 && EquipNumSearch(1159)) {
		// Verteran Sword bonus
		testSkMod += 50;
	}
	}
	if (currentSkill == skill_ME_MAMMONITE) {
	if (SU_LUK >= 90 && SU_DEX >= 90 && EquipNumSearch(1164)) {
		// Berchel Axe?
		testSkMod += 15;
	}
	}
	if (currentSkill == skill_AX_METEOR_ASSAULT) {
	if (EquipNumSearch(1176) && SkillSearch(skill_AS_KATAR_MASTERY) == 10) {
		// Chakram
		testSkMod += 20;
	}
	}
	if (trifectaBlowDamage == -1 && EquipNumSearch(639)) {
	// Combo Battle Glove +15% bonus to Trfecta and Quadruple
	testSkMod += 15;
	}

	if (
	(currentSkill == skill_AS_SONIC_BLOW ||
		currentSkill == skill_AS_SONIC_BLOW_SL) &&
	SkillSearch(skill_AS_SONIC_ACCELERATION) &&
	determiningEDPdamage == 0
	) {
	// Sonic Acceleration bonus to Sonic Blow
	testSkMod += 10;
	}
	if (currentSkill === skill_MEC_AXE_TORNADO) {
	if (n_A_Weapon_element === ele_WIND) {
		// does more with wind element weapon
		testSkMod += 25;
	}
	}
	// if ( (n_A_JOB == cls_KAGOB) && SkillSearch( skill_KAG_SUMMON_ELEMENTAL_SEAL ) &&
	// (currentSkill !== skill_KAG_THROW_EXPLOSIVE_KUNAI &&
	// currentSkill !== skill_KAG_OVERTHROW &&
	// currentSkill !== skill_NIN_THROW_COINS &&
	// currentSkill !== skill_ALL_BASIC_ATTACK))
	// { // Summon Elemental Seals damage multiplier
	// if (n_A_Weapon_element == ele_NEUTRAL + SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL ) && SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL ) !== ele_EARTH)
	// testSkMod += 10*SkillSearch( skill_KAG_SUMMON_ELEMENTAL_SEAL );
	// }
	if (SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL)) {
	switch (SkillSearch(skill_KAG_GET_ELEMENTAL_SEAL)) {
		case ele_WATER:
		if (currentSkill == skill_NIN_FREEZING_SPEAR)
			testSkMod += 5 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		if (currentSkill == skill_NIN_SNOW_FLAKE_DRAFT)
			testSkMod += 25 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		break;
		case ele_EARTH:
		break;
		case ele_FIRE:
		if (currentSkill == skill_NIN_FLAMING_PETALS)
			testSkMod += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		if (currentSkill == skill_NIN_BLAZE_SHIELD)
			testSkMod += 5 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		if (currentSkill == skill_NIN_EXPLODING_DRAGON)
			testSkMod += 15 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		break;
		case ele_WIND:
		if (currentSkill == skill_NIN_WIND_BLADE)
			testSkMod += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		if (currentSkill == skill_NIN_LIGHTNING_JOLT)
			testSkMod += 15 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		if (currentSkill == skill_NIN_FIRST_WIND)
			testSkMod += 10 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
		break;
		default:
		break;
	}
	}
	if (
	SkillSearch(skill_SUM_SPIRIT_OF_LIFE) &&
	(currentSkill == skill_SUM_PICKY_PECK ||
		currentSkill == skill_SUM_SCAR_OF_TAROU ||
		currentSkill == skill_SUM_LUNATIC_CARROT_BEAT ||
		currentSkill == skill_SUM_SPIRIT_OF_SAVAGE)
	) {
	var remainingHP = formElements["SkillSubNum"].value;
	// testSkMod += 30 * remainingHP;
	testSkMod = (testSkMod * (100 + 30 * remainingHP)) / 100;
	}

	if (
	(EquipNumSearch(1723) && currentSkill == skill_CR_GRAND_CROSS) || // Shadow Crusader Armor
	(EquipNumSearch(1732) && currentSkill == skill_PR_MAGNUS_EXORCISMUS) || // Shadow Priest Armor
	(EquipNumSearch(1735) && currentSkill == skill_MO_THROW_SPIRIT_SPHERES) || // Shadow Monk Armor
	(EquipNumSearch(1735) && currentSkill == skill_MO_OCCULT_IMPACTION) || // Shadow Monk Armor
	(EquipNumSearch(1741) && currentSkill == skill_RG_SIGHTLESS_MIND) || // Shadow Rogue Armor
	(EquipNumSearch(1744) && currentSkill == skill_WI_JUPITEL_THUNDER) || // Shadow Wizard Armor
	(EquipNumSearch(1750) && currentSkill == skill_HU_BLAST_MINE) || // Shadow Hunter Armor
	(EquipNumSearch(1750) && currentSkill == skill_HU_LAND_MINE)
	) {
	// Shadow Hunter Armor
	testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 5;
	}

	if (
	(EquipNumSearch(1721) && currentSkill == skill_KN_PIERCE) || // Shadow Knight Boots
	(EquipNumSearch(1736) && currentSkill == skill_MO_RAGING_QUADRUPLE_BLOW) || // Shadow Monk Boots
	(EquipNumSearch(1739) && currentSkill == skill_AS_GRIMTOOTH) || // Shadow Assassin Boots
	(EquipNumSearch(1748) && currentSkill == skill_SA_HEAVENS_DRIVE) || // Shadow Sage Boots
	(EquipNumSearch(1751) && currentSkill == skill_HU_BLITZ_BEAT) || // Shadow Hunter Boots
	(EquipNumSearch(1751) && currentSkill == skill_SN_FALCON_ASSAULT)
	) {
	// Shadow Hunter Boots
	testSkMod += n_A_SHADOW_SHOES_DEF_PLUS * 5;
	}

	if (
	(EquipNumSearch(1810) && currentSkill == skill_ROY_EARTH_DRIVE) || // Shadow Royalguard Shield
	(EquipNumSearch(1811) && currentSkill == skill_MEC_FLAME_LAUNCHER) || // Shadow Mechanic Shield
	// (EquipNumSearch( 1813 ) && currentSkill==skill_ABI_ADORAMUS) || // Shadow Archbishop Shield
	(EquipNumSearch(1814) && currentSkill == skill_SUR_SKY_NET_BLOW)
	) {
	// Shadow Sura Shield
	// (EquipNumSearch( 1817 ) && currentSkill==skill_WAR_EARTH_STRAIN) ) // Shadow Warlock Shield
	testSkMod += n_A_SHADOW_SHIELD_DEF_PLUS * 5;
	}

	if (
	(EquipNumSearch(1826) && currentSkill == skill_RUN_SONIC_WAVE) || // Shadow Runeknight Gloves
	(EquipNumSearch(1827) && currentSkill == skill_ROY_SPEAR_CANNON) || // Shadow Royalguard Gloves
	(EquipNumSearch(1828) && currentSkill == skill_MEC_VULCAN_ARM) || // Shadow Mechanic Gloves
	(EquipNumSearch(1829) && currentSkill == skill_GEN_CART_TORNADO) || // Shadow Genetic Gloves
	// (EquipNumSearch( 1830 ) && currentSkill==skill_ABI_DUPLE_LIGHT) || // Shadow Archbishop Gloves
	// (EquipNumSearch( 1831 ) && currentSkill==skill_SUR_RAMPAGE_BLASTER) || // Shadow Sura Gloves
	(EquipNumSearch(1833) && currentSkill == skill_SHA_TRIANGLE_SHOT) || // Shadow Shadowchaser Gloves
	// (EquipNumSearch( 1834 ) && currentSkill==skill_WAR_DRAIN_LIFE) || // Shadow Warlock Gloves
	(EquipNumSearch(1836) && currentSkill == skill_RAN_CLUSTER_BOMB)
	) {
	// Shadow Ranger Gloves
	testSkMod += n_A_SHADOW_WEAPON_DEF_PLUS * 5;
	}

	if (
	EquipNumSearch(1860) &&
	EquipNumSearch(1193) &&
	currentSkill == skill_RAN_ARROW_STORM
	) {
	// "Feathered Tricorn" + "Piece OF Angent Skin"
	testSkMod += Math.floor(n_A_SHOULDER_DEF_PLUS / 2) * 12;
	}
	if (
	EquipNumSearch(1860) &&
	EquipNumSearch(996) &&
	currentSkill == skill_MIWA_SEVERE_RAINSTORM
	) {
	// "Feathered Tricorn" + "Leather of Tendrilion"
	testSkMod += Math.floor(n_A_SHOULDER_DEF_PLUS / 2) * 7;
	}
	if (
	EquipNumSearch(1860) &&
	EquipNumSearch(315) &&
	currentSkill == skill_SHA_TRIANGLE_SHOT
	) {
	// "Feathered Tricorn" + "Ancient Cape"
	testSkMod += Math.floor(n_A_SHOULDER_DEF_PLUS / 2) * 15;
	}
	if (EquipNumSearch(1943)) {
	//General's Helmet + Gungnir
	if (currentSkill == skill_ROY_VANISHING_POINT) {
		testSkMod += 7 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	}
	if (EquipNumSearch(1945)) {
	//General's Helmet + Quadrille
	if (currentSkill == skill_SUR_TIGER_CANNON) {
		testSkMod += 7 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	}
	if (currentSkill == skill_SUM_LUNATIC_CARROT_BEAT) {
	if (EquipNumSearch(1993)) {
		//"Shadow Doram Battler Shield"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) {
		testSkMod += 5;
		}
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) {
		testSkMod += 5;
		}
	}
	if (EquipNumSearch(1997)) {
		//"Shadow Doram Battler Armor"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 3;
	}
	}
	if (currentSkill == skill_SUM_CATNIP_METEOR) {
	if (EquipNumSearch(1994)) {
		//"Shadow Doram Mage Shield"
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) {
		testSkMod += 5;
		}
		if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) {
		testSkMod += 5;
		}
	}
	}
	if (currentSkill == skill_SUM_SILVERVINE_STEM_SPEAR) {
	if (EquipNumSearch(1998)) {
		//"Shadow Doram Mage Armor"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 3;
	}
	}
	if (currentSkill == skill_NIN_FLAMING_PETALS) {
	if (EquipNumSearch(2007)) {
		//"Shadow Oboro Armor"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 5;
	}
	if (EquipNumSearch(2589)) {
		//Wind Spear Petal Shadow Earring + Wind Spear Wind Spear Petal Shadow Pendant + Wind Spear Petal Shadow Shoes
		testSkMod +=
		(n_A_SHADOW_EARRING_DEF_PLUS +
			n_A_SHADOW_PENDANT_DEF_PLUS +
			n_A_SHADOW_SHOES_DEF_PLUS) /
		2;
	}
	}
	if (currentSkill == skill_NIN_FREEZING_SPEAR) {
	if (EquipNumSearch(2007)) {
		//"Shadow Oboro Armor"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 5;
	}
	if (EquipNumSearch(2589)) {
		//Wind Spear Petal Shadow Earring + Wind Spear Wind Spear Petal Shadow Pendant + Wind Spear Petal Shadow Shoes
		testSkMod +=
		(n_A_SHADOW_EARRING_DEF_PLUS +
			n_A_SHADOW_PENDANT_DEF_PLUS +
			n_A_SHADOW_SHOES_DEF_PLUS) /
		2;
	}
	}
	if (currentSkill == skill_NIN_WIND_BLADE) {
	if (EquipNumSearch(2007)) {
		//"Shadow Oboro Armor"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 5;
	}
	if (EquipNumSearch(2589)) {
		//Wind Spear Petal Shadow Earring + Wind Spear Wind Spear Petal Shadow Pendant + Wind Spear Petal Shadow Shoes
		testSkMod +=
		(n_A_SHADOW_EARRING_DEF_PLUS +
			n_A_SHADOW_PENDANT_DEF_PLUS +
			n_A_SHADOW_SHOES_DEF_PLUS) /
		2;
	}
	}
	if (currentSkill == skill_KAG_SWIRLING_PETAL) {
	if (EquipNumSearch(2008)) {
		//"Shadow Kagerou Armor"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 5;
	}
	}
	if (currentSkill == skill_KAG_SPINTHROW_KUNAI) {
	if (EquipNumSearch(2011)) {
		//"Shadow Kagerou Boots"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 5;
	}
	}
	if (currentSkill == skill_REB_GODS_HAMMER) {
	if (EquipNumSearch(2012)) {
		//"Shadow Rebellion Boots"
		testSkMod += n_A_SHADOW_BODY_DEF_PLUS * 5;
	}
	}
	if (currentSkill == skill_MEC_AXE_BOOMERANG) {
	if (CardNumSearch(656) && n_A_Weapon_ATKplus >= 10) {
		//Step Card
		testSkMod += CardNumSearch(656) * 30;
	}
	}
	if (currentSkill == skill_MEC_ARM_CANNON) {
	// if(CardNumSearch(657) && n_A_BODY_DEF_PLUS >= 10)
	// { //Rock Step Card
	// testSkMod += 20;
	// }
	if (EquipNumSearch(2218)) {
		// Old Driver Band (Yellow) [1]
		testSkMod += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}
	if (currentSkill == skill_MEC_VULCAN_ARM) {
	if (CardNumSearch(659) && n_A_Weapon_ATKplus >= 10) {
		//Rock Step Card
		testSkMod += CardNumSearch(659) * 20;
	}
	}
	if (currentSkill == skill_MEC_AXE_TORNADO && EquipNumSearch(2085)) {
	//"Dog Cap + Tornado Axe"
	testSkMod += 15 * Math.floor(n_A_Weapon_ATKplus / 2);
	}
	if (currentSkill == skill_SUR_TIGER_CANNON && EquipNumSearch(2074)) {
	//Claws of the Bifrost
	testSkMod += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if (
	(currentSkill == skill_RUN_DRAGON_BREATH ||
		currentSkill == skill_RUN_DRAGON_BREATH_WATER) &&
	EquipNumSearch(2051)
	) {
	//Dragon Slayer (Ancient Weapon)
	testSkMod += 5 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if (
	(currentSkill == skill_RUN_SONIC_WAVE && EquipNumSearch(2050)) || //Runic Katana
	(currentSkill == skill_MEC_AXE_TORNADO && EquipNumSearch(2067)) || //Avenger
	(currentSkill == skill_MEC_VULCAN_ARM && EquipNumSearch(2068)) || //Big Badaboom
	(currentSkill == skill_GEN_CART_TORNADO && EquipNumSearch(2070))
	) {
	//Slate Sword
	testSkMod += 10 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if (
	(currentSkill == skill_RAN_ARROW_STORM && EquipNumSearch(2061)) || //Empyrean
	(currentSkill == skill_WAR_EARTH_STRAIN && EquipNumSearch(2063)) || //Rusty Dragon's Wand
	// (currentSkill == skill_WAR_JACK_FROST && EquipNumSearch(2064))	 || //Wand of the Purple Orb
	(currentSkill == skill_SOR_EARTH_GRAVE && EquipNumSearch(2065))
	) {
	//Shadow Eater
	testSkMod += 12 * Math.floor(n_A_Weapon_ATKplus / 3);
	}
	if (currentSkill == skill_ABI_DUPLE_LIGHT && EquipNumSearch(2071)) {
	//All-Holy Book
	testSkMod += 25 * Math.floor(n_A_Weapon_ATKplus / 3);
	}

	if (
	(currentSkill == skill_MIWA_SEVERE_RAINSTORM &&
		EquipNumSearch(2054) &&
		n_A_Weapon_ATKplus >= 9) || //"Bow of Narcissus"
	((currentSkill == skill_MEC_VULCAN_ARM ||
		currentSkill == skill_MEC_ARM_CANNON) &&
		EquipNumSearch(2068) &&
		n_A_Weapon_ATKplus >= 9) || //Big Badaboom
	(currentSkill == skill_SUR_RAMPAGE_BLASTER &&
		EquipNumSearch(2073) &&
		n_A_Weapon_ATKplus >= 9)
	) {
	//Iron Claw
	testSkMod += 10;
	}
	if (
	((currentSkill == skill_ROY_SPEAR_CANNON ||
		currentSkill == skill_ROY_VANISHING_POINT) &&
		EquipNumSearch(2052) &&
		n_A_Weapon_ATKplus >= 7) || //Trident of Undine
	(currentSkill == skill_GEN_CART_CANNON &&
		EquipNumSearch(2069) &&
		n_A_Weapon_ATKplus >= 9) || //Sword of Blue Fire
	(currentSkill == skill_SUR_TIGER_CANNON &&
		EquipNumSearch(2074) &&
		n_A_Weapon_ATKplus >= 9) || //Claws of the Bifrost
	(currentSkill == skill_REB_DRAGON_TAIL &&
		EquipNumSearch(2081) &&
		n_A_Weapon_ATKplus >= 7) || //Big Game Trophy
	(currentSkill == skill_REB_ROUND_TRIP &&
		EquipNumSearch(2082) &&
		n_A_Weapon_ATKplus >= 7)
	) {
	//Guttling Gun
	testSkMod += 15;
	if (
		(currentSkill == skill_REB_DRAGON_TAIL &&
		EquipNumSearch(2081) &&
		n_A_Weapon_ATKplus >= 11) || //Big Game Trophy
		(currentSkill == skill_REB_ROUND_TRIP &&
		EquipNumSearch(2082) &&
		n_A_Weapon_ATKplus >= 11)
	)
		//Guttling Gun
		testSkMod += 15;
	}
	if (
	(currentSkill == skill_GLT_ROLLING_CUTTER &&
		EquipNumSearch(2058) &&
		n_A_Weapon_ATKplus >= 9) || //Steel Flower
	((currentSkill == skill_ROY_SPEAR_CANNON ||
		currentSkill == skill_ROY_VANISHING_POINT) &&
		EquipNumSearch(2052) &&
		n_A_Weapon_ATKplus >= 11) || //Trident of Undine
	(currentSkill == skill_GEN_CART_TORNADO &&
		EquipNumSearch(2070) &&
		n_A_Weapon_ATKplus >= 9)
	) {
	//Slate Sword
	testSkMod += 20;
	}
	if (
	currentSkill == skill_KAG_CROSS_STRIKE &&
	EquipNumSearch(2084) &&
	n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus >= 14
	) {
	//Kagero & Oboro Dual Dagger Set
	testSkMod += 25;
	if (
		currentSkill == skill_KAG_CROSS_STRIKE &&
		EquipNumSearch(2084) &&
		n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus >= 20
	) {
		//Kagero & Oboro Dual Dagger Set
		testSkMod += 25;
	}
	}
	if (
	(currentSkill == skill_ABI_DUPLE_LIGHT &&
		EquipNumSearch(2071) &&
		n_A_Weapon_ATKplus >= 11) || //All-Holy Book
	(currentSkill == skill_KAG_SWIRLING_PETAL &&
		EquipNumSearch(2075) &&
		n_A_Weapon_ATKplus >= 7)
	) {
	//Four Mirrors
	testSkMod += 30;
	}
	if (
	currentSkill == skill_RAN_AIMED_BOLT &&
	EquipNumSearch(2062) &&
	n_A_Weapon_ATKplus >= 9
	) {
	//Scarlet Dragon's Bow
	testSkMod += 35;
	}

	if (
	currentSkill == skill_MEC_AXE_BOOMERANG &&
	EquipNumSearch(2067) &&
	n_A_Weapon_ATKplus >= 9
	) {
	//Avenger
	testSkMod += 40;
	}
	if (
	currentSkill == skill_MA_COLD_BOLT ||
	currentSkill == skill_MA_FIRE_BOLT ||
	currentSkill == skill_MA_LIGHTNING_BOLT
	) {
	if (CardNumSearch(672) && n_A_WeaponType == weapTyp_BOOK) {
		//Ju Card
		testSkMod += 20 * CardNumSearch(672);
		if (n_A_Weapon_ATKplus >= 14) testSkMod += 20 * CardNumSearch(672);
	}
	}
	if (
	currentSkill == skill_REB_ANTI_MATERIAL_BLAST ||
	currentSkill == skill_REB_GODS_HAMMER
	) {
	if (CardNumSearch(690)) {
		//Captain Ferlock Card
		if (n_A_Weapon_ATKplus >= 10) testSkMod += 30 * CardNumSearch(672);
	}
	}
	if (
	currentSkill == skill_REB_ANTI_MATERIAL_BLAST ||
	currentSkill == skill_REB_MASS_SPIRAL
	) {
	if (EquipNumSearch(2242)) {
		//Finisher [2]
		if (n_A_Weapon_ATKplus >= 7) testSkMod += 30;
	}
	}
	if (currentSkill == skill_REB_SHATTERING_STORM) {
	if (EquipNumSearch(2243)) {
		//Dustfire [2]
		if (n_A_Weapon_ATKplus >= 7) testSkMod += 15;
	}
	}
	if (currentSkill == skill_REB_VANISHING_BUSTER) {
	if (EquipNumSearch(2243)) {
		//Dustfire [2]
		if (n_A_Weapon_ATKplus >= 9) testSkMod += 15;
	}
	}
	if (currentSkill == skill_REB_FIRE_RAIN) {
	if (EquipNumSearch(2244)) {
		//Burning Rose [2]
		if (n_A_Weapon_ATKplus >= 7) testSkMod += 30;
	}
	}
	if (currentSkill == skill_REB_DRAGON_TAIL) {
	if (EquipNumSearch(2245)) {
		//Avenger [2]
		if (n_A_Weapon_ATKplus >= 7) testSkMod += 15;
	}
	}
	if (
	(EquipNumSearch(2279) && currentSkill == skill_RUN_DRAGON_BREATH) || // Wyrmeater's Shadow Pendant
	(EquipNumSearch(2280) && currentSkill == skill_SUR_TIGER_CANNON) || // Tiger Spirit Shadow Pendant
	(EquipNumSearch(2282) && currentSkill == skill_PR_MAGNUS_EXORCISMUS) || // Exorcist Shadow Pendant
	(EquipNumSearch(2283) && currentSkill == skill_RAN_AIMED_BOLT) || // Rondius' Shadow Pendant
	(EquipNumSearch(2284) && currentSkill == skill_ROY_RAY_OF_GENESIS) || // Gunther's Shadow Pendant
	(EquipNumSearch(2285) && currentSkill == skill_MEC_ARM_CANNON) || // Talos' Shadow Pendant
	(EquipNumSearch(2286) && currentSkill == skill_SOR_VARETYR_SPEAR) || // Sylphir's Shadow Pendant
	(EquipNumSearch(2288) && currentSkill == skill_WAR_EARTH_STRAIN) || // Osma's Shadow Pendant
	(EquipNumSearch(2289) && currentSkill == skill_CG_ARROW_VULCAN) || // Garmia's Shadow Pendant
	(EquipNumSearch(2290) && currentSkill == skill_GEN_CART_CANNON)
	) {
	// Boscard's Shadow Pendant
	testSkMod += 2 * Math.floor(n_A_SHADOW_PENDANT_DEF_PLUS / 2);
	}

	if (EquipNumSearch(2287) && currentSkill == skill_WI_METEOR_STORM)
	// Dordaleon's Shadow Pendant
	testSkMod += 3 * Math.floor(n_A_SHADOW_PENDANT_DEF_PLUS / 2);

	if (
	(EquipNumSearch(2294) && currentSkill == skill_PR_MAGNUS_EXORCISMUS) || // Exorcist Shadow Set
	(EquipNumSearch(2295) && currentSkill == skill_RAN_AIMED_BOLT) || // Rondius' Shadow Set
	(EquipNumSearch(2296) && currentSkill == skill_ROY_RAY_OF_GENESIS) || // Gunther's Shadow Set
	(EquipNumSearch(2298) && currentSkill == skill_SOR_VARETYR_SPEAR) || // Sylphir's Shadow Set
	(EquipNumSearch(2299) && currentSkill == skill_SOR_PSYCHIC_WAVE) || // Dordaleon's Shadow Set
	(EquipNumSearch(2300) && currentSkill == skill_WAR_EARTH_STRAIN) || // Osma's	Shadow Set
	(EquipNumSearch(2301) && currentSkill == skill_CG_ARROW_VULCAN)
	)
	// Garmia's	Shadow Set
	testSkMod +=
		n_A_SHADOW_WEAPON_DEF_PLUS +
		n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS;

	if (
	(EquipNumSearch(2297) && currentSkill == skill_MEC_ARM_CANNON) || // Talos' Shadow Set
	(EquipNumSearch(2302) && currentSkill == skill_GEN_CART_CANNON)
	)
	// Boscard's Shadow Set
	testSkMod += Math.floor(
		(n_A_SHADOW_WEAPON_DEF_PLUS +
		n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS) /
		2
	);

	if (EquipNumSearch(2304) && currentSkill == skill_SUR_TIGER_CANNON) {
	//Sura set
	// testSkMod += Math.floor((n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS));
	}
	if (EquipNumSearch(2303) && currentSkill == skill_RUN_DRAGON_BREATH) {
	//Rune Knight Set
	testSkMod += n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS;
	}

	if (EquipNumSearch(2316) && currentSkill == skill_REB_FIRE_DANCE) {
	//Rune Knight Set
	//Dog Cap + Dark Rose
	testSkMod += 6 * Math.floor(n_A_Weapon_ATKplus / 2);
	}

	if (EquipNumSearch(2587) && currentSkill == skill_REB_FIRE_DANCE) {
	//Rune Knight Set
	//Fire Dance Shadow Earring + Fire Dance Shadow Pendant + Fire Fire Dance Shadow Shoes
	testSkMod +=
		(n_A_SHADOW_EARRING_DEF_PLUS +
		n_A_SHADOW_PENDANT_DEF_PLUS +
		n_A_SHADOW_SHOES_DEF_PLUS) /
		2;
	}

	// if(currentSkill == )
	// {
	// if(EquipNumSearch() && n_A_Weapon_ATKplus >= )
	// { //
	// testSkMod += 10 * Math.floor(n_A_Weapon_ATKplus / 3);
	// }
	// }

	// if ( EquipNumSearch( 1399 ) && currentSkill == skill_RAN_ARROW_STORM)
	// { // Giant Crossbow
	// testSkMod += 5 * n_A_Weapon_ATKplus;
	// }

	if (currentSkill == skill_MIWA_REVERBERATION) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(727); //True Alphoccio Basil
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(727); //True Alphoccio Basil
	}

	if (currentSkill == skill_SOR_VARETYR_SPEAR) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(728); //True Celia Alde
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(728); //True Celia Alde
	if (EquipNumSearch(2224)) {
		// Old Wind Whisper [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_SUR_RAMPAGE_BLASTER) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(729); //True Chen Lio
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(729); //True Chen Lio
	if (EquipNumSearch(2223)) {
		// Old Blazing Soul [1]
		testSkMod += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_GLT_CROSS_IMPACT) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4) {
		for (var i = 0; i < 4; i++) {
		if (n_A_card[card_loc_WEAPON_I + i] == 730) {
			//True Eremes Guile
			testSkMod += 20;
			if (n_A_Weapon_ATKplus >= 10) testSkMod += 20;
		}
		}
	}
	if (ItemOBJ[n_A_Equip[eq_LEFT_WEAPON]][itm_WLVL] == 4) {
		for (var i = 0; i < 4; i++) {
		if (n_A_card[card_loc_WEAPONII_I + i] == 730) {
			//True Eremes Guile
			testSkMod += 20;
			if (n_A_Weapon_ATKplus >= 10) testSkMod += 20;
		}
		}
	}
	if (EquipNumSearch(2227)) {
		// Old Bone Circlet [1]
		testSkMod += 10 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_GEN_CART_TORNADO) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(731); //True Flamel Emure
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(731); //True Flamel Emure
	}

	if (currentSkill == skill_SHA_FEINT_BOMB) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4) {
		for (var i = 0; i < 4; i++) {
		if (n_A_card[card_loc_WEAPON_I + i] == 732) {
			//True Gertie Wie
			testSkMod += 20;
			if (n_A_Weapon_ATKplus >= 10) testSkMod += 20;
		}
		}
	}
	if (ItemOBJ[n_A_Equip[eq_LEFT_WEAPON]][itm_WLVL] == 4) {
		for (var i = 0; i < 4; i++) {
		if (n_A_card[card_loc_WEAPONII_I + i] == 732) {
			//True Gertie Wie
			testSkMod += 20;
			if (n_A_Weapon_ATKplus >= 10) testSkMod += 20;
		}
		}
	}
	}

	if (currentSkill == skill_MEC_AXE_TORNADO) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(733); //True Howard Alt-Eisen
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(733); //True Howard Alt-Eisen
	}

	if (currentSkill == skill_WAR_CRIMSON_ROCK) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(734); //True Kathryne Keyron
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(734); //True Kathryne Keyron
	}

	if (currentSkill == skill_ABI_ADORAMUS) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(735); //True Margaretha Sorin
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(735); //True Margaretha Sorin
	}

	if (currentSkill == skill_ROY_EARTH_DRIVE) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(736); //True Randel Lawrence
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(736); //True Randel Lawrence
	}

	if (currentSkill == skill_RUN_IGNITION_BREAK) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(737); //True Seyren Windsor
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(737); //True Seyren Windsor
	if (EquipNumSearch(2215)) {
		// Old Rune Circlet [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_RAN_CLUSTER_BOMB) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(738); //True Cecil Damon
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(738); //True Cecil Damon
	if (EquipNumSearch(2226)) {
		// Old Camouflage Bunny Hood [1]
		testSkMod += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_MIWA_SEVERE_RAINSTORM) {
	if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
		testSkMod += 20 * CardNumSearch(739); //True Trentini
	if (n_A_Weapon_ATKplus >= 10) testSkMod += 20 * CardNumSearch(739); //True Trentini
	if (
		EquipNumSearch(2220) || // Old Maestro Song's Hat [1]
		EquipNumSearch(2225)
	) {
		// Old Dying Swan [1]
		testSkMod += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_RUN_HUNDRED_SPEAR) {
	if (EquipNumSearch(2215)) {
		// Old Rune Circlet [1]
		testSkMod += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_ABI_JUDEX) {
	if (EquipNumSearch(2216)) {
		// Old Mitra [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}
	if (currentSkill == skill_PR_MAGNUS_EXORCISMUS) {
	if (EquipNumSearch(2216)) {
		// Old Mitra [1]
		testSkMod += 10 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (
	currentSkill == skill_MEC_POWER_SWING ||
	currentSkill == skill_MEC_AXE_TORNADO
	) {
	if (EquipNumSearch(2217)) {
		// Old Driver Band (Red) [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_SHA_TRIANGLE_SHOT) {
	if (EquipNumSearch(2219)) {
		// Old Shadow Handicraft [1]
		testSkMod += 25 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_CG_ARROW_VULCAN) {
	if (
		EquipNumSearch(2220) || // Old Maestro Song's Hat [1]
		EquipNumSearch(2225)
	) {
		// Old Dying Swan [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_GEN_CART_CANNON) {
	if (EquipNumSearch(2221)) {
		// Old Midas Whisper [1]
		testSkMod += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_WAR_SOUL_EXPANSION) {
	if (EquipNumSearch(2222)) {
		// Old Magic Stone Hat [1]
		testSkMod += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_SUR_LIGHTNING_RIDE) {
	if (EquipNumSearch(2223)) {
		// Old Blazing Soul [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_SOR_POISON_BUSTER) {
	if (EquipNumSearch(2224)) {
		// Old Wind Whisper [1]
		testSkMod += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_RAN_WARG_STRIKE) {
	if (EquipNumSearch(2226)) {
		// Old Camouflage Bunny Hood [1]
		testSkMod += 10 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_GLT_CROSS_RIPPER_SLASHER) {
	if (EquipNumSearch(2227)) {
		// Old Bone Circlet [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}

	if (currentSkill == skill_ROY_SPEAR_CANNON) {
	if (EquipNumSearch(2228)) {
		// Old Casket of Protection [1]
		testSkMod += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}
	if (currentSkill == skill_ROY_OVERBRAND) {
	if (EquipNumSearch(2228)) {
		// Old Casket of Protection [1]
		testSkMod += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
	}
	}
	if (currentSkill == skill_KAG_THROW_EXPLOSIVE_KUNAI) {
	if (EquipNumSearch(2318)) {
		//Monokage
		testSkMod += SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE);
	}
	}

	if (EquipNumSearch(2414)) {
	//Rebellion's Scarf
	if (currentSkill == skill_REB_FIRE_RAIN) {
		testSkMod += 5 * SkillSearch(skill_REB_FIRE_RAIN);
	}
	if (currentSkill == skill_REB_MASS_SPIRAL) {
		testSkMod += 5 * SkillSearch(skill_REB_MASS_SPIRAL);
	}
	if (currentSkill == skill_REB_QUICK_DRAW_SHOT) {
		testSkMod += 5 * SkillSearch(skill_REB_ETERNAL_CHAIN);
	}
	if (currentSkill == skill_REB_SHATTERING_STORM) {
		testSkMod += 10 * SkillSearch(skill_REB_SHATTERING_STORM);
	}
	}

	if (currentSkill == skill_ROY_SHIELD_PRESS) {
	if (EquipNumSearch(2416)) {
		//Imperial Ring + Imperial Guard
		if (n_A_LEFT_DEF_PLUS >= 5) testSkMod += 8 * (n_A_LEFT_DEF_PLUS - 5);
	}
	}
	if (EquipNumSearch(2460) && n_A_HEAD_DEF_PLUS >= 9) {
	//Magician's Night Cap
	if (
		currentSkill == skill_MA_FIRE_BOLT ||
		currentSkill == skill_MA_COLD_BOLT ||
		currentSkill == skill_MA_LIGHTNING_BOLT
	) {
		testSkMod += Math.floor(n_A_BaseLV / 5) * 3;
	}
	}
	if (CardNumSearch(842)) {
	//Heart Hunter Bellare Card
	if (n_A_WeaponType == weapTyp_HANDGUN) {
		if (n_A_Weapon_ATKplus >= 10 && currentSkill == skill_REB_FIRE_RAIN)
		testSkMod += 15;
	}
	}
	if (CardNumSearch(843)) {
	//Mutant Heart Hunter Bellare Card
	if (n_A_WeaponType == weapTyp_GATLING_GUN) {
		if (n_A_Weapon_ATKplus >= 10 && currentSkill == skill_REB_ROUND_TRIP)
		testSkMod += 10;
	}
	}
	if (
	currentSkill == skill_PR_MAGNUS_EXORCISMUS ||
	currentSkill == skill_AC_HOLY_LIGHT ||
	currentSkill == skill_AC_HOLY_LIGHT_SL ||
	currentSkill == skill_PR_HOLY_LIGHT_SL ||
	currentSkill == skill_ABI_ADORAMUS ||
	currentSkill == skill_ABI_JUDEX
	) {
	if (SkillSearch(skill_HP_BASILICA)) {
		testSkMod += 3 * SkillSearch(skill_HP_BASILICA);
	}
	}
	if (
	currentSkill === skill_MA_NAPALM_BEAT ||
	currentSkill === skill_MA_SOUL_STRIKE ||
	currentSkill === skill_HW_NAPALM_VULCAN
	) {
	if (n_A_JobSearch() === cls_MAG) {
		// Banshee card gives a bonus to mages who use these skills
		testSkMod += 20 * CardNumSearch(card_HEAD_BANSHEE);
	}
	}

	if (
	EquipNumSearch(2662) &&
	n_A_Arrow == arrTyp_FIRE &&
	(currentSkill === skill_RAN_ARROW_STORM ||
		currentSkill === skill_MIWA_SEVERE_RAINSTORM)
	) {
	// Elemental Tights + Burning Bow
	testSkMod += n_A_SHOULDER_DEF_PLUS * 5;
	} else if (
	EquipNumSearch(2663) &&
	n_A_Arrow == arrTyp_CRYSTAL &&
	(currentSkill === skill_RAN_ARROW_STORM ||
		currentSkill === skill_MIWA_SEVERE_RAINSTORM)
	) {
	// Elemental Tights + Freezing Bow
	testSkMod += n_A_SHOULDER_DEF_PLUS * 5;
	} else if (
	EquipNumSearch(2664) &&
	n_A_Arrow == arrTyp_STONE &&
	(currentSkill === skill_RAN_ARROW_STORM ||
		currentSkill === skill_MIWA_SEVERE_RAINSTORM)
	) {
	// Elemental Tights + Earthen Bow
	testSkMod += n_A_SHOULDER_DEF_PLUS * 5;
	} else if (
	EquipNumSearch(2665) &&
	n_A_Arrow == arrTyp_WIND &&
	(currentSkill === skill_RAN_ARROW_STORM ||
		currentSkill === skill_MIWA_SEVERE_RAINSTORM)
	) {
	// Elemental Tights + Gale Bow
	testSkMod += n_A_SHOULDER_DEF_PLUS * 5;
	}

	if (EquipNumSearch(2685) && currentSkill == skill_MIWA_METALLIC_SOUND) {
	//Traveler's Shoes
	testSkMod += 10 * SkillSearch(skill_MIWA_GLOOMY_SHYNESS);
	}

	if (
	EquipNumSearch(2687) &&
	currentSkill == skill_RAN_ARROW_STORM &&
	n_A_HEAD_DEF_PLUS >= 9
	) {
	//Autumn Headband
	testSkMod += Math.floor(n_A_BaseLV / 5);
	}
	if (EquipNumSearch(1267) && n_A_ActiveSkill == skill_SHA_FATAL_MENACE) {
	//Black Wing
	if (n_A_Equip[eq_WEAPON] == 1267 && n_A_Weapon_ATKplus >= 6)
		testSkMod += (n_A_Weapon_ATKplus - 5) * 2;
	if (n_A_Equip[eq_WEAPONII] == 1267 && n_A_Weapon2_ATKplus >= 6)
		testSkMod += (n_A_Weapon2_ATKplus - 5) * 2;
	}

	// if ( currentSkill==skill_WI_EARTH_SPIKE ||
	// currentSkill == skill_WI_HEAVENS_DRIVE )
	// {
	// if ( EquipNumSearch( 1146 ) )
	// { // Katyusha Flowers?
	// testSkMod += n_A_HEAD_DEF_PLUS;
	// }
	// }

	return (
	StPlusCalc2(bon_DMG_SKILL + currentSkill) +
	StPlusCard(bon_DMG_SKILL + currentSkill) +
	testSkMod
	);
}
