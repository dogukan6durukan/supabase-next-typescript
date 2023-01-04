import { GetStaticPaths, GetStaticProps } from "next";
import { Database } from "../types/supabase";
import Blog from "../components/Blog";
type Blogs = Database['public']['Tables']['blogs']["Row"];


export default function singleBlog({ results } : { results : Blogs }) {

    return(
        <Blog results={results}/>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = params!.blogId;
    const res : Response = await fetch(`http://localhost:3000/api/blogs/${id}`);
    const result : Blogs[] = await res.json();
    const results = result[0]; 

    return {
      props: {
        results,
        params
      },
    };
  };
  

export const getStaticPaths : GetStaticPaths = async () => {
    const res : Response = await fetch("http://localhost:3000/api/blogs");
    const results = await res.json();
    return {
      paths: results.map((b : { [key : string] : string | number }) => {
        return {
          params : {
            blogId : b.id.toString()
          }
        }
      }),
      fallback : false
    }
  }