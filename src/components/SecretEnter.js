//TODO: Handle submittal
import React from 'react';
import './secretEnter.css'
import PropTypes from "prop-types";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class SecretEnter extends React.Component {
    static propTypes = {
        clickHandler: PropTypes.func
        
    };

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    

    onSubmit(e){
        // Submit secret to database

        // Prevent the default submit action
        e.preventDefault();

        // Grab the value from the form entry
        var secret = this.refs.secret.value

        // Clear the form
        this.refs.secret.value = '';

        // Run the associated function passed in as a prop
        this.props.clickHandler(secret);
    };

    render() {
        return (
            <div className = "component-secret-entry">
                <form onSubmit={this.onSubmit}>
                    <InputGroup size="lg" className="mb-3">
                        <Form.Control
                        placeholder="What's your secret?"
                        aria-describedby="basic-addon2"
                        as="textarea" aria-label="With textarea"
                        ref="secret"
                        />
                        <InputGroup.Append>
                        <Button variant="outline-primary" type="submit">submit</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
            </div>
        );
    }
}
//<input className = "component-form" type="text" name = "secret" ref = "secret" placeholder = "what's your secret?" id = "secret" />
//<input type="submit" value="submit" className="component-button" />      