import { HierarchyNew } from '../../../kiev-utils/types/New';

interface MainNewProps extends HierarchyNew {}

function MainNew({ title, srcImage, date, href }: MainNewProps) {
  const time = `${date?.time.hours.value}:${date?.time.minutes} ${date?.time.hours.period}`;

  return (
    <a href={href} className="cursor-pointer" target={'_blank'}>
      <div className="flex flex-col gap-4 items-center justify-between bg-zinc-800/50 w-80 h-96 p-6 border border-amber-500 rounded-lg">
        <h3 className="text-lg text-amber-400 uppercase font-bold">{title}</h3>
        <img
          src={srcImage}
          alt={title}
          loading={'lazy'}
          className="w-72 h-36 rounded-lg"
        />
        <time className="text-blue-100 font-bold">
          {date?.date} às {time}
        </time>
      </div>
    </a>
  );
}

export default MainNew;
