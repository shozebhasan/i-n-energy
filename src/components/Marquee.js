const MESSAGE = "Get Your Zing On";

export default function Marquee() {
  return (
    <div className="flex overflow-hidden bg-black py-1">
      {/*
        The track holds two identical groups and the animation moves it by
        -50%. Both groups must have exactly the same styling, otherwise their
        widths differ and the loop visibly jumps when it restarts.
      */}
      <div className="flex shrink-0 animate-marquee whitespace-nowrap">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center"
            // The second group is only there to fill the gap while looping.
            aria-hidden={group === 1}
          >
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className="flex items-center text-[10px] uppercase tracking-[0.15em] text-white md:text-xs"
              >
                {MESSAGE}
                <span className="mx-8" aria-hidden="true">
                  |
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
