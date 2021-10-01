export default function shitt({edit, remove}) {
    return (
        <div className="bg-white">
            <div style={{paddingInlineEnd: "21px"}} onClick={edit} className="flex hover:bg-caak-liquidnitrogen h-c25 items-center cursor-pointer">
                <span className={"icon-fi-rs-edit ml-b4 mr-b2 text-16px"} />
                <p className="text-14px text-caak-extraBlack font-roboto">Фостыг засах</p>
            </div>
            <div style={{paddingInlineEnd: "21px"}} onClick={remove} className="flex hover:bg-caak-liquidnitrogen h-c25 items-center cursor-pointer">
                <span className={"icon-fi-rs-delete ml-b4 mr-b2 text-16px"} />
                <p className="text-14px text-caak-extraBlack font-roboto">Фостыг устгах</p>
            </div>
        </div>
    )
}
