import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import Todo from '../pages/Todo'
import ChatBoot from '../pages/ChatBoot'
import Settings from '../pages/Settings'

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/to-do" component={Todo} />
            <Route path="/chatBoot" component={ChatBoot} />
            <Route path="/settings" component={Settings} />
        </Switch>
    )
}

export default Routes