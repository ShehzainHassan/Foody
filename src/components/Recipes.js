import { FlatList, Image, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Loading from "./Loading";

export default function Recipes({ meals }) {
  return (
    <View className="mx-4 mt-4 flex-1">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600 mb-3">
        Recipes
      </Text>

      {meals.length > 0 ? (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item, index }) => (
            <RecipeCard recipe={item} index={index} />
          )}
        />
      ) : (
        <Loading size="large" className="mt-20" />
      )}
    </View>
  );
}

const RecipeCard = ({ recipe, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600)}
      className="mb-4"
      style={{ width: "48%" }}>
      <Pressable>
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(30),
            borderRadius: hp(2),
          }}
        />

        <Text
          style={{ fontSize: hp(1.7) }}
          className="font-semibold mt-2 text-neutral-600">
          {recipe.strMeal.length > 20
            ? recipe.strMeal.substring(0, 20) + "..."
            : recipe.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
