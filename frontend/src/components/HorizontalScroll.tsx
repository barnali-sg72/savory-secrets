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
};

export default function HorizontalScroll(props: Props) {
  const [step, setStep] = useState(4);
  const [displaySet, setDisplaySet] = useState<Recipe[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
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
  const elementRef = useRef<HTMLDivElement>(null);
  const [isLeftArrowDisabled, setLeftArrowDisabled] = useState(true);
  const [isRightArrowDisabled, setRightArrowDisabled] = useState(false);

  useEffect(() => {
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
  }, [startIndex, props.recipes]);

  const handleLeftButtonClick = () => {
    setStartIndex(startIndex - step);
  };

  const handleRightButtonClick = () => {
    setStartIndex(startIndex + step);
  };

  return (
    <section className="d-flex gap-2 pb-4 pt-2">
      <ArrowLeftCircleFill
        color="#578aca"
        size={50}
        className={
          isLeftArrowDisabled
            ? "align-self-center arrow-button arrow-disabled"
            : "arrow-button align-self-center"
        }
        onClick={() => handleLeftButtonClick()}
      />
      <section
        className="d-flex  justify-content-evenly recipe-scroll"
        ref={elementRef}
      >
        {displaySet.map((val, key) => (
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
              <h6 className="card-author mb-3">
                <b>Author:</b>{" "}
                {val.author.firstname + " " + val.author.lastname}
              </h6>
              <h5 className="card-title text-wrap truncate-1">{val.title}</h5>
            </div>
          </article>
        ))}
      </section>
      <ArrowRightCircleFill
        color="#578aca"
        size={50}
        className={
          isRightArrowDisabled
            ? "align-self-center arrow-button arrow-disabled"
            : "arrow-button align-self-center"
        }
        onClick={() => handleRightButtonClick()}
      />
    </section>
  );
}
