const LoadingScreen = () => {
    return (
      <div className='flex h-auto items-center justify-center fixed inset-0  bg-opacity-75 bg-slate-100' >
  
        <div className="flex items-center justify-center h-screen">
            <div className="flex space-x-2 animate-ping">
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>
        </div>
        </div>
  
    );
  };
  export default LoadingScreen