import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useGlobalState} from "@/state";
import {isAdmin, isInstitute, isOrganisation, isStudent} from "@/auth/AuthService";
import {useRouter} from "next/router";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [centerMenuItems, setcenterMenuItems] = useState([]);
    const [rightMenuItems, setrightMenuItems] = useState([]);
    const router = useRouter();
    const [user] = useGlobalState("user");

    function isActive(route) {
        return route === router.pathname ? 'active-class' : ''; // Replace 'active-class' with your actual active class
    }
    useEffect(() => {
        console.log(user)
        let centerMenuItemsInput = []
        let rightMenuItemsInput = []

        if(user && user.email !== "") {

            if(isStudent()){
                centerMenuItemsInput = [
                    { href: '/industries', label: 'Industries' },
                    { href: '/institutions', label: 'Institutions' },
                    { href: '/projects', label: 'All Projects' },
    
                ]; 
            
            }
            else if(isInstitute()){
                centerMenuItemsInput = [
                    { href: '/industries', label: 'Industries' },
                    { href: '/projects', label: 'All Projects' },
    
                ]; 
            }else if(isOrganisation()){
                centerMenuItemsInput = [
                    { href: '/students', label: 'Students' },
                    { href: '/institutions', label: 'Institutions' },
                    { href: '/projects', label: 'All Projects' },
    
                ];
            }else if(isAdmin()){
                centerMenuItemsInput = [
                    { href: '/industries', label: 'Industries' },
                    { href: '/students', label: 'Students' },
                    { href: '/institutions', label: 'Institutions' },
                    { href: '/projects', label: 'All Projects' },
    
                ];
            }
            
            


            if(isStudent() || isAdmin() || isInstitute() ){

                centerMenuItemsInput.push({ href: '/uploadindividualproject', label: 'Upload Project' })
            }
            if(isInstitute() || isAdmin()){
        
                 centerMenuItemsInput.push({ href: '/uploadinstituteproject', label: 'Upload Multiple Projects' })
             }

            rightMenuItemsInput = [
                { href: '/auth/logout',label: 'Logout'}


            ]
        }else{
            rightMenuItemsInput = [
                { href: '/auth/login', label: 'Login' },
                { href: '/auth/register', label: 'Register' },

            ]
        }

        setcenterMenuItems(centerMenuItemsInput)
        setrightMenuItems(rightMenuItemsInput)

    }, [user]);





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
                        <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href)}`} onClick={() => setIsMenuOpen(false)}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Full Menu for Larger Screens */}
            <nav className="hidden md:flex space-x-4 nav-links">
                {centerMenuItems.map(item => (
                    <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href)}`}
                    >{item.label} </Link>
                ))}
            </nav>
                <div className="hidden md:flex user-actions">
                    {rightMenuItems.map(item => (
                        <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href)}`}
                        >{item.label} </Link>
                    ))}
                </div>


        </header>
    );
}
