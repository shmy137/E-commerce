import React from "react";
import { useNavigate } from "react-router-dom";

function FeaturedProducts() {

  const navigate = useNavigate();
  return (
    <div>
      <section id="featredkicks" className='min-h-screen bg-background'>FeaturedProducts  
        <button onClick={()=> navigate("/products")} className="bg-accent h-100 w-100" >Click</button>
         </section>
    </div>
  );
}

export default FeaturedProducts;
