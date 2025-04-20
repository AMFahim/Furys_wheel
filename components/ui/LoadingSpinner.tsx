
export const LoadingSpinner = ({ message = "Loading user data..." }: { message?: string }) => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-purple-500 border-r-blue-500 border-b-indigo-500 border-l-pink-500 animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 bg-[#1a1a2e] rounded-full flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse"></div>
          </div>
        </div>
      </div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );