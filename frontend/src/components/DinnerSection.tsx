import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipePage";
import HorizontalScroll from "./HorizontalScroll";

type Props = {
    handleViewAll(e: React.MouseEvent<HTMLAnchorElement>, mealType: string, ingredientType: string): void
}


export default function DinnerSection(props: Props) {
    const navigate = useNavigate();
    const [dinners, setDinners] = useState<Recipe[]>([]);
    const [dinnerSet, setDinnerSet] = useState<Recipe[][]>([]);
    
    useEffect(() => {
        const url = "http://localhost:8000/recipes?mealType=dinner";
        axios.get(url)
            .then(response => {
                setDinners(response.data.data[0]);
            })
    }, []);

    useEffect(() => {
        populateDinnerSet();
    }, [dinners]);

    const populateDinnerSet = () => {
        let dinnerList: Recipe[][] = [];
        let count = 0;
        let lst: Recipe[] = [];
        for (const d of dinners) {
            if (count < 4) {
                lst.push(d);
                count++;
                if (count >= 4) {
                    dinnerList.push(lst);
                    lst = [];
                    count = 0;
                }
            } 
        }
        setDinnerSet(dinnerList);
    }

    return (
        <div className="dinner-section p-3">
            <div className="d-flex mt-3 mb-4">
                <h2 className="text-start align-self-center ms-3 flex-grow-1">Explore Dinner Recipes</h2>
                <a href="#" className="justify-self-end align-self-center" onClick={(e) => props.handleViewAll(e, "dinner", "")}>View All</a>
            </div>  
            <HorizontalScroll recipes={dinners}/>
            {/*<div id="carouselControls" className="carousel dinner d-flex flex-nowrap gap-4 mt-3 slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {dinnerSet.map((rec1, ind) => (
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
                <a className="carousel-control-prev" data-bs-target="#carouselControls" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
                <a className="carousel-control-next" data-bs-target="#carouselControls" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>
            </div>*/}
        </div>
    )
}