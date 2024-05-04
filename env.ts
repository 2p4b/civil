export default {
    get(key: string) {
        const env_key = `EXPO_PUBLIC_${key.toUpperCase()}`;
        return process.env[env_key];
    }
}
