import React from "react";
import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("failed to load");
  }
  const data = await res.json();
  return data;
};

const query = useQuery({
  queryKey: ["users"],
  queryFn: getUsers,
});

export default function Users() {
  return (
    <div>
      <p>{}</p>
    </div>
  );
}
