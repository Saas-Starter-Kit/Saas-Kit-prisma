import Hero from './_PageSections/Hero';
import FeatureList from './_PageSections/FeatureList';
import Feature from './_PageSections/Feature';
import LogoCloud from './_PageSections/LogoCloud';
import CTA from './_PageSections/CTA';

export default function Landing() {
  return (
    <div>
      <Hero />
      <LogoCloud />
      <FeatureList />
      <Feature />
      <Feature isFlipped={true} />
      <Feature />
      <CTA />
    </div>
  );
}
