const Filters = ({
  filters,
  setFilters,
  setShowFilters,
  setApplyFilters,
  setHasAppliedFilters,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-2 items-center w-full">
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 rounded-md border border-gray-300"
          value={filters.firstName}
          onChange={(e) =>
            setFilters({ ...filters, firstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 rounded-md border border-gray-300"
          value={filters.lastName}
          onChange={(e) => setFilters({ ...filters, lastName: e.target.value })}
        />
      </div>
      <div className="flex gap-2 items-center w-full">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded-md border border-gray-300"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Company"
          className="w-full p-2 rounded-md border border-gray-300"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        />
      </div>
      <div className="flex  items-center gap-2 self-end  w-full">
        <button
          className="bg-red-500 text-white px-3 rounded-md"
          onClick={() => {
            setFilters({ firstName: "", lastName: "", email: "", company: "" });
            setHasAppliedFilters(false);
            setShowFilters(false);
          }}
        >
          Clear
        </button>
        <button
          className="bg-blue-500 text-white px-3 rounded-md"
          onClick={() => {
            setShowFilters(false);
            setApplyFilters(true);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
export default Filters;
