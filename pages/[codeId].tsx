import { GetStaticPaths, GetStaticProps } from "next";
import { Database } from "../types/supabase";
import Code from "../components/Code";

type Codes = Database['public']['Tables']['codes']["Row"];


export default function singleCode({ results } : { results : Codes }) {

    return(
        <Code results={results}/>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params!.codeId;
    const res : Response = await fetch(`${process.env.BASE_URL}/api/codes/${id}`);
    const result : Codes[] = await res.json();
    const results = result[0]; 

    return {
      props: {
        results,
        params
      },
    };
  };
  

export const getStaticPaths : GetStaticPaths = async () => {
    const res : Response = await fetch(`${process.env.BASE_URL}/api/codes`);
    const results = await res.json();
    return {
      paths: results.map((c : { [key : string] : string | number }) => {
        return {
          params : {
            codeId : c.id.toString()
          }
        }
      }),
      fallback : false
    }
  }