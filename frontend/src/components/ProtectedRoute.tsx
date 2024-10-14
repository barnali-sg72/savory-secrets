import { Route } from "react-router-dom";
import ErrorPage from "./ErrorPage";

type Props = {
    path: string,
    element: JSX.Element,
    children : React.ReactNode|null
}

export default function ProtectedRoute(props: Props) {
    const isAuthenticated = () => {
        return localStorage.getItem('user') != null && localStorage.getItem('user') != undefined;
    }
    return (
        <>
            {isAuthenticated() ?
                <Route path={props.path} element={props.element}></Route>
            :<>
                <Route path='/error' element={<ErrorPage />} />
            </>}
            
        </>
    )
}