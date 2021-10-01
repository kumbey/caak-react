export default function ProfileBack({title, className}) {
    return (
        <div className="mt-c27">
                        <p className={`${className ? className : "text-17px font-bold text-caak-generalblack" }`}>{title}</p>
                        <div className="flex mt-c6 items-center">
                            <img alt="" className="h-c13 w-c13 bg-caak-red rounded-full" src={"https://d238m8ukn6hkhb.cloudfront.net/file/brand/305/blackpink-jisoo-profile-image.jpeg"}/>
                            <p className="text-15px ml-a3 font-bold text-caak-generalblack cursor-pointer">Oyunderdene</p>
                            <span style={{marginInlineStart: "4px"}} className="icon-fi-rs-verified text-13px text-caak-buttonblue" />
                        </div>
                    </div>
    )
}
