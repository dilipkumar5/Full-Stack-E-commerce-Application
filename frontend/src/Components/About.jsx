import { AboutUs } from "../utils/constants";
const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                About Us
            </h1>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-lg mb-4 ">
                        Welcome to New Bedford Market, a community-inspired online marketplace
                        built to make everyday shopping simple and convenient. Our goal is to 
                        offer quality products, fair value, and a smooth shopping experience for
                        customers across New Bedford and beyond.
                    </p>
                </div>
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src={AboutUs}
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"/>
                </div>
            </div>
        </div>
    )
}

export default About;