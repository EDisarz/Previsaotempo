import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const API_KEY = '671ff1bb08855dbb09163633c512dd76'; // Substitua com sua chave de API do OpenWeatherMap

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const weatherIcon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
      setWeatherData({
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: weatherIcon,
      });
      setError('');
    } catch (error) {
      setError('Cidade não encontrada. Verifique o nome e tente novamente.');
      setWeatherData(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        onChangeText={setCity}
        value={city}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.buttonText}>Buscar Previsão</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Temperatura: {weatherData.temp}°C</Text>
          <Text style={styles.weatherText}>Clima: {weatherData.description}</Text>
          <Image source={{ uri: weatherData.icon }} style={styles.weatherIcon} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default App;
