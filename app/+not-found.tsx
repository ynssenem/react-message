import { SafeAreaView, Text, View } from "@lextdev/core";
import { Link } from "expo-router";

export default function NotFoundScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>This screen doesn't exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}
