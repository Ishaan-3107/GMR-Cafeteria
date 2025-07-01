export default function Home({city}) {
  return (
    <div style={{marginTop: "2rem", textAlign: "center"}}>
      <h1>Welcome to GMR Cafeteria!</h1>
      <p>Order from a variety of vendors and enjoy delicious meals.</p>
      <h2 style={{marginTop: "2rem"}}>Our Cafeterias in {city}:</h2>
    </div>
  );
}