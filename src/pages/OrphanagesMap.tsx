import React, { useState } from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}
export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation()

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  function handleNavegateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails',{id});
  }
  function handleNavegateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }
  return (
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
        {
          orphanages.map(orphanage => {
            return (
              <Marker
                key= {orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.8,
                  y: 0.8
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude
                }}>
                <Callout tooltip onPress={() => handleNavegateToOrphanageDetails(orphanage.id)}>
                  <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );

          })
        }

      </MapView>
      <View style={styles.footer}>
        <Text style={styles.calloutText}>{`${orphanages.length} orfanatos encontrados`}</Text>
        <RectButton style={styles.createOrphanagesButton} onPress={handleNavegateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
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
    borderRadius: 16,
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
  createOrphanagesButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'
  }
});
