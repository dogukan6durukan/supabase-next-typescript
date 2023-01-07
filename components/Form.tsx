import React from "react";
import { useRef } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";

type Codes = Database["public"]["Tables"]["codes"]["Insert"];

export default function Form() {
  const session = useSession();
  const user_email = session?.user.email;

  const emailRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const supabase = useSupabaseClient<Database>();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email: Codes["author"] = emailRef.current!.value;
    const title: Codes["title"] = titleRef.current!.value;
    const description: Codes["description"] = descriptionRef.current!.value;

    const new_data = {
      title: title,
      description: description,
      author: email,
    };

    if (title !== "" && description !== "" && email === user_email) {
      try {
        const result = await supabase.from("codes").insert(new_data);
        console.log(result);
        titleRef.current!.value = "";
        descriptionRef.current!.value = "";
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form className="p-5 my-3 rounded bg-slate-200" onClick={submitHandler}>
      <input type="hidden" ref={emailRef} value={user_email} />

      <div>
        <label>Code</label>
        <input
          type="text"
          ref={titleRef}
          className="border border-slate-300 rounded block my-3 p-1.5 w-full"
        />
      </div>

      <div>
        <label>Code Description</label>
        <textarea
          ref={descriptionRef}
          className="border border-slate-300 rounded block my-3 p-1.5 h-[120px] w-full"
        ></textarea>
      </div>

      <button className="p-1.5  bg-black text-white rounded">Add Code</button>
    </form>
  );
}
