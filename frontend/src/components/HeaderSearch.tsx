import { on } from "events";
import { Search } from "react-bootstrap-icons";

type Props = {
  handleSearchCriteria(): void;
  handleSearchChange(e: React.FormEvent<HTMLInputElement>): void;
  width: string;
};

export default function HeaderSearch(props: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.handleSearchCriteria();
    }
  };
  return (
    <div
      className={`border border-white  rounded-4 overflow-hidden d-flex flex-nowrap align-self-center ${props.width}`}
    >
      <input
        name="header-search"
        className="float-start form-control mr-sm-2 rounded-0 border-0"
        type="search"
        placeholder="Search by recipe or ingredient name"
        aria-label="Search"
        onChange={props.handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <button className="btn btn-primary rounded-0 py-2 px-3">
        <Search
          className="float-none align-middle ms-1 mt-1"
          size="2rem"
          onClick={props.handleSearchCriteria}
        />
      </button>
    </div>
  );
}
