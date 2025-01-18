export default function SearchBar() {
  return (
    <div>
        <input
            type="text"
            // value={}
            // onChange={}
            placeholder="Search..."
            className="w-96 px-4 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
    </div>
  )
}