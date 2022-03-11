import MainNew from './MainNew';
import NormalNew from './NormalNew';
import { newsAPI } from '../../services/api';
import { useQuery } from 'react-query';

function News() {
  const STALE_TIME = 1000 * 60; // 1 minute

  const {
    isLoading,
    error,
    data: response,
  } = useQuery('newsData', newsAPI, { staleTime: STALE_TIME });

  console.log(response?.data);

  // TODO: adds error component
  if (error) return <span>Something went wrong</span>;

  // TODO: adds loading component:
  if (isLoading) return <span>Is loading</span>;

  console.log(response?.data);

  return (
    <section className="flex flex-col items-center py-12 gap-8">
      {response?.data.main.map((n, index) => (
        <MainNew key={`${n.title}${index}`} {...n} />
      ))}

      {response?.data.normal.map((n, index) => (
        <NormalNew
          key={`${n.title}${index}`}
          title={n.title}
          srcImage={n.srcImage}
          date={n.date}
          href={n.href}
        />
      ))}
    </section>
  );
}

export default News;
