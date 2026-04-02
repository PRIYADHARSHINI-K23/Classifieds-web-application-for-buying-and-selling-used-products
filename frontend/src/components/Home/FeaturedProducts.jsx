import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
    const { loading, products } = useSelector((state) => state.products);

    const list = (products || []).slice(0, 8);

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                    <p className="text-sm text-gray-500">Top picks tailored for you</p>
                </div>
                <Link to="/products" className="text-sm text-blue-600 font-semibold">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {loading ? (
                    <div className="col-span-full text-center text-gray-500">Loading…</div>
                ) : list.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">No products found</div>
                ) : (
                    list.map((product) => (
                        <Link to={`/product/${product._id}`} key={product._id} className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                            <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name}</h3>
                            <p className="text-xs text-gray-500 mb-2">₹{product.price?.toLocaleString()}</p>
                            <p className="text-xs text-gray-600 line-clamp-2">{product.description?.slice(0, 80)}{product.description && product.description.length > 80 ? '...' : ''}</p>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
};

export default FeaturedProducts;
