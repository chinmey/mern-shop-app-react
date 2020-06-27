import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "./components/AppNavbar"
import List from "./components/List"
import ItemModal from "./components/ItemModal"
import { Provider } from 'react-redux';
import store from './store'
import {loadUser} from './actions/authAction'



const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        
          <ItemModal />
          <List />
        
      </div>
    </Provider>
  );
};

export default App;