import React, { useEffect } from 'react';
import AppStack from './navigation/NavigationStack';
import BottomTabs from './compoents/BottomTabs/BottomTabs.index';
import LoadingComponent from './compoents/molecules/Loading/Loading';
import store, { useAppSelector } from './Store/store.index';

const AppInit: React.FC<{}> = () => {
    const loginSelector = useAppSelector(state => state.userSlice.user);
    // const [showTabs, setShowTabs] = React.useState(false);
    
    
    const show = loginSelector.phone ? true : false;
    return (
        <>
            <AppStack key={loginSelector.phone+"Stack"} />
            <BottomTabs key={loginSelector.phone} showTabs={show} />
            <LoadingComponent key={loginSelector.phone+'login'} />
        </>
    )
}

export default AppInit;