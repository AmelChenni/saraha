export const asyncHandler = (fn)=>{
    return (req,res,next) => {
        fn(req,res,next).catch((error)=>{
            return res.status(501).json({message :"catch error",error:error.stack});
        })
    };
}