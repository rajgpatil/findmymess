import validator from 'validator'

const validate = async (req, res, next) => {
    const { address } = req.body
    try{
        if (validator.isEmpty(address.firstName.trim()) || address.firstName.length < 2) {
            return res.json({ success: false, message: "Please enter valid first name" })
        }
        if (validator.isEmpty(address.lastName.trim()) || address.lastName.length < 2) {
            return res.json({ success: false, message: "Please enter valid last name" })
        }
        if (!validator.isEmail(address.email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (validator.isEmpty(address.street.trim()) || address.street.length < 2) {
            return res.json({ success: false, message: "Please enter valid street name" })
        }
        if (validator.isEmpty(address.city.trim()) || address.city.length < 2) {
            return res.json({ success: false, message: "Please enter valid city name" })
        }
        if (validator.isEmpty(address.state.trim()) || address.state.length < 2) {
            return res.json({ success: false, message: "Please enter valid state name" })
        }
        // Validate zipcode (check if it only contains numbers)
        if (!validator.isNumeric(address.zipcode) || address.zipcode.length != 6) {
            return res.json({ success: false, message: "Zipcode must contain only numeric values & 6 digit number" });
        }
        if (validator.isEmpty(address.country.trim()) || address.country.length < 2) {
            return res.json({ success: false, message: "Please enter valid country name" })
        }
        if (!validator.isMobilePhone(address.phone, 'en-IN')) {
            return res.json({ success: false, message: "Please enter valid phone number in indian format" });
        }
        next()
    }
    catch(err){
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export default validate