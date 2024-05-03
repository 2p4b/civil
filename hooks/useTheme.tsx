import React from 'react';
import Theme from '@/theme';

export default function useTheme() {
    return React.useContext(Theme.Context);
}
