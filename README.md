# React Redux Realtime Chatting App 🗣

## 1. User Flow
  1. A user can login once the user registers a new account
  2. Once the user is logged-in, the user can create a new chat room or, can be also invited from other users. In the left side panel, only authorized chatting rooms will be displayed
  3. A user can modify the member list of the chatting room by clicking +👤icon and opening a user invitation modal
  4. In the chatting room, the user can send a text or image message

<image src="./src/images/record.gif" width="750px" />

## 2. Development
### Tech stack:
+ [npm](https://www.npmjs.com/) for package management
+ [ES6](https://github.com/lukehoban/es6features) via [babel](https://babeljs.io/) as programming language
+ [react](https://facebook.github.io/react), [react-redux](https://react-redux.js.org/), and [redux-thunk](https://github.com/reduxjs/redux-thunk) as core stack
+ [firebase](https://firebase.google.com/) as backend Auth Service / Realtime Database / Storage  / Deployment management
+ [styled-components](https://www.styled-components.com/) for React component styling
+ [semantic-ui](https://react.semantic-ui.com/) for building-up wireframe + overall interface
+ [jest](https://facebook.github.io/jest) for unit tests
+ [enzyme](https://github.com/airbnb/enzyme) for testing React components

### To run dev mode locally:
```bash
  $ git clone https://github.com/AhyoungRyu/react-redux-realtime-chatting-app.git
  $ cd react-redux-realtime-chatting-app
  $ npm install
  # After successfull pkg installtion
  $ npm start
```
Now, it will automatically open http://localhost:3000 and show you the login / register page. Or visit the demo website https://react-realtime-chatting-app.firebaseapp.com/ for overall functionality test

### To run unit test:
```bash
  $ npm test
```
It will find all files that end on `*.spec.js` under `__tests__` dir and run them
