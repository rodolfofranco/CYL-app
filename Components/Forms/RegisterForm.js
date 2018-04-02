import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import fire from '../ConfigDatabase/fire'

//Form para registrar un usuario.
export default class RegisterForm extends React.Component {



      constructor(props){
        super(props);
        this.state = {
          nombre: '',
          email: '',
          password: '',
          animating: false
        }

      }


       registrarse = () => {

        this.setState({
          animating: true
          });

          fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.setState({
              animating: false
              });
             this.props.navigation.navigate('home');
            Alert.alert("Se ha registrado correctamente");
          }).catch((error) => {

            if(error.code == 'auth/invalid-email'){
              this.setState({
                animating: false
                });
              Alert.alert("Correo invalido");
            }else if(error.code == 'auth/weak-password'){
              this.setState({
                animating: false
                });
              Alert.alert("Debe ingresar una contraseña con un minimo de 6 caracteres ");
          }else{
            this.setState({
              animating: false
              });
            this.props.navigation.navigate('home');
            Alert.alert("Se ha registrado correctamente");
          }

          });

      }

    render(){



      return (


        <KeyboardAvoidingView style={styles.container} behavior="padding">

          <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          placeholderTextColor="#e6e6e6"
          value={this.state.nombre}
          onChangeText={(nombre) => this.setState({nombre})}
          />

          <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#e6e6e6"
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          />

          <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          placeholderTextColor="#e6e6e6"
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          />


          <Button iconRight={{name:'person-add'}} borderRadius={4} title='REGISTRARSE'  backgroundColor='#4dd0e1' style={styles.botones} onPress={this.registrarse}/>

          </KeyboardAvoidingView>

      );

    }

    }

    const styles = StyleSheet.create({
        container: {
          paddingTop:100
        },
        input: {
          height: 50,
          width: 250,
          backgroundColor: '#ffff',
          marginBottom: 20,
          color: 'black',
          paddingHorizontal: 10,
          fontSize:20

        }
      });
