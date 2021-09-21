import Consts from "../../Utility/Consts";

/**
 * Verification Code input field that expands to width of parent container. Get value with #verificationCode
 *
 * DO NOT PUT MORE THAN 1 OF THIS COMPONENT ON THE SAME PAGE! It will break due to ID related errors.
 */
function OtpInput({className, onChange, ...props}) {

    return (
        <div className={`verificationCode-wrapper ${className}`}>
            <div className="verificationCode-outerDiv">
                    <input type="number"
                        maxLength="7"
                        name="verificationCode"
                        id="verificationCode"
                        spellCheck="false"
                        {...props}
                    >
                    </input>
            </div>
        </div>
    )
}


export default OtpInput;
