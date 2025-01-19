import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FC } from 'react';

interface UserItemProps {
  user: {
    id: number;
    name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
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
      className='bg-[#D9D9D9] p-1 h-10 rounded-full shadow-md items-center'
    >
      <div className= '!mr-2 text-[#202020]'>
        {icon}
    <p className='text-sm font-semibold text-center'>{name}</p>
        
      </div>
      {/* <button {...attributes} {...listeners} className='cursor-move'>
        Drag
      </button> */}
    </div>
  );
};

export default UserItem;