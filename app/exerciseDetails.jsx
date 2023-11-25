import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Anticons from "react-native-vector-icons/AntDesign";
import Animated, { FadeInDown } from "react-native-reanimated";

const ExerciseDetails = () => {
  const item = useLocalSearchParams();
  const router = useRouter();
  //console.log("Data:", item);
  return (
    <View className={`flex flex-1`}>
      <View className={`shadow-md bg-neutral-200 rounded-b-[40px]`}>
        <Image
          source={{ uri: item.gifUrl }}
          contentFit="cover"
          style={{ width: wp(100), height: wp(100) }}
          className={`rounded-b-[40px]`}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        className={`mx-2 absolute rounded-full mt-2 right-0`}
      >
        <Anticons name="closecircle" size={hp(4.5)} color={"#f43f5e"} />
      </TouchableOpacity>

      {/* Details of Exercise */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
        className={`mx-4 space-y-2 mt-3`}
      >
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={{ fontSize: hp(3.5) }}
          className={`text-semibold tracking-wide text-neutral-800`}
        >
          {item.name}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          style={{ fontSize: hp(2) }}
          className={`tracking-wide text-neutral-600`}
        >
          Equipment:{" "}
          <Text className={`font-bold text-neutral-800`}>
            {item?.equipment}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(300).springify()}
          style={{ fontSize: hp(2) }}
          className={`tracking-wide text-neutral-600`}
        >
          Secondary Muscle:{" "}
          <Text className={`font-bold text-neutral-800`}>
            {item?.secondaryMuscles}
          </Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          style={{ fontSize: hp(2) }}
          className={`tracking-wide text-neutral-600`}
        >
          Target Muscle:{" "}
          <Text className={`font-bold text-neutral-800`}>{item?.target}</Text>
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(400).duration(300).springify()}
          style={{ fontSize: hp(3) }}
          className={`text-semibold tracking-wide text-neutral-800`}
        >
          Instructions:
        </Animated.Text>
        {item.instructions.split(",").map((instruction, index) => {
          return (
            <Animated.Text
              entering={FadeInDown.delay((index + 5) * 100)
                .duration(300)
                .springify()}
              key={instruction}
              style={{ fontSize: hp(1.7) }}
              className={`text-neutral-800`}
            >
              {instruction}
            </Animated.Text>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ExerciseDetails;
