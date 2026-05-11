import Button from '../../primitives/button';
import style from './index.module.css';
type UserHeaderProps = {
  name: string;
  role: string;
};

const UserHeader = ({ name, role }: UserHeaderProps) => {
return (
    <div>
   
      <p> {name}</p>
      <p> {role}</p>
      <Button className = {style.button}> Выход </Button>
    </div>
  );
}
export default UserHeader;