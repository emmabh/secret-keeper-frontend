import React from 'react';
//Import function for hover
import './info.css'

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
          isHovering: false,
        };
    }

    handleMouseHover = () => {
        this.setState(this.toggleHoverState);
    }
    
    toggleHoverState(state) {
        return {
          isHovering: !state.isHovering,
        };
    }
    render() {
        return (
            <div className = "component-info">
                <p onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseHover}> about </p>
                
                {
                    this.state.isHovering &&
                    <div className = "component-infoText">
                        This app is meant to show the types of stories we will share when no one is listening. Enter a secret of yours anonymously, and you will get back another secret!
                    </div>
                }
        
            </div>
        );
    }
}