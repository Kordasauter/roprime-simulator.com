// init BattleCalculation
function calc() {
  // Init variables
  totalCastTime = 0;
  if(formElements["beta"])
    BETA = formElements["beta"].checked;

  // Init the damage strings.
  for (var i = 0; i < 3; i++) {
    InnStr[i] = "";
  }

  // Re-Calc all stats.
  StAllCalc();
  // Find Functional HIT.
  w_HIT = n_A_HIT - n_B_FLEE;
  w_HIT_EDP = w_HIT;
  w_HIT_EDP = Max(5, Min(w_HIT_EDP, 100)); // 5 <= x <= 100
  CalcHitAfterSpecialSkills();
  w_HIT_HYOUJI = w_HIT;

  // Find Critical Blow Chance.
  CalcCriticalBlowChance();

  // Find Trifecta Blow Chance.
  CalcTrifectaBlowChance();

  // Find Double Attack Chance.
  CalcDoubleAttackChance();

  // Duple light.
  CalcDupleLightChance();

  // Now Do something with the data.
  CalcFinalCriticalChance();

  damageType = kDmgTypeMelee;
  // Calculate damage.
  // I ADD 2 copies of this calculation because this function sets the ranged and magic property, used in GetBaseDmg.
  //I need to do this because I don't want to remake the entire program. XD
  /*CalcSkillDamage();
	InnStr[0] = "";
	InnStr[1] = "";
	InnStr[2] = "";*/
  CalcSkillDamageType();
  // Prep for damage calculations.
  baseDamage = GetBaseDmg(n_A_Weapon_element, false, 0);
  for (var i = 0; i < 3; i++) {
    // Initialize working damage with base damage.
    n_A_DMG[i] = baseDamage[i];

    // Criticals always take the max base damage.
    n_A_CriATK[i] = baseDamage[2];
  }

  // Apply Base Damage Mods
  CalcBaseDamageMods();

  // Calculate damage.

  if (BETA) {
    if(Skill[n_A_ActiveSkill].isMagic)
      CalcSkillDamage_old();
    else
    CalcSkillDamage(); //uncomment for beta
      console.log("beta");
  } else {
    CalcSkillDamage_old(); //comment for beta
  }

  // Display additional data.
  DisplayAdditionalBattleInfo();
}

// Things that will affect base damage before anything else
function CalcBaseDamageMods() {
  //MOVED THIS IN CALC ATTACK TO VIEW IN ATTACK WINDOW
  /*var baseDamageMod = 100;
	
	if ( n_A_ActiveSkill != skill_MO_OCCULT_IMPACTION &&
		 n_A_ActiveSkill != skill_MO_GUILLOTINE_FIST &&
		 n_A_ActiveSkill != skill_MO_MAX_GUILLOTINE_FIST )
	{
		if (SkillSearch(skill_SW_BERSERK))
			baseDamageMod += 32;
		else if (otherBuffs[ksProvoke])
			baseDamageMod += 2 + 3 * otherBuffs[ksProvoke];
		else if (otherBuffs[ksAloe])
			baseDamageMod += 5;
//		if (SkillSearch(skill_LK_SPEAR_DYNAMO))
//			baseDamageMod += SkillSearch(skill_LK_SPEAR_DYNAMO) * 5;
//		if (SkillSearch(skill_SN_FALCON_EYES))
//			baseDamageMod += SkillSearch(skill_SN_FALCON_EYES) * 2;
		if (battleChantBuffs[pass_V_ATK])
			baseDamageMod += 100;
		if (otherBuffs[ksMurderBonus])
			baseDamageMod += 10;
		if (StPlusCalc2(87))
			baseDamageMod += StPlusCalc2(87);
		if (miscEffects[ksCursed])
			baseDamageMod -= 25;
	}
	
	for ( var i = 0; i < 3; i++ )
	{ // apply to working damage and crit damage
		n_A_DMG[i] = n_A_DMG[i] * baseDamageMod / 100;
		n_A_CriATK[i] = n_A_CriATK[i] * baseDamageMod / 100;
	}*/
}

// skillmod + x - (start skillmod, critAtk:normalatk)
function CalcAtkMods02(skillMod, criticalAttack) {
  var localAttackMod = CalcSkillModAdditions(skillMod * 100);

  if (criticalAttack === 0) {
    // non-crit
    if (n_A_Weapon_element !== BK_Weapon_element) {
      n_A_DMG = GetBaseDmg(n_A_Weapon_element, false, 0);
    }

    n_A_DMG[0] = Math.floor((n_A_DMG[0] * localAttackMod) / 100);
    n_A_DMG[1] = Math.floor((n_A_DMG[1] * localAttackMod) / 100);
    n_A_DMG[2] = Math.floor((n_A_DMG[2] * localAttackMod) / 100);
  } else {
    // crit
    if (n_A_Weapon_element !== BK_Weapon_element) {
      n_A_CriATK = GetBaseDmg(n_A_Weapon_element, false, 0);
    }

    n_A_CriATK[0] = Math.floor((n_A_CriATK[0] * localAttackMod) / 100);
    n_A_CriATK[1] = Math.floor((n_A_CriATK[1] * localAttackMod) / 100);
    n_A_CriATK[2] = Math.floor((n_A_CriATK[2] * localAttackMod) / 100);
  }
}

// Calculates Falcon Damage
function CalcFalconDamage() {
  if (
    n_A_WeaponType == weapTyp_BOW &&
    SkillSearch(skill_HU_BLITZ_BEAT) &&
    n_A_ActiveSkill != skill_SN_FOCUSED_ARROW_STRIKE
  ) {
    hunterPetHits = Math.floor((n_A_JobLV - 1) / 10 + 1);
    if (hunterPetHits > 5) {
      hunterPetHits = 5;
    }
    wBTw2 = SkillSearch(skill_HU_BLITZ_BEAT);
    if (wBTw2 < hunterPetHits) {
      hunterPetHits = wBTw2;
    }
    // wBT = 80 + Math.floor( n_A_DEX / 10 )*2 + Math.floor( n_A_INT / 2 )*2 + SkillSearch( skill_HU_STEEL_CROW ) * 6;
    wBT =
      Math.floor(n_A_DEX / 10) * 2 +
      Math.floor(n_A_AGI / 2) * 2 +
      SkillSearch(skill_HU_STEEL_CROW) * 6 +
      SkillSearch(skill_HU_BLITZ_BEAT) * 20; //prime
    wBT = Math.floor((wBT * element[n_B[en_ELEMENT]][ele_NEUTRAL]) / 100);
    //wBT = tPlusDamCut(wBT);
    wBTw3 = Math.round((1 + n_A_LUK * 0.3) * 100) / 100;
    if (n_B[en_ID] == 547) {
      wBT = 0;
    }
    str_bSUBname += "Falcon Damage<BR>";
    hunterPetDamage = wBT * hunterPetHits;
    str_bSUB += hunterPetDamage + " (" + wBT + " x " + hunterPetHits + "Hit)";
    str_bSUB += "(" + wBTw3 + "% Chance)<BR>";
    wBT = (hunterPetDamage * wBTw3) / 100;
    wBT = (wBT * (w_HIT + ((100 - w_HIT) * criticalAttackChance) / 100)) / 100;
    hunterPetHits = 0;
    return Math.round(wBT * 100) / 100;
  } else {
    hunterPetDamage = 0;
    return 0;
  }
}

// Calculates Warg Damage
function CalcWargDamage() {
  if (
    n_A_WeaponType == weapTyp_BOW &&
    SkillSearch(skill_RAN_WARG_STRIKE) &&
    n_A_ActiveSkill != skill_SN_FOCUSED_ARROW_STRIKE
  ) {
    wargHits = 1;
    not_use_card = 1;
    noequipatk = true;
    var TMPATK = GetBaseDmg(
      ele_NEUTRAL,
      true,
      SkillSearch(skill_RAN_TOOTH_OF_WARG) * 30
    );
    noequipatk = false;
    //wBT = 80 + Math.floor( n_A_DEX / 10 ) * 2 + Math.floor( n_A_INT / 2 ) * 2 + SkillSearch( skill_RAN_TOOTH_OF_WARG ) * 30;
    for (i = 0; i < 3; i++) {
      TMPATK[i] = TMPATK[i] * SkillSearch(skill_RAN_WARG_STRIKE) * 2;
    }
    not_use_card = 0;
    //wBT = Math.floor( wBT * element[n_B[en_ELEMENT]][ele_NEUTRAL] / 100 );
    //wBT = tPlusDamCut(wBT);
    wBT = ApplyEnemyDefense(TMPATK[1], 2, 0);
    for (i = 0; i < 3; i++) {
      TMPATK[i] = tPlusDamCut(TMPATK[i]);
    }
    wBTw3 = Math.round((1 + n_A_LUK * 0.3) * 100) / 100;
    if (n_B[en_ID] === 547) {
      wBT = 0;
    }
    str_bSUBname += "Warg Damage<br/>";
    hunterPetDamage = wBT * wargHits;
    str_bSUB += hunterPetDamage + " (" + wBTw3 + "% Chance)<br/>";
    wBT = (hunterPetDamage * wBTw3) / 100;
    wBT = (wBT * (w_HIT + ((100 - w_HIT) * criticalAttackChance) / 100)) / 100;
    wargHits = 0;
    return Math.round(wBT * 100) / 100;
  } else {
    hunterPetDamage = 0;
    return 0;
  }
}

function CalcHitAfterSpecialSkills() {
  if (SkillSearch(skill_BS_WEAPONRY_RESEARCH)) {
    w_HIT = Math.floor(
      (w_HIT * (100 + 2 * SkillSearch(skill_BS_WEAPONRY_RESEARCH))) / 100
    );
  }
  if (n_A_ActiveSkill == skill_KN_PIERCE || n_A_ActiveSkill == skill_SW_BASH)
    w_HIT *= 1 + n_A_ActiveSkillLV * 0.05;
  if (
    (n_A_ActiveSkill == skill_AS_SONIC_BLOW ||
      n_A_ActiveSkill == skill_AS_SONIC_BLOW_SL) &&
    SkillSearch(skill_AS_SONIC_ACCELERATION)
  )
    w_HIT *= 1.5;
  if (n_A_ActiveSkill == skill_SW_MAGNUM_BREAK)
    w_HIT *= 1 + n_A_ActiveSkillLV * 0.1;
  if (n_A_ActiveSkill == skill_SN_FOCUSED_ARROW_STRIKE)
    w_HIT *= 1 + n_A_ActiveSkillLV * 0.1;
  if (n_A_ActiveSkill == skill_TK_COUNTER_KICK) w_HIT = 100;
  if (n_A_ActiveSkill == skill_CR_SHIELD_BOOMERANG_SL) w_HIT = 100;
  if (SkillSearch(skill_TKM_UNION)) w_HIT = 100;
  w_HIT = Max(5, Min(w_HIT, 100)); // 5 <= x <= 100

  if (StPlusCalc2(bon_CH_GUIDE_ATK) + StPlusCard(bon_CH_GUIDE_ATK))
    w_HIT =
      w_HIT +
      ((100 - w_HIT) *
        (StPlusCalc2(bon_CH_GUIDE_ATK) + StPlusCard(bon_CH_GUIDE_ATK))) /
        100;

  w_HIT = Math.floor(w_HIT * 100) / 100;

  if (Skill[n_A_ActiveSkill].accuracyCheck == false) w_HIT = 100;
}

function CalcCriticalBlowChance() {
  var bonusCrit = 0;
  if (n_A_ActiveSkill === skill_SN_FOCUSED_ARROW_STRIKE) {
    bonusCrit = 20;
  }
  if (n_A_ActiveSkill === skill_NIN_SHADOW_SLASH) {
    bonusCrit = 25 + n_A_ActiveSkillLV * 5;
  }

  var totalCrit = n_A_CRI + bonusCrit;
  criticalAttackChance = totalCrit - n_B[en_LUK] * 0.2 + 0.1; // CritShield

  if (monsterDebuffs[status_en_SLEEP]) {
    // Sleep doubles the chance for a crit
    criticalAttackChance *= 2;
  }

  criticalAttackChance = Max(0, Min(criticalAttackChance, 100)); // 0 <= x <= 100
}

function CalcTrifectaBlowChance() {
  trifectaBlowDamage = 0;
  trifectaBlowActivationRate = 0;
  if (SkillSearch(skill_MO_RAGING_TRIFECTA_BLOW)) {
    trifectaBlowActivationRate = 30 /* - SkillSearch( skill_MO_RAGING_TRIFECTA_BLOW )*/;
  }
  if (SkillSearch(skill_RUN_GIANT_GROWTH)) {
    trifectaBlowActivationRate = 15;
  }
  if (n_A_WeaponType == weapTyp_BOW && SkillSearch(skill_RAN_FEAR_BREEZE)) {
    var breezeLevel = SkillSearch(skill_RAN_FEAR_BREEZE);
    var breezeChance = 12;

    if (breezeLevel === 3) {
      breezeChance += 9;
    } else if (breezeLevel === 4) {
      breezeChance += 15;
    } else if (breezeLevel === 5) {
      breezeChance += 18;
    }
    trifectaBlowActivationRate = breezeChance;
  }
}

function CalcDupleLightChance() {
  if (SkillSearch(skill_ABI_DUPLE_LIGHT)) {
    dupleLightChance = SkillSearch(skill_ABI_DUPLE_LIGHT) * 2 + 10;
  }
}

function CalcDoubleAttackChance() {
  let doubleAttackRateMultiplier = 5;
  if(PATCH >= 2)
    doubleAttackRateMultiplier = 7;
  doubleAttackChance = SkillSearch(skill_TH_DOUBLE_ATTACK) * doubleAttackRateMultiplier;
  if (n_A_WeaponType != weapTyp_DAGGER) {
    // dagger only.
    doubleAttackChance = 0;
  }
  if (CardNumSearch(43)) {
    // Side Winder Card
    doubleAttackChance =  Max(SkillSearch(skill_TH_DOUBLE_ATTACK),1) * doubleAttackRateMultiplier;
  }
  if (EquipNumSearch(570) && n_A_WeaponType != weapTyp_NONE) {
    // Chick Hat
    doubleAttackChance =  Max(SkillSearch(skill_TH_DOUBLE_ATTACK),2) * doubleAttackRateMultiplier;
  }
  if (EquipNumSearch(1296) && n_A_WeaponType != weapTyp_NONE) {
    // Snake Head
    doubleAttackChance =  Max(SkillSearch(skill_TH_DOUBLE_ATTACK),5) * doubleAttackRateMultiplier;
  }
  if (EquipNumSearch(399)) {
    // Nagan
    doubleAttackChance =  Max(SkillSearch(skill_TH_DOUBLE_ATTACK),5) * doubleAttackRateMultiplier;
  }
  if (EquipNumSearch(2235)) {
    //Poison Forged Spear
    doubleAttackChance =  Max(SkillSearch(skill_TH_DOUBLE_ATTACK),5) * doubleAttackRateMultiplier;
  }
  if (EquipNumSearch(2460)) {
    //Magician's Night Cap
    doubleAttackChance =  Max(SkillSearch(skill_TH_DOUBLE_ATTACK),5) * doubleAttackRateMultiplier;
  }

  if (n_A_WeaponType === weapTyp_HANDGUN) {
    //Chain Action
    doubleAttackChance = SkillSearch(skill_GS_CHAIN_ACTION) * 5;
    if (CardNumSearch(43)) {
      // Side Winder Card
      doubleAttackChance =
        SkillSearch(skill_GS_CHAIN_ACTION) * 5 +
        ((100 - SkillSearch(skill_GS_CHAIN_ACTION) * 5) * (1 * doubleAttackRateMultiplier)) / 100;
    }
    if (EquipNumSearch(570)) {
      // Chick Hat
      doubleAttackChance =
        SkillSearch(skill_GS_CHAIN_ACTION) * 5 +
        ((100 - SkillSearch(skill_GS_CHAIN_ACTION) * 5) * (2 * doubleAttackRateMultiplier)) / 100;
    }
    if (EquipNumSearch(1296)) {
      // Snake Head
      doubleAttackChance =
        SkillSearch(skill_GS_CHAIN_ACTION) * 5 +
        ((100 - SkillSearch(skill_GS_CHAIN_ACTION) * 5) * (5 * doubleAttackRateMultiplier)) / 100;
    }
  }

  doubleAttackHit = w_HIT;
  if (doubleAttackChance != 0 && n_A_WeaponType != weapTyp_HANDGUN) {
    doubleAttackHit =
      (doubleAttackHit * (100 + SkillSearch(skill_TH_DOUBLE_ATTACK))) / 100;
    doubleAttackHit = Min(doubleAttackHit, 100);
  }
  return doubleAttackChance;
}

