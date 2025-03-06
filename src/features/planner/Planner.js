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
import { deleteProject, editProject } from "./plannerSlice";
import { AddProjectDialog } from "./AddProjectDialog";
import { PLANNED, IN_PROGRESS, DONE } from "../../statuses";
import { openDialog } from "./dialogSlice";

export function Planner() {
  const projectList = useSelector((state) => state.planner.projectList);
  const dispatch = useDispatch();
  const [idEditableProject, setIdEditableProject] = useState(null);

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
      <Searchbar></Searchbar>
      <Grid templateColumns="repeat(3, auto)" gap="3" mb="5">
        {projectList.map((i) => {
          return (
            <Card.Root maxW="sm" overflow="visible" ml="3" key={i.id}>
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
                      setIdEditableProject(i.id);
                      dispatch(openDialog());
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

      <AddProjectDialog
        idEditableProject={idEditableProject}
        setIdEditableProject={setIdEditableProject}
      />
    </Box>
  );
}
