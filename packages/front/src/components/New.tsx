import { HierarchyNew } from '../../../kiev-utils/types/New';

interface NewProps extends HierarchyNew {}

function New({ title, srcImage, date }: NewProps) {
  const time = `${date?.time.hours.value}:${date?.time.minutes} ${date?.time.hours.period}`;

  return (
    <div className="bg-red-400 w-80">
      <h3 className="text-lg">{title}</h3>
      <img src={srcImage} alt={title} loading={'lazy'} />
      <time>
        {date?.date} às {time}
      </time>
    </div>
  );
}

export default New;
