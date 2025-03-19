const BASE_URL = "http://127.0.0.1:5000";

export default {
    async getCenters(token) {
        return await fetch(`${BASE_URL}/centers`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    async getDates(token) {
        return await fetch(`${BASE_URL}/dates`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    async getUserDates(token) {
        return await fetch(`${BASE_URL}/date/getByUser`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },

    async createDate(token, center, date) {
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
        return await fetch(`${BASE_URL}/profile`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    },

    async updateUserProfile(token, userData) {
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
