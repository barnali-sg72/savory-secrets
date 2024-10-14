import { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";

type Props = {
    setCurrentUserRate(num: number): void
}

export default function RatingInput(props: Props) {
    const [stars, setStars] = useState([
        { enabled: false },
        { enabled: false },
        { enabled: false },
        { enabled: false },
        { enabled: false }
    ]);

    const onStarClick = (key: number) => {
        let allstars: React.SetStateAction<{ enabled: boolean; }[]> = [];
        allstars.push(...stars);
        for (let i=0; i<5; i++) {
            if (i <= key) {
                allstars[i].enabled = true;
            } else {
                allstars[i].enabled = false;
            }
        }
        setStars(allstars);
        props.setCurrentUserRate(key + 1);
    }
    return (
        <>
            {stars.map((val, key) => (
                <>
                    { val.enabled === true ? 
                        <StarFill color="orange" key={key} onClick={() => onStarClick(key)}/> 
                        : 
                        <Star key={key} onClick={() => onStarClick(key)}/>}
                </>
            ))}  
        </>
    )
}