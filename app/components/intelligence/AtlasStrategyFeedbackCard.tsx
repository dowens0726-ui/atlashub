import type {
  AtlasStrategyFeedback,
} from "@/app/intelligence";

type AtlasStrategyFeedbackCardProps = {
  feedback: AtlasStrategyFeedback;
};

export default function AtlasStrategyFeedbackCard({
  feedback,
}: AtlasStrategyFeedbackCardProps) {
  return (
    <section className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-zinc-950 to-zinc-950 p-6">

      <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-400">
        Atlas Strategy Feedback
      </p>


      <h2 className="mt-4 text-3xl font-black text-white">
        {feedback.title}
      </h2>


      <p className="mt-3 leading-7 text-zinc-400">
        {feedback.result}
      </p>


      <div className="mt-6 grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Performance Score
          </p>

          <p className="mt-2 text-3xl font-black text-white">
            {feedback.performanceScore}%
          </p>
        </div>


        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500">
            Confidence
          </p>

          <p className="mt-2 text-3xl font-black text-white">
            {feedback.confidence}%
          </p>
        </div>

      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

        <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
          Lessons Learned
        </p>

        <div className="mt-4 space-y-2">
          {feedback.lessonsLearned.map((lesson) => (
            <p
              key={lesson}
              className="text-sm text-zinc-300"
            >
              ✓ {lesson}
            </p>
          ))}
        </div>

      </div>


      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-400">
          Future Adjustment
        </p>

        <p className="mt-3 text-sm leading-6 text-zinc-300">
          {feedback.futureAdjustment}
        </p>

      </div>

    </section>
  );
}