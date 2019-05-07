import React, {Dispatch, SetStateAction, SyntheticEvent} from 'react';
import { Trans } from '@lingui/macro';
//@ts-ignore
import { Row, Button, Select } from 'react-materialize';
import './LandingPage.css';
import FlagIcon from './../common/FlagIcon.tsx';
import {LanguageString} from "../../App";

interface Props {
    setCurrentPage: Dispatch<SetStateAction<string>>,
    setLanguage: Dispatch<SetStateAction<LanguageString>>
}

const LandingPage = (props: Props) => {

    const handleSelect = (event: any) => {
        // event.persist();
        console.log(event);
        props.setLanguage(event.target.value);
    };


    return <div className="landing-page">
        <Trans render="h6">
            Auch langweilige Sachen können eine Geschichte erzählen.
        </Trans>

        <Trans render="h6">Lass uns auf Entdeckungsreise gehen und spannende Objekte kennenlernen,
            die im Stadtmuseum Tübingen ausgestellt sind.</Trans>

        <Select onChange={handleSelect}>
            <option value="de">
                Deutsch
            </option>
            <option value="en">
                English
            </option>
        </Select>

        <Button onClick={() => props.setCurrentPage('level-one')}><Trans>Los geht’s!</Trans></Button>
    </div>;
};

export default LandingPage;