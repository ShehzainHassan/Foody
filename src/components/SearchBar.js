import { Feather } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function SearchBar() {
  return (
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
  );
}
