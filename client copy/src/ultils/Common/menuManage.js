import { FaRegUserCircle } from "react-icons/fa";
import { TbPencilPlus } from "react-icons/tb";
import { BiNotepad } from "react-icons/bi";
export const menuManage = [
    {
        id: 1,
        text: 'Post for rent',
        path: 'system/create-new',
        icon: <TbPencilPlus />
    },
    {
        id: 2,
        text: 'Post manage',
        path: 'system/manage-post',
        icon: <BiNotepad />
    },
    {
        id: 3,
        text: 'Profile account',
        path: 'system/profile',
        icon: <FaRegUserCircle />
    },
]