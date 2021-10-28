import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import { Layout, Menu } from 'antd';
import { Dashboard } from '../components/dashboard/Dashboard';
import { CategoryTable } from "../components/category/CategoryTable";
import { VehicleProperty } from "../components/property/VehicleProperty";
const { Header } = Layout;




export const AppRouter = () => {
    return (
        <Router>
            <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="1"><NavLink to='/dashboard'>Home</NavLink></Menu.Item>
                        <Menu.Item key="2"><NavLink to='/categories'>Categories</NavLink></Menu.Item>
                        <Menu.Item key="3"><NavLink to='/properties'>Vehicle Properties</NavLink></Menu.Item>
                    </Menu>
                </Header>

            </Layout>
            <div>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/categories" >
                        <CategoryTable />
                    </Route>
                    <Route path="/properties" >
                        <VehicleProperty />
                    </Route>
                    <Route path="/">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
