export default function CarouselUser() {
  return (
    <div className="relative w-full h-96 flex justify-center items-center overflow-hidden  py-8">
      <video
        autoPlay
        muted
        loop
        className="object-cover"
        style={{
          width: "calc(100% - 20px)",
          maxHeight: "100%",
          marginLeft: "50px",
          marginRight: "50px",
          // marginTop: "20px,",
        }}
      >
        <source src="/image/videoplayback.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
