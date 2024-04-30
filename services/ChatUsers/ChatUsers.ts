import { database } from "@/firebaseConfig";
import { get, ref, set } from "firebase/database";

export const addChatRoomToUser = (userId: string, newRoomId: string) => {
  const userRoomsRef = ref(database, `chatUsers/${userId}`);

  get(userRoomsRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const existingRooms = snapshot.val() || [];

        if (!existingRooms.includes(newRoomId)) {
          const updatedRooms = [...existingRooms, newRoomId];
          set(userRoomsRef, updatedRooms);
        }
      } else {
        set(userRoomsRef, [newRoomId]);
      }
    })
    .catch((error) => {
      console.error("Error updating chat rooms:", error);
    });
};
