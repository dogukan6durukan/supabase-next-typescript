import Link from "next/link";
import Edit from "./Edit";
import { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";

type Codes = Database["public"]["Tables"]["codes"]["Row"];


export default function CodeResults({ codes }: any) {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const [editStatus, setEditStatus] = useState<boolean>(false);


  const deleteHandler = async (num : Number) => {
    try {
      const result = await supabase.from('codes').delete().eq('id', num)
      console.log(result);
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <>
      {codes.map((b: Codes) => (
        <div key={b.id} className="p-3 my-3 border border-slate-300 rounded">
          <p className="mt-2">Title : {b.title}</p>
          <p className="my-2">Author : {b.author}</p>
          <Link
            href={b.id.toString()}
            className="p-1.5 inline-block bg-slate-500 text-white rounded"
          >
            See More
          </Link>
          {b.author === session?.user.email && (
            <div>
              <button onClick={() => setEditStatus(editStatus ? false : true)} className="bg-blue-400 p-1 rounded text-white">Edit</button>
              <button onClick={() => deleteHandler(b.id)} className="bg-red-400 p-1 m-2 rounded text-white">Delete</button>
              {editStatus &&
              <Edit 
              codeId={b.id}
              code={b.title}
              codeDescription={b.description}
            />}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
