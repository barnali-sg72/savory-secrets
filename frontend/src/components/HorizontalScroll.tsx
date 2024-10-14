import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipePage";
import { ArrowRightCircleFill, ArrowLeftCircleFill } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from "react";
import Rating from "./Rating";

type Props = {
    recipes: Recipe[]
}

export default function HorizontalScroll(props: Props) {
    const [displaySet , setDisplaySet] = useState<Recipe[]>([]);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [matches, setMatches] = useState<boolean>(window.matchMedia("only screen and (min-width: 768px)").matches);
    const navigate = useNavigate();
    const elementRef = useRef<HTMLDivElement>(null);
    const [isLeftArrowDisabled, setLeftArrowDisabled] = useState(true);
    const [isRightArrowDisabled, setRightArrowDisabled] = useState(false);

    useEffect(() => {
        let step = matches ? 4 : 1;
        setDisplaySet(props.recipes.slice(startIndex, startIndex + step));
        setLeftArrowDisabled(false);
        setRightArrowDisabled(false);
        if (startIndex <= 0) {
            setLeftArrowDisabled(true);
        } else if ((startIndex + step) >= props.recipes.length-1) {
            setRightArrowDisabled(true);
        } 
        
    }, [startIndex, props.recipes]);

    const handleLeftButtonClick = () => {
        setStartIndex(startIndex - (matches ? 4 : 1));       
    }

    const handleRightButtonClick = () => {
        setStartIndex(startIndex + (matches ? 4 : 1));        
    }

    /*const handleButtonClick = (step: number) => {
        const elem = elementRef.current;
        let scrollAmount = 0;
        if (elem) {
            //step = elem.clientWidth + 10;
            const slideTimer = setInterval(() => {
                elem.scrollLeft += step;
                scrollAmount += Math.abs(step);
                if (scrollAmount >= elem.clientWidth) {
                  clearInterval(slideTimer);
                }
                if (elem.scrollLeft === 0) {
                    setLeftArrowDisabled(true);
                } else {
                    setLeftArrowDisabled(false);
                }
                
                var maxScrollLeft = elem.scrollWidth - elem.clientWidth;
                if (Math.abs(elem.scrollLeft - maxScrollLeft) <= 5) {
                    setRightArrowDisabled(true);
                } else {
                    setRightArrowDisabled(false);
                }
              }, 25);       

                      
        }
    }*/

    return (
        <section className="d-flex gap-2">
            <ArrowLeftCircleFill color="royalblue" size={50} 
                className={ isLeftArrowDisabled? "align-self-center arrow-button arrow-disabled": "arrow-button align-self-center"}
                onClick={() => handleLeftButtonClick()}/>
            <section className="d-flex gap-4 recipe-scroll" ref={elementRef}>
                { displaySet.map((val, key) => (
                    <article className="card position-relative flex-shrink-0" onClick={() => navigate("/recipes/display/"+ val.id)}>
                        <img className="card-img-top" loading="lazy" src={val.image} alt={val.title}></img>
                        <div className="card-body"> 
                            { val.rating && val.rating >0 ? 
                                <Rating num={val?.rating}/> : <Rating num={0}/> }
                            <h6 className="card-author mb-3"><b>Author:</b> {val.author.firstname + " " + val.author.lastname}</h6>
                            <h5 className="card-title text-wrap truncate-1">{val.title}</h5>                              
                        </div>
                    </article>
                ))}
            </section>
            <ArrowRightCircleFill color="royalblue" size={50} 
                className={ isRightArrowDisabled? "align-self-center arrow-button arrow-disabled": "arrow-button align-self-center"}
                onClick={() => handleRightButtonClick()}/>
        </section>
    )
}