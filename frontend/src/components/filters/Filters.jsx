import SearchBar from "./SearchBar";
import SearchStatus from "./SearchStatus";
import SearchDate from "./SearchDate";

const Filters = () => {
  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 max-w-4xl">
        <div className="flex justify-between items-center space--4">
          <SearchBar />
          <SearchStatus />
          <SearchDate />
        </div>
      </div>
    </div>
  );
};

export default Filters;
