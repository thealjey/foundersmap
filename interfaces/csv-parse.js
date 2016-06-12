/* @flow */

type CSVCallback = (error: ?Error, output: Array<any>) => void;

declare module 'csv-parse' {
  declare function exports(value: string, options: Object, callback: CSVCallback): void;
}
