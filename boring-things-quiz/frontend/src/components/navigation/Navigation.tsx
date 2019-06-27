import React, {Dispatch, SetStateAction} from 'react';
import {LEVEL_ONE, LEVEL_THREE, LEVEL_TWO} from "../../constants";
import { Trans } from "@lingui/macro";
import './Navigation.css';


interface Props {
    currentPage: string,
    levelThreeUnlocked: boolean,
    setCurrentPage: Dispatch<SetStateAction<string>>,
    setShowHelp: Dispatch<SetStateAction<boolean>>,
    resetGame: () => void;
}

const Navigation = (props: Props) => {

    const { currentPage, levelThreeUnlocked, setCurrentPage, setShowHelp, resetGame } = props;

    const handleClick = (level: string) => {
        if (currentPage !== level) {
            setCurrentPage(level);
            resetGame();
        }

        setShowHelp(false);
    };

    return <nav className="row teal">
        <div className="nav-wrapper">
            <div className="col s12 ">
                <a className={currentPage === LEVEL_ONE ? 'active breadcrumb' : 'breadcrumb'}
                   onClick={() => {
                       handleClick(LEVEL_ONE)
                   }}> <Trans>Raten</Trans> </a>
                <a className={currentPage === LEVEL_TWO ? 'active breadcrumb' : 'breadcrumb'}
                   onClick={() => handleClick(LEVEL_TWO)}> <Trans>Matchen</Trans></a>
                {levelThreeUnlocked &&
                <a className={currentPage === LEVEL_THREE ? 'active breadcrumb' : 'breadcrumb'}
                   onClick={() => handleClick(LEVEL_THREE)}> <Trans>Tindern</Trans>
                </a>}
            </div>
        </div>
    </nav>
};

export default Navigation;
