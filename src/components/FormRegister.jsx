import { useState } from "react";
import { saveToLocalStorage } from "../utils/localStorageUtils";

const FormRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        position: "",
        github: "",
        linkedin: ""
    })

    const [alertMessage, setAlertMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!formData.name || !formData.email || !formData.phone) {
            setAlertMessage("Erro ao cadastrar. Verifique os dados preenchidos.")
            return
        }

        // Salvar os dados em localStorage

    }
}

export default FormRegister