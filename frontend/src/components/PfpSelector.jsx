import slum from '../assets/slum.PNG'
import jester from '../assets/jester.PNG'
import mage from '../assets/mage.PNG'
import king from '../assets/king.PNG'
import chainmail from '../assets/chainmail.PNG'

function PfpSelector({ selectedPfp, onImageSelect }) {
    const profilePictures = [
        slum,
        jester,
        mage,
        king,
        chainmail,
    ]

    return (
        <div className="">
            <h2 className="text-2xl mb-4">Choose a Profile Picture</h2>
            <div className="flex gap-4">
                {profilePictures.map((image, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer rounded-full overflow-hidden border-2 ${
                            selectedPfp === image ? 'border-black' : 'border-transparent'
                        }`}
                        onClick={() => onImageSelect(image)}
                    >
                        <img
                            src={image}
                            alt={`Profile ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PfpSelector