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
import { FiMenu } from "react-icons/fi";
import { Searchbar } from "./Searchbar";
import { deleteProject } from "./plannerSlice";
import { AddProjectDialog } from "./ProjectDialog";
import { PLANNED, IN_PROGRESS, DONE } from "../../statuses";
import { openDialog } from "./dialogSlice";

export function Planner() {
  const projectList = useSelector((state) => state.planner.projectList);
  const [searchList, setSearchList] = useState(projectList);
  const dispatch = useDispatch();

  const setColorBadge = (status) => {
    switch (status) {
      case PLANNED:
        return "purple";
      case DONE:
        return "green";
      case IN_PROGRESS:
        return "";
      default:
    }
  };

  return (
    <Box>
      <Searchbar setSearchList={setSearchList}></Searchbar>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={3}
        mb="5"
      >
        {searchList.map((i) => {
          return (
            <Card.Root overflow="visible" ml="4" key={i.id}>
              <MenuRoot
                positioning={{
                  placement: "right-start",
                }}
              >
                <MenuTrigger asChild position="absolute" top={2} right={2}>
                  <IconButton size="sm" variant="plain">
                    <FiMenu />
                  </IconButton>
                </MenuTrigger>
                <MenuContent
                  width="120px"
                  position="absolute"
                  top={10}
                  right={2}
                >
                  <MenuItem
                    value="edit"
                    onClick={() => {
                      dispatch(openDialog(i.id));
                    }}
                  >
                    Редактировать
                  </MenuItem>
                  <MenuItem
                    value="delete"
                    onClick={() => dispatch(deleteProject(i.id))}
                  >
                    Удалить
                  </MenuItem>
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

              <Card.Footer></Card.Footer>
            </Card.Root>
          );
        })}
      </Grid>

      <AddProjectDialog />
    </Box>
  );
}
