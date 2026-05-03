import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import Categories from "../components/Categories";
import Header from "../components/Header";
import RecipeCard from "../components/Recipes";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  // ✅ Debounced search
  useEffect(() => {
    const delay = setTimeout(() => {
      searchRecipes(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  // ---------------- CATEGORY ----------------
  const handleChangeCategory = (category) => {
    setActiveCategory(category);
    setQuery("");
    setNotFound(false);
    setIsSearching(false);
    getRecipes(category);
  };

  // ---------------- CATEGORIES API ----------------
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php",
      );

      setCategories(response?.data?.categories || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // ---------------- CATEGORY RECIPES ----------------
  const getRecipes = async (category = "Beef") => {
    try {
      setLoading(true);
      setNotFound(false);

      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );

      setMeals(response?.data?.meals || []);
    } catch (error) {
      console.log("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SEARCH RECIPES ----------------
  const searchRecipes = async (text) => {
    if (!text) {
      setIsSearching(false);
      setNotFound(false);
      getRecipes(activeCategory);
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);
      setNotFound(false);

      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`,
      );

      const data = response?.data?.meals;

      if (!data) {
        setMeals([]);
        setNotFound(true);
      } else {
        setMeals(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RENDER ITEM ----------------
  const renderItem = ({ item, index }) => {
    return <RecipeCard recipe={item} index={index} />;
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
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Header />
            <SearchBar query={query} setQuery={setQuery} />
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
              isSearching={isSearching}
            />
          </>
        }
        ListEmptyComponent={
          loading ? (
            <Loading size="large" className="mt-10" />
          ) : notFound ? (
            <View className="mt-10 items-center">
              <Text className="text-gray-500 text-base">
                No recipe found for "{query}"
              </Text>
            </View>
          ) : (
            <View className="mt-10 items-center">
              <Text className="text-gray-400">Start searching 🍳</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}
