/* @flow */

import type {Action, Store} from '../src/typedef';

declare function Reducer<T>(state: T, action: Action): T;

declare module 'redux' {
  declare function createStore(reducer: Reducer): Store;
  declare function compose(...reducers: Array<Reducer>): Reducer;
}
