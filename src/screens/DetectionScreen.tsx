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
  // Referencia a la cámara
  const camera = useRef<Camera>(null);
  // Hook para obtener el formato de la cámara 
  const format = useCameraFormat(device, Templates.Snapchat);
  // Enviar datos a un servidor a través de WebSocket
  const { sendData } = useWebSocket('ws://172.17.0.1:8765');
  // Estado para almacenar la URI de la foto
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    // Si no hay permiso de cámara, solicitar
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  // Si no hay permiso de cámara o no hay cámara, mostrar pantalla de no hay cámara
  if (!hasPermission || device == null) {
    return <NoCameraScreen navigation={navigation} />;
  }

  // Función para tomar una foto
  const takePicture = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        setPhotoUri(photo.path);

        // Leer el archivo de la foto y convertirlo en binario
        const response = await fetch(`file://${photo.path}`);
        // Converir la respuesta en un ArrayBuffer
        const arrayBuffer = await response.arrayBuffer(); 

        // Enviar la información en binario al servidor
        sendData(arrayBuffer); 
      } catch (error) {
        console.error('Error al tomar la foto:', error);
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
