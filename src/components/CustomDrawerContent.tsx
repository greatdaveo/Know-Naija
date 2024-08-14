import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
  const [search, setSearch] = useState("");

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // // backgroundColor: "#2c3e50",
    padding: 10,
  },

  searchInput: {},
});

export default CustomDrawerContent;
