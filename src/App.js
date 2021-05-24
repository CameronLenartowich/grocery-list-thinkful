import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import ItemList from './components/ItemList';
import User from './components/Users';
import './style/app.css'

  // Set the configuration for your app
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUKCET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentRoom: '',
      currentRoomKey: '',
      user: ''
    }
  }

  selectedRoom(value) {
    this.setState({ currentRoom: value.name });
    this.setState({ currentRoomKey: value.key })  
  }

  setUser(name) {
    if (name == null){
      this.setState({ user: '' })
    } else {
      this.setState({ user: name.displayName });
    }  
  }

  render() {
    return (
      <div className="App">
          <header>
            
            <div className="header row">
                <div className="userController col-md-5 col-6">
                  <User 
                    firebase={firebase}
                    setUser={this.setUser.bind(this)}
                    user={this.state.user}
                  />
                </div>

                <div className="titleContainer col-md-7 col-6">
                  <h1 className="title">Grocery List</h1>
                </div>
            </div>
            
          </header>
          
          <main>
            <div className="main row">
              <div className="RoomList col-md-3 col-sm-4 col-5">
                <RoomList
                  firebase={firebase}
                  callbackFromParent={this.selectedRoom.bind(this)}
                />
              </div>           
              <div className="ItemList col-md-9 col-sm-8 col-7">
                <ItemList 
                    firebase={firebase}
                    currentRoom={this.state.currentRoom}
                    currentRoomKey={this.state.currentRoomKey}
                    user={this.state.user}
                />
              </div>
            </div>
          </main>
      </div>
    );
  }
}

export default App;
