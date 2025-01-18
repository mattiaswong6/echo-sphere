export default function SearchBar() {
  return (
    <div>
        <input
            type="text"
            // value={}
            // onChange={}
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
    </div>
  )
}