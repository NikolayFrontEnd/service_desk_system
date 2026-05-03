import axios from "axios";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};
function App() {
const [data, setData] = useState<User[]>([]);
 useEffect(() => {
    axios.get<User[]>('http://localhost:3000/testing')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, [])

  return (
    <>
{
  data.map((user: User) => (
    <div key={user.id}>
      <p>{user.name}</p>
    </div>
  ))
}
    </>
  )
}

export default App
