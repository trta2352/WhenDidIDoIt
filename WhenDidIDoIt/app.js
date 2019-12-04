import {Provider, observer} from 'mobx-react';
import React from 'react';
import UserStore from './src/store/UserStore.js'
import Navigator from './src/navigators.js'

import RootStore from './src/store/RootStore.js'

const rootStore = new RootStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider 
        rootStore = {rootStore}
        userStore = {rootStore.userStore}
        taskStore = {rootStore.taskStore}
        >
        <Navigator/>
      </Provider>
    );
  }
}