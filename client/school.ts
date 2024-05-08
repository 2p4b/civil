export default {

    async createSchool({name, description}) {
        return await this.endpoint.from("schools").select("*");
    },

    async getSchool(id) {
        return await this.endpoint.getSchool(id)
    },

    async listUserSchools() {
        return await this.endpoint.from("schools").select("*");
    },

    async loginWithPhone({phone}) {
    },

    async registerWithEmail({email, password}) {
    },

    async registerWithPhone({phone, password}) {
    },

    async logout() {
    }
}

