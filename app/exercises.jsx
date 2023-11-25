import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchExercisesByBodyPart } from "../api/exerciseDb";
import { dummyExercises } from "../constants/image";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import ExerciseList from "../components/exerciseList";
import { ScrollView } from "react-native-virtualized-view";

const Exercises = () => {
  const router = useRouter();
  const [exercises, setexercises] = useState([]);
  const item = useLocalSearchParams();
  //console.log("Data:", item);
  //console.log("DataPass:", exercises);

  useEffect(() => {
    if (item) getExercises(item.name);
  }, [item]);

  const getExercises = async (bodyPart) => {
    let data = await fetchExercisesByBodyPart(bodyPart);
    //console.log("Data Gotten:", data);
    setexercises(data);
  };
  return (
    <ScrollView>
      <StatusBar style="light" />
      <Image
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[40px]"
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-rose-500 mx-4 absolute flex justify-center items-center pr-1 rounded-full"
        style={{ height: hp(5.5), width: hp(5.5), marginTop: hp(7) }}
      >
        <Ionicons name="caret-back-outline" size={hp(3)} color={"#fff"} />
      </TouchableOpacity>

      {/* Exercises Body */}
      <View className="mx-4 mt-4 space-y-3">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          {item.name} exercises
        </Text>
        <View className="mb-10">
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Exercises;
