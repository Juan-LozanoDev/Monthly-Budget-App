// Regex for validate an Email
export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

// Regex for validate a Password
export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
}

// Regex for validate Names
export const validateName = (name) => {
    const regex = /^[a-zA-ZñÑ ]{3,50}$/
    return regex.test(name)
}

// Obtain initials from user
export const getInitials = (full_name) => {
    if (full_name) {
        return full_name.split(" ").map((name) => name[0]).join(" ").slice(0, 3)
    }
    return ""
}

// Formating last user connection
export const formatHour = (hour) => {
    const date = new Date(hour).toLocaleString('es-CO', {
        year: "numeric",
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
    return date
}