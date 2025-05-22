const { default: mongoose } = require('mongoose');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.send({ message: 'User registered successfully' });
};

exports.updateUserInfo = async(req,res)=>{
    try {
        const {names,email,phone,dob,language,currency} = req.body
        const countEm = await User.findOne({email: email, _id:{$ne: req.userId}}).countDocuments()
        
        if(countEm >= 1) return res.status(403).json({message: "*Email already taken"})

        const user = await User.findByIdAndUpdate(req.userId, {
            name:names,email, dob, phone, settings:{
                language: language,
                currency: currency
            }
        })

        if(!user) return res.status(403).json({message: 'Failed to update'})

        return res.json({message: "successfully updated", data: user})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}



exports.addUserAddress = async(req,res)=>{
    try {
        const {street,province,district,sector,cell,village,comment,isDefault} = req.body

        let user = await User.findById(req.userId)
        if(!user) return res.status(404).json({message: "User not found"})
        // const addressExist = await User.find
    if(user.address.length >= 3) return res.status(403).json({message:"Ooops, You have reach to the limit 3 of allowed addresses"})
        user.address.push({
            street:street,
            province:province,
            district:district,
            village:village,
            sector:sector,
            cell:cell,
            status:isDefault,
            comment: comment
        })
        await user.save()
        return res.json(user)
    } catch (error) {
        return res.status(500).json({error: error.message,message:"Failed to add Address"})
        
    }
}


exports.updateUserAddress = async(req,res)=>{
    try {
        const {id} = req.params
        const {street,province,district,sector,cell,village,comment,status} = req.body

        if(!mongoose.isValidObjectId(id)) return res.status(404).json({message: "Invalid address"})
        let findUser = await User.findById(req.userId)
        if(!findUser) return res.status(404).json({message:"Could not find the resources"})
        const findAddress = findUser.address.findIndex((ad)=>ad._id.toString() === id.toString())
        if(findAddress == -1) return res.status(404).json({message: "Address not found"})
        findUser.address[findAddress] = {street, province, district, sector, cell, village, comment, status, _id:id}
        await findUser.save()

        return res.json({address: findUser.address[findAddress], index: findAddress})
    } catch (error) {
        return res.status(500).json({error: error.message,message:"Failed to update Address"})
    }
}

exports.deleteAddress = async (req,res)=>{
    try {
        const {id} = req.params
        if(!mongoose.isValidObjectId(id)) return res.status(404).json({message: "Invalid address"})
        const findUser = await User.findById(req.userId)
        if(!findUser) return res.status(404).json({message:"Could not find the resources"})
    
        findUser.address = findUser.address.filter((address)=> address._id.toString() !== id.toString())
        await findUser.save()
        return res.json({success: true, message: "address have been deleted", id})

    } catch (error) {
        return res.status(500).json({error: error.message, message:"server error"})
    }
}

