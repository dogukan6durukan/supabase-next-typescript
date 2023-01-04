export default function Blog({ results }: any) {
  return (
    <div className="md:w-10/12 m-auto">
      <img src={results.imageURL as string} />
      <div className="body p-3">
        <h1>{results.title}</h1>
        <p>{results.description}</p>
      </div>
    </div>
  );
}
