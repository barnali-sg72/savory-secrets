import { useEffect, useState } from "react";
import Rating from "./Rating";
import { Recipe } from "./RecipePage";
import { useNavigate } from "react-router-dom";

type Props = {
  data: Recipe[];
};

export function range(start: number, end: number, step = 1) {
  const length = Math.ceil((end - start) / step);
  const rangeData = Array.from({ length }, (_, i) => start + i * step);
  console.log(rangeData);
  return rangeData;
}

export default function Pagination(props: Props) {
  const [displaySet, setDisplaySet] = useState<Recipe[]>([]);
  const [start, setStart] = useState<number>(0);
  //const [displayPages, setDisplayPages] = useState<number>(10);
  const [displayStart, setDisplayStart] = useState<number>(1);
  const [displayEnd, setDisplayEnd] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);

  const [prevDisabled, setPrevDisabled] = useState<boolean>(true);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    let step = 18;
    setDisplaySet(props.data.slice(start, start + step));
    //setStart(start + 16);
    let pgs: number = Math.floor(props.data.length / step);
    if (props.data.length % step > 0) {
      pgs += 1;
    }
    setPages(pgs);

    if (pgs <= 1) {
      setPrevDisabled(true);
      setNextDisabled(true);
    } else {
      setPrevDisabled(false);
      setNextDisabled(false);
    }

    if (start <= 0) {
      setPrevDisabled(true);
    } else if (start + step >= props.data.length - 1) {
      setNextDisabled(true);
    }
  }, [start, props.data]);

  useEffect(() => {
    setSelected(1);
    setStart(0);
    setDisplayStart(1);
  }, [props.data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [displaySet]);

  useEffect(() => {
    if (pages > 10) {
      setDisplayEnd(displayStart + 9);
    } else {
      setDisplayEnd(pages);
    }
  }, [pages, displayStart]);

  useEffect(() => {
    if (selected < displayStart) {
      setDisplayStart(displayStart - 1);
      setDisplayEnd(displayEnd - 1);
    } else if (selected > displayEnd) {
      setDisplayStart(displayStart + 1);
      setDisplayEnd(displayEnd + 1);
    }

    /*setPrevDisabled(false);
        setNextDisabled(false);
        if (selected <= 1) {
            setPrevDisabled(true);
        } else if (selected >= pages) {
            setNextDisabled(true);
        } */
  }, [selected]);

  const handlePrevClick = () => {
    //setStart(start - (matches ? 16 : 1));
    setSelected(selected - 1);
    setStart(start - 16);
  };

  const handleNextClick = () => {
    //setStartIndex(startIndex + (matches ? 4 : 1));
    setSelected(selected + 1);
    setStart(start + 18);
  };

  const handleButtonClick = (num: number) => {
    setSelected(num);
    setStart((num - 1) * 18);
  };

  return (
    <section className="d-flex flex-column justify-content-center">
      <div className="recipe-card-list d-flex align-content-start flex-wrap   ">
        {displaySet.map((rec) => (
          <article
            className="card position-relative"
            onClick={() => navigate("/recipes/display/" + rec.id)}
          >
            <img
              className="card-img-top"
              src={rec.image}
              alt={rec.title}
              loading="lazy"
            ></img>
            <div className="card-body">
              {rec.rating && rec.rating > 0 ? (
                <Rating num={rec?.rating} />
              ) : (
                <Rating num={0} />
              )}
              <h6 className="card-author mb-3">
                <b>Author:</b>{" "}
                {rec.author.firstname + " " + rec.author.lastname}
              </h6>
              <h6 className="card-title truncate-2">{rec.title}</h6>
              {
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: rec.description || "" }}
                ></p>
              }
              {/*<a href="#" className="card-link" onClick={(event) => handleRecipeClick(event, rec.id)}>Read More</a>*/}
            </div>
          </article>
        ))}
      </div>
      <div className="page-buttons btn-group justify-content-center mb-5">
        <button
          className="btn btn-primary"
          disabled={prevDisabled}
          onClick={handlePrevClick}
        >
          Prev
        </button>
        {displayStart > 1 ? (
          <button className="btn btn-primary" disabled>
            ...
          </button>
        ) : (
          <></>
        )}
        {pages && pages > 0 ? (
          range(displayStart, displayEnd + 1).map((v: number, k: number) => (
            <button
              className={
                selected === v ? "btn btn-primary selected" : "btn btn-primary"
              }
              key={k}
              onClick={() => handleButtonClick(v)}
            >
              {v}
            </button>
          ))
        ) : (
          <></>
        )}
        {displayEnd < pages ? (
          <button className="btn btn-primary" disabled>
            ...
          </button>
        ) : (
          <></>
        )}
        <button
          className="btn btn-primary"
          disabled={nextDisabled}
          onClick={handleNextClick}
        >
          Next
        </button>
      </div>
    </section>
  );
}
