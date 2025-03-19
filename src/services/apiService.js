const BASE_URL = "http://127.0.0.1:5000";

export default {
    checkTokenExpiration(token) {
        if (!token) return true; // Si no hay token, se considera expirado.

        try {
            const payloadBase64 = token.split('.')[1]; // Extrae el payload
            const decodedPayload = JSON.parse(atob(payloadBase64)); // Decodifica el payload
            const exp = decodedPayload.exp; // Obtiene el tiempo de expiración
            if (!exp) return true; // Si no hay expiración en el token, se considera inválido.

            const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
            return exp < currentTime; // Retorna `true` si el token ha expirado
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return true; // Si hay error, asumimos que el token no es válido.
        }
    },

    async getCenters(token) {
        if (this.checkTokenExpiration(token)) throw new Error("Token expirado, inicia sesión nuevamente.");
        return await fetch(`${BASE_URL}/centers`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    async getDates(token) {
        if (this.checkTokenExpiration(token)) throw new Error("Token expirado, inicia sesión nuevamente.");
        return await fetch(`${BASE_URL}/dates`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    async getUserDates(token) {
        if (this.checkTokenExpiration(token)) throw new Error("Token expirado, inicia sesión nuevamente.");
        return await fetch(`${BASE_URL}/date/getByUser`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    async createDate(token, center, date) {
        if (this.checkTokenExpiration(token)) throw new Error("Token expirado, inicia sesión nuevamente.");
        return await fetch(`${BASE_URL}/date/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ center, date })
        });
    },

    async cancelDate(token, center, date) {
        if (this.checkTokenExpiration(token)) throw new Error("Token expirado, inicia sesión nuevamente.");
        return await fetch(`${BASE_URL}/date/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ center, date })
        });
    },

    async getUserProfile(token) {
        if (this.checkTokenExpiration(token)) throw new Error("Token expirado, inicia sesión nuevamente.");
        return await fetch(`${BASE_URL}/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    },

    async updateUserProfile(token, userData) {
        if (this.checkTokenExpiration(token)) throw new Error("Token expirado, inicia sesión nuevamente.");
        return await fetch(`${BASE_URL}/currentUser`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
    },

    async registerUser(userData) {
        return await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userData)
        });
    },

    async loginUser(credentials) {
        return await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(credentials)
        });
    }
};
