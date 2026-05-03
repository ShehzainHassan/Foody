import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Categories from "../components/Categories";
import Header from "../components/Header";
import RecipeCard from "../components/Recipes";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView className="flex-1 bg-white px-4">
      <StatusBar style="dark" />
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <>
            <Header />
            <SearchBar />
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          </>
        }
        renderItem={({ item, index }) => (
          <RecipeCard recipe={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
}
