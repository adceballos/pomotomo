import jester from '../assets/jester.PNG'
import mage from '../assets/mage.PNG'
import king from '../assets/king.PNG'
import chainmail from '../assets/chainmail.PNG'

export const SHOP_ITEMS = [
    {
        id: 'pfp1',
        name: 'The Jester',
        desc: 'A whimsical mind hiding sharp wit. Perfect for those who study with a smile.',
        price: 100,
        preview: jester,
    },
    {
        id: 'pfp2',
        name: 'The Mage',
        desc: 'Wield the arcane focus of deep learning. Wisdom flows through every session.',
        price: 150,
        preview: mage,
    },
    {
        id: 'pfp3',
        name: 'The Chainmail Knight',
        desc: 'Disciplined and unyielding, this knight defends every Pomodoro with honor.',
        price: 200,
        preview: chainmail,
    },
    {
        id: 'pfp4',
        name: 'The King',
        desc: 'Crowned by consistency. Rule your time and your tasks like true royalty.',
        price: 250,
        preview: king,
    },
]  