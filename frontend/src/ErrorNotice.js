    import React from 'react'
    import {
        Alert,
        CardBody,
    } from 'reactstrap';
    
    function ErrorNotice(props) { 
        return (
            <CardBody style={{width:"100%"}}>
                <div>
                    <Alert color="danger" isOpen={props.visible} toggle={props.onDismiss} fade={false}>
                        {props.message}
                    </Alert>
                </div>
            </CardBody>
        )
    }
    
    export default ErrorNotice
    