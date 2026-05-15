import Button from "../../primitives/button";
import { getUserRoleLabel } from "../../../domain/valueObjects/UserRoleLabels";
import style from "./index.module.css";

type UserHeaderProps = {
  name: string;
  role: string;
  onSignOut: () => void;
};

const UserHeader = ({ name, role, onSignOut }: UserHeaderProps) => {
  return (
    <div className={style.userHeader}>
      <div>
        <p>{name}</p>
        <p>{getUserRoleLabel(role)}</p>
      </div>

      <Button className={style.button} onClick={onSignOut}>
        Выход
      </Button>
    </div>
  );
};

export default UserHeader;
