import "./Categories.css";

function Categories() {
  const categories = [
    {
      name: "Electronics",
      icon: "💻",
      description: "Laptops, mobiles & gadgets",
    },
    {
      name: "Fashion",
      icon: "👕",
      description: "Clothing, shoes & accessories",
    },
    {
      name: "Home & Kitchen",
      icon: "🏠",
      description: "Everything for your home",
    },
    {
      name: "Beauty",
      icon: "💄",
      description: "Beauty & personal care",
    },
    {
      name: "Sports",
      icon: "⚽",
      description: "Fitness & sports equipment",
    },
    {
      name: "Books",
      icon: "📚",
      description: "Books & educational material",
    },
  ];

  return (
    <section className="categories-section">

      <div className="section-heading">
        <h2>Shop by Category</h2>
        <a href="/products">See all</a>
      </div>

      <div className="categories-container">

        {categories.map((category) => (
          <div className="category-card" key={category.name}>

            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.name}</h3>

            <p>{category.description}</p>

            <button>Shop now</button>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;