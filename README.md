# [Reaux](https://www.vocowone.com/) &middot;

[![Build Status](https://travis-ci.com/vocoWone/reaux.svg?branch=master)](https://travis-ci.com/vocoWone/reaux)
[![npm version](https://img.shields.io/npm/v/reaux.svg?style=flat)](https://www.npmjs.com/package/reaux)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/vocoWone/reaux.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/vocoWone/reaux/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/vocoWone/reaux.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/vocoWone/reaux/alerts/)

Front-End lightweight framework base on react + redux + axios, strict in TypeScript.

## Motivation

- **Learn Once, Write Anywhere:** Base on react and redux, no mutation.
- **Multi-End isomorphism:** Unifies the application of `Model/View/Action`.
- **High Readability:** Clear code structure, easier for development and maintenance.

## Feature

- The whole project split into some modules.
- Each module contain 1 view, 1 state and some actions.
- Each module implement its own lifecycle actions. e.g: onReady/onLoad etc.
- No matter sync or async, each action handler wrapped by promise or generator.
- Global error handler.
- Built-in helper.

## Core API

- start
  - The whole project entrance.
- register
  - Register a module.
- Model
  - Proxy state and action.

## Ecosystem

| Project          | Status | Description                                    |
| ---------------- | ------ | ---------------------------------------------- |
| **reaux**        |        | Flux architecture based on React and Redux     |
| **reaux-dom**    |        | Base on reaux and react-dom applied to website |
| **reaux-native** |        | Base on reaux and react-native applied to app  |

## Installation

- Base on react-dom project: `yarn add reaux-dom --save or npm install reaux-dom --save`
- Base on react-native project:`yarn add reaux-native --save or npm install reaux-native --save`

## Documentation

See detail [on the website](http://www.vocowone.com/note/5d0a0885e0bc093273281464).

## TODO

- SSR
- User behavior tracking
- Integrate H5, mini-app, electron
