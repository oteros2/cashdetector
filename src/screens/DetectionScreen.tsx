import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useCameraDevice, useCameraPermission, Camera, Templates, useCameraFormat } from 'react-native-vision-camera';
import NoCameraScreen from './NoCameraScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import useWebSocket from '../hooks/useWebSocket';

type DetectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface DetectionScreenProps {
  navigation: DetectionScreenNavigationProp;
}

const Detection: React.FC<DetectionScreenProps> = ({ navigation }) => {
  // Hook para solicitar permiso de la cámara
  const { hasPermission, requestPermission } = useCameraPermission();
  // Hook para acceder a la cámara trasera
  const device = useCameraDevice('back');
   // Referencia a la cámara para acceder a sus métodos
  const camera = useRef<Camera>(null);
  // Hook para obtener el formato de la cámara 
  const format = useCameraFormat(device, Templates.Snapchat);
  // Hook para enviar datos a un servidor a través de WebSocket
  const { data, sendData } = useWebSocket('ws://192.168.1.145:8765', navigation);
  // Hook para almacenar la URI de la foto tomada
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    //Si no hay permiso de cámara, solicitar
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  useEffect(() => {
    if (data) {
      try {
        // Parsear la respuesta del servidor
        const response = JSON.parse(data);
        // Navegar a la pantalla de resultados con la imagen y el total obtenidos
        navigation.navigate('results', {
          imageBase64: response.imagen_base64,
          total: response.total,
          loading: false
        });
      } catch (error) {
        // ir a pantalla de error
        navigation.navigate('error');
      }
    }
  }, [data, navigation]);

  if (!hasPermission || device == null) {
    // Si no hay permiso de cámara o el dispositivo no tiene cámara, mostrar pantalla de no hay cámara
    return <NoCameraScreen navigation={navigation} />;
  }

  // Función para tomar una foto
  const takePicture = async () => {
    if (camera.current) {
      try {
        // Navegar a la pantalla de resultados con la imagen y el total obtenidos
        navigation.navigate('results', {
          imageBase64: '',
          total: 0,
          loading: true
        });
        // Toma una foto y la almacena en la URI
        const photo = await camera.current.takePhoto();
        setPhotoUri(photo.path);
        const response = await fetch(`file://${photo.path}`);
        // Convierte la imagen en un arrayBuffer y la envía al servidor
        const arrayBuffer = await response.arrayBuffer();
        sendData(arrayBuffer);
      } catch (error) {
        // Ir a pantalla de error
        navigation.navigate('error');
      }
    }
  };

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
        format={format}
      />
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Count Cash</Text>
      </TouchableOpacity>
    </>
  );
};

export default Detection;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#9EDF9C',
    padding: 15,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});