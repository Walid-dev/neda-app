import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchUserById } from "@/data/users";
import { User } from "@/types/types";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      fetchUserById(Number(id))
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>{user.id}</h3>
      <p>{user.email}</p>
      <button onClick={() => router.back()}>Go back</button>
    </div>
  );
};

export default UserPage;
