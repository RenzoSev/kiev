import { HierarchyNew } from '../../../kiev-utils/types/New';

interface NewProps extends HierarchyNew {}

function New({ title, srcImage, date, href }: NewProps) {
  const time = `${date?.time.hours.value}:${date?.time.minutes} ${date?.time.hours.period}`;

  console.log(href);

  return (
    <a href={href} className="cursor-pointer" target={'_blank'}>
      <div className="flex flex-col gap-4 items-center bg-zinc-800/50 w-80 p-6 border border-yellow-100/50 rounded-lg">
        <h3 className="text-lg text-stone-100 uppercase font-bold">{title}</h3>
        <img
          src={srcImage}
          alt={title}
          loading={'lazy'}
          className="w-72 h-36 rounded-lg"
        />
        <time className="text-stone-100/50">
          {date?.date} às {time}
        </time>
      </div>
    </a>
  );
}

export default New;
