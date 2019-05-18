import React, { Component } from 'react';

class User extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOut() {
        this.props.firebase.auth().signOut();
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged((user) => {
            this.props.setUser(user);
          });
    }

    render() {
        return(
            <span>
                { 
                    this.props.user == '' &&
                        <span>
                            <p>Signed in as Guest</p>
                            <button onClick={() => this.handleSignIn()}>Sign In</button>
                        </span>
                }
                { 
                    this.props.user != '' &&
                        <span>
                            <p>Signed in as {this.props.user}</p>
                            <button onClick={() => this.handleSignOut()}>Sign Out</button>
                        </span> 
                }          
            </span>
        )
    }
}

export default User;