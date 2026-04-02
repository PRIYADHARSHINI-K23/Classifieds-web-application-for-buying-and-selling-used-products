const AppDownload = () => {
    return (
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-6 mt-6 text-white">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Download Our App</h2>
                    <p className="text-sm text-white/90">Shop on the go for faster checkout and exclusive app-only offers.</p>
                </div>
                <div className="flex items-center gap-3">
                    <a href="#" className="px-4 py-2 bg-white/10 rounded-lg">Google Play</a>
                    <a href="#" className="px-4 py-2 bg-white/10 rounded-lg">App Store</a>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
