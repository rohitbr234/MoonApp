import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [moonPhase, setMoonPhase] = useState(null);
  const [error, setError] = useState(null);

  const fetchMoonPhaseData = async () => {
    try {
      const response = await axios.get('http://your-api-url.com/tampa');
      setMoonPhase(response.data.astro.moon_phase);
      setError(null);
    } catch (error) {
      console.error('Error fetching the moon phase data', error);
      setError('Error fetching the moon phase data');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moon Phase App</Text>
      <Button title="Get Phase" onPress={fetchMoonPhaseData} />
      {error && <Text style={styles.error}>{error}</Text>}
      {moonPhase && (
        <View style={styles.result}>
          <Text style={styles.resultTitle}>The Current Moon Phase Is:</Text>
          <Text style={styles.resultText}>{moonPhase}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  result: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 16,
  },
});
