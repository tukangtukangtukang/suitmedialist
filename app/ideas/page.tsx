import Banner from '../components/Banner';
import PostList from '../components/PostList';
export const metadata = {
    title: "Ideas | Suitmedia",
    description: "Ideas page of Suitmedia",
  };

export default function Home() {
  return (
    <main className="bg-[#EAEBD0] min-h-screen">
      <Banner />
      <section className="max-w-5xl mx-auto px-4 py-8">
        <PostList />
      </section>
    </main>
  );
}