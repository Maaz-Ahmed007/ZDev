import Hero from "@/components/LandingPage/Hero";
import Services from "@/components/LandingPage/Services";
import Templates from "@/components/LandingPage/Templates";
import Work from "@/components/LandingPage/Work";
import Footer from "@/components/LandingPage/Footer";

export default function LandingPage() {
	return (
		<>
			<main className="min-h-screen">
				<Hero />
				<Work />
				<Services />
				<Templates />
			</main>
			<Footer />
		</>
	);
}
