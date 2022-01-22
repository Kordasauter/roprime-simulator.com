{ // PetEffects (PetOBJ)
PET_OBJ = [
 [ 0,"No Pet",0,0]
,[ 1,"Alice (MDEF+1, Demi-Human Resistance+1%)",0,19,1,57,1,0]
,[ 2,"Baphomet Jr. (DEF+1,MDEF+1,Stun Resistance-1%)",0,18,1,19,1,151,-1,0]
,[ 3,"Bongun (VIT+1,Stun Resistance+1%)",0,bon_VIT,1,151,1,0]
,[ 4,"Chonchon (AGI+1,FLEE+2)",0,2,1,9,2,0]
,[ 5,"Christmas Goblin (MHP+30,Frozen Resistance+5%)",0,13,30,152,5,0]
,[ 6,"Desert Wolf (Baby) (INT+1,MSP+20)",0,4,1,14,20,0]
,[ 7,"Deviruchi (ATK+1%,MATK+1%,MHP-3%,MSP-3%)",0,80,1,89,1,15,-3,16,-3,0]
,[ 8,"Dokkebi (MATK+1%,ATK-1%)",0,89,1,80,-1,0]
,[ 9,"Drops (HIT+3,ATK+3)",0,8,3,17,3,0]
,[10,"Dullahan (Critical Damage+5%)",0,70,5,0]
,[11,"Evil Nymph (MSP+30,SP Recovery+5%)",0,14,30,76,5,0]
,[12,"Goblin Rider (Physical Damage on Demi-Human Race+3%)",0,37,3,0]
,[13,"Golem (MHP+100,FLEE-5)",0,13,100,9,-5,0]
,[14,"Green-Maiden (DEF+1,Demi-Human Resistance+1%)",0,18,1,57,1,0]
,[15,"Hunter Fly (Perfect Dodge+2,FLEE-5)",0,11,2,9,-5,0]
,[16,"Incubus (MSP+5%)",0,16,5,0]
,[17,"Imp (Fire Resistance+2%, Physical Damage+1% on Tuesdays?)",0,63,2,43,1,0]
,[18,"Isis (ATK+1%,MATK-1%)",0,80,1,89,-1,0]
,[19,"Leaf Cat (Brute Resistance+3%)",0,52,3,0]
,[20,"Loli Ruri (MHP+3%,Chance to cast Heal Lv. 1 when receiving Physical Damage)","When receiving Physical Damage, has a certain chance to use Heal Lv.1",15,3,0]
,[21,"Lunatic (CRI+2,ATK+2)",0,10,2,17,2,0]
,[22,"Mao Guai (MSP+10)",0,14,10,0]
,[23,"Marionette (SP Recovery+3%)",0,76,3,0]
,[24,"Medusa (VIT+1,Petrification Resistance+5%)",0,3,1,159,5,0]
,[25,"Miyabi Doll (INT+1,Cast Time-3%)",0,4,1,73,-3,0]
,[26,"Munak (INT+1,DEF+1)",0,4,1,18,1,0]
,[27,"Nightmare Terror (Sleep Resistance+100%)",0,155,100,0]
,[28,"Orc Warrior (ATK+10,DEF-3)",0,17,10,18,-3,0]
,[29,"Pecopeco (MHP+150,MSP-10)",0,13,150,14,-10,0]
,[30,"Petite (ASPD+1%,DEF-2,MDEF-2)",0,12,1,18,-2,19,-2,0]
,[31,"Picky (STR+1,ATK+5)",0,1,1,17,5,0]
,[32,"Poison Spore(STR+1,INT+1)",0,1,1,4,1,0]
,[33,"Poporing (LUK+2,Poison Resistance+10%)",0,6,2,150,10,0]
,[34,"Poring (LUK+2,CRI+1)",0,6,2,10,1,0]
,[35,"Rice Cake (Neutral Resistance+1%,MHP-1%)",0,50,1,15,-1,0]
,[36,"Rocker (HP Recovery+5%,MHP+25)",0,75,5,13,25,0]
,[37,"Savage Babe (VIT+1,MHP+50)",0,3,1,13,50,0]
,[38,"Shinobi (AGI+2)",0,2,2,0]
,[39,"Smokie (AGI+1,Perfect Dodge+1)",0,2,1,11,1,0]
,[40,"Sohee (STR+1,DEX+1)",0,1,1,5,1,0]
,[41,"Spore (HIT+5,ATK-2)",0,8,5,17,-2,0]
,[42,"Steel Chonchon (FLEE+6,AGI-1)",0,9,6,2,-1,0]
,[43,"Stone Shooter (Fire Resistance+3%)",0,63,3,0]
,[44,"Succubus (Constant chance [2%] to absorb 5% of Damage dealt?)","2% Chance to absorb 5% of Physical Damage dealt",0]
,[45,"Whisper (FLEE+7,DEF-3)",0,9,7,18,-3,0]
,[46,"Yoyo (CRI+3,LUK-1)",0,10,3,6,-1,0]
,[47,"Zealotus (Physical/Magical Damage on Demi-Human Race+2%)",0,37,2,177,2,0]
];
}
//,[id,"pet_name (description)",0,bonus_type,level_of_bonus(,bonus2,level2,etc..),0]
/*
bonus_type
// base stat
1 STR
2 AGI
3 VIT
4 INT
5 DEX
6 LUK
7 ALLSTAT
//substat
8 HIT
9 FLEE
10 CRIT_ADD
11 Perfect FLEE
12 ASPD_PERCENT
13 MHP_ADD
14 MSP_ADD
15 MHP_PERCENT
16 MSP_PERCENT
17 ATK_ADD
18 DEF
19 MDEF

//
20-29 ??

//add damage % race
30 Formless
31 Undead
32 Brute
33 Plant
34 Insect
35 Fish
36 Demon
37 Demi-Human Damage (Physical)
38 Angel
39 Dragon

//add damage % element
40 neutral
41 water
42 earth
43 Physical Damage+1% fire monsters
44 wind
45 poison
46 holy
47 shadow
48 ghost
49 undead

//race resistance
50 Formless Resistance
51 Undead
52 Brute Resistance
53 Plant
54 Insect
55 Fish
56 Demon
57 Demi-Human Resistance
58 Angel
59 Dragon

//elemental resistance
60 Neutral
61 Water
62 Earth
63 FIRE Resistance
64 Wind
65 Poison
66 Holy
67 Shadow
68 Ghost
69 Undead

//
70 CRIT_DAMAGE

73 Cast Time PERCENT

75 HP_RECOVERY
76 SP_RECOVERY

80 ATK_PERCENT

89 MATK_PERCENT

//status resistance
150 Poison Resistance
151 Stun Resistance
152 Frozen Resistance
153 Curse
154 Blind
155 Sleep Resistance
156 Silence
157 Chaos
158 Bleeding
159 Stone/Petrification Resistance

//magical attack on race
170 Formless
171 Undead
172 Brute
173 Plant
174 Insect
175 Fish
176 Demon
177 Demi-Human Damage (Magical)
178 Angel
179 Dragon

*/
