/* @flow */

declare module 'redux-devtools' {
  declare function createDevTools(arg: any): any;
  declare function persistState(sessionId: ?string, deserializeState: Function): any;
}

declare module 'redux-devtools-log-monitor' {}

declare module 'redux-devtools-dock-monitor' {}
