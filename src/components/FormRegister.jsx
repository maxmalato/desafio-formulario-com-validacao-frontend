import { useState, useEffect } from "react";
import { registerSchema } from "../schemas/registerSchema.js";
import { saveToSessionStorage, getFromSessionStorage } from "../utils/sessionStorageUtils.js";
import Message from "./Message.jsx";

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
    const [typeMessage, setTypeMessage] = useState("")
    const [errors, setErrors] = useState({})
    const [savedData, setSavedData] = useState([])

    useEffect(() => {
        const storeData = getFromSessionStorage("usuarios") || []
        setSavedData(storeData)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Limpa o erro do campo ao digitar.
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const dataToValidate = {
            ...formData,
            github: formData.github.trim() === "" ? undefined : formData.github,
            linkedin: formData.linkedin.trim() === "" ? undefined : formData.linkedin
        }

        try {
            const validateData = registerSchema.parse(dataToValidate)
            saveToSessionStorage("usuarios", [...savedData, validateData])

            setAlertMessage("Cadastro realizado com sucesso!")
            setTypeMessage("sucesso")
            setErrors({}) // Limpa todos os erros
            setFormData({
                name: "",
                email: "",
                phone: "",
                position: "",
                github: "",
                linkedin: ""
            })
            // Atualiza o estados com novos dados
            setSavedData((prevData) => [...prevData, validateData])
        } catch (error) {
            if (error.errors) {
                // Mapeamento dos erros
                const fieldErrors = {}
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message
                })

                setErrors(fieldErrors)
            }
            setAlertMessage("Falha ao cadastrar. Verifique os dados informados.")
            setTypeMessage("erro")
        }
    }

    return (
        <main>
            <h1 className="text-4xl font-semibold my-7">Cadastro de Membros</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
                <input
                    className="border p-2 rounded-lg placeholder:font-semibold w-80 focus:outline-blue-400 bg-transparent placeholder:text-slate-600"
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className="error text-red-500 text-xs w-80 text-start font-semibold">{errors.name}</span>}

                <input
                    className="border p-2 rounded-lg placeholder:font-semibold w-80 focus:outline-blue-400 bg-transparent  placeholder:text-slate-600"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error text-red-500 text-xs w-80 text-start font-semibold">{errors.email}</span>}

                <input
                    className="border p-2 rounded-lg placeholder:font-semibold w-80 focus:outline-blue-400 bg-transparent  placeholder:text-slate-600"
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone && <span className="error text-red-500 text-xs w-80 text-start font-semibold">{errors.phone}</span>}

                <select
                    className="border p-2 rounded-lg w-80 focus:outline-blue-400 bg-transparent"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                >
                    <option value="">Selecione um cargo</option>
                    <option value="Analista de Sistemas">Analista de Sistemas</option>
                    <option value="Analista Programador">Analista Programador</option>
                    <option value="Arquiteto de Software">Arquiteto de Software</option>
                    <option value="Desenvolvedor Backend">Desenvolvedor Backend</option>
                    <option value="Desenvolvedor Frontend">Desenvolvedor Frontend</option>
                    <option value="Desenvolvedor Full Stack">Desenvolvedor Full Stack</option>
                    <option value="Desenvolvedor Mobile">Desenvolvedor Mobile</option>
                    <option value="Desenvolvedor de Software">Desenvolvedor de Software</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Engenheiro de Dados">Engenheiro de Dados</option>
                    <option value="Engenheiro de Software">Engenheiro de Software</option>
                    <option value="Product Owner">Product Owner</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="Scrum Master">Scrum Master</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                </select>
                {errors.position && <span className="error text-red-500 text-xs w-80 text-start font-semibold">{errors.position}</span>}

                <input
                    className="border p-2 rounded-lg placeholder:font-semibold w-80 focus:outline-blue-400 bg-transparent  placeholder:text-slate-600"
                    type="text"
                    name="github"
                    placeholder="URL do GitHub (opcional)"
                    value={formData.github}
                    onChange={handleChange}
                />
                {errors.github && <span className="error text-red-500 text-xs w-80 text-start">{errors.github}</span>}

                <input
                    className="border p-2 rounded-lg placeholder:font-semibold w-80 focus:outline-blue-400 bg-transparent  placeholder:text-slate-600"
                    type="text"
                    name="linkedin"
                    placeholder="URL do LinkedIn (opcional)"
                    value={formData.linkedin}
                    onChange={handleChange}
                />
                {errors.linkedin && <span className="error text-red-500 text-xs w-80 text-start">{errors.linkedin}</span>}

                <button type="submit" className="p-2 border border-blue-200 transition-colors rounded-md font-medium w-80 hover:border-blue-600">Cadastrar</button>
            </form>
            <div className="flex justify-center">
                {alertMessage && <Message type={typeMessage} message={alertMessage} />}
            </div>

            <section>
                <h2 className="text-2xl font-semibold my-10 transition-colors hover:text-slate-500">
                    Membros Cadastrados
                </h2>
                {savedData.length > 0 ? (
                    <ul className="flex flex-col items-center gap-3 px-2 flex-wrap md:flex-row md:justify-center">
                        {savedData.map((user, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-start p-4 gap-2 border-2 rounded-lg shadow-md mb-5 w-80 transition-colors hover:bg-slate-50 lg:w-96 overflow-x-auto"
                            >
                                <p className="flex">
                                    <span className="font-semibold flex-shrink-0 mr-2">Nome:</span>
                                    <span className="truncate overflow-hidden">{user.name}</span>
                                </p>
                                <p className="flex">
                                    <span className="font-semibold flex-shrink-0 mr-2">E-mail:</span>
                                    <span className="truncate overflow-hidden">{user.email}</span>
                                </p>
                                <p className="flex">
                                    <span className="font-semibold flex-shrink-0 mr-2">Telefone:</span>
                                    <span className="truncate overflow-hidden">{user.phone}</span>
                                </p>
                                <p className="flex">
                                    <span className="font-semibold flex-shrink-0 mr-2">Cargo:</span>
                                    <span className="truncate overflow-hidden">{user.position}</span>
                                </p>
                                <p className="flex">
                                    <span className="font-semibold flex-shrink-0 mr-2">GitHub:</span>
                                    <span className="truncate overflow-hidden">
                                        {user.github || "N/A"}
                                    </span>
                                </p>
                                <p className="flex">
                                    <span className="font-semibold flex-shrink-0 mr-2">LinkedIn:</span>
                                    <span className="truncate overflow-hidden">
                                        {user.linkedin || "N/A"}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p className="font-semibold">Nenhum membro cadastrado.</p>
                )}
            </section>
        </main>
    )
}

export default FormRegister