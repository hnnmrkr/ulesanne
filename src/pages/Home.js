import { useState, useEffect } from "react";

import { Table } from "../components/Table";
import { Search } from "../components/Search";
import { Title } from "../components/Title";
import { getUsersFromLocalStorage } from "../utils/storage";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = getUsersFromLocalStorage();
    setUsers(savedUsers);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="max--width--small">
      <div className="container">
        <Title text="List of Users" />

        <Search onSearch={handleSearch} />
        <Table searchQuery={searchQuery} users={users} />
      </div>
    </div>
  );
};