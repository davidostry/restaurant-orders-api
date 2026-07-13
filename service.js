import {readFile, writeFile} from './repository.js'


export async function getAllOrders(){
    try{
        const allOrders = await readFile()
        return allOrders;

} catch(error){
        console.log(error.message);
        throw new Error("failed to read orders");
        
        
    }
}

export async function saveOrders(orders){
    try{
        await writeFile(orders)
        console.log("edited file");
        
    }catch(error){
    console.log(error.message);
    throw new Error("failed to edit orders");
    
    
    }
}
