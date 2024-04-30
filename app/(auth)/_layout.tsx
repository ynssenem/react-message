import { auth } from "@/firebaseConfig";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

const AuthLayout = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/(app)/");
      }
    });
  }, []);

  return <Stack />;
};

export default AuthLayout;
