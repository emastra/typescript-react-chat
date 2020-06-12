// @ts-nocheck

import * as React from 'react';

import './SettingsMain.scss';

import { CtxConsumer } from '../../context/context';

export default function SettingsMain() {
    return (
        <CtxConsumer>
            {(ctx) => {
                const { settings, handleInputChange } = ctx;
                const { username, selectedTheme, clockDisplay, ctrlEnter, language } = settings;

                return (
                    <div className="settings-wrapper">
                        <form id="settings-form" onSubmit={(e) => e.preventDefault()}>
                            <fieldset className="username box">
                                <p>User name</p>
                                <input 
                                    id="username-input" 
                                    name="username"
                                    value={username}
                                    onChange={handleInputChange}
                                />
                            </fieldset>

                            <fieldset id="interface-color" className="box">
                                <p>Interface color</p>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="selectedTheme"         
                                        value="light"
                                        onChange={handleInputChange}
                                        checked={selectedTheme === 'light'}
                                    />
                                    <span>Light</span> 
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="selectedTheme"   
                                        value="dark"
                                        onChange={handleInputChange}
                                        checked={selectedTheme === 'dark'} 
                                    />
                                    <span>Dark</span>
                                </label>
                            </fieldset>
                    
                            <fieldset id="clock-display" className="box">
                                <p>Clock display</p>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="clockDisplay" 
                                        value="12"
                                        onChange={handleInputChange}
                                        checked={clockDisplay === '12'}
                                    />
                                    <span>12 Hours</span>
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="clockDisplay" 
                                        value="24"
                                        onChange={handleInputChange}
                                        checked={clockDisplay === '24'}
                                    />
                                    <span>24 Hours</span>
                                </label>
                            </fieldset>
                    
                            <fieldset id="ctrl-enter" className="box">
                                <p>Send message on CTRL+ENTER</p>
                                <label htmlFor="on">
                                    <input 
                                        type="radio" 
                                        name="ctrlEnter"
                                        value="on" 
                                        onChange={handleInputChange}
                                        checked={ctrlEnter === 'on'}
                                    />
                                    <span>On</span>
                                </label>
                                <label htmlFor="off">
                                    <input 
                                        type="radio" 
                                        name="ctrlEnter"
                                        value="off" 
                                        onChange={handleInputChange}
                                        checked={ctrlEnter === 'off'}
                                    />
                                    <span>Off</span>
                                </label>
                            </fieldset>

                            <fieldset id="language" className="box">
                                <p>Language</p>
                                <select id="language-select">
                                    <option value="en">English</option>
                                </select>
                            </fieldset>
                        </form>
                    </div>
                );
            }}
        </CtxConsumer>
    );
}
