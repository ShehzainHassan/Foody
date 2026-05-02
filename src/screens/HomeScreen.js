import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "../components/Recipes";
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    getRecipes(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php",
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log("Error fetching recipes:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14">
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{
              width: heightPercentageToDP(5),
              height: heightPercentageToDP(5),
            }}
          />
          <Feather name="bell" size={heightPercentageToDP(4)} color="gray" />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text
            style={{ fontSize: heightPercentageToDP(1.7) }}
            className="text-neutral-600">
            Hello, John!
          </Text>
          <View>
            <Text
              style={{ fontSize: heightPercentageToDP(3.8) }}
              className="font-semibold text-neutral-600">
              Make your own food,
            </Text>
            <Text
              style={{ fontSize: heightPercentageToDP(3.8) }}
              className="font-semibold text-neutral-600">
              stay at <Text className="text-amber-400">home</Text>
            </Text>
          </View>
        </View>

        <View className="mt-4 mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={{ fontSize: heightPercentageToDP(1.7) }}
            className="flex-1 text-base pl-3 tracking-wider"
          />

          <Feather
            name="search"
            size={heightPercentageToDP(2.5)}
            color="gray"
            className="bg-white p-3 rounded-full"
          />
        </View>

        {categories.length > 0 && (
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        )}
        <Recipes meals={meals} categories={categories} />
      </ScrollView>
    </View>
  );
}
