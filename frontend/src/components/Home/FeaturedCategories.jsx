import { Link } from 'react-router-dom';

const FeaturedCategories = () => {
    const cats = [
        { title: 'Appliances', path: '/products?category=appliances', desc: 'Daily-use medical appliances' },
        { title: 'Beauty', path: '/products?category=beauty', desc: 'Personal care and hygiene' },
        { title: 'Electronics', path: '/products?category=electronics', desc: 'Health monitors & devices' },
        { title: 'Fashion', path: '/products?category=fashion', desc: 'Comfortable healthcare wear' },
        { title: 'Grocery', path: '/products?category=grocery', desc: 'Nutrition & supplements' },
        { title: 'Home', path: '/products?category=home', desc: 'Home healthcare essentials' }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>
                <p className="text-sm text-gray-500">Browse popular categories and find what you need fast</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {cats.map((c, i) => (
                    <Link to={c.path} key={i} className="flex flex-col items-start gap-1 p-3 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                        <span className="text-sm font-semibold text-gray-800">{c.title}</span>
                        <span className="text-xs text-gray-500">{c.desc}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;
