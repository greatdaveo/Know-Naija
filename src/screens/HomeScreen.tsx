import { View, Text, StyleSheet, Image } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Know Naija</Text>

      <Image
        source={require("../../assets/images/Nigeria_Flag_and_CoA.jpeg")}
        style={{ width: 100, height: 100, borderRadius: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
    color: "#028751",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

//make this component available to the app
export default HomeScreen;
