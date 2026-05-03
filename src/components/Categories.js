import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Image } from "expo-image";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  categories,
  activeCategory,
  handleChangeCategory,
}) {
  if (!categories || categories.length === 0) return null;

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      className="my-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => {
          const isActive = item.strCategory === activeCategory;
          const activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";

          return (
            <TouchableOpacity
              key={item.idCategory}
              onPress={() => handleChangeCategory(item.strCategory)}
              className="flex items-center mr-4">
              <View className={`rounded-full p-[6px] ${activeButtonClass}`}>
                <Image
                  source={item.strCategoryThumb}
                  style={{
                    width: hp(6),
                    height: hp(6),
                    borderRadius: hp(3),
                  }}
                  contentFit="cover"
                  transition={200}
                  cachePolicy="memory-disk"
                />
              </View>

              <Text
                className="text-neutral-600 mt-1"
                style={{ fontSize: hp(1.6) }}>
                {item.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
