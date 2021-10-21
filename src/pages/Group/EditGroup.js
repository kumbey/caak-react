import MyInput from "./MyInput";
import Button from "../../components/button";

export default function EditGroup() {
  return (
    <div style={{ width: "550px" }}>
      <MyInput text={"Монголын өв уламжлал"} title={"Нэр"} />
      <MyInput
        className="mt-px-10 items-start"
        text={"Монгол өв соёлыг өвлөн үлдэхийн төлөө энэхүү бүлгийг үүсгэсэн."}
        title={"Тайлбар"}
      />
      <div className="mt-px-12 flex justify-end">
        <Button className="text-caak-generalblack bg-white border">
          Болих
        </Button>
        <Button className="ml-px-10 bg-caak-bleudefrance border">
          Хадгалах
        </Button>
      </div>
    </div>
  );
}
