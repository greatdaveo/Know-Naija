import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { API_URL } from "@env";
import { HistoryInfoData } from "../common/HistoryInfoTypes";

const HistoryScreen = () => {
  const [data, setData] = useState<HistoryInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/history-info`);
        const result = await response.json();

        // console.log(result);
        setData(result);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setData]);

  // const { numbers_of_elected_rep_in_political_offices } = data;

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data?.numbers_of_elected_rep_in_political_offices}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <Text>{item.president}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

//make this component available to the app
export default HistoryScreen;
