import { Box, Anchor, Bird, Carrot, Citrus, Factory } from 'lucide-react';

export default function LogoCloud() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-xl font-semibold leading-8 text-gray-900 dark:text-white">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="flex justify-center items-center">
            <Box size={48} />
            <span className="text-xl ml-2 mt-2 font-semibold">Cube</span>
          </div>
          <div className="flex justify-center items-center">
            <Anchor size={44} />
            <span className="text-xl ml-2 mt-2 font-extrabold">Anchor</span>
          </div>
          <div className="flex justify-center items-center">
            <Bird size={44} />
            <span className="text-xl ml-2 mt-2 font-extrabold">Bird</span>
          </div>
          <div className="flex justify-center items-center">
            <Carrot size={46} />
            <span className="text-xl ml-2 mt-2 font-medium">Carrot</span>
          </div>
          <div className="flex justify-center items-center">
            <Citrus size={44} />
            <span className="text-xl ml-2 mt-2">Citrus</span>
          </div>
          <div className="flex justify-center items-center">
            <Factory size={44} />
            <span className="text-xl ml-2 mt-2 font-bold">Factory</span>
          </div>
        </div>
      </div>
    </div>
  );
}
