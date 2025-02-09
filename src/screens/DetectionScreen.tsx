import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useCameraDevice, useCameraPermission, Camera } from 'react-native-vision-camera'
import NoCameraScreen from './NoCameraScreen'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type DetectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface DetectionScreenProps {
  navigation: DetectionScreenNavigationProp
}

const Detection: React.FC<DetectionScreenProps> = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')
  const camera = useRef<Camera>(null)

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission])

  if (!hasPermission || device == null) {
    return <NoCameraScreen navigation={navigation} />
  }

  const takePicture = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({
          flash: 'auto',
        })
        const file = await camera.current.takePhoto()
        const result = await fetch(`file://${file.path}`)
      } catch (error) {
        console.error('Error al tomar la foto:', error)
      }
    }
  }

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
      />
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Count cash</Text>
      </TouchableOpacity>
    </>
  )
}

export default Detection

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
})
