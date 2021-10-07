import { getFileUrl } from "../../Utility/Util"
export default function PostName({title,files, onClick}) {
    return (
        <div onClick={onClick} className='flex items-center cursor-pointer'>
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
