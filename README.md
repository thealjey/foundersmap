# Founder's Map

Developed using [WebCompiler](https://thealjey.github.io/webcompiler/).

In order to complete the task on time I had to cut down on everything not directly related to rapid prototyping:

* tests
* documentation
* CI
* automatic changelog generation and release automation
* production builds
* a production server with server-side rendering
* etc.

### Included

* a fully functioning application
* responsive, optimized for a variety of screen sizes
* linted with [ESLint](http://eslint.org/)
* typechecked with [Flow](https://flowtype.org)
* a development server with hot updates (LiveReload is only used for CSS, everything else is hot updated without the need for a page refresh)
* [Immutable](https://facebook.github.io/immutable-js/) data
* single store [Redux](http://redux.js.org) architecture
* [Redux DevTools](https://github.com/gaearon/redux-devtools) with undo/redo functionality (can be hidden/shown with `Ctrl+H` and moved to a different side of the window with `Ctrl+Q`)

### Prerequisites

* [Git](https://git-scm.com/)
* [Ruby](https://www.ruby-lang.org/en/)
* [Node.js](https://nodejs.org/en/)
* [Facebook Flow](http://flowtype.org/)
* [SCSS-Lint](https://github.com/brigade/scss-lint)
* [Watchman](https://facebook.github.io/watchman/)

### Instructions

1. clone the project onto your computer with `git clone https://github.com/thealjey/foundersmap.git`
2. enter the new directory with `cd foundersmap`
3. run the app with `npm run dev-server`, wait until it is fully initialized (you should see a green colored text that says `1. Compiled <path to your local>foundersmap/src/components/_index.scss`)
4. in your browser visit the following url:
  * `http://localhost:3000/`
  * or `http://localhost:3000/?debug_session=anything` (state persisted in localStorage, try doing something and then refreshing the page. Cool, right :))

### Notes

* any arbitrary CSV text is supported
* columns can be sorted by clicking on their respective header cell
* in order to see markers on the map you have to select a value in all three dropdowns - Marker label, Latitude (values must be numeric) and Longitude (values must be numeric)
* if the developer panel is in the way, you can hide it with `Ctrl+H`
