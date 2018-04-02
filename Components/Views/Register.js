import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';

import RegisterForm from '../Forms/RegisterForm';

//Vista para registrar un usuario
export default class Register extends React.Component {

      static navigationOptions = {
        drawerLabel: 'Registrarse',
        drawerIcon: <Icon
        name='person-add' />
      };

      constructor(props){
        super(props);
        this.state = {
          animating: false
        }
      }

    render(){

      if(this.state.animating){
        return(

        <View style={styles.container}>
        <Header
            backgroundColor='#3949ab'
            leftComponent={<Icon name='menu' color='#fff' onPress={() => this.props.navigation.navigate('DrawerOpen')}/>}
            centerComponent={{ text: 'Registro', style: { color: '#fff' } }}
            rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('Home')}/>}
        />
        <ActivityIndicator size="large"/>
        </View>

        );
      }
      else{
      return (

        <View style={styles.container}>
        <Header
            backgroundColor='#3949ab'
            leftComponent={<Icon name='menu' color='#fff' onPress={() => this.props.navigation.navigate('DrawerOpen')}/>}
            centerComponent={{ text: 'Registro', style: { color: '#fff' } }}
            rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('Home')}/>}
          />
          <View style={styles.form}>
            <RegisterForm navigation={this.props.navigation}/>
          </View>

        </View>


      );
      }
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
