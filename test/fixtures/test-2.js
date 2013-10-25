// Lodash object as 'lodash'
lodash.compact([0, 1, false, 2, '', 3]);

lodash.difference([1, 2, 3, 4, 5], [5, 2, 10]);

lodash.findIndex(['apple', 'banana', 'beet'], function(food) {
  return /^b/.test(food);
});
