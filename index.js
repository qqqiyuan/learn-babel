const babel = require('babel-core');
const types = require('babel-types');
const plugin = require('./plugins/load-by-demand.js')();
const visitor = plugin({types});

const code = `
  import { Select as MySelect, Pagination } from 'antd';
`;

const result = babel.transform(code, {
  plugins: [
    [
      visitor,
      {
        'customSourceFunc': componentName => (`./node_modules/antd/lib/${componentName}`)
      }
    ]
  ],
});

console.log('transform code result:');
console.log(result.code);
// import MySelect from './node_modules/antd/lib/Select';
// import Pagination from './node_modules/antd/lib/Pagination';
