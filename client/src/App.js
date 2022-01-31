// Vendor imports
import React, { Component } from 'react';
import { Provider } from 'react-redux';

// Developer imports
import AppNavBar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import store from './store'
import { loadUser } from './actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    store.dispatch( loadUser() );
  }

  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <AppNavBar />
          <ItemModal />
          <ShoppingList />
        </div>
      </Provider>
    );
  }
}

export default App;
