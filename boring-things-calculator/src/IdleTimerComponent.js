import React from 'react'
import IdleTimer from 'react-idle-timer'
import App from './App'

const IdleTimerComponent = () => {

    const onIdle = () => {
        window.location.reload();
    };

    return (
        <div>
            <IdleTimer
                element={document}
                onIdle={onIdle}
                debounce={250}
                timeout={1000 * 60 * 5}/>
            <App/>
        </div>
    )
};

export default IdleTimerComponent;
