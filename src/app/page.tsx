import Image from "next/image";
import background from "../../public/assets/background.png";

export default function Home() {
	return (
		<div className="h-screen">
			<div className="bg-red-200 h-1/2 relative">
				<Image alt="" src={background} fill />
			</div>
			<div className="bg-blue-200 h-1/2">Form Section</div>
		</div>
	);
}
