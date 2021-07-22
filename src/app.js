import {HashRouter,Switch,Route} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Head from "./head";
import React from  'react'
import Index from "./person/index";
import Register  from "./register";
import Create from "./create";
import Edit from "./edit";
function App() {
    return(
        <div>
            <HashRouter>
                <Head></Head>
                <Switch>
                    <Route exact path={'/'} >
                        <Home></Home>
                    </Route>
                    <Route  path={'/login'} >
                        <Login></Login>
                    </Route>
                    <Route  path={'/register'} >
                        <Register></Register>
                    </Route>
                    <Route path={'/index'} component={Index}></Route>
                    <Route path={'/create'} component={Create}></Route>
                    <Route path={'/edit/:id'} component={Edit}></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}
export default App
