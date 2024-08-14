import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import NationalInfoScreen from "./src/screens/NationalInfoScreen";
import { Ionicons } from "@expo/vector-icons";
import GovernmentInfoScreen from "./src/screens/GovermentInfoScreen";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import HistoryScreen from "./src/screens/HistoryScreen";
import ImportantDaysScreen from "./src/screens/ImportantDaysScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: "#028751" },
          headerTintColor: "white",
          drawerActiveTintColor: "#028751",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.drawerIcon}
            >
              <Ionicons name="menu" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        })}
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Know Naija" component={HomeScreen} />
        <Drawer.Screen name="Government" component={GovernmentInfoScreen} />
        <Drawer.Screen name="History" component={HistoryScreen} />
        <Drawer.Screen
          name="National Information"
          component={NationalInfoScreen}
        />
        <Drawer.Screen name="Important Days" component={ImportantDaysScreen} />
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

  drawerIcon: {
    marginLeft: 10,
  },
});
