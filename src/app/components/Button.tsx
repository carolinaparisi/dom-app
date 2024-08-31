interface ButtonProps {
	text: string;
}

export default function Button({ text }: ButtonProps) {
	return (
		<button className="flex align-center justify-center bg-olive w-full rounded-s py-4 text-black">
			{text}
		</button>
	);
}
