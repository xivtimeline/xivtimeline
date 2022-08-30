// set mech markers
const setMarker = (timeline, name, time, id) => {
  timeline.addCustomTime(time, id);
  timeline.setCustomTimeMarker(name, id);
};

export default setMarker;
