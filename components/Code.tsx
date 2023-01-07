export default function Code({ results }: any) {
  return (
    <div className="md:w-10/12 m-auto">
      <div className="body p-3">
        <h1>{results.title}</h1>
        <p>{results.description}</p>
      </div>
    </div>
  );
}
