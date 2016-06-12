/* @flow */

import {DevServer} from 'webcompiler';
import {join} from 'path';

const rootDir = join(__dirname, '..'),
  devDir = join(rootDir, 'development'),
  server = new DevServer(join(devDir, 'script.js'), join(rootDir, 'src', 'components', '_index.scss'), devDir);

server.run(rootDir);
