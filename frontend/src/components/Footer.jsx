function Footer() {
  return (
    <footer className="mt-12 border-t-4 border-[#6e2e2b] bg-[#eee0b4] bg-[url('/textures/cream-pixels.png')] bg-repeat text-center text-black py-6 shadow-inner">
        <p className="tagesschrift text-md">
            Made with 🍅 by the Pomotomo team
        </p>
        <p className="tagesschrift text-sm mt-2 text-gray-600">
            Art by <a href="https://x.com/meeshii_meow" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#6a512d]">Meeshii</a>
        </p>
        <p className="tagesschrift text-xs mt-1 text-gray-500">© {new Date().getFullYear()} Pomotomo. All rights reserved.</p>
    </footer>
  )
}
export default Footer