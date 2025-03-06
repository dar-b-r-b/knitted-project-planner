import { IconButton, Button, Input, Textarea, HStack } from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Radio, RadioGroup } from "../../components/ui/radio";
import { addProject } from "./plannerSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PLANNED, IN_PROGRESS, DONE } from "../../statuses";
import { closeDialog, openDialog } from "./dialogSlice";

export function AddProjectDialog({ idEditableProject, setIdEditableProject }) {
  const projectList = useSelector((state) => state.planner.projectList);
  const isOpen = useSelector((state) => state.dialog.isOpen);
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    id: null,
    name: "",
    author: "",
    yarns: "",
    deadline: "",
    status: PLANNED,
    comment: "",
  });
  const clearField = () => {
    setNewProject({
      name: "",
      author: "",
      yarns: "",
      deadline: "",
      status: PLANNED,
      comment: "",
    });
  };
  const getValue = (property) => {
    return (
      projectList.find((el) => el.id === idEditableProject)?.[property] ??
      newProject[property]
    );
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogTrigger asChild>
        <IconButton
          size="2xl"
          mr="8"
          mt="5"
          borderRadius="full"
          bottom="10"
          right="6"
          position="fixed"
          onClick={() => dispatch(openDialog())}
        >
          <FiPlus />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <IconButton
          variant="ghost"
          position="absolute"
          right="2"
          top="1"
          onClick={() => {
            dispatch(closeDialog());
            setIdEditableProject(null);
          }}
        >
          <FiX />
        </IconButton>
        <DialogHeader>
          <DialogTitle>
            {idEditableProject
              ? "Редактировать проект"
              : "Добавить новый проект"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            mb="3"
            placeholder="Название проекта"
            value={getValue("name")}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
          />
          <Input
            mb="3"
            placeholder="Автор"
            value={newProject.author}
            onChange={(e) => {
              setNewProject({ ...newProject, author: e.target.value });
            }}
          />
          <Input
            mb="3"
            placeholder="Пряжа"
            value={newProject.yarns}
            onChange={(e) =>
              setNewProject({ ...newProject, yarns: e.target.value })
            }
          />
          <Input
            mb="5"
            placeholder="Дедлайн"
            value={newProject.deadline}
            onChange={(e) =>
              setNewProject({ ...newProject, deadline: e.target.value })
            }
          />
          <RadioGroup
            value={newProject.status}
            onValueChange={({ value }) =>
              setNewProject({ ...newProject, status: value })
            }
          >
            <HStack gap="6" mb="5">
              <Radio value={PLANNED}>Запланировано</Radio>
              <Radio value={IN_PROGRESS}>В процессе</Radio>
              <Radio value={DONE}>Связано</Radio>
            </HStack>
          </RadioGroup>
          <Textarea
            placeholder="Комментарий"
            value={newProject.comment}
            onChange={(e) =>
              setNewProject({ ...newProject, comment: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                clearField();
                dispatch(closeDialog());
                setIdEditableProject(null);
              }}
            >
              Закрыть
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={() => {
              dispatch(addProject(newProject));
              clearField();
              setIdEditableProject(null);
            }}
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
