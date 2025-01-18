export const saveToLocalStorage = (key, data) => {
    // Recuperar a chave e o valor inserido
    const existingData = JSON.parse(localStorage.getItem(key)) || []

    // Armazenar a chave o valor o inserido e mantendo os atuais.
    localStorage.setItem(key, JSON.stringify([...existingData, data]))
}

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || []
}