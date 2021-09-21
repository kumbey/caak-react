import { useState } from "react";

import Consts from "./Consts";

const Validation = (values) => {
    let errors = {}

    Object.keys(values).forEach((key) => {

        let value = values[key].value

        switch(values[key].type){
            case Consts.typeUsername:
                if(!value) {
                    errors[key] = "Та мэйл хаяг эсвэл утасны дугаар оруулна уу"
                }else if(!Consts.regexUsername.test(value)){
                    errors[key] = "Таны мэйл хаяг эсвэл утасны дугаар буруу байна"
                }
                break
            case Consts.typeName:
                if(!value) {
                    errors[key] = "Та хэрэглэгчийн нэрээ оруулна уу?"
                }
                break
            case Consts.typePassword:
                if(!value) {
                    errors[key] = 'Та нууц үгээ оруулна уу'
                } else if (!/^(?=.*[0-9])(?=.*[a-z]).{8,}$/i.test(value)) {
                    errors[key] = 'Та 8-с дээш оронтой тоо үсэг холилдсон нууц үг оруулна уу!'
                }
                break
            case Consts.typePasswordRepeat:
                if(!value) {
                    errors[key] = 'Та нууц үгээ давтан оруулна уу'
                } else if (value !== values[Consts.typePassword].value) {
                    errors[key] = 'Таны нууц үгнүүд зөрж байна'
                }
                break
            case Consts.typeGender:
                if(!value) {
                    errors[key] = 'Та хүйсээ сонгоно уу'
                }
                break
            case Consts.typeRequired:
                if(!value) {
                    errors[key] = "Утга оруулна уу?"
                }
                break
            default: 
                
        }
            
    })

    return errors;
}

const Validate = (variables) => {
    
    const [errors, setErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target;
        variables[name].onChange(value)
        setErrors({...errors, [name]: ""})
    }

    const handleSubmit = (callback) => {

        let retErrors = Validation(variables)

        if(Object.keys(retErrors).length === 0){
            callback()
        }

        setErrors(retErrors)
    }

    return { handleChange, handleSubmit, errors }
}

export default Validate