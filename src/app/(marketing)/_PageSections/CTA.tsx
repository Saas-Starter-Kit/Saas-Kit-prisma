import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import config from '@/lib/config/marketing';

export default function CTA() {
  const {
    copy: { cta }
  } = config;

  return (
    <div className="">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            {cta.heading}
            <br />
            {cta.heading_line2}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-500">{cta.subheading}</p>
          <div className="mt-10 space-x-4">
            <Link href="/pricing" className={cn(buttonVariants({ size: 'lg' }))}>
              {cta.link1_text}
            </Link>
            <Link
              href="/faq"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
            >
              {cta.link2_text}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
