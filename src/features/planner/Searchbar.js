import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Group, NativeSelect } from "@chakra-ui/react";

import { PLANNED, IN_PROGRESS, DONE } from "../../statuses";

export function Searchbar({ setSearchList }) {
  const projectList = useSelector((state) => state.planner.projectList);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    let filteredList = projectList;

    filteredList = filteredList.filter(
      (el) =>
        (!searchQuery ||
          el.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!filterStatus || el.status === filterStatus)
    );

    setSearchList(filteredList);
  }, [projectList, searchQuery, filterStatus]);
  return (
    <Group display="flex" justifyContent="center" mb="5">
      <Input
        width={{
          base: "50%",
          md: "40%",
          lg: "30%",
          xl: "30%",
        }}
        placeholder="Введите название проекта"
        onChange={(e) => setSearchQuery(e.target.value)}
      ></Input>

      <NativeSelect.Root
        size="md"
        width={{
          base: "40%",
          md: "30%",
          lg: "20%",
          xl: "15%",
        }}
      >
        <NativeSelect.Field
          defaultValue={""}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Показать все</option>
          <option value={PLANNED}>Запланировано</option>
          <option value={IN_PROGRESS}>В процессе</option>
          <option value={DONE}>Связано</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Group>
  );
}
