# lineup-builder
Constructs a baseball lineup based on players, positions, and user-defined rules.

## Usage

Build the code (ES2015 to Node.js via Babel) and run 

```
npm run build && node dist/main/index.js
```

Will print out something like

```
┌──────────┬────┬────┬────┬────┬────┬────┐
│ Player   │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Kingston │ P  │ 2B │ ●  │ ●  │ ●  │ LF │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Oliver   │ LF │ LF │ ●  │ C  │ 3B │ ●  │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Cadeo    │ ●  │ ●  │ 1B │ P  │ CF │ RF │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Dalen    │ RF │ C  │ RF │ 1B │ C  │ ●  │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Quincy   │ CF │ ●  │ SS │ RF │ ●  │ P  │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Micah    │ 3B │ RF │ LF │ 2B │ ●  │ ●  │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Griffin  │ ●  │ 1B │ 2B │ CF │ RF │ SS │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Mateo    │ 1B │ CF │ ●  │ 3B │ SS │ 1B │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Vincent  │ C  │ SS │ C  │ ●  │ 1B │ CF │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Harper   │ ●  │ 3B │ ●  │ SS │ LF │ ●  │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Jonathan │ ●  │ CF │ 3B │ LF │ CF │ 3B │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Naim     │ SS │ ●  │ CF │ CF │ 2B │ CF │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Joseph   │ CF │ ●  │ P  │ ●  │ ●  │ 2B │
├──────────┼────┼────┼────┼────┼────┼────┤
│ Devin    │ 2B │ P  │ CF │ ●  │ P  │ C  │
└──────────┴────┴────┴────┴────┴────┴────┘
```

## Requirements 

* Node.js >=6.0.0 and npm >=3.0.0
* Bash, to build and clean up
