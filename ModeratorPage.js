import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ModeratorPage = () => {
  const { auth } = useContext(AuthContext);

  return (
    <h2>
      Welcome, {auth.user.username} (Role: {auth.user.role})
    </h2>
  );
};

export default ModeratorPage;
