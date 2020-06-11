// @ts-nocheck

import * as React from 'react';

import './SettingsBottom.scss';

import { CtxConsumer } from '../../context/context';

export default function SettingsBottom() {
    return (
        <CtxConsumer>
            {(ctx) => {
                const { resetSettings } = ctx;

                return (
                    <div className="bottom-section">
                        <div className="bottom-wrapper">
                            <button 
                                id="reset-button"
                                onClick={resetSettings}
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
