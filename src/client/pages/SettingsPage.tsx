// @ts-nocheck

import * as React from 'react';

import SettingsMain from '../components/SettingsMain/SettingsMain';
import SettingsBottom from '../components/SettingsBottom/SettingsBottom';


export default function SettingsPage(props) {
    // console.log('location.pathname:', props.location.pathname);
    return (
        <>
            <SettingsMain />
            <SettingsBottom />
        </>
    );
}


