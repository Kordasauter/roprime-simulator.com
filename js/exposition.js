{ // AdditionalInfoList (top-right) [KAKUTYOU_NAME]
EXTENDED_INFO_NAME = [
 [0,"-","-"]
,[1,"Сумма исцеления","Heal Amount"]
,[2,"Увеличенное восстановление HP","Increased HP Recovery"]
,[3,"Увеличенное восстановление SP","Increased SP Recovery"]
,[4,"Максимальный вес","Weight Limit"]
,[5,"Множители сопротивления элементов","Element Resistance Multipliers"]
,[6,"Расовое сопротивление","Race Resistance"]
,[7,"Сопротивление статуса","Status Resistance"]
,[8,"Другие сопротивления","Others Resistance"]
,[9,"В ролях и задержки","Cast and Delay"]
,[10,"Калькулятор опыта","Experience Calculator"]
];
}

{ // MonsterSortOptions [SORT_NAME]
SORT_NAME = [
 ["Алфавитный","Alphabetical"]
,["По элементу","By Element"]
,["По расы","By Race"]
,["Base Level","Base Level"]
,["Идеальный хит (100%)","Perfect (100%) HIT"]
,["95% побег","95% Flee"]
,["By Base Exp","By Base Exp"]
,["By Job Exp","By Job Exp"]
,["By Max Atk","By Max Atk"]
];
}

{ // Delay between actions List [ATKTIME_NAME]
ATKTIME_NAME = [
 [10,"0.1s (10 в секунду)","0.1s (10 per second)"]
,[15,"0.15s","0.15s"]
,[20,"0.2s (5 в секунду)","0.2s (5 per second)"]
,[25,"0.25s (4 в секунду)","0.25s (4 per second)"]
,[30,"0.4s","0.3s"]
,[33,"0.33s (3 в секунду)","0.33s (3 per second)"]
,[40,"0.4s","0.4s"]
,[50,"0.5s (2 в секунду)","0.5s (2 per second)"]
];
}

{ // CombatResultTexts [SubName]
SubName = [
 ["%","%"]
,["сек","sec"]
,["Повреждать","Damage"]
,["Критическое повреждение","Critical Damage"]
,["Критическая скорость","Critical Rate"]
,["Более 10000 просмотров","Over 10000 Hits"]
,["Слишком много, чтобы сосчитать","Too High to Calculate"]
,["неизмеримый","Immeasurable"]
,["X","X"]
,["Время каста","Cast Time"]
,["Выключенный","Off"]//10
,["На","On"]
];
}

