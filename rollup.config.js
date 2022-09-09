// import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import styles from 'rollup-plugin-styles';
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import packageJSON from './package.json';
const getPath = _path => path.resolve(__dirname, _path);
const esExtelrnals = [...Object.keys(packageJSON.dependencies || [])];
// 基础配置
const commonConf = {
  input: getPath('./src/index.ts'),
  plugins: [
    nodeResolve(),
    json(),
    svelte({
      preprocess: sveltePreprocess({})
    }),
    styles(),
    esbuild({
      tsconfig: path.resolve(path.resolve(__dirname), 'tsconfig.json')
    })
  ]
};

// 需要导出的模块类型
const outputMap = [
  {
    file: packageJSON.main, // 通用模块
    format: 'umd',
    name: packageJSON.name,
  },
  {
    file: packageJSON.module, // es 模块
    format: 'es',
    name: packageJSON.name,
  }
];

const buildConf = options => {
  if (options.output.format === 'umd') {
    commonConf.external = [];
  } else {
    commonConf.external = esExtelrnals;
  }

  return Object.assign({}, commonConf, options);
};

export default outputMap.map(output => buildConf({ output: { name: packageJSON.name, ...output } }));