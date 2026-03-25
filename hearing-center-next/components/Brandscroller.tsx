export default function Brandscroller() {
  const brands = [
    "/brands/brand1.png",
    "/brands/brand2.png",
    "/brands/brand3.png",
    "/brands/brand4.png",
    "/brands/brand5.png",
    "/brands/brand6.png",
  ];
  return (
    <div className="w-full overflow-hidden py-6">
      <div
        className="flex w-max"
        style={{ animation: "brand-scroll 20s linear infinite" }}
      >
        {[...brands, ...brands].map((b, i) => (
          <img key={i} src={b} alt="Brand logo" className="h-14 mx-10" />
        ))}
      </div>
      <style>{`
          @keyframes brand-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
    </div>
  );
}
