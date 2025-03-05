import { IconButton, Button, Input, Textarea, HStack } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
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
import { useDispatch } from "react-redux";
import { PLANNED, IN_PROGRESS, DONE } from "../../statuses";

export function AddProjectDialog() {
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
  return (
    <DialogRoot>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить новый проект</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input
            mb="3"
            placeholder="Название проекта"
            value={newProject.name}
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
            <Button variant="outline" onClick={clearField}>
              Закрыть
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={() => {
              dispatch(addProject(newProject));
              clearField();
            }}
          >
            Сохранить
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
