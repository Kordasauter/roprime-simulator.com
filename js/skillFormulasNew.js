const Passive = 0;
//Active/Selfbuff/Debuff
const Active = 1;
const Offensive = 2;
//Support/Buff
const Support = 3;

const Skill = [
  (ALL_BASIC_ATTACK = {
    id: 0,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (ALL_FIRST_AID = {
    id: 1,
    type: Support,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ALL_PLAY_DEAD = {
    id: 2,
    type: Active,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SW_SWORD_MASTERY = {
    id: 3,
    type: Passive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_SWORD || n_A_WeaponType == weapTyp_DAGGER)
        return 4 * SkillLV;
      else return 0;
    },
  }),
  (SW_TWO_HAND_SWORD_MASTERY = {
    id: 4,
    type: Passive,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_2HSWORD) return 4 * SkillLV;
      else return 0;
    },
  }),
  (SW_INCREASED_HP_RECOVERY = {
    id: 5,
    type: Passive,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    // skillFormula(SkillLV){return 5 * SkillSearch(skill_SW_INCREASED_HP_RECOVERY)},
    skillFormula(SkillLV) {
      return 5;
    },
  }),
  (SW_BASH = {
    id: 6,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 30 * SkillLV;
    },
  }),
  (SW_MAGNUM_BREAK = {
    id: 7,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.5",
    cooldown: "2",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 20 * SkillLV;
    },
  }),
  (SW_PROVOKE = {
    id: 8,
    type: Active,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SW_ENDURE = {
    id: 9,
    type: Active,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (SW_HP_RECOVERY_WHILE_MOVING = {
    id: 10,
    type: Passive,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SW_FATAL_BLOW = {
    id: 11,
    type: Passive,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SW_BERSERK = {
    id: 12,
    type: Active,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 32 * SkillLV;
    },
  }),
  (TH_DOUBLE_ATTACK = {
    id: 13,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "2",
    hitDivisibility: "1",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (TH_IMPROVE_DODGE = {
    id: 14,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_JobSearch2() == cls_ASS || n_A_JobSearch2() == cls_ROG)
        return 4 * SkillSearch(skill_TH_IMPROVE_DODGE);
      else return 3 * SkillSearch(skill_TH_IMPROVE_DODGE);
    },
  }),
  (TH_STEAL = {
    id: 15,
    type: Active,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TH_HIDING = {
    id: 16,
    type: Active,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TH_ENVENOM = {
    id: 17,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_POISON,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 15 * SkillLV;
    }, //basic attack + (15 * skill level)
  }),
  (TH_DETOXIFY = {
    id: 18,
    type: Support,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TH_SAND_ATTACK = {
    id: 19,
    type: Offensive,
    range: [1],
    forcedElement: true,
    skillElement: ele_EARTH,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 125;
    },
  }),
  (TH_BACK_SLIDE = {
    id: 20,
    type: Active,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TH_FIND_STONE = {
    id: 21,
    type: Active,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TH_STONE_FLING = {
    id: 22,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 50;
    },
  }),
  (AC_DIVINE_PROTECTION = {
    id: 23,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_DEMON_BANE = {
    id: 24,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_RACE] == race_UNDEAD || n_B[en_RACE] == race_DEMON)
        return Math.floor((3 + (5 / 100) * n_A_BaseLV) * SkillLV);
      else return 0;
    },
  }),
  (AC_HEAL = {
    id: 25,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_CURE = {
    id: 26,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_INCREASE_AGI = {
    id: 27,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_DECREASE_AGI = {
    id: 28,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_SIGNUM_CRUSIS = {
    id: 29,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_ANGELUS = {
    id: 30,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_BLESSING = {
    id: 31,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_PNEUMA = {
    id: 32,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_AQUA_BENEDICTA = {
    id: 33,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_RUWACH = {
    id: 34,
    type: Offensive,
    range: [1],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 145;
    },
  }),
  (AC_TELEPORT = {
    id: 35,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_WARP_PORTAL = {
    id: 36,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_HOLY_LIGHT = {
    id: 37,
    type: Offensive,
    range: [1],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: "0.2",
    variableCastTime: "0.8",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 125;
    },
  }),
  // Archer
  (AR_OWL_EYE = {
    id: 38,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AR_VULTURE_EYE = {
    id: 39,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AR_DOUBLE_STRAFE = {
    id: 40,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.1",
    cooldown: "0.3",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "2",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 90 + 10 * SkillLV;
    },
  }),
  (AR_ARROW_SHOWER = {
    id: 41,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.1",
    cooldown: "0.3",
    animation: `1`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 150 + 10 * SkillLV;
    },
  }),
  (AR_IMPROVE_CONCENTRATION = {
    id: 42,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AR_ARROW_CRAFTING = {
    id: 43,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AR_ARROW_REPEL = {
    id: 44,
    type: Offensive,
    range: [10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.8",
    variableCastTime: "0.4",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 150;
    },
  }),
  // Mage
  (MA_INCREASED_SP_RECOVERY = {
    id: 45,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MA_NAPALM_BEAT = {
    id: 46,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_GHOST,
    fixedCastTime: `0`,
    variableCastTime: "0.6",
    castDelay: `
		if(n_A_ActiveSkillLV <= 3)
			1.0
		else if(n_A_ActiveSkillLV <= 5)
			0.9
		else if(n_A_ActiveSkillLV <= 7)
			0.8
		else if(n_A_ActiveSkillLV == 8)
			0.7
		else if(n_A_ActiveSkillLV == 9)
			0.6
		else if(n_A_ActiveSkillLV == 10)
			0.5
	`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 70 + 10 * SkillLV;
    },
  }),
  (MA_SOUL_STRIKE = {
    id: 47,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_GHOST,
    fixedCastTime: `0`,
    variableCastTime: "0.5",
    castDelay: "1.4",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "Math.floor(n_A_ActiveSkillLV / 2)",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (MA_SAFETY_WALL = {
    id: 48,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MA_STONE_CURSE = {
    id: 49,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MA_SIGHT = {
    id: 50,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MA_FIRE_BOLT = {
    id: 51,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.2 + (0.1 * n_A_ActiveSkillLV)",
    variableCastTime: "0.2 + (0.3 * n_A_ActiveSkillLV)",
    castDelay: "1.4",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (MA_FIRE_BALL = {
    id: 52,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.2",
    variableCastTime: "0.8",
    castDelay: "0.7",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 140 + 20 * SkillLV;
    },
  }),
  (MA_FIRE_WALL = {
    id: 53,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `0`,
    variableCastTime: "2.15 - (n_A_ActiveSkillLV * 0.15)",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50;
    },
  }),
  (MA_COLD_BOLT = {
    id: 54,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: "0.2 + (0.1 * n_A_ActiveSkillLV)",
    variableCastTime: "0.2 + (0.3 * n_A_ActiveSkillLV)",
    castDelay: "1.4",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (MA_FROST_DIVER = {
    id: 55,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 10 * SkillLV;
    },
  }),
  (MA_LIGHTNING_BOLT = {
    id: 56,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "0.2 + (0.1 * n_A_ActiveSkillLV)",
    variableCastTime: "0.2 + (0.3 * n_A_ActiveSkillLV)",
    castDelay: "1.4",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (MA_THUNDER_STORM = {
    id: 57,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "1.5",
    variableCastTime: "2.5 + (0.2 * n_A_ActiveSkillLV)",
    castDelay: "2",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "n_A_ActiveSkillLV",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 * SkillLV;
    },
  }),
  (MA_ENERGY_COAT = {
    id: 58,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  // Merchent
  (ME_ENLARGE_WEIGHT_LIMIT = {
    id: 59,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ME_DISCOUNT = {
    id: 60,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ME_OVERCHARGE = {
    id: 61,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ME_PUSHCART = {
    id: 62,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ME_ITEM_APPRAISAL = {
    id: 63,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ME_VENDING = {
    id: 64,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ME_MAMMONITE = {
    id: 65,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 50 * SkillLV;
    },
  }),
  (ME_CART_REVOLUTION = {
    id: 66,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 150 + (100 * eval(document.calcForm.SkillSubNum.value)) / 8000;
    },
  }),
  (ME_CHANGE_CART = {
    id: 67,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ME_CRAZY_UPROAR = {
    id: 68,
    type: Active,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 30 * SkillLV;
    },
  }),
  (KN_SPEAR_MASTERY = {
    id: 69,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let spear_mastery = 0;
      if (n_A_WeaponType == weapTyp_SPEAR || n_A_WeaponType == weapTyp_SPEARII)
        if (
          SkillSearch(skill_KN_PECO_PECO_RIDE) ||
          SkillSearch(skill_RUN_DRAGON_TRAINING)
        )
          spear_mastery += 4 * SkillLV;
        else spear_mastery += 3 * SkillLV;

      //source : rathena > battle.cpp-> battle_addmastery function
      if (SkillSearch(skill_RUN_DRAGON_TRAINING)) spear_mastery += SkillLV * 10;
      return spear_mastery;
    },
  }),
  (KN_PIERCE = {
    id: 70,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "n_B[en_SIZE]",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 10 * SkillLV;
    },
  }),
  (KN_SPEAR_STAB = {
    id: 71,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 20 * SkillLV;
    },
  }),
  (KN_SPEAR_BOOMERANG = {
    id: 72,
    type: Offensive,
    range: [5, 7, 9, 11, 13],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 50 * SkillLV;
    },
  }),
  (KN_BRANDISH_SPEAR = {
    id: 73,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.35",
    variableCastTime: "0.5",
    castDelay: `0`,
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 400 + 100 * SkillLV;
    },
  }),
  (KN_TWOHAND_QUICKEN = {
    id: 74,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (KN_AUTO_COUNTER = {
    id: 75,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (KN_BOWLING_BASH = {
    id: 76,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.35",
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `
	if(n_A_WeaponType == weapTyp_2HSWORD)
	{
		let numEnemies = parseInt(formElements["SkillSubNum"].value);
		if(numEnemies == 0)
			2
		else if(numEnemies == 1)
			3
		else
			4
	}
	else
		2
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 40 * SkillLV;
    },
  }),
  (KN_PECO_PECO_RIDE = {
    id: 77,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (KN_CAVALIER_MASTERY = {
    id: 78,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AS_RIGHTHAND_MASTERY = {
    id: 79,
    type: Passive,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50 + SkillSearch(skill_AS_RIGHTHAND_MASTERY) * 10;
    },
  }),
  (AS_LEFTHAND_MASTERY = {
    id: 80,
    type: Passive,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 30 + (SkillLV * 10);
    },
  }),
  (AS_KATAR_MASTERY = {
    id: 81,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_KATAR) return 3 * SkillLV;
      else return 0;
    },
  }),
  (AS_CLOAKING = {
    id: 82,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AS_SONIC_BLOW = {
    id: 83,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.5",
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "8",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillSearch(skill_AS_SONIC_ACCELERATION)) return 220 + 110 * SkillLV;
      return 200 + 100 * SkillLV;
    },
  }),
  (AS_GRIMTOOTH = {
    id: 84,
    type: Offensive,
    range: [3, 4, 5, 6, 7],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 20 * SkillLV;
    },
  }),
  (AS_ENCHANT_POISON = {
    id: 85,
    type: Support,
    range: [1],
    forcedElement: true,
    skillElement: ele_POISON,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (AS_POISON_REACT = {
    id: 86,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AS_VENOM_DUST = {
    id: 87,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AS_VENOM_SPLASHER = {
    id: 88,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: "0.5",
    castDelay: `0`,
    cooldown: "12 - n_A_ActiveSkillLV",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 400 + SkillLV * 100;
    },
  }),
  (PR_MACE_MASTERY = {
    id: 89,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 3 * SkillSearch(skill_PR_MACE_MASTERY);
    },
  }),
  (PR_IMPOSITIO_MANUS = {
    id: 90,
    type: Support,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 5 * SkillLV;
    },
  }),
  (PR_SUFFRAGIUM = {
    id: 91,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_ASPERSIO = {
    id: 92,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_BS_SACRIMENTI = {
    id: 93,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_SANCTUARY = {
    id: 94,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_STATUS_RECOVERY = {
    id: 95,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_SLOW_POISON = {
    id: 96,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_RESSURECTION = {
    id: 97,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_KYRIE_ELEISON = {
    id: 98,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_MAGNIFICAT = {
    id: 99,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_GLORIA = {
    id: 100,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_LEX_DIVINA = {
    id: 101,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_TURN_UNDEAD = {
    id: 102,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_LEX_AETERNA = {
    id: 103,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_MAGNUS_EXORCISMUS = {
    id: 104,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: `1`,
    variableCastTime: "4",
    castDelay: `1`,
    cooldown: "6",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (
        n_B[en_RACE] == race_DEMON ||
        n_B[en_RACE] == race_UNDEAD ||
        n_B[en_ELEMENT] == ele_DARK ||
        n_B[en_ELEMENT] == ele_UNDEAD
      )
        return 130;
      else return 100;
    },
  }),
  (HU_SKID_TRAP = {
    id: 105,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_LAND_MINE = {
    id: 106,
    type: Offensive,
    range: [3, 3, 3, 3, 3],
    forcedElement: true,
    skillElement: ele_EARTH,
    fixedCastTime: "0.3",
    variableCastTime: "0.5",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return [
        Math.floor(
          n_A_DEX *
            (3 + n_A_BaseLV / 100) *
            (1 + n_A_INT / 35) *
            SkillLV *
            0.9 +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
        Math.floor(
          n_A_DEX * (3 + n_A_BaseLV / 100) * (1 + n_A_INT / 35) * SkillLV +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
        Math.floor(
          n_A_DEX *
            (3 + n_A_BaseLV / 100) *
            (1 + n_A_INT / 35) *
            SkillLV *
            1.1 +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
      ];
    },
  }),
  (HU_ANKLE_SNARE = {
    id: 107,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_FLASHER = {
    id: 108,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_SHOCKWAVE_TRAP = {
    id: 109,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_SANDMAN = {
    id: 110,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_FREEZING_TRAP = {
    id: 111,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_BLAST_MINE = {
    id: 112,
    type: Offensive,
    range: [3, 3, 3, 3, 3],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "0.3",
    variableCastTime: "0.5",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return [
        Math.floor(
          n_A_DEX *
            (3 + n_A_BaseLV / 100) *
            (1 + n_A_INT / 35) *
            SkillLV *
            0.9 +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
        Math.floor(
          n_A_DEX * (3 + n_A_BaseLV / 100) * (1 + n_A_INT / 35) * SkillLV +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
        Math.floor(
          n_A_DEX *
            (3 + n_A_BaseLV / 100) *
            (1 + n_A_INT / 35) *
            SkillLV *
            1.1 +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
      ];
    },
  }),
  (HU_CLAYMORE_TRAP = {
    id: 113,
    type: Offensive,
    range: [3, 3, 3, 3, 3],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.3",
    variableCastTime: "0.5",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return [
        Math.floor(
          n_A_DEX *
            (3 + n_A_BaseLV / 85) *
            (1.1 + n_A_INT / 35) *
            SkillLV *
            0.9 +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
        Math.floor(
          n_A_DEX * (3 + n_A_BaseLV / 85) * (1.1 + n_A_INT / 35) * SkillLV +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
        Math.floor(
          n_A_DEX *
            (3 + n_A_BaseLV / 85) *
            (1.1 + n_A_INT / 35) *
            SkillLV *
            1.1 +
            40 * SkillSearch(skill_RAN_RESEARCH_TRAP)
        ),
      ];
    },
  }),
  (HU_REMOVE_TRAP = {
    id: 114,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_TALKIE_BOX = {
    id: 115,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_BEAST_BANE = {
    id: 116,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_RACE] == race_BRUTE || n_B[en_RACE] == race_INSECT)
        return (
          4 * SkillLV +
          HU_HUNTER_SPIRIT.skillFormula(SkillSearch(skill_HU_HUNTER_SPIRIT))
        );
      else return 0;
    },
  }),
  (HU_FALCONRY_MASTERY = {
    id: 117,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_BLITZ_BEAT = {
    id: 118,
    type: Offensive,
    range: [5, 5, 5, 5, 5],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.3",
    variableCastTime: "1.2",
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return (
        SkillLV * 20 +
        SkillSearch(skill_HU_STEEL_CROW) * 6 +
        Math.floor(n_A_AGI / 2) * 2 +
        Math.floor(n_A_DEX / 10) * 2
      );
    },
  }),
  (HU_STEEL_CROW = {
    id: 119,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_DETECT = {
    id: 120,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_SPRING_TRAP = {
    id: 121,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WI_FIRE_PILLAR = {
    id: 122,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.528 - (n_A_ActiveSkillLV * 0.048)",
    variableCastTime: "2.112 - (n_A_ActiveSkillLV * 0.192)",
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "2 + n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return n_A_MATK[1] / 5 + 50;
    },
  }),
  (WI_SENSE = {
    id: 123,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WI_SIGHTRASHER = {
    id: 124,
    type: Offensive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.08",
    variableCastTime: "0.32",
    castDelay: "2",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 20 * SkillLV;
    },
  }),
  (WI_METEOR_STORM = {
    id: 125,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "1.5",
    variableCastTime: "6.3",
    castDelay: `1`,
    cooldown: "2 + (n_A_ActiveSkillLV * 0.5)",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "Math.floor(n_A_ActiveSkillLV / 2)",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 125;
    },
  }),
  (WI_JUPITEL_THUNDER = {
    id: 126,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "0.5",
    variableCastTime: "1.8 + (n_A_ActiveSkillLV * 0.2)",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "2 + n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (WI_LORD_OF_VERMILLION = {
    id: 127,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "1.5",
    variableCastTime: "6.5 - (n_A_ActiveSkillLV * 0.2)",
    castDelay: `1`,
    cooldown: "5",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "20",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 400 + SkillLV * 100;
    },
  }),
  (WI_WATER_BALL = {
    id: 128,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `0`,
    variableCastTime: "n_A_ActiveSkillLV",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `
	if(n_A_ActiveSkillLV == 1)
		1
	else if(n_A_ActiveSkillLV <= 3)
		9
	else if(n_A_ActiveSkillLV <= 9)
		25
	else
		100
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + SkillLV * 30;
    },
  }),
  (WI_ICE_WALL = {
    id: 129,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WI_FROST_NOVA = {
    id: 130,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `0`,
    variableCastTime: "1 - (Math.floor((n_A_ActiveSkillLV - 1) / 2) * 0.1)",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 66 + 7 * SkillLV - Math.floor((SkillLV - 1) / 3);
    },
  }),
  (WI_STORM_GUST = {
    id: 131,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: "1.5",
    variableCastTime: "4.3 + (n_A_ActiveSkillLV * 0.2)",
    castDelay: `1`,
    cooldown: "6",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 70 + SkillLV * 50;
    },
  }),
  (WI_EARTH_SPIKE = {
    id: 132,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_EARTH,
    fixedCastTime: "0.2 + (0.2 * n_A_ActiveSkillLV)",
    variableCastTime: "0.7 + (0.5 * n_A_ActiveSkillLV)",
    castDelay: "0.9 + (0.1 * n_A_ActiveSkillLV)",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200;
    },
  }),
  (WI_HEAVENS_DRIVE = {
    id: 133,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_EARTH,
    fixedCastTime: "0.8",
    variableCastTime: "0.9 + (0.2 * n_A_ActiveSkillLV)",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 125;
    },
  }),
  (WI_QUAGMIRE = {
    id: 134,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_IRON_TEMPERING = {
    id: 135,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_STEEL_TEMPERING = {
    id: 136,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_ENCHANTEDSTONE_CRAFT = {
    id: 137,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_ORIDECON_RESEARCH = {
    id: 138,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITH_DAGGER = {
    id: 139,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITH_SWORD = {
    id: 140,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITH_TWO_HANDED_SWORD = {
    id: 141,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITH_AXE = {
    id: 142,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITH_MACE = {
    id: 143,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITH_KNUCKLEBRACE = {
    id: 144,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITH_SPEAR = {
    id: 145,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_HILT_BINDING = {
    id: 146,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 4 * SkillLV;
    },
  }),
  (BS_ORE_DISCOVERY = {
    id: 147,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_WEAPONRY_RESEARCH = {
    id: 148,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return SkillLV * 2;
    },
  }),
  (BS_WEAPON_REPAIR = {
    id: 149,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SKIN_TEMPERING = {
    id: 150,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_HAMMER_FALL = {
    id: 151,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_ADRENALINE_RUSH = {
    id: 152,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_WEAPON_PERFECTION = {
    id: 153,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_POWER_THRUST = {
    id: 154,
    type: Support,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) return 5 * SkillLV;
      else if (otherBuffs[ksPowerThrust])
        return 5 * (5 * Math.floor((otherBuffs[ksPowerThrust] - 1) / 2));
      else return 0;
    },
  }),
  (BS_POWER_MAXIMIZE = {
    id: 155,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (CR_FAITH = {
    id: 156,
    type: Passive /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 * SkillLV;
    },
  }),
  (CR_GUARD = {
    id: 157,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (CR_SMITE = {
    id: 158,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 20 * SkillLV;
    },
  }),
  (CR_SHIELD_BOOMERANG = {
    id: 159,
    type: Offensive,
    range: [3, 5, 7, 9, 11],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.7",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 80 * SkillLV;
    },
  }),
  (CR_SHIELD_REFLECT = {
    id: 160,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (CR_HOLY_CROSS = {
    id: 161,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "2",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_2HSPEAR) return 2 * (100 + 35 * SkillLV);
      else return 100 + 35 * SkillLV;
    },
  }),
  (CR_GRAND_CROSS = {
    id: 162,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: "0.5",
    variableCastTime: `1`,
    castDelay: "0.5",
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: true,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 40 * SkillLV;
    },
  }),
  (CR_SACRIFICE = {
    id: 163,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }), // DEVO !!!
  (CR_RESISTANT_SOULS = {
    id: 164,
    type: 0 /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (CR_DEFENDING_AURA = {
    id: 165,
    type: Support /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 5 + 15 * SkillLV;
    },
  }),
  (CR_SPEAR_QUICKEN = {
    id: 166,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_SNATCH = {
    id: 167,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 30 * SkillLV;
    },
  }),
  (RG_MUG = {
    id: 168,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_BACK_STAB = {
    id: 169,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.5",
    cooldown: "0.5",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `
	if(n_A_WeaponType == weapTyp_DAGGER)
		2
	else
		1
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 300 + 40 * SkillLV;
    },
  }),
  (RG_STALK = {
    id: 170,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_SIGHTLESS_MIND = {
    id: 171,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50 + 150 * SkillLV;
    },
  }),
  (RG_DIVEST_WEAPON = {
    id: 172,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_DIVEST_SHIELD = {
    id: 173,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_DIVEST_ARMOR = {
    id: 174,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_DIVEST_HELM = {
    id: 175,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_GANK = {
    id: 176,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_SCRIBBLE = {
    id: 177,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_PIECE = {
    id: 178,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_REMOVER = {
    id: 179,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_SLYNESS = {
    id: 180,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_HAGGLE = {
    id: 181,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RG_INTIMIDATE = {
    id: 182,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_IRON_FIST = {
    id: 183,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_NONE || n_A_WeaponType == weapTyp_KNUCKLE)
        return 3 * SkillLV;
      else return 0;
    },
  }),
  (MO_SPIRITUAL_CADENCE = {
    id: 184,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_SUMMON_SPIRIT_SPHERE = {
    id: 185,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let numSpheres = SkillLV;
      switch (n_A_ActiveSkill) {
        case skill_SUR_RAMPAGE_BLASTER:
        case skill_MO_GUILLOTINE_FIST:
        case skill_MO_MAX_GUILLOTINE_FIST:
          numSpheres = 0;
          break;
          // case skill_SUR_FALLEN_EMPIRE:
          // 	numSpheres -=2;
          // break;
        case skill_SUR_EARTH_SHAKER:
         	numSpheres -=1;
          break;
        default:
          break;
      }
      numSpheres = Max(numSpheres, 0);
      return 3 * numSpheres;
    },
  }),
  (MO_SPIRITUAL_SPHERE_ABSORPTION = {
    id: 186,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_RAGING_TRIFECTA_BLOW = {
    id: 187,
    type: Offensive, //Should be Passive but for sim it will be listed as Offensive
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 300;
    },
  }),
  (MO_RAGING_QUADRUPLE_BLOW = {
    id: 188,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "1.3 - ((n_A_AGI * 0.0004) - (n_A_DEX * 0.002))",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: 1,
    hitDivisibility: `
	if(n_A_WeaponType == weapTyp_KNUCKLE)
		6
	else
		4
	`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_KNUCKLE) return 1000;
      else return 500;
    },
  }),
  (MO_RAGING_THRUST = {
    id: 189,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "1.3 - ((n_A_AGI * 0.0004) - (n_A_DEX * 0.002))",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 450 + 150 * SkillLV + n_A_STR * 5;
    },
  }),
  (MO_SNAP = {
    id: 190,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_FLEE = {
    id: 191,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 1 + (SkillLV - 1) + Math.floor(SkillLV / 2);
    },
  }),
  (MO_THROW_SPIRIT_SPHERES = {
    id: 192,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: "0.5",
    castDelay: "0.5",
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "5",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 600 + 200 * SkillLV;
    },
    /*TODO*/
    /* add +50% damage with root */
  }),
  (MO_OCCULT_IMPACTION = {
    id: 193,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: "0.5",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 * SkillLV;
    },
  }),
  (MO_ROOT = {
    id: 194,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_FURY = {
    id: 195,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_MENTAL_STRENGTH = {
    id: 196,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_GUILLOTINE_FIST = {
    id: 197,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "2.25 - (n_A_ActiveSkillLV * 0.25)",
    variableCastTime: "2.25 - (n_A_ActiveSkillLV * 0.25)",
    castDelay: "3 - (n_A_ActiveSkillLV * 0.5)",
    cooldown: "3",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: true,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let ratio = 100;
      ratio += 100 * (7 + eval(document.calcForm.SkillSubNum.value) / 10);
      return ratio;
    },
  }),
  (BA_MUSIC_LESSONS = {
    id: 198,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_INSTRUMENT) return 3 * SkillLV;
      else return 0;
    },
  }),
  (BA_MELODY_STRIKE = {
    id: 199,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: "0.5",
    castDelay: "0.3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 110 + 40 * SkillLV;
    },
  }),
  (BA_UNCHAINED_SERENADE = {
    id: 200,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.3",
    cooldown: "5",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 10 * SkillLV;
    },
  }),
  (BA_UNBARRING_OCTAVE = {
    id: 201,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BA_PERFECT_TABLATURE = {
    id: 202,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BA_IMPRESSIVE_RIFT = {
    id: 203,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BA_MAGIC_STRINGS = {
    id: 204,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BA_SONG_OF_LUTIE = {
    id: 205,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (DA_DANCE_LESSONS = {
    id: 206,
    type: Passive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_WHIP) return 3 * SkillLV;
      else return 0;
    },
  }),
  (DA_SLINGING_ARROW = {
    id: 207,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: "0.5",
    castDelay: "0.3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "2",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 110 + 40 * SkillLV;
    },
  }),
  (DA_HIP_SHAKER = {
    id: 208,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (DA_DAZZLER = {
    id: 209,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (DA_FOCUS_BALLET = {
    id: 210,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (DA_SLOW_GRACE = {
    id: 211,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (DA_LADY_LUCK = {
    id: 212,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (DA_GYPSYS_KISS = {
    id: 213,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_AMP = {
    id: 214,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_ENCORE = {
    id: 215,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_LULLABY = {
    id: 216,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_MENTAL_SENSING = {
    id: 217,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_DOWN_TEMPO = {
    id: 218,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_BATTLE_THEME = {
    id: 219,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_HARMONIC_LICK = {
    id: 220,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_CLASSICAL_PLUCK = {
    id: 221,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_POWER_CORD = {
    id: 222,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BD_ACOUSTIC_RHYTHM = {
    id: 223,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_STUDY = {
    id: 224,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_BOOK) return 3 * SkillLV;
      else return 0;
    },
  }),
  (SA_CAST_CANCEL = {
    id: 225,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_MAGIC_ROD = {
    id: 226,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_SPELL_BREAKER = {
    id: 227,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_FREE_CAST = {
    id: 228,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_HINDSIGHT = {
    id: 229,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_ENDOW_BLAZE = {
    id: 230,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_ENDOW_TSUNAMI = {
    id: 231,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_ENDOW_TORNADO = {
    id: 232,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_ENDOW_QUAKE = {
    id: 233,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_DRAGONOLOGY = {
    id: 234,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_RACE] == race_DRAGON) return 4 * SkillLV;
      else return 0;
    },
  }),
  (SA_VOLCANO = {
    id: 235,
    type: Support,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) return 5 + 5 * SkillLV;
      else return 0;
    },
  }),
  (SA_DELUGE = {
    id: 236,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_WHIRLWIND = {
    id: 237,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_MAGNETIC_EARTH = {
    id: 238,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_DISPELL = {
    id: 239,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_HOCUS_POCUS = {
    id: 240,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_AXE_MASTERY = {
    id: 241,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (
        n_A_WeaponType == weapTyp_AXE ||
        n_A_WeaponType == weapTyp_2HAXE ||
        n_A_WeaponType == weapTyp_SWORD
      )
        return 3 * SkillLV;
      else return 0;
    },
  }),
  (AL_POTION_RESEARCH = {
    id: 242,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_PREPARE_POTION = {
    id: 243,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_ACID_TERROR = {
    id: 244,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 * SkillLV + 100 * SkillSearch(skill_AL_POTION_RESEARCH);
    },
  }),
  (AL_POTION_PITCHER = {
    id: 245,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_SUMMON_FLORA = {
    id: 246,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_SUMMON_MARINE_SPHERE = {
    id: 247,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_BOMB = {
    id: 248,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.2",
    variableCastTime: "0.8",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 60 * SkillLV + 10 * SkillSearch(skill_AL_POTION_RESEARCH);
    },
  }),
  (AL_ALCHEMICAL_WEAPON = {
    id: 249,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_SYNTHESIZED_SHIELD = {
    id: 250,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_SYNTHETIC_ARMOR = {
    id: 251,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AL_BIOCHEMICAL_HELM = {
    id: 252,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SN_FURY = {
    id: 253,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (LK_AURA_BLADE = {
    id: 254,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) return n_A_BaseLV * (3 + SkillLV);
      else return 0;
    },
  }),
  (LK_PARRYING = {
    id: 255,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (LK_SPEAR_DYNAMO = {
    id: 256,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) return 5 + 2 * SkillLV;
      return 0;
    },
  }),
  (LK_TENSION_RELAX = {
    id: 257,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (LK_FRENZY = {
    id: 258,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (LK_CLASHING_SPIRAL = {
    id: 259,
    type: Offensive,
    range: [5, 5, 5, 5, 5],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.3",
    variableCastTime: "0.25",
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "5",
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return (150 + 50 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (LK_TRAUMATIC_BLOW = {
    id: 260,
    type: Offensive,
    range: [5, 5, 5, 5, 5],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 40 * SkillLV;
    },
  }),
  (LK_VITAL_STRIKE = {
    id: 261,
    type: Offensive,
    range: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50 + 10 * SkillLV;
    },
  }),
  (AX_ADVANCED_KATAR_MASTERY = {
    id: 262,
    type: Passive,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 10 + 2 * SkillLV;
    },
  }),
  (AX_SOUL_DESTROYER = {
    id: 263,
    type: Offensive,
    range: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2) return 350 + 50 * SkillLV;
      else return (SkillLV * 150 + n_A_STR + n_A_INT) * (n_A_BaseLV / 100);
    },
  }),
  (AX_METEOR_ASSAULT = {
    id: 264,
    type: Offensive,
    range: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.25",
    variableCastTime: "0.25",
    castDelay: `0`,
    cooldown: "0.5",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (100 + 120 * SkillLV + n_A_STR * 5) * (n_A_BaseLV / 100);
    },
  }),
  (AX_CREATE_DEADLY_POISON = {
    id: 265,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AX_ENCHANT_DEADLY_POISON = {
    id: 266,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 250 + 30 * SkillLV;
    },
  }),
  (HP_ASSUMPTIO = {
    id: 267,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HP_BASILICA = {
    id: 268,
    type: Support /*TODO*/,
    range: [10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HP_MEDIATIO = {
    id: 269,
    type: Passive /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SN_FALCON_EYES = {
    id: 270,
    type: Support,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 2 * SkillLV;
    },
  }),
  (SN_FALCON_ASSAULT = {
    id: 271,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: "0.5",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      let formula = Math.floor(n_A_AGI / 2) * 2;
      formula += Math.floor(n_A_DEX / 10) * 2;
      formula += SkillSearch(skill_HU_BLITZ_BEAT) * 20;
      formula += SkillSearch(skill_HU_STEEL_CROW) * 6;
      formula *= SkillLV;
      formula += SkillSearch(skill_HU_STEEL_CROW) * 6;
      formula *=
        SkillSearch(skill_HU_STEEL_CROW) / 20 + SkillLV + n_A_BaseLV / 50;
      return formula;
    },
  }),
  (SN_FOCUSED_ARROW_STRIKE = {
    id: 272,
    type: Offensive,
    range: [11, 11, 11, 11, 11],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: "0.5",
    castDelay: "0.5",
    cooldown: "0.15",
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2) return (150 + 200 * SkillLV) * (n_A_BaseLV / 100);
      else return (300 + 300 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (SN_WIND_WALK = {
    id: 273,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HW_SOUL_DRAIN = {
    id: 274,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HW_STAVE_CRASHER = {
    id: 275,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.06",
    variableCastTime: "0.24",
    castDelay: "0.3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (HW_MYSTICAL_AMPLIFICATION = {
    id: 276,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return SkillLV * 5;
    },
  }),
  (HW_NAPALM_VULCAN = {
    id: 277,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_GHOST,
    fixedCastTime: "0.3",
    variableCastTime: "0.5",
    castDelay: "0.5",
    cooldown: `1`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "n_A_ActiveSkillLV",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 70 * SkillLV;
    },
  }),
  (MS_SHATTERING_STRIKE = {
    id: 278,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MS_COIN_CRAFT = {
    id: 279,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MS_NUGGET_CRAFT = {
    id: 280,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MS_CART_BOOST = {
    id: 281,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MS_BATTLE_MACHINE_CRAFT = {
    id: 282,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PA_GLORIA_DOMINI = {
    id: 283,
    type: Offensive,
    range: [1],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: `1`,
    variableCastTime: `1`,
    castDelay: `
		switch(n_A_ActiveSkillLV)
		{
			case 5:
				1;
			break;
			default:
				1.5 + (n_A_ActiveSkillLV * 0.5);
			break;
		}
	`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (500 + 150 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (PA_MARTYR_RECONING = {
    id: 284,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 90 + 10 * SkillLV;
    },
  }),
  (PA_BATTLE_CHANT = {
    id: 285,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ST_STEALTH = {
    id: 286,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ST_COUNTER_INSTINCT = {
    id: 287,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (CH_RAGING_PALM_STRIKE = {
    id: 288,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (200 + 100 * SkillLV + n_A_STR * 5) * (n_A_BaseLV / 100);
    },
  }),
  (CH_GLACIER_FIST = {
    id: 289,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "1.3 - ((n_A_AGI * 0.004) - (n_A_DEX * 0.002))",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (500 + 150 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (CH_CHAIN_CRUSH_COMBO = {
    id: 290,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "if(n_A_ActiveSkillLV <= 5){ 0.8 } else { 1 }",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "Math.floor(n_A_ActiveSkillLV / 2)",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 * SkillLV * (n_A_BaseLV / 100);
    },
  }),
  (CH_ZEN = {
    id: 291,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (CG_ARROW_VULCAN = {
    id: 292,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: "1.5",
    castDelay: "0.5",
    cooldown: "1.5",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "9",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (500 + 100 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (CG_SHELTERING_BLISS = {
    id: 293,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (CG_MARIONETTE_CONTROL = {
    id: 294,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_INDULGE = {
    id: 295,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_SOUL_EXHALE = {
    id: 296,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_SOUL_SIPHON = {
    id: 297,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PR_MIND_BREAKER = {
    id: 298,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BC_ALCHEMY = {
    id: 299,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BC_POTION_SYNTHESIS = {
    id: 300,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ALL_FREE301 = {
    id: 301,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ALL_TOMAHAWK_THROWING = {
    id: 302,
    type: Active,
    range: [9],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (MON_PULSE_STRIKE = {
    id: 303,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 * SkillLV;
    },
  }),
  (ALL_BERSERK_POTION_PITCHER = {
    id: 304,
    type: Support /*TODO*/,
    range: [9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKK_FLYING_KICK_SPRINT = {
    id: 305,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillSearch(skill_TK_SPRINT_STR_STATE) && n_A_WeaponType == 0)
        return n_A_BaseLV * 0.08;
      else return n_A_BaseLV * 0.04;
    },
  }),
  (AS_VENOM_KNIFE = {
    id: 306,
    type: Offensive,
    range: [10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 500;
    },
  }),
  (HU_FANTASTIC_ARROW = {
    id: 307,
    type: Offensive,
    range: [9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 150;
    },
  }),
  (KN_CHARGE_ATTACK = {
    id: 308,
    type: Offensive,
    range: [14],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: "0.5",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 700;
    },
  }),
  (ALL_NO_DEATH_BONUS = {
    id: 309,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ALL_MARRIAGE_STATUS = {
    id: 310,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (BS_SMITHS = {
    id: 311,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MON_DARK_STRIKE = {
    id: 312,
    type: Offensive,
    range: [10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (PR_FIBER_LOCK = {
    id: 313,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SA_ELEMENTAL_CHANGE = {
    id: 314,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ALL_FREE315 = {
    id: 315,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ALL_FREE316 = {
    id: 316,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HEAT = {
    id: 317,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HEAT_WALL = {
    id: 318,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HEAVENS_DRIVE2 = {
    /* need to be removed ? */ id: 319,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WATER_BALL2 = {
    /* need to be removed ? */ id: 320,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MO_MAX_GUILLOTINE_FIST = {
    id: 321,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "2.25 - (n_A_ActiveSkillLV * 0.25)",
    variableCastTime: "2.25 - (n_A_ActiveSkillLV * 0.25)",
    castDelay: "3 - (n_A_ActiveSkillLV * 0.5)",
    cooldown: "3",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: true,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      // return   100 * (8 + ((n_A_MaxSP-1)/10));
      return 100 + 100 * (7 + (n_A_MaxSP - 1) / 10);
    },
  }),
  (PR_FORESIGHT = {
    id: 322,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AX_DEADLY_POISON_CONSUMED = {
    /* need to be removed ? */ id: 323,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (PA_RAPID_SMITING = {
    id: 324,
    type: Offensive,
    range: [7, 7, 9, 9, 11],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.2",
    variableCastTime: "0.8",
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_Equip[eq_SHIELD] != 305)
        //no shield
        return (
          (300 +
            200 * SkillLV +
            n_A_LEFT_DEF_PLUS * 4 +
            ItemOBJ[n_A_Equip[eq_SHIELD]][itm_WEIGHT]) *
          (n_A_BaseLV / 100)
        );
      return 0;
    },
  }),
  (HW_GRAVITY_FIELD = {
    id: 325,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: "5",
    castDelay: `1`,
    cooldown: "5",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 * SkillLV * (n_A_BaseLV / 100);
    },
  }),
  (MS_HIGH_SPEED_CART_RAM = {
    id: 326,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return Math.floor(
        eval(document.calcForm.SkillSubNum.value) / (16 - SkillLV)
      );
    },
  }),
  (MS_MAXIMUM_POWER_THUST = {
    id: 327,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 20 * SkillLV;
    },
  }),
  (BC_ACID_DEMONSTRATION = {
    id: 328,
    type: Offensive /*TODO*/,
    range: [1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      let batk = getBaseDamage(0,false);
      let damage = [0, 0, 0];
      if (PATCH <= 2) {
        for (let i = 0; i <= 2; i++) {
          //Damage = floor{[0.7 x (ATK + MATK) x Target_Vit] ÷ 10 - (Soft_Def + Soft_Mdef + Hard_Def + Hard_Mdef) ÷ 20} x Skill Level
          damage[i] += (0.7 * (batk[i] + BK_n_A_MATK[i]) * n_B[en_VIT]) / 10;
          damage[i] -=
            n_B[en_SOFTDEF] +
            n_B[en_SOFTMDEF] +
            n_B[en_HARDDEF] +
            n_B[en_HARDMDEF];
          damage[i] /= 20;
          damage[i] = Math.floor(damage[i]);
          damage[i] *= SkillLV;
        }
        return damage;
      }
      //PATCH = 2
      return 200 * SkillLV + n_A_INT + n_B[en_VIT];
    },
  }),
  (TK_SPRINT = {
    id: 329,
    type: Passive /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_A_WeaponType == weapTyp_NONE) return 10 * SkillLV;
      else return 0;
    },
  }),
  (TK_TORNADO_STANCE = {
    id: 330,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_TORNADO_KICK = {
    id: 331,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 160 + 20 * SkillLV;
    },
  }),
  (TK_HEEL_DROP_STANCE = {
    id: 332,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_HEEL_DROP = {
    id: 333,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 160 + 20 * SkillLV;
    },
  }),
  (TK_ROUNDHOUSE_STANCE = {
    id: 334,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_ROUNDOUSE = {
    id: 335,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 190 + 30 * SkillLV;
    },
  }),
  (TK_COUNTER_KICK_STANCE = {
    id: 336,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_COUNTER_KICK = {
    id: 337,
    type: 0 /*TODO*/,
    range: [1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 190 + 30 * SkillLV;
    },
  }),
  (TK_TUMBLING = {
    id: 338,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_FLYING_KICK = {
    id: 339,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 30 + 10 * SkillLV;
    },
  }),
  (TK_PEACEFUL_BREAK = {
    id: 340,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 30 * SkillLV;
    },
  }),
  (TK_HAPPY_BREAK = {
    id: 341,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 3 * SkillLV;
    },
  }),
  (TK_KIHOP = {
    id: 342,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_LEAP = {
    id: 343,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_TAEKWON_MISSION = {
    id: 344,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_TAEKWON_RANKER = {
    id: 345,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_MILD_WIND = {
    id: 346,
    type: Active,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_PERCEPTION = {
    id: 347,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_HEAT = {
    id: 348,
    type: Offensive /*TODO*/,
    range: [1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (TKM_LUNAR_HEAT = {
    id: 349,
    type: 0 /*TODO*/,
    range: [1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (TKM_STELLAR_HEAT = {
    id: 350,
    type: 0 /*TODO*/,
    range: [1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_OPPOSITION = {
    id: 351,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_WRATH = {
    id: 352,
    type: Passive,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_SIZE] == siz_SMALL && SkillLV > 0)
        return (n_A_BaseLV + n_A_LUK + n_A_DEX) / (3 * (4 - SkillLV));
      return 0;
    },
  }),
  (TKM_LUNAR_WRATH = {
    id: 353,
    type: Passive,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_SIZE] == siz_MEDIUM && n_B[en_HP] >= 6000 && SkillLV > 0)
        return (n_A_BaseLV + n_A_LUK + n_A_DEX) / (3 * (4 - SkillLV));
      return 0;
    },
  }),
  (TKM_STELLAR_WRATH = {
    id: 354,
    type: Passive,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_SIZE] == siz_LARGE && n_B[en_HP] >= 20000 && SkillLV > 0)
        return (n_A_BaseLV + n_A_LUK + n_A_DEX) / (3 * (4 - SkillLV));
      return 0;
    },
  }),
  (TKM_SOLAR_PROTECTION = {
    id: 355,
    type: Active /*TODO*/,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_SIZE] == siz_SMALL)
        return (n_A_BaseLV + n_A_LUK + n_A_DEX) / 10;
      return 0;
    },
  }),
  (TKM_LUNAR_PROTECTION = {
    id: 356,
    type: Active /*TODO*/,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_SIZE] == siz_MEDIUM && n_B[en_HP] >= 6000)
        return (n_A_BaseLV + n_A_LUK + n_A_DEX) / 10;
      return 0;
    },
  }),
  (TKM_STELLAR_PROTECTION = {
    id: 357,
    type: Active /*TODO*/,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_SIZE] == siz_LARGE && n_B[en_HP] >= 20000)
        return (n_A_BaseLV + n_A_LUK + n_A_DEX) / 10;
      return 0;
    },
  }),
  (TKM_SOLAR_BLESSINGS = {
    id: 358,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_LUNAR_BLESSINGS = {
    id: 359,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_STELLAR_BLESSINGS = {
    id: 360,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_SHADOW = {
    id: 361,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_TEAM_UP = {
    id: 362,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_COURIER = {
    id: 363,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_UNION = {
    id: 364,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_MIRACLE = {
    id: 365,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_ANGEL = {
    id: 366,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TKM_SOLAR_LUNAR_AND_STELLAR_BLESSINGS = {
    id: 367,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_KAIZEL = {
    id: 368,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_KAAHI = {
    id: 369,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_KAUPE = {
    id: 370,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_KAITE = {
    id: 371,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_KAINA = {
    id: 372,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_ESTIN = {
    id: 373,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: eval(document.calcForm.A_Weapon_element.value),
    fixedCastTime: "0.02",
    variableCastTime: "0.08",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 10 * SkillLV;
    },
  }),
  (SL_ESTUN = {
    id: 374,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: eval(document.calcForm.A_Weapon_element.value),
    fixedCastTime: "0.02",
    variableCastTime: "0.08",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 5 * SkillLV;
    },
  }),
  (SL_ESMA = {
    id: 375,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: eval(document.calcForm.A_Weapon_element.value),
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return n_A_BaseLV + 40;
    },
  }),
  (SL_ESWOO = {
    id: 376,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_ESKA = {
    id: 377,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SL_ESKE = {
    id: 378,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_SPRINT_STR_STATE = {
    id: 379,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (TK_KIHOP_PARTY_BONUS = {
    id: 380,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AS_SONIC_ACCELERATION = {
    id: 381,
    type: Passive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return Math.floor(getWeaponATK(0) / 10);
    },
  }),
  (MO_EXCRUCIATING_PALM = {
    id: 382,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "2",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 300;
    },
  }),
  (RG_CLOSE_CONFINE = {
    id: 383,
    type: Active,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (CR_SHIELD_BOOMERANG_SL = {
    id: 384,
    type: Offensive,
    range: [3, 5, 7, 9, 11],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.35",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 160 * SkillLV;
    },
  }),
  (SN_SUPER_NOVICE_SPIRIT = {
    id: 385,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (KN_ONE_HAND_QUICKEN = {
    id: 386,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (AC_HOLY_LIGHT_SL = {
    id: 387,
    type: Offensive,
    range: [1],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: "0.2",
    variableCastTime: "0.8",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 500;
    },
  }),
  (AS_SONIC_BLOW_SL = {
    id: 388,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.25",
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "8",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillSearch(skill_AS_SONIC_ACCELERATION))
        return 220 + 110 * SkillLV * 2;
      return (200 + 100 * SkillLV) * 2;
    },
  }),
  (BS_FULL_ADRENALINE_RUSH = {
    id: 389,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (HU_HUNTER_SPIRIT = {
    id: 390,
    type: Active,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return n_A_STR * SkillLV;
    },
  }),
  (HU_BEAST_STRAFING = {
    id: 391,
    type: Offensive,
    range: [9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50 + n_A_STR * 8;
    },
  }),
  (FIRST_TRANSCENDENT_SPIRIT = {
    id: 392,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (NIN_DAGGER_THROWING_PRACTICE = {
    id: 393,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 3 * SkillLV;
    },
  }),
  (NIN_THROW_DAGGER = {
    id: 394,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 5 * SkillLV;
    },
  }),
  (NIN_THROW_KUNAI = {
    id: 395,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 * SkillLV;
    },
  }),
  (NIN_THROW_HUUMA_SHURIKEN = {
    id: 396,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 250 * SkillLV - 50;
    },
  }),
  (NIN_THROW_COINS = {
    id: 397,
    type: Offensive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (NIN_FLIP_TATAMI = {
    id: 398,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "2",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 10 * SkillLV;
    },
  }),
  (NIN_SHADOW_LEAP = {
    id: 399,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (NIN_HAZE_SLASHER = {
    id: 400,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "2",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 20 * SkillLV;
    },
  }),
  (NIN_SHADOW_SLASH = {
    id: 401,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50 + 150 * SkillLV;
    },
  }),
  //stop here
  (NIN_CICADA_SKIN_SHED = {
    id: 402,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (NIN_MIRROR_IMAGE = {
    id: 403,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (NIN_NINJA_AURA = {
    id: 404,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (NIN_KILLING_STRIKE = {
    id: 405,
    type: Offensive,
    range: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return SkillLV;
    },
  }),
  (NIN_NINJA_MASTERY = {
    id: 406,
    type: Passive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 3 * SkillLV;
    },
  }),
  (NIN_FLAMING_PETALS = {
    id: 407,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.14 * n_A_ActiveSkillLV",
    variableCastTime: "0.56 * n_A_ActiveSkillLV",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 90;
    },
  }),
  (NIN_BLAZE_SHIELD = {
    id: 408,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "1.3 - (0.1 * n_A_ActiveSkillLV)",
    variableCastTime: "5.2 - (0.4 * n_A_ActiveSkillLV)",
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "4 + Math.floor((n_A_ActiveSkillLV + 1) / 2)",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50;
    },
  }),
  (NIN_EXPLODING_DRAGON = {
    id: 409,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.8",
    variableCastTime: "2",
    castDelay: "0.5",
    cooldown: "0.3",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 150 + 150 * SkillLV;
    },
  }),
  (NIN_FREEZING_SPEAR = {
    id: 410,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: "0.14 * n_A_ActiveSkillLV",
    variableCastTime: "0.56 * n_A_ActiveSkillLV",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "2 + n_A_ActiveSkillLV",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 70 + 2 * SkillSearch(skill_NIN_WATERY_EVASION);
    },
  }),
  (NIN_WATERY_EVASION = {
    id: 411,
    type: Support,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (NIN_SNOW_FLAKE_DRAFT = {
    id: 412,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: "0.8",
    variableCastTime: "2.5",
    castDelay: "0.5",
    cooldown: "0.3",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 150 + 150 * SkillLV;
    },
  }),
  (NIN_WIND_BLADE = {
    id: 413,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "0.1 + (0.1 * n_A_ActiveSkillLV)",
    variableCastTime: "0.4 + (0.4 * n_A_ActiveSkillLV)",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: "1 + Math.floor(n_A_ActiveSkillLV / 2)",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 150;
    },
  }),
  (NIN_LIGHTNING_JOLT = {
    id: 414,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "0.3",
    variableCastTime: "1.7",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 100 * SkillLV;
    },
  }),
  (NIN_FIRST_WIND = {
    id: 415,
    type: Offensive,
    range: [5, 6, 7, 8, 9],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: "0.3",
    variableCastTime: "1.2",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 100 * SkillLV;
    },
  }),
  (GS_COIN_FLIP = {
    id: 416,
    type: Active,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_COING_FLING = {
    id: 417,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return n_A_JobLV;
    },
  }),
  (GS_TRIPLE_ACTION = {
    id: 418,
    type: Offensive,
    range: [9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 450;
    },
  }),
  (GS_BULLS_EYE = {
    id: 419,
    type: Offensive,
    range: [9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 500;
    },
  }),
  (GS_LAST_STAND = {
    id: 420,
    type: Active,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_GUNSLINGER_PANIC = {
    id: 421,
    type: Active,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_INCREASE_ACCURACY = {
    id: 422,
    type: Active /*TODO*/,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_MAGICAL_BULLET = {
    id: 423,
    type: Active,
    range: [0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_CRACKER = {
    id: 424,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_SINGLE_ACTION = {
    id: 425,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_SNAKE_EYES = {
    id: 426,
    type: Passive /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return SkillLV;
    },
  }),
  (GS_CHAIN_ACTION = {
    id: 427,
    type: Passive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "2",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200;
    },
  }),
  (GS_TRIGGER_HAPPY_SHOT = {
    id: 428,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "5",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 500 + 50 * SkillLV;
    },
  }),
  (GS_DESPERADO = {
    id: 429,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `
	let DEATH = [1,1.2,1.6,2,2.4,3,3.6,4,5,6,7,8,9,10];
	DEATH[eval(document.calcForm.SkillSubNum.value)];
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50 + 50 * SkillLV;
    },
  }),
  (GS_TRACKING = {
    id: 430,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: "1 + (0.2 * n_A_ActiveSkillLV)",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 + 100 * SkillLV;
    },
  }),
  (GS_DISARM = {
    id: 431,
    type: Active /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_WOUNDING_SHOT = {
    id: 432,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 + 20 * SkillLV;
    },
  }),
  (GS_GATLING_FEVER = {
    id: 433,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GS_CROWD_CONTROL_SHOT = {
    id: 434,
    type: Offensive,
    range: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 50 * SkillLV;
    },
  }),
  (GS_FULL_BLAST = {
    id: 435,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "1 + (0.2 * n_A_ActiveSkillLV)",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 300 + 100 * SkillLV;
    },
  }),
  (GS_SPREAD_SHOT = {
    id: 436,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 + 30 * SkillLV;
    },
    //different formula on rathena
    //skillFormula(SkillLV){return 100 + (30 * SkillLV)}
  }),
  (GS_GUNSLINGER_MINE = {
    id: 437,
    type: Offensive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 + 20 * SkillLV;
    },
  }),
  (NIN_KILLING_STRIKE_MAX = {
    id: 438,
    type: Offensive,
    range: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return SkillLV;
    },
  }),
  (MON_POWER_UP = {
    id: 439,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MON_AGI_UP = {
    id: 440,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MON_CHANGE_TO_ELEMENTAL = {
    id: 441,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MON_STONE_SKIN = {
    id: 442,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MON_ANTI_MAGIC = {
    id: 443,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MON_KEEPING = {
    id: 444,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RUN_ENCHANT_BLADE = {
    id: 445,
    type: Active,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      //[((Skill Lv x 20) + 100) x (casterBaseLevel / 150)] + casterInt + MATK - MDEF - MDEF2
      return (
        (100 + 20 * SkillLV) * (n_A_BaseLV / 150) +
        n_A_INT -
        n_B[en_HARDMDEF] -
        n_B[en_SOFTMDEF]
      ); //matk added in getFinalDamage function
    },
  }),
  (RUN_SONIC_WAVE = {
    id: 446,
    type: Offensive,
    range: [7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "if(PATCH < 2){1}else{0.5}",
    cooldown: "if(PATCH < 2){2}else{1.75}",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH == 0)
        return ((500 + 100 * SkillLV) * n_A_BaseLV) / 100; // 600%-1000% damage
      else if (PATCH == 1)
        return ((700 + 100 * SkillLV) * n_A_BaseLV) / 100; // 800%-1700% damage
      else if (PATCH == 2) return ((1050 + 150 * SkillLV) * n_A_BaseLV) / 100;
    },
  }),
  (RUN_DEATH_BOUND = {
    id: 447,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      // Amplification: 600%-1500% damage
      let damage = parseInt(formElements["SkillSubNum"].value);
      damage *= SkillLV + 5.0;

      // calc reflected damage
      myInnerHtml(
        "CRIATKname",
        '<font color="#0000FF"><b>Reflected Damage</b></font>',
        0
      );
      myInnerHtml(
        "CRIATK",
        '<font color="#0000FF"><b>' + 0.7 * damage + "</b></font>",
        0
      );

      // Calculate incoming damage
      myInnerHtml(
        "CRInumname",
        '<font color="#FF0000"><b>Incoming Damage</b></font>',
        0
      );
      myInnerHtml(
        "CRInum",
        '<font color="#FF0000"><b>' + 0.3 * damage + "</b></font>",
        0
      );
      return 0;
    },
  }),
  (RUN_HUNDRED_SPEAR = {
    id: 448,
    type: Offensive,
    range: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: "1.1 * (0.1 * n_A_ActiveSkillLV)",
    castDelay: "0.5",
    cooldown: "3",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "5",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2)
        return (
          (600 + 80 * SkillLV + ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WEIGHT]) *
            (n_A_BaseLV / 100) +
          SkillSearch(skill_LK_CLASHING_SPIRAL) * 50
        );
      return (
        (400 + 200 * SkillLV) * (n_A_BaseLV / 100) +
        SkillSearch(skill_LK_CLASHING_SPIRAL) * 50
      );
    },
  }),
  (RUN_WIND_CUTTER = {
    id: 449,
    type: Offensive,
    range: [3, 3, 3, 3, 3],
    forcedElement: true, //not on PATCH = 2
    skillElement: ele_WIND,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "if(PATCH == 2){ 0.5 }else{ 0 }",
    cooldown: "if(PATCH == 2){ 0.55 - (0.05 * n_A_ActiveSkillLV) }else{ 2 }",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount:
      "if(PATCH == 2 && n_A_WeaponType ==weapTyp_SWORDII){ 2 }else{ 1 }",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2) return 100 + 50 * SkillLV * (n_A_BaseLV / 100);
      switch (n_A_WeaponType) {
        case weapTyp_SWORDII:
          return 250 * SkillLV * (n_A_BaseLV / 100);
        case weapTyp_SPEAR:
        case weapTyp_SPEARII:
          return 400 * SkillLV * (n_A_BaseLV / 100);
        default:
          return 300 * SkillLV * (n_A_BaseLV / 100);
      }
    },
  }),
  (RUN_IGNITION_BREAK = {
    id: 450,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: "2",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2) {
        let distanceMod =
          350 - 50 * parseInt(formElements["SkillSubNum"].value);
        if (n_A_Weapon_element === ele_FIRE)
          return distanceMod * SkillLV * (n_A_BaseLV / 100) + SkillLV * 100;
        return distanceMod * SkillLV * (n_A_BaseLV / 100);
      }
      return 450 * SkillLV * (n_A_BaseLV / 100);
    },
  }),
  (RUN_PHANTOM_THRUST = {
    id: 451,
    type: Offensive,
    range: [5, 6, 7, 8, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (
        (50 * SkillLV + SkillSearch(skill_KN_SPEAR_MASTERY) * 10) *
        (n_A_BaseLV / 150)
      );
    },
  }),
  (RUN_DRAGON_TRAINING = {
    id: 452,
    type: Passive,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return SkillLV;
    },
  }),
  (RUN_DRAGON_BREATH = {
    id: 453,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.5",
    variableCastTime: `
	switch(n_A_ActiveSkillLV)
	{
		case 1:
		case 2:
		case 3:
			0;
		break;
		case 4:
		case 5:
		case 6:
			1;
		break;
		case 7:
		case 8:
			1.5;
		break;
		case 9:
		case 10:
			2;
		break;
	}
	`,
    castDelay: "2",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      let currentHP = parseInt(formElements["SkillSubNum"].value);
      if (currentHP > n_A_MaxHP) {
        currentHP = n_A_MaxHP;
        formElements["SkillSubNum"].value = n_A_MaxHP;
      } else if (currentHP < 1) {
        currentHP = 1;
        formElements["SkillSubNum"].value = 1;
      }
      switch (PATCH) {
        case 0:
          //[(CurrHP ÷ 50) + (MaxSP ÷ 4)] × (SkillLv × BaseLv ÷ 150) × (95 + DragonTraining_Lv × 5)%
          return (
            (currentHP / 50 + n_A_MaxSP / 4) *
            ((SkillLV * n_A_BaseLV) / 150) *
            (0.95 + (SkillSearch(skill_RUN_DRAGON_TRAINING) * 5) / 100)
          );
        case 1:
          // [(CurrHP ÷ 50) + (MaxSP ÷ 4)] × (SkillLv × BaseLv ÷ 150) × (95 + DragonTraining_Lv × 5)% × (100 + Ranged Damage Modifiers)% x (Elemental Modifiers)%
          return (
            (currentHP / 50 + n_A_MaxSP / 4) *
            ((SkillLV * n_A_BaseLV) / 150) *
            (0.95 + (SkillSearch(skill_RUN_DRAGON_TRAINING) * 5) / 100) *
            (1 +
              (getRangedMultiplier() /
                100) /** (1 - (enemy Demi humain reduction/100))*/ *
                getSkillMultiplier(skill_RUN_DRAGON_BREATH) *
                (getPropertyMultiplier() / 100))
          );
        case 2:
          //[(CurrHP ÷ 50) + (MaxSP ÷ 4)] × (SkillLv × BaseLv ÷ 100) × (90 + DragonTraining_Lv × 10)% × (100 + Ranged Damage Modifiers)% x (Elemental Modifiers)%
          return (
            (currentHP / 50 + n_A_MaxSP / 4) *
            ((SkillLV * n_A_BaseLV) / 100) *
            (0.9 + (SkillSearch(skill_RUN_DRAGON_TRAINING) * 10) / 100) *
            (1 +
              (getRangedMultiplier() /
                100) /** (1 - (enemy Demi humain reduction/100))*/ *
                getSkillMultiplier(skill_RUN_DRAGON_BREATH) *
                (getPropertyMultiplier() / 100))
          );
      }
      return 0;
    },
  }),
  (RUN_DRAGON_HOWLING = {
    id: 454,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: "10",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 50 + 6 * SkillLV;
    },
  }),
  (RUN_RUNE_MASTERY = {
    id: 455,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 30 + 2 * SkillLV + (n_A_DEX / 30 + n_A_LUK / 10 + n_A_JobLV / 10);
    },
  }),
  (RUN_GIANT_GROWTH = {
    id: 456,
    type: Active,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
    skillFormula2(SkillLV) {
      switch (PATCH) {
        case 0:
          return 300;
        case 1:
          return 200;
        case 2:
          return 250;
        default:
          return 0;
      }
    },
  }),
  (RUN_VITALITY_ACTIVATION = {
    id: 457,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RUN_STORM_BLAST = {
    id: 458,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          //[RuneMastery_Lv + (INT ÷ 8) × 100]%
          return (SkillSearch(skill_RUN_RUNE_MASTERY) + n_A_INT / 8) * 100;
        case 1:
          //[RuneMastery_Lv + (STR ÷ 8) × 100]%
          return (SkillSearch(skill_RUN_RUNE_MASTERY) + n_A_STR / 8) * 100;
        case 2:
          //[(RuneMastery_Lv + (STR ÷ 5.7) × 100) x (BaseLv ÷ 100)]%
          return (
            (SkillSearch(skill_RUN_RUNE_MASTERY) + n_A_STR / 5.7) *
            100 *
            (n_A_BaseLV / 100)
          );
      }
      return 0;
    },
  }),
  (RUN_STONEHARD_SKIN = {
    id: 459,
    type: Active,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (n_A_JobLV * SkillSearch(skill_RUN_RUNE_MASTERY)) / 4;
    },
  }),
  (RUN_FIGHTING_SPIRIT = {
    id: 460,
    type: Passive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      // Asir Rune
      if (SkillLV) return 70 + SkillLV * 7;
      else return 0;
    },
  }),
  (RUN_ABUNDANCE = {
    id: 461,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RUN_CRUSH_STRIKE = {
    id: 462,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (
        n_A_WeaponLV * (n_A_Weapon_ATKplus + 6) * 100 +
        ItemOBJ[n_A_Equip[eq_WEAPON]][itm_ATK] +
        ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WEIGHT]
      );
    },
  }),
  (RUN_REFRESH = {
    id: 463,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RUN_MILLENIUM_SHIELD = {
    id: 464,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_VENOM_IMPRESS = {
    id: 465,
    type: Active,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 10 * SkillLV;
    },
  }),
  (GLT_CROSS_IMPACT = {
    id: 466,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "3 - (0.5 * n_A_ActiveSkillLV)",
    cooldown: "0.35",
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "7",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          //[(1,000 + (100 × Skill Level)) x (BaseLv ÷ 120)]%
          return (1000 + 100 * SkillLV) * (n_A_BaseLV / 120);
        case 2:
          //[(1,400 + (150 × Skill Level)) x (BaseLv ÷ 100)]%
          return (1400 + 150 * SkillLV) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (GLT_DARK_ILLUSION = {
    id: 467,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "1.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (GLT_RESEARCH_NEW_POISON = {
    id: 468,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 30 + 5 * SkillLV + (n_A_DEX + n_A_JobLV + n_A_LUK / 2) / 20;
    },
  }),
  (GLT_CREATE_NEW_POISON = {
    id: 469,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_ANTIDOTE = {
    id: 470,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISONING_WEAPON = {
    id: 471,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_WEAPON_BLOCKING = {
    id: 472,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_COUNTER_SLASH = {
    id: 473,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "2",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          //[(300 + (Skill Level x 100)) x BaseLv ÷ 120) + (AGI × 2) + (JobLv × 4)]%
          return (
            (300 + 100 * SkillLV) * (n_A_BaseLV / 120) +
            n_A_AGI / 2 +
            n_A_JobLV / 4
          );
        case 1:
        case 2:
          //[(300 + (Skill Level x 150)) x BaseLv ÷ 120) + (AGI × 2) + (JobLv × 4)]%
          return (
            (300 + 150 * SkillLV) * (n_A_BaseLV / 120) +
            n_A_AGI / 2 +
            n_A_JobLV / 4
          );
      }
      return 0;
    },
  }),
  (GLT_WEAPON_CRUSH = {
    id: 474,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (GLT_VENOM_PRESSURE = {
    id: 475,
    type: Active /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 1000;
    },
  }),
  (GLT_POISON_SMOKE = {
    id: 476,
    type: Active /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_CLOAKING_EXCEED = {
    id: 477,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_PHANTOM_MENACE = {
    id: 478,
    type: Offensive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 300;
    },
  }),
  (GLT_HALLUCINATION_WALK = {
    id: 479,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: "5",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_ROLLING_CUTTER = {
    id: 480,
    type: Offensive,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.2",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          //[(50 + (Skill Level x 50)) x (BaseLv ÷ 100)]%
          return (50 + 50 * SkillLV) * (n_A_BaseLV / 100);
        case 2:
          // [(50 + (Skill Level x 80)) x (BaseLv ÷ 100)]%
          return (50 + 80 * SkillLV) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (GLT_CROSS_RIPPER_SLASHER = {
    id: 481,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.3",
    cooldown: "0.2",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          //[(400 + (80 × Skill Level)) × BaseLv ÷ 100 + (AGI × SpinCount)]%
          return (
            (400 + 80 * SkillLV) * (n_A_BaseLV / 100) +
            n_A_AGI * parseInt(formElements["SkillSubNum"].value)
          );
        case 2:
          //[((80 × Skill Level) × BaseLv ÷ 100) + (SpinCount × 200) + (AGI × 3)]%
          return (
            80 * SkillLV * (n_A_BaseLV / 100) +
            parseInt(formElements["SkillSubNum"].value) * 200 +
            n_A_AGI / 3
          );
      }
      return 0;
    },
  }),
  (GLT_POISON_PARALYZE = {
    id: 482,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISON_PYREXIA = {
    id: 483,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISON_DISHEART = {
    id: 484,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISON_LEECH_END = {
    id: 485,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISON_VENOM_BLEED = {
    id: 486,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISON_MAGIC_MUSHROOM = {
    id: 487,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISON_TOXIN = {
    id: 488,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GLT_POISON_OBLIVION_CURSE = {
    id: 489,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_JUDEX = {
    id: 490,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: "0.5",
    variableCastTime: "2",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          //[(300 + (Skill Level x 20)) x (BaseLv ÷ 100)]%
          return (300 + 20 * SkillLV) * (n_A_BaseLV / 100);
        case 1:
          //[(300 + (Skill Level x 40)) x (BaseLv ÷ 100)]%
          return (300 + 40 * SkillLV) * (n_A_BaseLV / 100);
        case 2:
          //[(300 + (Skill Level x 70)) x (BaseLv ÷ 100)]%
          return (300 + 70 * SkillLV) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ABI_ANCILLA = {
    id: 491,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_ADORAMUS = {
    id: 492,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: "0.5",
    variableCastTime: "2",
    castDelay: "0.5",
    cooldown: "2.5",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          //[(500 + (Skill Level x 100)) x (BaseLv ÷ 100)]%
          return (500 + 100 * SkillLV) * (n_A_BaseLV / 100);
        case 1:
          //[(330 + (Skill Level x 70)) x (BaseLv ÷ 100)]%
          return (330 + 70 * SkillLV) * (n_A_BaseLV / 100);
        case 2:
          //[(300 + (Skill Level x 250)) x (BaseLv ÷ 100)]%
          return (300 + 250 * SkillLV) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ABI_CLEMENTIA = {
    id: 493,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_CANTO_CANDIDUS = {
    id: 494,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_COLUCEO_HEAL = {
    id: 495,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_EPICLESIS = {
    id: 496,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_PRAEFATIO = {
    id: 497,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_ORATIO = {
    id: 498,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_LAUDA_AGNUS = {
    id: 499,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_LAUDA_RAMUS = {
    id: 500,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_EUCHARISTICA = {
    id: 501,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_RENOVATIO = {
    id: 502,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_HIGHNESS_HEAL = {
    id: 503,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_CLEARANCE = {
    id: 504,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_EXPIATIO = {
    id: 505,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_DUPLE_LIGHT = {
    id: 506,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV, isMagicalPart) {
      switch (PATCH) {
        case 0:
          //MATK: [200 + (Skill Level x 20)]%
          //ATK: [100 + (Skill Level x 10)]%
          if (isMagicalPart) return 200 + 20 * SkillLV;
          else return 100 + 10 * SkillLV;
        case 1:
        case 2:
          //MATK: [400 + (Skill Level x 40)]%
          //ATK: [150 + (Skill Level x 15)]%
          if (isMagicalPart) return 400 + 40 * SkillLV;
          else return 150 + 15 * SkillLV;
      }
      return 0;
    },
  }),
  (ABI_SILENTIUM = {
    id: 507,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ABI_SACRAMENT = {
    id: 508,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_RANGER_MAIN = {
    id: 509,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (
        n_B[en_RACE] == race_BRUTE ||
        n_B[en_RACE] == race_FISH ||
        n_B[en_RACE] == race_PLANT
      )
        return 5 * SkillLV;
      else return 0;
    },
  }),
  (RAN_CAMOUFLAGE = {
    id: 510,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) return 300;
      else return 0;
    },
  }),
  (RAN_AIMED_BOLT = {
    id: 511,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: "2",
    castDelay: "2",
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `5`,
    hitDivisibility: "1",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0: //[(500 + (Skill Level x 50)) x (BaseLv ÷ 100)]%
          return (500 + 50 * SkillLV) * (n_A_BaseLV / 100);
        case 1: //[(500 + (Skill Level x 20)) x (BaseLv ÷ 100)]%
          return (500 + 20 * SkillLV) * (n_A_BaseLV / 100);
        case 2:
          if (SkillSearch(skill_RAN_FEAR_BREEZE))
            // w/fear breeze:[(800 + (Skill Level x 35)) x (BaseLv ÷ 100)]%
            return (800 + 35 * SkillLV) * (n_A_BaseLV / 100);
          return (500 + 20 * SkillLV) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (RAN_ARROW_STORM = {
    id: 512,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.3",
    variableCastTime: "2",
    castDelay: `0`,
    cooldown: "3.2",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1: //(1000 + 80 × Skill_Level)%
          return (1000 + 80 * SkillLV) * (n_A_BaseLV / 100);
        case 2:
          if (SkillSearch(skill_RAN_FEAR_BREEZE))
            // w/ fear breeze:(200 + 180 × Skill_Level)%
            return (200 + 250 * SkillLV) * (n_A_BaseLV / 100);
          // w/o fear breeze:(200 + 250 × Skill_Level)%
          return (200 + 180 * SkillLV) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (RAN_FEAR_BREEZE = {
    id: 513,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_DETONATOR = {
    id: 514,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_FIRING_TRAP = {
    id: 515,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (RAN_ICEBOUND_TRAP = {
    id: 516,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 100;
    },
  }),
  (RAN_ELECTRIC_SHOCKER = {
    id: 517,
    type: Active /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_RESEARCH_TRAP = {
    id: 518,
    type: Passive /*TODO*/,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_MARGENTA_TRAP = {
    id: 519,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_COBALT_TRAP = {
    id: 520,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_MAIZE_TRAP = {
    id: 521,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_VERDURE_TRAP = {
    id: 522,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_CLUSTER_BOMB = {
    id: 523,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 200 + 100 * SkillLV;
    },
  }),
  (RAN_WARG_MASTERY = {
    id: 524,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_WARG_RIDER = {
    id: 525,
    type: Active /*TODO*/,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 10 * SkillLV;
    },
  }),
  (RAN_WARG_DASH = {
    id: 526,
    type: Offensive,
    range: [1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 300; /*+ (parseInt(formElements["SkillSubNum"].value) * 10 / 8)*/
    }, //TODO : weight mod
  }),
  (RAN_WARG_BITE = {
    id: 527,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV == 5) return 1500;
      return 400 + 200 * SkillLV;
    },
  }),
  (RAN_TOOTH_OF_WARG = {
    id: 528,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 30 * SkillLV;
    },
  }),
  (RAN_WARG_STRIKE = {
    id: 529,
    type: Active,
    range: [1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 200 * SkillLV;
    },
  }),
  (RAN_KEEN_NOSE = {
    id: 530,
    type: Active,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 100 + 50 * SkillLV;
    },
  }),
  (WAR_READING_SPELLBOOK = {
    id: 531,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_FREEZING_SPELL = {
    id: 532,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_RADIUS = {
    id: 533,
    type: Passive,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 5 * SkillLV + n_A_INT / 15 + n_A_BaseLV / 15;
    }, //FCT reduction
  }),
  (WAR_DRAIN_LIFE = {
    id: 534,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: "4",
    castDelay: `0`,
    cooldown: "2",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (200 * SkillLV + n_A_INT) * (n_A_BaseLV / 100);
    },
  }),
  (WAR_SOUL_EXPANSION = {
    id: 535,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_GHOST,
    fixedCastTime: `0`,
    variableCastTime: "2",
    castDelay: "0.5",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "2",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2)
        return (400 + 100 * SkillLV + n_A_INT) * (n_A_BaseLV / 100);
      return (1000 + 200 * SkillLV + n_A_INT) * (n_A_BaseLV / 100);
    },
  }),
  (WAR_WHITE_IMPRISON = {
    id: 536,
    type: Active /*TODO*/,
    range: [10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_STASIS = {
    id: 537,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_RECOGNIZED_SPELL = {
    id: 538,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_MARSH_OF_ABYSS = {
    id: 539,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_CRIMSON_ROCK = {
    id: 540,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `1`,
    variableCastTime: "5",
    castDelay: "0.5",
    cooldown: "5",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "7",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2) return 300 * SkillLV * (n_A_BaseLV / 100) + 1300;
      return (700 + 600 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (WAR_HELL_INFERNO = {
    id: 541,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: "3",
    castDelay: "0.5",
    cooldown: "3",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      if (PATCH < 2)
        return [
          60 * SkillLV * (n_A_BaseLV / 100),
          240 * SkillLV * (n_A_BaseLV / 100),
        ];
      return [
        400 * SkillLV * (n_A_BaseLV / 100),
        600 * SkillLV * (n_A_BaseLV / 100),
      ];
    },
  }),
  (WAR_COMET = {
    id: 542,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "2",
    variableCastTime: "5 + n_A_ActiveSkillLV",
    castDelay: "1.5",
    cooldown: "20",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "10",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let distanceMod = 5.0 * parseInt(formElements["SkillSubNum"].value);
      if (PATCH < 2)
        return (500 + 500 * SkillLV + distanceMod) * (n_A_BaseLV / 120);
      return (2500 + 700 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (WAR_FROSTY_MISTY = {
    id: 543,
    type: Offensive /*TODO*/,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: "0.5",
    variableCastTime: "1.5 + (0.5 * n_A_ActiveSkillLV)",
    castDelay: `1`,
    cooldown: "4",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `
		if(PATCH < 2)
			1
		else
			n_A_ActiveSkillLV
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (200 + 100 * SkillLV) * (n_A_BaseLV / 100);
    },
  }),
  (WAR_JACK_FROST = {
    id: 544,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `1`,
    variableCastTime: "1.5 * (0.5 * n_A_ActiveSkillLV)",
    castDelay: `1`,
    cooldown: "4",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2) {
        if (formElements["SkillSubNum"].value)
          return (1000 + 300 * SkillLV) * (n_A_BaseLV / 100);
        return (500 + 100 * SkillLV) * (n_A_BaseLV / 150);
      } else {
        if (formElements["SkillSubNum"].value)
          return (1200 + 600 * SkillLV) * (n_A_BaseLV / 100);
        return (1000 + 300 * SkillLV) * (n_A_BaseLV / 100);
      }
    },
  }),
  (WAR_CHAIN_LIGHTNING = {
    id: 545,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: `1`,
    variableCastTime: "3 + (0.5 * n_A_ActiveSkillLV)",
    castDelay: "3",
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 500 + 100 * SkillLV;
    },
  }),
  (WAR_SIENNA_EXECRATE = {
    id: 546,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_EARTH_STRAIN = {
    id: 547,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_EARTH,
    fixedCastTime: "if(PATCH < 2) {2} else{1}",
    variableCastTime: "1 + n_A_ActiveSkillLV",
    castDelay: "if(PATCH < 2) {1} else{0.5}",
    cooldown: "if(PATCH < 2) {10} else{7}",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "4 + n_A_ActiveSkillLV",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (2000 + SkillLV * 100) * (n_A_BaseLV / 100);
        case 2:
          return (1000 + SkillLV * 600) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (WAR_RELEASE = {
    id: 548,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_SUMMON_FIRE_BALL = {
    id: 549,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_SUMMON_WATER_BALL = {
    id: 550,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_SUMMON_LIGHTNING_BALL = {
    id: 551,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_SUMMON_STONE = {
    id: 552,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_TETRA_VORTEX = {
    id: 553,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "1",
    //variableCastTime: "if(n_A_ActiveSkillLV < 5){n_A_ActiveSkillLV}else{5}",
    variableCastTime: "n_A_ActiveSkillLV + 4",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: "4",
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return 500 + SkillLV * 500;
        case 2:
          return 800 + SkillLV * 400;
      }
      return 0;
    },
  }),
  (MEC_AXE_TRAINING = {
    id: 554,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (n_A_WeaponType) {
        case weapTyp_AXE:
        case weapTyp_2HAXE:
          return 5 * SkillLV;
        case weapTyp_MACE:
          return 4 * SkillLV;
      }
      return 0;
    },
  }),
  (MEC_AXE_TORNADO = {
    id: 555,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "0.5",
    cooldown: "4.5 - (n_A_ActiveSkillLV * 0.5)",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "6",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          if (n_A_Weapon_element == ele_WIND)
            return (200 + SkillLV * 100 + n_A_VIT) * (n_A_BaseLV / 100) * 1.25;
          return (200 + SkillLV * 100 + n_A_VIT) * (n_A_BaseLV / 100);
        case 2:
          return (300 + SkillLV * 80 + n_A_VIT) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (MEC_AXE_BOOMERANG = {
    id: 556,
    type: Offensive,
    range: [5, 5, 6, 7, 8],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: "5.5 - (n_A_ActiveSkillLV * 0.5)",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (
        (250 * (SkillLV * 50) + ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WEIGHT]) *
        (n_A_BaseLV / 100)
      );
    },
  }),
  (MEC_POWER_SWING = {
    id: 557,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (300 + 100 * SkillLV + n_A_STR + n_A_DEX) * (n_A_BaseLV / 100);
    },
  }),
  (MEC_RESEARCH_FIRE_EARTH = {
    id: 558,
    type: Passive,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (n_B[en_ELEMENT] == ele_EARTH || n_B[en_ELEMENT] == ele_FIRE)
        return 10 * SkillLV;
      else return 0;
    },
  }),
  (MEC_FAW_SILVER_SNIPER = {
    id: 559,
    type: Active,
    range: [2, 2, 2, 2, 2],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "2 - (n_A_ActiveSkillLV * 0.2)",
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 100 + SkillLV * 200;
    },
  }),
  (MEC_FAW_MAGIC_DECOY = {
    id: 560,
    type: Active,
    range: [2, 2, 2, 2, 2],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "2 - (n_A_ActiveSkillLV * 0.2)",
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      return 250 + SkillLV * 50;
    },
  }),
  (MEC_FAW_REMOVAL = {
    id: 561,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_MAGIC_GEAR_LICENSE = {
    id: 562,
    type: Passive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 15 * SkillLV;
    },
  }),
  (MEC_REPAIR = {
    id: 563,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_ACCELERATION = {
    id: 564,
    type: Support /*TODO*/,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_HOVERING = {
    id: 565,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_FRONT_SIDE_SLIDE = {
    id: 566,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_BACK_SIDE_SLIDE = {
    id: 567,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_BOOST_KNUCKLE = {
    id: 568,
    type: Offensive,
    range: [11, 11, 11, 11, 11],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: "0.1 * n_A_ActiveSkillLV",
    castDelay: `0`, //?
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (100 + 200 * SkillLV + n_A_DEX) * (n_A_BaseLV / 100);
    },
  }),
  (MEC_PILE_BUNKER = {
    id: 569,
    type: Offensive,
    range: [3, 4, 4], //level 3 should be 5 but 5 is ranged for the sim
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (300 + SkillLV * 100 + n_A_STR) * (n_A_BaseLV / 100);
    },
  }),
  (MEC_VULCAN_ARM = {
    id: 570,
    type: Offensive,
    range: [13, 13, 13],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `
		switch(PATCH){
			case 0:
			case 1:
				0;
				break;
			case 2:
				0.2;
				break;
			default:
				0;
				break;
		}
	`,
    castDelay: "0.4 - (0.1 * n_A_ActiveSkillLV)",
    cooldown: `
		switch(PATCH){
			case 0:
			case 1:
				0;
				break;
			case 2:
				0.1;
				break;
			default:
				0;
				break;
		}
	`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (70 * SkillLV + n_A_DEX) * (n_A_BaseLV / 120);
        case 2:
          return (140 * SkillLV + n_A_DEX) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (MEC_FLAME_LAUNCHER = {
    id: 571,
    type: Offensive,
    range: [5, 5, 5],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: "0.5",
    variableCastTime: "0.5 * n_A_ActiveSkillLV",
    castDelay: "2 - (0.5 * n_A_ActiveSkillLV)",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (300 + 300 * SkillLV) * (n_A_BaseLV / 150);
    },
  }),
  (MEC_COLD_SLOWER = {
    id: 572,
    type: Offensive,
    range: [5, 5, 5],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: "n_A_ActiveSkillLV",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return (300 + 300 * SkillLV) * (n_A_BaseLV / 150);
    },
  }),
  (MEC_ARM_CANNON = {
    id: 573,
    type: Offensive,
    range: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `
		switch(PATCH){
			case 0:
			case 1:
				Max((0.8 - (n_A_ActiveSkillLV * 0.2)),0.2);
				break;
			case 2:
				0.6 - (n_A_ActiveSkillLV * 0.1);
				break;
			default:
				0;
				break;
		}
	`,
    variableCastTime: `
		switch(PATCH){
			case 0:
			case 1:
				1.2 - (n_A_ActiveSkillLV * 0.2);
				break;
			case 2:
				1 - (n_A_ActiveSkillLV * 0.2);
				break;
			default:
				0;
				break;
		}
	`,
    castDelay: `
		switch(PATCH){
			case 0:
			case 1:
				Min(0.5 * Math.pow(2, (n_A_ActiveSkillLV -1)),2);
				break;

			case 2:
				1;
				break;
			default:
				0;
				break;
		}
	`,
    cooldown: `
		switch(PATCH){
			case 0:
			case 1:
				switch(n_A_ActiveSkillLV)
				{
					case 1:
						0.15;
						break;
					case 2:
						0.20;
						break;
					case 3:
						0.30;
						break;
					case 4:
						0.45;
						break;
					case 5:
						0.65;
						break;
					default :
						0;
						break;
				}
				break;
			case 2:
				0.3;
				break;
			default:
				0;
				break;
		}
	`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (
            (300 + (300 + 50 * (2 - n_B[en_SIZE])) * SkillLV) *
            (n_A_BaseLV / 120)
          );
        case 2:
          return (300 + 400 * SkillLV) * (n_A_BaseLV / 120);
      }
      return 0;
    },
  }),
  (MEC_MAINFRAME_RESTRUCTURE = {
    id: 574,
    type: Passive /*TODO*/,
    range: [0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 20 + 20 * SkillLV;
    },
  }),
  (MEC_SELF_DESTRUCTION = {
    id: 575,
    type: Offensive,
    range: [1, 1, 1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: "2.5 - (n_A_ActiveSkillLV * 0.5)",
    castDelay: `0`,
    cooldown: "5",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      let currentHP = parseInt(formElements["SkillSubNum"].value);
      let currentSP = parseInt(formElements["SkillSubNum2"].value);
      currentHP = Min(n_A_MaxHP, currentHP);
      currentHP = Max(1, currentHP);
      currentSP = Min(n_A_MaxSP, currentSP);
      currentSP = Max(1, currentSP);
      return (
        (SkillLV + 1) *
          (SkillSearch(skill_MEC_MAINFRAME_RESTRUCTURE) + 8) *
          (currentSP + n_A_VIT) *
          (n_A_BaseLV / 100) +
        currentHP
      );
    },
  }),
  (MEC_EMERGENCY_COOL = {
    id: 576,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_MAGNETIC_FIELD = {
    id: 577,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_NEUTRAL_BARRIER = {
    id: 578,
    type: Support /*TODO*/,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 10 + SkillLV * 5;
    },
  }),
  (MEC_SHAPE_SHIFT = {
    id: 579,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_INFRARED_SCAN = {
    id: 580,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_ANALYZE = {
    id: 581,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return SkillLV * 14;
    },
  }),
  (MEC_STEALTH_FIELD = {
    id: 582,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_SPEAR_CANNON = {
    id: 583,
    type: Offensive,
    range: [7, 7, 7, 7, 7],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: "2",
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (50 * SkillLV + n_A_STR * SkillLV) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_VANISHING_POINT = {
    id: 584,
    type: Offensive,
    range: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let bashLevel = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
          return (50 * SkillLV + bashLevel * 30) * (n_A_BaseLV / 100);
        case 2:
          return (80 * SkillLV + bashLevel * 50) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_TRAMPLE = {
    id: 585,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_SHIELD_PRESS = {
    id: 586,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: "2",
    animation: `1`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "5",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let shieldWeight = ItemOBJ[n_A_Equip[eq_SHIELD]][itm_WEIGHT];
      switch (PATCH) {
        case 0:
          return (150 * SkillLV + shieldWeight + n_A_STR) * (n_A_BaseLV / 100);
        case 1:
        case 2:
          return (200 * SkillLV + shieldWeight + n_A_STR) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_REFLECT_DAMAGE = {
    id: 587,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_PINPOINT_ATTACK = {
    id: 588,
    type: Offensive,
    range: [5, 5, 5, 5, 5],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (100 * SkillLV + n_A_AGI * 5) * (n_A_BaseLV / 120);
      }
      return 0;
    },
  }),
  (ROY_FORCE_OF_VANGUARD = {
    id: 589,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_RAGE_BURST = {
    id: 590,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: "3",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let rageCounter = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          // return ((200 * rageCounter) + (n_A_MaxHP - currentHP)) * (n_A_BaseLV / 100);
          return 200 * rageCounter * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_SHIELD_SPELL = {
    id: 591,
    type: Active,
    range: [0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2) {
        if (SkillLV) return ItemOBJ[n_A_Equip[eq_SHIELD]][itm_DEF];
      } else {
        if (SkillLV) return 150;
      }
      return 0;
    },
  }),
  (ROY_EXCEED_BREAK = {
    id: 592,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: "4.5 + (n_A_ActiveSkillLV * 0.5)",
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let weaponWeight = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WEIGHT];
      let weaponLevel = ItemOBJ[n_A_Equip[eq_WEAPON]][itm_WLVL];
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (
            (100 * SkillLV + n_A_JobLV * 10 + weaponWeight * weaponLevel) *
            (n_A_BaseLV / 100)
          );
      }
      return 0;
    },
  }),
  (ROY_OVERBRAND = {
    id: 593,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: "0.5",
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: "0.3",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `
	switch(PATCH){
		case 0:
		case 1:
			1
			break;
		case 2:
			3
			break;
		default:
			1
			break;
	}
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      var numHits = parseInt(formElements["SkillSubNum"].value);
      var moonSlasher = formElements["SkillSubNum2"].checked;
      let sk_dmg = 0;
      switch (PATCH) {
        case 0:
        case 1:
          switch (numHits) {
            case 0:
              return (
                (SkillLV * 200 + SkillSearch(skill_CR_SPEAR_QUICKEN) * 50) *
                (n_A_BaseLV / 100)
              );
            case 1:
              sk_dmg =
                (SkillLV * 200 + SkillSearch(skill_CR_SPEAR_QUICKEN) * 50) *
                (n_A_BaseLV / 100);
              return (
                sk_dmg +
                (SkillLV * 100 + (n_A_STR + n_A_DEX)) * (n_A_BaseLV / 100)
              );
            case 2:
              sk_dmg =
                (SkillLV * 200 + SkillSearch(skill_CR_SPEAR_QUICKEN) * 50) *
                (n_A_BaseLV / 100);
              sk_dmg +=
                (SkillLV * 100 + (n_A_STR + n_A_DEX)) * (n_A_BaseLV / 100);
              return sk_dmg + SkillLV * 100;
          }
        case 2:
          if (moonSlasher)
            return (450 * SkillLV + n_A_STR + n_A_DEX) * (n_A_BaseLV / 100);
          return (300 * SkillLV + n_A_STR + n_A_DEX) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_PRESTIGE = {
    id: 594,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_BANDING = {
    id: 595,
    type: Support /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_MOON_SLASHER = {
    id: 596,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: "7 - n_A_ActiveSkillLV",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (
            (SkillLV * 120 + SkillSearch(skill_ROY_OVERBRAND) * 80) *
            (n_A_BaseLV / 100)
          );
      }
      return 0;
    },
  }),
  (ROY_RAY_OF_GENESIS = {
    id: 597,
    type: Offensive,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: "0.5",
    variableCastTime: `
	switch(n_A_ActiveSkillLV){
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			2 + (n_A_ActiveSkillLV * 0.5)
			break;
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
		default:
			4
		break;
	}
	`,
    castDelay: `1`,
    cooldown: "2",
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0: /* TODO : before December 15th,2021 patch on irowiki : should have hybrid damage and different formula*/
        case 1:
          return SkillLV * 200 * (n_A_BaseLV / 100);
        case 2:
          if (SkillSearch(skill_ROY_INSPIRATION))
            return (SkillLV * 300 + n_A_INT * 2) * (n_A_BaseLV / 100);
          return (SkillLV * 230 + n_A_INT * 2) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_PIETY = {
    id: 598,
    type: Support /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_EARTH_DRIVE = {
    id: 599,
    type: Offensive,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: "7.5 - (n_A_ActiveSkillLV)",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "5",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let shieldWeight = ItemOBJ[n_A_Equip[eq_SHIELD]][itm_WEIGHT];
      switch (PATCH) {
        case 0:
        case 1:
          return (SkillLV + 1) * shieldWeight * (n_A_BaseLV / 100);
        case 2:
          return (SkillLV * 380 + n_A_STR + n_A_VIT) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_HESPERUS_LIT = {
    id: 600,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: "3",
    cooldown: "20",
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      //let numRoyalGuards = SkillSearch( skill_ROY_NUM_GUARDS );//TODO : missing
      switch (PATCH) {
        case 0:
        case 1:
          // return ((SkillLV * 120) + (200 * numRoyalGuards)) * (n_A_BaseLV / 100);
          return SkillLV * 120 * (n_A_BaseLV / 100);
        case 2:
          if (SkillSearch(skill_ROY_INSPIRATION))
            return (SkillLV * 450 + n_A_VIT) * (n_A_BaseLV / 100);
          return (SkillLV * 300 + n_A_VIT) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (ROY_INSPIRATION = {
    id: 601,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV)
        if (PATCH < 2) return 40 * SkillLV + 3 * n_A_JobLV;
        // Inspiration [Skill Level x 40 ] + [Caster’s Job Level x 3 ]
        else if (PATCH == 2) return 40 * SkillLV; // Inspiration [Skill Level x 40 ]
      return 0;
    },
  }),
  (SHA_FATAL_MENACE = {
    id: 602,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: "0.5",
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `
	if((n_A_WeaponType == weapTyp_DAGGER) && (PATCH >= 1))
		2
	else
		1
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (100 + SkillLV * 100) * (n_A_BaseLV / 100);
        case 2:
          return (SkillLV * 120 + n_A_AGI * 2) * (n_A_BaseLV / 100);
      }
      return 0;
    },
  }),
  (SHA_REPRODUCE = {
    id: 603,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_AUTO_SHADOW_SPELL = {
    id: 604,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_SHADOW_FORM = {
    id: 605,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_TRIANGLE_SHOT = {
    id: 606,
    type: Offensive /*TODO*/,
    range: [7, 7, 7, 9, 9, 9, 9, 11, 11, 11],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `
	switch(PATCH){
		case 0:
		case 1:
			1;
			break;
		case 2:
		default:
			0;
	}`,
    castDelay: `
	switch(PATCH){
		case 0:
		case 1:
			0.5;
			break;
		case 2:
			0.35;
			break;
		default:
			0;
	}`,
    cooldown: `
	switch(PATCH){
		case 0:
		case 1:
			0;
			break;
		case 2:
			0.2;
			break;
		default:
			0;
	}`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `3`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (300 + n_A_AGI * (SkillLV * 0.5)) * (n_A_BaseLV / 100);
        case 2:
          return (230 * SkillLV + n_A_AGI * 3) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SHA_STRIP_ACCESSORY = {
    id: 607,
    type: Active /*TODO*/,
    range: [3, 3, 3, 3, 3],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 12 + SkillLV * 2;
        default:
          return 0;
      }
    },
  }),
  (SHA_INVISIBILITY = {
    id: 608,
    type: Active /*TODO*/,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 20 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SHA_DEADLY_INFECT = {
    id: 609,
    type: Active /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 30 + 10 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SHA_BODY_PAINTING = {
    id: 610,
    type: Active /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `2`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MASQUERADE_ENERVATION = {
    id: 611,
    type: Active /*TODO*/,
    range: [1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: `2`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MASQUERADE_GLOOMY = {
    id: 612,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MASQUERADE_IGNORANCE = {
    id: 613,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MASQUERADE_LAZINESS = {
    id: 614,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MASQUERADE_WEAKNESS = {
    id: 615,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MASQUERADE_UNLUCKY = {
    id: 616,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MAN_HOLE = {
    id: 617,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_DIMENSION_DOOR = {
    id: 618,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_CHAOS_PANIC = {
    id: 619,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_MAELSTROM = {
    id: 620,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_BLOODY_LUST = {
    id: 621,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_FEINT_BOMB = {
    id: 622,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (
            (SkillLV + 1) *
            (n_A_DEX / 2) *
            (n_A_JobLV / 10) *
            (n_A_BaseLV / 120)
          );
        default:
          return 0;
      }
    },
  }),
  (SUR_DRAGON_COMBO = {
    id: 623,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "2",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (100 + 40 * SkillLV) * (n_A_BaseLV / 100);
        case 2:
          return (100 + 80 * SkillLV) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_SKY_NET_BLOW = {
    id: 624,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: "3",
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (80 * SkillLV + n_A_AGI) * (n_A_BaseLV / 100);
        case 2:
          return (200 * SkillLV + n_A_AGI) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_EARTH_SHAKER = {
    id: 625,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `3`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let visible = formElements["SkillSubNum"].checked;
      switch (PATCH) {
        case 0:
        case 1:
          if (visible) return 50 * SkillLV * (n_A_BaseLV / 100) + n_A_INT * 2;
          return 150 * SkillLV * (n_A_BaseLV / 100) + n_A_INT * 3;
        case 2:
          if (visible) return 300 * SkillLV * (n_A_BaseLV / 100) + n_A_STR * 2;
          return 400 * SkillLV * (n_A_BaseLV / 100) + n_A_STR * 3;
        default:
          return 0;
      }
    },
  }),
  (SUR_RAMPAGE_BLASTER = {
    id: 626,
    type: Offensive,
    range: [7, 7, 7, 7, 7],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let numSpheres = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
          if (SkillSearch(skill_MO_FURY))
            return (
              (SkillSearch(skill_MO_FURY) * 20 + SkillLV * 20) *
              numSpheres *
              (n_A_BaseLV / 120.0)
            );
          else return SkillLV * 20 * numSpheres * (n_A_BaseLV / 150.0);
        case 2:
          return (
            (SkillLV * 350 + 200 * SkillSearch(skill_MO_FURY)) *
            (n_A_BaseLV / 100.0)
          );
        //if marked by earth shaker TODO
        //return  ((SkillLV * 550) + (300 * SkillSearch(skill_MO_FURY))) * (n_A_BaseLV / 100.0);
        default:
          return 0;
      }
    },
  }),
  (SUR_KNUCKLE_ARROW = {
    id: 627,
    type: Offensive,
    range: [8, 8, 9, 9, 10, 10, 11, 11, 12, 12],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      // let knockback = formElements["SkillSubNum"].checked;
      let addedDamage = 0;
      switch (PATCH) {
        case 0:
          // if(knockback)
          // 	addedDamage = (SkillLV * 150) + ((n_B[en_LEVEL] * 5) * (n_A_BaseLV / 150));
          return (500 + SkillLV * 100) * (n_A_BaseLV / 100) + addedDamage;
        case 1:
        case 2:
          // if(knockback)
          // 	addedDamage = (SkillLV * 150) + ((n_B[en_LEVEL] * 5) * (n_A_BaseLV / 150));
          if (n_B[en_BOSS] == 1)
            return (500 + SkillLV * 200) * (n_A_BaseLV / 100) + addedDamage;
          return (500 + SkillLV * 100) * (n_A_BaseLV / 100) + addedDamage;
        default:
          return 0;
      }
    },
    skillFormula2(SkillLV) {
      // Knockback damage only
      switch (PATCH) {
        case 0:
          return SkillLV * 150 + n_B[en_LEVEL] * 5 * (n_A_BaseLV / 150);
        case 1:
        case 2:
          return SkillLV * 150 + n_B[en_LEVEL] * 5 * (n_A_BaseLV / 150);
        default:
          return 0;
      }
    },
  }),
  (SUR_FALLEN_EMPIRE = {
    //inaccurate
    id: 628,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `2`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          return (100 + 150 * SkillLV) * (n_A_BaseLV / 150);
        case 1:
          return (100 + 250 * SkillLV) * (n_A_BaseLV / 150);
        case 2:
          return (100 + 300 * SkillLV) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_TIGER_CANNON = {
    id: 629,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1 + (n_A_ActiveSkillLV * 0.1)`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let afterFallenEmpire = formElements["SkillSubNum"].checked;
      let HPCost = (10 + 2 * SkillLV) * (n_A_MaxHP / 100);
      let SPCost = (5 + SkillLV) * (n_A_MaxSP / 100);
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          if (afterFallenEmpire)
            return (((HPCost + SPCost) / 2) * (n_A_BaseLV / 100) * 4) / 3;
          else return ((HPCost + SPCost) / 4) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  //here
  (SUR_GATE_OF_HELL = {
    id: 630,
    type: Offensive,
    range: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0.8 * (0.2 * n_A_ActiveSkillLV)`,
    castDelay: `0.1 * n_A_ActiveSkillLV`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `7`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let afterFallenEmpire = formElements["SkillSubNum"].checked;
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          if (afterFallenEmpire) return 800 * SkillLV * (n_A_BaseLV / 100);
          return 500 * SkillLV * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_CRESCENT_ELBOW = {
    id: 631,
    type: Active,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return Min((n_B[en_HP] / 100) * SkillLV * (n_A_BaseLV / 125), 5000);
        default:
          return 0;
      }
    },
  }),
  (SUR_WINDMILL = {
    id: 632,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `0.5`,
    cooldown: `3`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (n_A_BaseLV + n_A_DEX) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_CURSED_CIRCLE = {
    id: 633,
    type: Active,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUR_LIGHTNING_WALK = {
    id: 634,
    type: Active /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `2.5 - (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUR_RISING_DRAGON = {
    id: 635,
    type: Support,
    range: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `30`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      //mastery atk from spirit sphere
      let numSpheres = 5 + SkillLV;
      switch (n_A_ActiveSkill) {
        case skill_SUR_RAMPAGE_BLASTER:
        case skill_MO_GUILLOTINE_FIST:
        case skill_MO_MAX_GUILLOTINE_FIST:
          numSpheres = 0;
          break;
        case skill_SUR_FALLEN_EMPIRE:
          numSpheres -= 2;
          break;
        default:
          break;
      }
      numSpheres = Max(numSpheres, 0);
      return 3 * numSpheres;
    },
  }),
  (SUR_LION_HOWLING = {
    id: 636,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0.5`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return 300 * SkillLV * (n_A_BaseLV / 150);
        case 2:
          return 500 * SkillLV * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_LIGHTNING_RIDE = {
    id: 637,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `if(PATCH < 2){ n_A_ActiveSkillLV } else { 1 }`,
    castDelay: `1`,
    cooldown: `0.5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `if(PATCH < 2){ 1 } else { n_A_ActiveSkillLV }`,
    hitDivisibility: `if(PATCH < 2){ n_A_ActiveSkillLV } else { 1 }`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          if (n_A_Weapon_element == ele_WIND)
            return 250 * SkillLV * (n_A_BaseLV / 100);
          return 200 * SkillLV * (n_A_BaseLV / 100);
        case 2:
          if (n_A_WeaponType == weapTyp_KNUCKLE)
            return 130 * SkillLV * (n_A_BaseLV / 100);
          return 40 * SkillLV * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_GENTLE_TOUCH_SILENCE = {
    id: 638,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0.5 + (0.5 * n_A_ActiveSkillLV)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (100 * SkillLV + n_A_DEX) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SUR_GENTLE_TOUCH_CURE = {
    id: 639,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUR_GENTLE_TOUCH_ENERGY_GAIN = {
    id: 640,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUR_GENTLE_TOUCH_CHANGE = {
    id: 641,
    type: Active,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          if (SkillLV)
            // Gentle Touch Convert: ATK [{(Caster’s DEX / 4) + (Caster’s STR / 2)} x Skill Level / 5]
            return (n_A_DEX / 4.0 + n_A_STR / 2.0) * (SkillLV / 5.0);
          // return Math.floor( ( (SU_DEX / 4.0) + ( SU_STR / 2.0) ) * (SkillLV / 5.0) );
          else if (acolyteBuffs[ksPPChange] > 0)
            return (
              ((acolyteBuffs[ksSuraDexterity] / 4.0 +
                acolyteBuffs[ksSuraStrength] / 2.0) *
                acolyteBuffs[ksPPChange]) /
              5.0
            );
          else return 0;

        case 2:
          return 8 * SkillLV;
      }
      return 0;
    },
  }),
  (SUR_GENTLE_TOUCH_REVITALIZE = {
    id: 642,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUR_POWER_ABSORB = {
    id: 643,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUR_POWER_IMPLANTATION = {
    id: 644,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  // MAESTRO AND WANDERER
  (MIN_WINDMILL = {
    id: 645,
    type: Support,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) {
        let voiceLessonsBonus = performerBuffs[ksMaestroVoiceLessons];
        let jobLvlBonus = performerBuffs[ksMaestroJobLevel] / 5.0;

        return Math.floor(SkillLV * 6 + voiceLessonsBonus + jobLvlBonus);
      }
      return 0;
    },
  }),
  (MIN_ECHO_SONG = {
    id: 646,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIN_HARMONIZE = {
    id: 647,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAN_SWING_DANCE = {
    id: 648,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAN_SYMPHONY = {
    id: 649,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAN_MOONLIGHT = {
    id: 650,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_VOICE_LESSONS = {
    id: 651,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_REVERBERATION = {
    id: 652,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0.5`,
    variableCastTime: `1 + (n_A_ActiveSkillLV * 0.1)`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          /* on sim, level 1~5 is used for magical part, level 6~10 is physical part */
          if (SkillLV <= 5) return (100 + 100 * SkillLV) * (n_A_BaseLV / 100);
          return (300 + 100 * (SkillLV - 5)) * (n_A_BaseLV / 100);
        case 2:
          return (700 + 300 * SkillLV) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (MIWA_DOMINION_IMPULSE = {
    id: 653,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_METALLIC_SOUND = {
    id: 654,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0.5 + (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `1`,
    cooldown: `1.5 + (n_A_ActiveSkillLV * 0.5)`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `2`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (
            ((120 * SkillLV )+ SkillSearch(skill_MIWA_VOICE_LESSONS) * 60) *
            (n_A_BaseLV / 100)
          );
        default:
          return 0;
      }
    },
  }),
  (MIWA_GREAT_ECHO = {
    id: 655,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0.5`,
    variableCastTime: `1.8 + (n_A_ActiveSkillLV * 0.2)`,
    castDelay: `1`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let numPerformers = parseInt(formElements["SkillSubNum"].value);

      switch (PATCH) {
        case 0:
        case 1:
          let performerBonus = 0;
          if (numPerformers === 3) performerBonus = 100;
          else if (numPerformers === 4) performerBonus = 200;
          else if (numPerformers === 5) performerBonus = 400;
          else if (numPerformers === 6) performerBonus = 800;
          else if (numPerformers >= 7) performerBonus = 1600;
          return (400 + 200 * SkillLV) * (n_A_BaseLV / 100) + performerBonus;
        case 2:
          if (numPerformers > 1)
            return (250 + 500 * SkillLV) * (n_A_BaseLV / 100) * 2;
          return (250 + 500 * SkillLV) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (MIWA_SEVERE_RAINSTORM = {
    id: 656,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0.5`,
    variableCastTime: `1 + (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `1`,
    cooldown: `4.5 + (n_A_ActiveSkillLV * 0.5)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `12`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let weapTypeBonus = 1;
      if (
        n_A_WeaponType == weapTyp_INSTRUMENT ||
        n_A_WeaponType == weapTyp_WHIP
      )
        weapTypeBonus = 1.5;
      switch (PATCH) {
        case 0:
          return (n_A_DEX + n_A_AGI) * (SkillLV / 5) * (n_A_BaseLV / 100);
        case 1:
          return (
            (n_A_DEX + n_A_AGI) *
            (SkillLV / 5) *
            (n_A_BaseLV / 100) *
            weapTypeBonus
          );
        case 2:
          if (
            n_A_WeaponType == weapTyp_INSTRUMENT ||
            n_A_WeaponType == weapTyp_WHIP
          )
            return (
              (120 * SkillLV + (n_A_DEX + n_A_AGI) / 2) * (n_A_BaseLV / 100)
            );
          return (100 * SkillLV + (n_A_DEX + n_A_AGI) / 2) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (MIWA_DEEP_SLEEP_LULLABY = {
    id: 657,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_SONG_OF_DESPAIR = {
    id: 658,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_IMPROVISED_SONG = {
    id: 659,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_GLOOMY_SHYNESS = {
    id: 660,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_VOICE_OF_SIREN = {
    id: 661,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_CIRCLE_OF_NATURE = {
    id: 662,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_DEATH_VALLEY = {
    id: 663,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_DANCES_WITH_WARGS = {
    id: 664,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_SATURDAY_NIGHT_FEVER = {
    id: 665,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_SOUND_OF_DESTRUCTION = {
    id: 666,
    type: 0 /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: true,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 1000 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (MIWA_LERADS_DEW = {
    id: 667,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_WARCRY_FROM_BEYOND = {
    id: 668,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_UNLIMITED_HUMMING_VOICE = {
    id: 669,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_SONG_OF_MANA = {
    id: 670,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MIWA_SINKING_MELODY = {
    id: 671,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  // SORCERER
  (SOR_FIRE_WALK = {
    id: 672,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 60 * SkillLV * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_ELECTRIC_WALK = {
    id: 673,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 60 * SkillLV * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_SPELL_FIST_FBOLT = {
    id: 674,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let boltLevel = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
          return (50 * SkillLV + boltLevel * 100) * (n_A_BaseLV / 100);
        case 2:
          return (20 * SkillLV + boltLevel * 100) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_SPELL_FIST_CBOLT = {
    id: 675,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let boltLevel = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
          return (50 * SkillLV + boltLevel * 100) * (n_A_BaseLV / 100);
        case 2:
          return (20 * SkillLV + boltLevel * 100) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_SPELL_FIST_LBOLT = {
    id: 676,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let boltLevel = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
          return (50 * SkillLV + boltLevel * 100) * (n_A_BaseLV / 100);
        case 2:
          return (20 * SkillLV + boltLevel * 100) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_VACUUM_EXTREME = {
    id: 677,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_PSYCHIC_WAVE = {
    id: 678,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1.1 - (n_A_ActiveSkillLV * 0.1)`,
    variableCastTime: `n_A_ActiveSkillLV + 7`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `
	if(PATCH >= 2 && (n_A_WeaponType == weapTyp_BOOK || n_A_WeaponType ==weapTyp_STAFF))
		2
	else
		1
	`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (70 * SkillLV + n_A_INT * 3) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_CLOUD_KILL = {
    id: 679,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_POISON,
    fixedCastTime: `
	if(n_A_ActiveSkillLV != 5)
		0.9 - (n_A_ActiveSkillLV * 0.2)
	else
		0
	`,
    variableCastTime: `
	if(n_A_ActiveSkillLV != 5)
		2.1 + (n_A_ActiveSkillLV * 0.2)
	else
		3
	`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (40 * SkillLV + n_A_INT * 3) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_POISON_BUSTER = {
    id: 680,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_POISON,
    fixedCastTime: `1 - (n_A_ActiveSkillLV * 0.2)`,
    variableCastTime: `1 + (n_A_ActiveSkillLV * 1.2)`,
    castDelay: `1`,
    cooldown: `2`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (1000 + 300 * SkillLV + n_A_INT) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (SOR_STRIKING = {
    id: 681,
    type: Support,
    range: [10, 10, 10, 10, 10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (PATCH < 2)
        if (SkillLV)
          return (
            (8 + otherBuffs[ksStriking] * 2) * n_A_WeaponLV +
            5 * otherBuffs[ksStrikingEndowBonus]
          );
        else return 0;
      else return 20 * SkillLV;
    },
  }),
  (SOR_EARTH_GRAVE = {
    id: 682,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_EARTH,
    fixedCastTime: `2 - (n_A_ActiveSkillLV * 0.2)`,
    variableCastTime: `2 + (n_A_ActiveSkillLV * 0.2)`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `3`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (
            (SkillLV * n_A_INT + SkillSearch(skill_SA_ENDOW_EARTH) * 200) *
            (n_A_BaseLV / 100)
          );
        case 2:
          return (
            ((SkillLV + 2) * n_A_INT +
              SkillSearch(skill_SA_ENDOW_EARTH) * 300) *
            (n_A_BaseLV / 100)
          );
        default:
          return 0;
      }
    },
  }),
  (SOR_DIAMOND_DUST = {
    id: 683,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: `1 - (n_A_ActiveSkillLV * 0.2)`,
    variableCastTime: `4.5 + (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `5`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (
            (SkillLV * n_A_INT + SkillSearch(skill_SA_ENDOW_WATER) * 200) *
            (n_A_BaseLV / 100)
          );
        case 2:
          return (
            ((SkillLV + 2) * n_A_INT +
              SkillSearch(skill_SA_ENDOW_WATER) * 300) *
            (n_A_BaseLV / 100)
          );
        default:
          return 0;
      }
    },
  }),
  (SOR_WARMER = {
    id: 684,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_VARETYR_SPEAR = {
    id: 685,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WIND,
    fixedCastTime: `2 - (n_A_ActiveSkillLV * 0.2)`,
    variableCastTime: `2 + (n_A_ActiveSkillLV * 0.2)`,
    castDelay: `1`,
    cooldown: `
	if(PATCH == 0)
		2
	else
		5
	`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: true,
    hitAmount: `1`,
    hitDivisibility: `3`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let strikingLevel = parseInt(formElements["SkillSubNum"].value);
      let endowLevel = parseInt(formElements["SkillSubNum2"].value);
      switch (PATCH) {
        case 0:
          return (50 * SkillLV + n_A_INT * SkillLV) * (n_A_BaseLV / 100);
        case 1:
          return (
            ((SkillLV * n_A_INT) / 2 + endowLevel * 120 + strikingLevel * 120) *
            (n_A_BaseLV / 100)
          );
        case 2:
          return (
            (((SkillLV + 2) * n_A_INT) / 2 +
              (endowLevel + strikingLevel) * 150) *
            (n_A_BaseLV / 100)
          );
        default:
          return 0;
      }
    },
  }),
  (SOR_ARRULLO = {
    id: 686,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_SWORD_TRAINING = {
    id: 687,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          if (
            n_A_WeaponType == weapTyp_SWORD ||
            n_A_WeaponType == weapTyp_DAGGER
          )
            return 10 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (GEN_CART_REMODELING = {
    id: 688,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_CART_TORNADO = {
    id: 689,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `
	if(PATCH == 0)
		0.5
	else
		1
	`,
    cooldown: `
	if(PATCH == 0)
		-0.5 + (n_A_ActiveSkillLV * 0.5)
	else
		2
	`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let Curr_Cart_Weight = eval(document.calcForm.SkillSubNum.value);
      switch (PATCH) {
        case 0:
          return (
            50 * SkillLV +
            SkillSearch(skill_GEN_CART_REMODELING) * 50 +
            Curr_Cart_Weight / (150 - SU_STR)
          );
        case 1:
          return (
            100 * SkillLV +
            SkillSearch(skill_GEN_CART_REMODELING) * 50 +
            Curr_Cart_Weight / (150 - SU_STR)
          );
        case 2:
          return (
            200 * SkillLV +
            SkillSearch(skill_GEN_CART_REMODELING) * 50 +
            Curr_Cart_Weight / (150 - SU_STR)
          );
        default:
          return 0;
      }
    },
  }),
  (GEN_CART_CANNON = {
    id: 690,
    type: Offensive,
    range: [8, 9, 10, 11, 12],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0.5 + (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: true,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (
            60 * SkillLV +
            SkillSearch(skill_GEN_CART_REMODELING) * 50 * (n_A_INT / 40)
          );
        case 2:
          return (
            (250 * SkillLV +
              SkillSearch(skill_GEN_CART_REMODELING) *
                (SkillLV * 20) *
                (n_A_INT * 2)) *
            (n_A_BaseLV / 100)
          );
        default:
          return 0;
      }
    },
  }),
  (GEN_CART_BOOST = {
    id: 691,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      return 10 * SkillLV;
    },
  }),
  (GEN_THORN_TRAP = {
    id: 692,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100 + SkillLV * 200 + n_A_INT;
        default:
          return 0;
      }
    },
  }),
  (GEN_BLOOD_SUCKER = {
    id: 693,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_SPORE_EXPLOSION = {
    id: 694,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1.5`,
    castDelay: `0.5`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          return (100 * SkillLV + (n_A_INT + 200)) * (n_A_BaseLV / 100);
        case 1:
        case 2:
          return (400 + 200 * SkillLV + n_A_INT) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (GEN_WALL_OF_THORNS = {
    id: 695,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1.5`,
    castDelay: `0.5`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100 + SkillLV * 10;
        default:
          return 0;
      }
    },
  }),
  (GEN_CRAZY_WEED = {
    id: 696,
    type: Offensive,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: true,
    skillElement: ele_EARTH,
    fixedCastTime: `0`,
    variableCastTime: `2.5 + (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `0.5`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return 500 + 100 * SkillLV;
        case 2:
          return (700 + 100 * SkillLV) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (GEN_DEMONIC_FIRE = {
    id: 697,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `0`,
    variableCastTime: `2.5 + (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `0.5`,
    cooldown: `5`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 110 + SkillLV * 20;
        default:
          return 0;
      }
    },
  }),
  (GEN_FIRE_EXPANSION = {
    id: 698,
    type: Offensive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `2`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_HELLS_PLANT = {
    id: 699,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `2.5 + (n_A_ActiveSkillLV * 0.5)`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (
            (SkillLV * n_A_BaseLV * 10 +
              ((n_A_INT * 7) / 2) * (18 + n_A_JobLV / 4)) *
            (5 / (10 - SkillSearch(AL_SUMMON_FLORA)))
          );
        case 2:
          return (
            (100 * SkillLV + n_A_INT * SkillSearch(AL_SUMMON_FLORA)) *
            (n_A_BaseLV / 100)
          );
        default:
          return 0;
      }
    },
  }),
  (GEN_HOWLING_OF_MANDRAGORA = {
    id: 700,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_SLING_ITEM = {
    id: 701,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_CHANGE_MATERIAL = {
    id: 702,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_MIX_COOKING = {
    id: 703,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_CREATE_BOMB = {
    id: 704,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_SPECIAL_PHARMACY = {
    id: 705,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_SPIRIT_CONTROL = {
    id: 706,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_SUMMON_AGNI = {
    id: 707,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_SUMMON_VENTUS = {
    id: 708,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_SUMMON_AQUA = {
    id: 709,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_SUMMON_TERRA = {
    id: 710,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_INSIGNIA_FIRE = {
    id: 711,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_INSIGNIA_WIND = {
    id: 712,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_INSIGNIA_WATER = {
    id: 713,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_INSIGNIA_EARTH = {
    id: 714,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_SUMMON_TYPE = {
    id: 715,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_SUMMON_LEVEL = {
    id: 716,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_SHIELD_SPELL_ATK = {
    id: 717,
    type: Offensive,
    range: [1, 1, 1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: `2`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          return (
            n_A_BaseLV * 4 +
            ItemOBJ[n_A_Equip[eq_SHIELD]][itm_DEF] * 10 +
            n_A_VIT * 2
          );
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_SHIELD_SPELL_MATK = {
    id: 718,
    type: Offensive,
    range: [10, 10, 10],
    forcedElement: true,
    skillElement: ele_HOLY,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let shieldMdef = 0;
      for (
        let i = itm_BONUS_START;
        ItemOBJ[n_A_Equip[eq_SHIELD]][i] !== bon_NONE;
        i += 2
      ) {
        // find shield MDEF
        if (ItemOBJ[n_A_Equip[eq_SHIELD]][i] === bon_MDEF)
          shieldMdef = ItemOBJ[n_A_Equip[eq_SHIELD]][i + 1];
      }
      switch (PATCH) {
        case 0:
        case 1:
          return n_A_BaseLV * 4 + shieldMdef * 100 + n_A_INT * 2;
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_NUM_GUARDS = {
    id: 719,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (ROY_OVERBRAND_OLD = {
    id: 720,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          let numHits = parseInt(formElements["SkillSubNum"].value);

          // From RG compilation thread: http://forums.irowiki.org/showpost.php?p=644548&postcount=3366
          //Suggested formula:
          //First hit:
          //[Atk]*[(8*(skill level) + (level of spear quicken))*base level/3]%
          //Or
          //[Atk]*[266.66%*(skill level) + (level of spear quicken)*33.33%]*base level/100 ***THIS IS THE ONE I'M USING FOR CALC***
          //Second hit:
          //[Atk]*[200%*(skill level) + 2%*(Str+Dex)/3]*(base level)/100 ***Times 2%? or times 2?***
          //Third hit:
          //[Atk]*[160%*(skill level)]*(base level)/100

          // Deals Pierce Damage to targets up to 7 cells infront of the Caster.
          let sk_dmg =
            (((n_A_ActiveSkillLV * 8.0) / 3.0 +
              SkillSearch(skill_CR_SPEAR_QUICKEN) / 3.0) *
              n_A_BaseLV) /
            100.0;

          if (numHits >= 2) {
            // Deals Swing Damage to targets in 5x2 cell infront of the Caster.
            return (
              sk_dmg +
              ((n_A_ActiveSkillLV * 2.0 + (0.02 * (n_A_STR + n_A_DEX)) / 3.0) *
                n_A_BaseLV) /
                100.0
            );
          }
          if (numHits >= 3) {
            // Deals additional knockback damage.
            var randomNumber = Math.floor(Math.random() * 91) + 10;
            return sk_dmg + (n_A_ActiveSkillLV * 1.6 * n_A_BaseLV) / 100.0;
          }
          return sk_dmg;
      }
    },
  }),
  (ALL_ODINS_POWER = {
    id: 721,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SG_FIBER_LOCK = {
    id: 722,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (KAG_OVERTHROW = {
    id: 723,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      let sk_dmg = 10000;
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          if (n_B[en_BOSS] == 1) sk_dmg *= 0.5;
          if (SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE) < 10)
            sk_dmg *= 0.5;
          return sk_dmg * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (KAG_CROSS_STRIKE = {
    id: 724,
    type: Offensive,
    range: [4, 4, 4, 5, 5, 5, 6, 6, 6, 7],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `5.5 - (n_A_ActiveSkillLV * 0.5)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let cross = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
          if (cross)
            return (
              150 * SkillLV * (n_A_ActiveSkillLV / 120) * (SkillLV * n_A_BaseLV)
            );
          return 150 * SkillLV * (n_A_ActiveSkillLV / 120);
        case 2:
          if (cross)
            return (
              200 * SkillLV * (n_A_ActiveSkillLV / 120) * (SkillLV * n_A_BaseLV)
            );
          return 200 * SkillLV * (n_A_ActiveSkillLV / 120);
        default:
          return 0;
      }
    },
  }),
  (KAG_16TH_NIGHT = {
    id: 725,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (KAG_SPINTHROW_KUNAI = {
    id: 726,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 300 + 60 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (KAG_SPIRIT_BREAKER = {
    id: 727,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `3`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let linked = parseInt(formElements["SkillSubNum"].value);
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          if (linked) return 100 * SkillLV * (n_A_BaseLV / 100);
          return 200 * SkillLV * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (KAG_SWIRLING_PETAL = {
    id: 728,
    type: Offensive,
    range: [11, 11, 11, 11, 11, 11, 11, 11, 11, 11],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1.5`,
    castDelay: `0.5`,
    cooldown: `3`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
          // return (SkillLV * 150) + (SkillSearch(NIN_THROW_HUUMA_SHURIKEN) * 100) + n_A_AGI + n_A_DEX;
          return SkillLV * 150 + 5 * 100 + n_A_AGI + n_A_DEX;
        case 2:
          // return (SkillLV * 150) + (SkillSearch(NIN_THROW_HUUMA_SHURIKEN) * 100) + n_A_STR;
          return SkillLV * 150 + 5 * 100 + n_A_STR;
        default:
          return 0;
      }
    },
  }),
  (KAG_THROW_EXPLOSIVE_KUNAI = {
    id: 729,
    type: Offensive,
    range: [7, 8, 9, 10, 11],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0.6 + (n_A_ActiveSkillLV * 0.4)`,
    castDelay: `1`,
    cooldown: `3`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (
            (SkillLV *
              (50 + n_A_DEX / 4) *
              SkillSearch(skill_NIN_DAGGER_THROWING_PRACTICE) *
              0.4 *
              n_A_BaseLV) /
              120 +
            n_A_JobLV * 10
          );
        default:
          return 0;
      }
    },
  }),
  (KAG_SUMMON_ELEMENTAL_SEAL = {
    id: 730,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  //ONE SKILL FOR EACH ELEMENT
  (KAG_GET_ELEMENTAL_SEAL = {
    id: 731,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RUN_DRAGON_BREATH_WATER = {
    id: 732,
    type: Offensive,
    range: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_WATER,
    fixedCastTime: "0.5",
    variableCastTime: `
	switch(n_A_ActiveSkillLV)
	{
		case 1:
		case 2:
		case 3:
			0;
		break;
		case 4:
		case 5:
		case 6:
			1;
		break;
		case 7:
		case 8:
			1.5;
		break;
		case 9:
		case 10:
			2;
		break;
	}
	`,
    castDelay: "2",
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      let currentHP = parseInt(formElements["SkillSubNum"].value);
      if (currentHP > n_A_MaxHP) {
        currentHP = n_A_MaxHP;
        formElements["SkillSubNum"].value = n_A_MaxHP;
      } else if (currentHP < 1) {
        currentHP = 1;
        formElements["SkillSubNum"].value = 1;
      }
      switch (PATCH) {
        case 0:
          //[(CurrHP ÷ 50) + (MaxSP ÷ 4)] × (SkillLv × BaseLv ÷ 150) × (95 + DragonTraining_Lv × 5)%
          return (
            (currentHP / 50 + n_A_MaxSP / 4) *
            ((SkillLV * n_A_BaseLV) / 150) *
            (0.95 + (SkillSearch(skill_RUN_DRAGON_TRAINING) * 5) / 100)
          );
        case 1:
          // [(CurrHP ÷ 50) + (MaxSP ÷ 4)] × (SkillLv × BaseLv ÷ 150) × (95 + DragonTraining_Lv × 5)% × (100 + Ranged Damage Modifiers)% x (Elemental Modifiers)%
          return (
            (currentHP / 50 + n_A_MaxSP / 4) *
            ((SkillLV * n_A_BaseLV) / 150) *
            (0.95 + (SkillSearch(skill_RUN_DRAGON_TRAINING) * 5) / 100) *
            (1 +
              (getRangedMultiplier() /
                100) /** (1 - (enemy Demi humain reduction/100))*/ *
                getSkillMultiplier(skill_RUN_DRAGON_BREATH) *
                (getPropertyMultiplier() / 100))
          );
        case 2:
          //[(CurrHP ÷ 50) + (MaxSP ÷ 4)] × (SkillLv × BaseLv ÷ 100) × (90 + DragonTraining_Lv × 10)% × (100 + Ranged Damage Modifiers)% x (Elemental Modifiers)%
          return (
            (currentHP / 50 + n_A_MaxSP / 4) *
            ((SkillLV * n_A_BaseLV) / 100) *
            (0.9 + (SkillSearch(skill_RUN_DRAGON_TRAINING) * 10) / 100) *
            (1 +
              (getRangedMultiplier() /
                100) /** (1 - (enemy Demi humain reduction/100))*/ *
                getSkillMultiplier(skill_RUN_DRAGON_BREATH) *
                (getPropertyMultiplier() / 100))
          );
      }
      return 0;
    },
  }),
  (GLT_DARK_CLAW = {
    id: 733,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `60`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100 * PATCH;
        default:
          return 0;
      }
    },
  }),
  (ABI_OFFERTORIUM = {
    id: 734,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (RAN_NO_LIMITS = {
    id: 735,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (WAR_INTENSE_TELEKINESIS = {
    id: 736,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (MEC_LAVA_FLOW = {
    id: 737,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `0.5`,
    cooldown: `11 - n_A_ActiveSkillLV`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: false,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 450 + 50 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (ROY_KINGS_GRACE = {
    id: 738,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SHA_EMERGENCY_ESCAPE = {
    id: 739,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUR_FLASH_COMBO = {
    id: 740,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 20 + 20 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (MIWA_FRIGGS_SONG = {
    id: 741,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SOR_ELEMENTAL_SHIELD = {
    id: 742,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (GEN_HALLUCINATION_DRUG = {
    id: 743,
    type: Offensive /*TODO*/,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `6 - n_A_ActiveSkillLV`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100;
        default:
          return 0;
      }
    },
  }),
  (TRD_FULL_THROTTLE = {
    id: 744,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  //ici
  //Rebellion Skills
  (REB_RICHS_COIN = {
    id: 745,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (REB_FLICKER = {
    id: 746,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (REB_FALLEN_ANGEL = {
    id: 747,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (REB_FIRE_DANCE = {
    id: 748,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          return 100 * SkillLV;
        case 1:
          return 200 * SkillLV + SkillSearch(skill_GS_DESPERADO) * 50;
        case 2:
          return ((200 + 100 * SkillLV) + SkillSearch(skill_GS_DESPERADO) * 20) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (REB_HIT_BARREL = {
    id: 749,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (REB_SHATTERING_STORM = {
    id: 750,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `3.5 - (0.5 * n_A_ActiveSkillLV)`,
    castDelay: `0`,
    cooldown: `2`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          return (1000 + SkillLV * 100) * (n_A_ActiveSkillLV / 100);
        case 1:
        case 2:
          return 1700 + SkillLV * 200;
        default:
          return 0;
      }
    },
  }),
  (REB_VANISHING_BUSTER = {
    id: 751,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `
    if(PATCH <= 1) 
      1 
    else
      0.7
    `,
    variableCastTime: `
    if(PATCH <= 1) 
      3.5 - (n_A_ActiveSkillLV * 0.5)
    else
      1
    `,
    castDelay: `
    if(PATCH <= 1) 
      0
    else
      0.5
    `,
    cooldown: `
    if(PATCH <= 1) 
      2
    else
      1.5
    `,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          return (1000 + SkillLV * 200) * (n_A_BaseLV / 100);// good formula?
        case 1:
          return 2000 + SkillLV * 300;
        case 2:
          // return (1000 + SkillLV * 200) * (n_A_BaseLV / 100);
          return (1500 + SkillLV * 100) * (n_A_BaseLV / 100); // as stated here : https://www.divine-pride.net/forum/index.php?/topic/4175-kro-expanded-classes-185-level-expansion-and-skills-balance/
        default:
          return 0;
      }
    },
  }),
  (REB_SLUG_SHOT = {
    id: 752,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `n_A_ActiveSkillLV + 4`,
    castDelay: `0`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 1200 * SkillLV * (n_B[en_SIZE] + 2);
        default:
          return 0;
      }
    },
  }),
  (REB_MASS_SPIRAL = {
    id: 753,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `2`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: `2`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 200 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (REB_ANTI_MATERIAL_BLAST = {
    id: 754,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `2`,
    castDelay: `0`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 3500 + 300 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (REB_GODS_HAMMER = {
    id: 755,
    type: Offensive,
    range: [7, 8, 9, 10, 11, 11, 11, 11, 11, 11],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `
    if(PATCH < 2)
      2
    else
      0.5
    `,
    cooldown: `
    if(PATCH < 2)
      30
    else
      20
    `,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let numSpheres = parseInt(formElements["SkillSubNum"].value);
      let markedBonus = 150;
      if(formElements["SkillSubNum2"].checked)
        markedBonus = 400;
      switch (PATCH) {
        case 0:
        case 1:
          return 2800 + 1400 * SkillLV + Math.ceil((numSpheres + 1) / 2) * 200;
        case 2:
          return (100 * SkillLV + (numSpheres * markedBonus)) * (n_A_BaseLV/100)
        default:
          return 0;
      }
    },
  }),
  (REB_ETERNAL_CHAIN = {
    id: 756,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (REB_QUICK_DRAW_SHOT = {
    id: 757,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `Math.floor(1+(n_A_JobLV / 20))`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100 + Math.floor(1 + n_A_JobLV / 20);
        default:
          return 0;
      }
    },
  }),
  (REB_HOWLING_MINE = {
    id: 758,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: `5.5 - (n_A_ActiveSkillLV * 0.5)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      /* TODO : explosion damage */
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 200 + 200 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (REB_DRAGON_TAIL = {
    id: 759,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1 + (n_A_ActiveSkillLV * 0.2)`,
    castDelay: `
    if(PATCH < 2)
      2
    else
      1
    `,
    cooldown: `
    if(PATCH < 2)
      5
    else
      3.5
    `,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      let markedBonus = 1;
      if(formElements["SkillSubNum"].checked)
        markedBonus *= 2;
      switch (PATCH) {
        case 0:
        case 1:
          return 4000 + 1000 * SkillLV;
        case 2:
          return ((500 + (200 * SkillLV)) * markedBonus) * (n_A_BaseLV/100);
        default:
          return 0;
      }
    },
  }),
  (REB_FIRE_RAIN = {
    id: 760,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
          return (2000 + SkillLV * n_A_DEX) * (n_A_BaseLV / 100);
        case 1:
        case 2:
          return 3500 + SkillLV * 300;
        default:
          return 0;
      }
    },
  }),
  (REB_ROUND_TRIP = {
    id: 761,
    type: Offensive,
    range: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `3.5 - (n_A_ActiveSkillLV * 0.5)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      /* TODO : knockback damage */
      switch (PATCH) {
        case 0:
          return (n_A_DEX / 2) * (10 + SkillLV * 3);
        case 1:
          return 1000 + SkillLV * 300;
        case 2:
          return (500 + (200 * SkillLV)) * (n_A_BaseLV / 100);
        default:
          return 0;
      }
    },
  }),
  (REB_CRIMSON_MARKER = {
    id: 762,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (REB_PLATINUM_ALTAR = {
    id: 763,
    type: Active,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV)
        return 10 * SkillSearch(SkillLV) + SkillSearch(skill_GS_COIN_FLIP) * 10;
      else return 0;
    },
  }),
  (REB_BINDING_TRAP = {
    id: 764,
    type: Offensive,
    range: [1, 1, 1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `2.4 - (n_A_ActiveSkillLV * 0.4)`,
    castDelay: `0`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return (n_B[en_HP] / 100) * (3 * SkillLV) + 10 * n_A_DEX;
        default:
          return 0;
      }
    },
  }),
  //Summoner Skill
  (SUM_BASIC_SKILL = {
    id: 765,
    type: Offensive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100;
        default:
          return 0;
      }
    },
  }),
  (SUM_BITE = {
    id: 766,
    type: Offensive,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 200;
        default:
          return 0;
      }
    },
  }),
  (SUM_HIDE = {
    id: 767,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SCRATCH = {
    id: 768,
    type: Offensive,
    range: [1, 1, 1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 50 + 50 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SUM_LOPE = {
    id: 769,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_STOOP = {
    id: 770,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SPRITE_MARBLE = {
    id: 771,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SOUL_ATTACK = {
    id: 772,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_FRESH_SHRIMP = {
    id: 773,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_BUNCH_OF_SHRIMP = {
    id: 774,
    type: Support,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) return 10;
      else return 0;
    },
  }),
  (SUM_TUNA_BELLY = {
    id: 775,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_TUNA_PARTY = {
    id: 776,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_POWER_OF_SEA = {
    id: 777,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_GROOMING = {
    id: 778,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_PURRING = {
    id: 779,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_TASTY_SHRIMP_PARTY = {
    id: 780,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SPIRIT_OF_SEA = {
    id: 781,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SILVERVINE_STEM_SPEAR = {
    id: 782,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0.5`,
    variableCastTime: `2`,
    castDelay: `1`,
    cooldown: `1`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 700;
        default:
          return 0;
      }
    },
  }),
  (SUM_SILVERVINE_ROOT_TWIST = {
    id: 783,
    type: Offensive /*TODO*/,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_POISON,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100;
        default:
          return 0;
      }
    },
  }),
  (SUM_CATNIP_METEOR = {
    id: 784,
    type: Offensive,
    range: [10, 10, 10, 10, 10],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `3`,
    variableCastTime: `4`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 200 + 100 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SUM_CATNIP_POWDERING = {
    id: 785,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_POWER_OF_LAND = {
    id: 786,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_CHATTERING = {
    id: 787,
    type: Support,
    range: [0, 0, 0, 0, 0],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      if (SkillLV) return 100;
      return 0;
    },
  }),
  (SUM_MEOW_MEOW = {
    id: 788,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_NYANG_GRASS = {
    id: 789,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SPIRIT_OF_LAND = {
    id: 790,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_PICKY_PECK = {
    id: 791,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `5`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 200 + 100 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SUM_ARCLOUSE_DASH = {
    id: 792,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SCAR_OF_TAROU = {
    id: 793,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0.5`,
    castDelay: `1`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 100 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SUM_LUNATIC_CARROT_BEAT = {
    id: 794,
    type: Offensive,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `1`,
    cooldown: `6`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `3`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 200 + 100 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SUM_POWER_OF_LIFE = {
    id: 795,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_HISS = {
    id: 796,
    type: Support /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_POWER_OF_FLOCK = {
    id: 797,
    type: Active /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SPIRIT_OF_SAVAGE = {
    id: 798,
    type: Offensive /*TODO*/,
    range: [9, 9, 9, 9, 9],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `
	if(n_A_ActiveSkillLV < 5)
		3 - (n_A_ActiveSkillLV * 0.5)
	else
		0
	`,
    variableCastTime: `
	if(n_A_ActiveSkillLV < 5)
		1
	else
		0
	`,
    castDelay: `1`,
    cooldown: `32 - (n_A_ActiveSkillLV * 2)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
          return 250 + 150 * SkillLV;
        default:
          return 0;
      }
    },
  }),
  (SUM_SPIRIT_OF_LIFE = {
    id: 799,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_SEAFOOD = {
    id: 800,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_PLANT = {
    id: 801,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SUM_ANIMAL = {
    id: 802,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (STEM_SOLAR_LUNAR_STELLAR_RECORD = {
    id: 803,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `60`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_SOLAR_LUNAR_STELLAR_PURIFICATION = {
    id: 804,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_SOLAR_STANCE = {
    id: 805,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_LUNAR_STANCE = {
    id: 806,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_STELLAR_STANCE = {
    id: 807,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_UNIVERSAL_STANCE = {
    id: 808,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_BLAZE_KICK = {
    id: 809,
    type: Active ,
    range: [1,1,1,1,1,1,1],
    forcedElement: true,
    skillElement: ele_FIRE,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: true,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 150 + (50*SkillLV);
      }
    },
  }),
(STEM_NEW_MOON_KICK = {
    id: 810,
    type: Active /*TODO*/,
    range: [1,1,1,1,1,1,1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 600 + (100 * SkillLV);
      }
    },
  }),
(STEM_FLASH_KICK = {
    id: 811,
    type: Active /*TODO*/,
    range: [1,1,1,1,1,1,1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 100;
      }
    },
  }),
(STEM_NOVA_EXPLOSION = {
    id: 812,
    type: Active /*TODO*/,
    range: [1,1,1,1,1],
    forcedElement: true,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `5`,
    castDelay: `1`,
    cooldown: `20`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 200 + (100 * SkillLV);
      }
    },
  }),
(STEM_GRAVITY_CONTROL = {
  id: 813,
  type: Active,
  range: [1],
  forcedElement: false,
  skillElement: ele_NEUTRAL,
  fixedCastTime: `0`,
  variableCastTime: `2`,
  castDelay: `0.5`,
  cooldown: `20`,
  animation: `0`,
  isMagic: false,
  canCrit: false,
  accuracyCheck: true,
  bypassDef: false,
  hitAmount: `1`,
  hitDivisibility: `1`,
  isSpecialFormula: false,
  skillFormula(SkillLV) {
    /* Rathena Code : 
    case SJ_GRAVITYCONTROL: 
			int fall_damage = sstatus->batk + sstatus->rhw.atk - tstatus->def2;

			if (bl->type == BL_PC)// => player character
				fall_damage += dstsd->weight / 10 - tstatus->def;
			else // Monster's don't have weight. Put something in its place.
				fall_damage += 50 * status_get_lv(src) - tstatus->def;

			fall_damage = max(1, fall_damage);
    */
    switch (PATCH) {
      case 0:
      case 1:
      case 2:
      default:
        return 100 + (50 * n_B[en_LEVEL]);
    }
  },
}),
(STEM_SOLAR_EXPLOSION = {
    id: 814,
    type: Active,
    range: [1,1,1,1,1,1,1,1,1,1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `3`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return ((900 + (100 * SkillLV)) * (n_A_BaseLV/100)) + (5 * SkillSearch(skill_STEM_SOLAR_LUMINANCE));
      }
    },
  }),
(STEM_FULL_MOON_KICK = {
    id: 815,
    type: Active /*TODO*/,
    range: [1,1,1,1,1,1,1,1,1,1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `1`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return ((1100 + (100 * SkillLV)) * (n_A_BaseLV/100)) + (SkillSearch(skill_STEM_LUNAR_LUMINANCE) * 5);
      }
    },
  }),
(STEM_FALLING_STARS = {
    id: 816,
    type: Active,
    range: [1,1,1,1,1,1,1,1,1,1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `2`,
    variableCastTime: `1`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `3`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return ((100 + (100 * SkillLV)) * (n_A_BaseLV/100)) + (5 * SkillSearch(skill_STEM_STELLAR_LUMINANCE));
      }
    },
  }),
(STEM_STAR_EMPERORS_DESCENT = {
    id: 817,
    type: Active /*TODO*/,
    range: [1,1,1,1,1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `10`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 800 + (200 * SkillLV);
      }
    },
  }),
(STEM_SOLAR_LUMINANCE = {
    id: 818,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_LUNAR_LUMINANCE = {
    id: 819,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_STELLAR_LUMINANCE = {
    id: 820,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_STAR_CREATORS_BOOK = {
    id: 821,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `2`,
    castDelay: `0.5`,
    cooldown: `15`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
(STEM_BOOK_OF_DIMENSIONS = {
    id: 822,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `180 - (30 * n_A_ActiveSkillLV)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_SOUL_COLLECTION = {
    id: 823,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_SOUL_HARVEST = {
    id: 824,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `3`,
    castDelay: `0`,
    cooldown: `60 + (30 * n_A_ActiveSkillLV)`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_EVIL_SOUL_CURSE = {
    id: 825,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `1`,
    castDelay: `0.5`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_SOUL_ENERGY_RESEARCH = {
    id: 826,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_KAUTE = {
    id: 827,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `5`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_ESHA = {
    id: 828,
    type: Active /*TODO*/,
    range: [10,10,10,10,10],
    forcedElement: true,
    skillElement: eval(document.calcForm.A_Weapon_element.value),
    fixedCastTime: `1`,
    variableCastTime: `0.5`,
    castDelay: `0.5`,
    cooldown: `3`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 5 * SkillLV;
      }
    },
  }),
  (SRIP_CURSE_EXPLOSION = {
    id: 829,
    type: Active /*TODO*/,
    range: [10,10,10,10,10],
    forcedElement: true,
    skillElement: ele_DARK,
    fixedCastTime: `1`,
    variableCastTime: `3`,
    castDelay: `0.5`,
    cooldown: `1`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `7`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          if (formElements["SkillSubNum"].checked) 
            return (400 + (100 * SkillLV))+(1500 + (200 * SkillLV)); //[Base_Damage]% + [Bonus_Damage]%
          return 400 + (100 * SkillLV);//[Base_Damage]%
      }
    },
  }),
  (SRIP_SOUL_BIND = {
    id: 830,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `4`,
    variableCastTime: `0`,
    castDelay: `1`,
    cooldown: `30 * n_A_ActiveSkillLV`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_SOUL_CIRCULATION = {
    id: 831,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `3`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_ESPA = {
    id: 832,
    type: Active /*TODO*/,
    range: [10,10,10,10,10],
    forcedElement: true,
    skillElement: eval(document.calcForm.A_Weapon_element.value),
    fixedCastTime: `1`,
    variableCastTime: `0.5`,
    castDelay: `0`,
    cooldown: `0`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return (500 + (250 * SkillLV)) * (n_A_BaseLV/100);
      }
    },
  }),
  (SRIP_SHADOW_SOUL = {
    id: 833,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_FAIRY_SOUL = {
    id: 834,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_FALCON_SOUL = {
    id: 835,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_GOLEM_SOUL = {
    id: 836,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `0`,
    variableCastTime: `0`,
    castDelay: `0.5`,
    cooldown: `0`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_ESWOO = {
    id: 837,
    type: Active /*TODO*/,
    range: [10,10,10,10,10,10,10],
    forcedElement: true,
    skillElement: eval(document.calcForm.A_Weapon_element.value),
    fixedCastTime: `1`,
    variableCastTime: `0.5`,
    castDelay: `0.5`,
    cooldown: `2`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `5`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return (1100 + (200 * SkillLV)) * (n_A_BaseLV/100);
      }
    },
  }),
  (SRIP_SOUL_DIVISION = {
    id: 838,
    type: Passive /*TODO*/,
    range: [1],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1.5`,
    variableCastTime: `0.5`,
    castDelay: `0.5`,
    cooldown: `3`,
    animation: `0`,
    isMagic: false,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: false,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return 0;
      }
    },
  }),
  (SRIP_SOUL_EXPLOSION = {
    id: 839,
    type: Active /*TODO*/,
    range: [10,10,10,10,10],
    forcedElement: false,
    skillElement: ele_NEUTRAL,
    fixedCastTime: `1`,
    variableCastTime: `2`,
    castDelay: `0.5`,
    cooldown: `6`,
    animation: `0`,
    isMagic: true,
    canCrit: false,
    accuracyCheck: true,
    bypassDef: false,
    hitAmount: `1`,
    hitDivisibility: `1`,
    isSpecialFormula: true,
    skillFormula(SkillLV) {
      switch (PATCH) {
        case 0:
        case 1:
        case 2:
        default:
          return Math.floor(n_B[en_HP] * ((20 + (10 * SkillLV))/100)); // % of enemy's current HP
      }
    },
  }),
];
  //skill source for Star Emperor and Soul Reaper: 
  //http://renewal.playragnarok.com/news/updatedetail.aspx?id=342&p=1
  //Skill Update 
  //https://www.divine-pride.net/forum/index.php?/topic/4175-kro-expanded-classes-185-level-expansion-and-skills-balance/
function CalcSkillDamage() {
  let baseDmg = [0, 0, 0];

  if (Skill[n_A_ActiveSkill].isMagic) baseDmg = calcMAtk(0);
  else if (
    Skill[n_A_ActiveSkill].id == skill_MO_GUILLOTINE_FIST ||
    Skill[n_A_ActiveSkill].id == skill_MO_MAX_GUILLOTINE_FIST
  )
    baseDmg = getBaseDamageNoMastery(0);
  else baseDmg = getBaseDamage(0,false);
  if (n_Nitou || n_A_WeaponType == weapTyp_KATAR) {
    if (Skill[n_A_ActiveSkill].id == 0) {
      let baseDmg1 = getFinalDamage(
        baseDmg,
        Skill[n_A_ActiveSkill],
        n_A_ActiveSkillLV,
        0
      );
      let baseDmg2 = getFinalDamage(getBaseDamage(0,true),Skill[n_A_ActiveSkill],n_A_ActiveSkillLV,0,true);
      for (let i = 0; i <= 2; i++) {
        //damage can't go below 0
        if (baseDmg1[i] < 0) baseDmg1[i] = 1;
        if (baseDmg2[i] < 0) baseDmg2[i] = 1;
        //display auto attack with two weapons
        InnStr[i] = baseDmg1[i] + " + " + baseDmg2[i];
      }
    } else {
      displayDamage(
        getFinalDamage(baseDmg, Skill[n_A_ActiveSkill], n_A_ActiveSkillLV, 0),
        Skill[n_A_ActiveSkill]
      );
    }
    displayAdditionalDamage();
  } else {
    if (
      Skill[n_A_ActiveSkill].id == skill_MO_GUILLOTINE_FIST ||
      Skill[n_A_ActiveSkill].id == skill_MO_MAX_GUILLOTINE_FIST
    )
      displayDamage(
        getFinalDamage(
          getBaseDamageNoMastery(0),
          Skill[n_A_ActiveSkill],
          n_A_ActiveSkillLV,
          0
        ),
        Skill[n_A_ActiveSkill]
      );
    else
      displayDamage(
        getFinalDamage(baseDmg, Skill[n_A_ActiveSkill], n_A_ActiveSkillLV, 0),
        Skill[n_A_ActiveSkill]
      );
  }
  displayAdditionalDamage();
}

function displayDamage(finalDamage, sk) {
  let tmpDmg = 0;
  if (sk.id == skill_SUR_KNUCKLE_ARROW) {
    if (formElements["SkillSubNum"].checked)
      tmpDmg = getFinalDamage(
        getBaseDamage(0),
        SUR_KNUCKLE_ARROW,
        n_A_ActiveSkillLV+10,
        0
      );
  }
  for (let i = 0; i <= 2; i++) {
    //damage can't go below 0
    if (finalDamage[i] < 0) finalDamage[i] = 1;
    if (eval(sk.hitDivisibility) != 1) {
      InnStr[i] =
      numberFormat(finalDamage[i]) +
        " (" +
        numberFormat(finalDamage[i] / eval(sk.hitDivisibility)) +
        " x " +
        eval(sk.hitDivisibility) +
        ")";
    } else if (eval(sk.hitAmount) != 1) {
      InnStr[i] =
      numberFormat(finalDamage[i]) +
        " (" +
        numberFormat(finalDamage[i] / eval(sk.hitAmount)) +
        " x " +
        eval(sk.hitAmount) +
        ")";
    } else {
      if (sk.id == skill_SUR_KNUCKLE_ARROW) {
        if (formElements["SkillSubNum"].checked)
          InnStr[i] =
          numberFormat(finalDamage[i]) +
            "<BR>(" +
            numberFormat(finalDamage[i] - tmpDmg[i]) +
            " + " +
            numberFormat(tmpDmg[i]) +
            " Knockback damage)";
        else InnStr[i] = numberFormat(finalDamage[i]);
      } else InnStr[i] = numberFormat(finalDamage[i]);
      
    }
  }
}
function displayAdditionalDamage() {
  if (Skill[n_A_ActiveSkill].canCrit) {
    let str_Title = SubName[3][Language];//Critical Damage
    let str_Content = displaySubHits(n_A_ActiveSkill, n_A_ActiveSkillLV, 1);//Current Skill Damage (crit)

    //Double Attack || Snake Head || Sidewinder Card
    if (
      ((SkillSearch(skill_TH_DOUBLE_ATTACK) &&
        n_A_WeaponType == weapTyp_DAGGER) ||
        EquipNumSearch(1296) || //Snake Head
        EquipNumSearch(570) || //Chick Hat
        EquipNumSearch(399) || //Nagan
        EquipNumSearch(2235) || //Poison Forged Spear
        EquipNumSearch(2460) || //Magician's Night Cap
        CardNumSearch(43)) && //SideWinder
      n_A_ActiveSkill == skill_ALL_BASIC_ATTACK
    ) {
      str_Title += "<BR>Double Attack (CRIT)<BR>-";
      str_Content += displaySubHits(skill_TH_DOUBLE_ATTACK, SkillSearch(skill_TH_DOUBLE_ATTACK),1);
    }
    //Giant Growth
    if (
      SkillSearch(skill_RUN_GIANT_GROWTH) &&
      n_A_ActiveSkill == skill_ALL_BASIC_ATTACK
    ) {
      str_Title += "<BR>Giant Growth (CRIT)";
      str_Content += displaySubHits(skill_RUN_GIANT_GROWTH, SkillSearch(skill_RUN_GIANT_GROWTH), 1);
      if (
        (SkillSearch(skill_TH_DOUBLE_ATTACK) &&
          n_A_WeaponType == weapTyp_DAGGER) ||
        EquipNumSearch(1296) ||
        CardNumSearch(43)
      ) {
        str_Title += "<BR>Giant Growth + Double Attack (CRIT)<BR>-";
        str_Content += displaySubHitsGiantGrowth(skill_TH_DOUBLE_ATTACK, 1);
      }
    }

    myInnerHtml("CRIATKname", str_Title, 0);
    myInnerHtml("CRIATK", str_Content, 0);

    //Crit Rate
    myInnerHtml("CRInumname", SubName[4][Language], 0);
    //Show Crit Rate, Player Crit  - enemy Crit Shield
      //Crit rate - enemy's crit shield
      let critRate = n_A_CRI - (Max(n_B[en_LUK], 0) / 5);
      critRate = Min(critRate,100);
      critRate = Max(critRate,1);
    myInnerHtml(
      "CRInum","<span title=\"Player's crit rate : "+ n_A_CRI +", Enemy's crit shield: "+ (Max(n_B[en_LUK], 0) / 5) + "\">" + critRate + SubName[0][Language] + "*</span>",0);
  } else {
    myInnerHtml("CRIATKname", "", 0);
    myInnerHtml("CRIATK", "", 0);
    myInnerHtml("CRInumname", "", 0);
    myInnerHtml("CRInum", "", 0);
  }

  str_bSUBname = "";
  str_bSUB = "";
  //Double Attack
  if (
    SkillSearch(skill_TH_DOUBLE_ATTACK) &&
    n_A_WeaponType == weapTyp_DAGGER &&
    n_A_ActiveSkill == skill_ALL_BASIC_ATTACK
  ) {
    str_bSUBname += "Double Attack <BR>-<BR>";
    // str_bSUBname += "Double Attack (CRIT)<BR><BR>";
    str_bSUB += displaySubHits(skill_TH_DOUBLE_ATTACK, SkillSearch(skill_TH_DOUBLE_ATTACK), 0);
    // displaySubHits(skill_TH_DOUBLE_ATTACK,1);
  }
  //Raging Trifecta Blow
  if (
    SkillSearch(skill_MO_RAGING_TRIFECTA_BLOW) &&
    n_A_ActiveSkill == skill_ALL_BASIC_ATTACK
  ) {
    str_bSUBname += "Raging Trifecta Blow <BR>-<BR>";
    str_bSUB += displaySubHits(skill_MO_RAGING_TRIFECTA_BLOW, SkillSearch(skill_MO_RAGING_TRIFECTA_BLOW), 0);
  }
  //Auto Blitz Beat
  if (
    SkillSearch(skill_HU_BLITZ_BEAT) &&
    n_A_ActiveSkill == skill_ALL_BASIC_ATTACK
  ) {
    str_bSUBname += "Auto Blitz Beat <BR>";
    str_bSUB += displaySubHits(skill_HU_BLITZ_BEAT, SkillSearch(skill_HU_BLITZ_BEAT), 0);
  }
  //Auto Warg Strike
  if (
    SkillSearch(skill_RAN_WARG_STRIKE) &&
    n_A_ActiveSkill == skill_ALL_BASIC_ATTACK
  ) {
    str_bSUBname += "Auto Warg Strike <BR>";
    str_bSUB += displaySubHits(skill_RAN_WARG_STRIKE, SkillSearch(skill_RAN_WARG_STRIKE), 0);
  }
  //Giant Growth
  if (
    SkillSearch(skill_RUN_GIANT_GROWTH) &&
    n_A_ActiveSkill == skill_ALL_BASIC_ATTACK
  ) {
    str_bSUBname += "Giant Growth <BR>";
    str_bSUB += displaySubHits(skill_RUN_GIANT_GROWTH, SkillSearch(skill_RUN_GIANT_GROWTH), 0);
    if (
      (SkillSearch(skill_TH_DOUBLE_ATTACK) &&
        n_A_WeaponType == weapTyp_DAGGER) ||
      EquipNumSearch(1296) ||
      CardNumSearch(43)
    ) {
      str_bSUBname += "Giant Growth + Double Attack<BR>-<BR>";
      str_bSUB += displaySubHitsGiantGrowth(skill_TH_DOUBLE_ATTACK, 0);
    }
  }
  if (n_A_ActiveSkill != skill_ALL_BASIC_ATTACK) DisplayCastAndDelay();

  myInnerHtml("bSUBname", str_bSUBname, 0);
  myInnerHtml("bSUB", str_bSUB, 0);
}

function displaySubHits(autoSkill,autoSkillLv, isCrit) {
  let textStr = "";
  let numHits = 0;
  let tempDMG = getFinalDamage(getBaseDamage(isCrit),Skill[autoSkill],autoSkillLv,isCrit);
  let offHandTempDMG = [0,0,0]
  if((n_Nitou || n_A_WeaponType == weapTyp_KATAR) && (autoSkill == skill_ALL_BASIC_ATTACK))
  {
    if(n_Nitou)//off hand never crit exept for Katar
      offHandTempDMG = getFinalDamage(getBaseDamage(false,true),Skill[autoSkill],autoSkillLv,false,true);
    else
      offHandTempDMG = getFinalDamage(getBaseDamage(isCrit,true),Skill[autoSkill],autoSkillLv,isCrit,true);
  }
  if (eval(Skill[autoSkill].hitDivisibility) > 1)
    numHits = eval(Skill[autoSkill].hitDivisibility);
  if (eval(Skill[autoSkill].hitAmount) > 1)
    numHits = eval(Skill[autoSkill].hitAmount);
  if (numHits > 0) {
    if (tempDMG[0] === tempDMG[2])
      textStr +=
      numberFormat(tempDMG[1]) +
        "<BR>(" +
        numberFormat(tempDMG[1] / numHits) +
        " x " +
        numHits +
        " hits)<BR>";
    else
      textStr +=
      numberFormat(tempDMG[0]) +
        " ~ " +
        numberFormat(tempDMG[2]) +
        "<BR>(" +
        numberFormat(tempDMG[0] / numHits) +
        " ~ " +
        numberFormat(tempDMG[2] / numHits) +
        " x " +
        numHits +
        " hits)<BR>";
  } else {
    
    if (tempDMG[0] === tempDMG[2])
    //main hand crit + offhand damage if offhand crit (katar only)
    textStr += numberFormat(tempDMG[1]) + (((n_Nitou || n_A_WeaponType == weapTyp_KATAR) && (autoSkill == skill_ALL_BASIC_ATTACK))?(" + " + numberFormat(offHandTempDMG[1])):(""))+"<BR>";
    else textStr += numberFormat(tempDMG[0]) + " ~ " + numberFormat(tempDMG[2]) + "<BR>";
  }
  return textStr;
}

function displaySubHitsGiantGrowth(autoSkill, isCrit) {
  let textStr = "";
  let numHits = 0;
  let GIANT_GROWTH = RUN_GIANT_GROWTH.skillFormula2(1) / 100;
  let tempDMG = getFinalDamage(getBaseDamage(isCrit),Skill[autoSkill],SkillSearch(autoSkill),isCrit);
  tempDMG[0] *= GIANT_GROWTH;
  tempDMG[1] *= GIANT_GROWTH;
  tempDMG[2] *= GIANT_GROWTH;
  if (eval(Skill[autoSkill].hitDivisibility) > 1)
    numHits = eval(Skill[autoSkill].hitDivisibility);
  if (eval(Skill[autoSkill].hitAmount) > 1)
    numHits = eval(Skill[autoSkill].hitAmount);
  if (numHits > 0) {
    if (tempDMG[0] === tempDMG[2])
      textStr +=
      numberFormat(tempDMG[1]) +
        "<BR>(" +
        numberFormat(tempDMG[1] / numHits) +
        " x " +
        numHits +
        " hits)<BR>";
    else
      textStr +=
      numberFormat(tempDMG[0]) +
        " ~ " +
        numberFormat(tempDMG[2]) +
        "<BR>(" +
        numberFormat(tempDMG[0] / numHits) +
        " ~ " +
        numberFormat(tempDMG[2] / numHits) +
        " x " +
        numHits +
        " hits)<BR>";
  } else {
    if (tempDMG[0] === tempDMG[2]) textStr += numberFormat(tempDMG[1]) + "<BR>";
    else textStr += numberFormat(tempDMG[0]) + " ~ " + numberFormat(tempDMG[2]) + "<BR>";
  }
  return textStr;
}

function numberFormat(number)
{
    return (number - 0).toLocaleString('en-US')
}