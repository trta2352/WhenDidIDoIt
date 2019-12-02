import {Provider, observer} from 'mobx-react';
import React from 'react';
import UserStore from './src/store/UserStore.js'
import Navigator from './src/navigators.js'


export default class App extends React.Component {
  render() {
    return (
      <Provider UserStore={UserStore}>
        <Navigator/>
      </Provider>
    );
  }
}