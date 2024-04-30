import { Box, Button, SafeAreaView, TextInput, View } from "@lextdev/core";
import { Controller, useForm, useResolver } from "@lextdev/form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableNativeFeedback,
} from "react-native";
import { EnvelopeIcon } from "react-native-heroicons/outline";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useRouter } from "expo-router";

const PREFIX_PASSWORD = "react_";

const AuthSignIn = () => {
  const { validate, validateResolver } = useResolver();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const schema = validate.object({
    email: validate.string().email().required(),
  });

  const form = useForm({
    defaultValues: {
      email: "yunussenem@cloud.com",
    },
    resolver: validateResolver(schema),
  });

  const createPassword = () => {
    return `${PREFIX_PASSWORD}${form.getValues("email").replace(/[@.]/g, "")}`;
  };

  const onHandleSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    const password = createPassword();

    try {
      await signInWithEmailAndPassword(auth, data.email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-credential") {
          router.push({
            pathname: "/sign-up",
            params: {
              email: data.email,
              password,
            },
          });
        }
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <SafeAreaView>
      <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
        <Box flex={1} gap={25}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Email Address"
                left={<EnvelopeIcon size={24} color={"black"} />}
                placeholder="yourname@exmaple.com"
                editable={!loading}
                autoCapitalize="none"
                keyboardType="email-address"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />

          <View>
            <Button
              label="Sign in"
              left={loading && <ActivityIndicator color={"white"} />}
              onPress={onHandleSubmit}
            />
          </View>
        </Box>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
};

export default AuthSignIn;
