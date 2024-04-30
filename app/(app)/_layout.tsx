import { auth } from "@/firebaseConfig";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AppLayout = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/sign-in");
      }
    });
  }, []);

  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    />
  );
};

export default AppLayout;
