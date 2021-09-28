import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import Select from "./Select"

const DateSelect = ({value, errorMessage, onChange, ...props}) => {
    
    const [year, setYear] = useState("")
    const [month, setMonth] = useState("")
    const [day, setDay] = useState("")

    useEffect(() => {
        if(value){
            let splited = value.split("-")
            setYear(splited[0])
            setMonth(splited[1])
            setDay(splited[2])
        }
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(year && month && day){
            onChange({target: {name: props.name, value: `${year}-${month}-${day}`}})
        }
        // eslint-disable-next-line
    },[year, month, day])

    return (
        <div>
            <div className={"flex justify-between"}>
                <Select
                    value={year}
                    name={"year"} 
                    onChange={(e) => setYear(e.target.value)}
                    containerStyle={"flex-1 mr-2"}
                    className=" h-c9 bg-caak-titaniumwhite"
                >
                    <option value="placeholder">
                        {"Он"}
                    </option>
                    <option value="1998">1998</option>
                    <option value="1999">1999</option>
                    <option value="2000">2000</option>
                    <option value="2001">2001</option>
                </Select>
                <Select 
                    value={month}
                    name={"month"} 
                    onChange={(e) => setMonth(e.target.value)}
                    containerStyle={"flex-1 mr-2"}
                    className=" h-c9 w-c14 bg-caak-titaniumwhite"
                >
                    <option value="placeholder">
                        {"Сар"}
                    </option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                </Select>
                <Select 
                    value={day}
                    name={"day"} 
                    onChange={(e) => setDay(e.target.value)}
                    containerStyle={"flex-1"}  
                    className=" h-c9 w-c14 bg-caak-titaniumwhite"
                >
                    <option value="placeholder">
                        {"Өдөр"}
                    </option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                </Select>
            </div>
            <p className="error text-right">
                {errorMessage}
            </p>
        </div>
    )
}

export default DateSelect