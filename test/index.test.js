/* eslint max-len: "off" */
import { test } from 'tape';
import { transform } from 'babel-core';
import plugin from '../src';

function clean([code]) {
  return code.replace(/\n\s*/g, '');
}

function run(code) {
  return clean([transform(code, {
    plugins: [plugin],
  }).code]);
}

test('it should inject when ngInject directive is present', (t) => {
  const input = clean`angular.module('MyMod').controller('MyCtrl', function ($scope, $timeout) {
    'ngInject';
  });`;
  const output = run(input);
  const expected = clean`angular.module('MyMod').controller('MyCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
  }]);`;
  t.equal(output, expected);
  t.end();
});

test('it should work for arrow functions', (t) => {
  const input = clean`angular.module('MyMod').controller('MyCtrl', ($scope, $timeout) => {
    'ngInject';
  })`;
  const output = run(input);
  const expected = clean`angular.module('MyMod').controller('MyCtrl', ['$scope', '$timeout', ($scope, $timeout) => {}]);`;
  t.equal(output, expected);
  t.end();
});

test('it should leave everything alone when ngInject directive is not present', (t) => {
  const input = clean`angular.module('MyMod').controller('MyCtrl', function ($scope, $timeout) {
  });`;
  const output = run(input);
  t.equal(output, input);
  t.end();
});
