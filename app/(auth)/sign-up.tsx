import Loading from "@/components/Layout/Loading/Loading";
import { auth, database } from "@/firebaseConfig";
import { Stack, useLocalSearchParams } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useEffect } from "react";
import { Alert } from "react-native";

const AuthSignUp = () => {
  const { email, password } = useLocalSearchParams();

  const onHandleCreateSubmit = async () => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );

      if (credential) {
        await set(ref(database, `users/${credential.user.uid}`), {
          email: credential.user.email,
          uid: credential.user.uid,
        });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        Alert.alert("Error", error.message);
      }
    }
  };

  useEffect(() => {
    onHandleCreateSubmit();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Loading />
    </>
  );
};

export default AuthSignUp;
