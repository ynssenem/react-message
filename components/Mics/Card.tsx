import { ChatUserModel } from "@/models/ChatUserModel/ChatUserModel";
import { Box, Group, Text, View } from "@lextdev/core";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Pressable } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";

type CardProps = {
  label: string;
  onPress?: () => void;
};

const Card: FC<CardProps> = ({ label, onPress }) => {
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <Box backgroundColor="muted" padding={10}>
        <Group justifyContent="space-between" alignItems="center" gap={10}>
          <View
            height={40}
            width={40}
            borderRadius={100}
            backgroundColor="background"
          />
          <Text flex={1} color="global">
            {label}
          </Text>
          <ArrowRightIcon color={"black"} />
        </Group>
      </Box>
    </Pressable>
  );
};

export default Card;
