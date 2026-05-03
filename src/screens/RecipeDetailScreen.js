import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import YouTubeIframe from "react-native-youtube-iframe";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";
export default function RecipeDetailScreen(props) {
  const { recipe: item } = props.route.params;
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeDetails(item.idMeal);
  }, []);

  const getRecipeDetails = async (id) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      if (response?.data?.meals) {
        setMeal(response.data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setLoading(false);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    const indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}>
      <StatusBar style="dark" />

      <View className="flex-row justify-center">
        <Image
          source={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 40,
            marginTop: 4,
          }}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
          sharedTransitionTag={`recipe-${item.idMeal}`}
        />
      </View>

      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white">
          <Feather name="chevron-left" size={hp(3.5)} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full mr-5 bg-white">
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={hp(3.5)}
            color={isFavorite ? "red" : "#4B5563"}
          />
        </TouchableOpacity>
      </Animated.View>

      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 pt-8 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(700)}
            className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-700">
              {meal?.strMeal}
            </Text>

            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium text-neutral-500">
              {meal?.strArea}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(700)}
            className="flex-row justify-around mt-4">
            <View className="items-center bg-amber-300 p-3 rounded-full">
              <View
                style={{ width: hp(6), height: hp(6) }}
                className="bg-white rounded-full items-center justify-center">
                <Feather name="clock" size={hp(3)} color="#4B5563" />
              </View>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700">
                30
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700">
                Mins
              </Text>
            </View>
            <View className="items-center bg-amber-300 p-3 rounded-full">
              <View
                style={{ width: hp(6), height: hp(6) }}
                className="bg-white rounded-full items-center justify-center">
                <Feather name="users" size={hp(3)} color="#4B5563" />
              </View>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700">
                03
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700">
                Servings
              </Text>
            </View>
            <View className="items-center bg-amber-300 p-3 rounded-full">
              <View
                style={{ width: hp(6), height: hp(6) }}
                className="bg-white rounded-full items-center justify-center">
                <AntDesign name="fire" size={24} color="black" />
              </View>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700">
                103
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700">
                Calories
              </Text>
            </View>
            <View className="items-center bg-amber-300 p-3 rounded-full">
              <View
                style={{ width: hp(6), height: hp(6) }}
                className="bg-white rounded-full items-center justify-center">
                <Feather name="activity" size={hp(3)} color="#4B5563" />
              </View>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-neutral-700"></Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="font-bold text-neutral-700">
                Easy
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.delay(200).duration(700)}
            className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-neutral-700">
              Ingredients
            </Text>

            <View className="space-y-3 mt-2">
              {ingredientsIndexes(meal).map((index) => {
                return (
                  <View key={index} className="flex-row items-center space-x-3">
                    <View
                      style={{ width: hp(1.2), height: hp(1.2) }}
                      className="bg-amber-400 rounded-full"
                    />

                    <View className="flex-row flex-wrap">
                      <Text
                        style={{ fontSize: hp(2) }}
                        className="font-semibold text-neutral-700">
                        {meal["strMeasure" + index]}
                      </Text>

                      <Text
                        style={{ fontSize: hp(2) }}
                        className="text-neutral-600 ml-1">
                        {meal["strIngredient" + index]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(300).duration(700)}>
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-neutral-700">
              Instructions
            </Text>

            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {meal?.strYoutube && getYouTubeVideoId(meal.strYoutube) && (
            <Animated.View entering={FadeIn.delay(400).duration(700)}>
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold text-neutral-700 mb-2">
                Video Recipe
              </Text>

              <YouTubeIframe
                height={hp(30)}
                videoId={getYouTubeVideoId(meal.strYoutube)}
              />
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
