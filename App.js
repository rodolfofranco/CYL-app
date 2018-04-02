import React from 'react';

import { Drawer,DrawerLogged } from './Components/ConfigDatabase/router';
import fire from './Components/ConfigDatabase/fire';

//Vista Principal
export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userLoaded: false
    }
  }

  componentDidMount(){
    
        this.auth = fire.auth().onAuthStateChanged((user) => {
    
                if(user){
                  this.setState({userLoaded:true});
    
                }
                else {
                  this.setState({userLoaded:false});
              
                }
              });
  }

  
  render (){

    if(this.state.userLoaded){
    return <DrawerLogged />
    }
    else{
      return <Drawer />
    }
  }
}