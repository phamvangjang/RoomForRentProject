import { FaRegUserCircle } from "react-icons/fa";
import { TbPencilPlus } from "react-icons/tb";
import { BiNotepad } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import { path } from '../../ultils/constant';

export const menuSidebar = [
    {
        id: 1,
        text: 'Post for rent',
        path: `${path.CREATE_POST}`,
        icon: <TbPencilPlus size={22} />
    },
    {
        id: 2,
        text: 'Post manage',
        path: `${path.MANAGE_POST}`,
        icon: <BiNotepad size={22} />
    },
    {
        id: 3,
        text: 'Edit profile account',
        path: `${path.EDIT_PROFILE}`,
        icon: <FaRegUserCircle size={22} />
    },
    {
        id: 4,
        text: 'Contacts',
        path: `${path.CONTACTS}`,
        icon: <FiMessageCircle size={22} />
    },
]