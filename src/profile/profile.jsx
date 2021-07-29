import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {profileUserApi} from "../reduse/reduserSitebar";
import loading from "./../circles.svg"
import {compose} from "redux";

class Maps extends Component {
    constructor(props) {
        super(props);
        this.inref = React.createRef()
    }

    componentDidMount() {
        let userId = this.props.match.params.userid
        this.props.profileUserApi(userId)
    }

    state = {
        stop: true,
    }
    input = () => {
        this.setState({
            stop: false
        })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.stop
                        ? <div><input type="text"
                                      ref={this.inref}
                                      onBlur={this.input}/></div>
                        : <div>{this.inref.current.value} </div>
                    }
                    <div>
                        {this.props.profile &&
                        <div>
                            <div>Id: {this.props.profile.userId}</div>
                            <div>Name: {this.props.profile.fullName}</div>
                            <div>
                                {this.props.profile.photos.small === null
                                    ? <img src={loading} alt=""/>
                                    :  <img src={this.props.profile.photos.small} alt=""/>
                                }
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.login.profile,
        isAuth: state.login
    }
}
let UserMaps = withRouter(Maps)
export default compose(
    connect(mapStateToProps, {profileUserApi})
)(UserMaps)


