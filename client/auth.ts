export default {

    async loginWithEmail({email, password}) {
        return await this.auth.signInWithPassword({
            email, password
        })
    },

    async loginWithPhone({phone}) {
        return await this.auth.signInWithOtp({
            phone
        })
    },

    async registerWithEmail({email, password}) {
        return await this.auth.signUp({
            email, password
        })
    },

    async registerWithPhone({phone, password}) {
        return await this.auth.signUp({
            phone, password
        })
    },

    async logout() {
        return await this.auth.signOut()
    }

}
