export const saveToSessionStorage = (key, data) => {
    // Recuperar a chave e o valor inserido
    const existingData = JSON.parse(sessionStorage.getItem(key)) || []

    // Armazenar a chave o valor o inserido e mantendo os atuais.
    sessionStorage.setItem(key, JSON.stringify([...existingData, data]))
}

export const getFromSessionStorage = (key) => {
    return JSON.parse(sessionStorage.getItem(key)) || []
}