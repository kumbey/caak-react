export default function PostMore() {
    return (
        <div className="bg-white">
            <div style={{paddingInlineEnd: "21px"}} className="flex hover:bg-caak-liquidnitrogen h-c25 items-center cursor-pointer">
                <span className={"icon-fi-rs-add-group-f ml-b4 mr-b2 text-16px"} />
                <p className="text-14px text-caak-extraBlack font-roboto">Бүлэгт элсэх</p>
            </div>
            <div style={{paddingInlineEnd: "21px"}} className="flex hover:bg-caak-liquidnitrogen h-c25 items-center cursor-pointer">
                <span className={"icon-fi-rs-bookmark ml-b4 mr-b2 text-16px"} />
                <p className="text-14px text-caak-extraBlack font-roboto">Фостыг хадгалах</p>
            </div>
            <div style={{paddingInlineEnd: "21px"}} className="flex hover:bg-caak-liquidnitrogen h-c25 items-center cursor-pointer">
                <span className={"icon-fi-rs-report ml-b4 mr-b2 text-16px"} />
                <p className="text-14px text-caak-extraBlack font-roboto">Зөрчилтэй мэдээлэл</p>
            </div>
            <div style={{paddingInlineEnd: "21px"}} className="flex hover:bg-caak-liquidnitrogen h-c25 items-center cursor-pointer">
                <span className={"icon-fi-rs-hide ml-b4 mr-b2 text-16px"} />
                <p className="text-14px text-caak-extraBlack font-roboto">Дахин харагдуулахгүй</p>
            </div>
        </div>
    )
}
