/// <reference path="../../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

// No type definition available quick and dirty require instead
var NotificationSystem = require('react-notification-system');

class NGReactProps {
    public message: string;
}

class NGReactComponent extends React.Component<NGReactProps, any> {
    private _notificationSystem = null;

    constructor(props:NGReactProps) {
        super(props);
    }

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
    }

    _addNotification() {
        this._notificationSystem.addNotification({
            message: this.props.message,
            level: 'success'
        });
    }

    render() {
        return (
            <div>
                <p>Say Hello From React!</p>
                <p>
                    <button onClick={this._addNotification.bind(this)}>Hello</button>
                </p>
                <NotificationSystem ref="notificationSystem" />
            </div>
        )
    }
}

export class NGReact{
    static initialize(message){
        ReactDOM.render(<NGReactComponent message={message}/>, document.getElementById('ng-react-component'));
    }

}