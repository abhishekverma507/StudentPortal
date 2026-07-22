function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">

        <div className="input-group">

          <span className="input-group-text">
            🔍
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search by Admission No, Roll No, Name or Mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

      </div>
    </div>
  );
}

export default SearchBar;