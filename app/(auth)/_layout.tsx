import { Stack, Slot } from 'expo-router';
import { useTheme } from "@/hooks"

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function Main(){
    const theme = useTheme();

    const headerStyle = {
        backgroundColor: theme.palette.background.get(theme.variant.background),
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false, headerStyle}} />
            <Stack.Screen name="login" options={{headerShown: false, headerStyle}} />
            <Stack.Screen name="register" options={{headerShown: false, headerStyle}} />
        </Stack>
    );
}

