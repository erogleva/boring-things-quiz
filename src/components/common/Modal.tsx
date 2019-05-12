import React, {ReactElement} from 'react';
//@ts-ignore
import {Button, Col, Icon, Modal, Row} from 'react-materialize';
import {Trans} from '@lingui/macro';

interface Props {
    trigger: ReactElement,
    content: ReactElement,
    options?: object
}

const ModalDialog = (props: Props) => {
    return <Modal trigger={props.trigger} options={props.options} actions={<Button waves="green" modal="close" flat><Trans>Zurück</Trans></Button>}>
        {props.content}
    </Modal>
};

export default ModalDialog;