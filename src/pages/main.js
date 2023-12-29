import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';


export default function Main() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [searchLat, setSearchLat] = useState('');
  const [searchLng, setSearchLng] = useState('');
  const [showMap, setShowMap] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    if ((isNaN(searchLat) || isNaN(searchLng)) || (!searchLat || !searchLng)){
      setErrorMessage('Por favor, digite números válidos para latitude e longitude.');
    } else {
      setErrorMessage('');
      setLatitude(parseFloat(searchLat));
      setLongitude(parseFloat(searchLng));
      setShowMap(true);
  };
}

  const handleBackToSearch = () => {

    setSearchLat('');
    setSearchLng('');
    setLatitude(null);
    setLongitude(null);
    setShowMap(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {!showMap ? (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={searchLat}
              onChangeText={(text) => setSearchLat(text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={searchLng}
              onChangeText={(text) => setSearchLng(text)}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
        ) : (
          <MapView
            style={{ height: '100%', 
                    width: '100%', 
                    position: 'absolute' }}
                    
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude, longitude }} />
          </MapView>
        )}
      </View>
      {showMap && (
        <View >
          <TouchableOpacity style={styles.buttonBack} onPress={handleBackToSearch}>
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
  },
  input:{
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical:10,
      width: '80%',
  },
  button:{
      backgroundColor: '#3498db',
      borderRadius: 5,
      padding: 10,
      width: '80%',
      alignItems: 'center',
  },

  buttonText:{
      color: '#fff',
      fontWeight: 'bold',
  },
  buttonBack:{
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    margin: 10
  }
});
