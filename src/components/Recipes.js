import { Image, Pressable, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function RecipeCard({ recipe, index }) {
  const navigation = useNavigation();

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(600)}
      className="mb-4"
      style={{ width: "48%" }}>
      <Pressable
        onPress={() => navigation.navigate("RecipeDetail", { ...recipe })}>
        {/* Image */}
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 === 0 ? hp(25) : hp(30),
            borderRadius: hp(2),
          }}
        />

        {/* Title */}
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
}
