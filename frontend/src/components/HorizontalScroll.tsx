import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipePage";
import {
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import Rating from "./Rating";

type Props = {
  recipes: Recipe[];
  containerId: string;
};

export default function HorizontalScroll(props: Props) {
  const [step, setStep] = useState(4);
  //const [displaySet, setDisplaySet] = useState<Recipe[]>([]);
  //const [startIndex, setStartIndex] = useState<number>(0);
  /*const [matches600, setMatches600] = useState<boolean>(
    window.matchMedia("only screen and (min-width: 600px)").matches
  );
  const [matches768, setMatches768] = useState<boolean>(
    window.matchMedia("only screen and (min-width: 768px)").matches
  );
  const [matches992, setMatches992] = useState<boolean>(
    window.matchMedia("only screen and (min-width: 992px)").matches
  );*/
  const matches600 = window.matchMedia(
    "only screen and (min-width: 600px)"
  ).matches;
  const matches768 = window.matchMedia(
    "only screen and (min-width: 768px)"
  ).matches;
  const matches992 = window.matchMedia(
    "only screen and (min-width: 992px)"
  ).matches;
  const navigate = useNavigate();
  //const elementRef = useRef<HTMLDivElement>(null);
  //const [isLeftArrowDisabled, setLeftArrowDisabled] = useState(true);
  //const [isRightArrowDisabled, setRightArrowDisabled] = useState(false);

  /*useEffect(() => {
    let step = matches992 ? 4 : matches768 ? 3 : matches600 ? 2 : 1;
    setStep(step);
    setDisplaySet(props.recipes.slice(startIndex, startIndex + step));
    setLeftArrowDisabled(false);
    setRightArrowDisabled(false);
    if (startIndex <= 0) {
      setLeftArrowDisabled(true);
    } else if (startIndex + step >= props.recipes.length - 1) {
      setRightArrowDisabled(true);
    }
  }, [startIndex, props.recipes]);*/
  useEffect(() => {
    window.scrollTo(0, 0);
    let step = matches992 ? 4 : matches768 ? 3 : matches600 ? 2 : 1;
    setStep(step);

    const container = document.getElementById(props.containerId);
    if (!container) return;
    const scrollable = container?.querySelector(".scrollable");
    if (!scrollable) return;

    setTimeout(() => {
      checkButtons();
    }, 400); // D

    scrollable?.addEventListener("scroll", checkButtons);
    return () => {
      scrollable?.removeEventListener("scroll", checkButtons);
    };
  }, [props.recipes]);

  const handleButtonClick = (direction: string) => {
    const container = document.getElementById(props.containerId);
    if (!container) return;
    const list = container.querySelector(".scrollable");
    const item = list?.querySelector(".card-list-item");
    const itemWidth = item ? (item as HTMLElement).offsetWidth : 0;

    if (!list || !item) return;

    if (direction === "prev") {
      list.scrollBy({
        left: -step * itemWidth,
        behavior: "smooth",
      });
    } else if (direction === "next") {
      list.scrollBy({
        left: step * itemWidth,
        behavior: "smooth",
      });
    }
    checkButtons();
  };

  function checkButtons() {
    const container = document.getElementById(props.containerId);
    const list = container?.querySelector(".scrollable");
    const btnLeft = container?.querySelector(".btn-left");
    const btnRight = container?.querySelector(".btn-right");
    if (!container || !list || !btnLeft || !btnRight) return;
    //alert(container.scrollLeft + " " + container.scrollWidth);
    // Disable the let ft button if on the first slide
    //alert(container.scrollLeft);

    if (list.scrollLeft <= 0) {
      btnLeft.classList.add("arrow-disabled");
    } else {
      btnLeft.classList.remove("arrow-disabled");
    }

    // Disable the right button if on the last slide
    // You'll need to calculate the scroll position for the end of the slideshow.
    // This might involve the total width of the slides and the width of the container.
    if (list.scrollLeft >= list.scrollWidth - list.clientWidth) {
      btnRight.classList.add("arrow-disabled");
    } else {
      btnRight.classList.remove("arrow-disabled");
    }
  }

  return (
    <section
      id={props.containerId}
      className="section-scroll d-flex gap-2 pb-4 pt-2"
    >
      <ArrowLeftCircleFill
        color="#1b5196"
        size={50}
        className="btn-left align-self-center arrow-button"
        onClick={() => handleButtonClick("prev")}
      />
      {/*<section
        className="d-flex   justify-content-evenly recipe-scroll"
        ref={elementRef}
      >*/}
      <ul className="scrollable d-flex flex-nowrap overflow-x-auto">
        {props.recipes.map((val, key) => (
          <li
            key={key}
            className="card-list-item d-flex flex-column align-items-center justify-content-center"
          >
            <article
              className="card position-relative flex-shrink-0"
              onClick={() => navigate("/recipes/display/" + val.id)}
            >
              <img
                className="card-img-top"
                loading="lazy"
                src={val.image}
                alt={val.title}
              ></img>
              <div className="card-body">
                {val.rating && val.rating > 0 ? (
                  <Rating num={val?.rating} />
                ) : (
                  <Rating num={0} />
                )}
                <h6 className="card-author mb-3 mt-2">
                  <b>Author:</b>{" "}
                  {val.author.firstname + " " + val.author.lastname}
                </h6>
                <h5 className="card-title text-wrap truncate-1">{val.title}</h5>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {/*</section>*/}
      <ArrowRightCircleFill
        color="#1b5196"
        size={50}
        className=" btn-right align-self-center arrow-button"
        onClick={() => handleButtonClick("next")}
      />
    </section>
  );
}
