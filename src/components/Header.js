import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function Header({ title }) {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-2">
        <Image
          source={require("../../assets/images/welcome.png")}
          style={{
            width: heightPercentageToDP(5),
            height: heightPercentageToDP(5),
          }}
          contentFit="contain"
          transition={200}
          cachePolicy="memory-disk"
        />
        <Feather name="bell" size={heightPercentageToDP(4)} color="gray" />
      </View>
      <View className="space-y-2 mb-2">
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
    </View>
  );
}
