import New from './New';
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

  return (
    <section className="flex flex-col items-center py-12 gap-8">
      {response?.data.map((n, i) => (
        <New
          key={`${n.title}${i}`}
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
