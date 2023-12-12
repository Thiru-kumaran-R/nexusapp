import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useGlobalState} from "@/state";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [centerMenuItems, setcenterMenuItems] = useState([]);
    const [rightMenuItems, setrightMenuItems] = useState([]);

    const [user] = useGlobalState("user");


    useEffect(() => {
        if(user.email !== "") {
            setcenterMenuItems([
                { href: '/industries', label: 'Industries' },
                { href: '/students', label: 'Students' },
                { href: '/institutions', label: 'Institutions' },
                // ... other center menu items ...
            ]);
        }else{
            setrightMenuItems([
                { href: '/auth/login', label: 'Login' },
                { href: '/auth/register', label: 'Register' },

            ])
        }
    }, []);





    function getUserName() {
        return user.email.split("@")[0];
    }

    return (
        <header className="flex justify-between items-center p-4">
            <div className={`${isMenuOpen ? 'hidden' : 'logo'} `}>
                <Link href="/" className="nav-link no-underline">
                    <span className="text-xl md:text-2xl font-bold text-gray-800 hover:text-gray-600">
        Nexus &nbsp;</span>
                </Link>
            </div>
            {/* Burger Menu Icon */}
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={`${isMenuOpen ? 'hidden' : 'flex flex-col space-y-2 p-4'} `}>
                        <span className="block w-8 h-0.5 bg-gray-800"></span>
                        <span className="block w-8 h-0.5 bg-gray-800"></span>
                        <span className="block w-8 h-0.5 bg-gray-800"></span>
                    </div>

                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`absolute top-0 left-0 w-full h-full bg-white transform transition-transform ease-in-out duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                {/* Close Icon */}
                <button className="p-4" onClick={() => setIsMenuOpen(false)}>
                    {/* Your close icon */}
                    ✖️
                </button>

                {/* Mobile Menu Items */}
                <div className="flex flex-col items-center">
                    {centerMenuItems.concat(rightMenuItems).map(item => (
                        <Link key={item.href} href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Full Menu for Larger Screens */}
            <nav className="hidden md:flex space-x-4 nav-links">
                {centerMenuItems.map(item => (
                    <Link key={item.href} href={item.href} className="nav-link"
                    >{item.label} </Link>
                ))}
            </nav>
                <div className="hidden md:flex user-actions">
                    {rightMenuItems.map(item => (
                        <Link key={item.href} href={item.href} className="nav-link"
                        >{item.label} </Link>
                    ))}
                </div>


        </header>
    );
}
