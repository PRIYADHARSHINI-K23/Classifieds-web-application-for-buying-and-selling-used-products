import brandImg from '../../assets/images/Home/brand.svg';

const HomeBrands = () => {
    const brands = ['Aayushi Labs', 'MediCare', 'HealthPlus', 'PureWell', 'TrustMeds', 'CarePoint'];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Top Brands</h2>
                <p className="text-sm text-gray-500">Trusted brands we work with</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
                {brands.map((b, i) => (
                    <div key={i} className="flex items-center justify-center bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex flex-col items-center gap-1">
                            <img src={brandImg} alt={b} className="w-20 h-auto object-contain" />
                            <span className="text-xs text-gray-700">{b}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeBrands;