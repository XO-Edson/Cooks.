import premiumImg from "../../assets/tamanna-rumee-5n2XtbvekO8-unsplash.jpg";
function Advert() {
  return (
    <section className="bg-slate-900 p-2 rounded-md h-fit mb-2">
      <h2 className=" text-xs text-slate-800">AD!</h2>
      <h3 className=" font-bold">Subscribe to Premium!</h3>
      <p>Subsribe to premium to reach a wider audience.</p>
      <img
        src={premiumImg}
        alt="PremiumImg"
        className=" object-cover rounded-md mt-4"
        loading="lazy"
      />
    </section>
  );
}

export default Advert;
