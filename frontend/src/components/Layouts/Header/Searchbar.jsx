import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full hidden lg:flex items-center bg-blue-50/30 border border-blue-100/50 rounded-xl px-4 py-2 group focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/5 transition-all duration-500">
            <SearchIcon className="text-blue-200 group-focus-within:text-blue-600 transition-colors mr-2.5" sx={{ fontSize: 18 }} />
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-transparent text-[10px] font-black uppercase tracking-widest text-blue-950 flex-1 outline-none placeholder:text-blue-900/10"
                type="text"
                placeholder="Identifer Search..."
                aria-label="Medical Search"
            />
            <button
                type="submit"
                className="ml-2 px-4 py-1.5 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-600/10 active:scale-95"
            >
                SCAN
            </button>
        </form>
    );
};

export default Searchbar;
