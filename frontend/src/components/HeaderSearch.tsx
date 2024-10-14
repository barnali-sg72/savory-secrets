import { Search } from "react-bootstrap-icons";

type Props = {
    handleSearchCriteria(): void,
    handleSearchChange(e: React.FormEvent<HTMLInputElement>): void,
    width: string
}

export default function HeaderSearch(props: Props) {
    return (
        <div className={`d-flex flex-nowrap align-self-center ${props.width}`}>
            <input className="float-start form-control mr-sm-2" type="search" 
                placeholder="Search by recipe or ingredient name" aria-label="Search" onChange={props.handleSearchChange}/>
            <Search className="float-none align-middle ms-1 mt-1" 
                onClick={props.handleSearchCriteria}/>
        </div>
    )
}