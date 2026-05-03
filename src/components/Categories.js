import { Image, ScrollView, TouchableOpacity, View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { categoryData } from "../constants";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  if (!categories || categories.length === 0) {
    return null;
  }
  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {categories.map((item, index) => {
          const isActive = item.strCategory === activeCategory;
          const activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(item.strCategory)}
              className="flex items-center space-y-1 mr-4">
              <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                <Image
                  source={{ uri: item.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>

              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
