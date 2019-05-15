import React, {Dispatch, SetStateAction, SyntheticEvent} from 'react';
import { Trans } from '@lingui/macro';
//@ts-ignore
import { Row, Button, Select } from 'react-materialize';
import './LandingPage.css';
import {LanguageString} from "../../App";
import { LEVEL_ONE } from "../../constants";

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


    return <div className="landing-page-text">
        <Trans render="h1">Lauter langweilige Sachen?</Trans>
        <Trans render="h6">
            Auch unscheinbare Objekte können eine Geschichte erzählen.
        </Trans>

        <Trans render="h6">Lass uns auf Entdeckungsreise gehen und spannende Objekte kennenlernen,
            die im <a href="https://www.tuebingen.de/stadtmuseum/" target="_blank">Stadtmuseum Tübingen </a> ausgestellt sind.</Trans>

        <Trans render="h6" className='choose-language'>Wähle deine Sprache</Trans>

        <Select onChange={handleSelect}>
            <option value="de">
                Deutsch
            </option>
            <option value="en">
                English
            </option>
        </Select>

        <Button onClick={() => props.setCurrentPage(LEVEL_ONE)}><Trans>Los geht’s!</Trans></Button>
    </div>;
};

export default LandingPage;