import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput, FlatList,Dimensions,SectionList,TouchableHighlight} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, Card, Divider,List,ListItem} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import fire from '../ConfigDatabase/fire';

let widthPantalla = Dimensions.get("window").width;

//Form para registrar un usuario.
export default class Perfil extends React.Component {



      constructor(props){
        super(props);
        this.state = {
          animating: false,
          usuario : ''
        }

      }

      componentDidMount(){

        let user = fire.auth().currentUser;
        this.setState({
          usuario: user
        })

    }

    logout = () =>{

            this.setState({
              animating: true
            });

            fire.auth().signOut().then(() => {
              this.setState({
                animating: false,
                usuario: ''
              })
              this.props.navigation.navigate('Home');
            }).catch(function(error) {
              this.setState({
                animating: false,
                usuario: ''
              })
            })
    }



    render(){




      if(this.state.animating){
          return(
            <View style={{flex: 1,
              backgroundColor: '#ffff',
              alignItems: 'center',
              width: widthPantalla,
              justifyContent: 'center'}}>
            <Header

                backgroundColor='#3949ab'
                leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text: 'Perfil' , style: { color: '#fff' } }}
                rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('Home')}/>}
            />

            <ActivityIndicator size="large"/>
            </View>
          )
      }
      else{
      return (

        <View style={{flex:1}}>

        <View style={styles.container}>
        <Header

            outerContainerStyles={{zIndex:1}}
            backgroundColor='#3949ab'
            leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => this.props.navigation.navigate('Home')}/>}
            centerComponent={{ text: 'Perfil' , style: { color: '#fff' } }}
            rightComponent={<Icon name='home' color='#fff' onPress={() => this.props.navigation.navigate('Home')}/>}
        />
        </View>

        <View style={{flex:4,backgroundColor:'#ffff'}}>
        <Text style={{fontSize: 30, textAlign:'center'}}>Perfil de Usuario</Text>
        <Icon name='account-circle' size={150}  />
        <Text style={{marginTop:20,fontSize: 20,textAlign:'center'}}>Correo: {this.state.usuario.email}</Text>


        <Button buttonStyle={{marginTop:50}}title='LOGOUT' backgroundColor='#4dd0e1' icon={{name: 'exit-to-app'}} onPress={this.logout}/>
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
            width: widthPantalla

        },
        input: {
          height: 40,
          width: 250,
          backgroundColor: '#E6E6E6',
          marginBottom: 20,
          color: 'black',
          paddingHorizontal: 10,
          borderRadius: 10

        }
      });
