import * as Counter from "../components/counter";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Counter.Store>
        <Counter.Container>
          <Counter.Value />
          <Counter.IncrementButton />
          <Counter.DecrementButton />
        </Counter.Container>
      </Counter.Store>
    </div>
  );
}