function CalcFinalCriticalChance() {
  meleeChanceAfterTrifecta = 100 - trifectaBlowActivationRate;
  w998B = (trifectaBlowActivationRate * w_HIT) / 100;
  w998C = trifectaBlowActivationRate - w998B;
  w998D = (meleeChanceAfterTrifecta * doubleAttackChance) / 100;
  w998E = (w998D * doubleAttackHit) / 100;
  w998F = w998D - w998E;
  w998G =
    ((100 - trifectaBlowActivationRate - w998D) * criticalAttackChance) / 100;
  w998H = 100 - trifectaBlowActivationRate - w998D - w998G;
  w998I = (w998H * w_HIT) / 100;
  w998J = w998H - w998I;
  w998K = w998B + w998E + w998G + w998I;
  w998L = 100 - w998K;

  if (
    n_A_ActiveSkill == skill_ALL_BASIC_ATTACK ||
    n_A_ActiveSkill == skill_SN_FOCUSED_ARROW_STRIKE ||
    n_A_ActiveSkill == skill_NIN_SHADOW_SLASH ||
    (n_A_ActiveSkill == skill_AS_POISON_REACT &&
      n_B[en_ELEMENT] >= ele_POISON * 10 &&
      n_B[en_ELEMENT] < ele_HOLY * 10)
  ) {
    w_HIT_HYOUJI = Math.floor(w998K * 100) / 100;
  }
}

// Calc Dmg from RAWDmg (rawDmg, (min,avg,max,crit:=10))
function CalcFinalDamage(damage, type) {
  var aura_blade = 0;
  if (n_A_WeaponType !== weapTyp_NONE && SkillSearch(skill_LK_AURA_BLADE)) {
    // aura blade
    aura_blade += n_A_BaseLV * (SkillSearch(skill_LK_AURA_BLADE) + 3);
  }

  damage = ApplyDamageModifiers(damage);
  damage = ApplySkillModifiers(damage);

  var critmod;
  critmod = CalcCriticalMod();

  if (type == 10) {
    damage = ApplyEnemyDefense(damage * 1.4, type, 0);
    if (SkillSearch(skill_RUN_GIANT_GROWTH) && damageType != kDmgTypeRanged) {
      let basedmg = GetBaseDmg(n_A_Weapon_element, false, 0);
      damage += basedmg[2] * 2.5;
    }
    // damage = ApplyEnemyDefense( damage * critmod, type, 0 );
  } else {
    damage = ApplyEnemyDefense(damage, type, 0);
    if (SkillSearch(skill_RUN_GIANT_GROWTH) && damageType != kDmgTypeRanged) {
      let basedmg = GetBaseDmg(n_A_Weapon_element, false, 0);
      damage += basedmg[type] * 2.5;
    }
  }
  damage += aura_blade;
  damage = Math.floor(tPlusDamCut(damage));
  // damage = ApplySkillModifiers( damage );
  damage = Max(0, damage);

  return Math.floor(damage);

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

// Calc Dmg from RAWDmg (rawDmg, (min,avg,max,crit:=10)), bypass def
function CalcFinalDamageBypassDef(damage, type) {
  var aura_blade = 0;
  if (n_A_WeaponType !== weapTyp_NONE && SkillSearch(skill_LK_AURA_BLADE)) {
    // aura blade
    aura_blade += n_A_BaseLV * (SkillSearch(skill_LK_AURA_BLADE) + 3);
  }

  damage = ApplyDamageModifiers(damage);
  damage = ApplySkillModifiers(damage);

  if (type == 10) {
    damage = damage * 1.4;
    if (SkillSearch(skill_RUN_GIANT_GROWTH) && damageType != kDmgTypeRanged) {
      let basedmg = GetBaseDmg(n_A_Weapon_element, false, 0);
      damage += basedmg[2] * 2.5;
    }
  } else {
    damage = damage;
    if (SkillSearch(skill_RUN_GIANT_GROWTH) && damageType != kDmgTypeRanged) {
      let basedmg = GetBaseDmg(n_A_Weapon_element, false, 0);
      damage += basedmg[type] * 2.5;
    }
  }
  damage += aura_blade;
  damage = Math.floor(tPlusDamCut(damage));
  damage = Max(0, damage);

  return Math.floor(damage);
}

function CalcRightHandDamage(w998) {
  trifectaDamage = w998B * trifectaBlowDamage;
  doubleAttackDamage = w998E * w998 * 2;
  critDamage = w998G * n_A_CriATK[1];
  dupleLightPhysicalDamage =
    ((dupleLightChance * w_HIT) / 100) * dupleLightPhysicalDamage;
  dupleLightMagicalDamage =
    ((dupleLightChance * w_HIT) / 100) * dupleLightMagicalDamage;
  normalDamage = w998I * w998;
  neverMissDamage = w998L * ApplyDamageModifiers(0);

  totalDamage =
    (dupleLightMagicalDamage +
      dupleLightPhysicalDamage +
      trifectaDamage +
      doubleAttackDamage +
      critDamage +
      normalDamage +
      neverMissDamage) /
    100;

  return totalDamage;
}

function CalcLeftHandDamage(w998) {
  wBC3L2 = 0;
  for (i = 4; i <= 7; i++) {
    if (cardOBJ[n_A_card[i]][0] == 106) {
      wBC3L2 += 5;
    }
  }

  wBC3_Normal = (w998 * w_HIT) / 100;
  wBC3_Miss = (wBC3L2 * (100 - w_HIT)) / 100;

  wBC3_X = wBC3_Normal + wBC3_Miss;

  wBC3_X = tPlusDamCut(wBC3_X);

  return wBC3_X;
}

// calcDef & DefIgnore - (rawAtk, (min,avg,max,crit:=10)dmg , left hand--> upgradeatk)
function ApplyEnemyDefense(damage, index, wBC4_3) {
  if (n_A_ActiveSkill == skill_HW_STAVE_CRASHER) {
    return (
      Math.floor(damage * defReduction(n_B[en_HARDDEF])) - n_B_DEF2[0] + wBC4_3
    );
  }

  if (n_A_ActiveSkill == skill_GS_WOUNDING_SHOT) {
    return damage + wBC4_3;
  }

  if (n_tok[bon_IGN_DEF_RC_FORMLESS + n_B[en_RACE]] >= 1) {
    return damage + wBC4_3;
  }

  if (n_tok[bon_IGN_DEF_NONBOSS] >= 1 && n_B[en_BOSS] == 0) {
    return damage + wBC4_3;
  }

  if (n_tok[bon_IGN_DEF_NONBOSS] >= 10) {
    return damage + wBC4_3;
  }

  if (SkillSearch(skill_TKM_UNION)) {
    return damage + wBC4_3;
  }

  for (var i = 0; i < 3; i++) {
    if (n_tok[bon_DEFIGN_SIZ_SMALL + i] > 0 && n_B[en_SIZE] == siz_SMALL + i) {
      return (
        Math.floor(
          damage *
            defReduction(
              n_B[en_HARDDEF] -
                n_B[en_HARDDEF] * (n_tok[bon_DEFIGN_SIZ_SMALL + i] / 100)
            )
        ) -
        n_B_DEF2[0] +
        wBC4_3
      );
    }
  }
  if (
    n_tok[bon_ICE_PICK] === 0 ||
    n_A_ActiveSkill == skill_KAG_THROW_EXPLOSIVE_KUNAI
  ) {
    // Player has no Ice Pick, apply defence
    damage =
      Math.floor(damage * defReduction(n_B[en_HARDDEF])) -
      n_B[en_SOFTDEF] +
      wBC4_3;
  } else {
    // Player has an Ice Pick, ignore defence
    damage += wBC4_3;
  }

  damage = Max(1, damage);

  return damage;
}

// % Dmg Mod - (startMod=100)
function ApplyDamageModifiers(damage) {
  var dmgMultiplier = 0;

  if (determiningEDPdamage == 0) {
    if (
      n_A_ActiveSkill == skill_TH_ENVENOM ||
      n_A_ActiveSkill == skill_HU_FANTASTIC_ARROW
    )
      damage += 15 * n_A_ActiveSkillLV;
    if (
      n_A_ActiveSkill == skill_AS_POISON_REACT &&
      (n_B[en_ELEMENT] < 50 || 60 <= n_B[en_ELEMENT])
    )
      damage += 75;
  }
  if (n_A_ActiveSkill == skill_GS_MAGICAL_BULLET)
    damage += Math.floor(
      n_A_MATK[w_MagiclBulet] * defReduction(n_B[en_HARDMDEF]) - n_B_MDEF2
    ); // MDef
  if (n_A_ActiveSkill == skill_GS_GUNSLINGER_MINE)
    damage += n_A_ActiveSkillLV * 50;

  // Ninja throwing
  if (n_A_ActiveSkill === skill_NIN_THROW_DAGGER) {
    damage += ShurikenOBJ[eval(document.calcForm.SkillSubNum.value)][0];
    damage += 3 * SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE);
    damage += 4 * n_A_ActiveSkillLV;
  }
  if (n_A_ActiveSkill === skill_NIN_THROW_KUNAI) {
    damage += KunaiOBJ[eval(document.calcForm.SkillSubNum.value)][0] * 3;
  }

  if (determiningEDPdamage == 0 && not_use_card == 0) {
    // Crit Bonus
    if (
      wCriTyuu == 1 &&
      n_A_ActiveSkill != skill_SN_FOCUSED_ARROW_STRIKE &&
      n_A_ActiveSkill != skill_NIN_SHADOW_SLASH
    ) {
      damage = Math.floor((damage * (100 + criticalMod)) / 100.0);
    }

    // What is this?
    damage = Math.floor(
      (damage *
        (100 +
          StPlusCalc2(1000 + n_B[en_ID]) +
          StPlusCard(1000 + n_B[en_ID]))) /
        100
    );

    if (SkillSearch(skill_LK_FRENZY)) {
      // Frenzy Doubles melee damage
      damage = damage * 2;
    }
    if (
      n_A_ActiveSkill == skill_AS_POISON_REACT &&
      50 <= n_B[en_ELEMENT] &&
      n_B[en_ELEMENT] < 60
    ) {
      damage = Math.floor((damage * (100 + 30 * n_A_ActiveSkillLV)) / 100);
    }

    if (
      n_A_WeaponType == weapTyp_KATAR &&
      SkillSearch(skill_AX_ADVANCED_KATAR_MASTERY)
    ) {
      // Advanced Katar Mastery Bonus
      damage = Math.floor(
        (damage * (110 + 2 * SkillSearch(skill_AX_ADVANCED_KATAR_MASTERY))) /
          100
      );
    }

    // TKM Solar, Lunar, and Stellar Bonuses to damage
    dmgMultiplier = 0;
    if (PlayerVersusPlayer === 0) {
      // PvM
      if (
        SkillSearch(skill_TKM_STELLAR_WRATH) &&
        SkillSearch(skill_TKM_SOLAR_PROTECTION)
      ) {
        dmgMultiplier +=
          (n_A_BaseLV + n_A_STR + n_A_LUK + n_A_DEX) /
          (12 - SkillSearch(skill_TKM_STELLAR_WRATH) * 3);
      } else if (
        SkillSearch(skill_TKM_STELLAR_WRATH) &&
        n_B[en_SIZE] == 2 &&
        n_B[en_HP] >= 17392
      ) {
        dmgMultiplier +=
          (n_A_BaseLV + n_A_STR + n_A_LUK + n_A_DEX) /
          (12 - SkillSearch(skill_TKM_STELLAR_WRATH) * 3);
      } else if (SkillSearch(skill_TKM_SOLAR_WRATH) && n_B[en_SIZE] == 0) {
        dmgMultiplier +=
          (n_A_BaseLV + n_A_LUK + n_A_DEX) /
          (12 - SkillSearch(skill_TKM_SOLAR_WRATH) * 3);
      } else if (
        SkillSearch(skill_TKM_LUNAR_WRATH) &&
        n_B[en_SIZE] == 1 &&
        n_B[en_HP] >= 5218
      ) {
        dmgMultiplier +=
          (n_A_BaseLV + n_A_LUK + n_A_DEX) /
          (12 - SkillSearch(skill_TKM_LUNAR_WRATH) * 3);
      }
    }

    damage = Math.floor((damage * (100 + dmgMultiplier)) / 100);
  }

  //PRIMA ERA QUI, MO SPOSTO!!!
  //damage = Math.floor(tPlusDamCut(damage));

  //damage = ApplySkillModifiers( damage );

  return damage;
}

// skillmod + x
function ApplySkillAdditions(skillMod) {
  // Power Thrust and Maximum Power Thrust
  if (SkillSearch(skill_MS_MAXIMUM_POWER_THUST)) {
    skillMod += 20 * SkillSearch(skill_MS_MAXIMUM_POWER_THUST);
  } else {
    if (SkillSearch(skill_BS_POWER_THRUST)) {
      skillMod += SkillSearch(skill_BS_POWER_THRUST) * 5;
    } else if (otherBuffs[ksPowerThrust]) {
      skillMod += 5;
    }
  }

  // Spear Dynamo
  if (SkillSearch(skill_LK_SPEAR_DYNAMO)) {
    skillMod += SkillSearch(skill_LK_SPEAR_DYNAMO) * 5;
  }

  // Falcon Eyes
  if (SkillSearch(skill_SN_FALCON_EYES)) {
    skillMod += SkillSearch(skill_SN_FALCON_EYES) * 2;
  }

  // Kihop
  if (SkillSearch(skill_TK_KIHOP)) {
    skillMod +=
      2 * SkillSearch(skill_TK_KIHOP) * SkillSearch(skill_TK_KIHOP_PARTY);
  }

  // Windmill Rush
  if (
    performerBuffs[ksMaestroSolo] === ksWindmillRush &&
    performerBuffs[ksMaestroSoloLevel] > 0
  ) {
    var skillBonus = performerBuffs[ksMaestroSoloLevel] * 6;
    var voiceLessonsBonus = performerBuffs[ksMaestroVoiceLessons];
    var jobLvlBonus = performerBuffs[ksMaestroJobLevel] * 0.2;

    skillMod += skillBonus + voiceLessonsBonus + jobLvlBonus;
  }

  return skillMod;
}

