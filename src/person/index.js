import {Switch,Route} from "react-router-dom";
import First from "./first";
import Name from "./username";
import Person from "./person";
import Message from "./message";
import Tiezi from "./tiezi";
import Set from "./set";
function Index() {
    return(
        <div>
            <Person></Person>
            <Switch>
                <Route exact path={'/index'} >
                    <First></First>
                </Route>
                <Route  path={'/index/name'} >
                    <Name></Name>
                </Route>
                <Route  path={'/index/mess'} >
                    <Message></Message>
                </Route>
                <Route  path={'/index/tie'} >
                    <Tiezi></Tiezi>
                </Route>
                <Route  path={'/index/set'} >
                    <Set></Set>
                </Route>
            </Switch>
        </div>

    )
}
export default Index
