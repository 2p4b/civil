import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import Theme from '@/theme';
import store from "@/store";
import { useTheme } from "@/hooks"
import { colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { StripeProvider } from '@stripe/stripe-react-native';

const client = {
    getUsers: async () => {
        return await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
    }
}
store.init({client});

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const defaultTheme = new Theme();

export function Main(){
    const theme = useTheme();
    const headerStyle = {
        backgroundColor: theme.palette.background.get(theme.variant.background),
    }
    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false, headerStyle}} />
            <Stack.Screen name="home" options={{ headerShown: false, headerStyle}} />
        </Stack>
    );
}

function RootLayout() {
    const colorScheme = useColorScheme();
    return (
        <StripeProvider 
            urlScheme={process.env.EXPO_PUBLIC_MECHANT_APP_URL} 
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY} 
            mechantIdentifier={process.env.EXPO_PUBLIC_MECHANT_APP_NAME}>
            <Theme.Context.Provider value={defaultTheme}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <Main />
                </ThemeProvider>
            </Theme.Context.Provider>
        </StripeProvider>
    );
}

export default function Layout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <RootLayout />
        </Provider>
    );
}

