import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';
import Detection from './screens/DetectionScreen';
import NoCameraScreen from './screens/NoCameraScreen';
import ResultsScreen from './screens/ResultScreen';
import ErrorScreen from './screens/ErrorScreen';

// Definir el tipo para los parámetros de navegación
export type RootStackParamList = {
    home: undefined;
    detect: undefined;
    noCamera: undefined;
    results: {
        imageBase64: string;
        total: number;
        loading: boolean;
    };
    error: undefined
};

// Crear el stack con el tipo definido
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="home" 
                        component={HomeScreen} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="detect" 
                        component={Detection} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="noCamera" 
                        component={NoCameraScreen} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="results" 
                        component={ResultsScreen} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="error" 
                        component={ErrorScreen} 
                        options={{ headerShown: false }} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App

const styles = StyleSheet.create({})