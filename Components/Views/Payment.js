import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput, FlatList,Dimensions,SectionList,TouchableHighlight,WebView} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, Card, Divider,List,ListItem,CheckBox} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import fire from '../ConfigDatabase/fire';

let widthPantalla = Dimensions.get("window").width;

//Form para registrar un usuario.
export default class Payment extends React.Component {



      constructor(props){
        super(props);
        this.state = {
          token: '',
          animating: false,
          usuario : '',
          modoPago:'',
          sandboxURL: '',
          preference_id:'',
          collector_id: '',
          orders: []
        }

      }

      componentDidMount(){

        let self = this;

        let user = fire.auth().currentUser;
        console.log('TOTAL CHECKOUT: '+this.props.navigation.state.params);

        self.setState({
          usuario: user
        })

        //Primero se obtiene el token de acceso

        fetch("https://api.mercadopago.com/oauth/token", {
          body: "grant_type=client_credentials&client_id=3607566591233450&client_secret=TbvyDwUver1pPW0gaLHOgDeDljMCCgWi",
          headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded",
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST"
        })
        .then((response) => response.json())
        .then(responseJson => {
          console.log('TOKEN: '+JSON.stringify(responseJson.access_token));
          //Se setea el token de acceso
          self.setState({
            token: responseJson.access_token
          })

          //Ahora se crea el checkout preference en el API de MercadoPago
          fetch('https://api.mercadopago.com/checkout/preferences/?access_token='+this.state.token, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              
              items: [
                {
                id:'asd',
                title: 'Orden CYL-APP',
                category_id:'asd',
                quantity: 1,
                currency_id: 'CLP',
                unit_price: this.props.navigation.state.params
              }
            ],
            back_urls:{
              success: 'www.google.com', //URL que redirecciona cuando el pago se hace efectivo
              pending: 'www.yahoo.com', // URL en caso de que el pago se quede guindando
              failure: 'www.youtube.com' // URL en caso de que el pago halla fallado
            }
            })

          })
          .then((response) => response.json())
          .then(responseJson => {
            console.log('Se ha creado el checkout: '+ JSON.stringify(responseJson));
            self.setState({
              sandboxURL: responseJson.init_point,
              preference_id: responseJson.id,
              collector_id: responseJson.collector_id
            })


        //Aqui se buscan todas las ordenes completadas en la API
        fetch('https://api.mercadopago.com/v1/payments/search/?access_token='+this.state.token)
        .then(response => response.json())
        .then(responseJson => {
          console.log('ORDENES  :' + JSON.stringify(responseJson));
          self.setState({
            orders: responseJson.result
          })
          //Aqui se debe mandar informacion sobre las ordenes a firebase....
        })
        .catch(error => {
          console.error(error);
        });

            

          })



        })


    }

    //En esta funcion se puede verificar en que URL del proceso de pago se encuentra el usuario
    _onNavigationStateChange(webViewState){

      console.log(webViewState)

      //Si el pago de la orden es satisfactorio, se redirige el usuario a otro componente....
      if(webViewState.title == "Gracias por el pago - Mercado Pago"){

        this.props.navigation.navigate('Home');
      }
      


    }


    

    render(){

      return (

        <View style={{flex:1}}>

        <View style={styles.container}>
        <WebView 
        source={{uri: this.state.sandboxURL}} 
        style={{height:400,width:widthPantalla}}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        />
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
