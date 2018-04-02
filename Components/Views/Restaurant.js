import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput, FlatList,Dimensions,SectionList,AsyncStorage, ImageBackground,Image} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, Card, Divider,List,ListItem, Tile} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import IconBadge from 'react-native-icon-badge';
import fire from '../ConfigDatabase/fire';

let widthPantalla = Dimensions.get("window").width;

//Form para registrar un usuario.
export default class Restaurant extends React.Component {




      constructor(props){
        super(props);
        this.state = {
          nombre: '',
          email: '',
          password: '',
          animating: false,
          listaProductos: [],
          BadgeCount: 0
        }

      }

      componentDidMount(){
        const restaurant = this.props.navigation.state.params;
        this.extraerProductos = fire.database().ref('productos').orderByChild('restaurante').equalTo(restaurant.nombre).on('value', snapshot =>{
          var that = this;
          var result = snapshot.val();
          that.setState({listaProductos: result});
          console.log(restaurant)
        });

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

    static navigationOptions = ({ navigation }) => ({
      headerRight: <IconBadge
                    MainElement={
                      <Icon name='shopping-cart' color='#fff' containerStyle={{paddingTop:12,paddingRight:10}} onPress={() => navigation.navigate('Carrito')}/>

                    }
                    BadgeElement={

                      <Text>{navigation.state.params.badgeCount}</Text>

                    }
                    IconBadgeStyle={
                      {width:15,
                      height:15,
                      backgroundColor: 'red'}
                    }
                    />
  });

  componentWillMount() {
    this.props.navigation.setParams({
      badgeCount: this.props.BadgeCount,
    });
  }



    render(){


        const restaurant = this.props.navigation.state.params;
        console.log('AQUI ES LA VAINA '+ restaurant);

        let arrayProductos = Object.values(this.state.listaProductos);

        let arrayEntrada = [];
        let arrayPrincipal = [];
        let arrayBebida = [];
        let arrayPostre = [];

        arrayProductos.forEach(function(element) {
              if(element.tipo == "Principal"){
                arrayPrincipal.push(element);
              }
              else if(element.tipo == "Entrada"){
                arrayEntrada.push(element);
              }
              else if(element.tipo == "Postre"){
                arrayPostre.push(element);
              }else{
                arrayBebida.push(element);
              }
        }, this);

        let sectionData = [
          {title: "Principales" , data: arrayPrincipal},
          {title: "Entradas" , data: arrayEntrada},
          {title: "Postres" , data: arrayPostre},
          {title: "Bebidas" , data: arrayBebida}
        ];






      return (
          <View style={{flex:1}}>
          <List containerStyle={{  width: widthPantalla}}>
              <SectionList
                  sections={sectionData}
                  renderItem={({item}) =>
                      // <ListItem
                      // button onPress={() => {this.props.navigation.navigate('Producto', item)}}
                      // title={item.nombre}
                      // titleStyle={{fontSize:20}}
                      // subtitle={`${item.precio} CLP`}
                      // key={item.key}

                      // />
                      <Card
                      title={item.nombre}
                      titleStyle={{fontSize:25}}
                      image={{uri: item.imagen}}>
                      <View style={{justifyContent:'center',alignItems:'center'}}>
                      <Text style={{marginBottom: 10,fontSize:17}}>
                      Precio: {item.precio} CLP
                      </Text>
                      </View>
                      <Button
                        onPress={() => {this.props.navigation.navigate('Producto',item)}}
                        icon={{name: 'code'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='VER PRODUCTO' />
                    </Card>
                       
                  }
                  renderSectionHeader={
                    ({section}) => <ListItem
                    title= {<Text style={{fontSize:25,textAlign:'center'}}>{section.title}</Text>}
                    hideChevron
                    containerStyle={{backgroundColor: '#A9A9F5'}}
                    />
                  }
                  keyExtractor = {(item, index) => index}
              >


                </SectionList>


          </List>
          </View>





      );

    }

    }

    const styles = StyleSheet.create({
        container: {
            flex: 2,
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
