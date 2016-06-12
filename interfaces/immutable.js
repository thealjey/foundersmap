/* @flow */

declare module 'immutable' {
  declare class Map {
    set(key: string, value: any): Map;
    get(key: string, defaultValue: ?any): any;
    updateIn(path: Array<string>, notSetValue: any, updater: (value: any) => any): Map;
    updateIn(path: Array<string>, updater: (value: any) => any): Map;
    withMutations(mutator: (mutable: Map) => any): Map;
  }

  declare class List {
    size: number;
    first(): any;
    push(value: any): List;
    map(callback: (value: any, key: number) => any): List;
    slice(begin?: number, end?: number): List;
    sort(comparator?: (valueA: any, valueB: any) => number): List;
  }

  declare function fromJS(value: any): Map|List;
}
