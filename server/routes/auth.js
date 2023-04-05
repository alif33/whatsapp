const router = require('express').Router();
const { 
    profile,
    register,
    logedIn,
    getUsers,
    updateProfile,
    forgetPasswrd,
    updatePassword
} = require('../controller/authController');
const { isAuthenticate } = require('../middlewire/auth');

router.get('/profile', profile);
router.post('/register', register);
router.post('/login', logedIn);
router.get('/users', getUsers);
router.put('/update-profile', isAuthenticate, updateProfile);
router.post('/forget-password', forgetPasswrd);
router.put('/update-password',isAuthenticate, updatePassword);

module.exports = router;