import React from "react";
import { useSelector } from "react-redux";
import { Input, Group, NativeSelect } from "@chakra-ui/react";

import { PLANNED, IN_PROGRESS, DONE } from "../../statuses";

export function Searchbar({ setSearchList }) {
  const projectList = useSelector((state) => state.planner.projectList);

  const searchProject = (e) => {
    const newList = projectList.filter(
      (el) =>
        !e.target.value ||
        el.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchList(newList);
  };
  const filterProject = (e) => {
    if (!e.target.value) {
      setSearchList(projectList);
    } else {
      const filteredList = projectList.filter(
        (el) => el.status === e.target.value
      );
      setSearchList(filteredList);
    }
  };
  return (
    <Group display="flex" justifyContent="center" mb="5">
      <Input
        width="30%"
        placeholder="Введите название проекта"
        onChange={searchProject}
      ></Input>

      <NativeSelect.Root size="md" width="240px">
        <NativeSelect.Field defaultValue={""} onChange={filterProject}>
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
