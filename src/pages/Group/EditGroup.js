import MyInput from "./MyInput"
import Button from "../../components/button"

export default function EditGroup() {
    return (
        <div style={{width: "550px"}}>
            <MyInput text={"Монголын өв уламжлал"} title={"Нэр"}/>
            <MyInput className="mt-b1 items-start" text={"Монгол өв соёлыг өвлөн үлдэхийн төлөө энэхүү бүлгийг үүсгэсэн."} title={"Тайлбар"}/>
            <div className="flex justify-end mt-b2">
                <Button className="bg-white border text-caak-generalblack">Болих</Button>
                <Button className="ml-b1 border bg-caak-bleudefrance">Хадгалах</Button>
            </div>
        </div>
    )
}