function ApplySkillModifiers(damage) {
  // Skill Multipliers
  dmgMultiplier = 0;
  if (n_A_ActiveSkill == skill_SW_BASH) {
    if (n_A_SHOES_DEF_PLUS >= 9 && CardNumSearch(362)) {
      // Freezer Card gives 10% to bash
      dmgMultiplier += 10;
    }
  }
  if (n_A_ActiveSkill == skill_KN_BOWLING_BASH) {
    if (n_A_WeaponType == weapTyp_SWORD || n_A_WeaponType == weapTyp_2HSWORD) {
      // Sword Guardian card bonus
      dmgMultiplier += 25 * CardNumSearch(464);
    }
  }
  if (n_A_ActiveSkill == skill_AR_ARROW_SHOWER) {
    if (n_A_WeaponType == weapTyp_BOW) {
      // Bow Guardian card bonus
      dmgMultiplier += 50 * CardNumSearch(465);
    }
  }
  if (n_A_ActiveSkill == skill_AR_DS) {
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1089)) {
      // Glorious Hunter Bow Bonus
      dmgMultiplier += 20;
    }
  }
  if (n_A_ActiveSkill == skill_GS_TRIGGER_HAPPY_SHOT) {
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1099)) {
      // glorious pistol increases trigger happy shot
      dmgMultiplier += 2 * n_A_Weapon_ATKplus;
    }
  }
  if (n_A_ActiveSkill == skill_GS_TRACKING) {
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1100)) {
      // glorious rifle
      dmgMultiplier += 3 * n_A_Weapon_ATKplus;
    }
  }
  if (n_A_ActiveSkill == skill_GS_SPREAD_SHOT) {
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1102)) {
      // glorious shotgun
      dmgMultiplier += 2 * n_A_Weapon_ATKplus;
    }
  }
  if (n_A_ActiveSkill == skill_GS_GUNSLINGER_MINE) {
    if (n_A_Weapon_ATKplus >= 9 && EquipNumSearch(1103)) {
      // glorious grenade launcher
      dmgMultiplier += 2 * n_A_Weapon_ATKplus;
    }
  }
  if (n_A_ActiveSkill == skill_GS_TRIPLE_ACTION) {
    if (
      EquipNumSearch(1100) ||
      EquipNumSearch(1101) ||
      EquipNumSearch(1102) ||
      EquipNumSearch(1103)
    ) {
      // glorious guns increase triple action by 30%
      dmgMultiplier += 30;
    }
  }
  if (
    n_A_ActiveSkill == skill_SW_BASH ||
    n_A_ActiveSkill == skill_KN_BOWLING_BASH
  ) {
    if (n_A_ActiveSkillLV == 10 && EquipNumSearch(1159)) {
      // Verteran Sword bonus
      dmgMultiplier += 50;
    }
  }
  if (n_A_ActiveSkill == skill_ME_MAMMONITE) {
    if (SU_LUK >= 90 && SU_DEX >= 90 && EquipNumSearch(1164)) {
      // Berchel Axe?
      dmgMultiplier += 15;
    }
  }
  if (n_A_ActiveSkill == skill_AX_METEOR_ASSAULT) {
    if (EquipNumSearch(1176) && SkillSearch(skill_AS_KATAR_MASTERY) == 10) {
      // Chakram
      dmgMultiplier += 20;
    }
  }
  if (trifectaBlowDamage == -1 && EquipNumSearch(639)) {
    // Combo Battle Glove +15% bonus to Trfecta and Quadruple
    dmgMultiplier += 15;
  }

  if (
    (n_A_ActiveSkill == skill_AS_SONIC_BLOW ||
      n_A_ActiveSkill == skill_AS_SONIC_BLOW_SL) &&
    SkillSearch(skill_AS_SONIC_ACCELERATION) &&
    determiningEDPdamage == 0
  ) {
    // Sonic Acceleration bonus to Sonic Blow
    dmgMultiplier += 10;
  }
  if (n_A_ActiveSkill === skill_MEC_AXE_TORNADO) {
    if (n_A_Weapon_element === ele_WIND) {
      // does more with wind element weapon
      dmgMultiplier += 25;
    }
  }
  // if ( (n_A_JOB == cls_KAGOB) && SkillSearch( skill_KAG_SUMMON_ELEMENTAL_SEAL ) &&
  // (n_A_ActiveSkill !== skill_KAG_THROW_EXPLOSIVE_KUNAI &&
  // n_A_ActiveSkill !== skill_KAG_OVERTHROW &&
  // n_A_ActiveSkill !== skill_NIN_THROW_COINS &&
  // n_A_ActiveSkill !== skill_ALL_BASIC_ATTACK))
  // { // Summon Elemental Seals damage multiplier
  // if (n_A_Weapon_element == ele_NEUTRAL + SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL ) && SkillSearch( skill_KAG_GET_ELEMENTAL_SEAL ) !== ele_EARTH)
  // dmgMultiplier += 10*SkillSearch( skill_KAG_SUMMON_ELEMENTAL_SEAL );
  // }
  if(PATCH >= 2)
  {
    if (SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL)) {
      switch (SkillSearch(skill_KAG_GET_ELEMENTAL_SEAL)) {
        case ele_WATER:
          if (n_A_ActiveSkill == skill_NIN_FREEZING_SPEAR)
            dmgMultiplier += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_SNOW_FLAKE_DRAFT)
            dmgMultiplier += 100 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          break;
        case ele_EARTH:
          break;
        case ele_FIRE:
          if (n_A_ActiveSkill == skill_NIN_FLAMING_PETALS)
            dmgMultiplier += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_BLAZE_SHIELD)
            dmgMultiplier += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_EXPLODING_DRAGON)
            dmgMultiplier += 15 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          break;
        case ele_WIND:
          if (n_A_ActiveSkill == skill_NIN_WIND_BLADE)
            dmgMultiplier += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_LIGHTNING_JOLT)
            dmgMultiplier += 15 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_FIRST_WIND)
            dmgMultiplier += 10 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          break;
        default:
          break;
      }
    }
  }
  else
  {
    if (SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL)) {
      switch (SkillSearch(skill_KAG_GET_ELEMENTAL_SEAL)) {
        case ele_WATER:
          if (n_A_ActiveSkill == skill_NIN_FREEZING_SPEAR)
            dmgMultiplier += 5 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_SNOW_FLAKE_DRAFT)
            dmgMultiplier += 25 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          break;
        case ele_EARTH:
          break;
        case ele_FIRE:
          if (n_A_ActiveSkill == skill_NIN_FLAMING_PETALS)
            dmgMultiplier += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_BLAZE_SHIELD)
            dmgMultiplier += 5 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_EXPLODING_DRAGON)
            dmgMultiplier += 100 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          break;
        case ele_WIND:
          if (n_A_ActiveSkill == skill_NIN_WIND_BLADE)
            dmgMultiplier += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_LIGHTNING_JOLT)
            dmgMultiplier += 20 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          if (n_A_ActiveSkill == skill_NIN_FIRST_WIND)
            dmgMultiplier += 100 * SkillSearch(skill_KAG_SUMMON_ELEMENTAL_SEAL);
          break;
        default:
          break;
      }
    }
  }
  if (
    SkillSearch(skill_SUM_SPIRIT_OF_LIFE) &&
    (n_A_ActiveSkill == skill_SUM_PICKY_PECK ||
      n_A_ActiveSkill == skill_SUM_SCAR_OF_TAROU ||
      n_A_ActiveSkill == skill_SUM_LUNATIC_CARROT_BEAT ||
      n_A_ActiveSkill == skill_SUM_SPIRIT_OF_SAVAGE)
  ) {
    var remainingHP = formElements["SkillSubNum"].value;
    // dmgMultiplier += 30 * remainingHP;
    damage = (damage * (100 + 30 * remainingHP)) / 100;
  }

  if (
    (EquipNumSearch(1723) && n_A_ActiveSkill == skill_CR_GRAND_CROSS) || // Shadow Crusader Armor
    (EquipNumSearch(1732) && n_A_ActiveSkill == skill_PR_MAGNUS_EXORCISMUS) || // Shadow Priest Armor
    (EquipNumSearch(1735) &&
      n_A_ActiveSkill == skill_MO_THROW_SPIRIT_SPHERES) || // Shadow Monk Armor
    (EquipNumSearch(1735) && n_A_ActiveSkill == skill_MO_OCCULT_IMPACTION) || // Shadow Monk Armor
    (EquipNumSearch(1741) && n_A_ActiveSkill == skill_RG_SIGHTLESS_MIND) || // Shadow Rogue Armor
    (EquipNumSearch(1744) && n_A_ActiveSkill == skill_WI_JUPITEL_THUNDER) || // Shadow Wizard Armor
    (EquipNumSearch(1750) && n_A_ActiveSkill == skill_HU_BLAST_MINE) || // Shadow Hunter Armor
    (EquipNumSearch(1750) && n_A_ActiveSkill == skill_HU_LAND_MINE)
  ) {
    // Shadow Hunter Armor
    dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 5;
  }

  if (
    (EquipNumSearch(1721) && n_A_ActiveSkill == skill_KN_PIERCE) || // Shadow Knight Boots
    (EquipNumSearch(1736) &&
      n_A_ActiveSkill == skill_MO_RAGING_QUADRUPLE_BLOW) || // Shadow Monk Boots
    (EquipNumSearch(1739) && n_A_ActiveSkill == skill_AS_GRIMTOOTH) || // Shadow Assassin Boots
    (EquipNumSearch(1748) && n_A_ActiveSkill == skill_SA_HEAVENS_DRIVE) || // Shadow Sage Boots
    (EquipNumSearch(1751) && n_A_ActiveSkill == skill_HU_BLITZ_BEAT) || // Shadow Hunter Boots
    (EquipNumSearch(1751) && n_A_ActiveSkill == skill_SN_FALCON_ASSAULT)
  ) {
    // Shadow Hunter Boots
    dmgMultiplier += n_A_SHADOW_SHOES_DEF_PLUS * 5;
  }

  if (
    (EquipNumSearch(1810) && n_A_ActiveSkill == skill_ROY_EARTH_DRIVE) || // Shadow Royalguard Shield
    (EquipNumSearch(1811) && n_A_ActiveSkill == skill_MEC_FLAME_LAUNCHER) || // Shadow Mechanic Shield
    // (EquipNumSearch( 1813 ) && n_A_ActiveSkill==skill_ABI_ADORAMUS) || // Shadow Archbishop Shield
    (EquipNumSearch(1814) && n_A_ActiveSkill == skill_SUR_SKY_NET_BLOW)
  ) {
    // Shadow Sura Shield
    // (EquipNumSearch( 1817 ) && n_A_ActiveSkill==skill_WAR_EARTH_STRAIN) ) // Shadow Warlock Shield
    dmgMultiplier += n_A_SHADOW_SHIELD_DEF_PLUS * 5;
  }

  if (
    (EquipNumSearch(1826) && n_A_ActiveSkill == skill_RUN_SONIC_WAVE) || // Shadow Runeknight Gloves
    (EquipNumSearch(1827) && n_A_ActiveSkill == skill_ROY_SPEAR_CANNON) || // Shadow Royalguard Gloves
    (EquipNumSearch(1828) && n_A_ActiveSkill == skill_MEC_VULCAN_ARM) || // Shadow Mechanic Gloves
    (EquipNumSearch(1829) && n_A_ActiveSkill == skill_GEN_CART_TORNADO) || // Shadow Genetic Gloves
    // (EquipNumSearch( 1830 ) && n_A_ActiveSkill==skill_ABI_DUPLE_LIGHT) || // Shadow Archbishop Gloves
    (EquipNumSearch(1831) && n_A_ActiveSkill == skill_SUR_RAMPAGE_BLASTER) || // Shadow Sura Gloves
    (EquipNumSearch(1833) && n_A_ActiveSkill == skill_SHA_TRIANGLE_SHOT) || // Shadow Shadowchaser Gloves
    // (EquipNumSearch( 1834 ) && n_A_ActiveSkill==skill_WAR_DRAIN_LIFE) || // Shadow Warlock Gloves
    (EquipNumSearch(1836) && n_A_ActiveSkill == skill_RAN_CLUSTER_BOMB)
  ) {
    // Shadow Ranger Gloves
    dmgMultiplier += n_A_SHADOW_WEAPON_DEF_PLUS * 5;
  }

  if (
    EquipNumSearch(1860) &&
    EquipNumSearch(1193) &&
    n_A_ActiveSkill == skill_RAN_ARROW_STORM
  ) {
    // "Feathered Tricorn" + "Piece OF Angent Skin"
    dmgMultiplier += Math.floor(n_A_SHOULDER_DEF_PLUS / 2) * 12;
  }
  if (
    EquipNumSearch(1860) &&
    EquipNumSearch(996) &&
    n_A_ActiveSkill == skill_MIWA_SEVERE_RAINSTORM
  ) {
    // "Feathered Tricorn" + "Leather of Tendrilion"
    dmgMultiplier += Math.floor(n_A_SHOULDER_DEF_PLUS / 2) * 7;
  }
  if (
    EquipNumSearch(1860) &&
    EquipNumSearch(315) &&
    n_A_ActiveSkill == skill_SHA_TRIANGLE_SHOT
  ) {
    // "Feathered Tricorn" + "Ancient Cape"
    dmgMultiplier += Math.floor(n_A_SHOULDER_DEF_PLUS / 2) * 15;
  }
  if (EquipNumSearch(1943)) {
    //General's Helmet + Gungnir
    if (n_A_ActiveSkill == skill_ROY_VANISHING_POINT) {
      dmgMultiplier += 7 * Math.floor(n_A_Weapon_ATKplus / 2);
    }
  }
  if (EquipNumSearch(1945)) {
    //General's Helmet + Quadrille
    if (n_A_ActiveSkill == skill_SUR_TIGER_CANNON) {
      dmgMultiplier += 7 * Math.floor(n_A_Weapon_ATKplus / 2);
    }
  }
  if (n_A_ActiveSkill == skill_SUM_LUNATIC_CARROT_BEAT) {
    if (EquipNumSearch(1993)) {
      //"Shadow Doram Battler Shield"
      if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) {
        dmgMultiplier += 5;
      }
      if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) {
        dmgMultiplier += 5;
      }
    }
    if (EquipNumSearch(1997)) {
      //"Shadow Doram Battler Armor"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 3;
    }
  }
  if (n_A_ActiveSkill == skill_SUM_CATNIP_METEOR) {
    if (EquipNumSearch(1994)) {
      //"Shadow Doram Mage Shield"
      if (n_A_SHADOW_SHIELD_DEF_PLUS >= 7) {
        dmgMultiplier += 5;
      }
      if (n_A_SHADOW_SHIELD_DEF_PLUS >= 9) {
        dmgMultiplier += 5;
      }
    }
  }
  if (n_A_ActiveSkill == skill_SUM_SILVERVINE_STEM_SPEAR) {
    if (EquipNumSearch(1998)) {
      //"Shadow Doram Mage Armor"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 3;
    }
  }
  if (n_A_ActiveSkill == skill_NIN_FLAMING_PETALS) {
    if (EquipNumSearch(2007)) {
      //"Shadow Oboro Armor"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 5;
    }
    if (EquipNumSearch(2589)) {
      //Wind Spear Petal Shadow Earring + Wind Spear Wind Spear Petal Shadow Pendant + Wind Spear Petal Shadow Shoes
      dmgMultiplier +=
        (n_A_SHADOW_EARRING_DEF_PLUS +
          n_A_SHADOW_PENDANT_DEF_PLUS +
          n_A_SHADOW_SHOES_DEF_PLUS) /
        2;
    }
  }
  if (n_A_ActiveSkill == skill_NIN_FREEZING_SPEAR) {
    if (EquipNumSearch(2007)) {
      //"Shadow Oboro Armor"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 5;
    }
    if (EquipNumSearch(2589)) {
      //Wind Spear Petal Shadow Earring + Wind Spear Wind Spear Petal Shadow Pendant + Wind Spear Petal Shadow Shoes
      dmgMultiplier +=
        (n_A_SHADOW_EARRING_DEF_PLUS +
          n_A_SHADOW_PENDANT_DEF_PLUS +
          n_A_SHADOW_SHOES_DEF_PLUS) /
        2;
    }
  }
  if (n_A_ActiveSkill == skill_NIN_WIND_BLADE) {
    if (EquipNumSearch(2007)) {
      //"Shadow Oboro Armor"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 5;
    }
    if (EquipNumSearch(2589)) {
      //Wind Spear Petal Shadow Earring + Wind Spear Wind Spear Petal Shadow Pendant + Wind Spear Petal Shadow Shoes
      dmgMultiplier +=
        (n_A_SHADOW_EARRING_DEF_PLUS +
          n_A_SHADOW_PENDANT_DEF_PLUS +
          n_A_SHADOW_SHOES_DEF_PLUS) /
        2;
    }
  }
  if (n_A_ActiveSkill == skill_KAG_SWIRLING_PETAL) {
    if (EquipNumSearch(2008)) {
      //"Shadow Kagerou Armor"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 5;
    }
  }
  if (n_A_ActiveSkill == skill_KAG_SPINTHROW_KUNAI) {
    if (EquipNumSearch(2011)) {
      //"Shadow Kagerou Boots"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 5;
    }
  }
  if (n_A_ActiveSkill == skill_REB_GODS_HAMMER) {
    if (EquipNumSearch(2012)) {
      //"Shadow Rebellion Boots"
      dmgMultiplier += n_A_SHADOW_BODY_DEF_PLUS * 5;
    }
  }
  if (n_A_ActiveSkill == skill_MEC_AXE_BOOMERANG) {
    if (CardNumSearch(656) && n_A_Weapon_ATKplus >= 10) {
      //Step Card
      dmgMultiplier += CardNumSearch(656) * 30;
    }
  }
  if (n_A_ActiveSkill == skill_MEC_ARM_CANNON) {
    // if(CardNumSearch(657) && n_A_BODY_DEF_PLUS >= 10)
    // { //Rock Step Card
    // dmgMultiplier += 20;
    // }
    if (EquipNumSearch(2218)) {
      // Old Driver Band (Yellow) [1]
      dmgMultiplier += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }
  if (n_A_ActiveSkill == skill_MEC_VULCAN_ARM) {
    if (CardNumSearch(659) && n_A_Weapon_ATKplus >= 10) {
      //Rock Step Card
      dmgMultiplier += CardNumSearch(659) * 20;
    }
  }
  if (n_A_ActiveSkill == skill_MEC_AXE_TORNADO && EquipNumSearch(2085)) {
    //"Dog Cap + Tornado Axe"
    dmgMultiplier += 15 * Math.floor(n_A_Weapon_ATKplus / 2);
  }
  if (n_A_ActiveSkill == skill_SUR_TIGER_CANNON && EquipNumSearch(2074)) {
    //Claws of the Bifrost
    dmgMultiplier += 4 * Math.floor(n_A_Weapon_ATKplus / 3);
  }
  if (
    (n_A_ActiveSkill == skill_RUN_DRAGON_BREATH ||
      n_A_ActiveSkill == skill_RUN_DRAGON_BREATH_WATER) &&
    EquipNumSearch(2051)
  ) {
    //Dragon Slayer (Ancient Weapon)
    dmgMultiplier += 5 * Math.floor(n_A_Weapon_ATKplus / 3);
  }
  if (
    (n_A_ActiveSkill == skill_RUN_SONIC_WAVE && EquipNumSearch(2050)) || //Runic Katana
    (n_A_ActiveSkill == skill_MEC_AXE_TORNADO && EquipNumSearch(2067)) || //Avenger
    (n_A_ActiveSkill == skill_MEC_VULCAN_ARM && EquipNumSearch(2068)) || //Big Badaboom
    (n_A_ActiveSkill == skill_GEN_CART_TORNADO && EquipNumSearch(2070))
  ) {
    //Slate Sword
    dmgMultiplier += 10 * Math.floor(n_A_Weapon_ATKplus / 3);
  }
  if (
    (n_A_ActiveSkill == skill_RAN_ARROW_STORM && EquipNumSearch(2061)) || //Empyrean
    (n_A_ActiveSkill == skill_WAR_EARTH_STRAIN && EquipNumSearch(2063)) || //Rusty Dragon's Wand
    // (n_A_ActiveSkill == skill_WAR_JACK_FROST && EquipNumSearch(2064))   || //Wand of the Purple Orb
    (n_A_ActiveSkill == skill_SOR_EARTH_GRAVE && EquipNumSearch(2065))
  ) {
    //Shadow Eater
    dmgMultiplier += 12 * Math.floor(n_A_Weapon_ATKplus / 3);
  }
  if (n_A_ActiveSkill == skill_ABI_DUPLE_LIGHT && EquipNumSearch(2071)) {
    //All-Holy Book
    dmgMultiplier += 25 * Math.floor(n_A_Weapon_ATKplus / 3);
  }

  if (
    (n_A_ActiveSkill == skill_MIWA_SEVERE_RAINSTORM &&
      EquipNumSearch(2054) &&
      n_A_Weapon_ATKplus >= 9) || //"Bow of Narcissus"
    ((n_A_ActiveSkill == skill_MEC_VULCAN_ARM ||
      n_A_ActiveSkill == skill_MEC_ARM_CANNON) &&
      EquipNumSearch(2068) &&
      n_A_Weapon_ATKplus >= 9) || //Big Badaboom
    (n_A_ActiveSkill == skill_SUR_RAMPAGE_BLASTER &&
      EquipNumSearch(2073) &&
      n_A_Weapon_ATKplus >= 9)
  ) {
    //Iron Claw
    dmgMultiplier += 10;
  }
  if (
    ((n_A_ActiveSkill == skill_ROY_SPEAR_CANNON ||
      n_A_ActiveSkill == skill_ROY_VANISHING_POINT) &&
      EquipNumSearch(2052) &&
      n_A_Weapon_ATKplus >= 7) || //Trident of Undine
    (n_A_ActiveSkill == skill_GEN_CART_CANNON &&
      EquipNumSearch(2069) &&
      n_A_Weapon_ATKplus >= 9) || //Sword of Blue Fire
    (n_A_ActiveSkill == skill_SUR_TIGER_CANNON &&
      EquipNumSearch(2074) &&
      n_A_Weapon_ATKplus >= 9) || //Claws of the Bifrost
    (n_A_ActiveSkill == skill_REB_DRAGON_TAIL &&
      EquipNumSearch(2081) &&
      n_A_Weapon_ATKplus >= 7) || //Big Game Trophy
    (n_A_ActiveSkill == skill_REB_ROUND_TRIP &&
      EquipNumSearch(2082) &&
      n_A_Weapon_ATKplus >= 7)
  ) {
    //Guttling Gun
    dmgMultiplier += 15;
    if (
      (n_A_ActiveSkill == skill_REB_DRAGON_TAIL &&
        EquipNumSearch(2081) &&
        n_A_Weapon_ATKplus >= 11) || //Big Game Trophy
      (n_A_ActiveSkill == skill_REB_ROUND_TRIP &&
        EquipNumSearch(2082) &&
        n_A_Weapon_ATKplus >= 11)
    )
      //Guttling Gun
      dmgMultiplier += 15;
  }
  if (
    (n_A_ActiveSkill == skill_GLT_ROLLING_CUTTER &&
      EquipNumSearch(2058) &&
      n_A_Weapon_ATKplus >= 9) || //Steel Flower
    ((n_A_ActiveSkill == skill_ROY_SPEAR_CANNON ||
      n_A_ActiveSkill == skill_ROY_VANISHING_POINT) &&
      EquipNumSearch(2052) &&
      n_A_Weapon_ATKplus >= 11) || //Trident of Undine
    (n_A_ActiveSkill == skill_GEN_CART_TORNADO &&
      EquipNumSearch(2070) &&
      n_A_Weapon_ATKplus >= 9)
  ) {
    //Slate Sword
    dmgMultiplier += 20;
  }
  if (
    n_A_ActiveSkill == skill_KAG_CROSS_STRIKE &&
    EquipNumSearch(2084) &&
    n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus >= 14
  ) {
    //Kagero & Oboro Dual Dagger Set
    dmgMultiplier += 25;
    if (
      n_A_ActiveSkill == skill_KAG_CROSS_STRIKE &&
      EquipNumSearch(2084) &&
      n_A_Weapon_ATKplus + n_A_Weapon2_ATKplus >= 20
    ) {
      //Kagero & Oboro Dual Dagger Set
      dmgMultiplier += 25;
    }
  }
  if (
    (n_A_ActiveSkill == skill_ABI_DUPLE_LIGHT &&
      EquipNumSearch(2071) &&
      n_A_Weapon_ATKplus >= 11) || //All-Holy Book
    (n_A_ActiveSkill == skill_KAG_SWIRLING_PETAL &&
      EquipNumSearch(2075) &&
      n_A_Weapon_ATKplus >= 7)
  ) {
    //Four Mirrors
    dmgMultiplier += 30;
  }
  if (
    n_A_ActiveSkill == skill_RAN_AIMED_BOLT &&
    EquipNumSearch(2062) &&
    n_A_Weapon_ATKplus >= 9
  ) {
    //Scarlet Dragon's Bow
    dmgMultiplier += 35;
  }

  if (
    n_A_ActiveSkill == skill_MEC_AXE_BOOMERANG &&
    EquipNumSearch(2067) &&
    n_A_Weapon_ATKplus >= 9
  ) {
    //Avenger
    dmgMultiplier += 40;
  }
  if (
    n_A_ActiveSkill == skill_MA_COLD_BOLT ||
    n_A_ActiveSkill == skill_MA_FIRE_BOLT ||
    n_A_ActiveSkill == skill_MA_LIGHTNING_BOLT
  ) {
    if (CardNumSearch(672) && n_A_WeaponType == weapTyp_BOOK) {
      //Ju Card
      dmgMultiplier += 20 * CardNumSearch(672);
      if (n_A_Weapon_ATKplus >= 14) dmgMultiplier += 20 * CardNumSearch(672);
    }
  }
  if (
    n_A_ActiveSkill == skill_REB_ANTI_MATERIAL_BLAST ||
    n_A_ActiveSkill == skill_REB_GODS_HAMMER
  ) {
    if (CardNumSearch(690)) {
      //Captain Ferlock Card
      if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 30 * CardNumSearch(672);
    }
  }
  if (
    n_A_ActiveSkill == skill_REB_ANTI_MATERIAL_BLAST ||
    n_A_ActiveSkill == skill_REB_MASS_SPIRAL
  ) {
    if (EquipNumSearch(2242)) {
      //Finisher [2]
      if (n_A_Weapon_ATKplus >= 7) dmgMultiplier += 30;
    }
  }
  if (n_A_ActiveSkill == skill_REB_SHATTERING_STORM) {
    if (EquipNumSearch(2243)) {
      //Dustfire [2]
      if (n_A_Weapon_ATKplus >= 7) dmgMultiplier += 15;
    }
  }
  if (n_A_ActiveSkill == skill_REB_VANISHING_BUSTER) {
    if (EquipNumSearch(2243)) {
      //Dustfire [2]
      if (n_A_Weapon_ATKplus >= 9) dmgMultiplier += 15;
    }
  }
  if (n_A_ActiveSkill == skill_REB_FIRE_RAIN) {
    if (EquipNumSearch(2244)) {
      //Burning Rose [2]
      if (n_A_Weapon_ATKplus >= 7) dmgMultiplier += 30;
    }
  }
  if (n_A_ActiveSkill == skill_REB_DRAGON_TAIL) {
    if (EquipNumSearch(2245)) {
      //Avenger [2]
      if (n_A_Weapon_ATKplus >= 7) dmgMultiplier += 15;
    }
  }
  if (
    (EquipNumSearch(2279) && n_A_ActiveSkill == skill_RUN_DRAGON_BREATH) || // Wyrmeater's Shadow Pendant
    (EquipNumSearch(2280) && n_A_ActiveSkill == skill_SUR_TIGER_CANNON) || // Tiger Spirit Shadow Pendant
    (EquipNumSearch(2282) && n_A_ActiveSkill == skill_PR_MAGNUS_EXORCISMUS) || // Exorcist Shadow Pendant
    (EquipNumSearch(2283) && n_A_ActiveSkill == skill_RAN_AIMED_BOLT) || // Rondius' Shadow Pendant
    (EquipNumSearch(2284) && n_A_ActiveSkill == skill_ROY_RAY_OF_GENESIS) || // Gunther's Shadow Pendant
    (EquipNumSearch(2285) && n_A_ActiveSkill == skill_MEC_ARM_CANNON) || // Talos' Shadow Pendant
    (EquipNumSearch(2286) && n_A_ActiveSkill == skill_SOR_VARETYR_SPEAR) || // Sylphir's Shadow Pendant
    (EquipNumSearch(2288) && n_A_ActiveSkill == skill_WAR_EARTH_STRAIN) || // Osma's Shadow Pendant
    (EquipNumSearch(2289) && n_A_ActiveSkill == skill_CG_ARROW_VULCAN) || // Garmia's Shadow Pendant
    (EquipNumSearch(2290) && n_A_ActiveSkill == skill_GEN_CART_CANNON)
  ) {
    // Boscard's Shadow Pendant
    dmgMultiplier += 2 * Math.floor(n_A_SHADOW_PENDANT_DEF_PLUS / 2);
  }

  if (EquipNumSearch(2287) && n_A_ActiveSkill == skill_WI_METEOR_STORM)
    // Dordaleon's Shadow Pendant
    dmgMultiplier += 3 * Math.floor(n_A_SHADOW_PENDANT_DEF_PLUS / 2);

  if (
    (EquipNumSearch(2294) && n_A_ActiveSkill == skill_PR_MAGNUS_EXORCISMUS) || // Exorcist Shadow Set
    (EquipNumSearch(2295) && n_A_ActiveSkill == skill_RAN_AIMED_BOLT) || // Rondius' Shadow Set
    (EquipNumSearch(2296) && n_A_ActiveSkill == skill_ROY_RAY_OF_GENESIS) || // Gunther's Shadow Set
    (EquipNumSearch(2298) && n_A_ActiveSkill == skill_SOR_VARETYR_SPEAR) || // Sylphir's Shadow Set
    (EquipNumSearch(2299) && n_A_ActiveSkill == skill_SOR_PSYCHIC_WAVE) || // Dordaleon's Shadow Set
    (EquipNumSearch(2300) && n_A_ActiveSkill == skill_WAR_EARTH_STRAIN) || // Osma's  Shadow Set
    (EquipNumSearch(2301) && n_A_ActiveSkill == skill_CG_ARROW_VULCAN)
  )
    // Garmia's  Shadow Set
    dmgMultiplier +=
      n_A_SHADOW_WEAPON_DEF_PLUS +
      n_A_SHADOW_EARRING_DEF_PLUS +
      n_A_SHADOW_PENDANT_DEF_PLUS;

  if (
    (EquipNumSearch(2297) && n_A_ActiveSkill == skill_MEC_ARM_CANNON) || // Talos' Shadow Set
    (EquipNumSearch(2302) && n_A_ActiveSkill == skill_GEN_CART_CANNON)
  )
    // Boscard's Shadow Set
    dmgMultiplier += Math.floor(
      (n_A_SHADOW_WEAPON_DEF_PLUS +
        n_A_SHADOW_EARRING_DEF_PLUS +
        n_A_SHADOW_PENDANT_DEF_PLUS) /
        2
    );

  if (EquipNumSearch(2304) && n_A_ActiveSkill == skill_SUR_TIGER_CANNON) {
    //Sura set
    dmgMultiplier += Math.floor(
      (n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS) / 2
    );
  }
  if (EquipNumSearch(2303) && n_A_ActiveSkill == skill_RUN_DRAGON_BREATH) {
    //Rune Knight Set
    dmgMultiplier += n_A_SHADOW_WEAPON_DEF_PLUS + n_A_SHADOW_SHIELD_DEF_PLUS;
  }

  if (EquipNumSearch(2316) && n_A_ActiveSkill == skill_REB_FIRE_DANCE) {
    //Rune Knight Set
    //Dog Cap + Dark Rose
    dmgMultiplier += 6 * Math.floor(n_A_Weapon_ATKplus / 2);
  }

  if (EquipNumSearch(2587) && n_A_ActiveSkill == skill_REB_FIRE_DANCE) {
    //Rune Knight Set
    //Fire Dance Shadow Earring + Fire Dance Shadow Pendant + Fire Fire Dance Shadow Shoes
    dmgMultiplier +=
      (n_A_SHADOW_EARRING_DEF_PLUS +
        n_A_SHADOW_PENDANT_DEF_PLUS +
        n_A_SHADOW_SHOES_DEF_PLUS) /
      2;
  }

  // if(n_A_ActiveSkill == )
  // {
  // if(EquipNumSearch() && n_A_Weapon_ATKplus >= )
  // { //
  // dmgMultiplier += 10 * Math.floor(n_A_Weapon_ATKplus / 3);
  // }
  // }

  // if ( EquipNumSearch( 1399 ) && n_A_ActiveSkill == skill_RAN_ARROW_STORM)
  // { // Giant Crossbow
  // dmgMultiplier += 5 * n_A_Weapon_ATKplus;
  // }

  if (n_A_ActiveSkill == skill_MIWA_REVERBERATION) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(727); //True Alphoccio Basil
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(727); //True Alphoccio Basil
  }

  if (n_A_ActiveSkill == skill_SOR_VARETYR_SPEAR) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(728); //True Celia Alde
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(728); //True Celia Alde
    if (EquipNumSearch(2224)) {
      // Old Wind Whisper [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_SUR_RAMPAGE_BLASTER) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(729); //True Chen Lio
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(729); //True Chen Lio
    if (EquipNumSearch(2223)) {
      // Old Blazing Soul [1]
      dmgMultiplier += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_GLT_CROSS_IMPACT) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4) {
      for (var i = 0; i < 4; i++) {
        if (n_A_card[card_loc_WEAPON_I + i] == 730) {
          //True Eremes Guile
          dmgMultiplier += 20;
          if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20;
        }
      }
    }
    if (ItemOBJ[n_A_Equip[eq_LEFT_WEAPON]][itm_WLVL] == 4) {
      for (var i = 0; i < 4; i++) {
        if (n_A_card[card_loc_WEAPONII_I + i] == 730) {
          //True Eremes Guile
          dmgMultiplier += 20;
          if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20;
        }
      }
    }
    if (EquipNumSearch(2227)) {
      // Old Bone Circlet [1]
      dmgMultiplier += 10 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_GEN_CART_TORNADO) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(731); //True Flamel Emure
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(731); //True Flamel Emure
  }

  if (n_A_ActiveSkill == skill_SHA_FEINT_BOMB) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4) {
      for (var i = 0; i < 4; i++) {
        if (n_A_card[card_loc_WEAPON_I + i] == 732) {
          //True Gertie Wie
          dmgMultiplier += 20;
          if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20;
        }
      }
    }
    if (ItemOBJ[n_A_Equip[eq_LEFT_WEAPON]][itm_WLVL] == 4) {
      for (var i = 0; i < 4; i++) {
        if (n_A_card[card_loc_WEAPONII_I + i] == 732) {
          //True Gertie Wie
          dmgMultiplier += 20;
          if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20;
        }
      }
    }
  }

  if (n_A_ActiveSkill == skill_MEC_AXE_TORNADO) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(733); //True Howard Alt-Eisen
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(733); //True Howard Alt-Eisen
  }

  if (n_A_ActiveSkill == skill_WAR_CRIMSON_ROCK) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(734); //True Kathryne Keyron
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(734); //True Kathryne Keyron
  }

  if (n_A_ActiveSkill == skill_ABI_ADORAMUS) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(735); //True Margaretha Sorin
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(735); //True Margaretha Sorin
  }

  if (n_A_ActiveSkill == skill_ROY_EARTH_DRIVE) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(736); //True Randel Lawrence
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(736); //True Randel Lawrence
  }

  if (n_A_ActiveSkill == skill_RUN_IGNITION_BREAK) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(737); //True Seyren Windsor
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(737); //True Seyren Windsor
    if (EquipNumSearch(2215)) {
      // Old Rune Circlet [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_RAN_CLUSTER_BOMB) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(738); //True Cecil Damon
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(738); //True Cecil Damon
    if (EquipNumSearch(2226)) {
      // Old Camouflage Bunny Hood [1]
      dmgMultiplier += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_MIWA_SEVERE_RAINSTORM) {
    if (ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL] == 4)
      dmgMultiplier += 20 * CardNumSearch(739); //True Trentini
    if (n_A_Weapon_ATKplus >= 10) dmgMultiplier += 20 * CardNumSearch(739); //True Trentini
    if (
      EquipNumSearch(2220) || // Old Maestro Song's Hat [1]
      EquipNumSearch(2225)
    ) {
      // Old Dying Swan [1]
      dmgMultiplier += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_RUN_HUNDRED_SPEAR) {
    if (EquipNumSearch(2215)) {
      // Old Rune Circlet [1]
      dmgMultiplier += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_ABI_JUDEX) {
    if (EquipNumSearch(2216)) {
      // Old Mitra [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }
  if (n_A_ActiveSkill == skill_PR_MAGNUS_EXORCISMUS) {
    if (EquipNumSearch(2216)) {
      // Old Mitra [1]
      dmgMultiplier += 10 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (
    n_A_ActiveSkill == skill_MEC_POWER_SWING ||
    n_A_ActiveSkill == skill_MEC_AXE_TORNADO
  ) {
    if (EquipNumSearch(2217)) {
      // Old Driver Band (Red) [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_SHA_TRIANGLE_SHOT) {
    if (EquipNumSearch(2219)) {
      // Old Shadow Handicraft [1]
      dmgMultiplier += 25 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_CG_ARROW_VULCAN) {
    if (
      EquipNumSearch(2220) || // Old Maestro Song's Hat [1]
      EquipNumSearch(2225)
    ) {
      // Old Dying Swan [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_GEN_CART_CANNON) {
    if (EquipNumSearch(2221)) {
      // Old Midas Whisper [1]
      dmgMultiplier += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_WAR_SOUL_EXPANSION) {
    if (EquipNumSearch(2222)) {
      // Old Magic Stone Hat [1]
      dmgMultiplier += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_SUR_LIGHTNING_RIDE) {
    if (EquipNumSearch(2223)) {
      // Old Blazing Soul [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_SOR_POISON_BUSTER) {
    if (EquipNumSearch(2224)) {
      // Old Wind Whisper [1]
      dmgMultiplier += 15 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_RAN_WARG_STRIKE) {
    if (EquipNumSearch(2226)) {
      // Old Camouflage Bunny Hood [1]
      dmgMultiplier += 10 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_GLT_CROSS_RIPPER_SLASHER) {
    if (EquipNumSearch(2227)) {
      // Old Bone Circlet [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }

  if (n_A_ActiveSkill == skill_ROY_SPEAR_CANNON) {
    if (EquipNumSearch(2228)) {
      // Old Casket of Protection [1]
      dmgMultiplier += 20 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }
  if (n_A_ActiveSkill == skill_ROY_OVERBRAND) {
    if (EquipNumSearch(2228)) {
      // Old Casket of Protection [1]
      dmgMultiplier += 5 * Math.floor(n_A_HEAD_DEF_PLUS / 2);
    }
  }
  if (n_A_ActiveSkill == skill_KAG_THROW_EXPLOSIVE_KUNAI) {
    if (EquipNumSearch(2318)) {
      //Monokage
      dmgMultiplier += SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE);
    }
  }

  if (EquipNumSearch(2414)) {
    //Rebellion's Scarf
    if (n_A_ActiveSkill == skill_REB_FIRE_RAIN) {
      dmgMultiplier += 5 * SkillSearch(skill_REB_FIRE_RAIN);
    }
    if (n_A_ActiveSkill == skill_REB_MASS_SPIRAL) {
      dmgMultiplier += 5 * SkillSearch(skill_REB_MASS_SPIRAL);
    }
    if (n_A_ActiveSkill == skill_REB_QUICK_DRAW_SHOT) {
      dmgMultiplier += 5 * SkillSearch(skill_REB_ETERNAL_CHAIN);
    }
    if (n_A_ActiveSkill == skill_REB_SHATTERING_STORM) {
      dmgMultiplier += 10 * SkillSearch(skill_REB_SHATTERING_STORM);
    }
  }

  if (n_A_ActiveSkill == skill_ROY_SHIELD_PRESS) {
    if (EquipNumSearch(2416)) {
      //Imperial Ring + Imperial Guard
      if (n_A_LEFT_DEF_PLUS >= 5) dmgMultiplier += 8 * (n_A_LEFT_DEF_PLUS - 5);
    }
  }
  if (EquipNumSearch(2460) && n_A_HEAD_DEF_PLUS >= 9) {
    //Magician's Night Cap
    if (
      n_A_ActiveSkill == skill_MA_FIRE_BOLT ||
      n_A_ActiveSkill == skill_MA_COLD_BOLT ||
      n_A_ActiveSkill == skill_MA_LIGHTNING_BOLT
    ) {
      dmgMultiplier += Math.floor(n_A_BaseLV / 5) * 3;
    }
  }
  if (CardNumSearch(842)) {
    //Heart Hunter Bellare Card
    if (n_A_WeaponType == weapTyp_HANDGUN) {
      if (n_A_Weapon_ATKplus >= 10 && n_A_ActiveSkill == skill_REB_FIRE_RAIN)
        dmgMultiplier += 15;
    }
  }
  if (CardNumSearch(843)) {
    //Mutant Heart Hunter Bellare Card
    if (n_A_WeaponType == weapTyp_GATLING_GUN) {
      if (n_A_Weapon_ATKplus >= 10 && n_A_ActiveSkill == skill_REB_ROUND_TRIP)
        dmgMultiplier += 10;
    }
  }
  if (
    n_A_ActiveSkill == skill_PR_MAGNUS_EXORCISMUS ||
    n_A_ActiveSkill == skill_AC_HOLY_LIGHT ||
    n_A_ActiveSkill == skill_AC_HOLY_LIGHT_SL ||
    n_A_ActiveSkill == skill_PR_HOLY_LIGHT_SL ||
    n_A_ActiveSkill == skill_ABI_ADORAMUS ||
    n_A_ActiveSkill == skill_ABI_JUDEX
  ) {
    if (SkillSearch(skill_HP_BASILICA)) {
      dmgMultiplier += 3 * SkillSearch(skill_HP_BASILICA);
    }
  }
  if (
    n_A_ActiveSkill === skill_MA_NAPALM_BEAT ||
    n_A_ActiveSkill === skill_MA_SOUL_STRIKE ||
    n_A_ActiveSkill === skill_HW_NAPALM_VULCAN
  ) {
    if (n_A_JobSearch() === cls_MAG) {
      // Banshee card gives a bonus to mages who use these skills
      dmgMultiplier += 20 * CardNumSearch(card_HEAD_BANSHEE);
    }
  }

  if (
    EquipNumSearch(2662) &&
    n_A_Arrow == arrTyp_FIRE &&
    (n_A_ActiveSkill === skill_RAN_ARROW_STORM ||
      n_A_ActiveSkill === skill_MIWA_SEVERE_RAINSTORM)
  ) {
    // Elemental Tights + Burning Bow
    dmgMultiplier += n_A_SHOULDER_DEF_PLUS * 5;
  } else if (
    EquipNumSearch(2663) &&
    n_A_Arrow == arrTyp_CRYSTAL &&
    (n_A_ActiveSkill === skill_RAN_ARROW_STORM ||
      n_A_ActiveSkill === skill_MIWA_SEVERE_RAINSTORM)
  ) {
    // Elemental Tights + Freezing Bow
    dmgMultiplier += n_A_SHOULDER_DEF_PLUS * 5;
  } else if (
    EquipNumSearch(2664) &&
    n_A_Arrow == arrTyp_STONE &&
    (n_A_ActiveSkill === skill_RAN_ARROW_STORM ||
      n_A_ActiveSkill === skill_MIWA_SEVERE_RAINSTORM)
  ) {
    // Elemental Tights + Earthen Bow
    dmgMultiplier += n_A_SHOULDER_DEF_PLUS * 5;
  } else if (
    EquipNumSearch(2665) &&
    n_A_Arrow == arrTyp_WIND &&
    (n_A_ActiveSkill === skill_RAN_ARROW_STORM ||
      n_A_ActiveSkill === skill_MIWA_SEVERE_RAINSTORM)
  ) {
    // Elemental Tights + Gale Bow
    dmgMultiplier += n_A_SHOULDER_DEF_PLUS * 5;
  }

  if (EquipNumSearch(2685) && n_A_ActiveSkill == skill_MIWA_METALLIC_SOUND) {
    //Traveler's Shoes
    dmgMultiplier += 10 * SkillSearch(skill_MIWA_GLOOMY_SHYNESS);
  }

  if (
    EquipNumSearch(2687) &&
    n_A_ActiveSkill == skill_RAN_ARROW_STORM &&
    n_A_HEAD_DEF_PLUS >= 9
  ) {
    //Autumn Headband
    dmgMultiplier += Math.floor(n_A_BaseLV / 5);
  }

  if (EquipNumSearch(1267) && n_A_ActiveSkill == skill_SHA_FATAL_MENACE) {
    //Black Wing
    if (n_A_Equip[eq_WEAPON] == 1267 && n_A_Weapon_ATKplus >= 6)
      dmgMultiplier += (n_A_Weapon_ATKplus - 5) * 2;
    if (n_A_Equip[eq_WEAPONII] == 1267 && n_A_Weapon2_ATKplus >= 6)
      dmgMultiplier += (n_A_Weapon2_ATKplus - 5) * 2;
  }
  //seems to increase damage on skill formulas instead of here ? source: RAthena's code 
  // if(n_A_ActiveSkill == skill_STEM_SOLAR_EXPLOSION)
  //   dmgMultiplier += SkillSearch(skill_STEM_SOLAR_LUMINANCE) * 5;
  // if(n_A_ActiveSkill == skill_STEM_FULL_MOON_KICK)
  //   dmgMultiplier += SkillSearch(skill_STEM_LUNAR_LUMINANCE) * 5;
  // if(n_A_ActiveSkill == skill_STEM_FALLING_STARS)
  //   dmgMultiplier += SkillSearch(skill_STEM_STELLAR_LUMINANCE) * 5;


  // if ( n_A_ActiveSkill==skill_WI_EARTH_SPIKE ||
  // n_A_ActiveSkill == skill_WI_HEAVENS_DRIVE )
  // {
  // if ( EquipNumSearch( 1146 ) )
  // { // Katyusha Flowers?
  // dmgMultiplier += n_A_HEAD_DEF_PLUS;
  // }
  // }

  damage =
    (damage *
      (100 +
        StPlusCalc2(bon_DMG_SKILL + n_A_ActiveSkill) +
        StPlusCard(bon_DMG_SKILL + n_A_ActiveSkill) +
        dmgMultiplier)) /
    100;

  if (n_A_ActiveSkill == skill_RG_BACK_STAB && n_A_WeaponType == weapTyp_BOW) {
    // Backstab with a bow does half the damage
    damage = Math.floor(damage / 2);
  }
  if (n_Nitou && n_A_ActiveSkill === skill_ALL_BASIC_ATTACK) {
    if (n_A_WeaponType !== weapTyp_NONE) {
      // dual handed with a weapon in both hands
      if (n_A_JOB == cls_KAGOB)
        damage = Math.floor(
          (damage * (70 + SkillSearch(skill_AS_RIGHTHAND_MASTERY) * 10)) / 100
        );
      else
        damage = Math.floor(
          (damage * (50 + SkillSearch(skill_AS_RIGHTHAND_MASTERY) * 10)) / 100
        );
    }
  }
  if (n_A_ActiveSkill == skill_GS_MAGICAL_BULLET) {
    // Magical Bullet is forced ghost
    damage = (damage * element[n_B[en_ELEMENT]][ele_GHOST]) / 100;
  }
  if (n_A_ActiveSkill == skill_GS_GUNSLINGER_MINE) {
    // gunslinger mine is forced neutral
    damage = (damage * element[n_B[en_ELEMENT]][ele_NEUTRAL]) / 100;
  }
  if (
    performerBuffs[ksWandererSolo] === ksGloomyShynessW &&
    performerBuffs[ksWandererSoloLevel] > 0
  ) {
    // Gloomy Shyness
    var maxPercentage =
      performerBuffs[ksWandererVoiceLessons] * 5 +
      performerBuffs[ksWandererSoloLevel] * 10;
    if (maxPercentage < 15) {
      maxPercentage = 15;
    }
    var randomNumber = Math.floor(Math.random() * (maxPercentage - 14)) + 15;
    gloomyMultiplier = randomNumber / 100.0;
    gloomyMultiplier += 1.0;

    if (
      n_A_ActiveSkill == skill_KN_BRANDISH_SPEAR ||
      n_A_ActiveSkill == skill_CR_SHIELD_BOOMERANG ||
      n_A_ActiveSkill == skill_LK_CLASHING_SPIRAL ||
      n_A_ActiveSkill == skill_PA_RAPID_SMITING ||
      n_A_ActiveSkill == skill_RUN_HUNDRED_SPEAR ||
      n_A_ActiveSkill == skill_ROY_SHIELD_PRESS ||
      n_A_ActiveSkill == skill_CR_SMITE
    ) {
      damage *= gloomyMultiplier;
      damage = Math.floor(damage);
    }
  } else if (
    performerBuffs[ksMaestroSolo] === ksGloomyShynessM &&
    performerBuffs[ksMaestroSoloLevel] > 0
  ) {
    // Gloomy Shyness
    var maxPercentage =
      performerBuffs[ksMaestroVoiceLessons] * 5 +
      performerBuffs[ksMaestroSoloLevel] * 10;
    if (maxPercentage < 15) {
      maxPercentage = 15;
    }
    var randomNumber = Math.floor(Math.random() * (maxPercentage - 14)) + 15;
    gloomyMultiplier = randomNumber / 100.0;
    gloomyMultiplier += 1.0;

    if (
      n_A_ActiveSkill == skill_KN_BRANDISH_SPEAR ||
      n_A_ActiveSkill == skill_CR_SHIELD_BOOMERANG ||
      n_A_ActiveSkill == skill_LK_CLASHING_SPIRAL ||
      n_A_ActiveSkill == skill_PA_RAPID_SMITING ||
      n_A_ActiveSkill == skill_RUN_HUNDRED_SPEAR ||
      n_A_ActiveSkill == skill_ROY_SHIELD_PRESS ||
      n_A_ActiveSkill == skill_CR_SMITE
    ) {
      damage *= gloomyMultiplier;
      damage = Math.floor(damage);
    }
  }

  return damage;
}

function ApplyMagnumBreakBonus() {
  /*
	// version 1
	if ( SkillSearch( skill_AX_ENCHANT_DEADLY_POISON ) || otherBuffs[ksMagnumBreak] )
	{ // EDP or Magnum Break
		w_DMG[2] += EDP_DMG( 2 ) * HitNum;
		w_DMG[1] += EDP_DMG( 1 ) * HitNum;
		
		if ( w_HIT_EDP == 100 )
		{
			w_DMG[0] += EDP_DMG(0) * HitNum;
		}
		
		EDPhyouzi( HitNum );
	}
	
	// version 2
	if(SkillSearch( skill_AX_ENCHANT_DEADLY_POISON ) || otherBuffs[ksMagnumBreak])
	{
		var wE = 0;
		if(w_HIT_HYOUJI == 100)
			wE = 1;
		if(n_PerHIT_DMG)
			wE = 1;
		str_bSUBname += "MB/EDP Part chase(?)<BR>";
		var w0 = n_A_EDP_DMG[0] * HitNum;
		var w2 = n_A_EDP_DMG[2] * HitNum;
		if(wE)
			str_bSUB += w0 +"~"+ w2 +"( add invocation rate(?)"+ w_HIT_EDP +"%)<BR>";
		else
			str_bSUB += w0 +"~"+ w2 +"( add invocation rate(?)"+ (Math.floor(w_HIT * w_HIT_EDP) / 100) +"%)<BR>";
	}
	
	// version 3
	if (SkillSearch( skill_AX_ENCHANT_DEADLY_POISON ) || otherBuffs[ksMagnumBreak])
	{
		if(n_A_ActiveSkill == 17 && 52 <= n_B[en_ELEMENT] && n_B[en_ELEMENT] <= 59)
			return 0;
		if ( ( n_A_ActiveSkill == 66 ||
			   n_A_ActiveSkill == 193 ||
			   n_A_ActiveSkill == 197 ||
			   n_A_ActiveSkill == 321 ) &&
			 83 <= n_B[en_ELEMENT] && n_B[en_ELEMENT] <= 89 )
		{
			return 0;
		}
		if(element[n_B[en_ELEMENT]][n_A_Weapon_element] <= 0 && n_PerHIT_DMG == 0)
		{
			return 0;
		}

		if ( num == 0 )
		{
			if(w_HIT_EDP == 100)
				return n_A_EDP_DMG[0];
			else
				return 0;
		}
		else if ( num == 1 )
		{
			var wE = 0;
			if(w_HIT_HYOUJI == 100)
				wE = 1;
			if(n_PerHIT_DMG)
				wE = 1;
			if(wE)
				return Math.floor(n_A_EDP_DMG[1] * w_HIT_EDP / 100);
			else
				return Math.floor(n_A_EDP_DMG[1] * w_HIT / 100 * w_HIT_EDP / 100);
		}
		else if ( num == 2 )
		{
			return n_A_EDP_DMG[2];
		}
	}
	return 0;
	
	// version 4
	if ( otherBuffs[ksMagnumBreak] )
	{ // Magnum Break
		y = CalcFinalDamage(wBCEDP,wBCEDP2);
		y = Math.floor( ( y * element[n_B[en_ELEMENT]][ele_FIRE]) / 5 );
	}
*/
}

// some modifiers
function tPlusDamCut(damage) {
  if (PlayerVersusPlayer == 0) {
    if (battleEffects[pass_VIII_SPE_ENVIRONMENT] == 1) {
      // WoE zone?
      if (
        n_A_WeaponType == weapTyp_BOW ||
        n_A_WeaponType == weapTyp_HANDGUN ||
        n_A_WeaponType == weapTyp_RIFLE ||
        n_A_WeaponType == weapTyp_SHOTGUN ||
        n_A_WeaponType == weapTyp_GATLING_GUN ||
        n_A_WeaponType == weapTyp_GRENADE_LAUNCHER
      ) {
        damage = Math.floor(damage * 0.6);
      } else if (n_A_ActiveSkill != skill_ALL_BASIC_ATTACK) {
        damage = Math.floor(damage * 0.6);
      } else {
        damage = Math.floor(damage * 0.8);
      }

      if (battleEffects[pass_VIII_DEF_INVEST]) {
        // Defense Investment
        damage = Math.floor(
          damage * (10 / (battleEffects[pass_VIII_DEF_INVEST] * 5))
        );
      }
    }
  }

  if (hunterPetHits === 0) {
    // Monster Debuffs
    if (monsterDebuffs[status_en_LEXA] && wLAch === 0) {
      // Lex Aeterna
      damage *= 2;
    }
    if (
      monsterDebuffs[status_en_DARK_CLAW] > 0 /*&& n_B[en_BOSS] == 0*/ &&
      n_A_WeaponType != weapTyp_BOW &&
      n_A_WeaponType != weapTyp_INSTRU &&
      n_A_WeaponType != weapTyp_WHIP &&
      n_A_WeaponType != weapTyp_HANDGUN &&
      n_A_WeaponType != weapTyp_RIFLE &&
      n_A_WeaponType != weapTyp_SHOTGUN &&
      n_A_WeaponType != weapTyp_GATLING_GUN &&
      n_A_WeaponType != weapTyp_GRENADE_LAUNCHER
    ) {
      if (PATCH < 2) {
        damage *= 1 + 0.3 * monsterDebuffs[status_en_DARK_CLAW];
      } else if (PATCH == 2) {
        damage *= 1 + 0.15 * monsterDebuffs[status_en_DARK_CLAW];
      }
    }
    if (monsterDebuffs[status_en_FIBER] && n_A_Weapon_element === ele_FIRE) {
      // Fiberlock
      damage *= 2;
    }
    if (monsterDebuffs[status_en_DEEPSLEEP]) {
      // Deep Sleep
      damage = Math.floor(damage * 1.5);
    }
    if (
      monsterDebuffs[status_en_VENOM_IMPRESS] &&
      n_A_Weapon_element === ele_POISON
    ) {
      // Venom Impress
      damage *= 1.0 + 0.1 * monsterDebuffs[status_en_VENOM_IMPRESS];
    }

    // damage increased by land enchants
    multipliers = [110, 114, 117, 119, 120];
    if (
      otherBuffs[ksElementField] === 0 &&
      otherBuffs[ksElementFieldLvl] >= 1 &&
      n_A_Weapon_element === ele_FIRE
    ) {
      // Volcano
      damage = Math.floor(
        (damage * multipliers[otherBuffs[ksElementFieldLvl] - 1]) / 100
      );
    }
    if (
      otherBuffs[ksElementField] === 1 &&
      otherBuffs[ksElementFieldLvl] >= 1 &&
      n_A_Weapon_element === ele_WATER
    ) {
      // Deluge
      damage = Math.floor(
        (damage * multipliers[otherBuffs[ksElementFieldLvl] - 1]) / 100
      );
    }
    if (
      otherBuffs[ksElementField] === 2 &&
      otherBuffs[ksElementFieldLvl] >= 1 &&
      n_A_Weapon_element === ele_WIND
    ) {
      // Whirlwind
      damage = Math.floor(
        (damage * multipliers[otherBuffs[ksElementFieldLvl] - 1]) / 100
      );
    }

    if (monsterDebuffs[status_en_SIGHTLESS_MIND]) {
      // Sightless Mind
      if (n_B[en_BOSS] == 1) damage *= 1.15;
      else damage *= 1.3;
    }
  }

  // Monster Buffs
  /*if ( monsterBuffs[status_en_buff_Assumptio] && PlayerVersusPlayer === 0 )
	{ // Assumptio
		damage = Math.floor( damage / 2 );
	}
	if ( monsterBuffs[status_en_buff_Assumptio] && PlayerVersusPlayer === 1 )
	{ // Assumptio
		damage = Math.floor( damage * 2 / 3 );
	}*/
  if (monsterBuffs[status_en_buff_StoneSkin] && damageType !== kDmgTypeMagic) {
    // Stone Skin
    damage -= Math.floor(
      (damage * 20 * monsterBuffs[status_en_buff_StoneSkin]) / 100
    );
  }
  if (
    monsterBuffs[status_en_buff_MagicMirror] &&
    damageType === kDmgTypeRanged
  ) {
    // Anti Magic
    damage -= Math.floor(
      (PDC * 20 * monsterBuffs[status_en_buff_MagicMirror]) / 100
    );
  }
  if (monsterBuffs[status_en_buff_Race] && damageType === kDmgTypeMagic) {
    damage -= Math.floor((damage * monsterBuffs[status_en_buff_Race]) / 100);
  }
  if (monsterBuffs[status_en_buff_Elemental] && damageType === kDmgTypeMagic) {
    damage -= Math.floor(
      (damage * monsterBuffs[status_en_buff_Elemental]) / 100
    );
  }
  if (monsterBuffs[status_en_buff_Size] && damageType === kDmgTypeMagic) {
    damage -= Math.floor((damage * monsterBuffs[status_en_buff_Size]) / 100);
  }
  if (monsterBuffs[status_en_buff_Other]) {
    damage -= Math.floor((damage * monsterBuffs[status_en_buff_Other]) / 100);
  }

  //Green Aura MVP
  if (monsterBuffs[status_en_buff_Green_Aura]) {
    damage -= Math.floor((damage * 90) / 100);
  }

  if (n_B[en_BOSS] === 5) {
    damage = 1;
  }

  return damage;
}

// Display lower battle results
function DisplayAdditionalBattleInfo() {
  // display FLEE information
  w_FLEE = 100 - (n_B_HIT - n_A_FLEE);
  w_FLEE = Between(0, w_FLEE, 95);
  myInnerHtml(
    "BattleFLEE",
    Math.floor((w_FLEE + ((100 - w_FLEE) * n_A_LUCKY) / 100) * 100) / 100 +
      SubName[0][Language],
    0
  );

  // cast time and delay info
  DisplayCastAndDelay();

  if (n_PerHIT_DMG > 0 && w_HIT_HYOUJI < 100) {
    str_bSUBname += "Damage When Missing";
    if (str_PerHIT_DMG == 0) str_bSUB += n_PerHIT_DMG;
    else str_bSUB += "<br/>" + str_PerHIT_DMG;
  }
  if (!BETA || Skill[n_A_ActiveSkill].isMagic) {
    myInnerHtml("bSUBname", str_bSUBname, 0); //comment for beta
    myInnerHtml("bSUB", str_bSUB, 0); //comment for beta
  }

  myInnerHtml("BattleHIT", w_HIT_HYOUJI + SubName[0][Language], 0);

  if (
    n_B[en_ID] == 547 &&
    n_A_ActiveSkill != skill_ALL_BASIC_ATTACK &&
    n_A_ActiveSkill != 325
  ) {
    // Emp
    for (var i = 0; i <= 2; i++) {
      w_DMG[i] = 0;
      myInnerHtml("ATK_0" + i, 0, 0);
    }
  }

  // Min Number of Hits ---------------------------------

  //classic calc
  let currentSkill = n_A_DMG;
  let currentSkillCrit = [0,0,0];

  if(Skill[n_A_ActiveSkill].isMagic)
    currentSkill = w_DMG
  for(let i = 0; i < 3 ; i++)
    currentSkillCrit[i] = currentSkill[2] * 1.4;
  //beta calc
  if(BETA)
  {
      currentSkill = getFinalDamage(getBaseDamage(0), Skill[n_A_ActiveSkill], n_A_ActiveSkillLV, 0);
      currentSkillCrit = getFinalDamage(getBaseDamage(1), Skill[n_A_ActiveSkill], n_A_ActiveSkillLV, 1);
  }
  var minNumHits;
  let skillDamage = [1,1,1];
  if(Skill[n_A_ActiveSkill].canCrit)
    skillDamage = currentSkillCrit;
  else
    skillDamage = currentSkill;
  
  //old
  // minNumHits = Math.floor(n_B[en_HP] / w_DMG[2]);
  // if (n_B[en_HP] % Math.floor(w_DMG[2]) != 0) minNumHits += 1;
  // console.log(skillDamage)
  let double = 1;
  if(SkillSearch(skill_TH_DOUBLE_ATTACK))
    double = 2;

  minNumHits = Math.floor(n_B[en_HP] / (skillDamage[2] * double));
  if (n_B[en_HP] % Math.floor(skillDamage[2] * double) != 0) minNumHits += 1;
  if (minNumHits < 10000) myInnerHtml("MinATKnum", minNumHits, 0);
  else myInnerHtml("MinATKnum", SubName[5][Language], 0);

  if (SG_Special_HITnum != 0) {
    if (minNumHits == 1) {
      var wHITnum;
      var x;
      wHITnum = SG_Special_HITnum;
      x =
        (SG_Special_DMG[2] * w_TotalHits - n_B[en_HP]) /
        (SG_Special_DMG[2] * w_TotalHits - SG_Special_DMG[0] * w_TotalHits);
      x = Between(0, x, 1);
      if (wHITnum == 2) {
        if (x < 0.5) x = 2 * x * x;
        else x = 1 - 2 * (1 - x) * (1 - x);
      }
      if (wHITnum == 3) {
        if (x < 1 / 3) x = 4.5 * Math.pow(x, 3);
        else if (1 / 3 <= x && x < 2 / 3)
          x = 4.5 * (Math.pow(x, 3) - 3 * Math.pow(x - 1 / 3, 3));
        else if (2 / 3 <= x) x = 1 - 4.5 * Math.pow(1 - x, 3);
      }
      if (wHITnum >= 4) {
        var y = Math.sqrt(
          (Math.pow(SG_Special_DMG[2] - SG_Special_DMG[0], 2) / 12) * wHITnum
        );
        x = (SG_Special_DMG[1] * w_TotalHits - n_B[en_HP]) / y;
        if (x >= 0)
          x =
            0.5 +
            0.5 * Math.sqrt(1 - Math.exp((-2 * Math.pow(x, 2)) / Math.PI));
        else
          x =
            0.5 -
            0.5 * Math.sqrt(1 - Math.exp((-2 * Math.pow(x, 2)) / Math.PI));
      }
      x = Math.floor(x * 10000) / 100;
      myInnerHtml("MinATKnum", "1 (" + x + "% Chance)", 0);
    }
    SG_Special_HITnum = 0;
  }

  // Max Number of Hits ------------------------------------
  skillDamage = currentSkill;
  if (w_HIT_HYOUJI < 100 && n_PerHIT_DMG == 0) {
    myInnerHtml("MaxATKnum", "<Font size=2>Infinite (no 100% Hit)</font>", 0);
  } else {
    if (w_HIT_HYOUJI < 100) skillDamage[0] = n_PerHIT_DMG;
    minNumHits = Math.floor(n_B[en_HP] / skillDamage[0]);
    if (n_B[en_HP] % Math.floor(skillDamage[0]) != 0) minNumHits += 1;
    if (minNumHits < 10000) myInnerHtml("MaxATKnum", minNumHits, 0);
    else myInnerHtml("MaxATKnum", SubName[5][Language], 0);
  }

  // Ave Number of Hits ------------------------------------
    // //add Double Attack to DPS Calculation
    // DoubleAttackRate = SkillSearch(skill_TH_DOUBLE_ATTACK)/100;
    DoubleAttackRate = CalcDoubleAttackChance();
    if(PATCH <= 1)
      DoubleAttackRate *= 5;
    else
      DoubleAttackRate *= 7;
  
    //Crit rate - enemy's crit shield
    let critRate = n_A_CRI - (Max(n_B[en_LUK], 0) / 5);
    critRate = Min(critRate,100);
    critRate = Max(critRate,1);
  
    //add crit to average hit calculation
    if(Skill[n_A_ActiveSkill].canCrit)
      for(let i = 0; i < 3 ; i++){
       currentSkill[i] = (currentSkill[i] * (1 - (critRate/100))) + (currentSkillCrit[i] * (critRate/100));
       currentSkill[i] = ((currentSkill[1] * (1-DoubleAttackRate))+((currentSkill[1] * 2) * DoubleAttackRate));
      }

  minNumHits = Math.floor(n_B[en_HP] / skillDamage[1]);
  if (n_B[en_HP] % skillDamage[1] != 0) {
    minNumHits += 1;
  }

  // Experience earned
  if (minNumHits < 10000) {
    myInnerHtml(
      "AtkBaseExp",
      Math.round(
        (n_B[en_BASEEXP] * expModByLevelDiff(n_A_BaseLV, n_B[en_LEVEL])) /
          minNumHits
      ) + "Exp",
      0
    );
    myInnerHtml(
      "AtkJobExp",
      Math.round(
        (n_B[en_BASEEXP] * expModByLevelDiff(n_A_BaseLV, n_B[en_LEVEL])) /
          minNumHits
      ) + "Exp",
      0
    );
  } else {
    myInnerHtml("AtkBaseExp", SubName[7][Language], 0);
    myInnerHtml("AtkJobExp", SubName[7][Language], 0);
  }

  // Battle Duration
  if (minNumHits < 10000) {
    myInnerHtml("AveATKnum", minNumHits, 0);

    n_AveATKnum = minNumHits;

    var battleDuration = (totalCastTime + totalDelay) * n_AveATKnum;
    if (n_AveATKnum === 1) {
      battleDuration -= totalDelay;
    }
    battleDuration = Math.floor(battleDuration * 100) / 100;

    if (n_Delay[0]) {
      myInnerHtml("BattleTime", "Special", 0);
    } else {
      myInnerHtml("BattleTime", battleDuration + "s", 0);
    }
  } else {
    myInnerHtml("AveATKnum", SubName[5][Language], 0);
    myInnerHtml("BattleTime", SubName[6][Language], 0);
  }

  //TODO improve
  //added crit to calculation
  //added Double Attack to calculation
  let damagePerSecond = (1 / (totalCastTime + totalDelay)) * ((currentSkill[1] * (1-DoubleAttackRate))+((currentSkill[1] * 2) * DoubleAttackRate));
  damagePerSecond *= 100;
  damagePerSecond = Math.round(damagePerSecond);
  damagePerSecond /= 100;

  if (n_Delay[0]) {
    myInnerHtml("AveSecondATK", "Special", 0);
  } else {
    myInnerHtml("AveSecondATK", numberFormat(damagePerSecond), 0);
  }

  // Damage taken
  if (PlayerVersusPlayer == 0) {
    calcIncomingDamage();
  }

  // Fill in the battle results
  for (var i = 0; i < InnStr.length; i++) {
    myInnerHtml("strID_" + i, InnStr[i], 0);
  }
}

// Cast times and delays
function DisplayCastAndDelay() {
  str_bSUBname = "";
  str_bSUB = "";
  // print cast time
  fixedCastTime = eval(Skill[n_A_ActiveSkill].fixedCastTime) * CalcFixedCast();
  fixedCastTime += CalcFixedCastFlat();
  //prevents cast time from having a negative time
  fixedCastTime = Max(fixedCastTime,0);
  variableCastTime =
    eval(Skill[n_A_ActiveSkill].variableCastTime) * CalcVariableCast();
  variableCastTime += CalcVariableCastFlat();
  //prevents cast time from having a negative time
  variableCastTime = Max(variableCastTime,0);
  totalCastTime = fixedCastTime + variableCastTime;

  // totalCastTime = Skill[n_A_ActiveSkill].fixedCastTime + Skill[n_A_ActiveSkill].variableCastTime;
  if (totalCastTime != 0) {
    str_bSUBname += SubName[9][Language] + "</br>";
    str_bSUB +=
      fixedCastTime.toFixed(1) + " " + SubName[1][Language] + " (fixed) + ";
    str_bSUB +=
      variableCastTime.toFixed(1) + " " + SubName[1][Language] + " (var)";
  }
  var strSUB2name = "";
  var strSUB2 = "";

  // calculate longest delay
  totalDelay = 0;
  n_Delay[ksDelayCooldown] = eval(Skill[n_A_ActiveSkill].cooldown); //new
  if (SkillSearch(skill_WAR_READING_SPELLBOOK)) {
    // instant list
    var w2 = [
      51, 54, 56, 57, 125, 126, 127, 128, 131, 132, 133, 534, 540, 542, 545,
      547, 553,
    ];
    if (NumSearch(n_A_ActiveSkill, w2)) {
      n_Delay[ksDelayCooldown] = 0;
    }
  }
  var longestDelay = 0;
  if (n_Delay[ksDelayASPD] > totalDelay) {
    totalDelay = n_Delay[ksDelayASPD];
    longestDelay = ksDelayASPD;
  }
  n_Delay[ksDelayGlobal] = eval(Skill[n_A_ActiveSkill].castDelay); //new
  n_Delay[ksDelayGlobal] =
    Math.floor(n_Delay[ksDelayGlobal] * (100 - globalCastDelay)) / 100;
  if (n_Delay[ksDelayGlobal] > totalDelay) {
    totalDelay = n_Delay[ksDelayGlobal];
    longestDelay = ksDelayGlobal;
  }
  n_Delay[ksDelayAnimation] = eval(Skill[n_A_ActiveSkill].animation); //new
  if (n_Delay[ksDelayAnimation] > totalDelay) {
    totalDelay = n_Delay[ksDelayAnimation];
    longestDelay = ksDelayAnimation;
  }
  if (
    n_A_ActiveSkill != skill_ALL_BASIC_ATTACK &&
    n_A_ActiveSkill != skill_PA_MARTYR_RECONING
  ) {
    n_Delay[ksDelayE] = parseInt(formElements["Conf01"].value) / 100;
  }
  if (n_Delay[ksDelayE] > totalDelay + totalCastTime) {
    //Check here later
    totalDelay = n_Delay[ksDelayE] - totalCastTime;
    longestDelay = ksDelayE;
  }
  if (n_Delay[ksDelayF] != 0) {
    totalDelay = n_Delay[ksDelayF];
    longestDelay = ksDelayF;
  }
  if (n_Delay[ksDelaySkillDuration] > totalDelay) {
    totalDelay = n_Delay[ksDelaySkillDuration] - totalCastTime;
    longestDelay = ksDelaySkillDuration;
  }
//   n_Delay[ksDelayCooldown] = eval(Skill[n_A_ActiveSkill].cooldown); //new
  if (n_Delay[ksDelayCooldown] > totalDelay) {
    totalDelay = n_Delay[ksDelayCooldown];
    longestDelay = ksDelayCooldown;
  }

  // print delay info
  if (longestDelay == ksDelayA) {
  } else if (longestDelay == ksDelayASPD) {
    // ASPD Delay
    if (n_A_ActiveSkill === skill_ALL_BASIC_ATTACK) {
      if (SkillSearch(skill_MO_RAGING_TRIFECTA_BLOW)) {
        // Raging Trifecta Blow
        strSUB2name +=
          "Attack interval (normal)</br>Attack Interval (Raging Trifecta Blow)</br>";
        strSUB2 += n_Delay[ksDelayASPD] + "s<BR>" + sandanDelay + "s<BR>";
        totalDelay =
          (n_Delay[ksDelayASPD] * meleeChanceAfterTrifecta) / 100 +
          (sandanDelay * trifectaBlowActivationRate) / 100;
      } else {
        // Normal Hits
        strSUB2name += "Time/Hit<BR>";
        strSUB2 += n_Delay[ksDelayASPD].toFixed(2) + " sec</br>";
      }
    } else {
      // skill with ASPD delay
      strSUB2name += "<font size=2>Delay (ASPD Based)</font></br>";
      strSUB2 += n_Delay[ksDelayASPD].toFixed(2) + " sec</br>";
    }
  } else if (longestDelay == ksDelayGlobal) {
    // global after-cast delay
    strSUB2name += "<Font size=2>Delay (Global)</font></br>";
    strSUB2 += n_Delay[ksDelayGlobal].toFixed(2) + " sec</br>";
  } else if (longestDelay == ksDelayAnimation) {
    if (
      n_A_ActiveSkill == skill_MO_RAGING_QUADRUPLE_BLOW ||
      n_A_ActiveSkill == skill_MO_RAGING_THRUST ||
      n_A_ActiveSkill == skill_CH_GLACIER_FIST
    ) {
      strSUB2name += "<font size=2>Delay (+delay reception combo)</font></br>";
      strSUB2 +=
        n_Delay[ksDelayAnimation].toFixed(2) +
        "~" +
        (n_Delay[ksDelayAnimation].toFixed(2) + 0.3) +
        " sec</br>";
    } else {
      strSUB2name += "<font size=2>Delay (Forced Motion)</font></br>";
      strSUB2 += n_Delay[ksDelayAnimation].toFixed(2) + " sec</br>";
    }
  } else if (longestDelay == ksDelayE) {
    strSUB2name += "<Font size=2>Delay (Input Limit)</font></br>";
    strSUB2 += n_Delay[ksDelayE].toFixed(2) + " sec</br>";
  } else if (longestDelay == ksDelayF) {
    strSUB2name += "<Font size=2>Damage Interval</font></br>";
    strSUB2 += n_Delay[ksDelayF].toFixed(2) + " sec</br>";
  } else if (longestDelay == ksDelaySkillDuration) {
    strSUB2name += "<font size=2>Delay (Skill-Duration)</font></br>";
    strSUB2 += n_Delay[ksDelaySkillDuration].toFixed(2) + " sec</br>";
  } else if (longestDelay == ksDelayCooldown) {
    // skill cooldown
    strSUB2name += "<font size=2>Delay (Skill Cooldown)</font></br>";
    strSUB2 += n_Delay[ksDelayCooldown].toFixed(2) + " sec</br>";
  }

  myInnerHtml("bSUB2name", strSUB2name, 0);
  myInnerHtml("bSUB2", strSUB2, 0);
}

function DisplayCriticalDamage() {
  myInnerHtml("CRIATKname", SubName[3][Language], 0);
  myInnerHtml("CRInumname", SubName[4][Language], 0);

  var wk = [0, 0, 0];
  if (n_A_WeaponType === weapTyp_KATAR) {
    for (var i = 0; i <= 2; i++) {
      wk[i] = Math.floor(
        n_A_CriATK[i] * (0.01 + SkillSearch(skill_TH_DOUBLE_ATTACK) * 0.02)
      );
      n_A_CriATK[i] += wk[i];
    }
    if (n_A_CriATK[0] === n_A_CriATK[2]) {
      myInnerHtml(
        "CRIATK",
        n_A_CriATK[0] + " (" + (n_A_CriATK[0] - wk[0]) + " + " + wk[0] + ")",
        0
      );
    } else {
      var str = n_A_CriATK[0] + "~" + n_A_CriATK[2];
      str += " (" + (n_A_CriATK[0] - wk[0]) + "~";
      str += n_A_CriATK[2] - wk[2] + " + ";
      str += wk[0] + "~" + wk[2] + ")";
      myInnerHtml("CRIATK", str, 0);
    }
  } else {
    if (n_A_CriATK[0] === n_A_CriATK[2]) {
      myInnerHtml("CRIATK", n_A_CriATK[1], 0);
    } else {
      myInnerHtml("CRIATK", n_A_CriATK[0] + "~" + n_A_CriATK[2], 0);
    }
  }

  myInnerHtml(
    "CRInum",
    Math.round(w998G * 100) / 100 + SubName[0][Language],
    0
  );
}

function ChangePatch() {
  PATCH = parseInt(formElements["A_Patch_Num"].value);
  if (PATCH == 0) {
    //Update Max Blv
    CONST_MAXLVL_THIRD = 175;
    CONST_MAXLVL_KAGOB_ENOVI = 175;
    CONST_MAXJOBLVL_THIRD = 60;

    //update skill level from updates
    //RK
    SkillOBJ[445][1] = 5; //[445,5,"Enchant Blade"],
    SkillOBJ[446][1] = 5; //[446,5,"Sonic Wave"],
    //GX
    SkillOBJ[473][1] = 5; //[473,5,"Counter Slash"],
    //AB
    SkillOBJ[490][1] = 5; //[490,5,"Judex"],
    SkillOBJ[502][1] = 1; //[502,1,"Renovatio"],
    //RAN
    SkillOBJ[518][1] = 5; //[518,5,"Research Trap"],
    //WAR
    SkillOBJ[532][1] = 5; //[532,5,"Freezing Spell"],
    SkillOBJ[549][1] = 5; //[549,5,"Summon Fire Ball"],
    SkillOBJ[550][1] = 5; //[550,5,"Summon Water Ball"],
    SkillOBJ[551][1] = 5; //[551,5,"Summon Lightning Ball"],
    SkillOBJ[552][1] = 5; //[552,5,"Summon Stone"],
    SkillOBJ[553][1] = 5; //[553,5,"Tetra Vortex"],
    //MEC
    SkillOBJ[557][1] = 5; //[557,5,"Power Swing"],
    SkillOBJ[573][1] = 3; //[573,3,"Arm Cannon"],
    //RG
    SkillOBJ[586][1] = 5; //[586,5,"Shield Press"],
    SkillOBJ[597][1] = 5; //[597,5,"Ray of Genesis"],
    //SC
    SkillOBJ[602][1] = 5; //[602,5,"Fatal Menace"],
    SkillOBJ[622][1] = 3; //[622,3,"Feint Bomb"],
    //SUR
    SkillOBJ[627][1] = 5; //[627,5,"Knuckle Arrow"],
    SkillOBJ[628][1] = 5; //[628,5,"Fallen Empire"],
    //MIWA
    SkillOBJ[654][1] = 5; //[654,5,"Metallic Sound"],
    //SOR
    SkillOBJ[674][1] = 5; //[674,5,"Spell Fist FBolt"],
    SkillOBJ[675][1] = 5; //[675,5,"Spell Fist CBolt"],
    SkillOBJ[676][1] = 5; //[676,5,"Spell Fist LBolt"],
    SkillOBJ[685][1] = 5; //[685,5,"Varetyr Spear"],
    //GEN
    SkillOBJ[689][1] = 5; //[689,5,"Cart Tornado"],
    SkillOBJ[694][1] = 5; //[694,5,"Spore Explosion"],
    // SkillOBJ[xxx][1]=y;
    //REB
    SkillOBJ[748][1] = 5;//[748,5,"Fire Dance"]
    SkillOBJ[751][1] = 5;//[751,5,"Vanishing Buster"]
    SkillOBJ[755][1] = 5;//[755,5,"God's Hammer"]
    SkillOBJ[759][1] = 5;//[759,5,"Dragon Tail"]
    SkillOBJ[761][1] = 5;//[761,5,"Round Trip"]
    //Star Emperor
    SkillOBJ[814][1] = 7// [814,7,"Solar Explosion"]
    SkillOBJ[815][1] = 7// [815,7,"Full Moon Kick"]
    SkillOBJ[816][1] = 7// [816,7,"Falling Stars"]
    //Soul Reaper
    // [825,5,"Evil Soul Curse"]
    SkillOBJ[829][1] = 5// [829,5,"Curse Explosion"]
    SkillOBJ[832][1] = 5// [832,5,"Espa"]
    SkillOBJ[837][1] = 7// [837,7,"Eswoo"]
  }
  if (PATCH >= 1) {
    //Update Max Blv
    CONST_MAXLVL_THIRD = 185;
    CONST_MAXLVL_KAGOB_ENOVI = 185;
    CONST_MAXJOBLVL_THIRD = 65;

    //update skill level from updates
    SkillOBJ[445][1] = 10; //[445,10,"Enchant Blade"],
    SkillOBJ[446][1] = 10; //[446,10,"Sonic Wave"],
    //GX
    SkillOBJ[473][1] = 10; //[473,10,"Counter Slash"],
    //AB
    SkillOBJ[490][1] = 10; //[490,10,"Judex"],
    SkillOBJ[502][1] = 4; //[502,4,"Renovatio"]
    //RAN
    SkillOBJ[518][1] = 10; //[518,10,"Research Trap"],
    //WAR
    SkillOBJ[532][1] = 10; //[532,10,"Freezing Spell"],
    SkillOBJ[549][1] = 5; //[549,5,"Summon Fire Ball"],
    SkillOBJ[550][1] = 5; //[550,5,"Summon Water Ball"],
    SkillOBJ[551][1] = 5; //[551,5,"Summon Lightning Ball"],
    SkillOBJ[552][1] = 5; //[552,5,"Summon Stone"],
    SkillOBJ[553][1] = 10; //[553,10,"Tetra Vortex"],
    //MEC
    SkillOBJ[557][1] = 10; //[557,10,"Power Swing"],
    SkillOBJ[573][1] = 5; //[573,5,"Arm Cannon"],
    //RG
    SkillOBJ[586][1] = 10; //[586,10,"Shield Press"],
    SkillOBJ[597][1] = 10; //[597,10,"Ray of Genesis"],
    //SC
    SkillOBJ[602][1] = 10; //[602,10,"Fatal Menace"],
    SkillOBJ[622][1] = 10; //[622,10,"Feint Bomb"],
    //SUR
    SkillOBJ[627][1] = 10; //[627,10,"Knuckle Arrow"],
    SkillOBJ[628][1] = 10; //[628,10,"Fallen Empire"],
    //MIWA
    SkillOBJ[654][1] = 10; //[654,10,"Metallic Sound"],
    //SOR
    SkillOBJ[674][1] = 10; //[674,10,"Spell Fist FBolt"],
    SkillOBJ[675][1] = 10; //[675,10,"Spell Fist CBolt"],
    SkillOBJ[676][1] = 10; //[676,10,"Spell Fist LBolt"],
    SkillOBJ[685][1] = 10; //[685,10,"Varetyr Spear"],
    //GEN
    SkillOBJ[689][1] = 10; //[689,10,"Cart Tornado"]
    SkillOBJ[694][1] = 10; //[694,10,"Spore Explosion"]
    // SkillOBJ[573][1]=5;
    //REB
    SkillOBJ[748][1] = 5;//[748,5,"Fire Dance"]
    SkillOBJ[751][1] = 5;//[751,5,"Vanishing Buster"]
    SkillOBJ[755][1] = 5;//[755,5,"God's Hammer"]
    SkillOBJ[759][1] = 5;//[759,5,"Dragon Tail"]
    SkillOBJ[761][1] = 5;//[761,5,"Round Trip"]
    //Star Emperor
    SkillOBJ[814][1] = 7// [814,7,"Solar Explosion"]
    SkillOBJ[815][1] = 7// [815,7,"Full Moon Kick"]
    SkillOBJ[816][1] = 7// [816,7,"Falling Stars"]
    //Soul Reaper
    // [825,5,"Evil Soul Curse"]
    SkillOBJ[829][1] = 5// [829,5,"Curse Explosion"]
    SkillOBJ[832][1] = 5// [832,5,"Espa"]
    SkillOBJ[837][1] = 7// [837,7,"Eswoo"]
  }
  if (PATCH == 2) {
    //Update Max Blv
    CONST_MAXLVL_THIRD = 185;
    CONST_MAXLVL_KAGOB_ENOVI = 185;
    CONST_MAXJOBLVL_THIRD = 65;
    //RK
    SkillOBJ[445][1] = 10; //[445,10,"Enchant Blade"],
    SkillOBJ[446][1] = 10; //[446,10,"Sonic Wave"],
    //GX
    SkillOBJ[473][1] = 10; //[473,10,"Counter Slash"],
    //AB
    SkillOBJ[490][1] = 10; //[490,10,"Judex"],
    SkillOBJ[502][1] = 4; //[502,4,"Renovatio"]
    //RAN
    SkillOBJ[518][1] = 10; //[518,10,"Research Trap"],
    //WAR
    SkillOBJ[532][1] = 10; //[532,10,"Freezing Spell"],
    SkillOBJ[549][1] = 2; //[549,2,"Summon Fire Ball"],
    SkillOBJ[550][1] = 2; //[550,2,"Summon Water Ball"],
    SkillOBJ[551][1] = 2; //[551,2,"Summon Lightning Ball"],
    SkillOBJ[552][1] = 2; //[552,2,"Summon Stone"],
    SkillOBJ[553][1] = 10; //[553,10,"Tetra Vortex"],
    //MEC
    SkillOBJ[557][1] = 10; //[557,10,"Power Swing"],
    SkillOBJ[573][1] = 5; //[573,5,"Arm Cannon"],
    //RG
    SkillOBJ[586][1] = 10; //[586,10,"Shield Press"],
    SkillOBJ[597][1] = 10; //[597,10,"Ray of Genesis"],
    //SC
    SkillOBJ[602][1] = 10; //[602,10,"Fatal Menace"],
    SkillOBJ[622][1] = 10; //[622,10,"Feint Bomb"],
    //SUR
    SkillOBJ[627][1] = 10; //[627,10,"Knuckle Arrow"],
    SkillOBJ[628][1] = 10; //[628,10,"Fallen Empire"],
    //MIWA
    SkillOBJ[654][1] = 10; //[654,10,"Metallic Sound"],
    //SOR
    SkillOBJ[674][1] = 10; //[674,10,"Spell Fist FBolt"],
    SkillOBJ[675][1] = 10; //[675,10,"Spell Fist CBolt"],
    SkillOBJ[676][1] = 10; //[676,10,"Spell Fist LBolt"],
    SkillOBJ[685][1] = 10; //[685,10,"Varetyr Spear"],
    //GEN
    SkillOBJ[689][1] = 10; //[689,10,"Cart Tornado"]
    SkillOBJ[694][1] = 10; //[694,10,"Spore Explosion"]
    //REB
    SkillOBJ[748][1] = 10;//[748,5,"Fire Dance"]
    SkillOBJ[751][1] = 10;//[751,5,"Vanishing Buster"]
    SkillOBJ[755][1] = 10;//[755,5,"God's Hammer"]
    SkillOBJ[759][1] = 10;//[759,5,"Dragon Tail"]
    SkillOBJ[761][1] = 10;//[761,5,"Round Trip"]
    //Star Emperor
    SkillOBJ[814][1] = 10// [814,7,"Solar Explosion"]
    SkillOBJ[815][1] = 10// [815,7,"Full Moon Kick"]
    SkillOBJ[816][1] = 10// [816,7,"Falling Stars"]
    //Soul Reaper
    // [825,5,"Evil Soul Curse"]
    SkillOBJ[829][1] = 10// [829,5,"Curse Explosion"]
    SkillOBJ[832][1] = 10// [832,5,"Espa"]
    SkillOBJ[837][1] = 10// [837,7,"Eswoo"]
    
  }
  let temp = "";
  if (formElements["A_JOB"].value != 0) temp += TempSaveActual();
  ChangeJob(formElements["A_JOB"].value);
  if (formElements["A_JOB"].value != 0) TempLoadActual(temp);
}
