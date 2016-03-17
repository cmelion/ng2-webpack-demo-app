/// <reference path="../../../../../../typings/tsd.d.ts" />

var React = require('react');
var ReactDOM = require('react-dom');
var NotificationSystem = require('react-notification-system');


var NGReactComponent = React.createClass<any>({
    _notificationSystem: null,

    _addNotification: function(event) {
        event.preventDefault();
        this._notificationSystem.addNotification({
            message: this.props.message,
            level: 'success'
        });
    },

    componentDidMount: function() {
        this._notificationSystem = this.refs.notificationSystem;
    },
    render: function(){

        return (
            <div>
                <p>Say Hello From React!</p>
                <p>
                    <button onClick={this._addNotification}>Hello</button>
                </p>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
});

export class NGReact{

    static initialize(message){
        ReactDOM.render(<NGReactComponent message={message} />, document.getElementById('ng-react-component'));
    }

}