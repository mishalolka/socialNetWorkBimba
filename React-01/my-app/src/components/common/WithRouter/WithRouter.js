// import { useNavigate } from 'react-router';
//
// export const withRouter = (Component) =>{
//     const Wrapper = (props) =>{
//         const history = useNavigate();
//         return <Component history={history} {...props}/>
//     }
//     return Wrapper;
// }

import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}