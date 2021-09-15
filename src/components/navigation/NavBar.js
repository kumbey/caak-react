import {useState} from "react";
import Button from "../button";
import logo from '../../assets/images/logo.png'
import SearchInput from "../input/SearchInput";
import {menu_data} from '../menu_data'

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


    return (
        <nav className="bg-white">
            <div className="max-w-7xl mx-auto px-2 py-1 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex md:hidden lg:hidden">
                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-fontPrimary hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center flex-row">
                        <img
                            className="h-10 w-auto mr-1"
                            src={logo}
                            alt="Caak Logo"
                        />
                    </div>


                    <div className="min-w-0 flex-1 px-1 py-4 md:px-2 lg:px-4 xl:col-span-6 max-w-xl mx-4">
                        <SearchInput placeholder={"Хайлт хийх"}/>
                    </div>
                    <div className={"flex flex-row items-center hidden md:inline-flex lg:inline-flex"}>
                        <Button rounded secondary className={"mr-2"}>Нэвтрэх</Button>
                        <Button rounded className={"mr-2"}>Бүртгэл үүсгэх</Button>
                        <div className={"relative"}>
                            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} secondary
                                    icon={<svg xmlns="http://www.w3.org/2000/svg"
                                               className="h-6 w-6" fill="none"
                                               viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                    </svg>} circular className={"p-1"}/>

                            <div
                                onClick={() => setIsMenuOpen(false)}
                                className={`absolute w-max rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden right-0 mt-2 transition ease-in-out duration-200 ${isMenuOpen ? "block" : "hidden"}`}>
                                <div onClick={(e) => e.stopPropagation()}
                                     className="relative flex flex-col align-baseline w-full self-start py-2">
                                    {menu_data.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex flex-row items-center px-4 py-2 pr-5 text-left rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                                        >
                                            {item.image}

                                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className={`bg-gray-100 h-screen w-4/5 ${isMobileMenuOpen ? "block" : "hidden"}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col w-max">
                    <div className={"flex flex-row"}>
                        <Button rounded className={"ml-2"} secondary>Нэвтрэх</Button>
                        <Button rounded className={"ml-2"}>Бүртгэл үүсгэх</Button>
                    </div>

                    <div className={`relative`}>
                        <div onClick={(e) => e.stopPropagation()}
                             className="relative flex flex-col align-baseline w-full self-start py-2">
                            {menu_data.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex flex-row items-center px-4 py-2 pr-5 text-left rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                                >
                                    {item.image}

                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                </a>
                            ))}
                        </div>
                    </div>


                </div>
            </div>
        </nav>
    )
}
