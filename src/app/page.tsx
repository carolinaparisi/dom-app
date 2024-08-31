import Image from "next/image";
import background from "../../public/assets/background.png";
import MainSection from "./components/MainSection";
import Button from "./components/Button";

export default function Home() {
	return (
		<div className="h-screen">
			<div className="h-1/2 relative">
				<Image alt="" src={background} fill objectFit="cover" />
			</div>
			<div className="flex flex-col justify-between p-5 h-1/2 font-normal">
				<MainSection />
				<Button text={"Get started"} />
			</div>
		</div>
	);
}
