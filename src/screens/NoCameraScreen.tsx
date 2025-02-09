import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type NoCameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface NoCameraScreenProps {
  navigation: NoCameraScreenNavigationProp;
}

const NoCameraScreen: React.FC<NoCameraScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/no_camera.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>No Camera Found</Text>
      <Text style={styles.subtitle}>Please check your camera connection or accept camera permissions and try again.</Text>
      <View style={styles.buttonContainer}>
        <Button 
          icon="arrow-left" 
          mode="elevated" 
          onPress={() => navigation.goBack()}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Go Back
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
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#B0B0B0",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
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

export default NoCameraScreen;
