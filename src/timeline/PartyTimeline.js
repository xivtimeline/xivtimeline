import React, { useRef, useEffect } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import './PartyTimeline.css';

import recast from './jobs/recast';
import time from './helpers/time';

import p3s from './fights/p3s';

const PartyTimeline = () => {
  // constants
  const min = 0; // 00:00
  const max = time(10, 50); // 10:50

  // categories
  const categories = {
    classes: {
      drk: {
        id: 'drk',
        treeLevel: 0,
        content: 'DRK',
        nestedGroups: [
          'darkMissionary',
          'reprisalDRK',
          'shadowWall',
          'darkMind',
          'rampartDRK',
          'livingDead',
        ],
      },

      war: {
        id: 'war',
        treeLevel: 0,
        content: 'WAR',
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
    },
    abilities: {
      drk: [
        {
          id: 'darkMissionary',
          treeLevel: 1,
          content: 'Dark Missionary',
        },
        {
          id: 'reprisalDRK',
          treeLevel: 1,
          content: 'Reprisal',
        },
        {
          id: 'shadowWall',
          treeLevel: 1,
          content: 'Shadow Wall',
        },
        {
          id: 'darkMind',
          treeLevel: 1,
          content: 'Dark Mind',
        },
        {
          id: 'rampartDRK',
          treeLevel: 1,
          content: 'Rampart',
        },
        {
          id: 'livingDead',
          treeLevel: 1,
          content: 'Living Dead',
        },
      ],

      war: [
        {
          id: 'shakeItOff',
          treeLevel: 1,
          content: 'Shake It Off',
        },
        {
          id: 'reprisalWAR',
          treeLevel: 1,
          content: 'Reprisal',
        },
        {
          id: 'vengeance',
          treeLevel: 1,
          content: 'Vengeance',
        },
        {
          id: 'thrillOfBattle',
          treeLevel: 1,
          content: 'Thrill of Battle',
        },
        {
          id: 'equilibrium',
          treeLevel: 1,
          content: 'Equilibrium',
        },
        {
          id: 'rampartWAR',
          treeLevel: 1,
          content: 'Rampart',
        },
        {
          id: 'holmgang',
          treeLevel: 1,
          content: 'Holmgang',
        },
      ],
    },
  };

  // groups
  const groups = new DataSet();
  groups.add(categories.classes.war);
  groups.add(categories.abilities.war);

  // items
  let items = new DataSet();
  if (localStorage.getItem('data')) {
    let data = JSON.parse(localStorage.getItem('data'));
    items.add(data);
  }

  // options
  let options = {
    showMajorLabels: false,
    showCurrentTime: false,
    format: {
      minorLabels: {
        second: 'mm:ss',
        minute: 'mm:ss',
      },
    },
    zoomMin: time(1, 0), // 01:00
    start: 0, // 00:00
    end: time(2, 0), // 02:00
    min: min, // 00:00
    max: max, // 10:48
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

    onAdd: function (item, callback) {
      item.className = item.group;
      item.content = '';
      item.end = item.start.getTime() + recast(item.group);

      callback(item);

      let data = items.get();
      localStorage.setItem('data', JSON.stringify(data));
    },

    onMoving: function (item, callback) {
      let overlapping = items.get({
        filter: function (testItem) {
          if (testItem.id === item.id) {
            return false;
          }
          return (
            item.start <= testItem.end &&
            item.end >= testItem.start &&
            item.group === testItem.group
          );
        },
      });

      if (overlapping.length === 0 && item.start >= min) {
        callback(item);
      }
    },

    onMove: function (item, callback) {
      callback(item);

      let data = items.get();
      localStorage.setItem('data', JSON.stringify(data));
    },

    onRemove: function (item, callback) {
      callback(item);

      let data = items.get();
      localStorage.setItem('data', JSON.stringify(data));
    },
  };

  // useRef, useEffect
  const container = useRef(null);
  useEffect(() => {
    const timeline =
      container.current &&
      new Timeline(container.current, items, groups, options);

    p3s(timeline);
  }, [container, items, groups]);

  // return timeline
  return <div ref={container} />;
};

export default PartyTimeline;
