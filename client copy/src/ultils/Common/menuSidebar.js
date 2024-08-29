import { FaRegUserCircle } from "react-icons/fa";
import { TbPencilPlus } from "react-icons/tb";
import { BiNotepad } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";

export const menuSidebar = [
    {
        id: 1,
        text: 'Post for rent',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <TbPencilPlus size={22} />
    },
    {
        id: 2,
        text: 'Post manage',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <BiNotepad size={22} />
    },
    {
        id: 3,
        text: 'Edit profile account',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FaRegUserCircle size={22} />
    },
    {
        id: 4,
        text: 'Contacts',
        path: '/he-thong/lien-he',
        icon: <FiMessageCircle size={22} />
    },
]