export default function MainSection() {
  return (
    <div className="flex flex-col gap-3 leading-tight text-black">
      <div className="font-silk text-4xl font-medium leading-none">
        <div>WELCOME</div>
        <div>TO</div>
        <div>DOM</div>
      </div>
      <div className="text-xl">
        <div>Meeting Voting Room</div>
        <div className="mt-[-4px]">created by Lorem Ipsum</div>
      </div>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Your name"
        className="block w-full rounded-md border-0 py-4 pl-3 pr-20 ring-1 ring-inset ring-gray_soft placeholder:text-gray focus:outline-none"
      />
    </div>
  );
}
