# Timer for Pomodoro Technique, 2023

Built using Vue.js 3.2.47, Vite 4, Bootstrap 4 (cdn)

<p align="center">
  <a href="https://pomodoro.ivan-lim.com" target="_blank">
    <img src="https://raw.githubusercontent.com/ijklim/pomodoro-2023/main/public/screenshot-990.webp" width="990px">
    <br>
    Live Demo
  </a>
</p>

## Vue 2 to Vue 3 Upgrade Notes

* `index.html` must be in the root folder, used to be in the `/public` folder

* Different launch instructions in `/src/main.js`

* Babel not required, requires Vite config file `/vite.config.js`

* Example of using `<script setup>`: `/src/App.vue`

  * Note: Composable variables and computed fields will be automatically exported via `const` declaration

  * Note: Composable functions won't be automatically exported, destructuring required

* Example of using setup Options API: `/src/components/TimerLog.vue`

## Technologies/Modules used

* Vue.js
* Vue Router
* Bootstrap (css only)

## Features

* 25 minutes Pomodoro interval
* 5 minutes Short Break interval
* 20 minutes Long Break interval
* Different timer text color during break time
* Toggle Sound
* Toggle Autostart Next Interval
* Intervals completed log
* Responsive

## Query string configurations

Function | Parameter | Default | Setting
-------- | --------- | ------- | -------
Whether to start next interval when the current one is completed | autonext | off | on/off
Start timer immediately | autostart | off | on/off
Play sound when the current interval is completed | sound | on | on/off

Example: https://pomodoro.ivan-lim.com?autonext=on&autostart=on&sound=off


## Usage Tip

To open this app in a small window on a desktop machine, type the following into the browser address bar or create a bookmark:
**javascript:window.open('https://pomodoro.ivan-lim.com', 'pomodoro', 'height=350,width=400')**

Note #1: Sometimes browser will skip the front **javascript:** during paste, type this in manually if necessary.

Note #2: Some browsers might not support all the features if invoked this way. For example Microsoft Edge does not support window sizing.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Adding VueAds submodule

```sh
# The destination folder (e.g. src/components/VueAds) must NOT exist before running the command
git submodule add https://github.com/ijklim/vue-ads.git src/components/VueAds
```
