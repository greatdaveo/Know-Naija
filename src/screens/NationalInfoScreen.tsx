import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NationalInfoTypes } from "../common/NationalInfoTypes";
import { API_URL } from "@env";

const TextSection = ({ title, content }: any) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const ArraySection = ({ title, content }: any) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {content.map((item: any, i: number) => (
        <View key={i}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const NigeriaInfoComponent = () => {
  const [data, setData] = useState<NationalInfoTypes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/nigeria-info`);
        const result = await response.json();
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

  return (
    <ScrollView style={styles.container}>
      <TextSection title="Origin" content={data?.origin} />
      <TextSection title="National Anthem" content={data?.nationalAnthem} />
      <TextSection title="The Pledge" content={data?.thePledge} />
      <TextSection title="National Prayers" content={data?.nationalPrayers} />
      <TextSection title="NYSC Anthem" content={data?.nyscAnthem} />

      <ArraySection title="Coat Of Arms" content={data?.coatOfArms} />
      <ArraySection title="Nigeria Flag" content={data?.nigerianFlag} />
      <ArraySection
        title="Facts About Nigeria"
        content={data?.factAboutNigeria}
      />
      <ArraySection
        title="Annual Celebration"
        content={data?.annualCelebration}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  text: {
    fontSize: 16,
    marginVertical: 5,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default NigeriaInfoComponent;
