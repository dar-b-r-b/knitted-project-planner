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
import { addProject, editProject } from "./plannerSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PLANNED, IN_PROGRESS, DONE } from "../../statuses";
import { closeDialog, openDialog } from "./dialogSlice";

export function AddProjectDialog() {
  const projectList = useSelector((state) => state.planner.projectList);
  const isOpen = useSelector((state) => state.dialog.isOpen);
  const idEditableProject = useSelector((state) => state.dialog.id);
  const dispatch = useDispatch();
  const [project, setProject] = useState({
    id: null,
    name: "",
    author: "",
    yarns: "",
    deadline: "",
    status: PLANNED,
    comment: "",
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const curProject = projectList.find((el) => el.id === idEditableProject);
    if (curProject) {
      setProject(curProject);
    } else {
      clearFields();
    }
  }, [isOpen]);

  const clearFields = () => {
    setProject({
      name: "",
      author: "",
      yarns: "",
      deadline: "",
      status: PLANNED,
      comment: "",
    });
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
            value={project.name}
            onChange={(e) => setProject({ ...project, name: e.target.value })}
          />
          <Input
            mb="3"
            placeholder="Автор"
            value={project.author}
            onChange={(e) => {
              setProject({ ...project, author: e.target.value });
            }}
          />
          <Input
            mb="3"
            placeholder="Пряжа"
            value={project.yarns}
            onChange={(e) => setProject({ ...project, yarns: e.target.value })}
          />
          <Input
            mb="5"
            placeholder="Дедлайн"
            value={project.deadline}
            onChange={(e) =>
              setProject({ ...project, deadline: e.target.value })
            }
          />
          <RadioGroup
            value={project.status}
            onValueChange={({ value }) =>
              setProject({ ...project, status: value })
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
            value={project.comment}
            onChange={(e) =>
              setProject({ ...project, comment: e.target.value })
            }
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                clearFields();
                dispatch(closeDialog());
              }}
            >
              Закрыть
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={() => {
              if (idEditableProject) {
                dispatch(editProject({ id: idEditableProject, project }));
                dispatch(closeDialog());
              } else {
                dispatch(addProject(project));
              }
              clearFields();
            }}
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
