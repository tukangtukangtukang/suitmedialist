import Banner from './components/Banner';
import PostList from './components/PostList';

export default function Home() {
  return (
    <main>
      <Banner />
      <section className="max-w-5xl mx-auto px-4 py-8">
        <PostList />
      </section>
    </main>
  );
}