import { useEffect, useState } from 'react'

const API = 'http://localhost:3001'

export default function App() {
  const [tab, setTab] = useState('search')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch(`${API}/favorites`).then(r => r.json()).then(setFavorites)
  }, [])

  async function searchRecipe() {
    if (!query.trim()) return
    setLoading(true)
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
    const data = await res.json()
    setResult(data.recipes.length > 0 ? data.recipes[0] : null)
    setLoading(false)
  }

  async function saveFavorite(recipe) {
    const fav = await fetch(`${API}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: recipe.name,
        cuisine: recipe.cuisine,
        prepTime: recipe.prepTimeMinutes,
        image: recipe.image,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions
      })
    }).then(r => r.json())
    setFavorites([fav, ...favorites])
  }

  async function removeFavorite(id) {
    await fetch(`${API}/favorites/${id}`, { method: 'DELETE' })
    setFavorites(favorites.filter(f => f._id !== id))
  }

  const alreadySaved = result && favorites.some(f => f.name === result.name)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-2">Recipe Book</h1>

        <div className="flex gap-1 mb-8 bg-white/5 border border-white/8 p-1 rounded-xl w-fit">
          <button
            onClick={() => setTab('search')}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${tab === 'search' ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            Search
          </button>
          <button
            onClick={() => setTab('favorites')}
            className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${tab === 'favorites' ? 'bg-white text-black font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            Saved ({favorites.length})
          </button>
        </div>

        {tab === 'search' && (
          <div>
            <div className="flex gap-2 mb-6">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/25 placeholder:text-gray-600 transition-colors"
                placeholder="Search a recipe..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && searchRecipe()}
              />
              <button
                onClick={searchRecipe}
                className="bg-white text-black px-5 py-3 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors shrink-0"
              >
                Search
              </button>
            </div>

            {loading && <p className="text-gray-600 text-sm text-center py-8">Searching...</p>}

            {!loading && result && (
              <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                {result.image && (
                  <img src={result.image} alt={result.name} className="w-full h-48 object-cover" />
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-lg font-semibold">{result.name}</h2>
                    <button
                      onClick={() => saveFavorite(result)}
                      disabled={alreadySaved}
                      className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        alreadySaved
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                      }`}
                    >
                      {alreadySaved ? 'Saved ✓' : 'Save'}
                    </button>
                  </div>
                  <div className="flex gap-3 mb-4">
                    {result.cuisine && <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">{result.cuisine}</span>}
                    {result.prepTimeMinutes && <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md">{result.prepTimeMinutes} min</span>}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Ingredients</p>
                  <ul className="text-sm text-gray-300 space-y-1 mb-4">
                    {result.ingredients?.map((ing, i) => <li key={i} className="text-gray-400">• {ing}</li>)}
                  </ul>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Instructions</p>
                  <ol className="text-sm text-gray-400 space-y-1.5 list-decimal list-inside">
                    {result.instructions?.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </div>
              </div>
            )}

            {!loading && result === null && query && (
              <p className="text-center text-gray-700 py-8 text-sm">No recipe found for "{query}"</p>
            )}
          </div>
        )}

        {tab === 'favorites' && (
          <div className="space-y-3">
            {favorites.map(fav => (
              <div key={fav._id} className="bg-white/3 border border-white/8 rounded-2xl p-4 flex gap-4">
                {fav.image && <img src={fav.image} alt={fav.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">{fav.name}</p>
                  <div className="flex gap-2 mt-1">
                    {fav.cuisine && <span className="text-xs text-gray-600">{fav.cuisine}</span>}
                    {fav.prepTime && <span className="text-xs text-gray-600">{fav.prepTime} min</span>}
                  </div>
                </div>
                <button onClick={() => removeFavorite(fav._id)} className="text-gray-700 hover:text-red-400 text-sm transition-colors self-start">✕</button>
              </div>
            ))}
            {favorites.length === 0 && (
              <p className="text-center text-gray-700 py-10 text-sm">No saved recipes yet.</p>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
