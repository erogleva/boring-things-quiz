import React, {ReactElement, useEffect} from 'react';
//@ts-ignore
import {Button, Col, Icon, Modal, Row} from 'react-materialize';
import {Trans} from '@lingui/macro';

interface Props {
    trigger?: ReactElement,
    content: ReactElement,
    options?: any,
    open?: boolean
}

const ModalDialog = (props: Props) => {

    let modalRef: any;

    useEffect(() => {
        if (modalRef && modalRef.modalRoot.firstElementChild) {
            modalRef.modalRoot.firstElementChild.scrollTo(0,0)
        }
    });

    const onOpenStart = () => {
        if (props.options && props.options.onOpenStart){
            props.options.onOpenStart()
        }
        if (modalRef && modalRef.modalRoot.firstElementChild) {
            modalRef.modalRoot.firstElementChild.scrollTo(0,0)
        }
    };

    return <Modal ref={(modal: Element) => modalRef = modal} open={props.open} trigger={props.trigger} options={{...props.options, onOpenStart: onOpenStart}}
                  actions={<Button waves="green" modal="close" flat><Trans>Zurück</Trans></Button>}>
        {props.content}
    </Modal>
};

export default ModalDialog;