import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

interface UserItemProps {
  user: {
    id: number;
    name: string;
    icon: any;
  };
}
const UserItem: FC<UserItemProps> = (props) => {
  const { id, name, icon } = props.user;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='relative bg-[#D9D9D9] space-x-10 flex p-2 h-10 rounded-full shadow-md items-center justify-center'
    >
      <div className= 'flex min-w-250 space-x-10 text-[#202020]'>
        {icon}
        <p className='text-sm font-semibold text-end'>{name}</p>
      </div>
    </div>
  );
};

export default UserItem;