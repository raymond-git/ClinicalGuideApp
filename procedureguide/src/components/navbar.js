
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="mobile-responsive flex flex-row items-center bg-black py-3 p-14">
            <img className="h-8" src="../heartlogo.png" alt="Logo" />
            <Link>
                <div className="flex justify-start">
                    <img className="cc h-8 lg:h-10" alt="heartlogo"></img>
                    <h1 className="font-serif text-white text-xl lg:text-xl ml-3 flex items-center font-medium">Asian Health Services</h1>
                </div>
            </Link>
        </div>
    )
}

export default Navbar;