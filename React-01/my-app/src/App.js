import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import Home from "./components/Home/Home";
import store from "./Redux/redux-store";


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized)
        {
            return <Preloader />
        }

        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>

                <div className="App">
                    <div className='app-wrapper'>
                        <HeaderContainer/>
                        <Navbar/>
                        <div className="app-wrapper-content">
                            <Routes>
                                <Route path="profile/:userId?" element={<ProfileContainer/>}/>
                                <Route path="users" element={<UsersContainer/>}/>
                                <Route path="dialogs" element={<DialogsContainer/>}/>
                                <Route path="news" element={<News/>}/>
                                <Route path="music" element={<Music/>}/>
                                <Route path="settings" element={<Settings/>}/>
                                <Route path="login" element={<Login/>}/>
                                <Route path="" element={<Home />}/>

                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>

        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}


const AppContainer = compose(
connect(mapStateToProps, {initializeApp}),
    // withRouter,
)
(App);

const AppWithProvider = () =>
{
    return (
    <Provider store={store}>
        <React.StrictMode>
            <AppContainer />
        </React.StrictMode>
    </Provider>
    );
}


export default AppWithProvider


