import { useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const useNavigationRef = () => {
    //@ts-ignore
  return useRef<NavigationContainerRef>(null);
};
