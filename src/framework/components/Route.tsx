import React from "react";
import {RouteProps} from "react-router";
import {Redirect, Route} from "react-router-dom";
import {PickOptional} from "../utils/type";
import ErrorBoundary from "./ErrorBoundary";

interface Props extends RouteProps {
    withErrorBoundary?: boolean;
    accessCondition?: boolean;
    unauthorizedRedirectTo?: string;
}

export default class RouteComponent extends React.PureComponent<Props> {
    public static defaultProps: PickOptional<Props> = {
        exact: true,
        withErrorBoundary: true,
        accessCondition: true,
        unauthorizedRedirectTo: "/",
    };

    render() {
        const {component, withErrorBoundary, accessCondition, unauthorizedRedirectTo, ...restProps} = this.props;
        const TargetComponent = component ? component! : null;
        const routeNode = <Route {...restProps} render={props => TargetComponent && (accessCondition ? <TargetComponent {...props} /> : <Redirect to={{pathname: unauthorizedRedirectTo}} />)} />;
        return withErrorBoundary ? <ErrorBoundary>{routeNode}</ErrorBoundary> : routeNode;
    }
}
