import { connectDB } from "../mongoDB";

interface comment {}

export default async function handler(req: any, res: any){
  if(req.method === 'POST'){

    console.log(req.body)
    
    // return res.status(200).json('완료')
    return res.status(200).redirect('/detail')
  }
}