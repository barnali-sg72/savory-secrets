import chicken from "../assets/images/chicken.jpg"
import shrimp from "../assets/images/shrimp.jpg"
import salmon from "../assets/images/salmon.jpg"
import beef from "../assets/images/beef.jpg"
import pork from "../assets/images/pork.jpg"
import vegetable from "../assets/images/vegetable-skewer.jpg"
import pasta from "../assets/images/pasta.jpg"
import bread from "../assets/images/bread.jpg"
import rice from "../assets/images/fried-rice.jpg"
import beans from "../assets/images/bean.jpg"
import { Search } from "react-bootstrap-icons";
import { KeyboardEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchType } from "../App"

type Props = {
    searchValue: SearchType
}

export default function IngredientSelection(props: Props) {
    const ingredients = [
        { ingredient: "Chicken", img: chicken },
        { ingredient: "Shrimp", img: shrimp },
        { ingredient: "Salmon", img: salmon },
        { ingredient: "Beef", img: beef },
        { ingredient: "Pork", img: pork },
        { ingredient: "Vegetable", img: vegetable },
        { ingredient: "Pasta", img: pasta },
        { ingredient: "Bread", img: bread },
        { ingredient: "Rice", img: rice },
        { ingredient: "Beans", img: beans }
    ]
    const navigate = useNavigate();
    const [searchStr, setSearchStr] = useState<string>("");
    const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;
        setSearchStr(value);
    } 

    const onSearch = () => {
        props.searchValue.updateIngredientType(searchStr);
        navigate("/recipes");
    }

    const onSearchSelect = (str: string) => {
        setSearchStr(str);
        props.searchValue.updateIngredientType(str);
        navigate("/recipes");
    } 

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter') {
            onSearch();
        }
    }



   
    return (
       
        <section className="d-flex flex-column search-section">
            {/*<p className="separator"></p>*/}
            <div className="ing-search d-flex flex-column align-items-center justify-content-center p-5 m-3">
                <h1 className="text-start fw-bold w-100 text-white mt-3 ms-3">Search by Ingredient Type</h1>
                <div className="d-flex flex-nowrap w-100 align-self-start py-3 my-3">
                    <input className="float-start form-control mr-sm-2" type="search" 
                        placeholder="Search by ingredient type" aria-label="Search" 
                        onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                    <Search color={ 'white' } size={'2em'} className="float-none align-middle ms-1 mt-1"
                        onClick={onSearch}/>
                </div>
            </div>
            <p className="separator"></p>
            <h2 className="text-start mt-3 ms-3">Popular Ingredients</h2>
            <div className="d-flex flex-wrap search-option gap-4 m-4">
                { ingredients.map((val, ind) => (
                    <section key={ind} className="d-flex search-card rounded-4 p-3 mx-1 gap-3"
                        onClick={() => onSearchSelect(val.ingredient)}>
                        <img className="w-50 rounded" src={val.img}></img>
                        <h3 className="text-start align-self-center justify-self-center">{ val.ingredient }</h3>
                    </section>
                ))}
                
            </div>
            

        </section>
        
    )
}