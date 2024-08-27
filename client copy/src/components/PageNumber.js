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
    const navigate = useNavigate()
    const location = useLocation()
    const [paramsSearch] = useSearchParams()
    let entries = paramsSearch.entries()
    const append = (entries) => {
        let params = []
        paramsSearch.append('page', +text)
        for (let entry of entries) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0] && item !== 'page')) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        return searchParamsObject;
    }
    
    const handleChangPage = () => {
        if (!(text === '...')) {

            setCurrentPage(+text)
            navigate({
                pathname: location?.pathname,
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