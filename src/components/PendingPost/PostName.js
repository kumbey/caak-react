import { getFileUrl } from "../../Utility/Util"
export default function PostName({title,files}) {
    return (
        <div className='flex items-center'>
            <img
                style={{marginRight: "15px"}}
                src={getFileUrl(files[0].file)}
                className={"h-c7 w-c33 rounded-lg"}
                alt={""}
            />
            <p style={{width: "299px"}}>{title}</p>
        </div>
    )
}
