// step539: lets get the UI for displaying the loading spinner here below.
const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="relative">
                <div className="w-20 h-20 border-cyan-200 border-2 rounded-full">
                    <div className="w-20 h-20 border-cyan-500 border-t-2 animate-spin rounded-full absolute left-0 top-0">
                        {/* step540: what sr-only does is : it makes the element invisible to screen readers and other assistive technologies ; so for blind people it will not be read aloud when they are using screen readers there. */}
                        <div className="sr-only">Loading....</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// step541: see the next steps in App.jsx file now there.

export default LoadingSpinner