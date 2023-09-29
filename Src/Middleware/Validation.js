const dataMethods = ['body', 'query', 'params', 'headers' ]
    const validation =(Schema) => {
        // validation 
        return(req,res,next)=>{
            const validationArray = [];
            dataMethods.forEach((key) =>{
                if(Schema[key]){   
                    const validationReslt = Schema[key].validate(req[key], {abortEarly:false});
                    if(validationReslt.error){
                        validationArray.push(validationReslt.error.details);
                    }            
            }           
         })
         if(validationArray.length>0){
            return res.json({message :'validation error',validationArray});
         }else{
            next();
         }

           
    }
}
    

     export default validation;