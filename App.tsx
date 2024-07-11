import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import NationalInfoScreen from "./src/screens/NationalInfoScreen";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#028751" },
          headerTintColor: "white",
          drawerActiveTintColor: "#028751",
        }}
      >
        <Drawer.Screen
          name="Know Naija"
          component={HomeScreen}
          // options={{
          //   drawerIcon: ({ color, size, focused }) => (
          //     <Ionicons name="home" color={color} size={size} />
          //   ),
          // }}
        />
        <Drawer.Screen name="National Info" component={NationalInfoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#028751",
    alignItems: "center",
    justifyContent: "center",
  },
});
