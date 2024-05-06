import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "./records";
import Actions from "./actions";
import { faker } from "@faker-js/faker";

function makePlan(price, name){
    return {
        id: faker.random.uuid(),
        price: price,
        name: name,
        billing: 'monthly',
        variants: [],
        lacks: [],
        offers: [],
        features: [],
    }
}

const AnonUser = new User({});

export function useSubscriptionFeature(id){
    return {
        id: id,
        name: faker.lorem.words(),
        description: faker.lorem.sentence(),
    }
}

export function useSubscriptionPlans(){
    const plans = useSelector(state => state.plans);
    return plans.rows;
}

export function usePaidSubscriptions(id){
}

export function usePaidPlans(){
    const plans = useSelector(state => state.plans);
    return plans.rows;
}

export function usePaidPlan(id){
    return useSelector(state => state.plans.find(id));
}

export function usePaidFeatures(ids){
    const features = useSelector(state => state.features);
    return useMemo(() => {
        return features.rows
    }, [ids, features.rows]);
}

export function usePaidFeature(id){
    return useSelector(state => state.features.find(id));
}

export function usePaidSubscription(id){
    return useSelector(state => state.subscriptions.find(id));
}   

export function useAuth() {
    return useSelector(state => state.auth);
}

export function useUserSubscription(){
    const plans = usePaidPlans();
    return {
        services: plans,
        unsubscribe(id) {
            return Promise.reject("TODO");
        },
        subscribe(plan) {
            return Promise.reject("TODO");
        }
    }
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


    async function signup(params) {
        const action = Actions.Auth.signup(params);   
        const auth = await dispatch(action);
        return auth;
    }

    return useMemo(() => {
        return {
            auth,
            user,
            logout,
            signup,
            loginWithPassword,
        };
    }, [auth, user]);
}
