import React from "react";
import { connect, DispatchProp } from "react-redux";
import {AllState} from "../../../utils/state"
import { actions } from "../index";

interface Props extends DispatchProp {
    name: string;
}

class Main extends React.PureComponent<Props> {
    render() {
        return (
            <div>
                {this.props.name}
                <button
                    onClick={() => {
                        this.props.dispatch(actions.test());
                    }}
                >
                    Test
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: AllState) => {
    return {
        name: state.home.name,
    };
};

export default connect(mapStateToProps)(Main);
