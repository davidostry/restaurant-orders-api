import fs from 'fs/promises'

const path = process.env.FILE_PATH

export async function readFile(){
    const orders = await fs.readFile(path, "utf-8")
    return JSON.parse(orders)
}
export async function writeFile(orders){
    
   return await fs.writeFile(path, JSON.stringify(orders))
}
