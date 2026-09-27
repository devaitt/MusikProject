import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
}

// interface QueryKeyArg {
//   queryKey: [string, string];
// }

const getUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("failed");
  return res.json();
};

const getUser = async ({ queryKey }): Promise<User> => {
  const id = queryKey[1];
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) throw new Error("failed");
  return res.json();
};

const createUser = async ({ username, email }) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email }),
  });

  if (!res.ok) throw new Error("failed to create");

  return res.json();
};

export default function Users() {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: getUser,
    enabled: !!id,
  });

  const usersMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    onError: () => console.log("mutation error"),
  });

  if (listQuery.isLoading) return <p>Загрузка</p>;
  if (listQuery.isError) return <p>{listQuery.error?.message}</p>;

  return (
    <div>
      <button
        onClick={() =>
          usersMutation.mutate({ username: "danik", email: "govno" })
        }
      >
        {usersMutation.isPending
          ? "creating"
          : usersMutation.isError
          ? "error"
          : "create"}
      </button>
      <ul>
        {listQuery.data?.map((user) => (
          <Link to={`/users/${user.id}`} key={user.id}>
            <li>{user.username}</li>
          </Link>
        ))}
      </ul>

      {id && userQuery.data && (
        <div className="selected-user">
          <h3 className="selected-user-title">
            Выбранный: {userQuery.data.username}
          </h3>
          <p className="selected-user-email">{userQuery.data.email}</p>
        </div>
      )}
    </div>
  );
}
