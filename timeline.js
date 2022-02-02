// container
var container = document.getElementById('visualization');

// constants
const min = 0;            // 00:00
const max = time(10, 50); // 10:50

// categories
var categories = [
  {
    classes: [
      {
        id: 'drk',
        treeLevel: 0,
        content: "DRK",
        nestedGroups: [
          'darkMissionary',
          'reprisalDRK',
          'shadowWall',
          'darkMind',
          'rampartDRK',
          'livingDead',
        ],
      },
      {
        id: 'war',
        treeLevel: 0,
        content: "WAR",
        nestedGroups: [
          'shakeItOff',
          'reprisalWAR',
          'vengeance',
          'thrillOfBattle',
          'equilibrium',
          'rampartWAR',
          'holmgang',
        ],
      },
    ],
    abilities: [
      // drk abilities
      {
        id: 'darkMissionary',
        treeLevel: 1,
        content: "Dark Missionary",
      },
      {
        id: 'reprisalDRK',
        treeLevel: 1,
        content: "Reprisal",
      },
      {
        id: 'shadowWall',
        treeLevel: 1,
        content: "Shadow Wall",
      },
      {
        id: 'darkMind',
        treeLevel: 1,
        content: "Dark Mind",
      },
      {
        id: 'rampartDRK',
        treeLevel: 1,
        content: "Rampart",
      },
      {
        id: 'livingDead',
        treeLevel: 1,
        content: "Living Dead",
      },

      // war abilities
      {
        id: 'shakeItOff',
        treeLevel: 1,
        content: "Shake It Off",
      },
      {
        id: 'reprisalWAR',
        treeLevel: 1,
        content: "Reprisal",
      },
      {
        id: 'vengeance',
        treeLevel: 1,
        content: "Vengeance",
      },
      {
        id: 'thrillOfBattle',
        treeLevel: 1,
        content: "Thrill of Battle",
      },
      {
        id: 'equilibrium',
        treeLevel: 1,
        content: "Equilibrium",
      },
      {
        id: 'rampartWAR',
        treeLevel: 1,
        content: "Rampart",
      },
      {
        id: 'holmgang',
        treeLevel: 1,
        content: "Holmgang",
      },
    ],
  },
];

// groups
var groups = new vis.DataSet();
groups.add(categories[0].classes);
groups.add(categories[0].abilities);

// items
var items = new vis.DataSet();
if (localStorage.getItem('data')) {
  var data = JSON.parse(localStorage.getItem('data'));
  items.add(data);
}

// options
var options = {
  showMajorLabels: false,
  showCurrentTime: false,
  format: {
    minorLabels: {
      second: 'mm:ss',
      minute: 'mm:ss',
    }
  },
  zoomMin: time(1, 0), // 01:00
  start: 0,            // 00:00
  end: time(2, 0),     // 02:00
  min: min,            // 00:00
  max: max,            // 10:48
  groupHeightMode: 'fixed',
  snap: null,
  stack: false,
  itemsAlwaysDraggable: true,
  editable: {
    add: true,
    remove: true,
    updateGroup: false,
    updateTime: true,
    overrideItems: true,
  },

  onAdd: function(item, callback) {
    item.className = item.group;
    item.content = '';
    item.end = item.start.getTime() + recast(item.group);

    callback(item);

    var data = items.get();
    localStorage.setItem('data', JSON.stringify(data));
  },

  onMoving: function(item, callback) {
    var overlapping = items.get({
      filter: function (testItem) {
        if (testItem.id == item.id) {
          return false;
        }
        return ((item.start <= testItem.end)
                && (item.end >= testItem.start)
                && (item.group == testItem.group));
      }
    });

    if ((overlapping.length == 0)
        && (item.start >= min)) {
          callback(item);
    }
  },

  onMove: function(item, callback) {
    callback(item);

    var data = items.get();
    localStorage.setItem('data', JSON.stringify(data));
  },

  onRemove: function(item, callback) {
    callback(item);

    var data = items.get();
    localStorage.setItem('data', JSON.stringify(data));
  },
};

// render timeline
var timeline = new vis.Timeline(container, items, groups, options);

// mech markers - p3s
setMarker("Scorched Exaltation", time(0, 12), 0);
setMarker("Heat of Condemnation", time(0, 22), 1);
setMarker("Heat of Condemnation", time(1, 36), 2);
setMarker("Scorched Exaltation", time(1, 43), 3);
setMarker("Heat of Condemnation", time(2, 28), 4);
setMarker("Flare/Sparks of Condemnation", time(2, 53), 5);
setMarker("Sunbirds", time(3, 0), 6);
setMarker("Flames of Undeath/Revived Sunbirds", time(3, 27), 7);
setMarker("Flames of Undeath", time(4, 14), 8);
setMarker("Dead Rebirth", time(4, 35), 9);
setMarker("Heat of Condemnation", time(4, 50), 10);
setMarker("Ashplume", time(5, 42), 11);
setMarker("Scorched Exaltation", time(6, 31), 12);
setMarker("Scorched Exaltation", time(6, 38), 13);
setMarker("Heat of Condemnation", time(6, 49), 14);
setMarker("Firestorms of Asphodelos", time(7, 4), 15);
setMarker("Ashplume", time(7, 24), 16);
setMarker("Storms of Asphodelos", time(7, 47), 17);
setMarker("Ashplume", time(8, 17), 18);
setMarker("Scorched Exaltation", time(8, 23), 19);
setMarker("Life's Agonies", time(9, 8), 20);
setMarker("Ashplume", time(9, 29), 21);
setMarker("Flare/Sparks of Condemnation", time(9, 43), 22);
setMarker("Scorched Exaltation", time(10, 30), 23);
setMarker("Scorched Exaltation", time(10, 37), 24);

// function that returns ability's recast time
function recast(ability) {
  switch (ability) {
    case 'livingDead':
      return (time(0, 300));
    case 'holmgang':
      return (time(0, 240));
    case 'shadowWall':
    case 'vengeance':
      return (time(0, 120));
    case 'darkMissionary':
    case 'rampartDRK':
    case 'shakeItOff':
    case 'thrillOfBattle':
    case 'rampartWAR':
      return (time(0, 90));
    case 'reprisalDRK':
    case 'darkMind':
    case 'reprisalWAR':
    case 'equilibrium':
      return (time(0, 60));
    default:
      return (time(0, 0));
  }
}

// function to convert to time in milliseconds
function time(mins, secs) {
  return (mins * 60000 + secs * 1000);
}

// function to set mech markers
function setMarker(name, time, id) {
  timeline.addCustomTime(time, id);
  timeline.setCustomTimeMarker(name, id);
}