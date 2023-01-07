import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/table";


export default async function handler(req : NextApiRequest, res : NextApiResponse  ) {
    try {
        const getCodes = await supabase.from('codes').select('*');
        res.json(getCodes.data);
    } catch(err) {
        console.log(err);
    }

}