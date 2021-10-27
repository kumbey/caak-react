import Button from "../../components/button";

export default function SocialLink() {
  return (
    <>
      <p
        className="font-medium"
        style={{
          marginLeft: "30px",
          marginTop: "30px",
          fontSize: "24px",
        }}
      >
        Сошиал холболтууд
      </p>
      <div style={{ marginTop: "21px" }} className="mx-c3 pb-c60 ">
        <div
          style={{ paddingBlock: "14px" }}
          className="flex items-center justify-between w-full border-b  "
        >
          <div className="flex items-center ">
            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
            <p
              style={{ marginLeft: "22px" }}
              className="text-16px font-medium widthSocial "
            >
              Instagram
            </p>
          </div>
          <Button
            style={{ width: "75px" }}
            className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
          >
            Холбох
          </Button>
        </div>
        <div
          style={{ paddingBlock: "14px" }}
          className="flex items-center justify-between w-full border-b"
        >
          <div className="flex items-center">
            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
            <p style={{ marginLeft: "22px" }} className="text-16px font-medium">
              Facebook
            </p>
          </div>
          <Button
            style={{ width: "75px" }}
            className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
          >
            Холбох
          </Button>
        </div>
        <div
          style={{ paddingBlock: "14px" }}
          className="flex items-center justify-between w-full border-b"
        >
          <div className="flex items-center">
            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
            <p style={{ marginLeft: "22px" }} className="text-16px font-medium">
              Tiktok
            </p>
          </div>
          <Button
            style={{ width: "75px" }}
            className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
          >
            Холбох
          </Button>
        </div>
        <div
          style={{ paddingBlock: "14px" }}
          className="flex items-center justify-between w-full border-b"
        >
          <div className="flex items-center">
            <span className="icon-fi-rs-drag text-caak-darkBlue text-20px" />
            <p style={{ marginLeft: "22px" }} className="text-16px font-medium">
              Twitter
            </p>
          </div>
          <Button
            style={{ width: "75px" }}
            className="bg-caak-bleudefrance text-12px h-c2 rounded-full"
          >
            Холбох
          </Button>
        </div>
      </div>
    </>
  );
}
