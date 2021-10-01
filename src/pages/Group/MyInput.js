export default function MyInput({text, title, className}) {
    return (
        <form className={`grid ${className && className}`}>
            <input className="relative border-caak-titaniumwhite rounded-lg pt-c3 text-caak-generalblack text-16px font-normal w-full" value={text} type="text" name="name" />
            <p style={{marginTop: "14px", marginLeft: "14px"}} className="absolute text-caak-darkBlue text-12px">{title}</p>
        </form>
    )
}
