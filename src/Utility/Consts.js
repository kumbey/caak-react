const Consts = {
    typeEmail: "email",
    typePhoneNumber: "phonenumber",
    typeMismatch: "mismatch",
    typeUsername: "username",
    typeName: "name",
    typeGender: "gender",
    typePassword: "password",
    typePasswordRepeat: "passwordRepeat",
    regexUsername: /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]|^[0-9]{8}$/,
    regexPassword: /^(?=.*[0-9])(?=.*[a-z]).{8,}$/,
    regexNumber: /[^\d.]/ig,
    typeRequired: "required",
    SS_UserKey: "user",
    signInUp: "signInUp"
}

export default Consts