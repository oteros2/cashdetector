import React from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

// Usar NativeStackScreenProps para definir las props de la pantalla
type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'results'>;

const ResultsScreen: React.FC<ResultsScreenProps> = ({ navigation, route }) => {
    // Recibe del servidor la imagen y el total
  const { imageBase64, total, loading } = route.params;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#9EDF9C" />
      ) : (
        <>
          <Image
            source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.resultContainer}>
            <Text style={styles.totalLabel}>Total Cash:</Text>
            <Text style={styles.totalCash}>{total}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="elevated"
              onPress={() => navigation.navigate('detect')}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              Scan Again
            </Button>
          </View>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 24,
    marginBottom: 10,
  },
  totalCash: {
    color: '#9EDF9C',
    fontSize: 36,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '50%',
  },
  button: {
    backgroundColor: '#9EDF9C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;