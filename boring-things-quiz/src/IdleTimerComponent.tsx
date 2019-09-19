import React from 'react'
import IdleTimer from 'react-idle-timer'
import App from './App'

const IdleTimerComponent = () => {

    let idleTimer: IdleTimer | null;

    const onIdle = () => {
        window.location.reload();
    };

    return (
        <div>
            <IdleTimer
                ref={ref => {
                    idleTimer = ref
                }}
                element={document}
                onIdle={onIdle}
                debounce={250}
                timeout={1000 * 60 * 5}/>
            <App/>
        </div>
    )
};

export default IdleTimerComponent;
