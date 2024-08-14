import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GovtInfoData } from "../common/GovtInfoTypes";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const Section = ({ title, data, renderItem }: any) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id || item.name}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

// create a component
const GovernmentInfoScreen = () => {
  const [data, setData] = useState<GovtInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  // For Modal Visibility
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setSearchVisible(!searchVisible)}
          style={styles.searchIcon}
        >
          <Ionicons name="search" size={25} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/government-data`);
        const result = await response.json();
        // console.log(result);
        setData(result);
      } catch (err) {
        console.log("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  const handleModalVisibility = (item: any) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const showMasterItem = ({ item }: any) => {
    // console.log(item);

    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return (
        <TouchableOpacity onPress={() => handleModalVisibility(item)}>
          <View style={styles.mastersContainer}>
            <View style={styles.textCover}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </View>

            <Image
              source={{
                uri:
                  item.image ||
                  "https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg",
              }}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  };

  const showPresidentItem = ({ item }: any) => (
    <View style={styles.textCover}>
      <Text style={styles.republicEra}>{item.republic_era}</Text>
      {item.presidents
        .filter((president: any) =>
          president.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((president: any, i: any) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleModalVisibility(president)}
          >
            <View style={styles.mastersContainer}>
              <View>
                <Text style={styles.name}>{president.name}</Text>
                <Text style={styles.year}>{president.year}</Text>
              </View>
              <Image
                source={{
                  uri:
                    president.image ||
                    "https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg",
                }}
                style={styles.image}
              />
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );

  const showMinistersItem = ({ item }: any) => {
    // console.log(item);
    const name = item.name[0] || "";
    const position = item.position[0] || "";

    if (
      name.toLowerCase().includes(search.toLowerCase()) ||
      position.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        <TouchableOpacity onPress={() => handleModalVisibility(item)}>
          <View style={styles.mastersContainer}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.year}>{item.position}</Text>
            </View>
            <Image
              source={{
                uri:
                  item.image ||
                  "https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg",
              }}
              style={styles.image}
            />
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* For the search input */}
      {searchVisible && (
        <View>
          <TextInput
            placeholder="Search by name or position..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      )}

      {/* For The Colonial Masters */}
      <Section
        title={data?.colonial_masters.title}
        data={data?.colonial_masters.masters}
        renderItem={showMasterItem}
      />

      {/* For Past Presidents */}
      <Section
        title={data?.past_presidents.title}
        data={data?.past_presidents.eras}
        renderItem={showPresidentItem}
      />

      {/* For Tiers of Government */}
      <Section
        title="The Three Tiers of Government"
        data={data?.tiers_of_govt.tier}
        renderItem={({ item }: any) => (
          <View style={styles.textCover}>
            <Text>{item}</Text>
          </View>
        )}
      />

      {/* For the Ministers */}
      <Section
        title={data?.ministers_and_portfolios.title}
        data={data?.ministers_and_portfolios.minister}
        renderItem={showMinistersItem}
      />

      {/* The Modal For Displaying Selected Item */}
      {selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{
                  uri:
                    selectedItem.image ||
                    "https://i.ibb.co/Ch0KY50/default-avatar-photo-placeholder-profile-icon-vector.jpg",
                }}
                style={styles.modalImage}
              />

              <Text style={styles.modalName}>{selectedItem.name}</Text>
              {selectedItem.year && (
                <Text style={styles.modalYear}>{selectedItem.year}</Text>
              )}

              {/* For modal with positions */}
              {selectedItem.position && (
                <Text style={styles.modalYear}>{selectedItem?.position}</Text>
              )}

              <Pressable
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  searchInput: {
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
    // margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  searchIcon: {
    marginRight: 15,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },

  mastersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  textCover: {},

  republicEra: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },

  name: {
    fontSize: 16,
  },

  year: {
    fontSize: 14,
  },

  modalPosition: {
    fontSize: 14,
  },

  image: {
    width: 80,
    height: 80,
    marginTop: 1,
  },

  // For Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },

  modalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  modalYear: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },

  closeButton: {
    backgroundColor: "#028751",
    padding: 10,
    borderRadius: 5,
  },

  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

//make this component available to the app
export default GovernmentInfoScreen;
