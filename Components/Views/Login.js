import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import fire from '../ConfigDatabase/fire'


import LoginForm from '../Forms/LoginForm';


export default class Login extends React.Component {

      static navigationOptions = {
        drawerLabel: 'Inicio de Sesion',
        drawerIcon: <Icon
        name='account-box' />
      };

      constructor(props){
        super(props);
        this.state = {
          animating: false,
          email: '',
          password: ''
        }



      }







    render(){

      return (

        <View style={styles.container}>
        
          <View style={{flex:1 ,alignItems:'center',justifyContent:'center'}}>
            <LoginForm restaurante={this.props.navigation.state.params} navigation = {this.props.navigation} />
          </View>

        </View>


      );
    }

    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#ffff',
          alignItems: 'center',

        },
        botones: {
          padding: 20,
          marginTop:20
        },
        icon: {
          width: 24,
          height: 24,
        },
        loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center'
        },
        outerContainer: {
          flex: 1
        },
      });
