import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserHeader from "../../components/userHeader";
import Button from "../../primitives/button";
import InitialRepairRequestsList from "../../components/initialRepairRequestsList";
import AssignedRepairTasksList from "../../components/assignedRepairTasksList";
import CreateInitialRepairRequestDialog from "../../components/createInitialRepairRequestDialog";
import SelectFaultTitleDialog from "../../components/selectFaultTitleDialog";
import TechnicianAssignedRepairTasksList from "../../components/technicianAssignedRepairTasksList";
import UpdateRepairTaskStatusDialog from "../../components/updateRepairTaskStatusDialog";

import { initialRepairRequestsService } from "../../../domain/services/InitialRepairRequestsService";
import { assignedRepairTasksService } from "../../../domain/services/AssignedRepairTasksService";
import { technicianAssignedRepairTasksService } from "../../../domain/services/TechnicianAssignedRepairTasksService";

import type { InitialRepairRequest } from "../../../domain/entities/InitialRepairRequest";
import type { AssignedRepairTask } from "../../../domain/entities/AssignedRepairTask";
import type { TechnicianAssignedRepairTask } from "../../../domain/entities/TechnicianAssignedRepairTask";

import type { WorkImpact } from "../../../domain/valueObjects/WorkImpact";
import type { FaultTitle } from "../../../domain/valueObjects/FaultTitle";

import style from "./index.module.css";

type User = {
  id: number;
  name: string;
  role: string;
};

const MainPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [initialRepairRequests, setInitialRepairRequests] = useState<
    InitialRepairRequest[]
  >([]);

  const [assignedRepairTasks, setAssignedRepairTasks] = useState<
    AssignedRepairTask[]
  >([]);

  const [technicianAssignedRepairTasks, setTechnicianAssignedRepairTasks] =
    useState<TechnicianAssignedRepairTask[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isCreateRequestDialogOpen, setIsCreateRequestDialogOpen] =
    useState<boolean>(false);

  const [isSelectFaultTitleDialogOpen, setIsSelectFaultTitleDialogOpen] =
    useState<boolean>(false);

  const [selectedInitialRepairRequestId, setSelectedInitialRepairRequestId] =
    useState<number | null>(null);

  const [isUpdateTaskStatusDialogOpen, setIsUpdateTaskStatusDialogOpen] =
    useState<boolean>(false);

  const [
    selectedTechnicianAssignedRepairTaskId,
    setSelectedTechnicianAssignedRepairTaskId,
  ] = useState<number | null>(null);

  const navigate = useNavigate();

  const loadPageData = async (role: string) => {
    if (role === "TECHNICIAN") {
      const result = await technicianAssignedRepairTasksService.getMyTasks();

      setTechnicianAssignedRepairTasks(result.tasks);

      return;
    }

    const initialRequests = await initialRepairRequestsService.getAll();
    const assignedTasks = await assignedRepairTasksService.getAll();

    setInitialRepairRequests(initialRequests);
    setAssignedRepairTasks(assignedTasks);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          setIsLoading(false);
          return;
        }

        const parsedUser: User = JSON.parse(savedUser);

        setUser(parsedUser);

        await loadPageData(parsedUser.role);
      } catch (error) {
        console.log("Failed to load main page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCreateInitialRepairRequest = async (workImpact: WorkImpact) => {
    if (!user) {
      return;
    }

    try {
      await initialRepairRequestsService.create(workImpact);

      setIsCreateRequestDialogOpen(false);

      await loadPageData(user.role);
    } catch (error) {
      console.log("Failed to create repair request:", error);
    }
  };

  const handleInitialRepairRequestClick = (id: number) => {
    setSelectedInitialRepairRequestId(id);
    setIsSelectFaultTitleDialogOpen(true);
  };

  const handleSelectFaultTitle = async (faultTitle: FaultTitle) => {
    if (!user) {
      return;
    }

    if (selectedInitialRepairRequestId === null) {
      console.log("No request selected");
      return;
    }

    try {
      await assignedRepairTasksService.create(
        selectedInitialRepairRequestId,
        faultTitle
      );

      setIsSelectFaultTitleDialogOpen(false);
      setSelectedInitialRepairRequestId(null);

      await loadPageData(user.role);
    } catch (error) {
      console.log("Failed to assign repair task:", error);
    }
  };

  const handleTechnicianTaskClick = (id: number) => {
    setSelectedTechnicianAssignedRepairTaskId(id);
    setIsUpdateTaskStatusDialogOpen(true);
  };

  const handleStartTechnicianTask = async () => {
    if (!user) {
      return;
    }

    if (selectedTechnicianAssignedRepairTaskId === null) {
      console.log("No technician task selected");
      return;
    }

    try {
      await assignedRepairTasksService.startTask(
        selectedTechnicianAssignedRepairTaskId
      );

      setIsUpdateTaskStatusDialogOpen(false);
      setSelectedTechnicianAssignedRepairTaskId(null);

      await loadPageData(user.role);
    } catch (error) {
      console.log("Failed to start repair task:", error);
    }
  };

  const handleFinishTechnicianTask = async () => {
    if (!user) {
      return;
    }

    if (selectedTechnicianAssignedRepairTaskId === null) {
      console.log("No technician task selected");
      return;
    }

    try {
      await assignedRepairTasksService.finishTask(
        selectedTechnicianAssignedRepairTaskId
      );

      setIsUpdateTaskStatusDialogOpen(false);
      setSelectedTechnicianAssignedRepairTaskId(null);

      await loadPageData(user.role);
    } catch (error) {
      console.log("Failed to finish repair task:", error);
    }
  };

  if (isLoading) {
    return (
      <div className={style.loaderScreen}>
        <div className={style.loader}></div>
      </div>
    );
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <main className={style.page}>
      <div className={style.shell}>
        <section className={style.headerCard}>
          <UserHeader
            name={user.name}
            role={user.role}
            onSignOut={handleSignOut}
          />
        </section>

        {user.role === "EMPLOYEE" && (
          <div className={style.actions}>
            <Button
              className={style.addButton}
              onClick={() => setIsCreateRequestDialogOpen(true)}
            >
              Создать заявку на поломку
            </Button>
          </div>
        )}

        <div className={style.listsGrid}>
          {user.role === "TECHNICIAN" ? (
            <section className={`${style.listPanel} ${style.requestsPanel}`}>
              <TechnicianAssignedRepairTasksList
                tasks={technicianAssignedRepairTasks}
                onTaskClick={handleTechnicianTaskClick}
              />
            </section>
          ) : (
            <>
              <section className={`${style.listPanel} ${style.requestsPanel}`}>
                <InitialRepairRequestsList
                  requests={initialRepairRequests}
                  onRequestClick={handleInitialRepairRequestClick}
                />
              </section>

              <section className={`${style.listPanel} ${style.tasksPanel}`}>
                <AssignedRepairTasksList tasks={assignedRepairTasks} />
              </section>
            </>
          )}
        </div>
      </div>

      <CreateInitialRepairRequestDialog
        isOpen={isCreateRequestDialogOpen}
        onClose={() => setIsCreateRequestDialogOpen(false)}
        onCreateRequest={handleCreateInitialRepairRequest}
      />

      <SelectFaultTitleDialog
        isOpen={isSelectFaultTitleDialogOpen}
        onClose={() => {
          setIsSelectFaultTitleDialogOpen(false);
          setSelectedInitialRepairRequestId(null);
        }}
        onSelectFaultTitle={handleSelectFaultTitle}
      />

      <UpdateRepairTaskStatusDialog
        isOpen={isUpdateTaskStatusDialogOpen}
        onClose={() => {
          setIsUpdateTaskStatusDialogOpen(false);
          setSelectedTechnicianAssignedRepairTaskId(null);
        }}
        onStartTask={handleStartTechnicianTask}
        onFinishTask={handleFinishTechnicianTask}
      />
    </main>
  );
};

export default MainPage;
