import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";


const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  //   React.useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerTitle: () => (
  //         <TextInput
  //           placeholder="Search for past governments..."
  //           value="search"
  //           onChangeText={setSearch}
  //           style={styles.searchInput}
  //         />
  //       ),
  //     });
  //   }, [navigation, search]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Nigeria_Flag_and_CoA.jpeg")}
        style={{ width: 100, height: 100, borderRadius: 100 }}
      />

      <Text style={styles.title}>Know Naija</Text>
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
    marginTop: 10,
  },

  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "80%", // Adjust the width as necessary
  },
});

//make this component available to the app
export default HomeScreen;
