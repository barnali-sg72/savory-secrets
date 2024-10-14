import { StarFill, StarHalf, Star } from "react-bootstrap-icons";

type Props = {
    num: number
}

function Rating(props: Props) {
    let greys = 5 - props.num;
    let oranges = Math.floor(props.num);
    let half = 0;
    if (props.num % oranges > 0) {
        half = 1;
    }
    greys = 5 - (oranges + half);
    
    return (
        <>
            {[...Array(oranges)].map(k => (
                <StarFill color="orange" key={k}></StarFill>
            ))} 
            { half > 0 ? <StarHalf color="orange"></StarHalf> : <></>} 
            { greys > 0 ? [...Array(greys)].map(k => (
                <Star key={k}></Star>
            )) : <></>} 


        </>
    )
}

export default Rating;