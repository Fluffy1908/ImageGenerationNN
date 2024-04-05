import Sidebar from '@/components/ui/Sidebar/Sidebar';

export default async function Page() {
  return (
    <section className="flex text-black">
      <div className="flex text-center">
        <Sidebar />
      </div>
      <div className="ml-5">
        <p>Gallery</p>
      </div>
    </section>
  );
}
