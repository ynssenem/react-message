import { auth, database } from "@/firebaseConfig";
import { ChatUserModel } from "@/models/ChatUserModel/ChatUserModel";
import { Box, Text, View } from "@lextdev/core";
import { get, onValue, ref } from "firebase/database";
import { FC, useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import Seperator from "../Mics/Seperator";
import Card from "../Mics/Card";
import { useRouter } from "expo-router";

type ChatListProps = {
  onPressLabel?: () => void;
};

const ChatList: FC<ChatListProps> = ({ onPressLabel }) => {
  const [chatList, setChatList] = useState<ChatUserModel[]>([]);
  const userId = auth.currentUser?.uid ?? "";
  const router = useRouter();
  useEffect(() => {
    fetchChatRooms(userId);
  }, [userId]);

  async function fetchChatRooms(userId: string) {
    const userChatRef = ref(database, `chatUsers/${userId}`);

    onValue(userChatRef, async (snapshot) => {
      if (snapshot.exists()) {
        const chatKeys = snapshot.val() as string[];

        if (chatKeys.length > 0) {
          const promises = chatKeys.map((chatKey) =>
            parseChatKey(chatKey, userId)
          );
          const chatDetails = await Promise.all(promises);
          setChatList(
            chatDetails.filter((detail) => detail) as ChatUserModel[]
          );
        }
      }
    });
  }

  async function parseChatKey(chatKey: string, currentUserId: string) {
    const partnerUserId = chatKey.replace(currentUserId, "").replace("_", "");
    const userRef = ref(database, `users/${partnerUserId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const { email } = snapshot.val();
      return { chatKey, email };
    }
    return null;
  }

  return (
    <Box flex={1}>
      {chatList.length === 0 && (
        <View flex={1} justifyContent="center" alignItems="center">
          <Pressable
            onPress={() => {
              if (onPressLabel) {
                onPressLabel();
              }
            }}
          >
            <Text color="global">
              There is no chat room, <Text>click here</Text> to start a chat
              now.
            </Text>
          </Pressable>
        </View>
      )}

      {chatList.length > 0 && (
        <FlatList
          data={chatList}
          style={{ flex: 1 }}
          ItemSeparatorComponent={Seperator}
          renderItem={({ index, item }) => (
            <Card
              key={index}
              label={item.email}
              onPress={() => {
                router.push({
                  pathname: "/message",
                  params: {
                    chatKey: item.chatKey,
                  },
                });
              }}
            />
          )}
        />
      )}
    </Box>
  );
};

export default ChatList;
