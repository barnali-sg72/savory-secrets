import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipePage";
import HorizontalScroll from "./HorizontalScroll";

type Props = {
    handleViewAll(e: React.MouseEvent<HTMLAnchorElement>, mealType: string, ingredientType: string): void
}

export default function EasySection(props: Props) {
    const navigate = useNavigate();
    const [meals, setMeals] = useState<Recipe[]>([]);
    const [mealSet, setMealSet] = useState<Recipe[][]>([]);
    
    useEffect(() => {
        const url = "http://localhost:8000/recipes?ingredientType=easy";
        axios.get(url)
            .then(response => {
                setMeals(response.data.data[0]);
            })
    }, []);

    useEffect(() => {
        populateMealSet();
    }, [meals]);

    const populateMealSet = () => {
        let mealList: Recipe[][] = [];
        let count = 0;
        let lst: Recipe[] = [];
        for (const d of meals) {
            if (count < 4) {
                lst.push(d);
                count++;
                if (count >= 4) {
                    mealList.push(lst);
                    lst = [];
                    count = 0;
                }
            } 
        }
        setMealSet(mealList);
    }

    return (
        <div className="easy-section p-3">
            <div className="d-flex mt-3 mb-4">
                <h2 className="text-start align-self-center ms-3 flex-grow-1">Explore Quick and Easy Recipes</h2>
                <a href="#" className="justify-self-end align-self-center" onClick={(e) => props.handleViewAll(e, "", "easy")}>View All</a>
            </div>            
            <HorizontalScroll recipes={meals}/>
            {/*<div id="carouselEasyControls" className="carousel dinner d-flex flex-row flex-nowrap gap-4 mt-3 slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {mealSet.map((rec1, ind) => (
                        <div className={ ind === 0? "carousel-item active": "carousel-item"}>
                        <div className="cards-wrapper">
                            {rec1.map(rec2 => (
                                <article className="card position-relative" onClick={() => navigate("/recipes/display/"+ rec2.id)}>
                                    <img className="card-img-top" src={rec2.image} alt={rec2.title}></img>
                                    <div className="card-body"> 
                                        <h6 className="card-author mb-3"><b>Author:</b> {rec2.author.firstname + " " + rec2.author.lastname}</h6>
                                        <h5 className="card-title text-wrap">{rec2.title}</h5>                              
                                    </div>
                                </article>
                            ))}
                        </div>           
                       </div>                
                    ))} 
                </div>
                <a className="carousel-control-prev" data-bs-target="#carouselEasyControls" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" data-bs-target="#carouselEasyControls" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>*/}
        </div>
    )
}