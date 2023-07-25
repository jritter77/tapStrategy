const UnitClasses = {};

UnitClasses.Warrior = {
  // STATS
  health: 10,
  power: 4,
  mobility: 4,
  speed: 10,
  range: 1,

  // ABILITIES
  passive: null,
  active: (unit, target) => {
    target.hp -= 6;
    return target;
  },
};

UnitClasses.Mage = {
  // STATS
  health: 6,
  power: 2,
  mobility: 3,
  speed: 8,
  range: 3,

  // ABILITIES
  passive: null,
  active: null,
};

export default UnitClasses;
