import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/table";


export default async function handler(req : NextApiRequest, res : NextApiResponse  ) {
    
    if(req.method === 'GET') {
        const query = req.query.blogId;

        try {
            const result = await supabase
            .from('blogs')
            .select()
            .eq('id', query);
            res.send(result.data)
        } catch(err) {
            console.log(err);
        }

    }


}