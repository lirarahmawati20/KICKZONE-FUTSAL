export default function CarouselUser() {
  return (
    <div className="relative w-full h-[32rem] flex justify-center items-center overflow-hidden py-8 bg-slate-100 ">
      <video
        autoPlay
        muted
        loop
        className="object-cover h-full w-full"
        style={{
          width: "calc(100% - 20px)",
          marginLeft: "50px",
          marginRight: "50px",
        }}
      >
        <source src="/image/videoplayback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
