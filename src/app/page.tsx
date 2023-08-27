import Timeline from "./components/Timeline";
import WhispForm from "./components/WhispForm";

export default function Home() {
  return (
    <main className="mx-2 px-4 lg:mx-96 lg:px-40">
      <WhispForm />
      <Timeline />
    </main>
  );
}
