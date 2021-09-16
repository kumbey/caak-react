/**
 * Verification Code input field that expands to width of parent container. Get value with #verificationCode
 *
 * DO NOT PUT MORE THAN 1 OF THIS COMPONENT ON THE SAME PAGE! It will break due to ID related errors.
 */
function OtpInput(props) {
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
                           pattern="\d*"
                           spellCheck="false"
                           onInput={() => {
                               let input = document.getElementById("verificationCode");
                               input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                           }}
                           onKeyPress={() => {
                               if (document.getElementById("verificationCode").value.length === 6)
                                   return false;
                           }} onChange={(e) => props.onChange(e)}>
                    </input>
                </div>
            </div>
        </div>
    )
}

export default OtpInput;
