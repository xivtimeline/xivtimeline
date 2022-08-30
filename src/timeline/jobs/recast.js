import time from '../helpers/time';

// return ability's recast time
const recast = (ability) => {
  switch (ability) {
    // drk - TODO

    // war
    case 'livingDead':
      return time(0, 300);
    case 'holmgang':
      return time(0, 240);
    case 'shadowWall':
    case 'vengeance':
      return time(0, 120);
    case 'darkMissionary':
    case 'rampartDRK':
    case 'shakeItOff':
    case 'thrillOfBattle':
    case 'rampartWAR':
      return time(0, 90);
    case 'reprisalDRK':
    case 'darkMind':
    case 'reprisalWAR':
    case 'equilibrium':
      return time(0, 60);
    default:
      return time(0, 0);
  }
};

export default recast;
