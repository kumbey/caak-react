import Consts from "../../Utility/Consts";

/**
 * Verification Code input field that expands to width of parent container. Get value with #verificationCode
 *
 * DO NOT PUT MORE THAN 1 OF THIS COMPONENT ON THE SAME PAGE! It will break due to ID related errors.
 */
function OtpInput({className, onChange, ...props}) {

    return (
        <div className={`verificationCode-wrapper ${props.className}`}>
            <label htmlFor="verificationCode">Баталгаажуулах
                код</label>
            <div className="verificationCode-outerDiv">
                <div className="verificationCode-innerDiv">
                    <input type="text"
                        maxLength="6"
                        name="verificationCode"
                        id="verificationCode"
                        spellCheck="false"
                        onChange={(e) => {
                            onChange(e.target.value.replace(Consts.regexNumber, ""));
                        }}
                        {...props}
                    >
                    </input>
                </div>
            </div>
        </div>
    )
}


export default OtpInput;
