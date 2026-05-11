import Button from '../../primitives/button';
import style from './index.module.css';
type UserHeaderProps = {
  name: string;
  role: string;
  handleSignOut: () => void;
};

const UserHeader = ({ name, role, handleSignOut }: UserHeaderProps) => {
return (
    <div>
   
      <p> {name}</p>
      <p> {role}</p>
      <Button className = {style.button} onClick={handleSignOut}>
        Выход
      </Button>
    </div>
  );
}
export default UserHeader;