import setMarker from '../helpers/setMarker';
import time from '../helpers/time';

// set mech markers for p3s
const p3s = (timeline) => {
  // id tracker
  let id = 0;

  setMarker(timeline, 'Scorched Exaltation', time(0, 12), id++);
  setMarker(timeline, 'Heat of Condemnation', time(0, 22), id++);
  setMarker(timeline, 'Heat of Condemnation', time(1, 36), id++);
  setMarker(timeline, 'Scorched Exaltation', time(1, 43), id++);
  setMarker(timeline, 'Heat of Condemnation', time(2, 28), id++);
  setMarker(timeline, 'Flare/Sparks of Condemnation', time(2, 53), id++);
  setMarker(timeline, 'Sunbirds', time(3, 0), id++);
  setMarker(timeline, 'Flames of Undeath/Revived Sunbirds', time(3, 27), id++);
  setMarker(timeline, 'Flames of Undeath', time(4, 14), id++);
  setMarker(timeline, 'Dead Rebirth', time(4, 35), id++);
  setMarker(timeline, 'Heat of Condemnation', time(4, 50), id++);
  setMarker(timeline, 'Ashplume', time(5, 42), id++);
  setMarker(timeline, 'Scorched Exaltation', time(6, 31), id++);
  setMarker(timeline, 'Scorched Exaltation', time(6, 38), id++);
  setMarker(timeline, 'Heat of Condemnation', time(6, 49), id++);
  setMarker(timeline, 'Firestorms of Asphodelos', time(7, 4), id++);
  setMarker(timeline, 'Ashplume', time(7, 24), id++);
  setMarker(timeline, 'Storms of Asphodelos', time(7, 47), id++);
  setMarker(timeline, 'Ashplume', time(8, 17), id++);
  setMarker(timeline, 'Scorched Exaltation', time(8, 23), id++);
  setMarker(timeline, "Life's Agonies", time(9, 8), id++);
  setMarker(timeline, 'Ashplume', time(9, 29), id++);
  setMarker(timeline, 'Flare/Sparks of Condemnation', time(9, 43), id++);
  setMarker(timeline, 'Scorched Exaltation', time(10, 30), id++);
  setMarker(timeline, 'Scorched Exaltation', time(10, 37), id++);
};

export default p3s;
