import Link from 'next/link';
export default function Header() {
    return (
        <header className="header flex justify-between items-center">
            <div className="logo">
                {/* Add your logo or project name here */}
                <Link href="/" className="nav-link">NexusApp</Link>
            </div>
            <nav className="nav-links">
                {/* Correct usage of Link component */}
                <Link href="/industries" className="nav-link">
                    Industries
                </Link>
                <Link href="/students" className="nav-link">
                    Students
                </Link>
                <Link href="/institutions" className="nav-link">
                    Institutions
                </Link>
                {/* ... other links ... */}
            </nav>
            <div className="user-actions">
                {/* Correct usage of Link component for login/register */}
                <Link href="/login" className="nav-link">
                    Login
                </Link>
                <Link href="/register" className="nav-link">
                    Register
                </Link>
            </div>
        </header>
    );
}
