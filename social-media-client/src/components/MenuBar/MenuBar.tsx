import React, { useContext, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { useHistory } from "react-router-dom";

import AuthContext from "../../data/auth-context";

export interface MenuOption {
    route: string;
    label: string;
    icon: string;
    isOnlyForAuth: boolean;
}

const MenuBar: React.FC = () => {

    const MENU_OPTIONS: Array<MenuOption> = [
        {route: "/", label: "Home", icon: "pi pi-fw pi-home", isOnlyForAuth: false},
        {route: "/", label: "Welcome", icon: "pi pi-fw pi-lock-open", isOnlyForAuth: true},
        {route: "/login",label: "Login", icon: "pi pi-fw pi-user", isOnlyForAuth: false},
        {route: "/register",label: "Register", icon: "pi pi-fw pi-user-plus", isOnlyForAuth: false},
        {route: "",label: "Logout", icon: "pi pi-fw pi-sign-out", isOnlyForAuth: true}
    ];

    const history = useHistory();
    const { user, logout } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState<MenuOption>(MENU_OPTIONS[0]);

    const handleTabChange = (e: { originalEvent: Event, value: any }) => {
        const selectedOption: MenuOption = e.value;
        if (selectedOption.route) {
            setActiveTab(selectedOption);
            history.replace(selectedOption.route);
        } else if(selectedOption.label === "Logout") {
            logout();
        }
    };

    const composeMenuOptions = (): Array<MenuOption> => (
        MENU_OPTIONS.filter(menuOption => menuOption.isOnlyForAuth === !!user )
    );

    return (
        <div>
            <TabMenu model={composeMenuOptions()} activeItem={activeTab} onTabChange={handleTabChange}/>
        </div>
    );
};

export default MenuBar;