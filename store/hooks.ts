import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "./records";
import Actions from "./actions";

const AnonUser = new User({});

export function useAuth() {
    return useSelector(state => state.auth);
}

export function useApp() {
    return useSelector(state => state.app);
}

export function useUsers() {
    return useSelector(state => state.users);
}

export function useUser(id, anon=true) {
    const user = useSelector(state => state.users.find(id));
    if (user) {
        return user;
    }
    if(anon) {
        return AnonUser;
    }
}

export function useAuthUser() {
    const auth = useAuth();
    const user = useUser(auth.id, true);
    return user
}

export function useSession() {
    const auth = useAuth();
    const dispatch = useDispatch();
    const user = useUser(auth.id, true);

    async function loginWithPassword(params) {
        const action = Actions.Auth.loginWithPassword(params);   
        const auth = await dispatch(action);
        return 
    }

    async function logout() {
        const action = Actions.Auth.logout({});   
        const auth = await dispatch(action);
        return auth;
    }


    return useMemo(() => {
        return {
            auth,
            user,
            logout,
            loginWithPassword,
        };
    }, [auth, user]);
}
