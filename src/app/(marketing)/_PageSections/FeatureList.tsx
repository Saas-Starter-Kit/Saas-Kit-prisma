import { CloudCog, Camera, Clock2, Code2, DownloadCloudIcon, GitFork } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default async function FeatureList() {
  return (
    <section className="space-y-6  py-8 mx-4">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl leading-4 md:text-6xl">Features</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground text-lg">
          This project is an experiment to see how a modern app, with features like auth,
          subscriptions, API routes, and static pages would work in Next.js 13 app dir.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <FeatureCard
          heading={'nextjs'}
          description={'App dir, Routing, Layouts, Loading UI and API routes.'}
          icon={<CloudCog size={32} />}
        />
        <FeatureCard
          heading={'nextjs'}
          description={'App dir, Routing, Layouts, Loading UI and API routes.'}
          icon={<Camera size={32} />}
        />
        <FeatureCard
          heading={'nextjs'}
          description={'App dir, Routing, Layouts, Loading UI and API routes.'}
          icon={<Clock2 size={32} />}
        />
        <FeatureCard
          heading={'nextjs'}
          description={'App dir, Routing, Layouts, Loading UI and API routes.'}
          icon={<Code2 size={32} />}
        />
        <FeatureCard
          heading={'nextjs'}
          description={'App dir, Routing, Layouts, Loading UI and API routes.'}
          icon={<DownloadCloudIcon size={32} />}
        />
        <FeatureCard
          heading={'nextjs'}
          description={'App dir, Routing, Layouts, Loading UI and API routes.'}
          icon={<GitFork size={32} />}
        />
      </div>
      <div className="mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Taxonomy also includes a blog and a full-featured documentation site built using
          Contentlayer and MDX.
        </p>
      </div>
    </section>
  );
}
