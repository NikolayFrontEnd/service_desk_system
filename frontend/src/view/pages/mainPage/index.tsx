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

type User = {
  id: number;
  name: string;
  role: string;
};

const MainPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [initialRepairRequestsList, setInitialRepairRequestsList] = useState<
    InitialRepairRequest[]
  >([]);

  const [assignedRepairTasksList, setAssignedRepairTasksList] = useState<
    AssignedRepairTask[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  if (isLoading) {
    return <div>Loading...</div>;
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
            <Button className={style.addButton}>
              Создать заявку на поломку
            </Button>
          </div>
        )}

        <div className={style.listsGrid}>
          <section className={`${style.listPanel} ${style.requestsPanel}`}>
            <InitialRepairRequestsList requests={initialRepairRequestsList} />
          </section>

          <section className={`${style.listPanel} ${style.tasksPanel}`}>
            <AssignedRepairTasksList tasks={assignedRepairTasksList} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default MainPage;