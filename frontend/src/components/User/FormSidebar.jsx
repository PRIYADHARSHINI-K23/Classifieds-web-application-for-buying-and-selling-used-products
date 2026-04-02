
const FormSidebar = ({ title, tag }) => {
    return (
        <div className="hidden sm:flex flex-col justify-center items-center w-2/5 relative overflow-hidden bg-gradient-to-br from-green-600 to-blue-400">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="relative z-10 text-center p-8">
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30 shadow-2xl">
                        <span className="text-6xl animate-pulse">🏥</span>
                    </div>
                </div>
                <h1 className="font-bold text-white text-3xl mb-4 drop-shadow-lg">{title}</h1>
                <p className="text-white text-lg leading-relaxed opacity-90 drop-shadow">{tag}</p>
                
                <div className="mt-8 flex justify-center space-x-4">
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
            </div>
            
            {/* Animated background elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-5 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        </div>
    )
}

export default FormSidebar