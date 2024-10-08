const Footer = () => {

    return (
        <div className="bg-black mt-24 pt-8">
            <div className="flex flex-col items-center gap-4 mt-2">
                <div className='flex justify-center gap-2'>
                    <img className="h-6 lg:h-7" src="../heartlogo.png" alt="Logo" />
                    <h1 className="font-serif text-white text-lg lg:text-lg font-medium">Asian Health Services</h1>
                </div>
                <div className="w-4/5 lg:w-3/6 lg:text-center mb-12">
                    <p className="text-center text-base md:text-base lg:text-sm text-white">
                        Find detailed medical procedures with lists of required items, step-by-step instructions, and images. Ideal for healthcare professionals and anyone needing clear medical guidance.
                    </p>
                </div>
            </div>
            <a target="_blank" rel="noopener noreferrer" href="https://icons8.com/icon/86312/heart-with-pulse">Heart with Pulse</a> icon by <a target="_blank" rel="noopener noreferrer" href="https://icons8.com">Icons8</a>
        </div>
    )
}

export default Footer;