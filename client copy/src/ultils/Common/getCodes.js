import { getNumbersArea, getNumbersPrice } from "./getNumbers"

export const getCodePrice = (totals) => {
    let arr = []
    return totals.map(item => {
        let arrMaxMin = getNumbersPrice(item.value)

        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortArr = arr.sort()
        return ({
            ...item,
            min: sortArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1],
        })
    })
} 

export const getCodeArea = (totals) => {
    let arr = []
    return totals.map(item => {
        let arrMaxMin = getNumbersArea(item.value)

        if (arrMaxMin.length === 1) arr.push(arrMaxMin[0])
        let sortArr = arr.sort()
        return ({
            ...item,
            min: sortArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
            max: sortArr.indexOf(arrMaxMin[0]) === 0 ? arrMaxMin[0] : sortArr.indexOf(arrMaxMin[0]) === 1 ? 9999999 : arrMaxMin[1],
        })
    })
} 