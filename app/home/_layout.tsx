import React from 'react';
import {FontAwesome, FontAwesome6} from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useTheme } from "@/hooks"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const iconColor = theme.palette.icon.get(theme.variant.icon);
    const backgroundColor = theme.palette.background.get(theme.variant.background);

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {backgroundColor},
                headerStyle: {backgroundColor},
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={iconColor} />,
                    headerRight: () => (
                        <Link href="/contact-us" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome6
                                        name="message"
                                        size={25}
                                        color={iconColor}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={iconColor} />,
                }}
            />
        </Tabs>
    );
}
