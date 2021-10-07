import { generateTimeAgo, extractDate } from "../../Utility/Util"
export default function CheckHeader({itemTitle, updatedAt ,title}) {
    const date = extractDate(updatedAt);
    return (
        <div className="mt-c6 grid justify-center mx-c3 ">
            <div className={"font-bold text-20px text-caak-generalblack pt-2 px-7"}>
        {title}
      </div>
                            <p style={{maxWidth: '600px'}} className="text-18px text-caak-generalblack">{itemTitle}</p>
                            <div className="flex items-center justify-between my-c6">
                                <div className="flex items-center">
                                    <img alt="" src="https://picsum.photos/200" className="h-c13 w-c13 rounded-full"/>
                                </div>
                                <div className={"text-caak-darkBlue text-14px pt-2 px-7"}>
        {generateTimeAgo(updatedAt)} ·{" "}
        {`${date.year}/${date.month}/${date.day}`}
      </div>
                            </div>
                        </div>
    )
}
