import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  IconButton,
  Box,
  Card,
  Text,
  Badge,
  MenuRoot,
  MenuItem,
  MenuContent,
  MenuTrigger,
} from "@chakra-ui/react";
import { FiPlus, FiMenu } from "react-icons/fi";
import { Searchbar } from "./Searchbar";

export function Planner() {
  const projectList = useSelector((state) => state.planner.projectList);
  const setColorBadge = (status) => {
    switch (status) {
      case "запланировано":
        return "purple";
      case "связно":
        return "green";
      case "в процессе":
        return "";
      default:
    }
  };

  return (
    <Box>
      <Searchbar></Searchbar>
      <Grid templateColumns="repeat(3, auto)" gap="3">
        {projectList.map((i) => {
          return (
            <Card.Root maxW="sm" overflow="hidden" ml="3">
              <MenuRoot>
                <MenuTrigger asChild position="absolute" top={2} right={2}>
                  <IconButton size="sm" variant="plain">
                    <FiMenu />
                  </IconButton>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="delete">Delete</MenuItem>
                  <MenuItem value="edit">Edit</MenuItem>
                </MenuContent>
              </MenuRoot>
              <Card.Body gap="1">
                <Card.Title>
                  {i.name}
                  <Badge colorPalette={setColorBadge(i.status)} ml="2">
                    {i.status}
                  </Badge>
                </Card.Title>
                <Text letterSpacing="tight" mt="2">
                  Автор: {i.author}
                </Text>
                <Text letterSpacing="tight">Пряжа: {i.yarns}</Text>

                <Text>Дедлайн: {i.deadline}</Text>
                <Card.Description mt="5">{i.comment}</Card.Description>
              </Card.Body>

              <Card.Footer gap="1"></Card.Footer>
            </Card.Root>
          );
        })}
      </Grid>
      <IconButton
        size="2xl"
        mr="8"
        mt="5"
        borderRadius="full"
        bottom="10"
        right="6"
        position="fixed"
      >
        <FiPlus />
      </IconButton>
    </Box>
  );
}
