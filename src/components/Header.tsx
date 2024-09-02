export default function Header() {
  return (
    <>
      <div className="mt-28 text-4xl font-medium leading-none">
        <div>Choose 3 out</div>
        <div>5 of the books</div>
        <div>from the list</div>
      </div>

      <div className="text-lg">
        <div>
          This poll is available only during the discussion. Once voting ends,
          <span className="font-bold">the URL will be instantly disabled</span>.
        </div>
      </div>
    </>
  );
}
