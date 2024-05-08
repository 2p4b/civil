import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "./records";
import Actions from "./actions";
import { tables } from "./reducers";
import { StoreList, StoreValue } from "@/records";
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

const defaultStoreList = new StoreList();
const defaultStoreValue = new StoreValue();

export function useStoreList(name){
    const table = "lists";
    const dispatch = useDispatch();
    const list = useSelector(state => state.tables.get(table).find(name)) ?? defaultStoreList;  
    return useMemo(() => {
        return {
            data: list.data,
            table: {
                actions: tables.actions,
            },
            add(payload, meta={}) {
                if(list.data.includes(payload)) {
                    return true;
                }
                if( list === defaultStoreList) {
                    const newlist = defaultStoreList.set("data", list.data.push(payload));
                    const action = tables.actions.load(table, name, newlist, meta);
                    return dispatch(action);
                }
                const updater = (old) => old.set("data", old.data.push(payload));
                const action = tables.actions.update(table, name, updater, meta);
                return dispatch(action);
            },
            remove(payload, meta={}) {
                if(!list.data.includes(payload)) {
                    return true;
                }
                if( list === defaultStoreList) {
                    return true;
                }

                if(typeof payload === "function") {
                    const updater = payload;
                    const action = tables.actions.set(table, name, "data", updater, meta);
                    return dispatch(action);
                } else {
                    const updater = (old) => old.set("data", old.data.filter(val => val !== payload));
                    const action = tables.actions.update(table, name, updater, meta);
                    return dispatch(action);
                }
            }
        }
    }, [list.data]);
}

export function useUserSchools(id){
    return useSelector(state => {
        return state.tables.schools;
    });
}

export function useEntity(table, id){
    const dispatch = useDispatch();
    const data = useSelector(state => state.tables.get(table).find(id));
    return useMemo(() => {
        return {
            data,
            load(payload, meta={}) {
                const action = tables.actions.load(table, id, payload, meta);
                return dispatch(action);
            },
            update(payload, meta={}) {
                const action = tables.actions.update(table, id, payload, meta);
                return dispatch(action);
            },
            set(field, value, meta={}) {
                const action = tables.actions.set(table, id, field, value, meta);
                return dispatch(action);
            },
            drop(meta={}) {
                const action = tables.actions.drop(table, id, meta);
                return dispatch(action);
            }
        }
    }, [data]);
}


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
        return auth;
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
