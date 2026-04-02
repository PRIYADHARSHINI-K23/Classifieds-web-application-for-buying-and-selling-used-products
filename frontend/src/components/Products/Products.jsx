import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import { getCategories } from '../../actions/categoryAction';
import { getSubCategories } from '../../actions/subCategoryAction';
import Loader from '../Layouts/Loader';
import Product from './Product';
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    // Filters
    const [price, setPrice] = useState([0, 200000]);
    const [category, setCategory] = useState("");
    const [selectedMainCategory, setSelectedMainCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [priceToggle, setPriceToggle] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [onMobile, setOnMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('popularity');

    useEffect(() => {
        const checkMobile = () => setOnMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { products, loading, error, resultPerPage, filteredProductsCount } = useSelector(state => state.products);
    const { categories: adminCategories } = useSelector(state => state.categories);
    const { subCategories } = useSelector(state => state.subCategories);
    const { isAuthenticated: sellerAuth } = useSelector((state) => state.seller);
    const keyword = params.keyword;

    // Redirect removed as per user request to allow sellers to view the marketplace.

    const priceHandler = (e, newPrice) => setPrice(newPrice);

    const clearFilters = () => {
        setPrice([0, 200000]);
        setCategory("");
        setSelectedMainCategory("");
        setRatings(0);
        setCurrentPage(1);
        setMobileFiltersOpen(false);
        setSearchTerm('');
        setSortBy('popularity');
        
        // Trigger API call with cleared filters
        dispatch(getProducts(keyword, "", [0, 200000], 0, 1));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products/${searchTerm}`);
        }
    };

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSubCategories());
    }, [dispatch]);

    // Apply filters when any filter changes
    useEffect(() => {
        if (error) {
            if (error !== "Please Login to Access") {
                enqueueSnackbar(error, { variant: "error" });
            }
            dispatch(clearErrors());
        }
        
        // Reset to page 1 when filters change
        setCurrentPage(1);
        
        // Dispatch API call with current filters
        dispatch(getProducts(keyword, category, price, ratings, 1));
    }, [dispatch, keyword, category, price, ratings, error, enqueueSnackbar]);

    // Handle page change separately
    useEffect(() => {
            dispatch(getProducts(keyword, category, price, ratings, currentPage));
    }, [currentPage]);

    // Sort products - this only affects display order, not the filtered data
    const getSortedProducts = () => {
        if (!products || products.length === 0) return [];
        
        let sorted = [...products];
        
        // Apply search filter to the already filtered products from API
        if (searchTerm.trim()) {
            sorted = sorted.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply sorting
        if (sortBy === 'priceLowToHigh') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHighToLow') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'popularity') {
            sorted.sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
        }
        
        return sorted;
    };

    const sortedProducts = getSortedProducts();
    const displayProducts = searchTerm.trim() ? sortedProducts : products;

    const groupedSubCategories = subCategories?.reduce((acc, sub) => {
        const catId = sub.category?._id || sub.category;
        if (!acc[catId]) acc[catId] = [];
        acc[catId].push(sub);
        return acc;
    }, {});

    return (
        <>
            <MetaData title="Products | QuickBuy - India's Fastest Delivery" />

            <main className="w-full bg-white min-h-screen pt-20 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

                    {/* Header with Breadcrumb - Amazon/Flipkart Style */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <a href="/" className="hover:text-[#2874f0]">Home</a>
                                <span className="text-gray-400">›</span>
                                <a href="/products" className="hover:text-[#2874f0]">Products</a>
                                {keyword && (
                                    <>
                                        <span className="text-gray-400">›</span>
                                        <span className="text-gray-800 font-medium">Search: "{keyword}"</span>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-500">
                                    <span className="font-semibold text-gray-800">{filteredProductsCount || 0}</span> products found
                                </div>
                                <button
                                    onClick={() => navigate('/wishlist')}
                                    className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-full border border-pink-100 hover:bg-pink-100 transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
                                >
                                    <StarIcon sx={{ fontSize: 16 }} />
                                    View Wishlist
                                </button>
                            </div>
                        </div>

                    {/* Search Bar - Amazon/Flipkart Style */}
                    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 mb-6">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search for products, brands and more..."
                                    className="w-full border border-gray-300 rounded-md px-5 py-3 pr-24 text-gray-700 text-sm focus:outline-none focus:border-[#2874f0] focus:ring-1 focus:ring-[#2874f0] transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#fb641b] hover:bg-[#f85a1a] text-white px-5 py-1.5 rounded-md text-xs font-medium transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                            {onMobile && (
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <FilterListIcon sx={{ fontSize: 18 }} />
                                    <span className="text-sm font-medium">Filter</span>
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Main Content Grid - Flipkart/Amazon Layout */}
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Sidebar Filters - Desktop (Flipkart Style) */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="bg-white border border-gray-200 rounded-md sticky top-24">
                                
                                {/* Filter Header */}
                                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-800 text-base">Filters</h3>
                                    <button
                                        className="text-[#2874f0] text-xs font-medium hover:underline"
                                        onClick={clearFilters}
                                    >
                                        Clear All
                                    </button>
                                </div>

                                {/* Price Filter */}
                                <div className="p-4 border-b border-gray-200">
                                    <div 
                                        className="flex justify-between items-center cursor-pointer mb-3"
                                        onClick={() => setPriceToggle(!priceToggle)}
                                    >
                                        <h4 className="font-medium text-gray-700 text-sm">Price</h4>
                                        {priceToggle ? 
                                            <ExpandLessIcon sx={{ fontSize: 20, color: '#666' }} /> : 
                                            <ExpandMoreIcon sx={{ fontSize: 20, color: '#666' }} />
                                        }
                                    </div>
                                    
                                    {priceToggle && (
                                        <div className="mt-4">
                                            <Slider
                                                value={price}
                                                onChange={priceHandler}
                                                valueLabelDisplay="auto"
                                                min={0}
                                                max={200000}
                                                sx={{
                                                    color: '#2874f0',
                                                    '& .MuiSlider-thumb': {
                                                        width: 16,
                                                        height: 16,
                                                        backgroundColor: '#fff',
                                                        border: '2px solid #2874f0',
                                                        '&:hover': { boxShadow: '0 0 0 8px rgba(40,116,240,0.1)' }
                                                    },
                                                    '& .MuiSlider-track': { height: 2 },
                                                    '& .MuiSlider-rail': { height: 2, opacity: 0.2, backgroundColor: '#2874f0' },
                                                }}
                                            />
                                            <div className="flex justify-between mt-3 text-xs text-gray-600">
                                                <span className="bg-gray-100 px-2 py-1 rounded">₹{price[0].toLocaleString()}</span>
                                                <span className="text-gray-400">—</span>
                                                <span className="bg-gray-100 px-2 py-1 rounded">₹{price[1].toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Categories Filter */}
                                <div className="p-4 border-b border-gray-200">
                                    <div 
                                        className="flex justify-between items-center cursor-pointer mb-3"
                                        onClick={() => setCategoryToggle(!categoryToggle)}
                                    >
                                        <h4 className="font-medium text-gray-700 text-sm">Categories</h4>
                                        {categoryToggle ? 
                                            <ExpandLessIcon sx={{ fontSize: 20, color: '#666' }} /> : 
                                            <ExpandMoreIcon sx={{ fontSize: 20, color: '#666' }} />
                                        }
                                    </div>

                                    {categoryToggle && (
                                        <div className="max-h-80 overflow-y-auto pr-2 space-y-3">
                                            {adminCategories?.map((cat) => (
                                                <div key={cat._id} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                                    <div
                                                        className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                                                            category === cat.name ? 'bg-blue-50' : 'hover:bg-gray-50'
                                                        }`}
                                                        onClick={() => {
                                                            setSelectedMainCategory(selectedMainCategory === cat._id ? "" : cat._id);
                                                            setCategory(cat.name);
                                                        }}
                                                    >
                                                        <span className={`text-xs font-medium ${
                                                            category === cat.name ? 'text-[#2874f0]' : 'text-gray-700'
                                                        }`}>
                                                            {cat.name}
                                                        </span>
                                                        {selectedMainCategory === cat._id ? 
                                                            <ExpandLessIcon sx={{ fontSize: 16, color: '#2874f0' }} /> :
                                                            <ExpandMoreIcon sx={{ fontSize: 16, color: '#999' }} />
                                                        }
                                                    </div>

                                                    {selectedMainCategory === cat._id && (
                                                        <div className="ml-3 mt-1 pl-2 border-l-2 border-blue-200 animate-fadeIn">
                                                            <RadioGroup 
                                                                value={category} 
                                                                onChange={(e) => {
                                                                    setCategory(e.target.value);
                                                                    setSelectedMainCategory("");
                                                                }}
                                                            >
                                                                {groupedSubCategories[cat._id]?.map((sub) => (
                                                                    <FormControlLabel
                                                                        key={sub._id}
                                                                        value={sub.name}
                                                                        control={<Radio size="small" sx={{
                                                                            color: '#ccc',
                                                                            '&.Mui-checked': { color: '#2874f0' }
                                                                        }} />}
                                                                        label={
                                                                            <span className={`text-xs ${category === sub.name ? 'text-[#2874f0] font-medium' : 'text-gray-600'}`}>
                                                                                {sub.name}
                                                                            </span>
                                                                        }
                                                                        className="m-0 mb-1"
                                                                    />
                                                                ))}
                                                            </RadioGroup>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Ratings Filter Removed as per User Request */}
                            </div>
                        </aside>

                        {/* Products Section */}
                        <section className="flex-1">
                            
                            {/* Sort Bar - Simplified as per User Request */}
                            <div className="bg-white border border-gray-200 rounded-md p-3 mb-4 flex flex-wrap items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Marketplace</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Page {currentPage} of {Math.ceil(filteredProductsCount / resultPerPage) || 1}
                                </div>
                            </div>

                            {/* Products Grid - Flipkart/Amazon Style */}
                            {loading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                                        <div key={i} className="bg-white border border-gray-200 rounded-md p-3 animate-pulse">
                                            <div className="w-full aspect-square bg-gray-200 rounded-md mb-3"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                            <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : displayProducts?.length === 0 ? (
                                <div className="bg-white border border-gray-200 rounded-md p-12 text-center">
                                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                        <SearchIcon sx={{ fontSize: 40, color: '#999' }} />
                                    </div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No products found</h2>
                                    <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                                        We couldn't find any products matching your search. Try different keywords or clear filters.
                                    </p>
                                    <button 
                                        onClick={clearFilters} 
                                        className="px-6 py-2.5 bg-[#2874f0] text-white text-sm font-medium rounded-md hover:bg-[#1e5cb3] transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                                        {displayProducts.map((product) => (
                                            <Product key={product._id} {...product} />
                                        ))}
                                    </div>

                                    {/* Pagination - Amazon/Flipkart Style */}
                                    {filteredProductsCount > resultPerPage && (
                                        <div className="flex justify-center mt-10">
                                            <Pagination
                                                count={Math.ceil(filteredProductsCount / resultPerPage)}
                                                page={currentPage}
                                                onChange={(e, val) => setCurrentPage(val)}
                                                color="primary"
                                                shape="rounded"
                                                size={onMobile ? "small" : "medium"}
                                                sx={{
                                                    '& .MuiPaginationItem-root': {
                                                        color: '#555',
                                                        fontFamily: 'inherit',
                                                        fontSize: '0.85rem',
                                                        borderRadius: '4px',
                                                        margin: '0 2px',
                                                        border: '1px solid #e0e0e0',
                                                        backgroundColor: '#fff',
                                                        '&:hover': { 
                                                            backgroundColor: '#f5f5f5',
                                                            borderColor: '#2874f0'
                                                        },
                                                        '&.Mui-selected': {
                                                            backgroundColor: '#2874f0',
                                                            color: 'white',
                                                            borderColor: '#2874f0',
                                                            '&:hover': { backgroundColor: '#1e5cb3' }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </section>
                    </div>
                </div>

                {/* Mobile Filter Drawer - Flipkart Style */}
                {mobileFiltersOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)}></div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
                            
                            {/* Mobile Filter Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-800">Filters</h3>
                                <button onClick={() => setMobileFiltersOpen(false)}>
                                    <CloseIcon sx={{ fontSize: 20, color: '#666' }} />
                                </button>
                            </div>

                            {/* Mobile Filter Content */}
                            <div className="p-4 space-y-6">
                                
                                {/* Price Filter - Mobile */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h4 className="font-medium text-gray-700 text-sm mb-4">Price</h4>
                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        min={0}
                                        max={200000}
                                        sx={{ color: '#2874f0' }}
                                    />
                                    <div className="flex justify-between mt-3 text-sm text-gray-600">
                                        <span>₹{price[0].toLocaleString()}</span>
                                        <span>₹{price[1].toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Categories - Mobile */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h4 className="font-medium text-gray-700 text-sm mb-4">Categories</h4>
                                    <div className="space-y-3">
                                        {adminCategories?.map(cat => (
                                            <div key={cat._id} className="border border-gray-200 rounded-md p-3">
                                                <div 
                                                    className="flex justify-between items-center"
                                                    onClick={() => setSelectedMainCategory(selectedMainCategory === cat._id ? "" : cat._id)}
                                                >
                                                    <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                                                    {selectedMainCategory === cat._id ? 
                                                        <ExpandLessIcon sx={{ color: '#2874f0' }} /> : 
                                                        <ExpandMoreIcon sx={{ color: '#666' }} />
                                                    }
                                                </div>
                                                {selectedMainCategory === cat._id && (
                                                    <div className="mt-3 pl-2 space-y-2">
                                                        {groupedSubCategories[cat._id]?.map(sub => (
                                                            <div 
                                                                key={sub._id}
                                                                onClick={() => {
                                                                    setCategory(sub.name);
                                                                    setSelectedMainCategory("");
                                                                    setMobileFiltersOpen(false);
                                                                }}
                                                                className={`text-xs p-2 rounded ${category === sub.name ? 'bg-blue-50 text-[#2874f0] font-medium' : 'text-gray-600'}`}
                                                            >
                                                                {sub.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ratings - Mobile */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h4 className="font-medium text-gray-700 text-sm mb-4">Customer Ratings</h4>
                                    <div className="space-y-2">
                                        {[4, 3, 2, 1].map((star) => (
                                            <div 
                                                key={star} 
                                                className={`flex items-center gap-2 p-2 rounded border ${ratings === star ? 'border-[#2874f0] bg-blue-50' : 'border-gray-200'}`}
                                                onClick={() => setRatings(ratings === star ? 0 : star)}
                                            >
                                                <div className="flex items-center">
                                                    {[...Array(star)].map((_, i) => (
                                                        <StarIcon key={i} sx={{ fontSize: 18, color: '#ffb300' }} />
                                                    ))}
                                                    {[...Array(5-star)].map((_, i) => (
                                                        <StarIcon key={i} sx={{ fontSize: 18, color: '#e0e0e0' }} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-600">& Up</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Apply Filters Button - Mobile */}
                                <div className="sticky bottom-0 bg-white pt-4 pb-2">
                                    <button
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="w-full py-3 bg-[#fb641b] text-white font-medium rounded-md hover:bg-[#f85a1a] transition-colors"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Products;