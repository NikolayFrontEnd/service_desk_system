import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserHeader from "../../components/userHeader";
import Button from "../../primitives/button";
import InitialRepairRequestsList from "../../components/initialRepairRequestsList";
import AssignedRepairTasksList from "../../components/assignedRepairTasksList";

import { initialRepairRequestsService } from "../../../domain/services/InitialRepairRequestsService";
import { assignedRepairTasksService } from "../../../domain/services/AssignedRepairTasksService";

import type { InitialRepairRequest } from "../../../domain/entities/InitialRepairRequest";
import type { AssignedRepairTask } from "../../../domain/entities/AssignedRepairTask";

import style from "./index.module.css";
import CreateInitialRepairRequestDialog from "../../components/popup";
import type { WorkImpact } from "../../../domain/valueObjects/WorkImpact";
import SelectFaultTitleDialog from "../../components/selectFailtFialog";
import type { FaultTitle } from "../../../domain/valueObjects/FaultDialog";

type User = {
  id: number;
  name: string;
  role: string;
};

const MainPage = () => {
  const [user, setUser] = useState<User | null>(null);
const [isCreateRequestDialogOpen, setIsCreateRequestDialogOpen] =
  useState<boolean>(false);
  const [isFaultTitleDialogOpen, setIsFaultTitleDialogOpen] =
  useState<boolean>(false);
  const [initialRepairRequestsList, setInitialRepairRequestsList] = useState<
    InitialRepairRequest[]
  >([]);

  const [assignedRepairTasksList, setAssignedRepairTasksList] = useState<
    AssignedRepairTask[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
const [selectedInitialRequestId, setSelectedInitialRequestId] =
  useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        const initialRequests = await initialRepairRequestsService.getAll();
        const assignedTasks = await assignedRepairTasksService.getAll();

        setInitialRepairRequestsList(initialRequests);
        setAssignedRepairTasksList(assignedTasks);
      } catch (error) {
        console.log("Failed to load main page data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPageData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

const handleCreateInitialRepairRequest = async (workImpact: WorkImpact) => {
  try {
    await initialRepairRequestsService.create(workImpact);

    setIsCreateRequestDialogOpen(false);

    console.log("Repair request created successfully");
  } catch (error) {
    console.log("Failed to create repair request:", error);
  }
};
  
const handleItemClick = (id: number) => {
  setSelectedInitialRequestId(id);
  setIsFaultTitleDialogOpen(true);
};

const handleSelectFaultTitle = async (faultTitle: FaultTitle) => {
  if (!selectedInitialRequestId) {
    console.log("No request selected");
    return;
  }

  try {
    await assignedRepairTasksService.create(
      selectedInitialRequestId,
      faultTitle
    );

    setIsFaultTitleDialogOpen(false);
    setSelectedInitialRequestId(null);

    const initialRequests = await initialRepairRequestsService.getAll();
    const assignedTasks = await assignedRepairTasksService.getAll();

    setInitialRepairRequestsList(initialRequests);
    setAssignedRepairTasksList(assignedTasks);
  } catch (error) {
    console.log("Failed to assign repair task:", error);
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
            handleSignOut={handleSignOut}
          />
        </section>

        {user.role === "EMPLOYEE" && (
          <div className={style.actions}>
            <Button className={style.addButton}
            onClick={() => setIsCreateRequestDialogOpen(true)}>
              Создать заявку на поломку
            </Button>
          </div>
        )}

        <div className={style.listsGrid}>
          
  {/*       {user.role === "TECHNICIAN" && (
          <section className={`${style.listPanel} ${style.requestsPanel}`}>
            
          </section>
        )} */}


          <section className={`${style.listPanel} ${style.requestsPanel}`}>
            <InitialRepairRequestsList requests={initialRepairRequestsList} onItemClick  = {handleItemClick}/>
          </section>

          <section className={`${style.listPanel} ${style.tasksPanel}`}>
            <AssignedRepairTasksList tasks={assignedRepairTasksList} />
          </section>

        </div>


        
      </div>
      <CreateInitialRepairRequestDialog
  isOpen={isCreateRequestDialogOpen}
  onClose={() => setIsCreateRequestDialogOpen(false)}
    onCreateRequest={handleCreateInitialRepairRequest}

/>
      <SelectFaultTitleDialog
        isOpen={isFaultTitleDialogOpen}
        onClose={() => setIsFaultTitleDialogOpen(false)}
        onSelectFaultTitle={handleSelectFaultTitle}
      />
    </main>
  );
};

export default MainPage;