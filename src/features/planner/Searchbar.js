import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Input, Group } from "@chakra-ui/react";

export function Searchbar() {
  return (
    <Group display="flex" justifyContent="center" mb="5">
      <Input width="30%"></Input>
      <Button ml="3">Search</Button>
      <Button ml="3">Filter</Button>
    </Group>
  );
}
