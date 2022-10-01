import time from '../helpers/time';

// return ability's recast time
const recast = (ability) => {
  switch (ability) {
    // drk - TODO
    case 'livingDead':
      return time(0, 300);
    case 'shadowWall':
      return time(0, 120);
    case 'darkMissionary':
    case 'rampartDRK':
      return time(0, 90);
    case 'reprisalDRK':
    case 'darkMind':
      return time(0, 60);

    // war
    case 'holmgang':
      return time(0, 240);
    case 'vengeance':
      return time(0, 120);
    case 'shakeItOff':
    case 'thrillOfBattle':
    case 'rampartWAR':
      return time(0, 90);
    case 'reprisalWAR':
    case 'equilibrium':
      return time(0, 60);

    default:
      return time(0, 0);
  }
};

export default recast;
