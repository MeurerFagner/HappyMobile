import React from 'react';

import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Feather} from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';

export default function OrphanagesMap () {
    const navigation = useNavigation()
    function handleNavegateToOrphanageDetails(){
        navigation.navigate('OrphanageDetails');
    }
    return(
<View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -29.9983203,
          longitude: -51.0774528,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={mapMarker}
          calloutAnchor={{
            x: 2.8,
            y: 0.8
          }}
          coordinate={{
            latitude: -29.9983203,
            longitude: -51.0774528  
          }}>
            <Callout tooltip onPress={handleNavegateToOrphanageDetails}>
              <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Casa da criança de Alvorada</Text>
              </View>
            </Callout>
          </Marker>

      </MapView>
      <View style={styles.footer}>
      <Text style={styles.calloutText}>2 orfanatos encontrados</Text> 
          <TouchableOpacity style={styles.createOrphanagesButton} onPress={()=>{}}>
            <Feather name="plus" size={20} color="#FFF"/>
          </TouchableOpacity>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    calloutContainer: {
      width: 168,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      borderRadius:16,
      justifyContent: 'center'
    },
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
    createOrphanagesButton:{
      width: 56,
      height:56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  