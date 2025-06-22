import Image from 'next/image';
import type { Project } from '@prisma/client';
import { translateStatus } from '@/lib/utils';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col items-start justify-between">
      <div className="relative w-full">
        <Image src={project.coverImage} alt={project.title} width={1600} height={900} className="aspect-[16/9] w-full rounded-2xl bg-gray-800 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          {project.releaseDate && <time dateTime={project.releaseDate.toISOString()} className="text-gray-400">{new Date(project.releaseDate).toLocaleDateString('tr-TR')}</time>}
          <span className="relative z-10 rounded-full bg-green-500 px-3 py-1.5 font-medium text-white">{translateStatus(project.status)}</span>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-white group-hover:text-gray-300">
            <span className="absolute inset-0" />
            {project.title}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-300">{project.description}</p>
        </div>
      </div>
    </article>
  )
}