
import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput, FlatList,Dimensions,SectionList,AsyncStorage} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, Card, Divider,List,ListItem,Slider} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import Modal from 'react-native-modal'
import fire from '../ConfigDatabase/fire';

let widthPantalla = Dimensions.get("window").width;
let productos = {};
let totalP = 0;

//Form para registrar un usuario.
export default class Carrito extends React.Component {



      constructor(props){
        super(props);
        this.state = {
          listaProductos: '',
          total:0,
          animating:false,
          modalVisible: false,
          cantidad:1,
          cantMax:0,
          keyCart:0
        }

      }

    componentDidMount(){

         this.getData();
         totalP=0;
    }

      componentWillUnmount(){
        this.state.listaProductos = [];
      }



    getData = async() => {
        try {
            const value = await AsyncStorage.getItem('carrito');
            if (value !== null){
              // We have data!!

              productos = JSON.parse(value);

              for(let i=0;i<productos.length;i++){
              let totalProducto = totalP + productos[i].precio * productos[i].cantidad;
              totalP = totalProducto;
              }
              // let array = this.state.listaProductos.slice();
              // array.push(productos);
              this.setState({
                listaProductos : productos,
                total : totalP
              })

            }else{
              alert('El carrito esta vacio');
            }
          } catch (error) {
            // Error retrieving data
            console.log('No se jalo nada');
            console.log(error);
          }

    }

    emptyCart = () =>{

      try {
        AsyncStorage.setItem('carrito', '');
        arrayData = [];

      } catch (e) {
        console.log(e);
      }

      this.props.navigation.navigate('Home');

    }

    renderCheckout = () =>{
      
      const totalNext = this.state.total;

      if(this.state.total == 0){

       return(

       <Button disabled backgroundColor="#00e676" title="CHECKOUT" buttonStyle={{borderRadius: 4}} iconRight={{name: 'chevron-right'}}/>

      );

      }else{

        return (
        <Button backgroundColor="#00e676" title="CHECKOUT" buttonStyle={{borderRadius: 4}} iconRight={{name: 'chevron-right'}} onPress={() => this.props.navigation.navigate('Checkout',totalNext)}/>
        );
      }
    }

    showModal = (key, cant) => {

      this.setState({modalVisible: true, keyCart: key, cantMax: cant});

    }

    hideModal = () => {
      this.setState({
        modalVisible: false
      })
    }

    deleteProduct = (key,cant) => {

      try {

        AsyncStorage.getItem('carrito').then((value) => {

          const d = JSON.parse(value);

          if(d.length == 1){
            if(d[key].cantidad == cant){
              AsyncStorage.setItem('carrito', '');
              this.hideModal();
              this.props.navigation.goBack();
            }else{
              d[key].cantidad = d[key].cantidad - cant;
              AsyncStorage.setItem('carrito', JSON.stringify(d));
              this.hideModal();
              this.props.navigation.goBack();
            }
          }else{

            //Se mando a borrar todas las cantidades del producto "X" del carrito
            if(d[key].cantidad == cant){
              d.splice(key,1);
              AsyncStorage.setItem('carrito', JSON.stringify(d));
              this.hideModal();
              this.props.navigation.goBack();
            }else{
              //Se borra la cantidad que el usuario indicó
              d[key].cantidad = d[key].cantidad - cant;
              AsyncStorage.setItem('carrito', JSON.stringify(d));
              this.hideModal();
              this.props.navigation.goBack();
            }

          }



        });

      } catch (e) {
        console.log(e);
      }


    }




    render(){


        let arrayProductos = Object.values(this.state.listaProductos);

        console.log(arrayProductos);
       if(this.state.animating){

         return(
         <View style={{flex:1 }}>

            <View style={styles.container}>



            <ActivityIndicator  size="large"/>


            </View>

        </View>
         );
       }


       else{
      return (

        <View style={{flex:1, backgroundColor:'#ffff'}}>

        <View style={styles.container}>


        <Text style={{fontSize: 20}}>Tu Pedido</Text>
        <Icon name='shopping-cart' iconStyle={{marginTop:10}} size={20}  />

        </View>

        <View style={{flex:4 , backgroundColor:'#ffff'}} visible={this.state.modalVisible}>
        <List containerStyle={{marginBottom: 30, flex: 2 ,width: widthPantalla}}>
        <FlatList
                    data = {arrayProductos}
                    renderItem = { ({item, index}) => (


                          <View style={{flexDirection:'row', padding:4,justifyContent:'center',alignItems:'center'}}>

                          <View style={{flex:3,padding:6}}>
                          <ListItem
                          title={item.nombre}
                          subtitle={`${item.precio} CLP                     Cantidad: ${item.cantidad}`}
                          key={item.key}
                          hideChevron
                          />
                          </View>

                          <View style={{flex:1, justifyContent:'center',alignContent:'center'}}>
                          <Button backgroundColor='#ffff' icon={{name: 'delete',color: 'red',size:30}} onPress={() => this.showModal(index, item.cantidad)} borderRadius={6}   />
                          </View>

                          </View>





                    ) }

                    keyExtractor={(item, index) => index}
                    />
        </List>

        <Modal isVisible={this.state.modalVisible}>
          <View style={{flex:0.5 , backgroundColor: '#ffff',justifyContent:'center',alignItems:'center'}}>

          <View style={{padding:10}}>
          <Text style={{fontSize:20}}>Cuantos productos desea eliminar?</Text>
          </View>

          <View style={{flex: 2, alignItems: 'stretch', justifyContent: 'center'}}>

            <View style={{padding:8}}>
            <Slider
              value={this.state.cantidad}
              minimumValue={1}
              maximumValue={this.state.cantMax}
              step={1}
              thumbTouchSize={{width:60,height:60}}
              onValueChange={(cantidad) => this.setState({cantidad})}
              />
            <Text>Cantidad: {this.state.cantidad}</Text>
            </View>

            <View style={{padding:8}}>
            <Button title='ELIMINAR' backgroundColor='red' onPress={() => this.deleteProduct(this.state.keyCart,this.state.cantidad)}/>
            </View>



          </View>

          <View style={{flex:1}}>
          <Button title='CERRAR' backgroundColor='#424242' onPress={this.hideModal}/>
          </View>

          </View>
        </Modal>
        <View style={{flex:1 , flexDirection:'row' , justifyContent:'space-between',backgroundColor:'#ffff'}}>
        <Text style={{fontSize:20,marginBottom:10}}>Total: {this.state.total} CLP</Text>

                    {this.renderCheckout()}

        </View>

        </View>

        <Button buttonStyle={{marginBottom:10}}title='VACIAR CARRITO' backgroundColor='#4dd0e1' icon={{name: 'add-shopping-cart'}} onPress={this.emptyCart} />

        </View>





      );
    }

    }

    }

    const styles = StyleSheet.create({
        container: {
            flex: 0.8,
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