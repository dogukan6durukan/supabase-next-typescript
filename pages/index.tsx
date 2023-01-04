import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Account from "../components/Account";
import BlogResults from "../components/BlogResults";
import { Database } from "../types/supabase";
type Blogs = Database["public"]["Tables"]["blogs"]["Row"];

export default function Home({
  results,
}: {
  results: InferGetStaticPropsType<typeof getStaticProps>;
}) {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  return (
    <div className="w-10/12 m-auto md:w-1/2">
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <div>
          <Account session={session} />
        </div>
      )}

      {results && (
        <div className="p-3">
          <h2 className="text-2xl my-3">Blogs : </h2>
          {results.length > 0 ? (
            <BlogResults blogs={results}/>
          ) : (
            <p>There is no blog yet...</p>
          )}
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res: Response = await fetch("http://localhost:3000/api/blogs");
  const results: Blogs[] = await res.json();

  return {
    props: {
      results,
    },
  };
};
