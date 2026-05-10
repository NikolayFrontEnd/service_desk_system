import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  role: string;
};

const MainPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <h1>Main page</h1>

      <p>User ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default MainPage;