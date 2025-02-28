import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { RootStackParamList } from "../App";
import { Button } from "react-native-paper";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const detectButtonPress = () => {
    navigation.navigate("detect");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Cash Detector</Text>

      <View style={styles.buttonContainer}>
        <Button 
        mode="elevated" 
        onPress={() => detectButtonPress()}
        style={styles.button}
        labelStyle={styles.buttonText}
        >
          Detect Cash
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
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
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

export default HomeScreen;