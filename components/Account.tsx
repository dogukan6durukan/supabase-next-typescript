import { useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from "../types/supabase";
import Form from "./Form";

export default function Account({ session } : { session : Session }) {

    const supabase = useSupabaseClient<Database>();

    return(
        <div className="p-3">
            <h1>Account Page : </h1>
            <p>
                Hello, {session.user.email}
                <button onClick={() => supabase.auth.signOut()} className="max-[412px]:mx-0 mx-2 sm:my-0 my-2 p-1.5 bg-red-400 hover:bg-red-500 duration-75 rounded-sm text-white">Log out</button>
            </p>
            <Form />
        </div>
    )

}
