import React from 'react';
import Platform, { ActivityIndicator , View, Dimensions, Image} from 'react-native';
import { MapView,Permissions,Constants,Location } from 'expo';

let widthPantalla = Dimensions.get("window").width;

export default class Mapa extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          errorMessage: '',
          lat: '',
          lon: '',
          region:''
        }
      }

    componentWillMount() {
        
          this._getLocationAsync();
        
      }

    //Obtener las coordenadas del dispositivo
  _getLocationAsync = async () => {

    console.log('ESTOY CORRIENDO....');

    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        region: 'Permission to access location was denied',
      });

      console.log('NO SE PUDO LOCALIZAR')
    }

    let locationDevice = await Location.getCurrentPositionAsync({});
    let lat = locationDevice.coords.latitude;
    let lon = locationDevice.coords.longitude;

    let finalRegion = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.0922,// Esto es la cantidad vertical que quieres que salga en la pantalla
      longitudeDelta: 0.0421// Esto es la cantidad horizontal que quieres que salga en la pantalla
    }

    this.setState({ region: finalRegion})

    
    console.log(JSON.stringify(finalRegion));


  };

  onRegionChange(region) {
    this.setState({ region });
  }


  render() {


    if(this.state.region){

    return (
      <MapView
        style={{ flex: 1 , width: widthPantalla}}
        region={this.state.region}
      >
      <MapView.Marker 
      coordinate={{
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude
      }}
      image={require('../Images/final.png')}
      title='Tu ubicacion'
      description='asdasda'
      />
      
      </MapView>

      );
    }
    else{
      return (
        
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
        </View>
      );
    }
  }
}