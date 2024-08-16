import React, { memo } from 'react'
import {
    createSearchParams,
    useLocation,
    useNavigate,
    useSearchParams
} from 'react-router-dom'

const notActive = 'w-[46px] h-[48px] flex items-center justify-center text-main bg-white hover:bg-[#ddd] rounded-md cursor-pointer'
const active = 'w-[46px] h-[48px] flex items-center justify-center text-white bg-[#E13427] rounded-md'

const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {
    const location = useLocation()
    const [paramsSearch] = useSearchParams()
    let entries = paramsSearch.entries()
    const append = (entries) => {
        let params = []
        paramsSearch.append('page', +text)
        for (let entry of entries) {
            params.push(entry);
        }
        let a = {}
        params?.map(i => {
            a = { ...a, [i[0]]: i[1] }
        })
        return a;
    }
    const navigate = useNavigate()
    const handleChangPage = () => {
        if (!(text === '...')) {

            setCurrentPage(+text)
            navigate({
                pathname: location.pathname,
                search: createSearchParams(append(entries)).toString()
            });
        }
    }
    return (
        <div
            onClick={handleChangPage}
            className={+text === +currentPage ? active : notActive}
        >{icon || text}
        </div>
    )
}

export default memo(PageNumber)