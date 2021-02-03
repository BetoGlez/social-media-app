import React, { useState } from "react";
import { TabMenu } from 'primereact/tabmenu';
import { useHistory } from "react-router-dom";

export interface MenuOption {
    route: string;
    label: string;
    icon: string;
}

const MenuBar: React.FC = () => {

    const MENU_OPTIONS: Array<MenuOption> = [
        {route: "/", label: "Home", icon: "pi pi-fw pi-home"},
        {route: "/login",label: "Login", icon: "pi pi-fw pi-user"},
        {route: "/register",label: "Register", icon: "pi pi-fw pi-user-plus"}
    ];

    const history = useHistory();
    const [activeTab, setActiveTab] = useState<MenuOption>(MENU_OPTIONS[0]);

    const handleTabChange = (e: { originalEvent: Event, value: any }) => {
        const selectedOption: MenuOption = e.value;
        setActiveTab(selectedOption);
        history.replace(selectedOption.route);
    };

    return (
        <div>
            <TabMenu model={MENU_OPTIONS} activeItem={activeTab} onTabChange={handleTabChange}/>
        </div>
    );
};

export default MenuBar;