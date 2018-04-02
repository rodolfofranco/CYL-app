import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, ScrollView, FlatList,Dimensions,StatusBar,Platform,Image} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, List, ListItem,Card,Rating} from 'react-native-elements';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import fire from '../ConfigDatabase/fire';
import Login from '../Views/Login';
import Register from '../Views/Register';
import Mapa from '../Views/Mapa';

import { Constants, Location, Permissions, MapView} from 'expo';

let widthPantalla = Dimensions.get("window").width;



//Vista Principal
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    drawerLabel: 'Inicio',
    drawerIcon: <Icon
    name='home' />
  };

  constructor(props){
    super(props);
    this.state = {
      userLoaded: false,
      correo: '',
      animating: false,
      listaRestaurantes: [],
      productosCarrito: [],
    }
  }

  componentDidMount(){

    this.setState({
      animating:true
    })

    this.auth = fire.auth().onAuthStateChanged((user) => {

            if(user){
              this.setState({userLoaded:true});
              this.setState({correo: user.email})

            }
            else {
              this.setState({userLoaded:false});
              this.setState({correo: ''})
            }
          });


    this.extraerRestaurantes = fire.database().ref('restaurantes').on('value', snapshot =>{
      var that = this;
      var result = snapshot.val();
      that.setState({listaRestaurantes: result, animating: false});
    });

  }

  componentWillUnmount(){
    this.auth();
   //this.extraerRestaurantes();
  }


    render() {

    if(this.state.animating){
      return (
        <View style={styles.container}>

          <ActivityIndicator size="large"/>

        </View>
      );
    }
    else{

    if(this.state.userLoaded == false){

      let arrayRestaurante = Object.values(this.state.listaRestaurantes);

      return (

        <View style={{flex:1}}>

                            <View style={styles.container}>

                            <Mapa />

                            </View>

                          <View style={{flex:2}}>
                            <List containerStyle={{flex:1}}>
                            <FlatList
                            data = {arrayRestaurante}
                            renderItem = { ({item}) =>
                            <Card

                            title={item.nombre}
                            image={{ uri: item.imagen }}
                            imageStyle={{width: widthPantalla , height:150}}>
                            <Rating
                              showRating
                              type="star"
                              fractions={1}
                              startingValue={3.6}
                              readonly
                              imageSize={35}
                              style={{ paddingVertical: 10 }}
                            />

                            <View style={{padding:10}}>
                            <Text style={{fontSize:15}}>{item.descripcion}</Text>
                            </View>

                            <View style={{padding:10}}>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>Ubicacion: {item.direccion} </Text>
                            <Text style={{fontSize:15,fontWeight:'bold'}}>Tipo de Comida: {item.tipo} </Text>
                            </View>

                            <Button
                            icon={{name: 'menu'}}
                            backgroundColor='#03A9F4'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='VER MENU'
                            onPress={() => {this.props.navigation.navigate('Login',item)}}
                            />


                            </Card>


                             }
                            keyExtractor = {(item, index) => index}

                            />
                            </List>
                            </View>

                          </View>

            );
      }
      else{
        let arrayRestaurante = Object.values(this.state.listaRestaurantes);
        console.log('DATA    '+JSON.stringify(arrayRestaurante))
        return (

                    <View style={{flex:1}}>

                    <View style={styles.container}>
                    
                    <Mapa />

                    </View>

                  <View style={{flex:2}}>
                    <List containerStyle={{flex:1}}>
                    <FlatList
                    data = {arrayRestaurante}
                    renderItem = { ({item}) =>

                    <Card

                    title={item.nombre}
                    image={{ uri: item.imagen }}
                    imageStyle={{width: widthPantalla , height:150}}>
                    <Rating
                      showRating
                      type="star"
                      fractions={1}
                      startingValue={3.6}
                      readonly
                      imageSize={35}
                      style={{ paddingVertical: 10 }}
                    />

                    <View style={{padding:10}}>
                    <Text style={{fontSize:15}}>{item.descripcion}</Text>
                    </View>

                    <View style={{padding:10}}>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Ubicacion: {item.direccion} </Text>
                    <Text style={{fontSize:15,fontWeight:'bold'}}>Tipo de Comida: {item.tipo} </Text>
                    </View>

                    <Button
                    icon={{name: 'menu'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VER MENU'
                    onPress={() => {this.props.navigation.navigate('Restaurant',item)}}
                    />


                    </Card>

                    }
                    keyExtractor = {(item, index) => index}

                    />
                    </List>
                    </View>

                  </View>

              );
      }

    }

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botones: {
    padding: 20,
    marginTop:20,
    flexDirection: 'column',
    alignItems:'flex-end'

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
