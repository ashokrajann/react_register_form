import { useState, useEffect } from "react"
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";

function Users() {

  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", { signal: controller.signal })
        console.log(response.data);

        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();

    return (() => {
      isMounted = false;
      controller.abort();
    })

  }, [])

  return (
    <article>
      <h2>Users</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, index) => (<li key={index}>{user?.username}</li>))}
          </ul>
        ) : (
          <p>No users to display!</p>
        )
      }
    </article>
  )
}

export { Users }