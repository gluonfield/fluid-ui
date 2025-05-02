components = [
    {
        "id": "header1",
        "comp": """<div className='p-4 bg-white rounded shadow-md'>\n  <h2 className='text-xl font-bold mb-2'>Cat News</h2>\n  {news.map((item, index) => (\n    <div key={index} className='mb-4'>\n      <h3 className='text-lg font-semibold'>{item.title}</h3>\n      <p className='text-gray-700'>{item.content}</p>\n      <span className='text-sm text-gray-500'>{item.date}</span>\n    </div>\n  ))}\n</div>""",
        "data": '''{"news":[{"title":"30 cats found abandoned in cages along Southern State Parkway in South Farmingdale","content":"30 cats were discovered abandoned in cages along Southern State Parkway in South Farmingdale, causing an investigation by local authorities.","date":"2025-04-30"},{"title":"30 cats and kittens found in cages next to Southern State Parkway on Long Island","content":"On Long Island, 30 cats and kittens were found in cages next to Southern State Parkway, leading to concerns over animal welfare.","date":"2025-04-30"},{"title":"30 Cats Found 'Abandoned' on the Side of N.Y. Road: 'I Was Horrified Once I Came Upon the Situation'","content":"A distressing scene unfolded as 30 cats were found 'abandoned' on the side of a New York road, leaving rescuers horrified.","date":"2025-05-01"},{"title":"Stephen Mo Hanan, Who Played Three Roles in ‘Cats,’ Dies at 78","content":"Stephen Mo Hanan, an actor known for his roles in the musical ‘Cats,’ has passed away at the age of 78.","date":"2025-05-02"},{"title":"Minnesota nonprofit to spay 170 cats with grant support","content":"A Minnesota nonprofit organization is set to spay 170 cats with the help of grant funding, aiming to reduce the stray cat population.","date":"2025-05-02"},{"title":"Cat adoption scam Raleigh NC | Scammer uses Safe Haven for Cats address for fake cat adoption","content":"In Raleigh, NC, a scammer is fraudulently using the Safe Haven for Cats address for fake cat adoption schemes.","date":"2025-05-01"},{"title":"Why some cats make excellent therapy animals","content":"Some cats are gaining recognition as excellent therapy animals, providing emotional support and comfort to people in need.","date":"2025-04-30"},{"title":"Catquistadors: Oldest known domestic cats in the US died off Florida coast in a 1559 Spanish shipwreck","content":"Research reveals that the oldest known domestic cats in the US perished in a 1559 Spanish shipwreck off the Florida coast.","date":"2025-04-29"},{"title":"Cat Who Loves to Bark at Strangers Like a Dog Has People Cracking Up","content":"A unique cat that barks at strangers like a dog is gaining viral attention and laughter online.","date":"2025-05-02"},{"title":"Couple accused of starving dogs, abandoning cats in Fayette County home","content":"Authorities accuse a couple of starving dogs and abandoning cats in their Fayette County home, prompting legal action.","date":"2025-05-01"}]}''',
        "x": 0.0,
        "y": 0.0,
        "w": 6.0,
        "h": 12.0
    },
    # {
    #     "id": "chart1",
    #     "component": "<div className="rounded-lg border bg-card text-card-foreground shadow-sm"><div className="p-6"><h3 className="text-lg font-semibold">Sales by Region</h3><div className="mt-4"><div className="h-[200px] w-full"><div className="flex h-full items-end gap-2"><div className="w-1/2 bg-blue-500" style={{height: "40%"}}><div className="text-xs text-white p-1">Jan: 100</div></div><div className="w-1/2 bg-blue-500" style={{height: "80%"}}><div className="text-xs text-white p-1">Feb: 200</div></div></div></div></div></div></div>",
    #     "x": 0,
    #     "y": 2, 
    #     "w": 6,
    #     "h": 8 
    # },
    # {
    #     "id": "table1",
    #     "comp": "DataTable",
    #     "data": {"columns": "Name, Age, City"},
    #     "x": 6.2,
    #     "y": 1.2,
    #     "w": 5.8,
    #     "h": 4.0
    # },
    # {
    #     "id": "button1",
    #     "comp": "Button",
    #     "data": {"label": "Refresh"},
    #     "x": 10.0,
    #     "y": 0.2,
    #     "w": 2.0,
    #     "h": 0.8
    # }
]