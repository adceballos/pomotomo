const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { SHOP_ITEMS } = require('../utils/shopData')

const purchaseItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  const itemId = req.params.id

  const item = SHOP_ITEMS.find(i => i.id === itemId)
  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }

  if (user.itemsPurchased.includes(itemId)) {
    res.status(400)
    throw new Error('Item already purchased')
  }

  if (user.coins < item.price) {
    res.status(400)
    throw new Error('Not enough Pomocoins')
  }

  user.coins -= item.price
  user.itemsPurchased.push(itemId)
  await user.save()

  res.status(200).json({
    message: 'Item purchased successfully!',
    itemId,
    coinsRemaining: user.coins,
  })
})

module.exports = { purchaseItem }
