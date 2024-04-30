import { Stack, Text, View } from "@lextdev/core";
import { ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Stack gap={10} alignItems="center">
        <ActivityIndicator />
        <Text textAlign="center">Loading...</Text>
      </Stack>
    </View>
  );
};

export default Loading;
