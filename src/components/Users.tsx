import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";

interface User {
  id: number;
  username: string;
  email: string;
}

const getUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("failed");
  return res.json();
};

const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("failed");
  return res.json();
};

export default function Users() {
  const { id } = useParams();

  const listQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  if (listQuery.isLoading) return <p>Загрузка</p>;
  if (listQuery.isError) return <p>{listQuery.error?.message}</p>;

  return (
    <div>
      <ul>
        {listQuery.data?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>

      {id && userQuery.data && (
        <div>
          <h3>Выбранный: {userQuery.data.username}</h3>
          <p>{userQuery.data.email}</p>
        </div>
      )}
    </div>
  );
}
