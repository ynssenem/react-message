import { auth, database } from "@/firebaseConfig";
import { UserModel } from "@/models/UserModel/UserModel";
import { onValue, ref, get, query, child } from "firebase/database";
import { useEffect, useState } from "react";

const useUsers = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const refetch = () => {
    setUsers([]);
    const databaseRef = ref(database);
    get(child(databaseRef, `users/`)).then((snapshot) => {
      snapshot.forEach((child) => {
        if (auth.currentUser?.uid === child.key) {
          return;
        }
        setUsers((prev) => [
          ...prev,
          {
            uid: child.key,
            email: child.val().email,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    users,
    refetch,
  };
};

export default useUsers;
