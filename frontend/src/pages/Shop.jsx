import { SHOP_ITEMS } from '../utils/shopData'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import BackToHome from "../components/BackToHome.jsx"
import { getMe } from "../features/auth/authSlice"
import { purchaseItem, reset } from "../features/shop/shopSlice"
import Spinner from "../components/Spinner"
import claimed from "../assets/sounds/claimed.wav"
import { useRef } from "react"

function Shop() {
    const dispatch = useDispatch()

    const { user, isLoading: authLoading } = useSelector((state) => state.auth)
    const { isLoading: shopLoading, isError, message } = useSelector((state) => state.shop)

    const purchasedItems = user?.itemsPurchased || []
    const coins = user?.coins || 0

    const claimSoundRef = useRef(null)

    useEffect(() => {
    claimSoundRef.current = new Audio(claimed)
    }, [])

    useEffect(() => {
        dispatch(getMe())
        dispatch(reset())
    }, [dispatch])

    const handlePurchase = async (itemId) => {
        try {
            await dispatch(purchaseItem(itemId)).unwrap()
            dispatch(getMe())
            claimSoundRef.current?.play()
        } catch (err) {
            console.error('Purchase failed:', err)
        }
    }      

    if (authLoading || shopLoading) {
        return <Spinner />
    }

    return (
        <div className="flex flex-col justify-center h-screen max-w-4xl mx-auto text-black">
            <h1 className="text-6xl text-black mb-14 -mt-26 flex justify-center">Shop</h1>
            <div className="tagesschrift text-xl text-center mb-6">🪙 Pomocoins: <span className="text-yellow-400 font-bold">{coins}</span></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-4 md:mx-0 gap-6 p-6 border-4 border-[#6e2e2b] bg-[#eee0b4] bg-[url('/textures/cream-pixels.png')] bg-repeat shadow-lg h-[68vh] overflow-y-auto ">
                {SHOP_ITEMS.map((item) => {
                const isOwned = purchasedItems.includes(item.id)
                const canAfford = coins >= item.price

                return (
                    <div key={item.id} className="bg-[#6a512d] text-[#eee0b4] p-4 border-2 border-[#6e2e2b] shadow-md flex flex-col items-center justify-between">
                    <img src={item.preview} alt={item.name} className="w-32 h-32 object-contain mb-2 border-2 border-[#6e2e2b]" />
                    <h2 className="text-2xl text-white text-center">{item.name}</h2>
                    <p className="tagesschrift text-md text-center mt-1">{item.desc}</p>
                    <p className="tagesschrift text-sm text-gray-200 italic mt-1">(use in your profile)</p>
                    <p className="text-lg text-yellow-400 mt-2">🪙 {item.price}</p>

                    {isOwned ? (
                        <button disabled className="w-full mt-3 py-1 bg-gray-700 text-white border-[#1c1b19] border-1 cursor-not-allowed">Purchased</button>
                    ) : canAfford ? (
                        <button
                        className="w-full mt-3 py-1 bg-green-700 text-white border-[#1c1b19] border-1"
                        onClick={() => handlePurchase(item.id)}
                        >
                        Purchase
                        </button>
                    ) : (
                        <button disabled className="w-full mt-3 py-1 bg-gray-600 text-gray-300 border-[#1c1b19] border-1 cursor-not-allowed">
                        Not Enough Coins
                        </button>
                    )}
                    </div>
                )
                })}
            </div>
        <BackToHome />
        </div>
    )
}

export default Shop