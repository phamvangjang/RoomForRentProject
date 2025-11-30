import { FaRegUserCircle } from "react-icons/fa";
import { TbPencilPlus } from "react-icons/tb";
import { BiNotepad } from "react-icons/bi";
export const menuManage = [
    {
        id: 1,
        text: 'Post for rent',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <TbPencilPlus />
    },
    {
        id: 2,
        text: 'Post manage',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <BiNotepad />
    },
    {
        id: 3,
        text: 'Profile account',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <FaRegUserCircle />
    },
]