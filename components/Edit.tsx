import React, { InputHTMLAttributes } from "react";
import { useRef } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";

type Codes = Database["public"]["Tables"]["codes"]["Update"];

type props = {
    codeId : Number
    code : String | null
    codeDescription : String | null
}

export default function Edit(props : props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const supabase = useSupabaseClient<Database>();


  const submitHandler = async (event : React.FormEvent<HTMLButtonElement>) => {

    event.preventDefault();

    const title : Codes["title"] = titleRef.current!.value;
    const description : Codes['description'] = descriptionRef.current!.value;

    if(title !== '' && description !== '') {
        
        const newData = {
            title: title,
            description: description,
        }

        try {
            const result = await supabase
              .from("codes")
              .update(newData)
              .eq('id', props.codeId);
      
              console.log(result);
      
          } catch (err) {
            console.log(err);
          }
      }
    
  };

  return (
    <form className="p-5 my-3 rounded bg-slate-200">

      <div>
        <label>Code</label>
        <input
          defaultValue={props.code as string}
          type="text"
          ref={titleRef}
          className="border border-slate-300 rounded block my-3 p-1.5 w-full"
        />
      </div>
      <div>
        <label>Code Description</label>
        <textarea
          defaultValue={props.codeDescription as string } 
          ref={descriptionRef}
          className="border border-slate-300 rounded block my-3 p-1.5 h-[120px] w-full"
        />
      </div>

      <button className="p-1.5  bg-black text-white rounded" onClick={submitHandler}>Edit Code</button>
    </form>
  );
}
