const {Router} = require('express')
// const bcrypt = require('bcryptjs')
const config = require('config')
//  const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')  
const router = Router()


// /api/auth/creatBike
router.post(
  '/creatBike',
   [
  //   check('email', 'Некорректный email').isEmail(),
  check('nameBike', 'Минимальная длина имени 3 символа')
       .isLength({ min: 3 })
   ],
  async (req, res) => {
    try {
     
     const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректный данные при создании Велосипеда'
      })
    }

      const { nameBike, typeBike, priceBike } = req.body

    const bike = await User.findOne({ nameBike })

    // if (candidate) {
    //   return res.status(400).json({ message: 'Такой пользователь уже существует' })
    // }

    // const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ nameBike, typeBike, priceBike })

    await user.save()

    res.status(201).json({ message: 'Велосипед создан' })

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

//  /api/auth/takeBike
// router.post(
//   '/takeBike', 
//   [
//     // check('email', 'Введите корректный email').normalizeEmail().isEmail(),
//     check('nameBike', 'Введите пароль').exists()
//   ],
//   async (req, res) => {
//   try {
//     const errors = validationResult(req)

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//         message: 'Некорректный данные при входе в систему'
//       })
//     }

//     const {email, password} = req.body

//     const user = await User.findOne({ email })

//     if (!user) {
//       return res.status(400).json({ message: 'Пользователь не найден' })
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
//     }

//     // const token = jwt.sign(
//     //   { userId: user.id },
//     //   config.get('jwtSecret'),
//     //   { expiresIn: '1h' }
//     // )

//     res.json({ token, userId: user.id })

//   } catch (e) {
//     res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
//   }
// })


module.exports = router
