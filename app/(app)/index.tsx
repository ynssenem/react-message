import ChatList from "@/components/Layout/ChatList";
import { auth, generateChatKey } from "@/firebaseConfig";
import useUsers from "@/hooks/useUsers/useUsers";
import { addChatRoomToUser } from "@/services/ChatUsers/ChatUsers";
import { Box, Group, SafeAreaView, Select, Text, View } from "@lextdev/core";
import { Stack as RNStack, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import {
  ArrowLeftIcon,
  PowerIcon,
  UsersIcon,
} from "react-native-heroicons/outline";

const TabsIndex = () => {
  const [selectVisible, setSelectVisible] = useState(false);
  const router = useRouter();
  const { users } = useUsers();

  return (
    <SafeAreaView>
      <Select
        visible={selectVisible}
        header={
          <Box>
            <Pressable onPress={() => setSelectVisible(false)}>
              <Group alignItems="center" gap={10}>
                <ArrowLeftIcon size={18} color={"black"} />
                <Text color="global">Close</Text>
              </Group>
            </Pressable>
          </Box>
        }
        data={users.map((user) => ({
          label: user.email,
          value: user.uid,
        }))}
        onChange={(value) => {
          setSelectVisible(false);
          const chatKey = generateChatKey(value);
          addChatRoomToUser(auth.currentUser?.uid || "", chatKey);
          router.push({
            pathname: "/message",
            params: {
              chatKey,
            },
          });
        }}
      />
      <RNStack.Screen
        options={{
          headerTitle: "Welcome",
          headerLeft: () => (
            <Pressable onPress={() => auth.signOut()}>
              <PowerIcon color={"black"} />
            </Pressable>
          ),
        }}
      />

      <ChatList onPressLabel={() => setSelectVisible(true)} />

      <View position="absolute" bottom={"5%"} right={"5%"}>
        <Pressable onPress={() => setSelectVisible(true)}>
          <View
            height={55}
            width={55}
            borderRadius={100}
            backgroundColor="primary"
            justifyContent="center"
            alignItems="center"
            shadowColor={"black"}
            shadowOffset={{ width: 0, height: 2 }}
            shadowRadius={5}
            shadowOpacity={0.3}
          >
            <UsersIcon size={28} color={"white"} />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TabsIndex;