{ // Global Labels [WordData]
WordData = [
 [" "," "]//0
,["Базовая статистика","Base Stats"]
,["Автоматическая настройка базового уровня","Auto Adjust Base Level"]
,["уровень","LV"]
,["Уровень работы","JobLV"]
,["Сорт","Class"]
,["Сила","STR"]
,["Ловкость","AGI"]
,["Живучесть","VIT"]
,["Интеллект","INT"]
,["Сноровка","DEX"] //10
,["Удача","LUK"]
,["Оставшиеся статусные баллы","Remaining Status Points"]
,["Расширенная информация","Extended Info"]
,["Макс. HP","Max HP"]
,["Макс. SP","Max SP"]
,["Защита","DEF"]
,["Маг. защита","MDEF"]
,["Точность","HIT"]
,["Уворот","FLEE"]
,["Идеальный уворот","Perfect Dodge"]//20
,["Критический","Critical"]
,["Маг. атака","MATK"]
,["Скорость атаки","ASPD"]
,["Скорость восстановления HP","HP Regen"]
,["Скорость восстановления SP","SP Regen"]
,["Зелье скорости: ","Speed Potion: "]
,["Тип оружия: ","Weapon Type: "]
,["Оружие и карты","Weapon & Cards"]
,["Оружие: ","Weapon: "]
,["Атрибут: ","Attribute: "]//30
,[0,0]
,["Броня и карты","Armor & Cards"]
,["Пассивные / Длительные умения","Passive / Duration Skills"]
,["Навыки поддержки/вечеринки","Supportive / Party Skills"]
,["Показывать ","Show "]//35
,["Навыки атаки: ","Attack Skills: "]
,["Монстр: ","Monster: "]
,["HP","HP"]
,["Базовый опыт","BaseExp"]
,["атака","ATK"]//40
,["&nbsp;~ ","&nbsp;~ "]
,["профессиональный опыт","JobExp"]
,["Защита","DEF"]
,["расы","Race"]
,["Маг. защита","MDEF"]
,["Элемент","Element"]
,["Идеальный хит","Perfect Hit"]
,["Размер","Size"]
,["95% бегут","95% Dodge"]
,["Ослабления монстров","Monster Debuffs"]//50
,["Ослабления","Debuffs"]
,["Результаты боя (альфа)","Combat Results (alpha)"]
,["Скорость попадания","Hit Ratio"]
,["Коэффициент уклонения","Dodge Ratio"]
,["Минимальный урон","Minimum Damage"]//55
,["Средний урон","Average Damage"]
,["Максимальный урон","Maximum Damage"]
,["Урон в секунду","Damage Per Second"]
,["Минимальное количество обращений","Minimum Number of Hits"]
,["Среднее количество обращений","Average Number of Hits"]//60
,["Максимальное количество обращений","Maximum Number of Hits"]
,["Средняя продолжительность боя","Average Battle Duration"]
,["Базовый опыт за удар","Base Exp Per Hit"]
,["Опыт работы за попадание","Job Exp Per Hit"]
,["Средний полученный урон","Average Damage Recieved"]
,["Средний получаемый урон (с уклонением)","Average Damage Recieved (w/dodge)"]
,["%","%"]
,["%","%"]
,["Музыкальные и танцевальные навыки","Music and Dance Skills"]
,["Выбор карты","Map selection"]//70
,["Гильдейские навыки","Guild Skills"]//
,["Этот столбец не соответствует сохранению.","This column doesn't correspond to save."]
,["Псалом битвы Последствия","Battle Chant Effects"]
,[0,]
,["Разные эффекты","Miscellaneous Effects"]
,[0,]
,["Минимальная задержка между активными навыками","Minimum Delay Between Active Skills"]
,["Усыновленный","Adopted"]
,["Статусные предметы (продукты/коробка)","Status Items (Foods/Box)"]
,["Данные предмета","Item Data"]//80
,["",""]//*gO(u
,["Усиления монстров","Monster Buffs"]
,["Усиления","Buffs"]
,["Имя сохранения данных","Save Data Name"]
,["Карта","Card"]//85
,["бутылка со смертельным ядом","bottle containing Deadly Poison"]
,["#EX","#EX"]
,["Заточки: ","Refine: "]
,["Левый: ","Left: "]
,["Верно: ","Right:"]//90 *gO(u
,["Топ-10 рейтинга","Top 10 Rank"]
,["Ярлыки карточек (слева)","Card Shortcuts (Left)"]
,["Безоружный (или со щитом)","Unarmed (or Shield)"]
,["Вес карты: ","Card Weight: "]
,["Количество обращений: ","Number of Hits: "]//95
,["Реакция на яд Уровень: ","Poison React Level: "]
,["Оставшееся SP: ","Remaining SP: "]
,["Оставшееся HP:","Remaining HP: "]
,["Количество обращений (среднее)","Number of Hits(Average): "]
,["Ячейка врагу: ","Cell to Enemy: "]//100
,["Адреналин","Adrenaline Rush"]
,["Духовные сферы","Spirit Spheres"]
,["Удар магмы бонус","Magnum Break Bonus"]
,["Алоэвера","Aloevera"]
,["<Font size=2>Дополнительные усиления найдены ниже</Font>","<Font size=2>Additional Buffs Found Below</Font>"]//105
,["Бард","Bard's "]
,["Танцовщица","Dancer's "]
,["Статистика контроллера:","Controller's Stats: "]
,["Статус добавляется подушно.","Status is added by capitation."]
,["  <B>[ Активный ]</B>","  <B>[ Active ]</B>"]//110
,["Боевой порядок","Battle Orders"]
,["Лидерство","Great Leadership"]
,["Боевые шрамы","Wounds of Glory"]
,["Хладнокровие","Soul of Cold"]
,["Острый глаз","Sharp Hawk Eyes"]//115
,["Вся статистика +20","All Stats+20"]
,["HP+100%","HP+100%"]
,["SP+100%","SP+100%"]
,["атака +100%","ATK+100%"]
,["Удар+50 и бегство+50","HIT+50 & FLEE+50"]//120
,["Урон уменьшен вдвое","Damage reducing by half"]
,["Бонус убийцы","Murderer Bonus"]
,["Себя ","Self "]
,["Кунжутное печенье","Sesame Pastry"]
,["Медовое печенье","Honey Pastry"]//125
,["Радужный торт","Rainbow Cake"]
,["Ящик гнева","Box of Resentment"]
,["Сонный ящик","Box of Drowsiness"]
,["Зелье Воды","Coldproof Potion"]
,["Зелье Земли","Earthproof Potion"]//130
,["Зелье Огня","Fireproof Potion"]
,["Зелье Ветра","Thunderproof Potion"]
,["Еда","Food"]
,["Магический свиток/Лист Иггдрасиля/И т. д","Magic Scroll/Yggdrasil Leaf/Etc"]
,["Вся статистика интернет-кафе+3","Internet Cafe's All Stats+3"]//135
,[" (Не нежить)"," (Non Undead)"]
,[" (Демон/Нежить)"," (Demon/Undead)"]
,["",""]
,["<BR>(3x атака, 2x Точность)","<BR>(3x Atk, 2x Hit)"]
,["<BR>(2x Уворот)","<BR>(2x Flee)"]//140
,["Требуемый Интеллект/Уровень для следующего бонуса: ","Required Int/Lv for next bonus: "]
,["Недоступно для этого класса","Not Available for this Class"]
,["Текущий базовый опыт","Current Base Exp"]
,["Текущий опыт работы","Current Job Exp"]
,["Восстановление","Regen"]//145
,["Максимальный вес","Weight Limit"]
,["Общий вес оборудования","Total Weight of Equipment"]
,["Статус минус сопротивление","Status minus Resistance"]
,["(Эта система находится в стадии тестирования)","(This system is in testing)"]
,["Босс Монстр","Boss Monster"]//150
,["Дальняя атака","Ranged Attack"]
,["Обычный монстр","Nomal Monster"]
,[" Сопротивление"," Resistance"]
,["Время каста","Cast Time"]
,["После задержки каста","After Cast Delay"]//155
,["Следующий базовый уровень","Next Base Level up: "]
,["Следующий уровень работы:","Next Job Level up: "]
,[" нуждаться "," need "]
,["",""]
,["Слот","Slot"]//160
,["Мин. уровень","Min Lv"]
,["Масса","Weight"]
,["Уровень оружия","Weapon Lv"]
,["Дополнительные усиления и ослабления","Additional Buffs & Debuffs"]
,["Сохранять","Save"]//165
,["Сохранить URL-адрес","Save URL"]
,["Рассчитать","Calculate"]
,["Удалить данные сохранения","Delete Save Data"]
,["Все характеристики","All Stats"]
,["Скорость атаки","ASPD"]//170
,["КРИТ","CRIT"]
,["УДАЧЛИВЫЙ","LUCKY"]
,[" Элементарное оружие"," Element Weapon"]
,["Полностью обходит защиту цели","Completely bypasses defence on the target"]
,["Полностью обходит защиту цели","Completely bypasses defence on the target"]//175
,["Сила атаки оружия увеличивается против врагов с высокой защитой.","Attack power of the weapon increases against enemies with high defence"]
,["Снижает вашу защиту до 1.","Reduces your defence to 1/"]
,["Урон дальнего боя","Ranged damage"]
,["Босс","Boss"]
,[" Монстры размера"," size monsters"]//180
,[" типа монстров"," type monsters"]
,["стихийные монстры"," element monsters"]
,["Повреждения на ","Damage on "]
,["Устойчивость к ","Resistance to "]
,[" типа монстров"," type monsters"]//185
,[" Атака элемента"," element attacks"]
,["Критическое повреждение","Critical Damage"]
,["После задержки каста","After cast delay"]
,["Сопротивление монстрам типа [Босс]","Resistance to [Boss] type monsters"]
,["Сопротивление дальним атакам","Resistance to ranged attacks"]//190
,["Сопротивление обычным монстрам","Resistance to normal monsters"]
,[0,0]
,[0,0]
,["Урон по Гоблин монстрам","Damage on goblin monsters"]
,["Урон по Кобольд монстрам","Damage on kobold monsters"]//195
,["Урон по Орк монстрам","Damage on orc monsters (with the exception of Orc Lord and Orc Hero)"]
,["Урон по Голем монстрам","Damage on golem monsters"]
,["Снижает ваш уровень защиты ","Lowers your defence rate "]
,["Увеличивает ваш шанс поразить все цели на фиксированную величину ","Increases your chance to hit all targets by a fixed "]
,["",""]//200
,["(Тип персонала)","(Staff Type)"]
,["[Критический] на ","[Crit] on "]
,[" типа монстров"," type monsters "]
,["Опыт от ","Experience from "]
,[" типа монстров "," type monsters "]//205
,["При атаке добавляет ","When attacking, adds a "]
,["% шанс нанести [","% chance to inflict ["]
,["] противнику","] on the enemy"]
,["Эффект статуса ","Status effect "]
,[" сопротивление +"," resistance +"]//210
,["Монстры размера от"," size monsters by "]
,["неперерабатываемый","Unrefinable"]
,["Невозможно сломать","Cannot be broken"]
,["Двуручный Посох","Two-Handed Staff."]
,["Броня становится ","Armor becomes "]//215
,[" элементом"," element"]
,["Позволяет использовать навык","Allows usage of the skill ["]
,[".","."]
,[" шанс применить навык ["," chance to cast the skill ["]
,[".","."]//220
,["%","%"]
,["есть ","there is a "]
,["] урон","] damage "]
,[" сокращение"," Reduction"]
,["Нет Пеко","No Peco"]//225
,["Мастерство ","Mastery "]
,["никто","None"]
,["Адреналин","Regular AR"]
,["Двойной адреналин","Full AR"]
,["Прокрутка","Scroll"]//230
,["Двойной ","Double "]
,["Тройной ","Triple "]
,["Четырехместный ","Quadruble "]
,["Буш дэ Ноэль","Buche de Noel"]
,["Клубничный торт","Rune Strawberry Cake"]//235
,["Шварцвальтский ананасовый коктейль","Schwartzwald Pine Jubilee"]
,["Десертный сэндвич из Арунафельца","Arunafeltz Desert Sandwich"]
,["Зелье проворства","ASPD Potions"]
,["бустер HP","Increase HP Potion"]
,["бустер SP","Increase SP Potion"]//240
,["Напиток воинов","Distilled Fighting Spirit"]
,["Дуриан","Durian"]
,["Обогащенный сок Селомайна","Celermine Juice"]
,["Конфета из гуараны","Guarana Candy"]
,["Удачный рисовый пирог","Lucky Rice Cake"]//245
,["Сухой паек №2","Military Ration B"]
,["Сухой паек №3","Military Ration C"]
,["Розовое зелье","Tasty Pink Ration"]
,["Желтое зелье","Tasty White Ration"]
,["Вита-500","Vitata500"]//250
,["Нет Дракона","No Dragon"]
,["Вес тележки","Cart Weight"]
,["VIP-баффы","VIP Buffs"]
,["Фиксированное время применения","Fixed Cast Time"]
,["Переменное время применения","Variable Cast Time"]//255
,["Задержка повторного использования навыков","Skill Reuse Delay"]
,["Урон с помощью ","Damage with "]
,["магия стихий"," element magic "]
,["Абразивная мазь","Abrasive"]
,["Священный свиток стихий","Holy Elemental Scroll"] //260
,["Свиток элементаля нежити","Undead Elemental Scroll"]
,["Благословение Тора","Blessing Of Tyr"]
,["Снадобье убийцы","Killer's Potion"]
,["Мана Плюс","Mana Plus"]
,["Свиток трансформации (Райдрик-лучник)","Raydric Archer Trans. Scroll"]//265
,["Свиток трансформации (Мардук)","Marduk Tranformation Scroll"]
,["Зелье архимагии","Archmage Potion"]
,["Урон по скараб монстрам","Damage on Scaraba monsters"]
,["Помадки парагона","Superhuman Sweets"]
,["Зелье разума","Mind Potion"]//270
,["Урон по Порт Малайя монстрам (пока не реализовано)","Damage on Port Malaya monsters (not implemented yet)"]
,["Бисквиты силы","Str Biscuit Stick"]
,["Увеличивает магический урон до ","Increases magic damage to "]
,["Увеличивает ","Increases "]
,["Нормальный","Normal"]//275
,["Зеленая аура","Green Aura"]
,["Тип монстра","Monster Type"]
// ,["","xxx"]
];
}

{ // AutoCastTrigger [AUTOSPELL_NAME]
AUTOSPELL_NAME = [
 [0,0]
,["При выполнении физической атаки ","When performing a physical attack, "]//1
,["При выполнении физической атаки на близком расстоянии ","When performing a short range physical attack, "]//2
,["При выполнении физической атаки на дальнюю дистанцию ​​","When performing a long range physical attack, "]//3
,["При выполнении магической атаки ","When performing a magical attack, "]//4
,["При атаке ","When attacking, "]//5
,["При получении физического урона ","When recieving physical damage, "]//6
,["При получении физического урона на близком расстоянии ","When recieving short range physical damage, "]//7
,["При получении физического урона на дальней дистанции ","When recieving long range physical damage, "]//8
,["При получении магического урона ","When recieving magical damage, "]//9
,["При получении физического или магического урона ","When recieving physical or magical damage, "]//10
];
}

{ // Autospell SuccessLabels [AUTOSPELL_NAME]
AUTOSPELL_NAME2 = [
 ["низкий","low"]
,["зафиксированный","fixed"]
,["высокий","high"]
];
}
