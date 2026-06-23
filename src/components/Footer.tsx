import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-background">
                A
              </div>
              <span className="text-xl font-heading font-semibold tracking-wide text-white">
                AuraPlan
              </span>
            </div>
            <p className="text-gray-300 text-sm max-w-sm leading-loose">
              Transforming how people experience properties. Immerse yourself in highly detailed virtual representations of spaces before physically being there.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-medium mb-4 text-white">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/#about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-medium mb-4 text-white">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} AuraPlan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
