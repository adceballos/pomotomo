import { PFP_IMAGES } from '../utils/pfpMap'

function PfpSelector({ currentPfp, owned, onSelect }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {Object.entries(PFP_IMAGES).map(([id, img]) => {
        const isOwned = id === 'slum' || owned.includes(id)

        return (
          <div
            key={id}
            className={`w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-300 flex items-center justify-center ${
              currentPfp === id ? 'border-green-500' : 'border-transparent'
            } ${!isOwned ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}`}
            onClick={() => isOwned && onSelect(id)}
          >
            <img src={img} alt={id} className="w-full h-full object-cover rounded-full" />
          </div>
        )
      })}
    </div>
  )
}

export default PfpSelector