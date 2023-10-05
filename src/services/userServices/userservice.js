const userDataModel = require("../../models/userDataModel");
const userModel = require("../../models/userModel");

// Regestration service
const checkEmail=async (email)=>
{
    try{
          return await userModel.findOne(email)
      }
    catch(error)
    {
        console.log(error.message)
    }
}
const checkEmailDup=async (email)=>
{
    try{
          let result = await userModel.findOne({email:email})
             console.log("i am here with result" , result)
          
          return result;
      }
    catch(error)
    {
        console.log(error.message)
    }
}
const checkPhone=async (phone)=>
{
    try{
          return await userModel.findOne({phone:phone})
      }
    catch(error)
    {
        console.log(error.message)
    }
}




const checkEmailAndNumber= async (email,phone)=>
{
    try
    {
    let userExist = await userModel.find({
        $or: [{ email:email }, { phone:phone }],
      });
      if (userExist.length >= 1) {
        if (email == userExist[0].email) {
          return {status:false,message:"email duplicate"}
        } else
          return {status:false,message:"phone duplicate"}
      }
      return {status:true,message:"no duplicacy"}
    }
    catch(error)
    {
        console.log(error.message)
    }


}




// data Creation
const createData=(data)=>
{
    try{
    return userModel.create(data)
    }
    catch(error)
    {
        return res.status(500).send({ status: false, message: error.message });
    }

}
//user update
const updateData=(userKey,data)=>
{
    try{
        return userModel.findOneAndUpdate({ userKey: userKey, isDeleted: false },data,{ new: true });
    }
    catch(error)
    {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// userData


const createFirstUserData=(userKey)=>{
    try{
        
    return userDataModel.create({userKey:userKey});
    }
    catch(error)
    {
        console.log('then here')
        return res.status(500).send({ status: false, message: error.message });
    }

}

// update question
const updateQuestions=(userKey,object)=>{
    try{
    return userDataModel.findOneAndUpdate({userKey:userKey},object,{new:true})
    }
    catch(error)
    {
        
       return res.status(500).send({status:false,message:error.message})
    }

}
// delete question
const deleteQuestion=(userKey,uniqueKey)=>{
    try{
    return userDataModel.updateOne({userKey:userKey},{$pull:{questions:{uniqueKey:uniqueKey}}},{new:true});
    }
    catch(error)
    {
        
       return res.status(500).send({status:false,message:error.message})
    }
}

// fetch user Details
const FetchUserDetails= async (userKey)=>{
    try{
    let userDetails= await userModel.findOne({userKey:userKey,isDeleted:false});
    if(!userDetails) return false

    return {name:userDetails.name,email:userDetails.email,phone:userDetails.phone,profileImage:userDetails.profileImage}
    }
    catch(error)
    {
        
       return res.status(500).send({status:false,message:error.message})
    }
}

// fetch question an answer list
const fetchLogs= async (userKey)=>{
    try{
    let data= await userDataModel.findOne({userKey:userKey});
    return {questions:data.questions}
    }
    catch(error)
    {
        
       return res.status(500).send({status:false,message:error.message})
    }
    }



module.exports={checkEmail,createData,checkEmailDup,updateData,updateQuestions,createFirstUserData,checkPhone,deleteQuestion,FetchUserDetails,fetchLogs,checkEmailAndNumber}