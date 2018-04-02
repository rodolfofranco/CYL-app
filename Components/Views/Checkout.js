import React from 'react';
import { StyleSheet, View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput, FlatList,Dimensions,SectionList,TouchableHighlight} from 'react-native';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, Card, Divider,List,ListItem,CheckBox} from 'react-native-elements';
import { DrawerNavigator } from 'react-navigation';
import fire from '../ConfigDatabase/fire';

let widthPantalla = Dimensions.get("window").width;

//Form para registrar un usuario.
export default class Checkout extends React.Component {



      constructor(props){
        super(props);
        this.state = {
          animating: false,
          usuario : '',
          debito: false,
          mercadoPago: false,
          credito:false
        }

      }

      componentDidMount(){

        let user = fire.auth().currentUser;
        this.setState({
          usuario: user,
          webPay: false,
          mercadoPago:false
        })

    }

    renderNext = () =>{

      const totalNext = this.props.navigation.state.params;
      console.log('TOTAL: '+totalNext);

      if(this.state.webPay == true || this.state.mercadoPago == true){

        if(this.state.mercadoPago==true){
        return (
          <Button backgroundColor="#00e676" title='SIGUIENTE' iconRight={{name: 'chevron-right'}} onPress={()=> this.props.navigation.navigate('Payment',totalNext)}/>
        );
        }
        else{
          return (
            <Button backgroundColor="#00e676" title='SIGUIENTE' iconRight={{name: 'chevron-right'}}/>
          );
        }
      }
      else{
        return(
        <Button disabled backgroundColor="#00e676" title='SIGUIENTE' iconRight={{name: 'chevron-right'}} />
        );
      }
    }







    render(){



      const total = this.props.navigation.state.params;

      return (

        <View style={{flex:1 ,backgroundColor:'#ffff'}}>

        <View style={styles.container}>
        
        </View>

        <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
          <Text> TOTAL: {this.props.navigation.state.params} CLP</Text>
          <Text style={{fontSize:20}}>Seleccione su metodo de pago: </Text>
        </View>

        <View style={{flex:2,alignItems:'center',justifyContent:'center',backgroundColor:'#ffff',flexDirection:'row'}}>

          <CheckBox
            center
            containerStyle={{backgroundColor:'#ffff',borderColor:'#ffff'}}
            title='WebPay'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={()=>this.setState({
              webPay:true,
              mercadoPago: false
            })}
            checked={this.state.webPay}
           />


           <CheckBox
            center
            containerStyle={{backgroundColor:'#ffff',borderColor:'#ffff'}}
            title='MercadoPago'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={()=>this.setState({
              mercadoPago:true,
              webPay:false
            })}
            checked={this.state.mercadoPago}
           />

        </View>

        <View style={{flex:1,backgroundColor:'#ffff'}}>
              {this.renderNext()}
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
