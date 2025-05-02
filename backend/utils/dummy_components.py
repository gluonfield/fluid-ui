components = [
    {
        "id": "header1",
        "component": '<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-2xl text-red-400 font-bold px-4 py-2">Welcome to the Dashboard</button>',
        "x": 0,
        "y": 0,
        "w": 12,
        "h": 2 
    },
    {
        "id": "chart1",
        "component": '<div className="rounded-lg border bg-card text-card-foreground shadow-sm"><div className="p-6"><h3 className="text-lg font-semibold">Sales by Region</h3><div className="mt-4"><div className="h-[200px] w-full"><div className="flex h-full items-end gap-2"><div className="w-1/2 bg-blue-500" style={{height: "40%"}}><div className="text-xs text-white p-1">Jan: 100</div></div><div className="w-1/2 bg-blue-500" style={{height: "80%"}}><div className="text-xs text-white p-1">Feb: 200</div></div></div></div></div></div></div>',
        "x": 0,
        "y": 2, 
        "w": 6,
        "h": 8 
    },
    {
        "id": "table1",
        "component": '<div className="rounded-lg border bg-card text-card-foreground shadow-sm"><div className="p-6"><div className="relative w-full overflow-auto"><table className="w-full caption-bottom text-sm"><thead className="[&_tr]:border-b"><tr className="border-b transition-colors hover:bg-muted/50"><th className="h-12 px-4 text-left align-middle font-medium">Name</th><th className="h-12 px-4 text-left align-middle font-medium">Age</th><th className="h-12 px-4 text-left align-middle font-medium">City</th></tr></thead><tbody className="[&_tr:last-child]:border-0"><tr className="border-b transition-colors hover:bg-muted/50"><td className="p-4 align-middle">John Doe</td><td className="p-4 align-middle">30</td><td className="p-4 align-middle">New York</td></tr><tr className="border-b transition-colors hover:bg-muted/50"><td className="p-4 align-middle">Jane Smith</td><td className="p-4 align-middle">25</td><td className="p-4 align-middle">London</td></tr></tbody></table></div></div></div>',
        "x": 6, 
        "y": 2, 
        "w": 6,
        "h": 6 
    },
    {
        "id": "button1",
        "component": '<button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" onClick={() => props.onRefresh?.()}>Refresh</button>',
        "x": 0,
        "y": 10, 
        "w": 3,
        "h": 2 
    }
]