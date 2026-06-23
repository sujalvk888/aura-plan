import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-foreground shadow-lg shadow-primary/20">
                A
              </div>
              <span className="text-2xl font-heading font-bold tracking-wide text-foreground">
                AuraPlan
              </span>
            </div>
            <p className="text-foreground-muted text-base max-w-md leading-loose">
              Transforming how people experience properties. Immerse yourself in highly detailed virtual representations of spaces before physically being there.
            </p>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-foreground">Platform</h3>
            <ul className="space-y-4 text-base text-foreground-muted">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-primary transition-colors">Properties</Link></li>
              <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-foreground">Legal</h3>
            <ul className="space-y-4 text-base text-foreground-muted">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-foreground-muted">
          <p>© {new Date().getFullYear()} AuraPlan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
