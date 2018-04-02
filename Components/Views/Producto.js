import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput, FlatList,Dimensions,SectionList, Image,AsyncStorage} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, Card, Divider,List,ListItem,Slider} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';
import fire from '../ConfigDatabase/fire';

let widthPantalla = Dimensions.get("window").width;

//Form para registrar un usuario.
export default class Producto extends React.Component {



      constructor(props){
        super(props);
        this.state = {
          animating: false,
          cantidad: 1,
          BadgeCount: 0,
          restaurant: {}
        }

      }

      componentDidMount(){

        this.getCart();

    
  }

      getCart = () => {

        try {

          AsyncStorage.getItem('carrito').then((value) => {
            if(value !== null){
            const d = JSON.parse(value);
            this.setState({BadgeCount: d.length});
            }
            else{
              this.setState({BadgeCount: 0})
            }
          })

        } catch (e) {
          console.log(e);
        }


      }

    checkingRest = () => {
      const producto = this.props.navigation.state.params;
      try {
        AsyncStorage.getItem('carrito').then((value) => {
          if(value !== null){
            const d = JSON.parse(value);
            if(d[0].restaurante !== producto.restaurante){
              Alert.alert(
                'Aviso!',
                'Estas seguro que quieres continuar? Perderas el carrito que ya existe para el restaurante ' + d[0].restaurante,
                [
                  {text: 'Cancel', onPress: () => this.cancel(), style: 'cancel'},
                  {text: 'OK', onPress: () => this.changeRest()},
                ],
                { cancelable: false }
              )
            }else{
              this.addItem();
            }
          }else{
            this.addItem();
          }

        })



      } catch (e) {
        console.log(e);
      }
    }

    cancel = () => {

    }

    changeRest = () => {
      try {
        AsyncStorage.setItem('carrito', '');

        this.addItem();
      } catch (e) {
        console.log(e);
      }
    }


    addItem = () => {

        const producto = this.props.navigation.state.params;
        const arrayData = [];
        const data = {
          nombre: producto.nombre,
          precio: producto.precio,
          descripcion: producto.descripcion,
          imagen: producto.imagen,
          tipo: producto.tipo,
          restaurante: producto.restaurante,
          cantidad: this.state.cantidad
        }
        arrayData.push(data);

        try{
          AsyncStorage.getItem('carrito').then((value) => {

              if(value !== null){

                const d = JSON.parse(value);
                let iguales = false;
                for (var i = 0; i < d.length; i++) {
                  // Si el nombre del producto ya existe en el carrito, se toma la cantidad de ese producto
                  // luego se borra del async y se setea al mismo producto pero se suma la cantidad anterior
                    if(d[i].nombre == producto.nombre){
                      let cant = d[i].cantidad;
                      //Se borra producto del carrito
                      d.splice(i,1);
                      const data1 = {
                        nombre: producto.nombre,
                        precio: producto.precio,
                        descripcion: producto.descripcion,
                        imagen: producto.imagen,
                        tipo: producto.tipo,
                        restaurante: producto.restaurante,
                        cantidad: this.state.cantidad + cant
                      }
                      iguales = true;
                      //Se mete el mismo producto pero con la cantidad nueva
                      d.push(data1);
                      AsyncStorage.setItem('carrito', JSON.stringify(d));


                      break;

                    }



                }
                if(iguales == false){
                  d.push(data);
                  AsyncStorage.setItem('carrito', JSON.stringify(d));
                  console.log(producto);
                  Alert.alert(
                    'Listo!',
                    'Se ha agregado el producto al carrito',
                    [

                      {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                  )

                }else{
                  console.log(producto);
                  Alert.alert(
                    'Listo!',
                    'Se ha agregado el producto al carrito',
                    [

                      {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                  )
                }
              }else{
                console.log(producto);
                AsyncStorage.setItem('carrito', JSON.stringify(arrayData));
                Alert.alert(
                  'Listo!',
                  'Se ha agregado el producto al carrito',
                  [

                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                  ],
                  { cancelable: false }
                )
              }

          })
        }catch(err){
          console.log(err);
        }

    }

    show = () => {
      AsyncStorage.getItem('carrito').then((value) => {
        console.log(value);
      })
    }

    render(){
      const producto = this.props.navigation.state.params;
      return (
        <View style={{flex:1}}>

        <View style={styles.container}>

        <Image source={{uri: producto.imagen}} style={{width:250 , height: 250}}/>

        </View>



        <View style={{flex:1 , alignItems:'center'}}>
           <Text style={{fontSize:30}}> {producto.nombre} </Text>
          <Text style={{fontSize:20}}> {producto.descripcion} </Text>
          <Text style={{fontSize:15}}>Precio: {producto.precio} CLP</Text>

          <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
            <Slider
              value={this.state.cantidad}
              minimumValue={1}
              maximumValue={15}
              step={1}
              thumbTouchSize={{width:60,height:60}}
              onValueChange={(cantidad) => this.setState({cantidad})}
              />
            <Text>Cantidad: {this.state.cantidad}</Text>
          </View>



          <Button title='AGREGAR A CARRITO' backgroundColor='#4dd0e1' icon={{name: 'add-shopping-cart'}} onPress={this.checkingRest} />
          <Text> </Text>
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
            justifyContent: 'center'

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
