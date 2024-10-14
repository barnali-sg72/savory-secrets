import appetizer from "../assets/images/appetizer1.jpg"
import breakfast from "../assets/images/pancakes.jpg"
import dinner from "../assets/images/chicken.jpg"
import lunch from "../assets/images/hamburger.jpg"
import salad from "../assets/images/caesar-salad.jpg"
import soup from "../assets/images/soup1.jpg"
import maincourse from "../assets/images/noodles.jpg"
import sidedish from "../assets/images/vegetable-skewer.jpg"
import dessert from "../assets/images/dessert.jpg"
import drink from "../assets/images/drinks1.jpg"
import { Search } from "react-bootstrap-icons";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SearchType } from "../App"

type Props = {
    searchValue: SearchType
}

export default function MealSelection(props: Props) {
    const meals = [
        { meal: "Appetizer", img: appetizer },
        { meal: "Breakfast", img: breakfast },
        { meal: "Dinner", img: dinner },
        { meal: "Lunch", img: lunch },
        { meal: "Salad", img: salad },
        { meal: "Soup", img: soup },
        { meal: "Main Course", img: maincourse },
        { meal: "Side Dish", img: sidedish },
        { meal: "Dessert", img: dessert },
        { meal: "Drink", img: drink }
    ]
    const navigate = useNavigate();
    const [searchStr, setSearchStr] = useState<string>("");
    const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value;
        setSearchStr(value);
    } 

    const onSearch = () => {
        props.searchValue.updateMealType(searchStr);
        navigate("/recipes");
    }

    const onSearchSelect = (str: string) => {
        setSearchStr(str);
        props.searchValue.updateMealType(str);
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
            <div className="meal-search d-flex flex-column align-items-center justify-content-center p-5 m-3">
                <h1 className="text-start fw-bold w-100 text-white mt-3 ms-3">Search by Meal Type</h1>
                <div className="d-flex flex-nowrap w-100 align-self-start py-3 my-3">
                    <input className="float-start form-control mr-sm-2" type="search" 
                        placeholder="Search by meal type" aria-label="Search" 
                        onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                    <Search color={ 'white' } size={'2em'} className="float-none align-middle ms-1 mt-1"
                        onClick={onSearch}/>
                </div>
            </div>
            <p className="separator"></p>
            <h2 className="text-start mt-3 ms-3">Popular Meal Categories</h2>
            <div className="d-flex flex-wrap search-option gap-4 m-4">
                { meals.map((val, ind) => (
                    <section key={ind} className="d-flex search-card rounded-4 p-3 mx-1 gap-3"
                        onClick={() => onSearchSelect(val.meal)}>
                        <img className="w-50 rounded" src={val.img}></img>
                        <h3 className="text-start align-self-center justify-self-center">{ val.meal }</h3>
                    </section>
                ))}
                
            </div>
            

        </section>
        
    )
}