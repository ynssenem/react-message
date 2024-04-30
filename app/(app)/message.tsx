import Seperator from "@/components/Mics/Seperator";
import { auth, database } from "@/firebaseConfig";
import { ChatModel } from "@/models/ChatModel/ChatModel";
import { UserModel } from "@/models/UserModel/UserModel";
import {
  Box,
  Button,
  Group,
  SafeAreaView,
  Stack,
  Text,
  TextInput,
  View,
} from "@lextdev/core";
import { Controller, useForm } from "@lextdev/form";
import { Stack as RNStack, useLocalSearchParams, useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import {
  get,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const TabsMessage = () => {
  const { chatKey } = useLocalSearchParams();
  const users = (chatKey as string).split("_");
  const router = useRouter();
  const [receiver, setReceiver] = useState<UserModel>();
  const slug = `chats/${chatKey}/messages`;
  const messageRef = ref(database, slug);
  const [messages, setMessages] = useState<ChatModel[]>();

  const form = useForm<ChatModel>({
    defaultValues: {
      message: "",
      uid: auth.currentUser?.uid as string,
      timestamp: 0,
    },
  });

  const getUser = async (receiverId: string) => {
    const userRef = ref(database, `users/${receiverId}`);
    try {
      const snapshot = await get(userRef);
      setReceiver(snapshot.val());
    } catch (error) {
      if (error instanceof FirebaseError) {
        Alert.alert("Error", error.message);
      }
      router.push("/(app)/");
    }
  };

  const sendMessage = (data: ChatModel) => {
    const messagePush = push(messageRef);
    set(messagePush, data).then(() => {
      form.reset();
      Keyboard.dismiss();
    });
  };

  const listenChat = () => {
    const messageQuery = query(messageRef, orderByChild("timestamp"));
    onValue(messageQuery, (snapshot) => {
      if (snapshot.exists()) {
        const messagesArray = Object.entries(snapshot.val()).map(
          ([key, value]) =>
            ({
              messageUid: key,
              ...(value as ChatModel),
            } as ChatModel)
        );
        setMessages(messagesArray.reverse());
      } else {
        console.log("No data available");
      }
    });
  };

  const getDateFormat = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  useEffect(() => {
    const receiverId = users.find((user) => user !== auth.currentUser?.uid);
    if (receiverId) {
      getUser(receiverId as string);
    }

    listenChat();
  }, []);

  return (
    <SafeAreaView>
      <RNStack.Screen
        options={{
          headerTitle: receiver?.email.split("@")[0],
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box flex={1}>
          <FlatList
            data={messages}
            style={{ flex: 1 }}
            inverted
            ItemSeparatorComponent={Seperator}
            renderItem={({ index, item }) => {
              const isMe = item.uid === auth.currentUser?.uid;

              return (
                <Group
                  key={index}
                  justifyContent={isMe ? "flex-end" : "flex-start"}
                >
                  <Stack gap={5}>
                    <View
                      padding={10}
                      backgroundColor={isMe ? "primary" : "secondary"}
                      borderRadius={5}
                    >
                      <Text color="inverse">{item.message}</Text>
                    </View>
                    <Text fontSize={10} textAlign="right">
                      {getDateFormat(item.timestamp)}
                    </Text>
                  </Stack>
                </Group>
              );
            }}
          />
          <Group justifyContent="space-between" alignItems="center" gap={10}>
            <View flex={1}>
              <Controller
                name="message"
                control={form.control}
                rules={{
                  required: "Message is required",
                }}
                render={({ field, fieldState }) => (
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Your message..."
                    error={fieldState.error?.message}
                  />
                )}
              />
            </View>
            <View>
              <Button
                label="Send"
                onPress={form.handleSubmit((data) => {
                  sendMessage({
                    ...data,
                    timestamp: Date.now(),
                  });
                })}
              />
            </View>
          </Group>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TabsMessage;
