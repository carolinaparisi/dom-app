export default function MainSection() {
  return (
    <div className="flex flex-col gap-3 text-black leading-tight">
      <div className="font-medium text-4xl leading-none">
        <div>WELCOME</div>
        <div>TO</div>
        <div>DOM</div>
      </div>
      <div className="text-xl">
        <div>Meeting Vote Room</div>
        <div className="mt-[-4px]">created by Café com Letras</div>
      </div>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Your name"
        className="block w-full rounded-s border-0 py-4 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray_soft placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      />
    </div>
  );
}
