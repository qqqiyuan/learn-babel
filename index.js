const babel = require('babel-core');
const types = require('babel-types');
const plugin = require('./plugins/load-by-demand.js')();
const visitor = plugin({types});

const code = `
  import { Select as MySelect, Alert } from 'antd';
  import * as UI from 'antd';
  import { Select as MyTestSelect, TestAlert } from 'antd-test';
  import * as TestUI from 'antd-test';
`;

const result = babel.transform(code, {
  plugins: [
    [
      visitor,
      {
        'libraryName': 'antd',
        'customSourceFunc': componentName => (`./node_modules/antd/lib/${componentName}/index.js`)
      }
    ]
  ],
});

console.log('--------transform code result--------');
console.log(result.code);
