export default function Header({ children, tabs }) {
    return (
        <>
            {tabs && tabs.length ? (
                <div className="px-4 py-3 bg-gradient-to-b from-gray-100 to to-gray-200">
                    <div className="cursor-pointer flex flex-row flex-nowrap w-full overflow-scroll no-scrollbar">
                        {tabs.map((tab, key) => (
                            <div key={key} className="rounded-md inline-block w-auto h-auto px-5 py-1 bg-white hover:bg-gray-200 border-2 border-gray-300 font-header mr-2">{tab}</div>
                        ))}
                    </div>
                </div >
            ) : null}
            <div className="lg:p-6 p-4 w-full bg-white border-b-2">
                <h1 className="text-2xl lg:text-3xl font-header font-semibold inline-block">Dino 🦖</h1>
                <div className="float-right">
                    {children}
                </div>
            </div>
        </>
    );
}
