import React, {ReactElement, useEffect} from 'react';
//@ts-ignore
import {Button, Col, Icon, Modal, Row} from 'react-materialize';
import {Trans} from '@lingui/macro';

interface Props {
    trigger: ReactElement,
    content: ReactElement,
    options?: object
}

const ModalDialog = (props: Props) => {

    let modalRef: any;

    useEffect(() => {
        if (modalRef && modalRef.modalRoot.firstElementChild) {
            modalRef.modalRoot.firstElementChild.scrollTo(0,0)
        }
    });

    return <Modal ref={(modal: Element) => modalRef = modal} trigger={props.trigger} options={props.options}
                  actions={<Button waves="green" modal="close" flat><Trans>Zurück</Trans></Button>}>
        {props.content}
    </Modal>
};

export default ModalDialog;