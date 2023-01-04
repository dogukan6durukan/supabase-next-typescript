import React, { InputHTMLAttributes } from "react";
import { useRef } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";
type Blogs = Database["public"]["Tables"]["blogs"]["Update"];

type props = {
    blogId : Number
    imageURL : String | null
    blogTitle : String | null
    description : String | null
}

export default function Edit(props : props) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const supabase = useSupabaseClient<Database>();


  const submitHandler = async (event : React.FormEvent<HTMLButtonElement>) => {

    event.preventDefault();

    const title : Blogs["title"] = titleRef.current!.value;
    const description : Blogs['description'] = descriptionRef.current!.value;
    const imageURL : Blogs["imageURL"] = imageRef.current!.value;

    if(title !== '' && description !== '' && imageURL !== '') {
        
        const newData = {
            title: title,
            description: description,
            imageURL: imageURL,
        }

        try {
            const result = await supabase
              .from("blogs")
              .update(newData)
              .eq('id', props.blogId);
      
              console.log(result);
      
          } catch (err) {
            console.log(err);
          }
      }
    
  };

  return (
    <form className="p-5 my-3 rounded bg-slate-200">
     
      <div>
        <label>Image URL</label>
        <input
          defaultValue={props.imageURL as string}
          type="text"
          ref={imageRef}
          className="border border-slate-300 rounded block my-3 p-1.5 w-full"
        />
      </div>

      <div>
        <label>Blog Title</label>
        <input
          defaultValue={props.blogTitle as string}
          type="text"
          ref={titleRef}
          className="border border-slate-300 rounded block my-3 p-1.5 w-full"
        />
      </div>
      <div>
        <label>Blog Description</label>
        <textarea
          defaultValue={props.description as string } 
          ref={descriptionRef}
          className="border border-slate-300 rounded block my-3 p-1.5 h-[120px] w-full"
        />
      </div>

      <button className="p-1.5  bg-black text-white rounded" onClick={submitHandler}>Edit Blog</button>
    </form>
  );
}
