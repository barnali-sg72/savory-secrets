import { Search, Person } from "react-bootstrap-icons";
import RecipePage from "./RecipePage";
import { useContext, useState } from "react";
import { SearchType, User, UserContext, UserContextType } from "../App";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import logo from "../assets/images/logo12.png";
import HeaderUser from "./HeaderUser";
import HeaderSearch from "./HeaderSearch";

type Props = {
    searchValue: SearchType
}

export default function Header(props: Props) {
    
    const [isTablet, setTablet] = useState(window.matchMedia("only screen and (min-width: 768px)"));
    const [matches, setMatches] = useState<boolean>(true);
    const [selectedMenu, setSelectedMenu] = useState("Home");
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>("");
    //alert(userContext.user?.firstname);

    function handleChange(e: MediaQueryListEvent) {
        setMatches(e.matches);
    }
    isTablet.addEventListener("change", handleChange);

    const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;
        setSearchValue(value);
        //props.updateCriteria(value);
    } 

    const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isMealType: boolean = false,
                isIngredientType: boolean = false ) => {
        e.preventDefault();
        const value = e.currentTarget.text;
        if (!isIngredientType && !isMealType) {
            setSelectedMenu(value);
            if (path !== "") {
                props.searchValue.updateCriteria("");
                props.searchValue.updateIngredientType("");
                props.searchValue.updateMealType("");
            }
        }
        if (isIngredientType) { 
            //setSelectedMenu("Ingredients");
            props.searchValue.updateIngredientType(value);
        }
        if (isMealType) {
            //setSelectedMenu("Meal");
            props.searchValue.updateMealType(value);
        }
        
        //alert(value);
        if (path !== "") {
            navigate(path);
        }
        
    }

    function handleNavigate(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, menu: string, route: string, isUserRecipes: boolean = false): void {
        e.preventDefault();
        props.searchValue.updateIsUserRecipes(isUserRecipes);
        setSelectedMenu(menu);
        navigate(route);
    }    

    const handleSearchCriteria = () => {
        props.searchValue.updateCriteria(searchValue);
    }

    return (
        <header className="d-flex flex-column page-header fixed-top p-3">
            { matches ? 
                <div className="d-flex flex-nowrap header-row search justify-content-between p-1 align-content-center">
                    <img src={logo} width="200" height="100" className="align-self-center"></img>
                    <HeaderSearch width={"w-50"} handleSearchChange={handleSearchChange} handleSearchCriteria={handleSearchCriteria}/>                                     
                    <HeaderUser handleNavigate={handleNavigate}/>                      
                </div>    
            : 
                <div className="d-flex flex-column search p-1 gap-4 align-content-center">
                    <div className="d-flex justify-content-between">
                        <img src={logo} width="200" height="100" className="align-self-center"></img>
                        <span className="float-end align-self-center">
                            <HeaderUser handleNavigate={handleNavigate}/>
                        </span>
                    </div>
                    
                    <span className="float-start flex-grow-1"> 
                        <HeaderSearch width={"w-100"} handleSearchChange={handleSearchChange} handleSearchCriteria={handleSearchCriteria}/>           
                    </span>                                                  
                                                            
                </div>  
            }  
        
            <Nav selectedMenu={selectedMenu} handleMenuClick={handleMenuClick}/>                            
        </header>

    )
}