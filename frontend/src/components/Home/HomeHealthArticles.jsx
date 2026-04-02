import articleImg from '../../assets/images/Home/health-tips.svg';

const HomeHealthArticles = () => {
    const articles = [
        { title: 'Managing Daily Medication', excerpt: 'Simple steps to stay consistent with daily medicines and avoid missed doses.' },
        { title: 'Understanding OTC vs Prescription', excerpt: 'When to consult a professional before taking OTC medications.' },
        { title: 'Boosting Immunity Naturally', excerpt: 'Diet and lifestyle changes to help the immune system.' }
    ];

    return (
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Health Articles & Guides</h2>
                <p className="text-sm text-gray-500">Short, practical health guides for everyday care</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {articles.map((a, i) => (
                    <article key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
                        <img src={articleImg} alt={a.title} className="w-full h-32 object-contain mb-3" />
                        <h3 className="font-semibold text-gray-900">{a.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{a.excerpt}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default HomeHealthArticles;