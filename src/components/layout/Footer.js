export default function Footer() {
    return (
        <footer className="bg-gray-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <p className="text-gray-800">&copy; {new Date().getFullYear()} NexusApp. All rights reserved.</p>
                    <p className="text-gray-800">Made with ❤️ from Panimalar Institute of Technology</p>
                </div>
            </div>
        </footer>
    );
}
