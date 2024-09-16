import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="mobile-responsive flex flex-row items-center bg-black py-3 lg:py-2 p-8 lg:p-14">
            <img className="h-8 lg:h-8" src="../heartlogo.png" alt="Logo" />
            <Link>
                <div className="flex justify-start">
                    <h1 className="font-serif text-white text-base lg:text-lg ml-3 flex items-center font-medium">Asian Health Services</h1>
                </div>
            </Link>
        </div>
    )
}

export default Navbar;