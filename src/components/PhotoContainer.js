import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function PhotoContainer({sort, children}) {
    const rawData = useSelector(state => {
        return state.image
    })
    const [list, setList] = useState([])
    useEffect(() => {
        let l = Array.from(rawData.keys())
        if(sort) l.sort(sort);
        setList(l.map(i => {
            return (
                <div>
                    {children.map(L => {
                        return <L photoData={rawData[i]}/>
                    })}
                </div>
            )
        }))
    }, [children, rawData, sort])
    return list
}
export default PhotoContainer
