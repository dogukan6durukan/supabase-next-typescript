import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/table";


export default async function handler(req : NextApiRequest, res : NextApiResponse  ) {
    try {
        const getBlogs = await supabase.from('blogs').select('*');
        res.json(getBlogs.data);
    } catch(err) {
        console.log(err);
    }

}