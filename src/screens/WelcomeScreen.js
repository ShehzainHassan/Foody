import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100,
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300,
    );
    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-amber-500">
      <StatusBar style="dark" />

      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: ring2padding }}>
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1padding }}>
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      <View className="flex items-center space-y-2">
        <Text
          style={{
            fontSize: hp(7),
            fontWeight: "bold",
            color: "white",
            letterSpacing: 2,
          }}>
          Foody
        </Text>
        <Text
          style={{ fontSize: hp(2), color: "white" }}
          className="font-medium text-white tracking-widest">
          Food is always right
        </Text>
      </View>
    </View>
  );
}
