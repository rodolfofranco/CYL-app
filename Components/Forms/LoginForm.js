import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import fire from '../ConfigDatabase/fire'

//Form para registrar un usuario.
export default class LoginForm extends React.Component {



      constructor(props){
        super(props);
        this.state = {
          animating: false,
          email: '',
          password: '',
          restaurante:''
        }

      }

      componentDidMount(){
        const restaurant = this.props.restaurante;
        console.log('RESTAURANTE: '+restaurant);
        this.setState({
          restaurante: restaurant
        })
      }



      iniciarSesion = () => {

                      this.setState({
                        animating:true
                      });

                      fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() =>{
                          this.setState({
                            animating:false
                          });
                          if( this.state.restaurante === undefined){
                          console.log('No escoji restaurant');
                          this.props.navigation.navigate('Home');
                          }
                          else{
                            console.log('Escoji restaurant');
                            let item = this.props.navigation.state.params;
                            this.props.navigation.navigate('Restaurant',item);
                          }
                      }).catch((error) =>{

                        if(error.message == 'auth/invalid-email'){
                          this.setState({
                            animating:false
                          });
                          Alert.alert('El correo que usted ha ingresado no es valido');
                        }
                        else if(error.message == 'auth/wrong-password'){
                          this.setState({
                            animating:false
                          });
                          Alert.alert('La clave que ha ingresado es incorrecta')
                        }
                        else if(error.message == 'auth/user-not-found'){
                          this.setState({
                            animating:false
                          });
                          Alert.alert('El usuario que ha ingresado no esta registrado')
                        }
                        else{
                          this.setState({
                            animating:false
                          });

                        }


                      });


                    }

    render(){



      if(this.state.animating){
        return (


          <ActivityIndicator size="large"/>

        );
      }
      else{
      return (


        <KeyboardAvoidingView style={styles.container} behavior="padding">

          <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#e6e6e6"
          value={this.state.email}
          onChangeText={(email) => this.setState({email})}
          keyboardType="email-address"
          />

          <TextInput
          style={styles.input}
          placeholder="Clave"
          placeholderTextColor="#e6e6e6"
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({password})}
          />
          
          <Button iconRight={{name: 'sign-in',type:'font-awesome'}} borderRadius={4} title='INGRESAR'  backgroundColor='#4dd0e1' style={styles.botones} onPress={this.iniciarSesion}/>

          <View style={{padding:10}}>
            <Text style={{fontWeight:'normal'}}>Aun no tienes cuenta? Presiona abajo</Text>
          </View>
          
          <Button iconRight={{name: 'person-add'}} borderRadius={4} title='CREAR CUENTA'  backgroundColor='#4dd0e1' onPress={() => {this.props.navigation.navigate('Register')}}/>


          </KeyboardAvoidingView>

      );
    }

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

        },
        loading: {
          paddingTop:100
        }
      });
