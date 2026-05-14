import Button from "../../primitives/button";
import { getUserRoleLabel } from "../../../domain/valueObjects/UserRoleLabels";
import style from "./index.module.css";

type UserHeaderProps = {
  name: string;
  role: string;
  handleSignOut: () => void;
};

const UserHeader = ({ name, role, handleSignOut }: UserHeaderProps) => {
  return (
    <div className={style.userHeader}>
      <div>
        <p>{name}</p>
        <p>{getUserRoleLabel(role)}</p>
      </div>

      <Button className={style.button} onClick={handleSignOut}>
        Выход
      </Button>
    </div>
  );
};

export default UserHeader;