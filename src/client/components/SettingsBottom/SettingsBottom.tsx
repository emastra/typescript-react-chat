// @ts-nocheck

import * as React from 'react';

import './SettingsBottom.scss';

import { CtxConsumer } from '../../context/context';

export default function SettingsBottom() {
    return (
        <CtxConsumer>
            {(ctx) => {
                const { resetStorageSettings } = ctx;

                return (
                    <div className="bottom-section">
                        <div className="bottom-wrapper">
                            <button 
                                id="reset-button"
                                onClick={resetStorageSettings}
                            >
                                Reset to defaults
                            </button>
                        </div>
                    </div>
                );
            }}
        </CtxConsumer>
    );
}
