import React from 'react';
import { DrawerNavigator,StackNavigator} from 'react-navigation';
import { Button, Header, Icon, FormLabel, FormInput, FormValidationMessage, Text, Card, Divider,List,ListItem,Slider,Badge} from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import { View ,KeyboardAvoidingView,Alert, ActivityIndicator, TextInput, FlatList,Dimensions,SectionList, Image,AsyncStorage,StatusBar} from 'react-native';


import HomeScreen from '../Views/Home';
import Register from '../Views/Register';
import Login from '../Views/Login';
import Producto from '../Views/Producto';
import Restaurant from '../Views/Restaurant';
import Carrito from '../Views/Carrito';
import Perfil from '../Views/Perfil';
import Checkout from '../Views/Checkout';
import Payment from '../Views/Payment';
import Mapa from '../Views/Mapa';

// Este es el componente que va a contener las configuraciones de los navegadores que vayamos a utilizar

let badgeCount;

badge = () => {

    try {

        AsyncStorage.getItem('carrito').then((value) => {
            if(value!== null){
          const d = JSON.parse(value);
          badgeCount = d.length;

          return badgeCount;
            }
            else{
                badgeCount = 0;

                return badgeCount;
            }

        })
        return badgeCount;
      } catch (e) {
        console.log(e);
      }
      return badgeCount;
}



export const RestaurantStack = StackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) =>({
          title: 'CYL',
          headerStyle: {backgroundColor:'#3949ab',height:70},
          headerTitleStyle: { color: '#ffff'},
          headerLeft: <Icon name='menu' color='#fff' containerStyle={{paddingLeft:15}} onPress={() => navigation.navigate('DrawerOpen')}/>
        })



    },
    Login:{
        screen: Login,
        navigationOptions: ({navigation}) => ({
            title: 'Login',
            headerStyle: {backgroundColor:'#3949ab',height:70},
            headerTitleStyle: { color: '#ffff'},
            headerLeft: <Icon name='menu' color='#fff' containerStyle={{paddingLeft:20}} onPress={() => navigation.navigate('DrawerOpen')}/>,
            headerRight: <Icon name='home' color='#fff' containerStyle={{paddingRight:20}} onPress={() => navigation.goBack()}/>
        })
    },
    Restaurant:{
        screen: Restaurant,
        navigationOptions: ({navigation}) => ({

            headerStyle: {backgroundColor:'#3949ab',height:70},
            headerTitleStyle: { color: '#ffff'},
            headerRight: <IconBadge
                          MainElement={
                            <Icon name='shopping-cart' color='#fff' containerStyle={{paddingTop:12,paddingRight:10}} onPress={() => navigation.navigate('Carrito')}/>

                          }
                          BadgeElement={

                            <Text>{this.badge()}</Text>

                          }
                          IconBadgeStyle={
                            {width:15,
                            height:15,
                            backgroundColor: 'red'}
                          }
                          />
        })
    },
    Producto:{
        screen: Producto,
        navigationOptions: ({navigation}) => ({

            headerStyle: {backgroundColor:'#3949ab',height:70},
            headerTitleStyle: { color: '#ffff'},
            headerRight: <IconBadge
                          MainElement={
                            <Icon name='shopping-cart' color='#fff' containerStyle={{paddingTop:12,paddingRight:10}} onPress={() => navigation.navigate('Carrito')}/>

                          }
                          BadgeElement={

                            <Text>{this.badge()}</Text>

                          }
                          IconBadgeStyle={
                            {width:15,
                            height:15,
                            backgroundColor: 'red'}
                          }
                          />
        })
    },  Carrito: {screen: Carrito,
          navigationOptions: ({navigation}) =>({
              title: 'Shopping Cart',
              headerStyle: {backgroundColor:'#3949ab',height:70},
              headerTitleStyle: { color: '#ffff'},
            })
      },
      Checkout: {screen: Checkout,
          navigationOptions: ({navigation}) =>({
              title: 'Checkout',
              headerStyle: {backgroundColor:'#3949ab',height:70},
              headerTitleStyle: { color: '#ffff'},
            })
      },
      Payment: {screen: Payment,
          navigationOptions: ({navigation}) =>({
              title: 'Ventana de Pago',
              headerStyle: {backgroundColor:'#3949ab',height:70},
              headerTitleStyle: { color: '#ffff'},
            })
      },
      Mapa:{screen: Mapa}


});



export const DrawerLogged = DrawerNavigator({
    Home: {screen: RestaurantStack,
    navigationOptions:{
        drawerIcon: <Icon name="home"/>,
        drawerLabel: 'Inicio'
    }
    },
    Perfil: {screen: Perfil,
    navigationOptions:{
        drawerIcon: <Icon name="account-circle" />,
        drawerLabel: 'Profile'
    }
    }
})

export const Drawer = DrawerNavigator({
    Home:{screen: RestaurantStack,
        navigationOptions:{
            drawerIcon: <Icon name="home"/>,
            drawerLabel: 'Inicio'
        }
        },
    Register: {screen: Register},
    Login: {screen: Login}
  });
