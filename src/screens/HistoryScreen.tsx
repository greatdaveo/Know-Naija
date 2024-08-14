import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { API_URL } from "@env";
import { HistoryInfoData } from "../common/HistoryInfoTypes";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Section = ({ title, data, renderItem }: any) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const HistoryScreen = () => {
  const [data, setData] = useState<HistoryInfoData | null>(null);
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
        const response = await fetch(`${API_URL}/api/v1/history-info`);
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

  // console.log(data);

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

  // To handle modal
  const handleModalVisibility = (item: any) => {};

  const showHistory = ({ item }: any) => {
    if (
      item.date.toLowerCase().includes(search.toLowerCase()) ||
      item.event.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        <View>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.event}>{item.event}</Text>
        </View>
      );
    }

    return null;
  };

  const showSenatePresidents = ({ item }: any) => {
    if (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.term.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        <TouchableOpacity onPress={() => handleModalVisibility(item)}>
          <View style={styles.mastersContainer}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.term}>{item.term}</Text>
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

  const showHouseOfRepSpeakers = ({ item }: any) => {
    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return (
        <TouchableOpacity onPress={() => handleModalVisibility(item)}>
          <View style={styles.mastersContainer}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
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

  const showStateCreation = ({ item }: any) => {
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.event}>{item.details}</Text>
      </View>
    );
  };

  const showNigeriaCurrency = ({ item }: any) => {
    if (
      item.date.toLowerCase().includes(search.toLowerCase()) ||
      item.event.toLowerCase().includes(search.toLowerCase()) ||
      item.details.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: "gray" }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.event}>{item.details}</Text>
        </View>
      );
    }

    return null;
  };

  const showFuelPrice = ({ item }: any) => {
    if (
      item.leader.toLowerCase().includes(search.toLowerCase()) ||
      item.year.toLowerCase().includes(search.toLowerCase()) ||
      item.price_change.toLowerCase().includes(search.toLowerCase())
    ) {
      return (
        <View style={styles.fuelContainer}>
          <Text style={styles.leader}>Leader: {item.leader}</Text>
          <Text style={styles.year}>Year: {item.year}</Text>
          <Text style={styles.priceChange}>
            Price Change: {item.price_change}
          </Text>
          <Text style={styles.percentageIncrease}>
            Percentage Increase: {item.percentage_increase}
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* For the search input */}
      {searchVisible && (
        <View style={styles.searchInputCover}>
          <TextInput
            placeholder="Search by name or position..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      )}

      <Section
        title="Historical Events Since 2009"
        data={data?.historical_events_since_2009}
        keyExtractor={data?.historical_events_since_2009}
        renderItem={showHistory}
      />

      <Section
        title="Senate Presidents Since 2009"
        data={data?.senate_presidents_since_1960}
        renderItem={showSenatePresidents}
      />

      <Section
        title="Speakers of theHouse of Representative"
        data={data?.speakers_of_the_house_of_rep_since_1960}
        renderItem={showHouseOfRepSpeakers}
      />

      <Section
        title="State Creation History"
        data={data?.state_creation_in_nigeria}
        renderItem={showStateCreation}
      />

      <Section
        title="History of Fuel Price"
        data={data?.history_of_fuel_price_increase}
        keyExtractor={data?.history_of_fuel_price_increase}
        renderItem={showFuelPrice}
      />

      <Section
        title="History of Nigeria Currency"
        data={data?.history_of_nigerian_currency}
        keyExtractor={data?.history_of_nigerian_currency}
        renderItem={showNigeriaCurrency}
      />

      <View>
        <Text style={styles.title}>
          Number of Elected Representative in Political Offices
        </Text>
        <View>
          <Text style={styles.event}>
            <Text style={styles.subTitle}>President:</Text>{" "}
            {data?.numbers_of_elected_rep_in_political_offices.president}
          </Text>
          <Text style={styles.event}>
            <Text style={styles.subTitle}>Governors:</Text>{" "}
            {data?.numbers_of_elected_rep_in_political_offices.governors}
          </Text>
          <Text style={styles.event}>
            <Text style={styles.subTitle}>National Assembly:</Text>{" "}
            {
              data?.numbers_of_elected_rep_in_political_offices
                .national_assembly
            }
          </Text>
          <Text style={styles.event}>
            <Text style={styles.subTitle}>LGA Chairman:</Text>{" "}
            {
              data?.numbers_of_elected_rep_in_political_offices
                .local_government_chairmen
            }
          </Text>
          <Text style={styles.event}>
            <Text style={styles.subTitle}>Councilors:</Text>{" "}
            {data?.numbers_of_elected_rep_in_political_offices.councilors}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputCover: {
    marginBottom: 5,
  },

  searchInput: {
    height: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    // paddingVertical: 20,
    width: "100%",
    // margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  searchIcon: {
    marginRight: 15,
  },

  container: {
    padding: 16,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: "gray",
    fontWeight: "bold",
  },

  date: {
    fontSize: 16,
    marginBottom: 4,
    color: "gray",
    fontWeight: "bold",
  },

  event: {
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 8,
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  // For Senate Presidents
  mastersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  name: {
    fontSize: 16,
  },

  term: {
    fontSize: 16,
  },

  image: {
    width: 80,
    height: 80,
    marginTop: 1,
  },

  // For fuel
  fuelContainer: {
    padding: 5,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },

  leader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
  },

  year: {
    fontSize: 18,
    // fontStyle: "italic",
    color: "#34495E",
    marginBottom: 8,
  },

  priceChange: {
    fontSize: 16,
    color: "#E74C3C",
    marginBottom: 8,
  },

  percentageIncrease: {
    fontSize: 16,
    color: "#27AE60",
  },
});

export default HistoryScreen;
