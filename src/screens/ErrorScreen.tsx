import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export type ErrorScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ErrorScreenProp {
  navigation: ErrorScreenNavigationProp;
}

const ErrorScreen: React.FC<ErrorScreenProp> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/error.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Internal server error</Text>
      <View style={styles.buttonContainer}>
        <Button 
          mode="elevated" 
          onPress={() => navigation.navigate('home')}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
         Try again
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 400,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: '50%',
  },
  button: {
    backgroundColor: "#9EDF9C",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ErrorScreen;
