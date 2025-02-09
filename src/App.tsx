import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';
import Detection from './screens/Detection';

export type RootStackParamList = {
    home: undefined;
    detect: undefined;
};

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="detect" component={Detection} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    )
}

export default App

const styles = StyleSheet.create({})